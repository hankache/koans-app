<!-- The home page: pick a language, see your progress in each, and keep a copy of it. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import summary from '../generated/summary.json';
  import { packs } from '../../languages';
  import { progressFor } from '../lib/progress.svelte';
  import { href } from '../lib/route';
  import { exportName, makeExport, readImport } from '../lib/transfer';
  import { site } from '../site';
  import GateMark from './GateMark.svelte';
  import Meter from './Meter.svelte';

  // Each language's koan ids, from the build: enough to count progress without loading a language.
  const koanIds = summary as Record<string, string[]>;
  const languages = packs.map(pack => ({ pack, progress: progressFor(pack.id), koans: koanIds[pack.id] ?? [] }));
  type Language = (typeof languages)[number];
  onMount(() => {
    for (const l of languages) void l.progress.ready();
  });

  // Current koans only: saved progress may include koans that were since removed.
  const passedIn = (l: Language) => l.koans.filter(id => l.progress.get(id)?.status === 'passed').length;
  const startedIn = (l: Language) => l.koans.some(id => l.progress.get(id));
  const koans = (n: number, name = '') => `${n} ${name ? name + ' ' : ''}koan${n === 1 ? '' : 's'}`;

  let note = $state<{ text: string; error?: boolean } | null>(null);
  let fileInput: HTMLInputElement;

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
    const file = fileInput.files?.[0];
    fileInput.value = ''; // so choosing the same file again still counts
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

<section class="hero">
  <div class="logo"><GateMark size={150} /></div>
  <div>
    <h1>Choose your path</h1>
    <p>
      Each koan is a small program whose tests fail. Fill in the blanks until they pass, and the
      language tells you whether you got it right.
    </p>
    <p>Everything runs in your browser: nothing to install, no account.</p>
  </div>
</section>

<ul class="languages">
  {#each languages as l (l.pack.id)}
    {@const passed = passedIn(l)}
    <li>
      <a class="language" href={href(l.pack.id)}>
        {#if l.pack.art}
          <img class="icon" src="{import.meta.env.BASE_URL}{l.pack.art.logo.src}" alt="" width="64" height="64" />
        {:else}
          <span class="icon mark"><GateMark size={44} /></span>
        {/if}
        <span class="text">
          <span class="name">{l.pack.name}</span>
          <span class="tagline">{l.pack.tagline}, in {koans(l.koans.length)}.</span>
        </span>
        <span class="progress"><Meter {passed} total={l.koans.length} /></span>
        <span class="go">{passed === l.koans.length && passed ? 'Walked ✓' : startedIn(l) ? 'Continue →' : 'Begin →'}</span>
      </a>
    </li>
  {/each}
</ul>

<section class="keep">
  <h2>Your progress</h2>
  <p>
    Progress is saved in this browser only. Export it to keep a copy, or to carry it to another
    browser. Importing keeps whichever is newer for each koan, so it never undoes your work.
  </p>
  <div class="buttons">
    <button onclick={exportProgress}>Export progress</button>
    <button onclick={() => fileInput.click()}>Import progress…</button>
    <input bind:this={fileInput} type="file" accept="application/json,.json" onchange={importProgress} hidden />
  </div>
  {#if note}<p class="note" class:error={note.error} role="status">{note.text}</p>{/if}
</section>

<style>
  .hero {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    padding: 2.5rem 0 2rem;
  }
  .logo {
    flex: none;
    display: grid;
    place-items: center;
    width: 200px;
    height: 200px;
    background: var(--bg-raised);
    color: var(--ink);
    box-shadow: var(--shadow);
  }
  .hero h1 { font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -0.02em; }
  .hero p { color: var(--ink-soft); max-width: 38rem; margin: 0.8rem 0 0; }

  .languages { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
  .language {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr) minmax(0, 260px) auto;
    align-items: center;
    gap: 1.2rem;
    padding: 1rem 1.2rem;
    background: var(--bg-raised);
    border: 1px solid var(--line);
    color: var(--ink);
    text-decoration: none;
    transition: border-color 0.15s, transform 0.15s;
  }
  .language:hover { border-color: var(--ink-faint); transform: translateX(3px); }
  .icon { width: 64px; height: 64px; display: block; }
  .icon.mark { display: grid; place-items: center; background: var(--bg-sunken); }
  .text { display: grid; gap: 0.2rem; min-width: 0; }
  .name { font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; }
  .tagline { color: var(--ink-soft); font-size: 0.92rem; }
  .go { font-weight: 600; white-space: nowrap; }

  .keep { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--line); max-width: 42rem; }
  .keep h2 { font-size: 1.2rem; }
  .keep p { color: var(--ink-soft); margin: 0.6rem 0 0; font-size: 0.92rem; }
  .buttons { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
  .note { color: var(--ink); }
  .note.error { color: var(--fail); }

  @media (max-width: 760px) {
    .language { grid-template-columns: 48px minmax(0, 1fr); }
    .icon { width: 48px; height: 48px; }
    .progress, .go { grid-column: 1 / -1; }
  }
  @media (max-width: 600px) {
    .hero { flex-direction: column; }
    .logo { width: 120px; height: 120px; }
  }
</style>
