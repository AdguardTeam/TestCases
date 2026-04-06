/* eslint-disable prefer-arrow-callback, func-names */

import { getAgTestRunner, isSubscribed, waitIframeLoad } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

const TEST_ELEMENT_SELECTOR = '.generic-ad-banner';

/**
 * Before doing the test, import generic-css-iframe-size.txt to AdGuard.
 *
 * Tests verify that generic CSS element-hiding rules (##.generic-ad-banner)
 * are injected into iframes based on their pixel area.
 * 1. Medium iframe (370×208, area 76,960 px²) — above the new 76,800 threshold.
 * 2. Large iframe (500×201, area 100,500 px²) — above both old and new thresholds.
 * 3. Tiny iframe (1×1, area 1 px²) — below both thresholds.
 */
window.addEventListener('load', async function () {
    const adgCheck = isSubscribed('subscribe-to-test-generic-css-iframe-size-filter');

    agTest(1, 'generic CSS applied to medium iframe (370×208)', async function (assert) {
        const frame = document.querySelector('#case-1-medium');
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;
        const banner = subDoc.querySelector(TEST_ELEMENT_SELECTOR);

        assert.ok(!!banner, 'test element exists in medium iframe');
        assert.ok(
            adgCheck && getComputedStyle(banner).display === 'none',
            '.generic-ad-banner in medium iframe (370×208) should be hidden by generic CSS',
        );
    });

    agTest(2, 'generic CSS applied to large iframe (500×201)', async function (assert) {
        const frame = document.querySelector('#case-2-large');
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;
        const banner = subDoc.querySelector(TEST_ELEMENT_SELECTOR);

        assert.ok(!!banner, 'test element exists in large iframe');
        assert.ok(
            adgCheck && getComputedStyle(banner).display === 'none',
            '.generic-ad-banner in large iframe (500×201) should be hidden by generic CSS',
        );
    });

    agTest(3, 'generic CSS NOT applied to tiny iframe (1×1)', async function (assert) {
        const frame = document.querySelector('#case-3-tiny');
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;
        const banner = subDoc.querySelector(TEST_ELEMENT_SELECTOR);

        assert.ok(!!banner, 'test element exists in tiny iframe');
        assert.ok(
            getComputedStyle(banner).display !== 'none',
            '.generic-ad-banner in tiny iframe (1×1) should NOT be hidden — generic CSS must not be injected',
        );
    });
});
