// Types for code-words.mjs, which the app imports too.
export const ENGLISH: Set<string>;
export function codeWords(code: string, comment: string, options?: { names?: 'all' | 'called' }): string[];
export function markCode(text: string, words: Iterable<string>): { code: boolean; text: string }[];
