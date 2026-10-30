// Whether the browser keeps the site's data for good. By default it may clear a site's storage
// when space runs low (Safari also after a week without a visit), and progress lives only there.
// Persistent storage asks it not to: Chrome decides by how the site is used, Firefox asks the
// learner, Safari decides by use and by whether the site is installed.

let asked: Promise<boolean> | null = null;

/**
 * Asks to keep the site's data for good, once per visit: after a koan is first solved, when the
 * learner has something worth keeping and Firefox's question makes sense. Resolves to the answer.
 */
export function keepForGood(): Promise<boolean> {
  return (asked ??= (async () => {
    try {
      if (!navigator.storage?.persist) return false;
      return (await navigator.storage.persisted()) || (await navigator.storage.persist());
    } catch {
      return false;
    }
  })());
}

/** Whether the data is kept for good already, without asking: null when the browser can't say. */
export async function isKept(): Promise<boolean | null> {
  try {
    return navigator.storage?.persisted ? await navigator.storage.persisted() : null;
  } catch {
    return null;
  }
}
