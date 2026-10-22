// Sharing a koan with your code: the code travels in the link, after the # (so it never reaches
// the server), compressed and in base64url: #/python/koan/numbers/division?code=…
// Nothing is stored anywhere: whoever has the link has the code.

/** The most code a link carries, before compression: koans are small, and links have limits. */
export const MAX_SHARED = 20_000;

async function pipe(bytes: Uint8Array<ArrayBuffer>, stream: CompressionStream | DecompressionStream): Promise<Uint8Array<ArrayBuffer>> {
  // Written and read by hand, not piped from a Blob into a Response: damaged input then fails
  // only where it's read, and is caught there (Firefox reports a failing pipe or Response body as
  // a page error even when the failure is caught).
  const writer = stream.writable.getWriter();
  writer.write(bytes).catch(() => {});
  writer.close().catch(() => {});
  const reader = stream.readable.getReader();
  const chunks: Uint8Array[] = [];
  for (let r = await reader.read(); !r.done; r = await reader.read()) chunks.push(r.value);
  const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
  chunks.reduce((at, c) => (out.set(c, at), at + c.length), 0);
  return out;
}

const toBase64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');

const fromBase64url = (text: string) =>
  Uint8Array.from(atob(text.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));

/** Code, compressed, as it goes in a link. */
export async function encodeCode(code: string): Promise<string> {
  return toBase64url(await pipe(new TextEncoder().encode(code), new CompressionStream('deflate-raw')));
}

/** The code a link carries, or null if it isn't readable (cut short, mistyped, too long). */
export async function decodeCode(encoded: string): Promise<string | null> {
  try {
    const code = new TextDecoder('utf-8', { fatal: true }).decode(
      await pipe(fromBase64url(encoded), new DecompressionStream('deflate-raw')),
    );
    return code.length <= MAX_SHARED ? code : null;
  } catch {
    return null;
  }
}

/** The link to a koan with this code in it: the site's address, then the koan's route. */
export async function shareLink(route: string, code: string): Promise<string> {
  return `${location.href.split('#')[0]}${route}?code=${await encodeCode(code)}`;
}
