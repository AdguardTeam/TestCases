/* global QUnit */

/**
 * Before doing the test, import test-removeheader-rules.txt to AdGuard
 */

const request = async (url) => {
    const response = await fetch(url);
    return response;
};

const baseUrl = window.location.origin;

window.addEventListener('DOMContentLoaded', () => {
    QUnit.test('Case 1: $removeheader in response rule test', async (assert) => {
        const testUrl = `${baseUrl}/Filters/removeheader-rules/test-removeheader-rules.txt`;
        const result = await request(testUrl);
        assert.ok(
            result.headers.get('vary') == null,
            '$removeheader rule removes passed parameter in a response'
        );
    });

    QUnit.test('Case 2: negate $removeheader in response rule test', async (assert) => {
        const testUrl = `${baseUrl}/Filters/removeheader-rules/test-removeheader-rules.txt`;
        const result = await request(testUrl);
        assert.ok(
            result.headers.get('etag') != null,
            '$removeheader exception rule prevents removing parameter in a response'
        );
    });

    QUnit.test('Case 3: $removeheader in request test', async (assert) => {
        const testUrl = 'https://whoami.agrd.workers.dev/';
        const result = await request(testUrl);
        const json = await result.json();
        const header = json.headers.find(header => header[0] === 'user-agent');
        assert.notOk(
            header,
            '$removeheader rule removes passed parameter in a request'
        );
    });

    QUnit.test('Case 4: negate $removeheader in request test', async (assert) => {
        const testUrl = 'https://whoami.agrd.workers.dev/';
        const result = await request(testUrl);
        const json = await result.json();
        const header = json.headers.find(header => header[0] === 'referer');
        assert.ok(
            header,
            '$removeheader exception rule prevents removing parameter in a request'
        );
    });

    QUnit.test('Case 5: $removeheader is not applied for some high-security headers', async (assert) => {
        const testUrl = 'https://whoami.agrd.workers.dev/';
        const result = await request(testUrl);
        const json = await result.json();
        const header = json.headers.find(header => header[0] === 'origin');
        assert.ok(
            header,
            '$removeheader modifier was not applied'
        );
    });
});
