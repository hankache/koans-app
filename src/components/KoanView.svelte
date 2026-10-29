<script lang="ts">
  import { untrack } from 'svelte';
  import { revealAnswer } from '../lib/koans';
  import type { Course } from '../lib/course';
  import type { Report } from '../lib/tap';
  import { inlineCode } from '../lib/inline-code';
  import { modKey, modPressed } from '../lib/platform';
  import { watchDownload, type Download } from '../lib/offline';
  import { decodeCode, MAX_SHARED, shareLink } from '../lib/share';
  import Editor from './Editor.svelte';
  import Meditation from './Meditation.svelte';
  import Emblem from './Emblem.svelte';
  import { site } from '../site';

  // shared: someone's code, from a link (lib/share.ts), still encoded.
  let { course, id, shared }: { course: Course; id: string; shared?: string } = $props();

  const { pack, progress } = untrack(() => course);
  const koan = $derived(course.koanById.get(id)!);
  const section = $derived(course.sectionOf(id));
  const nav = $derived(course.neighbors(id));
  const index = $derived(section.koans.indexOf(koan) + 1);
  // A GitHub issue about this koan, its form filled in (.github/ISSUE_TEMPLATE/report-a-problem.yml).
  const reportHref = $derived(
    `${site.repo}/issues/new?` +
      new URLSearchParams({
        template: 'report-a-problem.yml',
        title: `${pack.name}: ${koan.title}`,
        language: pack.name,
        koan: `${section.title} · ${koan.title}`,
        address: new URL(course.href(id), location.href).href,
      }),
  );

  // App keys this component by language and koan, and opens the course (saved progress
  // included) first, so reading it once here is enough (and must not re-run after each save).
  let code = $state(untrack(() => progress.get(id)?.code ?? course.koanById.get(id)!.code));
  let report = $state<Report | null>(null);
  let editor: Editor;

  // Someone's code from a shared link takes the editor's place, while the learner's own stays
  // saved as it was: until they run the shared code, which then becomes their attempt, or go back
  // to their own. 'damaged': the link's code couldn't be read, so their own code stays.
  let sharing = $state<'no' | 'reading' | 'yes' | 'damaged'>(untrack(() => (shared ? 'reading' : 'no')));
  // The shared code on show, still encoded: a link opened while on this koan replaces it.
  let opened: string | undefined;
  $effect(() => {
    const s = shared;
    untrack(() => {
      if (s === opened) return;
      opened = s;
      if (!s) return sharing !== 'no' && ownCode(); // the address lost it (the Back button)
      sharing = 'reading';
      void decodeCode(s).then(c => {
        if (opened !== s) return; // another link came meanwhile
        if (c === null) return (sharing = 'damaged');
        code = c;
        report = null;
        reached = gained = 0;
        sharing = 'yes';
      });
    });
  });
  /** Back to the learner's own code, as saved. */
  function ownCode() {
    code = progress.get(id)?.code ?? koan.code;
    report = null;
    reached = gained = 0;
    sharing = 'no';
  }
  /** Leaves the shared code: the address loses it too, so a reload brings back the learner's own. */
  function leaveShared(restore: boolean) {
    if (restore) ownCode();
    sharing = 'no';
    opened = undefined;
    history.replaceState(history.state, '', course.href(id));
    // The app reads the address on hashchange: it has to see the code go, or opening the same
    // link again would look like no change.
    dispatchEvent(new HashChangeEvent('hashchange'));
  }

  // Share: the link to this koan with the code as it is in the editor. On a phone, the phone's
  // own share sheet; elsewhere (or without one) the link is copied, and a note says so.
  let shareNote = $state<{ link?: string; tooLong?: boolean } | null>(null);
  let noteTimer: ReturnType<typeof setTimeout> | undefined;
  function note(n: typeof shareNote, ms: number) {
    clearTimeout(noteTimer);
    shareNote = n;
    noteTimer = setTimeout(() => (shareNote = null), ms);
  }
  async function share() {
    if (code.length > MAX_SHARED) return note({ tooLong: true }, 5000);
    const link = await shareLink(course.href(id), code);
    if (matchMedia('(pointer: coarse)').matches && navigator.share) {
      try {
        await navigator.share({ title: `${koan.title} · ${pack.name} Koans`, url: link });
        return;
      } catch (e) {
        if ((e as Error).name === 'AbortError') return; // the learner closed the share sheet
      }
    }
    try {
      await navigator.clipboard.writeText(link);
      note({}, 4000);
    } catch {
      // No clipboard (an old browser, or permission refused): the link to copy by hand.
      note({ link }, 30000);
    }
  }
  // How far into the koan the last run got (assertions passed before the first failure),
  // and how many more this run got past: drives the encouragement line.
  let reached = 0;
  let gained = $state(0);
  let running = $state(false);
  // Counts runs, so the editor redraws the failing line's mark after each one.
  let runs = $state(0);
  // The line of the answer spot the cursor is on, if any. Only the learner puts it there:
  // a run clears it, and the cursor then goes to the start of the failing line.
  let cursorSpot = $state<number | null>(null);
  // Only surfaced if the interpreter fails to load.
  const LOAD_ERROR = `Could not load the ${pack.name} interpreter. Check your connection and reload the page.`;
  let runtimeError = $state<string | undefined>();
  let ready = $state(false);
  untrack(() => course).getRuntime().ready.then(
    () => (ready = true),
    e => {
      console.error(e);
      runtimeError = LOAD_ERROR;
    },
  );

  // While the interpreter loads: what it's doing, after a moment (a saved one is often ready by
  // then). Its download's progress comes from the service worker, when there is one.
  let waited = $state(false);
  let download = $state<Download | null>(null);
  $effect(() => {
    const timer = setTimeout(() => (waited = true), 300);
    const stop = watchDownload(pack.worker.url.split('/')[1], d => (download = d));
    return () => {
      clearTimeout(timer);
      stop();
    };
  });
  const loading = $derived.by(() => {
    if (ready || runtimeError || !waited) return null;
    if (!download) return { text: `Preparing ${pack.name}…` };
    if (download.received < download.total) {
      // Received rounded down: "13.5 of 13.5 MB" only once it's all there.
      const mb = (n: number, round = Math.round) => (round(n / 1e5) / 10).toFixed(1);
      return {
        text: `Downloading ${pack.name}…`,
        detail: `${mb(download.received, Math.floor)} of ${mb(download.total)} MB`,
        fraction: download.received / download.total,
      };
    }
    return { text: `Starting ${pack.name}…` };
  });

  async function run() {
    if (running) return;
    running = true;
    cursorSpot = null;
    const ranFor = id;
    let r;
    try {
      r = await course.runKoan(code);
    } catch {
      // The interpreter failed to load; the idle panel says so.
      runtimeError = LOAD_ERROR;
      return;
    } finally {
      running = false;
    }
    if (ranFor !== id) return; // navigated away meanwhile
    report = r;
    if (r.status === 'passed') sheet = true;
    runs++;
    if (r.status !== 'error') {
      const now = r.status === 'passed' ? r.tests.length : r.tests.findIndex(t => !t.ok);
      gained = Math.max(0, now - reached);
      reached = now;
    }
    progress.record(id, code, r.status === 'passed');
    // Run, shared code is the learner's attempt now.
    if (sharing === 'yes') leaveShared(false);
    // Back to the code: the start of the failing line (red stripe), or where you were.
    // A pass leaves you alone, for the "Next koan" button.
    if (r.status === 'failed') editor.focusLine(r.failure.line);
    else if (r.status === 'error') editor.focusLine(r.line);
  }

  // Mod+Enter runs from anywhere on the page. The editor handles it itself when it has focus.
  function onkeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && modPressed(e) && !e.defaultPrevented) {
      e.preventDefault();
      void run();
    }
  }

  function reset() {
    code = koan.code;
    report = null;
    reached = gained = 0;
    progress.resetCode(id, koan.code);
  }

  const markLine = $derived(
    report?.status === 'failed' ? report.failure.line : report?.status === 'error' ? report.line : undefined,
  );

  // Where each answer goes, for the editor: the text around each ___ of the koan.
  const spots = $derived.by(() => {
    const lines = koan.code.trimEnd().split('\n');
    return koan.answers.map(a => {
      const [before, after] = lines[a.line].split('___');
      return { line: a.line, before, after };
    });
  });

  // After a run: ✓ beside each answer line whose test passed, ✗ beside each line whose test failed
  // with an answer in it. A line still holding ___ gets nothing: its blank says it all.
  const checks = $derived.by(() => {
    if (!report || report.status === 'error') return [];
    const failing = new Map(report.tests.filter(t => !t.ok && t.line).map(t => [t.line!, t]));
    const lines = new Set([...koan.answers.map(a => a.line + 1), ...failing.keys()]);
    return [...lines].flatMap(line => {
      const t = failing.get(line);
      return t ? (t.blank ? [] : [{ line, ok: false }]) : [{ line, ok: true }];
    });
  });
  const passing = $derived(report && report.status !== 'error' ? report.tests.filter(t => t.ok).length : 0);

  // The koan as a file of the language's test framework, for the editor's bar.
  const fileName = $derived(pack.testFile(id.split('/').at(-1)!));

  // On a phone: a bar with Run and a one-line result; the full report opens as a sheet.
  let sheet = $state(false);
  const summary = $derived.by(() => {
    if (loading) return loading.detail ? `${loading.text} ${loading.detail}` : loading.text;
    if (running) return 'Meditating…';
    if (!report) return runtimeError ?? (sharing === 'yes' ? 'Read it, then Run' : 'Fill in each ___');
    if (report.status === 'passed') return '✓ Enlightenment!';
    if (report.status === 'error') return `✗ Error${report.line ? ` on line ${report.line}` : ''}`;
    const f = report.failure;
    return `${f.blank ? '○' : '✗'} Line ${f.line ?? '?'} · ${passing} of ${report.tests.length} passing`;
  });

  // The hidden answer the result panel offers, for the spot the cursor is on (none if it's right).
  const hint = $derived.by(() => {
    if (!cursorSpot || report?.status === 'passed') return null;
    const found = revealAnswer(koan, code, cursorSpot);
    return found?.line === cursorSpot ? found : null;
  });
</script>

<svelte:head><title>{koan.title} · {pack.name} Koans</title></svelte:head>
<svelte:window {onkeydown} />

{#snippet shareIcon()}
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
{/snippet}

<!-- What Share did: shown by the Share button (one in the actions, one in the phone's bar). -->
{#snippet sharedNote()}
  {#if shareNote}
    <p class="share-note" role="status">
      {#if shareNote.tooLong}
        Too much code to share in a link.
      {:else if shareNote.link}
        <label>Copy this link: <input readonly value={shareNote.link} onfocus={e => e.currentTarget.select()} /></label>
      {:else}
        <strong>✓ Link copied,</strong> with your code in it.
      {/if}
    </p>
  {/if}
{/snippet}

<article style:--lang-light={pack.look.accent.light} style:--lang-dark={pack.look.accent.dark}>
  <nav class="crumbs" aria-label="Breadcrumb">
    <Emblem {pack} size={26} />
    <a href={course.href()}>{pack.name}</a> <span>/</span> {section.title}
  </nav>

  <div class="layout">
    <div class="main">
      <div class="title-row">
        <h1>
          {koan.title}
          {#if progress.get(id)?.status === 'passed'}<span class="badge">passed</span>{/if}
        </h1>
        <div class="dots">
          <ol aria-label="Koans in {section.title}">
            {#each section.koans as k, i (k.id)}
              <li>
                <a href={course.href(k.id)} class:done={progress.get(k.id)?.status === 'passed'} class:here={k.id === id}
                  title={k.title} aria-label="{k.title}{k.id === id ? ' (this koan)' : ''}"
                  aria-current={k.id === id ? 'page' : undefined}></a>
              </li>
            {/each}
          </ol>
          <span class="count">{index} of {section.koans.length}</span>
        </div>
      </div>
      {#if koan.intro}
        <p class="intro">
          {#each inlineCode(koan.intro) as part}{#if part.code}<code class:blank={part.text === '___'}>{part.text}</code>{:else}{part.text}{/if}{/each}
        </p>
      {/if}

      {#if sharing === 'yes' || sharing === 'damaged'}
        <div class="shared" role="note">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>
          {#if sharing === 'yes'}
            <p><strong>Shared code</strong> Someone sent you their attempt at this koan. Read it before you press Run. Your own code is kept.</p>
            <button onclick={() => leaveShared(true)}>Back to your own code</button>
          {:else}
            <p><strong>This link's code couldn't be read</strong> It may have been cut short when it was copied. Here is your own code.</p>
            <button onclick={() => leaveShared(false)}>OK</button>
          {/if}
        </div>
      {/if}

      <div class="frame">
        <div class="file-bar">
          <span class="file">{fileName}</span>
          <span class="spacer"></span>
          {#if report && report.status !== 'error'}
            <span class="small">{report.tests.length} {report.tests.length === 1 ? 'test' : 'tests'}</span>
            <span class="pill" class:all={passing === report.tests.length}>{passing} passing</span>
          {:else}
            <span class="small">{koan.answers.length} {koan.answers.length === 1 ? 'blank' : 'blanks'}</span>
          {/if}
        </div>
        <Editor
          value={code}
          language={course.highlight}
          onchange={c => (code = c)}
          onrun={run}
          bind:this={editor}
          {markLine}
          markKind={report?.status === 'error' ? 'error' : 'fail'}
          markRun={runs}
          {checks}
          {spots}
          onspot={line => (cursorSpot = line)}
        />
      </div>

      <div class="actions">
        <button class="primary run" onclick={run} disabled={running} title="Run ({modKey}+Enter)">
          {running ? 'Running…' : 'Run'}<kbd>{modKey} ⏎</kbd>
        </button>
        <button onclick={reset} title="Restore the original koan">Reset</button>
        <span class="share">
          <button class="share-button" onclick={share} title="A link to this koan with your code in it">{@render shareIcon()} Share</button>
          {@render sharedNote()}
        </span>
        <span class="spacer"></span>
        {#if nav.prev}<a href={course.href(nav.prev.id)} class="nav-button"><span class="soft">←</span> {nav.prev.title}</a>{/if}
        {#if nav.next}<a href={course.href(nav.next.id)} class="nav-button"><span class="soft">Next:</span> <strong>{nav.next.title}</strong> →</a>{/if}
      </div>
      <p class="report"><a href={reportHref} target="_blank" rel="noopener">Report a problem with this koan</a></p>
    </div>

    <aside class:open={sheet}>
      <button class="sheet-close" onclick={() => (sheet = false)} aria-label="Close the report">×</button>
      <Meditation words={koan.words} shared={sharing === 'yes'} {report} {gained} {running} {loading} {hint} onuse={() => hint && editor.fillAnswer(hint)} {runtimeError} {pack} pathHref={course.href()} nextHref={nav.next ? course.href(nav.next.id) : undefined} />
    </aside>
  </div>

  <!-- On a phone: Run within thumb reach, and the result in a line. -->
  <div class="bar">
    <button class="summary" class:bad={report && report.status !== 'passed'} class:good={report?.status === 'passed'} onclick={() => (sheet = true)} aria-label="Show the test report: {summary}">
      <span>{summary}</span>
      {#if loading?.fraction !== undefined}
        <span class="bar-track loading"><span style:width="{Math.round(loading.fraction * 100)}%"></span></span>
      {:else if report && report.status !== 'error' && report.tests.length}
        <span class="bar-track"><span style:width="{Math.round((passing / report.tests.length) * 100)}%"></span></span>
      {/if}
    </button>
    <span class="share">
      <button class="bar-share" onclick={share} aria-label="Share your code">{@render shareIcon()}</button>
      {@render sharedNote()}
    </span>
    <button class="bar-run" onclick={run} disabled={running}>{running ? '…' : 'Run'}</button>
  </div>
  {#if sheet}<button class="backdrop" onclick={() => (sheet = false)} aria-label="Close the report"></button>{/if}
</article>

<style>
  article {
    padding: 1.5rem 0 3rem;
    --lang: var(--lang-light);
    --on-lang: #fff;
  }
  :global([data-theme='dark']) article { --lang: var(--lang-dark); --on-lang: var(--bg); }
  .crumbs { display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: var(--ink-faint); margin-bottom: 0.8rem; }
  .crumbs a { color: var(--ink-soft); }
  .crumbs span { margin: 0 0.1rem; }
  .layout { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 1.75rem; align-items: start; }
  /* Sticks below the site's header, and scrolls inside rather than run past the window. */
  aside {
    position: sticky;
    top: calc(var(--bar-height, 0px) + 1rem);
    max-height: calc(100vh - var(--bar-height, 0px) - 2rem);
    overflow-y: auto;
  }
  .title-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.6rem 1rem; }
  h1 { font-size: clamp(1.7rem, 4vw, 2.4rem); display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap; }
  .badge {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--pass);
    color: var(--bg);
    padding: 0.15rem 0.6rem;
  }
  /* The group's koans, one dot each: filled when solved, ringed for this one. Each link is a
     24 px target (WCAG's smallest), with its 14 px dot drawn in the middle. */
  .dots { display: flex; align-items: center; gap: 0.35rem; }
  .dots ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; }
  .dots a { display: grid; place-items: center; width: 24px; height: 24px; }
  .dots a::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid var(--line);
    transition: transform 0.15s;
  }
  .dots a:hover::before { transform: scale(1.2); border-color: var(--lang); }
  .dots a.done::before { background: var(--lang); border-color: var(--lang); }
  .dots a.here::before { border-color: var(--lang); box-shadow: 0 0 0 3px color-mix(in srgb, var(--lang) 28%, transparent); }
  .count { font-size: 0.82rem; color: var(--ink-soft); white-space: nowrap; }
  .intro code {
    font-family: var(--font-mono);
    font-size: 0.86em;
    padding: 0.08em 0.38em;
    margin: 0 0.06em;
    color: var(--ink);
    background: color-mix(in srgb, var(--ink) 7%, transparent);
    white-space: nowrap;
  }
  .intro code.blank { color: var(--syn-blank); background: color-mix(in srgb, var(--syn-blank) 14%, transparent); }
  .intro { color: var(--ink-soft); margin: 0.7rem 0 1.3rem; max-width: 40rem; line-height: 1.7; font-size: 1.02rem; }

  /* The editor, framed as the language's test file. */
  .frame { border: 1px solid var(--line); border-top: 3px solid var(--lang); box-shadow: var(--shadow); background: var(--code-bg); }
  .frame :global(.editor) { border: none; box-shadow: none; }
  .file-bar { display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0.85rem; border-bottom: 1px solid var(--line); background: var(--bg-raised); font-size: 0.8rem; }
  .file { font-family: var(--font-mono); color: var(--ink); }
  .small { color: var(--ink-soft); }
  .pill { padding: 0.05rem 0.5rem; background: var(--bg-sunken); color: var(--ink-soft); font-weight: 600; }
  .pill.all { background: var(--pass-bg); color: var(--pass); }

  .actions { display: flex; gap: 0.6rem; align-items: center; margin-top: 1rem; flex-wrap: wrap; }
  .actions > button, .nav-button { min-height: 46px; box-sizing: border-box; }
  .run { display: inline-flex; align-items: center; gap: 0.6rem; background: var(--lang); border-color: var(--lang); color: var(--on-lang); }
  .run kbd { font-family: var(--font-body); font-size: 0.72rem; font-weight: 500; padding: 0.05rem 0.4rem; border: 1px solid color-mix(in srgb, var(--on-lang) 40%, transparent); }
  .spacer { flex: 1; }
  .nav-button {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0 1rem;
    border: 1px solid var(--line);
    background: var(--bg-raised);
    color: var(--ink);
    text-decoration: none;
    font-size: 0.92rem;
  }
  .nav-button:hover { border-color: var(--ink-faint); }
  .soft { color: var(--ink-soft); }
  .report { margin: 1.4rem 0 0; font-size: 0.82rem; }
  .report a { color: var(--ink-soft); }
  .report a:hover { color: var(--ink); }

  /* Someone's code from a shared link: a note above the editor, in gold (a caution, not an error). */
  .shared { display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem 0.9rem; padding: 0.75rem 1rem; margin-bottom: 1rem; background: var(--bg-raised); border: 1px solid var(--gold); }
  .shared svg { width: 22px; height: 22px; flex: none; fill: none; stroke: var(--gold); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .shared p { flex: 1 1 16rem; margin: 0; color: var(--ink-soft); font-size: 0.92rem; line-height: 1.5; }
  .shared strong { display: block; color: var(--ink); }
  .shared button { min-height: 44px; }

  /* Share, with a note of what it did just above it. */
  .share { position: relative; display: inline-flex; }
  .share-button { display: inline-flex; align-items: center; gap: 0.45rem; }
  .share svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .share-note {
    position: absolute;
    left: 0;
    bottom: calc(100% + 0.5rem);
    z-index: 5;
    margin: 0;
    padding: 0.6rem 0.85rem;
    background: var(--ink);
    color: var(--bg);
    font-size: 0.88rem;
    white-space: nowrap;
    box-shadow: var(--shadow);
  }
  .share-note input { margin-left: 0.4rem; width: 16rem; font: inherit; }

  .bar, .backdrop, .sheet-close { display: none; }

  @media (max-width: 860px) {
    .layout { grid-template-columns: minmax(0, 1fr); }
    aside { position: static; max-height: none; overflow: visible; }
  }
  @media (max-width: 640px) {
    article { padding-bottom: 6rem; }
    .run, .actions .share { display: none; }
    .nav-button { padding: 0 0.8rem; }
    /* The report is a sheet, opened from the bar. */
    aside {
      position: fixed;
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 30;
      max-height: 78vh;
      overflow-y: auto;
      background: var(--bg-raised);
      border-top: 1px solid var(--line);
      transform: translateY(100%);
      visibility: hidden;
      transition: transform 0.25s, visibility 0.25s;
    }
    aside.open { transform: none; visibility: visible; }
    aside :global(.panel) { border: none; }
    .sheet-close { display: block; position: sticky; top: 0; margin-left: auto; width: 44px; height: 44px; border: none; background: transparent; font-size: 1.5rem; z-index: 1; }
    .backdrop { display: block; position: fixed; inset: 0; z-index: 25; border: none; background: rgb(0 0 0 / 0.45); padding: 0; }
    .bar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      padding: 0.6rem 1rem calc(0.6rem + env(safe-area-inset-bottom));
      background: var(--bg-raised);
      border-top: 1px solid var(--line);
      box-shadow: 0 -6px 18px rgb(0 0 0 / 0.15);
    }
    .summary {
      flex: 1 1 auto;
      min-width: 0;
      min-height: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 0.3rem;
      padding: 0 0.2rem;
      border: none;
      background: transparent;
      color: var(--ink-soft);
      font-weight: 600;
      font-size: 0.9rem;
      text-align: left;
    }
    .summary > span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
    .summary.bad { color: var(--fail); }
    .summary.good { color: var(--pass); }
    .bar-track { display: block; width: 100%; height: 4px; background: var(--bg-sunken); }
    .bar-track > span { display: block; height: 4px; background: var(--pass); }
    .bar-track.loading > span { background: var(--lang); }
    .bar-share { flex: none; width: 52px; min-height: 52px; display: grid; place-items: center; padding: 0; }
    .bar-share svg { width: 22px; height: 22px; }
    .bar .share-note { left: auto; right: 0; }
    .share-note input { width: 11rem; }
    .bar-run { flex: none; min-width: 6rem; min-height: 52px; background: var(--lang); border-color: var(--lang); color: var(--on-lang); font-weight: 700; font-size: 1rem; }
  }
</style>
