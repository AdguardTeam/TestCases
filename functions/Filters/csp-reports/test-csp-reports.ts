/**
 * Handles CSP reports test page with appropriate CSP headers.
 * Sets CSP policies that will generate violation reports to test AdGuard blocking.
 *
 * @param context Request event context
 * @returns Response with CSP headers and test page HTML
 */
export async function onRequest({ next }: EventContext<any, any, any>): Promise<Response> {
    // Get the original HTML response
    const response = await next();

    // Clone the response to modify headers
    const newResponse = new Response(response.body, response);

    // Add CSP headers for testing
    newResponse.headers.set(
        'Content-Security-Policy',
        "img-src 'self' data:; report-uri https://httpbin.agrd.dev/status/201",
    );

    newResponse.headers.set(
        'Content-Security-Policy-Report-Only',
        "connect-src 'self'; report-uri https://httpbin.agrd.dev/status/200",
    );

    // newResponse.headers.set('Access-Control-Allow-Origin', '*');

    return newResponse;
}
