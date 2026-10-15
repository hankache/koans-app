<script lang="ts">
  import { untrack } from 'svelte';
  import { revealAnswer } from '../lib/koans';
  import type { Course } from '../lib/course';
  import type { Report } from '../lib/tap';
  import { inlineCode } from '../lib/inline-code';
  import { modKey, modPressed } from '../lib/platform';
  import Editor from './Editor.svelte';
  import Meditation from './Meditation.svelte';
  import Emblem from './Emblem.svelte';
  import { site } from '../site';

  let { course, id }: { course: Course; id: string } = $props();

  const { pack, progress } = untrack(() => course);
  const koan = $derived(course.koanById.get(id)!);
  const section = $derived(course.sectionOf(id));
  const nav = $derived(course.neighbours(id));
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
  untrack(() => course).getRuntime().ready.catch(e => {
    console.error(e);
    runtimeError = LOAD_ERROR;
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
    if (running) return 'Meditating…';
    if (!report) return runtimeError ?? 'Replace each ___, then Run';
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
        <span class="spacer"></span>
        {#if nav.prev}<a href={course.href(nav.prev.id)} class="nav-button"><span class="soft">←</span> {nav.prev.title}</a>{/if}
        {#if nav.next}<a href={course.href(nav.next.id)} class="nav-button"><span class="soft">Next:</span> <strong>{nav.next.title}</strong> →</a>{/if}
      </div>
      <p class="report"><a href={reportHref} target="_blank" rel="noopener">Report a problem with this koan</a></p>
    </div>

    <aside class:open={sheet}>
      <button class="sheet-close" onclick={() => (sheet = false)} aria-label="Close the report">×</button>
      <Meditation {report} {gained} {running} {hint} onuse={() => hint && editor.fillAnswer(hint)} {runtimeError} {pack} pathHref={course.href()} nextHref={nav.next ? course.href(nav.next.id) : undefined} />
    </aside>
  </div>

  <!-- On a phone: Run within thumb reach, and the result in a line. -->
  <div class="bar">
    <button class="summary" class:bad={report && report.status !== 'passed'} class:good={report?.status === 'passed'} onclick={() => (sheet = true)} aria-label="Show the test report: {summary}">
      <span>{summary}</span>
      {#if report && report.status !== 'error' && report.tests.length}
        <span class="bar-track"><span style:width="{Math.round((passing / report.tests.length) * 100)}%"></span></span>
      {/if}
    </button>
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
  aside { position: sticky; top: 1rem; }
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
  /* The group's koans, one dot each: filled when solved, ringed for this one. */
  .dots { display: flex; align-items: center; gap: 0.6rem; }
  .dots ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .dots a {
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid var(--line);
    transition: transform 0.15s;
  }
  .dots a:hover { transform: scale(1.2); border-color: var(--lang); }
  .dots a.done { background: var(--lang); border-color: var(--lang); }
  .dots a.here { border-color: var(--lang); box-shadow: 0 0 0 3px color-mix(in srgb, var(--lang) 28%, transparent); }
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

  .bar, .backdrop, .sheet-close { display: none; }

  @media (max-width: 860px) {
    .layout { grid-template-columns: minmax(0, 1fr); }
    aside { position: static; }
  }
  @media (max-width: 640px) {
    article { padding-bottom: 6rem; }
    .run { display: none; }
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
    .bar-run { flex: none; min-width: 6rem; min-height: 52px; background: var(--lang); border-color: var(--lang); color: var(--on-lang); font-weight: 700; font-size: 1rem; }
  }
</style>
