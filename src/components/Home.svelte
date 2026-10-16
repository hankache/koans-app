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
  import Emblem from './Emblem.svelte';
  import { inlineCode } from '../lib/inline-code';
  import type { Kind } from '../lib/language';

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

  // "Try one": a one-blank koan, answered by tapping, in any language, with another on request.
  let tryId = $state('javascript');
  let tryIndex = $state(0);
  let picked = $state<string | null>(null);
  const tryPack = $derived(packs.find(p => p.id === tryId) ?? packs[0]);
  const teaser = $derived(tryPack.teasers[tryIndex % tryPack.teasers.length]);
  const right = $derived(picked === teaser.answer);
  function tryIn(id: string) {
    tryId = id;
    tryIndex = 0;
    picked = null;
  }

  // What each path suits: the filters fade the others out.
  const FILTERS: { id: Kind | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'start', label: 'Start programming' },
    { id: 'web', label: 'Build for the web' },
    { id: 'data', label: 'Work with data' },
    { id: 'automate', label: 'Automate tasks' },
    { id: 'think', label: 'Think differently' },
  ];
  let filter = $state<Kind | 'all'>('all');
  const matches = (l: Language) => filter === 'all' || l.pack.kinds.includes(filter);

  // "What is a koan?": a koan going red, filled, green, over and over, unless motion is unwelcome.
  let step = $state(2);
  $effect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    step = 0;
    const timer = setInterval(() => (step = (step + 1) % 3), 1800);
    return () => clearInterval(timer);
  });

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
      <p class="lead">Read the code, fill the blank, watch the test turn green. Your&nbsp;sensei? The language itself.</p>
      <ul class="facts">
        <li>Test-driven</li>
        <li>In your browser</li>
        <li>No sign-up</li>
        <li>Saved locally</li>
      </ul>
      <div class="pick">
        <span class="small">Pick a path</span>
        <ul class="emblems">
          {#each languages as l (l.pack.id)}
            <li>
              <a href={href(l.pack.id)} title={l.pack.name} aria-label={l.pack.name}
                style:--accent-light={l.pack.look.accent.light} style:--accent-dark={l.pack.look.accent.dark}>
                <Emblem pack={l.pack} size={40} />
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="try">
      <div class="try-head">
        <span class="small">Try one, in <strong>{tryPack.name}</strong></span>
        <div class="tabs" role="tablist" aria-label="Language to try">
          {#each packs as p (p.id)}
            <button
              role="tab"
              aria-selected={p.id === tryId}
              aria-label={p.name}
              title={p.name}
              class:selected={p.id === tryId}
              style:--accent-light={p.look.accent.light}
              style:--accent-dark={p.look.accent.dark}
              onclick={() => tryIn(p.id)}><Emblem pack={p} size={30} /></button>
          {/each}
        </div>
      </div>
      <div class="try-body">
        <p class="hint">Which answer makes the test pass?</p>
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
        <div class="try-foot">
          <p class="feedback" class:good={right} class:bad={picked !== null && !right} role="status">
            {#if picked === null}Tap an answer.{:else if right}✓ Enlightenment! {teaser.why}{:else}Not quite. Try another answer.{/if}
          </p>
          {#if tryPack.teasers.length > 1}
            <button class="another" onclick={() => { tryIndex += 1; picked = null; }}>↻ Another</button>
          {/if}
        </div>
      </div>
    </div>
  </section>

  {#if resume}
    <a class="resume" href={href(resume.l.pack.id, resume.koan.id)}>
      <span class="mark" style:--accent-light={resume.l.pack.look.accent.light} style:--accent-dark={resume.l.pack.look.accent.dark}>
        <Emblem pack={resume.l.pack} size={40} />
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
      <p>Same zen. Different syntax.</p>
    </div>
    <div class="filters" role="group" aria-labelledby="filters-label">
      <span id="filters-label" class="filters-label">What do you want to do?</span>
      {#each FILTERS as f (f.id)}
        <button aria-pressed={filter === f.id} class:on={filter === f.id} onclick={() => (filter = f.id)}>{f.label}</button>
      {/each}
    </div>
    <ul class="tiles">
      {#each languages as l (l.pack.id)}
        {@const done = passedIn(l)}
        <li>
          <a class="tile" class:dim={!matches(l)} href={href(l.pack.id)}
            style:--accent-light={l.pack.look.accent.light} style:--accent-dark={l.pack.look.accent.dark}>
            <span class="tile-top">
              <span class="mark"><Emblem pack={l.pack} size={44} /></span>
              <span class="tile-name">
                <span class="name">{l.pack.name}</span>
                <span class="tag">{l.pack.tag}</span>
              </span>
            </span>
            <span class="journey">{#each inlineCode(l.pack.journey) as part}{#if part.code}<code>{part.text}</code>{:else}{part.text}{/if}{/each}</span>
            <span class="meta"><code class="framework">{l.pack.framework}</code><span class="small">{koans(l.koans.length)}</span></span>
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
            <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </a>
        </li>
      {/each}
    </ul>
  </section>

  <section id="what" class="how">
    <div class="how-text">
      <h2>What is a koan?</h2>
      <div class="about">
        <p>
          In Zen, a koan is a paradox meant to short-circuit logic and wake you up. Here, logic is
          allowed: a few lines of code, a test that fails, and a blank, <code class="blank">___</code>,
          waiting for your answer.
        </p>
        <p>
          <strong>Test-driven.</strong> Every koan comes with its tests already written, and already
          failing. Your answer turns them from red to green.
        </p>
      </div>
      <ol class="steps">
        <li class:now={step === 0}>
          <span class="num red">1</span>
          <span><strong>Red</strong>Read the koan: a short intro, and tests that don't pass yet.</span>
        </li>
        <li class:now={step === 1}>
          <span class="num fill-in">2</span>
          <span><strong>Fill the blank</strong>Replace each <code class="blank">___</code> with what makes its test pass. Stuck? Reveal the answer.</span>
        </li>
        <li class:now={step === 2}>
          <span class="num pass">3</span>
          <span><strong>Green</strong>The language's own interpreter runs your code, right in the page. When every test passes: enlightenment.</span>
        </li>
      </ol>
    </div>
    <figure class="demo" aria-label="A koan going from red to green">
      <pre class="demo-code"><span class="kw">assert</span> 1 + 1 == <span class="blank" class:typing={step === 1} class:filled={step === 2}>{step === 0 ? '___' : '2'}</span>, <span class="str">'one and one'</span>
<span class="kw">assert</span> <span class="str">'Py'</span> + <span class="str">'thon'</span> == <span class="str">'Python'</span>, <span class="str">'strings join'</span></pre>
      <figcaption class="demo-result" class:red={step === 0} class:green={step === 2} role="presentation">
        {#if step === 0}✗ A test fails: meditate on line 1{:else if step === 1}Running…{:else}✓ Enlightenment! Both tests pass.{/if}
      </figcaption>
    </figure>
  </section>

  <section class="story">
    <div class="story-text">
      <h2>No test ever fails in the wrong place.</h2>
      <p>Red is where you are. Green is where you're going. Walk on.</p>
    </div>
    <div class="story-actions">
      <a class="action" href="{site.repo}/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">Contribute</a>
      <button class="action keep-toggle" aria-expanded={keeping} onclick={() => (keeping = !keeping)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg>
        Export or import your progress
      </button>
    </div>
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
  .tile, .mark, .bar, .emblems a, .tabs button { --accent: var(--accent-light, var(--ink)); }
  :global([data-theme='dark']) :is(.tile, .mark, .bar, .emblems a, .tabs button) { --accent: var(--accent-dark, var(--ink)); }

  h2 { font-size: 32px; }
  .small { font-size: 13px; color: var(--ink-soft); }
  .blank { font-family: var(--font-mono); color: var(--home-accent); font-weight: 600; }
  svg { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  /* Hero */
  .hero { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 56px; align-items: start; order: 1; }
  .pitch { display: flex; flex-direction: column; gap: 18px; }
  .eyebrow { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--home-accent); }
  h1 { font-size: 54px; line-height: 1.05; letter-spacing: -0.02em; }
  .lead { margin: 0; font-size: 18px; color: var(--ink-soft); max-width: 32rem; }
  .facts { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .facts li { padding: 5px 11px; border: 1px solid var(--line); background: var(--bg-raised); font-size: 14px; font-weight: 500; white-space: nowrap; }
  .pick { display: flex; flex-direction: column; gap: 10px; margin-top: 6px; }
  .emblems { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
  .emblems a {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--accent) 11%, transparent);
    transition: transform 0.15s;
  }
  .emblems a:hover { transform: translateY(-2px); }

  .try { background: var(--bg-raised); border: 1px solid var(--line); box-shadow: var(--shadow); min-width: 0; }
  .try-head { padding: 14px 16px 12px; border-bottom: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px; }
  .try-head strong { color: var(--ink); }
  .tabs { display: flex; gap: 4px; overflow-x: auto; }
  .tabs button {
    flex: none;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid transparent;
    background: transparent;
  }
  .tabs button.selected { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 11%, transparent); }
  .try-body { padding: 20px 24px 22px; display: flex; flex-direction: column; gap: 16px; }
  .hint { margin: 0; font-size: 14px; color: var(--ink-soft); }
  .code {
    margin: 0;
    padding: 16px 18px;
    background: var(--code-bg);
    border: 1px solid var(--line);
    font: 15px/1.7 var(--font-mono);
    font-variant-ligatures: none; /* the font shorthand resets it */
    overflow-x: auto;
    white-space: pre;
  }
  .context { color: var(--ink-soft); }
  .code .blank { padding: 1px 6px; background: color-mix(in srgb, var(--home-accent) 14%, transparent); }
  .code .blank.filled { background: var(--pass-bg); color: var(--pass); }
  .choices { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .choice { min-height: 52px; padding: 0 8px; font: 600 15px var(--font-mono); font-variant-ligatures: none; overflow-wrap: anywhere; }
  .choice.good { border-color: var(--pass); background: var(--pass-bg); }
  .choice.bad { border-color: var(--fail); background: var(--fail-bg); }
  .try-foot { display: flex; align-items: flex-start; gap: 12px; }
  .feedback { flex: 1 1 auto; margin: 0; min-height: 48px; font-weight: 600; color: var(--ink-soft); }
  .feedback.good { color: var(--pass); }
  .feedback.bad { color: var(--fail); }
  .another { flex: none; min-height: 40px; padding: 0 12px; background: transparent; font-weight: 500; }

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
    background: color-mix(in srgb, var(--accent) 11%, transparent);
  }
  .bar-row { display: flex; align-items: center; gap: 10px; }
  .bar { flex: 0 1 240px; height: 5px; background: var(--bg-sunken); }
  .bar > span { display: block; height: 5px; background: var(--accent); }

  /* Languages */
  .paths { order: 3; padding-top: 72px; }
  .heading { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 24px; margin-bottom: 18px; }
  .heading p { margin: 0; color: var(--ink-soft); }
  .filters { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 24px; }
  .filters-label { margin-right: 6px; font-size: 14px; color: var(--ink-soft); }
  .filters button { flex: none; min-height: 40px; padding: 0 16px; font-weight: 500; font-size: 14px; white-space: nowrap; }
  .filters button.on { background: var(--ink); border-color: var(--ink); color: var(--bg); }
  .tiles { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .tile {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px;
    min-height: 232px;
    background: var(--bg-raised);
    border: 1px solid var(--line);
    border-top: 4px solid var(--accent);
    text-decoration: none;
    transition: transform 0.15s, border-color 0.15s, opacity 0.2s;
  }
  .tile:hover { transform: translateY(-2px); border-color: var(--ink-faint); border-top-color: var(--accent); }
  .tile.dim { opacity: 0.32; }
  .tile-top { display: flex; align-items: center; gap: 14px; }
  .tile-name { display: flex; flex-direction: column; min-width: 0; }
  .tile .mark { width: 56px; height: 56px; }
  .name { font-family: var(--font-display); font-weight: 700; font-size: 22px; line-height: 1.15; }
  .tag { font-size: 14px; color: var(--ink-soft); }
  .journey { font-size: 14px; line-height: 1.45; color: var(--ink-soft); }
  .journey code { font-size: 0.92em; color: var(--ink); }
  .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; }
  .framework { padding: 2px 8px; border: 1px solid var(--line); background: var(--bg); font-size: 12px; }
  .fill { flex-grow: 1; }
  .status { font-size: 15px; font-weight: 600; }
  .progress .bar { flex: 1 1 auto; }
  .chevron { display: none; }

  /* How it works */
  /* isolate: so the full-width band (::before) sits behind this section, not behind the page. */
  .how {
    order: 4;
    margin-top: 80px;
    padding: 64px 0;
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 48px;
    align-items: center;
  }
  .how::before {
    content: '';
    position: absolute;
    inset: 0 calc(50% - 50vw);
    background: var(--bg-sunken);
    border-block: 1px solid var(--line);
    z-index: -1;
  }
  .how h2 { margin-bottom: 16px; }
  .about { color: var(--ink-soft); }
  .about p { margin: 0 0 12px; }
  .about strong { color: var(--ink); }
  .steps { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  .steps li {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 14px 16px;
    border: 1px solid transparent;
    color: var(--ink-soft);
    font-size: 15px;
    transition: background 0.3s, border-color 0.3s;
  }
  .steps li.now { background: var(--bg-raised); border-color: var(--line); }
  .steps strong { display: block; color: var(--ink); }
  .num { flex: none; width: 30px; height: 30px; display: grid; place-items: center; background: var(--line); color: var(--ink-soft); font-weight: 600; font-size: 14px; transition: background 0.3s; }
  /* Light text on these needs darker shades than the theme's result colours, in the light theme. */
  .now .num { background: var(--ink); color: var(--bg); }
  .now .num.red { background: var(--badge-red); }
  .now .num.fill-in { background: var(--home-accent); }
  .now .num.pass { background: var(--badge-green); }
  .demo { margin: 0; background: var(--bg-raised); border: 1px solid var(--line); box-shadow: var(--shadow); min-width: 0; }
  .demo-code { margin: 0; padding: 20px; font: 15px/1.8 var(--font-mono); font-variant-ligatures: none; overflow-x: auto; white-space: pre; }
  .demo-code .blank { padding: 1px 6px; background: color-mix(in srgb, var(--home-accent) 14%, transparent); transition: background 0.3s; }
  .demo-code .blank.typing { color: var(--ink); outline: 2px solid var(--home-accent); }
  .demo-code .blank.filled { background: var(--pass-bg); color: var(--pass); }
  .kw { color: var(--syn-keyword, #7a3fb0); }
  .str { color: var(--syn-string, #2f7a4f); }
  .demo-result { padding: 12px 20px; border-top: 1px solid var(--line); background: var(--bg-sunken); color: var(--ink-soft); font-weight: 600; font-size: 14px; }
  .demo-result.red { background: var(--fail-bg); color: var(--fail); }
  .demo-result.green { background: var(--pass-bg); color: var(--pass); }

  /* The story, and progress export */
  .story {
    order: 5;
    padding: 48px 0 8px;
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: 16px 40px;
    align-items: center;
  }
  .story h2 { font-size: 24px; margin-bottom: 6px; text-wrap: balance; }
  .story-text p { margin: 0; color: var(--ink-soft); text-wrap: pretty; }
  .story-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
  .action { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 16px; border: 1px solid var(--line); background: var(--bg-raised); text-decoration: none; font-weight: 500; }
  .action svg { width: 16px; height: 16px; }
  .keep-panel { grid-column: 1 / -1; max-width: 42rem; }
  .keep-panel p { color: var(--ink-soft); margin: 0 0 12px; font-size: 15px; }
  .buttons { display: flex; flex-wrap: wrap; gap: 10px; }
  .buttons button { min-height: 44px; }
  .note { margin-top: 12px !important; color: var(--ink) !important; }
  .note.error { color: var(--fail) !important; }

  @media (max-width: 900px) {
    .hero { grid-template-columns: minmax(0, 1fr); gap: 32px; }
    .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .how { grid-template-columns: minmax(0, 1fr); gap: 28px; }
    .story { grid-template-columns: minmax(0, 1fr); }
    .story-actions { justify-content: flex-start; }
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
    .pick { display: none; }
    .try-body { padding: 16px; }
    .code { padding: 14px; font-size: 14px; }
    .try-foot { flex-direction: column; gap: 4px; }
    .feedback { min-height: 44px; }
    .another { min-height: 44px; }
    .paths { padding-top: 48px; }
    /* The filters scroll sideways rather than wrap. */
    .filters { flex-wrap: nowrap; overflow-x: auto; margin: 0 -16px 16px; padding: 0 16px; }
    .filters-label { display: none; }
    /* One language per row: emblem, name and what it's for, its framework, an arrow. */
    .tiles { grid-template-columns: minmax(0, 1fr); gap: 8px; }
    .tile { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 4px 14px; min-height: 0; padding: 12px 12px 12px 10px; border-top-width: 1px; border-left: 4px solid var(--accent); }
    .tile:hover { transform: none; }
    .tile-top { flex: 1 1 0; min-width: 0; }
    .tile .mark { width: 52px; height: 52px; }
    .name { font-size: 19px; }
    .journey, .fill, .status { display: none; }
    .meta { order: 3; flex-basis: 100%; padding-left: 66px; }
    .progress { order: 4; flex-basis: 100%; padding-left: 66px; }
    .chevron { display: block; flex: none; width: 20px; height: 20px; }
    .how { margin-top: 48px; padding: 36px 0; }
    .steps li { padding: 12px; }
  }
</style>
