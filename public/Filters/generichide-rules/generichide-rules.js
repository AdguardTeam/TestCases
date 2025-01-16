/* eslint-disable prefer-arrow-callback, func-names */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import generichide-rules.txt to AdGuard
 */
window.addEventListener('load', function () {
    agTest(1, '$generichide rule', function (assert) {
        const condition1 = getComputedStyle(
            window.document.querySelector('#case-1-generichide > .test-banner'),
            null,
        ).display === 'none';
        const condition2 = getComputedStyle(
            window.document.querySelector('#case-1-generichide > .test-banner1'),
            null,
        ).display === 'block';
        assert.ok(condition1 && condition2, '$generichide exception rule disables all generic cosmetic rules');
    });

    agTest(2, '$generichide rule and JS rule', function (assert) {
        const banner1 = window.document.querySelector('#case-1-generichide > .test-banner1');
        assert.ok(
            banner1.style.width === '200px',
            'JS rule is not applied, $generichide exception rule SHOULD NOT disable specific JS rule',
        );
    });
});
