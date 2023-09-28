/* eslint-disable compat/compat */

import { getAgTestRunner, isBlockedFetch } from '../helpers.js';

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
    let testDataUrl;

    agTest(1, '$method rule blocks requests by specified method', async (assert) => {
        let isBlocked;
        testDataUrl = `${baseUrl}/test-case-1.json`;

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(isBlocked, '$method=get rule should block request with GET method');

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.ok(isBlocked, '$method=get rule should not block requests with the OPTIONS method.');
    });

    agTest(2, '$method rule unblocks requests by specified method', async (assert) => {
        let isBlocked;
        testDataUrl = `${baseUrl}/test-case-2.json`;

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(isBlocked, '$method=options allowlist rule should not unblock request with GET method');

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.ok(isBlocked, '$method=options allowlist rule should unblock request with OPTIONS method');
    });

    agTest(3, '$method blocking rule with inverted value', async (assert) => {
        let isBlocked;
        testDataUrl = `${baseUrl}/test-case-3.json`;

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(isBlocked, '$method=~options blocking rule should block request with GET method');

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.ok(isBlocked, '$method=~options blocking rule should NOT block request with OPTIONS method');
    });

    agTest(4, '$method unblocking rule with inverted value', async (assert) => {
        let isBlocked;
        testDataUrl = `${baseUrl}/test-case-4.json`;

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(GET_METHOD_NAME));
        assert.ok(isBlocked, 'because of $method=~get allowlist rule, request with GET method should NOT be unblocked');

        isBlocked = isBlockedFetch(testDataUrl, getNoCacheOptions(OPTIONS_METHOD_NAME));
        assert.ok(isBlocked, '$method=~get allowlist rule unblocks the request with OPTIONS method');
    });
});
