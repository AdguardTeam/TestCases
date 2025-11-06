/**
 * Using /status/200 and /status/201 endpoints because:
 * 1. We need two different URLs to test blocking vs allowing CSP reports
 * 2. From httpbin.agrd.dev endpoints, /status/* was the only suitable option
 *    that returns text/plain content-type
 * 3. Chose 200 and 201 as they're the closest successful HTTP status codes
 */
const BLOCKED_REPORT_URL = 'https://httpbin.agrd.dev/status/201';
const ALLOWED_REPORT_URL = 'https://httpbin.agrd.dev/status/200';
const FIRST_PARTY_REPORT_URL = '/Filters/csp-reports/test-csp-reports';

/**
 * Handles CSP reports test page with appropriate CSP headers.
 * Sets CSP policies that will generate violation reports to test AdGuard blocking.
 *
 * @param context Request event context
 * @returns Response with CSP headers and test page HTML
 */
export async function onRequest({ request, next }: EventContext<any, any, any>): Promise<Response> {
    // Handle POST requests to accept CSP reports
    if (request.method === 'POST') {
        return new Response('OK', {
            status: 200,
        });
    }

    const response = await next();

    const newResponse = new Response(response.body, response);

    newResponse.headers.set(
        'Content-Security-Policy',
        `img-src 'self' data:; report-uri ${BLOCKED_REPORT_URL}`,
    );

    newResponse.headers.set(
        'Content-Security-Policy-Report-Only',
        `connect-src 'self'; report-uri ${ALLOWED_REPORT_URL} ${FIRST_PARTY_REPORT_URL}`,
    );

    return newResponse;
}
