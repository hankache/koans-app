<!--
  A language's emblem: the gateless gate framing the language's symbol, in its accent for the
  current theme. Below 28 px the gate would only blur the symbol, so the symbol stands alone. With
  `celebrate`, the symbol rises into the doorway as the gate brightens: a solved koan.

  The symbol is the pack's look.emblem, drawn in the gate's doorway (about x 19–45, y 30–57 of a
  64-unit box): {F} marks its solid parts and {C} what's cut out of them (an eye, a facet). It's
  drawn as a mask, white for {F} and black for {C}, so cut-outs show whatever is behind the emblem.
-->
<script lang="ts">
  import type { LanguagePack } from '../lib/language';

  let { pack, size = 40, label = false, celebrate = false }: { pack: LanguagePack; size?: number; label?: boolean; celebrate?: boolean } = $props();

  const id = $props.id();
  const small = $derived(size < 28);
  const mask = $derived(pack.look.emblem.replaceAll('{F}', 'white').replaceAll('{C}', 'black'));
</script>

<svg
  class="emblem"
  width={size}
  height={size}
  viewBox={small ? '16 29.5 32 29' : '0 0 64 64'}
  role={label ? 'img' : undefined}
  aria-label={label ? `${pack.name} emblem` : undefined}
  aria-hidden={label ? undefined : 'true'}
  style:--accent-light={pack.look.accent.light}
  style:--accent-dark={pack.look.accent.dark}
>
  <mask id="{id}-symbol" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- the pack's own artwork, not user input -->
    <g transform={small ? undefined : 'translate(32 44.5) scale(0.9) translate(-32 -44.5)'}>{@html mask}</g>
  </mask>
  {#if !small}
    <g class="gate" class:glow={celebrate}>
      <path d="M3 9 C18 14 46 14 61 9 L59 16.5 C45 20.5 19 20.5 5 16.5 Z" />
      <rect x="30" y="18" width="4" height="6" />
      <rect x="6" y="23.5" width="52" height="4" />
      <path d="M10.5 18 H16.5 L17.5 59 H9.5 Z" />
      <path d="M47.5 18 H53.5 L54.5 59 H46.5 Z" />
    </g>
  {/if}
  <rect class:rise={celebrate} width="64" height="64" fill="currentColor" mask="url(#{id}-symbol)" />
</svg>

<style>
  .emblem {
    display: block;
    flex: none;
    color: var(--accent-light);
  }
  :global([data-theme='dark']) .emblem { color: var(--accent-dark); }
  .gate { fill: currentColor; opacity: 0.42; }
  /* When a koan is solved: the symbol rises into the doorway and the gate brightens. */
  .rise { transform-box: fill-box; transform-origin: center; animation: rise 0.9s cubic-bezier(0.3, 0.7, 0.3, 1) both; }
  .glow { animation: glow 1.4s ease-out both; }
  @keyframes rise {
    0% { transform: translateY(12%) scale(0.85); opacity: 0; }
    60% { transform: translateY(-3%) scale(1.04); opacity: 1; }
    100% { transform: none; opacity: 1; }
  }
  @keyframes glow {
    0% { opacity: 0.2; }
    50% { opacity: 0.75; }
    100% { opacity: 0.42; }
  }
  @media (prefers-reduced-motion: reduce) {
    .rise, .glow { animation: none; }
  }
</style>
