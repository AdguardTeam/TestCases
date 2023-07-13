/* global QUnit */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-method-rules.txt to AdGuard
 */

const baseUrl = `${window.location.origin}/Filters/method-rules/test-files`;

window.addEventListener('DOMContentLoaded', () => {
    let testDataUrl;
    agTest(1, '$method rule blocks requests by specified method', async (assert) => {
       testDataUrl = `${baseUrl}/test-case-1.json`;
        assert.rejects(fetch(testDataUrl, {
            cache: 'no-cache',
            method: 'GET',
        }), '$method=get rule should block request with GET method');

        let response = await fetch(testDataUrl,{
            cache: 'no-cache',
            method: 'OPTIONS',
        });
        assert.ok(response.ok, '$method=get rule should not block requests with the OPTIONS method.');
    });

    agTest(2, '$method rule unblocks requests by specified method', async (assert) => {
        testDataUrl = `${baseUrl}/test-case-2.json`;
        assert.rejects(fetch(testDataUrl, {
            cache: 'no-cache',
            method: 'GET',
        }), '$method=options allowlist rule should not unblock request with GET method');

        let response = await fetch(testDataUrl,{
            cache: 'no-cache',
            method: 'OPTIONS',
        });
        assert.ok(response.ok, '$method=options allowlist rule should unblock request with OPTIONS method');
    });

    agTest(3, '$method rule with inverted value', async (assert) => {
        testDataUrl = `${baseUrl}/test-case-3.json`;
        assert.rejects(fetch(testDataUrl, {
            cache: 'no-cache',
            method: 'GET',
        }), '$method=options allowlist rule should not unblock request with GET method');

        let response = await fetch(testDataUrl,{
            cache: 'no-cache',
            method: 'OPTIONS',
        });
        assert.ok(response.ok, '$method=get rule should unblock request with OPTIONS method');
    });

    agTest(4, '$method rule with inverted value', async (assert) => {
        testDataUrl = `${baseUrl}/test-case-4.json`;
        assert.rejects(fetch(testDataUrl, {
            cache: 'no-cache',
            method: 'GET',
        }), '$method=options allowlist rule should not unblock request with GET method');

        let response = await fetch(testDataUrl,{
            cache: 'no-cache',
            method: 'OPTIONS',
        });
        assert.ok(response.ok, '$method=get rule should unblock request with OPTIONS method');
    });
});
