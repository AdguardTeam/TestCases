export async function onRequest(context: EventContext<unknown, string, unknown>) {
    try {
        const response = await context.next();

        response.headers.set('Access-Control-Allow-Origin', '*');

        return response;
    } catch (err) {
        return new Response(`${err.message}\n${err.stack}`, { status: 500 });
    }
}
