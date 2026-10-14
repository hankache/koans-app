<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { legacyLanguage, packById, packs } from '../languages';
  import { openCourse, type Course } from './lib/course';
  import { parseRoute } from './lib/route';
  import GateMark from './components/GateMark.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import Home from './components/Home.svelte';
  import PathMap from './components/PathMap.svelte';
  import KoanView from './components/KoanView.svelte';
  import Meter from './components/Meter.svelte';
  import { site } from './site';

  // A tiny hash router: see lib/route.ts for the addresses.
  let hash = $state(location.hash);
  const route = $derived(parseRoute(hash, packs.map(p => p.id), legacyLanguage));
  const lang = $derived(route.page === 'path' || route.page === 'koan' ? route.lang : null);

  // The opened language. Opening loads its koans and saved progress, then starts its interpreter
  // downloading, so it's usually ready by the time the learner presses Run.
  let course = $state<Course | null>(null);
  let loadError = $state('');
  const shown = $derived(course && course.pack.id === lang ? course : null);
  // Count current koans only: saved progress may include koans that were since removed.
  const passed = $derived(shown ? shown.allKoans.filter(k => shown.progress.get(k.id)?.status === 'passed').length : 0);

  $effect(() => {
    if (route.page === 'redirect') location.replace(route.to);
  });

  $effect(() => {
    const id = lang;
    loadError = '';
    if (!id || untrack(() => course)?.pack.id === id) return;
    const pack = packById.get(id)!;
    openCourse(pack).then(
      c => {
        if (lang !== id) return; // moved on meanwhile
        course = c;
        c.getRuntime();
      },
      e => {
        console.error(e);
        if (lang === id) loadError = `Could not load ${pack.name}. Check your connection and reload the page.`;
      },
    );
  });

  onMount(() => {
    const onHash = () => {
      hash = location.hash;
      window.scrollTo(0, 0);
    };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  });
</script>

<header class="bar">
  <a class="brand" href="#/"><GateMark size={32} /> <span>{site.name}</span></a>
  {#if shown}
    <a class="lang" href={shown.href()}>{shown.pack.name}</a>
    <div class="meter"><Meter {passed} total={shown.allKoans.length} /></div>
  {:else}
    <span class="spacer"></span>
  {/if}
  <ThemeToggle />
</header>

<main>
  {#if route.page === 'home'}
    <Home />
  {:else if loadError}
    <p class="status">{loadError}</p>
  {:else if lang && !shown}
    <p class="status" aria-busy="true">Opening {packById.get(lang)?.name}…</p>
  {:else if shown && route.page === 'koan' && shown.koanById.has(route.id)}
    {#key `${lang}/${route.id}`}<KoanView course={shown} id={route.id} />{/key}
  {:else if shown}
    {#key lang}<PathMap course={shown} />{/key}
  {/if}
</main>

<footer>
  © 2026 Naoum Hankache ·
  Code: <a href="https://opensource.org/license/artistic-2-0">Artistic License 2.0</a> ·
  Koans and artwork: <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> ·
  <a href={site.repo}>GitHub</a>
  <span class="build">
    {#if __BUILD__}
      Version <a href="{site.repo}/commit/{__BUILD__.commit}">{__BUILD__.short}</a> · {__BUILD__.date}
    {:else}
      Development build
    {/if}
  </span>
</footer>

<style>
  .bar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.7rem max(16px, calc((100vw - 1120px) / 2));
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.15rem;
    white-space: nowrap;
  }
  .lang {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--ink-soft);
    text-decoration: none;
    white-space: nowrap;
  }
  .lang:hover { color: var(--ink); }
  .meter { flex: 1; min-width: 0; max-width: 360px; margin-left: auto; }
  .spacer { flex: 1; }
  .status { color: var(--ink-soft); padding: 3rem 0; }
  main { max-width: 1120px; margin: 0 auto; padding: 0 16px; }
  footer { text-align: center; color: var(--ink-faint); font-size: 0.8rem; padding: 3rem 16px 2rem; }
  footer a { color: var(--ink-soft); }
  .build { display: block; margin-top: 0.4rem; font-size: 0.72rem; opacity: 0.8; }
  .build a { color: inherit; }

  @media (max-width: 600px) {
    .bar { gap: 0.6rem; }
    .brand span { display: none; }
  }
</style>
