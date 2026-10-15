<!-- The result panel: what the koan is trying to tell you. -->
<script lang="ts">
  import type { Report } from '../lib/tap';
  import type { Reveal } from '../lib/koans';
  import LogoGate from './LogoGate.svelte';
  import Emblem from './Emblem.svelte';
  import { inlineCode } from '../lib/inline-code';
  import { markCode } from '../../scripts/lib/code-words.mjs';
  import { modKey } from '../lib/platform';
  import type { LanguagePack } from '../lib/language';

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
    nextHref?: string;
    /** The answer on offer, hidden until the learner reveals it. */
    hint?: Reveal | null;
    /** Put the revealed answer into the code. */
    onuse?: () => void;
    /** The koan's code words, space-separated: shown as code in the tests' descriptions. */
    words?: string;
  }
  let { pack, pathHref, report, gained, running, runtimeError, nextHref, hint, onuse, words = '' }: Props = $props();
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

<div class="panel {report?.status ?? 'idle'}" aria-live="polite">
  {#if !running && report && report.status !== 'error' && report.tests.length}
    {@const passing = report.tests.filter(t => t.ok).length}
    <div class="tally">
      <span class="tally-label">Tests</span>
      <span>{passing} of {report.tests.length} passing</span>
      <span class="tally-bar"><span style:width="{Math.round((passing / report.tests.length) * 100)}%"></span></span>
    </div>
  {/if}
  {#if running}
    <p class="lead muted">Meditating…</p>
  {:else if !report}
    <p class="lead muted">Replace each <code class="blank">___</code>, then press <kbd>Run</kbd> or <kbd>{modKey}</kbd>+<kbd>Enter</kbd>.</p>
    {#if runtimeError}<p class="small error-note">{runtimeError}</p>{/if}
    {@render answer()}
  {:else if report.status === 'passed'}
    <div class="celebrate">
      {#key report}{#if pack.art}<LogoGate size={112} art={pack.art} />{:else}<Emblem {pack} size={104} celebrate />{/if}{/key}
      <div>
        <p class="lead">Enlightenment!</p>
        <p class="small">{report.tests.length === 1 ? 'The assertion holds.' : `All ${report.tests.length} assertions hold.`}</p>
      </div>
    </div>
    {#if nextHref}<a class="next" href={nextHref}>Next koan →</a>{:else}<a class="next" href={pathHref}>Back to the path</a>{/if}
    {@render tests(report.tests)}
  {:else if report.status === 'failed'}
    {@const f = report.failure}
    {#if gained > 0}
      <p class="cheer">✓ {gained === 1 ? 'Assertion passed' : `${gained} assertions passed`}. {#each inlineCode(cheer) as part}{#if part.code}<code>{part.text}</code>{:else}{part.text}{/if}{/each}</p>
    {/if}
    <p class="lead">
      {#if f.blank}Meditate on {f.line ? `line ${f.line}` : 'this'}{:else}Not quite{#if f.line}<span class="line">— line {f.line}</span>{/if}{/if}
    </p>
    {@render answer()}
    {#if !f.blank && f.actual !== undefined}
      <dl class="compare">
        {#if f.answer !== undefined}<dt>Your answer</dt><dd>{f.answer}</dd>{/if}
        <dt>{pack.name} says</dt><dd>{f.actual}</dd>
      </dl>
    {:else if !f.blank && f.diag.length}
      <pre class="diag">{f.diag.join('\n')}</pre>
    {/if}
    {@render tests(report.tests, f.n)}
  {:else}
    <p class="lead">Your code has not yet found its form{#if report.line}<span class="line">— line {report.line}</span>{/if}</p>
    <pre class="diag">{report.message}</pre>
    {@render answer()}
  {/if}

  {#if report?.output.length}
    <details open>
      <summary>Output</summary>
      <pre>{report.output.join('\n')}</pre>
    </details>
  {/if}
</div>

<style>
  .panel {
    padding: 1.2rem 1.4rem;
    border: 1px solid var(--line);
    background: var(--bg-raised);
    transition: background 0.3s, border-color 0.3s;
  }
  .panel.passed { background: var(--pass-bg); border-color: var(--pass); }
  .panel.failed, .panel.error { background: var(--fail-bg); border-color: color-mix(in srgb, var(--fail) 50%, transparent); }
  .lead { font-family: var(--font-display); font-size: 1.3rem; margin: 0; }
  .failed .lead, .error .lead { color: var(--fail); }
  .passed .lead { color: var(--pass); }
  .line { margin-left: 0.4em; font-family: var(--font-body); font-size: 0.95rem; color: var(--ink-soft); }
  .muted { color: var(--ink-soft); }
  .error-note { color: var(--fail); }
  .small { font-size: 0.85rem; margin: 0.4rem 0 0; }
  pre {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    white-space: pre-wrap;
    margin: 0.7rem 0 0;
    padding: 0.7rem 0.9rem;
    background: var(--bg-raised);
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
    margin: 0.7rem 0 0;
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
    margin: 0.7rem 0 0;
    padding: 0.7rem 0.9rem;
    background: var(--bg-raised);
    border: 1px solid var(--line);
    font-size: 0.85rem;
  }
  .compare dt { color: var(--ink-soft); }
  .compare dd { margin: 0; font-family: var(--font-mono); white-space: pre-wrap; overflow-wrap: anywhere; }
  .cheer {
    margin: 0 0 0.9rem;
    padding: 0.5rem 0.8rem;
    background: var(--pass-bg);
    color: var(--pass);
    font-weight: 600;
    font-size: 0.9rem;
    animation: pop 0.45s cubic-bezier(0.2, 1.6, 0.4, 1);
  }
  @keyframes pop { from { transform: scale(0.85); opacity: 0; } }
  .blank { color: var(--syn-blank); background: color-mix(in srgb, var(--syn-blank) 14%, transparent); padding: 0 0.3em; }
  .steps { list-style: none; padding: 0.8rem 0 0; margin: 1rem 0 0; display: grid; gap: 0.35rem; font-size: 0.88rem; border-top: 1px solid color-mix(in srgb, var(--ink) 10%, transparent); }
  .steps li { display: flex; gap: 0.55rem; color: var(--ink-soft); }
  .steps li.ok { color: var(--ink); }
  .steps li.current { font-weight: 600; color: var(--ink); }
  .mark { width: 1em; flex: none; text-align: center; font-weight: 700; }
  .ok .mark { color: var(--pass); }
  .bad .mark { color: var(--fail); }
  .todo .mark { color: var(--ink-faint); }
  .what code { font-family: var(--font-mono); font-size: 0.92em; padding: 0 0.25em; background: color-mix(in srgb, var(--ink) 7%, transparent); }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

  /* How many tests pass, after a run. */
  .tally { display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 0.35rem 0.8rem; margin-bottom: 1rem; font-size: 0.82rem; color: var(--ink-soft); }
  .tally-label { font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
  .tally-bar { grid-column: 1 / -1; height: 6px; background: color-mix(in srgb, var(--ink) 10%, transparent); }
  .tally-bar > span { display: block; height: 6px; background: var(--pass); transition: width 0.5s; }
  .celebrate { display: flex; gap: 1rem; align-items: center; }
  .next {
    display: inline-block;
    margin-top: 1rem;
    text-decoration: none;
    font-weight: 600;
    background: var(--pass);
    color: var(--bg);
    padding: 0.55rem 1.1rem;
  }
  details { margin-top: 1rem; }
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
