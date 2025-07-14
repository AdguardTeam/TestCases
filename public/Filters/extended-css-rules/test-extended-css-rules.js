/* eslint-disable no-undef */

import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-extended-css-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-extended-css-rules-filter');

    agTest(1, 'simple :has()', (assert) => {
        assert.equal(window.getComputedStyle(case1).display, 'none');
    });

    agTest(2, 'simple :contains()', (assert) => {
        assert.equal(window.getComputedStyle(case2).display, 'none');
    });

    agTest(3, 'simple :matches-css()', (assert) => {
        assert.equal(window.getComputedStyle(case3).display, 'none');
    });

    agTest(4, 'simple :matches-css-after()', (assert) => {
        assert.equal(window.getComputedStyle(case4).display, 'none');
    });

    agTest(5, 'simple :matches-css-before()', (assert) => {
        assert.equal(window.getComputedStyle(case5).display, 'none');
    });

    agTest(6, 'simple :has-text()', (assert) => {
        assert.equal(window.getComputedStyle(case6).display, 'none');
    });

    agTest(7, 'simple :-abp-has()', (assert) => {
        assert.equal(window.getComputedStyle(case7).display, 'none');
    });

    agTest(8, 'simple :-abp-contains()', (assert) => {
        assert.equal(window.getComputedStyle(case8).display, 'none');
    });

    agTest(9, 'simple regex :contains', (assert) => {
        assert.equal(window.getComputedStyle(case9).display, 'none');
    });

    agTest(10, 'simple regex :matches-css()', (assert) => {
        assert.equal(window.getComputedStyle(case10).display, 'none');
    });

    agTest(11, 'simple regex :matches-css-after()', (assert) => {
        assert.equal(window.getComputedStyle(case11).display, 'none');
    });

    agTest(12, 'simple regex :matches-css-before()', (assert) => {
        assert.equal(window.getComputedStyle(case12).display, 'none');
    });

    agTest(13, 'simple selector followed by descendant combinator', (assert) => {
        assert.equal(window.getComputedStyle(case13).display, 'none');
    });

    agTest(14, 'simple selector followed by children combinator', (assert) => {
        assert.equal(window.getComputedStyle(case14).display, 'none');
    });

    agTest(15, 'simple selector followed by adjacent sibling combinator', (assert) => {
        assert.equal(window.getComputedStyle(case15).display, 'none');
    });

    agTest(16, 'simple selector followed by general sibling combinator', (assert) => {
        assert.equal(window.getComputedStyle(case16).display, 'none');
    });

    agTest(17, 'un-tokenizable complex selector', (assert) => {
        assert.equal(window.getComputedStyle(case17).display, 'none');
    });

    agTest(18, ':xpath()', (assert) => {
        assert.equal(window.getComputedStyle(case18).display, 'none');
    });

    agTest(19, ':nth-ancestor()', (assert) => {
        assert.equal(window.getComputedStyle(case19).display, 'none');
    });

    agTest(20, ':upward(selector)', (assert) => {
        assert.equal(window.getComputedStyle(case20).display, 'none');
    });

    agTest(21, ':upward(number)', (assert) => {
        assert.equal(window.getComputedStyle(case21).display, 'none');
    });

    agTest(22, 'rules injection into iframe with localsource', async (assert) => {
        const frame = document.querySelector('#case22 > #frame1');

        // Wait until the frame was fully loaded.
        await new Promise(resolve => {
            if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
                if (isSafari()) {
                    // Slow it down for Safari (Web Extension is slower there)
                    setTimeout(resolve, 50);
                } else {
                    resolve();
                }
            } else {
                frame.addEventListener('load', resolve, { once: true });
            }
        });

        const innerDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(
            innerDoc.querySelector('#inframe1').style.display === 'none',
            'Extended CSS rules should work inside of iframes with local source',
        );
        // clean up test frame
        frame.style.cssText = 'display:none!important;';
    });

    agTest(23, 'multiple regex :contains()', (assert) => {
        const baseElem = document.querySelector('#case23');
        const testElems = baseElem.querySelectorAll('.case23');
        assert.equal(testElems.length, 5);
        testElems.forEach((el) => {
            assert.equal(window.getComputedStyle(el).display, 'none');
        });
    });

    agTest(24, ':matches-attr()', (assert) => {
        const case24 = document.querySelector('#case24 > #test-matches-attr-match');
        assert.equal(window.getComputedStyle(case24).display, 'none');
    });

    agTest(25, ':matches-property()', (assert) => {
        const case25 = document.querySelector('#case25 > #test-matches-property-match');
        assert.equal(window.getComputedStyle(case25).display, 'none');
    });

    agTest(26, ':remove() pseudo-class', (assert) => {
        const target = document.querySelector('#case26');
        assert.notOk(target);
    });

    agTest(27, 'remove pseudo-property', (assert) => {
        const target = document.querySelector('#case27');
        assert.notOk(target);
    });

    agTest(28, ':is() pseudo-class', (assert) => {
        const case28 = document.querySelector('#case28 > #test-is-any-matches3');
        assert.equal(window.getComputedStyle(case28).display, 'none');
    });

    agTest(29, 'pseudo-class :has() for extended-css rule exception', (assert) => {
        const case29 = document.querySelector('#case29');
        assert.ok(adgCheck && window.getComputedStyle(case29).display === 'block');
    });
});
