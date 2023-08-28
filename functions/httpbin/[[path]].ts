/**
 * Proxies requests from `/httpbin` relative path to httpbin worker, including nested paths.
 * @see https://httpbin.agrd.workers.dev
 *
 * @param context Request event context
 * @returns External source response.
 */
export async function onRequest({ request }: EventContext<unknown, string, unknown>): Promise<Response> {
    const { pathname, search } = new URL(request.url);

    const url = `https://httpbin.agrd.workers.dev${pathname.replace('/httpbin', '')}${search}`;

    return fetch(url, {
        method: request.method,
        headers: request.headers,
    });
}
