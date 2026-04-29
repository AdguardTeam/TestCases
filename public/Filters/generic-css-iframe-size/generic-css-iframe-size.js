/* eslint-disable prefer-arrow-callback, func-names */

import { getAgTestRunner, isSubscribed, waitIframeLoad } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

const TEST_ELEMENT_SELECTOR = '.generic-ad-banner';

/**
 * Maximum top-window dimensions for the viewport-based tests.
 * The viewport must be at most this size so that the 15% threshold
 * is actually exercised (large viewports make the percentage check
 * irrelevant because the area threshold fires first).
 *
 * At 800×600 the viewport area is 480,000 px² and its 15% is 72,000 px²,
 * which is below the area threshold (76,800).
 */
const MAX_VIEWPORT = {
    WIDTH: 800,
    HEIGHT: 600,
};

/**
 * Before doing the test, import generic-css-iframe-size.txt to AdGuard.
 *
 * Tests verify that generic CSS element-hiding rules (##.generic-ad-banner)
 * are injected into iframes based on their pixel area.
 * 1. Medium iframe (370×208, area 76,960 px²) — above the new 76,800 area threshold.
 * 2. Large iframe (500×201, area 100,500 px²) — above both old and new area thresholds.
 * 3. Tiny iframe (1×1, area 1 px²) — below both area thresholds.
 * 4. Frame (300×250) ≥ 15% of viewport — viewport path applies CSS.
 * 5. Frame (200×100) < 15% of viewport — neither threshold met, CSS not applied.
 */
window.addEventListener('load', async function () {
    const adgCheck = isSubscribed('subscribe-to-test-generic-css-iframe-size-filter');

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const windowCheck = vw <= MAX_VIEWPORT.WIDTH && vh <= MAX_VIEWPORT.HEIGHT;

    agTest(1, 'area threshold - generic CSS applied to medium iframe (370×208)', async function (assert) {
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

    agTest(2, 'area threshold - generic CSS applied to large iframe (500×201)', async function (assert) {
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

    agTest(3, 'area threshold - generic CSS NOT applied to tiny iframe (1×1)', async function (assert) {
        const frame = document.querySelector('#case-3-tiny');
        await waitIframeLoad(frame);

        const subDoc = frame.contentDocument || frame.contentWindow.document;
        const banner = subDoc.querySelector(TEST_ELEMENT_SELECTOR);

        assert.ok(!!banner, 'test element exists in tiny iframe');
        assert.ok(
            adgCheck && getComputedStyle(banner).display !== 'none',
            '.generic-ad-banner in tiny iframe (1×1) should NOT be hidden',
        );
    });

    agTest(
        4,
        'viewport estimate - generic CSS applied to iframe (300×250) ≥ 15% of viewport (max 800×600)',
        async function (assert) {
            if (!windowCheck) {
                assert.ok(
                    true,
                    `SKIPPED — viewport ${vw}×${vh} exceeds max ${MAX_VIEWPORT.WIDTH}×${MAX_VIEWPORT.HEIGHT}`,
                );
                return;
            }

            const frame = document.querySelector('#case-4-viewport-above');
            await waitIframeLoad(frame);

            const subDoc = frame.contentDocument || frame.contentWindow.document;
            const banner = subDoc.querySelector(TEST_ELEMENT_SELECTOR);

            assert.ok(!!banner, 'test element exists in iframe ≥ 15% of viewport');
            assert.ok(
                adgCheck && getComputedStyle(banner).display === 'none',
                '.generic-ad-banner in iframe (300×250) occupying ≥ 15% of viewport should be hidden',
            );
        },
    );

    agTest(
        5,
        'viewport estimate - generic CSS NOT applied to iframe (200×100) < 15% of viewport (max 800×600)',
        async function (assert) {
            if (!windowCheck) {
                assert.ok(
                    true,
                    `SKIPPED — viewport ${vw}×${vh} exceeds max ${MAX_VIEWPORT.WIDTH}×${MAX_VIEWPORT.HEIGHT}`,
                );
                return;
            }

            const frame = document.querySelector('#case-5-viewport-below');
            await waitIframeLoad(frame);

            const subDoc = frame.contentDocument || frame.contentWindow.document;
            const banner = subDoc.querySelector(TEST_ELEMENT_SELECTOR);

            assert.ok(!!banner, 'test element exists in iframe < 15% of viewport');
            assert.ok(
                adgCheck && getComputedStyle(banner).display !== 'none',
                '.generic-ad-banner in iframe (200×100) occupying < 15% of viewport should NOT be hidden',
            );
        },
    );
});
