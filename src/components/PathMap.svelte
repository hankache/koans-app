<script lang="ts">
  import { untrack } from 'svelte';
  import type { Course } from '../lib/course';
  import { site } from '../site';
  import { inlineCode } from '../lib/inline-code';
  import Emblem from './Emblem.svelte';

  let { course }: { course: Course } = $props();
  // App keys this component by language, so the course never changes under it.
  const { pack, progress, sections, allKoans } = untrack(() => course);

  const next = $derived(allKoans.find(k => progress.get(k.id)?.status !== 'passed'));
  const started = $derived(allKoans.some(k => progress.get(k.id)));
  // Any saved progress at all, including koans that have since been renamed or regrouped,
  // so leftovers can always be erased.
  const anySaved = $derived(Object.keys(progress.map).length > 0);

  let confirming = $state(false);
  function resetAll() {
    progress.resetAll();
    confirming = false;
  }
  // How a koan's circle is read out: its number (what it shows, for voice control) and title, then this.
  const STATE_WORDS: Record<string, string> = { new: 'not started', attempted: 'tried', passed: 'solved' };
</script>

<svelte:head><title>{pack.name} Koans · {site.name}</title></svelte:head>

<section class="hero">
  <div class="logo" style:--accent-light={pack.look.accent.light} style:--accent-dark={pack.look.accent.dark}>
    <Emblem {pack} size={150} label />
  </div>
  <div>
    <p class="eyebrow">The path to enlightenment</p>
    <h1>{pack.name}</h1>
    <p>{#each inlineCode(pack.about) as part}{#if part.code}<code>{part.text}</code>{:else}{part.text}{/if}{/each}</p>
    <p>
      Test-driven from the start: fix failing tests written with <a class="framework" href={pack.testedWith.url} target="_blank" rel="noopener">{pack.testedWith.name}</a> to
      master both the language and testing.
    </p>
    <p class="site"><a href={pack.site.url} target="_blank" rel="noopener">{pack.site.label} ↗</a></p>
    <div class="actions">
      {#if next}
        <a class="cta" href={course.href(next.id)}>{started ? 'Continue' : 'Begin'}: {next.title} →</a>
      {:else}
        <span class="done">
          You have walked the whole path.
          <span class="done-mark"><Emblem {pack} size={28} /></span>
        </span>
      {/if}
      {#if anySaved && !confirming}
        <button class="start-over" onclick={() => (confirming = true)}>Start over…</button>
      {/if}
    </div>
    {#if confirming}
      <div class="confirm">
        <span>Erase all your {pack.name} progress and saved code? This cannot be undone.</span>
        <button class="danger" onclick={resetAll}>Erase everything</button>
        <button onclick={() => (confirming = false)}>Cancel</button>
      </div>
    {/if}
  </div>
</section>

<ol class="sections">
  {#each sections as section, si}
    {@const done = section.koans.filter(k => progress.get(k.id)?.status === 'passed').length}
    <li class="section" style:--wing="var(--sec-{(si % 6) + 1})">
      <header>
        <span class="num">{String(si + 1).padStart(2, '0')}</span>
        <div>
          <h2>{section.title}</h2>
          <p>{section.blurb}</p>
        </div>
        <span class="count">{done}/{section.koans.length}</span>
      </header>
      <ol class="stones">
        {#each section.koans as koan, ki}
          {@const state = progress.get(koan.id)?.status ?? 'new'}
          <li>
            <a
              href={course.href(koan.id)}
              class="stone {state}"
              class:next={koan.id === next?.id}
              aria-label="{ki + 1}. {koan.title}, {STATE_WORDS[state]}"
            >
              {#if state === 'passed'}✓{:else}{ki + 1}{/if}
            </a>
            <span class="title">{koan.title}</span>
          </li>
        {/each}
      </ol>
    </li>
  {/each}
</ol>

<style>
  .hero {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    padding: 2.5rem 0 2rem;
  }
  .logo {
    flex: none;
    width: 200px;
    height: 200px;
    display: grid;
    place-items: center;
    --accent: var(--accent-light);
    background: color-mix(in srgb, var(--accent) 12%, var(--bg-raised));
    box-shadow: var(--shadow);
  }
  :global([data-theme='dark']) .logo { --accent: var(--accent-dark); }
  .hero .eyebrow {
    margin: 0 0 0.3rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .hero h1 { font-size: clamp(2.2rem, 6vw, 3.4rem); letter-spacing: -0.02em; margin: 0; }
  .hero .eyebrow + h1 + p { margin-top: 0.6rem; }
  .framework { color: inherit; text-decoration-color: var(--ink-faint); text-underline-offset: 3px; }
  .framework:hover { color: var(--ink); }
  .site a { color: var(--ink-soft); font-weight: 600; text-decoration-color: var(--ink-faint); text-underline-offset: 3px; }
  .site a:hover { color: var(--ink); }
  .hero p { color: var(--ink-soft); max-width: 38rem; margin: 0.8rem 0 0; }
  .hero p + p { margin-top: 0.6rem; }
  .hero .actions { margin-top: 1.4rem; }
  .blank { color: var(--syn-blank); background: color-mix(in srgb, var(--syn-blank) 14%, transparent); padding: 0 0.3em; }
  .cta {
    display: inline-block;
    text-decoration: none;
    background: var(--ink);
    color: var(--bg);
    font-weight: 600;
    padding: 0.7rem 1.3rem;
    transition: transform 0.15s;
  }
  .cta:hover { transform: translateX(3px); }
  .done { font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem; }
  .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem; }
  .start-over { padding: 0.7rem 1.2rem; color: var(--ink-soft); background: transparent; }
  .confirm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-top: 1rem;
    padding: 0.8rem 1rem;
    background: var(--fail-bg);
    border: 1px solid color-mix(in srgb, var(--fail) 40%, transparent);
    font-size: 0.9rem;
  }

  .sections { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
  .section {
    background: var(--bg-raised);
    border: 1px solid var(--line);
    padding: 1.25rem 1.5rem 1.5rem;
    box-shadow: var(--shadow);
    border-top: 3px solid var(--wing);
  }
  header { display: flex; gap: 1rem; align-items: baseline; }
  header > div { flex: 1; min-width: 0; }
  .num { font-family: var(--font-display); color: var(--wing); font-size: 1.4rem; font-weight: 700; }
  h2 { font-size: 1.35rem; }
  header p { margin: 0.2rem 0 0; color: var(--ink-soft); font-size: 0.92rem; }
  .count { color: var(--ink-faint); font-variant-numeric: tabular-nums; font-size: 0.9rem; }

  .stones {
    list-style: none;
    padding: 0;
    margin: 1.2rem 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem 0;
  }
  .stones li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 7.5rem;
    text-align: center;
  }
  /* The path between stones. */
  .stones li:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 22px;
    left: calc(50% + 26px);
    width: calc(100% - 52px);
    border-top: 2px dotted var(--line);
  }
  .stone {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-decoration: none;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    border: 2px solid var(--line);
    background: var(--bg);
    color: var(--ink-soft);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .stone:hover { transform: scale(1.1); }
  .stone.attempted { border-color: var(--wing); color: var(--ink); }
  .stone.passed { background: var(--wing); border-color: var(--wing); color: var(--bg); }
  .stone.next { border-color: var(--wing); color: var(--ink); animation: breathe 2.4s ease-in-out infinite; }
  @keyframes breathe {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--wing) 45%, transparent); }
    50% { box-shadow: 0 0 0 9px color-mix(in srgb, var(--wing) 0%, transparent); }
  }
  .title { margin-top: 0.45rem; font-size: 0.82rem; color: var(--ink-soft); line-height: 1.3; padding: 0 0.3rem; }

  .danger { background: var(--fail); border-color: var(--fail); color: var(--bg); font-weight: 600; }

  @media (max-width: 600px) {
    .hero { flex-direction: column; gap: 1rem; padding-top: 1.5rem; }
    .logo { width: 120px; height: 120px; }
    .logo :global(.emblem) { width: 92px; height: 92px; }
    .section { padding: 1rem; }
    .stones li { width: 5.6rem; }
  }
</style>
