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
    // Using /status/200 and /status/201 endpoints because:
    // 1. We need two different URLs to test blocking vs allowing CSP reports
    // 2. From httpbin.agrd.dev endpoints, /status/* was the only suitable option
    //    that returns text/plain content-type
    // 3. Chose 200 and 201 as they're the closest successful HTTP status codes
    newResponse.headers.set(
        'Content-Security-Policy',
        "img-src 'self' data:; report-uri https://httpbin.agrd.dev/status/201",
    );

    newResponse.headers.set(
        'Content-Security-Policy-Report-Only',
        "connect-src 'self'; report-uri https://httpbin.agrd.dev/status/200",
    );

    return newResponse;
}
