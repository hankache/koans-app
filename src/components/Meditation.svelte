<!-- The result panel: what the koan is trying to tell you. -->
<script lang="ts">
  import type { Report } from '../lib/tap';
  import type { Reveal } from '../lib/koans';
  import Emblem from './Emblem.svelte';
  import { inlineCode } from '../lib/inline-code';
  import { markCode } from '../../scripts/lib/code-words.mjs';
  import { modKey } from '../lib/platform';
  import type { LanguagePack } from '../lib/language';
  import type { Snippet } from 'svelte';

  interface Props {
    /** The language: its name and artwork. */
    pack: LanguagePack;
    /** The language's path, for "Back to the path" after the last koan. */
    pathHref: string;
    report: Report | null;
    /** Assertions this run got past that the previous run did not. */
    gained: number;
    running: boolean;
    runtimeError?: string;
    /** What the interpreter is doing while it loads, and how far its download has got (0 to 1). */
    loading?: { text: string; detail?: string; fraction?: number } | null;
    nextHref?: string;
    /** The answer on offer, hidden until the learner reveals it. */
    hint?: Reveal | null;
    /** Put the revealed answer into the code. */
    onuse?: () => void;
    /** The koan's code words, space-separated: shown as code in the tests' descriptions. */
    words?: string;
    /** The editor holds someone's code, from a shared link, not yet run. */
    shared?: boolean;
  }
  let { pack, pathHref, report, gained, running, runtimeError, loading, nextHref, hint, onuse, words = '', shared = false }: Props = $props();
  const codeWords = $derived(new Set(words.split(' ')));

  // Which answer was revealed: a new line or a new answer hides it again.
  let revealedKey = $state('');
  const hintKey = $derived(hint ? `${hint.line}:${hint.answer}` : '');
  const revealed = $derived(hintKey !== '' && revealedKey === hintKey);
  // Leaving a spot (for another spot, or none) hides its answer again: coming back shows it blurred.
  $effect(() => {
    void hintKey;
    revealedKey = '';
  });

  const CHEERS = [
    'The mist begins to clear.',
    'Your understanding grows.',
    'One more truth revealed.',
    'The path unfolds beneath your feet.',
    'Good. Keep walking.',
    'A small step, and a real one.',
  ];
  // Plus the language's own, in its voice: Camelia for Raku, the Zen of Python for Python, …
  const cheers = $derived([...CHEERS, ...(pack.cheers ?? [])]);
  // Re-picked for every new report, never the same line twice in a row.
  let lastCheer = -1;
  const cheer = $derived.by(() => {
    if (!report) return '';
    let i;
    do i = Math.floor(Math.random() * cheers.length);
    while (i === lastCheer);
    lastCheer = i;
    return cheers[i];
  });
</script>

{#snippet answer()}
  {#if hint}
    <p class="hint">
      <span class="muted">Stuck? The answer for line {hint.line}:</span>
      {#if revealed}
        <code class="answer">{hint.answer}</code>
        <button class="link" onclick={onuse}>Use it</button>
      {:else}
        <button class="spoiler" onclick={() => (revealedKey = hintKey)} aria-label="Reveal the answer for line {hint.line}" title="Click to reveal">
          <code aria-hidden="true">{hint.answer}</code>
        </button>
      {/if}
    </p>
  {:else}
    <p class="small muted">Stuck? Click a <code class="blank">___</code> to see its answer.</p>
  {/if}
{/snippet}

{#snippet tests(list: Report['tests'], current?: number)}
  <ol class="steps" aria-label="{list.filter(t => t.ok).length} of {list.length} passing">
    {#each list as t (t.n)}
      {@const kind = t.ok ? 'ok' : t.blank ? 'todo' : 'bad'}
      <li class={kind} class:current={t.n === current}>
        <span class="mark" aria-hidden="true">{kind === 'ok' ? '✓' : kind === 'bad' ? '✗' : '○'}</span>
        <span class="what">{#each markCode(t.description || `Test ${t.n}`, codeWords) as part}{#if part.code}<code>{part.text}</code>{:else}{part.text}{/if}{/each}</span>
        <span class="sr-only">{kind === 'ok' ? 'passes' : kind === 'bad' ? 'fails' : 'not answered yet'}</span>
      </li>
    {/each}
  </ol>
{/snippet}

<!-- What the run says, in a strip across the top: green for progress, red for what's next. -->
{#snippet strip(tone: 'good' | 'bad', count: string | null, big: boolean, body: Snippet)}
  <div class="strip {tone}">
    <span class="strip-mark" aria-hidden="true">{tone === 'good' ? '✓' : '✗'}</span>
    <p class="strip-text" class:big>{@render body()}</p>
    {#if count}<span class="count">{count}</span>{/if}
  </div>
{/snippet}

{#snippet failure(f: Extract<Report, { status: 'failed' }>['failure'])}
  {#if f.blank}Meditate on {f.line ? `line ${f.line}` : 'this'}{:else}Not quite{#if f.line}<span class="line">— line {f.line}</span>{/if}{/if}
{/snippet}

<!-- The figures change ten times a second: hidden from screen readers, which hear the words. -->
{#snippet preparing()}
  {#if loading}
    <p class="small muted">{loading.text}{#if loading.detail}<span class="detail" aria-hidden="true">{loading.detail}</span>{/if}</p>
  {/if}
{/snippet}

<div class="panel" aria-live="polite">
  {#if (running || !report) && loading?.fraction !== undefined}
    <div class="edge loading" aria-hidden="true"><span style:width="{loading.fraction * 100}%"></span></div>
  {/if}
  {#if running}
    <div class="body"><p class="lead muted">Meditating…</p>{@render preparing()}</div>
  {:else if !report}
    <div class="body">
      <p class="lead muted">Replace each <code class="blank">___</code>, then press <kbd>Run</kbd> or <kbd>{modKey}</kbd>+<kbd>Enter</kbd>.</p>
      {@render preparing()}
      {#if shared}<p class="small muted">Nothing is saved until you run this code. Then it becomes your attempt.</p>{/if}
      {#if runtimeError}<p class="small error-note">{runtimeError}</p>{/if}
      {@render answer()}
    </div>
  {:else}
    {@const total = report.status === 'error' ? 0 : report.tests.length}
    {@const passing = report.status === 'error' ? 0 : report.tests.filter(t => t.ok).length}
    {@const count = total ? `${passing} / ${total}` : null}
    {#if total}
      <div class="edge" aria-hidden="true"><span style:width="{(passing / total) * 100}%"></span></div>
    {/if}
    {#if report.status === 'passed'}
      {#snippet done()}Enlightenment!{/snippet}
      {@render strip('good', count, true, done)}
      <div class="body">
        <div class="celebrate">
          {#key report}<Emblem {pack} size={64} celebrate />{/key}
          <p class="small muted">{total === 1 ? 'The test passes.' : `All ${total} tests pass.`}</p>
        </div>
        {#if nextHref}<a class="next" href={nextHref}>Next koan →</a>{:else}<a class="next" href={pathHref}>Back to the path</a>{/if}
      </div>
      {@render tests(report.tests)}
    {:else if report.status === 'failed'}
      {@const f = report.failure}
      {#if gained > 0}
        <!-- Progress: the cheer has the strip, and what's next comes first below it. -->
        {#snippet cheered()}{gained === 1 ? 'Assertion passed' : `${gained} assertions passed`}. {#each inlineCode(cheer) as part}{#if part.code}<code>{part.text}</code>{:else}{part.text}{/if}{/each}{/snippet}
        {@render strip('good', count, false, cheered)}
      {:else}
        {#snippet failed()}{@render failure(f)}{/snippet}
        {@render strip('bad', count, true, failed)}
      {/if}
      <div class="body">
        {#if gained > 0}<p class="lead">{@render failure(f)}</p>{/if}
        {@render answer()}
        {#if !f.blank && f.actual !== undefined}
          <dl class="compare">
            {#if f.answer !== undefined}<dt>Your answer</dt><dd>{f.answer}</dd>{/if}
            <dt>{pack.name} says</dt><dd>{f.actual}</dd>
          </dl>
        {:else if !f.blank && f.diag.length}
          <pre class="diag">{f.diag.join('\n')}</pre>
        {/if}
      </div>
      {@render tests(report.tests, f.n)}
    {:else}
      {#snippet broken()}Your code has not yet found its form{#if report.status === 'error' && report.line}<span class="line">— line {report.line}</span>{/if}{/snippet}
      {@render strip('bad', null, true, broken)}
      <div class="body">
        <pre class="diag">{report.message}</pre>
        {@render answer()}
      </div>
    {/if}

    {#if report.output.length}
      <details open>
        <summary>Output</summary>
        <pre>{report.output.join('\n')}</pre>
      </details>
    {/if}
  {/if}
</div>

<style>
  /* Neutral whatever the result: the color is in the strip, the marks and the edge. */
  .panel {
    border: 1px solid var(--line);
    background: var(--bg-raised);
    box-shadow: var(--shadow);
  }
  .body { padding: 0.9rem 1.1rem; display: flex; flex-direction: column; gap: 0.8rem; }
  .body > :global(*) { margin: 0; }
  .lead { font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; margin: 0; }
  /* How many tests pass: a line along the top edge. */
  .edge { height: 4px; background: var(--bg-sunken); }
  .edge > span { display: block; height: 4px; background: var(--pass); transition: width 0.5s; }
  /* Or, while the interpreter downloads, how much of it has arrived. */
  .edge.loading > span { background: var(--lang, var(--ink-soft)); transition: width 0.15s; }
  .detail { margin-left: 0.5em; font-variant-numeric: tabular-nums; }
  .strip {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 0.8rem 1.1rem;
    border-bottom: 1px solid var(--line);
  }
  .strip.good { color: var(--pass); background: color-mix(in srgb, var(--pass) 12%, transparent); }
  .strip.bad { color: var(--fail); background: color-mix(in srgb, var(--fail) 12%, transparent); }
  .strip-mark { font-weight: 700; flex: none; }
  .strip-text { flex: 1; margin: 0; font-weight: 600; font-size: 0.95rem; }
  .strip-text.big { font-family: var(--font-display); font-weight: 700; font-size: 1.25rem; line-height: 1.25; }
  .strip-text :global(code) { font-family: var(--font-mono); font-size: 0.92em; }
  .count { flex: none; font-size: 0.8rem; color: var(--ink-soft); font-variant-numeric: tabular-nums; }
  .line { margin-left: 0.4em; font-family: var(--font-body); font-size: 0.95rem; color: var(--ink-soft); }
  .muted { color: var(--ink-soft); }
  .error-note { color: var(--fail); }
  .small { font-size: 0.85rem; margin: 0; }
  pre {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    white-space: pre-wrap;
    margin: 0;
    padding: 0.7rem 0.9rem;
    background: var(--bg);
    border: 1px solid var(--line);
  }
  .link {
    padding: 0;
    border: none;
    background: none;
    color: var(--ink);
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;
  }
  .link:hover { color: var(--accent); }
  .hint {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.3rem 0.6rem;
    margin: 0;
    font-size: 0.88rem;
  }
  .answer { font-family: var(--font-mono); font-size: 0.95rem; color: var(--ink); overflow-wrap: anywhere; }
  /* A hidden answer: blurred until clicked, and not selectable or copyable meanwhile. */
  .spoiler {
    padding: 0.05rem 0.45rem;
    border: none;
    background: color-mix(in srgb, var(--ink) 8%, transparent);
    cursor: pointer;
    user-select: none;
  }
  .spoiler code { font-family: var(--font-mono); font-size: 0.95rem; color: var(--ink); filter: blur(5px); transition: filter 0.15s; }
  .spoiler:hover code, .spoiler:focus-visible code { filter: blur(4px); }
  .compare {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.35rem 0.9rem;
    margin: 0;
    padding: 0.7rem 0.9rem;
    background: var(--bg);
    border: 1px solid var(--line);
    font-size: 0.85rem;
  }
  .compare dt { color: var(--ink-soft); }
  .compare dd { margin: 0; font-family: var(--font-mono); white-space: pre-wrap; overflow-wrap: anywhere; }
  .blank { color: var(--syn-blank); background: color-mix(in srgb, var(--syn-blank) 14%, transparent); padding: 0 0.3em; }
  /* The tests, with their marks in a gutter, as the editor has them; a bar on the current one. */
  .steps { list-style: none; padding: 0.15rem 0 0.6rem; margin: 0; font-size: 0.88rem; line-height: 1.5; border-top: 1px solid var(--line); }
  .steps li { display: flex; align-items: baseline; color: var(--ink-soft); border-left: 3px solid transparent; }
  .steps li.ok { color: var(--ink); }
  .steps li.current { color: var(--ink); border-left-color: var(--lang, var(--accent)); background: color-mix(in srgb, var(--lang, var(--accent)) 9%, transparent); }
  .mark { width: 1.9rem; flex: none; align-self: stretch; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; border-right: 1px solid var(--line); }
  .what { padding: 0.2rem 0.75rem; }
  .ok .mark { color: var(--pass); }
  .bad .mark { color: var(--fail); }
  .todo .mark { color: var(--ink-faint); }
  .what code { font-family: var(--font-mono); font-size: 0.92em; padding: 0 0.25em; background: color-mix(in srgb, var(--ink) 7%, transparent); }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

  .celebrate { display: flex; gap: 0.9rem; align-items: center; }
  .next {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    text-decoration: none;
    font-weight: 600;
    background: var(--pass);
    color: var(--bg);
    padding: 0 1.1rem;
  }
  details { padding: 0 1.1rem 1rem; }
  summary { cursor: pointer; font-size: 0.85rem; color: var(--ink-soft); }
  kbd {
    font-family: var(--font-mono);
    font-size: 0.8em;
    padding: 0.05em 0.4em;
    border: 1px solid var(--line);
    border-bottom-width: 2px;
    background: var(--bg-raised);
  }
</style>
