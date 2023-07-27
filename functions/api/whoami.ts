export function onRequest({ request }: EventContext<unknown, string, unknown>) {
    const { cf, headers } = request;
    const { country } = cf;
    const ip = headers.get('CF-Connecting-IP');

    return new Response(JSON.stringify({
        ip,
        country,
        asn: cf.asn,
        headers: [...request.headers],
    }, null, 4));
}
