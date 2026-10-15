<!--
  A language's emblem: the gateless gate, faint, with the language's symbol in its doorway, both in
  the language's accent for the current theme. The symbol is the pack's look.emblem: SVG drawn in
  currentColor around the doorway (x 22–42, y 33–57) of a 64-unit box, and shown half as large
  again, so it stays readable at tile size.
-->
<script lang="ts">
  import type { LanguagePack } from '../lib/language';

  let { pack, size = 40, label = false }: { pack: LanguagePack; size?: number; label?: boolean } = $props();
</script>

<svg
  class="emblem"
  width={size}
  height={size}
  viewBox="0 0 64 64"
  role={label ? 'img' : undefined}
  aria-label={label ? `${pack.name} emblem` : undefined}
  aria-hidden={label ? undefined : 'true'}
  style:--accent-light={pack.look.accent.light}
  style:--accent-dark={pack.look.accent.dark}
>
  <g class="gate">
    <path d="M4 10.5 C18 15 46 15 60 10.5 L58 17.5 C45 21 19 21 6 17.5 Z" />
    <rect x="30" y="19" width="4" height="7" />
    <rect x="9" y="25" width="46" height="4" />
    <path d="M15 19.5 H21 L22 58 H14 Z" />
    <path d="M43 19.5 H49 L50 58 H42 Z" />
  </g>
  <g transform="translate(32 43) scale(1.45) translate(-32 -44.5)">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- the pack's own artwork, not user input -->
    {@html pack.look.emblem}
  </g>
</svg>

<style>
  .emblem {
    display: block;
    flex: none;
    color: var(--accent-light);
  }
  :global([data-theme='dark']) .emblem { color: var(--accent-dark); }
  .gate { fill: currentColor; opacity: 0.3; }
</style>
