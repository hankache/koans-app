<!--
  The home page: a koan to try on the spot, where to continue, every language's path, how a koan
  works, and a way to keep a copy of your progress. Laid out for a phone first.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import summary from '../generated/summary.json';
  import { packs } from '../../languages';
  import { progressFor } from '../lib/progress.svelte';
  import { href } from '../lib/route';
  import { exportName, makeExport, readImport } from '../lib/transfer';
  import { site } from '../site';

  // Each language's koans, from the build: enough for progress and "continue" without loading any language.
  interface KoanInfo {
    id: string;
    title: string;
    section: string;
  }
  const koanLists = summary as Record<string, KoanInfo[]>;
  const languages = packs.map(pack => ({ pack, progress: progressFor(pack.id), koans: koanLists[pack.id] ?? [] }));
  type Language = (typeof languages)[number];
  onMount(() => {
    for (const l of languages) void l.progress.ready();
  });

  // Current koans only: saved progress may include koans that were since removed.
  const passed = (l: Language, id: string) => l.progress.get(id)?.status === 'passed';
  const passedIn = (l: Language) => l.koans.filter(k => passed(l, k.id)).length;
  const startedIn = (l: Language) => l.koans.some(k => l.progress.get(k.id));
  const koans = (n: number, name = '') => `${n} ${name ? name + ' ' : ''}koan${n === 1 ? '' : 's'}`;

  // Where to continue: in the language worked on last, the koan worked on last if it isn't passed,
  // or else the next one that isn't.
  const resume = $derived.by(() => {
    let last: { l: Language; index: number; at: string } | null = null;
    for (const l of languages) {
      for (let index = 0; index < l.koans.length; index++) {
        const at = l.progress.get(l.koans[index].id)?.updatedAt;
        if (at && (!last || at > last.at)) last = { l, index, at };
      }
    }
    if (!last) return null;
    const { l, index } = last;
    const after = [...l.koans.slice(index), ...l.koans.slice(0, index)];
    const koan = after.find(k => !passed(l, k.id));
    return koan ? { l, koan, done: passedIn(l), total: l.koans.length } : null;
  });

  // "Try one": a one-blank koan, answered by tapping.
  const teasers = packs.filter(p => p.teaser);
  let tryId = $state(teasers.find(p => p.id === 'javascript')?.id ?? teasers[0]?.id);
  let picked = $state<string | null>(null);
  const tryPack = $derived(teasers.find(p => p.id === tryId));
  const teaser = $derived(tryPack?.teaser);
  const right = $derived(teaser !== undefined && picked === teaser.answer);

  function show(id: string) {
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  }

  // Export and import, out of the way until asked for.
  let keeping = $state(false);
  let note = $state<{ text: string; error?: boolean } | null>(null);
  let fileInput = $state<HTMLInputElement>();

  async function exportProgress() {
    await Promise.all(languages.map(l => l.progress.ready()));
    const file = makeExport(Object.fromEntries(languages.map(l => [l.pack.id, l.progress.snapshot()])));
    const url = URL.createObjectURL(new Blob([JSON.stringify(file, null, 2) + '\n'], { type: 'application/json' }));
    const name = exportName();
    Object.assign(document.createElement('a'), { href: url, download: name }).click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    const saved = Object.values(file.languages).reduce((n, map) => n + Object.keys(map).length, 0);
    note = { text: `Saved ${koans(saved)} to ${name}.` };
  }

  async function importProgress() {
    const file = fileInput?.files?.[0];
    if (fileInput) fileInput.value = ''; // so choosing the same file again still counts
    if (!file) return;
    let text: string;
    try {
      text = await file.text();
    } catch {
      note = { text: 'That file could not be read. Try choosing it again.', error: true };
      return;
    }
    try {
      const found = readImport(text, packs.map(p => p.id));
      const taken: string[] = [];
      for (const l of languages) {
        const entries = found.languages[l.pack.id];
        if (!entries) continue;
        await l.progress.ready();
        const n = await l.progress.merge(entries);
        if (n) taken.push(koans(n, l.pack.name));
      }
      const extra = [
        found.skipped ? `${found.skipped} damaged ${found.skipped === 1 ? 'entry was' : 'entries were'} left out.` : '',
        found.unknown.length ? `This site has no ${found.unknown.join(', ')}.` : '',
      ].filter(Boolean).join(' ');
      note = {
        text: (taken.length
          ? `Imported ${taken.join(' and ')}.`
          : 'Nothing new: your progress here is already as recent as the file.') + (extra ? ' ' + extra : ''),
      };
    } catch (e) {
      note = { text: (e as Error).message, error: true };
    }
  }
</script>

<svelte:head><title>{site.name}</title></svelte:head>

<div class="home">
  <section class="hero">
    <div class="pitch">
      <p class="eyebrow">Programming koans</p>
      <h1>Learn a language, one&nbsp;koan at a&nbsp;time.</h1>
      <p class="lead">
        A koan is a small program whose tests fail. Make them pass, one blank at a time, and the
        language itself tells you whether you got it right.
      </p>
      <ul class="facts">
        <li>Test-driven</li>
        <li>Runs in your browser</li>
        <li>No sign-up</li>
      </ul>
      <div class="ctas">
        <button class="cta" onclick={() => show('languages')}>Choose a language</button>
        <button class="secondary" onclick={() => show('what')}>What is a koan?</button>
      </div>
    </div>

    {#if teaser && tryPack}
      <div class="try">
        <div class="tabs" role="tablist" aria-label="Try a koan in">
          {#each teasers as p (p.id)}
            <button
              role="tab"
              aria-selected={p.id === tryId}
              class:selected={p.id === tryId}
              onclick={() => {
                tryId = p.id;
                picked = null;
              }}>{p.name}</button>
          {/each}
        </div>
        <div class="try-body">
          <p class="hint">Try one. Which answer makes the test pass?</p>
          <pre class="code">{#if teaser.context}<span class="context">{teaser.context}</span>
{/if}{teaser.before}<span class="blank" class:filled={right}>{right ? teaser.answer : '___'}</span>{teaser.after}</pre>
          <div class="choices">
            {#each teaser.choices as choice (choice)}
              <button
                class="choice"
                class:good={picked === choice && right}
                class:bad={picked === choice && !right}
                onclick={() => (picked = choice)}>{choice}</button>
            {/each}
          </div>
          <p class="feedback" class:good={right} class:bad={picked !== null && !right} role="status">
            {#if picked === null}Tap an answer.{:else if right}✓ Enlightenment! {teaser.why}{:else}Not quite. Try another answer.{/if}
          </p>
        </div>
      </div>
    {/if}
  </section>

  {#if resume}
    <a class="resume" href={href(resume.l.pack.id, resume.koan.id)}>
      <span class="mark" style:--accent-light={resume.l.pack.look.accent.light} style:--accent-dark={resume.l.pack.look.accent.dark}>
        {resume.l.pack.look.monogram}
      </span>
      <span class="resume-text">
        <span class="small">Continue where you left off</span>
        <span class="resume-title">{resume.l.pack.name} · {resume.koan.title}</span>
        <span class="bar-row">
          <span class="bar" style:--accent-light={resume.l.pack.look.accent.light} style:--accent-dark={resume.l.pack.look.accent.dark}>
            <span style:width="{Math.round((resume.done / resume.total) * 100)}%"></span>
          </span>
          <span class="small">{resume.done} of {resume.total}</span>
        </span>
      </span>
      <span class="go" aria-hidden="true">→</span>
    </a>
  {/if}

  <section id="languages" class="paths">
    <div class="heading">
      <h2>Choose your path</h2>
      <p>Each path starts with the first assertion and ends deep in the language.</p>
    </div>
    <ul class="tiles">
      {#each languages as l (l.pack.id)}
        {@const done = passedIn(l)}
        <li>
          <a class="tile" href={href(l.pack.id)} style:--accent-light={l.pack.look.accent.light} style:--accent-dark={l.pack.look.accent.dark}>
            <span class="tile-top">
              {#if l.pack.art}
                <img src="{import.meta.env.BASE_URL}{l.pack.art.logo.src}" alt="" width="44" height="44" />
              {:else}
                <span class="mark">{l.pack.look.monogram}</span>
              {/if}
              <span>
                <span class="name">{l.pack.name}</span>
                <span class="small">{koans(l.koans.length)}</span>
              </span>
            </span>
            <code class="sample">{l.pack.sample}</code>
            <span class="fill"></span>
            {#if done === l.koans.length && done > 0}
              <span class="status">Walked ✓</span>
            {:else if startedIn(l)}
              <span class="bar-row progress">
                <span class="bar"><span style:width="{Math.round((done / l.koans.length) * 100)}%"></span></span>
                <span class="small">{done}/{l.koans.length}</span>
              </span>
            {:else}
              <span class="status">Begin →</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </section>

  <section id="what" class="how">
    <h2>What is a koan?</h2>
    <div class="about">
      <p>
        In Zen, a koan is a short puzzle you think about until it makes sense. Here, a koan is a few
        lines of code with tests that fail, and a blank, <code class="blank">___</code>, where the
        answer goes.
      </p>
      <p>
        <strong>It's test-driven.</strong> In test-driven development (TDD), you write a failing test
        first, then make it pass: red, then green. A koan gives you the failing test; you turn it green.
      </p>
    </div>
    <ol class="steps">
      <li>
        <span class="num red">1</span>
        <span><strong>Red</strong>Read the koan: a short intro, and tests that don't pass yet.</span>
      </li>
      <li>
        <span class="num">2</span>
        <span><strong>Fill the blank</strong>Replace each <code class="blank">___</code> with what makes its test pass. Stuck? Reveal the answer.</span>
      </li>
      <li>
        <span class="num pass">3</span>
        <span><strong>Green</strong>The language's own interpreter runs your code, right in the page. When every test passes: enlightenment.</span>
      </li>
    </ol>
  </section>

  <section class="promises">
    <div>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /><path d="M3 3l18 18" /></svg>
      <strong>Nothing to install</strong>
      <span>Every interpreter runs in your browser.</span>
    </div>
    <div>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /><path d="M3 3l18 18" /></svg>
      <strong>No account</strong>
      <span>Open a koan and start.</span>
    </div>
    <div>
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
      <strong>Private progress</strong>
      <span>Kept in your browser. Export it anytime.</span>
    </div>
    <div>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>
      <strong>The real thing</strong>
      <span>CPython, Ruby, SQLite and the rest check every answer.</span>
    </div>
  </section>

  <section class="keep">
    <button class="keep-toggle" aria-expanded={keeping} onclick={() => (keeping = !keeping)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg>
      Export or import your progress
    </button>
    {#if keeping}
      <div class="keep-panel">
        <p>
          Progress is saved in this browser only. Export it to keep a copy, or to carry it to another
          browser. Importing keeps whichever is newer for each koan, so it never undoes your work.
        </p>
        <div class="buttons">
          <button onclick={exportProgress}>Export progress</button>
          <button onclick={() => fileInput?.click()}>Import progress…</button>
          <input bind:this={fileInput} type="file" accept="application/json,.json" onchange={importProgress} hidden />
        </div>
        {#if note}<p class="note" class:error={note.error} role="status">{note.text}</p>{/if}
      </div>
    {/if}
  </section>
</div>

<style>
  .home {
    --home-accent: #b8327a;
    --badge-red: #a3402a;
    --badge-green: #1f7a52;
    display: flex;
    flex-direction: column;
    padding: 56px 0 24px;
  }
  :global([data-theme='dark']) .home { --home-accent: #f07cb6; --badge-red: var(--fail); --badge-green: var(--pass); }
  /* A language's own colour, in either theme. */
  .tile, .mark, .bar { --accent: var(--accent-light, var(--ink)); }
  :global([data-theme='dark']) .tile, :global([data-theme='dark']) .mark, :global([data-theme='dark']) .bar {
    --accent: var(--accent-dark, var(--ink));
  }

  h2 { font-size: 32px; }
  .small { font-size: 13px; color: var(--ink-soft); }
  .blank { font-family: var(--font-mono); color: var(--home-accent); font-weight: 600; }

  /* Hero */
  .hero { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px; align-items: center; order: 1; }
  .pitch { display: flex; flex-direction: column; gap: 18px; }
  .eyebrow { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--home-accent); }
  h1 { font-size: 52px; line-height: 1.08; letter-spacing: -0.02em; }
  .lead { margin: 0; font-size: 18px; color: var(--ink-soft); max-width: 34rem; }
  .facts { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .facts li { padding: 6px 12px; border: 1px solid var(--line); background: var(--bg-raised); font-size: 14px; font-weight: 500; }
  .ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
  .cta, .secondary { min-height: 48px; padding: 0 22px; font-weight: 600; }
  .cta { background: var(--ink); color: var(--bg); border-color: var(--ink); }
  .secondary { background: transparent; }

  .try { background: var(--bg-raised); border: 1px solid var(--line); box-shadow: var(--shadow); min-width: 0; }
  .tabs { display: flex; border-bottom: 1px solid var(--line); overflow-x: auto; }
  .tabs button {
    flex: none;
    min-height: 48px;
    padding: 0 18px;
    border: 0;
    border-bottom: 3px solid transparent;
    background: transparent;
    color: var(--ink-soft);
    font-weight: 600;
    font-size: 14px;
  }
  .tabs button.selected { color: var(--ink); border-bottom-color: var(--home-accent); }
  .try-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
  .hint { margin: 0; font-size: 14px; color: var(--ink-soft); }
  .code {
    margin: 0;
    padding: 18px 20px;
    background: var(--code-bg);
    border: 1px solid var(--line);
    font: 16px/1.7 var(--font-mono);
    overflow-x: auto;
    white-space: pre;
  }
  .context { color: var(--ink-soft); }
  .code .blank { padding: 1px 6px; background: color-mix(in srgb, var(--home-accent) 14%, transparent); }
  .code .blank.filled { background: var(--pass-bg); color: var(--pass); }
  .choices { display: flex; flex-wrap: wrap; gap: 10px; }
  .choice { min-height: 48px; min-width: 72px; padding: 0 18px; font: 600 16px var(--font-mono); }
  .choice.good { border-color: var(--pass); background: var(--pass-bg); }
  .choice.bad { border-color: var(--fail); background: var(--fail-bg); }
  .feedback { margin: 0; min-height: 26px; font-weight: 600; color: var(--ink-soft); }
  .feedback.good { color: var(--pass); }
  .feedback.bad { color: var(--fail); }

  /* Continue */
  .resume {
    order: 2;
    margin-top: 48px;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 22px;
    background: var(--bg-raised);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
    text-decoration: none;
  }
  .resume:hover { border-color: var(--ink-faint); }
  .resume-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
  .resume-title { font-family: var(--font-display); font-weight: 700; font-size: 20px; line-height: 1.2; }
  .go { flex: none; font-size: 24px; font-weight: 600; }
  .mark {
    flex: none;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--accent) 14%, transparent);
    color: var(--accent);
    font: 600 16px var(--font-mono);
  }
  .bar-row { display: flex; align-items: center; gap: 10px; }
  .bar { flex: 0 1 240px; height: 5px; background: var(--bg-sunken); }
  .bar > span { display: block; height: 5px; background: var(--accent); }

  /* Languages */
  .paths { order: 3; padding-top: 64px; }
  .heading { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 24px; margin-bottom: 24px; }
  .heading p { margin: 0; color: var(--ink-soft); }
  .tiles { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .tile {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
    min-height: 196px;
    background: var(--bg-raised);
    border: 1px solid var(--line);
    border-top: 4px solid var(--accent);
    text-decoration: none;
    transition: transform 0.15s, border-color 0.15s;
  }
  .tile:hover { transform: translateY(-2px); border-color: var(--ink-faint); border-top-color: var(--accent); }
  .tile-top { display: flex; align-items: center; gap: 12px; }
  .tile-top > span:last-child { display: flex; flex-direction: column; min-width: 0; }
  .tile img { width: 44px; height: 44px; object-fit: cover; flex: none; }
  .tile .mark { width: 44px; height: 44px; font-size: 15px; }
  .name { font-family: var(--font-display); font-weight: 700; font-size: 20px; line-height: 1.2; }
  .sample {
    display: block;
    padding: 8px 10px;
    background: var(--code-bg);
    border: 1px solid var(--line);
    font-size: 12.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--ink-soft);
  }
  .fill { flex-grow: 1; }
  .status { font-size: 14px; font-weight: 600; }
  .progress .bar { flex: 1 1 auto; }

  /* How it works */
  /* isolate: so the full-width band (::before) sits behind this section, not behind the page. */
  .how { order: 4; margin-top: 72px; padding: 56px 0; position: relative; isolation: isolate; }
  .how::before {
    content: '';
    position: absolute;
    inset: 0 calc(50% - 50vw);
    background: var(--bg-sunken);
    border-block: 1px solid var(--line);
    z-index: -1;
  }
  .how h2 { margin-bottom: 16px; }
  .about { max-width: 46rem; margin-bottom: 28px; color: var(--ink-soft); }
  .about p { margin: 0 0 12px; }
  .about strong { color: var(--ink); }
  .steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .steps li { display: flex; flex-direction: column; gap: 12px; padding: 22px; background: var(--bg-raised); border: 1px solid var(--line); color: var(--ink-soft); }
  .steps strong { display: block; margin-bottom: 4px; font-family: var(--font-display); font-size: 20px; color: var(--ink); }
  .num { width: 36px; height: 36px; display: grid; place-items: center; background: var(--ink); color: var(--bg); font-weight: 600; }
  /* Light text on these needs darker shades than the theme's result colours, in the light theme. */
  .num.pass { background: var(--badge-green); }
  .num.red { background: var(--badge-red); }

  /* Promises */
  .promises { order: 5; padding: 48px 0 16px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
  .promises div { display: flex; flex-direction: column; gap: 4px; }
  .promises span { font-size: 14px; color: var(--ink-soft); }
  .promises svg { width: 24px; height: 24px; margin-bottom: 6px; }
  svg { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .promises svg { stroke: var(--home-accent); }

  /* Export and import */
  .keep { order: 6; padding-top: 24px; border-top: 1px solid var(--line); margin-top: 24px; }
  .keep-toggle { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; font-weight: 500; }
  .keep-toggle svg { width: 18px; height: 18px; }
  .keep-panel { margin-top: 12px; max-width: 42rem; }
  .keep-panel p { color: var(--ink-soft); margin: 0 0 12px; font-size: 15px; }
  .buttons { display: flex; flex-wrap: wrap; gap: 10px; }
  .buttons button { min-height: 44px; }
  .note { margin-top: 12px !important; color: var(--ink) !important; }
  .note.error { color: var(--fail) !important; }

  @media (max-width: 900px) {
    .hero { grid-template-columns: minmax(0, 1fr); gap: 32px; }
    .tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .promises { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 640px) {
    .home { padding-top: 16px; }
    /* On a phone, a returning learner sees where to continue first. */
    .resume { order: 0; margin: 0 0 24px; padding: 14px; gap: 12px; }
    .resume .bar { flex: 1 1 auto; }
    .resume-title { font-size: 18px; }
    .hero { padding-top: 8px; }
    h1 { font-size: 36px; }
    .lead { font-size: 17px; }
    h2 { font-size: 26px; }
    .try-body { padding: 16px; }
    .code { padding: 14px; font-size: 15px; }
    .choices { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
    .choice { min-width: 0; padding: 0 8px; min-height: 52px; }
    .paths { padding-top: 48px; }
    .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .tile { padding: 14px; min-height: 164px; gap: 10px; }
    /* The mark above the name, so a long name like TypeScript gets the tile's whole width. */
    .tile-top { flex-direction: column; align-items: flex-start; gap: 10px; }
    .tile .mark, .tile img { width: 40px; height: 40px; font-size: 14px; }
    .name { font-size: 18px; }
    .sample { display: none; }
    .how { margin-top: 48px; padding: 36px 0; }
    .steps { grid-template-columns: minmax(0, 1fr); gap: 10px; }
    .steps li { flex-direction: row; gap: 14px; padding: 16px; font-size: 15px; }
    .steps strong { font-family: var(--font-body); font-size: 16px; }
    .num { flex: none; width: 32px; height: 32px; }
  }
</style>
