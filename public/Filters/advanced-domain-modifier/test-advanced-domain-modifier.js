/* eslint-disable no-undef */

import { getAgTestRunner, isBlockedFetch, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-advanced-domain-modifier.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-advanced-domain-modifier');

    agTest(1, 'element hiding rule', (assert) => {
        const element = document.querySelector('#case-1-elemhide > .test-banner');
        assert.ok(
            adgCheck && window.getComputedStyle(element).display === 'none',
            'Element must have been hidden',
        );
    });

    agTest(2, 'basic rule', async (assert) => {
        const requestUrl = `${window.location.origin}/httpbin/anything/test-case-2.json`;
        const isBlocked = await isBlockedFetch(requestUrl);
        assert.ok(isBlocked, 'Request should be blocked');
    });

    agTest(3, 'extended CSS rule', (assert) => {
        const element = document.querySelector('#case-3-extcss > .test-banner');
        assert.ok(
            adgCheck && window.getComputedStyle(element).display === 'none',
            'Element must have been hidden',
        );
    });

    agTest(4, 'scriptlet rule', (assert) => {
        assert.ok(adgCheck && window.__case4, 'Scriptlet rule works');
    });

    agTest(5, 'script rule', (assert) => {
        assert.ok(adgCheck && window.__case5, 'Script rule works');
    });

    agTest(6, 'regex elemhide rule', (assert) => {
        const element = document.querySelector('#case-6-regex-elemhide > .test-banner');
        assert.ok(
            adgCheck && window.getComputedStyle(element).display === 'none',
            'Element must have been hidden',
        );
    });

    agTest(7, 'basic rule with regex', async (assert) => {
        const requestUrl = `${window.location.origin}/httpbin/anything/test-case-7.json`;
        const isBlocked = await isBlockedFetch(requestUrl);
        assert.ok(isBlocked, 'Request should be blocked');
    });
});
