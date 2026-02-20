/* eslint-disable prefer-arrow-callback, func-names */

import { getAgTestRunner, waitIframeLoad, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import generichide-rules.txt to AdGuard
 */
window.addEventListener('load', async function () {
    const adgCheck = isSubscribed('subscribe-to-test-generichide-rules-filter');
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

    agTest(2, '$generichide rule and JS rule — specific JS rule still applies', function (assert) {
        const banner1 = window.document.querySelector('#case-1-generichide > .test-banner1');
        assert.ok(
            banner1.style.width === '200px',
            'JS rule is not applied, $generichide exception rule SHOULD NOT disable specific JS rule',
        );
    });

    agTest(3, '$generichide does not disable domain-specific cosmetic rule with $path', async function (assert) {
        const wrapper = document.querySelector('#case-3-generichide-wrapper');
        assert.ok(wrapper, '#case-3-generichide-wrapper element not found');

        const frame = document.querySelector('#case-3-generichide-wrapper > #case-3-subpage1');
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;
        const element = subDoc.querySelector('#case-3-generichide > .test-banner');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'none',
            'Domain-specific cosmetic rule with $path should not be disabled by $generichide',
        );
    });
});
