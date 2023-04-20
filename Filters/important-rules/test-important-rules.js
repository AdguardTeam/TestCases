/* global QUnit */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-important-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-important-rules-filter')).display === 'none';

    agTest(1, '$important rule vs exception rule', (assert) => {
        const testImg = document.querySelector('#case1 > img');
        const isBlocked = !testImg
            || (getComputedStyle(testImg).display === 'none')
            || (getComputedStyle(testImg).height === '0px');
        assert.ok(isBlocked, '$important rule should have priority over exception rule.');
    });

    agTest(2, '$important rule vs exception $important rule', (assert) => {
        const imageDisplayed = getComputedStyle(document.querySelector('#case2 > img')).display !== 'none';
        assert.ok(adgCheck && imageDisplayed, 'exception $important rule should have priority over $important rule.');
    });
});
