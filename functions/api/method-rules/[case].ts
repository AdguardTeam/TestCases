export function onRequest() {
    return new Response(JSON.stringify({
        data: 'true',
    }));
}
