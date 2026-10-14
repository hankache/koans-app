// The key CodeMirror means by "Mod": ⌘ on Apple devices, Ctrl elsewhere (same test as @codemirror/view).
const apple = typeof navigator !== 'undefined' && /Mac|iP(hone|ad|od)/.test(navigator.platform);

/** How to write the Mod key for this device. */
export const modKey = apple ? '⌘' : 'Ctrl';

/** Mod held down in this keyboard event. */
export const modPressed = (e: KeyboardEvent) => (apple ? e.metaKey : e.ctrlKey);
