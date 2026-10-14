// The site's addresses. Everything after # is the route, so the site is one page that any
// static host can serve:
//
//   #/                          the home page: pick a language
//   #/<language>/               that language's path
//   #/<language>/koan/<id>      a koan (its id is section/name)
//   #/koan/<id>                 a Raku Koans address from before there were several languages:
//                               sent on to the legacy language

export type Route =
  | { page: 'home' }
  | { page: 'path'; lang: string }
  | { page: 'koan'; lang: string; id: string }
  | { page: 'redirect'; to: string };

/**
 * @param hash       location.hash
 * @param languages  the ids of the languages the site has
 * @param legacy     the language of #/koan/… addresses
 */
export function parseRoute(hash: string, languages: string[], legacy: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/');
  if (parts[0] === 'koan' && parts.length > 1) return { page: 'redirect', to: `#/${legacy}/${parts.join('/')}` };

  const [lang, kind, ...id] = parts;
  if (!languages.includes(lang)) return { page: 'home' };
  if (kind === 'koan' && id.length && id.every(Boolean)) return { page: 'koan', lang, id: id.join('/') };
  return { page: 'path', lang };
}

/** The address of a language's path, or of one of its koans. */
export const href = (lang: string, koanId?: string) => (koanId ? `#/${lang}/koan/${koanId}` : `#/${lang}/`);
