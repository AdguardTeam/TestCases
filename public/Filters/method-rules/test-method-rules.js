import { getAgTestRunner, isBlockedFetch, isSubscribed } from '../helpers.js';

const GET_METHOD_NAME = 'GET';
const OPTIONS_METHOD_NAME = 'OPTIONS';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-method-rules.txt to AdGuard
 */

/**
 * Returns options for fetch request with `cache: 'no-cache'` and specified `method`.
 *
 * @param {string} method
 *
 * @returns Options for fetch request.
 */
const getNoCacheOptions = (method) => {
    return {
        cache: 'no-cache',
        method,
    };
};

const baseUrl = `${window.location.origin}/httpbin/anything`;

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-method-rules-filter');

    agTest(1, '$method rule blocks requests by specified method', async (assert) => {
        assert.ok(adgCheck);

        const testDataUrl = `${baseUrl}/test-case-1.json`;

        const isBlockedMethod = await isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(isBlockedMethod, '$method=get rule should block request with GET method');

        const isBlockedOptions = await isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.notOk(isBlockedOptions, '$method=get rule should not block requests with the OPTIONS method.');
    });

    agTest(2, '$method rule unblocks requests by specified method', async (assert) => {
        assert.ok(adgCheck);

        const testDataUrl = `${baseUrl}/test-case-2.json`;

        const isBlockedGet = await isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(isBlockedGet, '$method=options allowlist rule should not unblock request with GET method');

        const isBlockedOptions = await isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.notOk(isBlockedOptions, '$method=options allowlist rule should unblock request with OPTIONS method');
    });

    agTest(3, '$method blocking rule with inverted value', async (assert) => {
        assert.ok(adgCheck);

        const testDataUrl = `${baseUrl}/test-case-3.json`;

        const isBlockedGet = await isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(isBlockedGet, '$method=~options blocking rule should block request with GET method');

        const isBlockedOptions = await isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.notOk(isBlockedOptions, '$method=~options blocking rule should NOT block request with OPTIONS method');
    });

    agTest(4, '$method unblocking rule with inverted value', async (assert) => {
        assert.ok(adgCheck);

        const testDataUrl = `${baseUrl}/test-case-4.json`;

        const isBlockedMethod = await isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(
            isBlockedMethod,
            'because of $method=~get allowlist rule, request with GET method should NOT be unblocked',
        );

        const isBlockedOptions = await isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.notOk(isBlockedOptions, '$method=~get allowlist rule unblocks the request with OPTIONS method');
    });
});
