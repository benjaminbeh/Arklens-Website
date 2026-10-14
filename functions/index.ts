/**
 * GET/HEAD /  (Cloudflare Pages Function, routed to exactly "/" only)
 *
 * Automatic language selection for the generic root URL. Either returns a
 * 302 to /fr/, /de/ or /it/ (query string preserved), or passes through to the
 * unchanged static English page via context.next(). Every other URL stays a
 * static asset and never invokes this Function.
 *
 * Decision logic: functions/_lib/autolang.ts. Fails open (serves "/") on any
 * error. Never sets cookies; only the header language selector writes
 * arklens_lang.
 */

import { decideRootRedirect, redirectLocation, type CfProps } from './_lib/autolang';

interface Ctx {
  request: Request;
  next(): Promise<Response>;
}

export const onRequest = async ({ request, next }: Ctx): Promise<Response> => {
  let location: string | null = null;
  try {
    const url = new URL(request.url);
    const h = request.headers;
    const target = decideRootRedirect({
      method: request.method,
      url,
      cookie: h.get('Cookie'),
      acceptLanguage: h.get('Accept-Language'),
      userAgent: h.get('User-Agent'),
      referer: h.get('Referer'),
      cf: (request as Request & { cf?: CfProps }).cf,
    });
    if (target) location = redirectLocation(target, url);
  } catch {
    location = null; // fail open: serve the static page
  }

  if (location) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: location,
        'Cache-Control': 'private, no-store',
        Vary: 'Accept-Language, Cookie',
      },
    });
  }

  const res = await next();
  try {
    // Preview safeguard: keep noindex on *.pages.dev if _headers was not applied to the pass-through.
    if (new URL(request.url).hostname.endsWith('.pages.dev') && !res.headers.has('X-Robots-Tag')) {
      const copy = new Response(res.body, res);
      copy.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return copy;
    }
  } catch {
    // fall through with the original response
  }
  return res;
};
