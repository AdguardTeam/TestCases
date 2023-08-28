import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-removeheader-rules.txt to AdGuard
 */

const baseUrl = window.location.origin;

window.addEventListener('DOMContentLoaded', () => {
    agTest(1, '$removeheader in response', async (assert) => {
        const testUrl = `${baseUrl}/httpbin/response-headers?case1=1`;
        const result = await fetch(testUrl);
        assert.ok(
            result.headers.get('Case1') == null,
            '$removeheader rule removes passed parameter in a response',
        );
    });

    agTest(2, 'negate $removeheader in response', async (assert) => {
        const testUrl = `${baseUrl}/httpbin/response-headers?case2=1`;
        const result = await fetch(testUrl);
        assert.ok(
            result.headers.get('Case2') != null,
            '$removeheader exception rule prevents removing parameter in a response',
        );
    });

    agTest(3, '$removeheader in request', async (assert) => {
        const testUrl = `${baseUrl}/httpbin/headers`;
        const result = await fetch(testUrl, {
            headers: {
                case3: '1',
            },
        });

        const headers = await result.json();

        assert.notOk(
            headers.case3,
            '$removeheader rule removes passed parameter in a request',
        );
    });

    agTest(4, 'negate $removeheader in request', async (assert) => {
        const testUrl = `${baseUrl}/httpbin/headers`;
        const result = await fetch(testUrl, {
            headers: {
                case4: '1',
            },
        });

        const headers = await result.json();

        assert.ok(
            headers.case4,
            '$removeheader exception rule prevents removing parameter in a request',
        );
    });

    agTest(5, '$removeheader is not applied for some high-security headers', async (assert) => {
        const testUrl = `${baseUrl}/httpbin/response-headers?Cache-Control=no-cache`;
        const result = await fetch(testUrl);
        const header = result.headers.get('Cache-control');
        assert.ok(
            header,
            '$removeheader modifier was not applied',
        );
    });
});
