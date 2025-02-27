/* eslint-disable prefer-arrow-callback, func-names */

import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

// TODO: remake the approach of setting the compatibility of the testcases —
// it would be better to set the compatibility directly in the test file instead of testsData.js. AG-21523

/**
 * Before doing the test, import test-element-hiding-rules.txt to AdGuard
 */
window.addEventListener('load', function () {
    const adgCheck = isSubscribed('subscribe-to-test-element-hiding-rules-filter');

    agTest(1, 'domain-specific element hiding rule', function (assert) {
        const element = document.querySelector('#case-1-elemhide > .test-banner');
        assert.ok(window.getComputedStyle(element).display === 'none');
    });

    agTest(2, 'generic element hiding rule', function (assert) {
        const element = document.querySelector('#case-2-generic-elemhide > .test-banner');
        assert.ok(window.getComputedStyle(element).display === 'none');
    });

    agTest(3, 'element hiding rule exception', function (assert) {
        let element = document.querySelector('#case-3-elemhide-exception > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
        element = document.querySelector('#case-3-elemhide-exception > h1');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
        element = document.querySelector('#case-3-elemhide-exception > h2');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
        element = document.querySelector('#case-3-elemhide-exception > h3');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
    });

    agTest(4, 'domain exclusion', function (assert) {
        const element = document.querySelector('#case-4-domain-exclusion > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
    });

    agTest(5, 'wildcard for tld', function (assert) {
        const element = document.querySelector('#case-5-wildcard-for-tld > .test-banner');
        assert.ok(window.getComputedStyle(element).display === 'none');
    });

    agTest(6, 'wildcard for tld support with $domain modifier', function (assert) {
        const element = document.querySelector('#case-6-wildcard-for-tld-basic-rules > img');
        const isImageBlocked = !element || (getComputedStyle(element).width !== '40px');
        assert.ok(isImageBlocked, 'rule with wildcard in tld blocks image');
        const txt = document.querySelector('#case-6-wildcard-for-tld-basic-rules > .tld-test').innerText;
        assert.ok(adgCheck && txt === 'test', 'rule with wildcard in tld blocks script');
    });

    agTest(7, '$third-party modifier', function (assert) {
        const testImg = document.querySelector('#case-7-third-party > img');
        if (!testImg) {
            // corelibs cuts image from DOM
            assert.ok(true, 'rule with $third-party modifier blocks the test-image');
            return;
        }

        // For MV2 we explicitly hide blocked element in DOM via injecting inline style.
        // For MV3 this is done by browser itself.
        // Description related only to elements which are blocked by network rules.
        assert.ok(
            testImg.getBoundingClientRect().height === 0,
            'rule with $third-party modifier blocks the test-image',
        );
    });

    agTest(8, '$subdocument modifier', function (assert) {
        const iframe1 = document.getElementById('iframe1-case-8');

        if (!iframe1) {
            // Corelibs engine cuts iframe from DOM
            assert.ok(!iframe1, 'Rule with subdocument modifier blocks iframe');
        } else {
            try {
                // Safari browser removes content from iframe's body (<body></body>)
                const iframe1InnerHtml = iframe1.contentWindow
                    && iframe1.contentWindow.document
                    && iframe1.contentWindow.document.querySelector('body')
                    && iframe1.contentWindow.document.querySelector('body').innerHTML;
                assert.ok(iframe1InnerHtml === '', 'Rule with subdocument modifier blocks iframe');
            } catch (e) {
                // For MV2 we explicitly hide blocked element in DOM via injecting inline style.
                // For MV3 this is done by browser itself.
                // Description related only to elements which are blocked by network rules.
                assert.ok(
                    iframe1.getBoundingClientRect().height === 0,
                    'Rule with subdocument modifier blocks iframe',
                );
            }
        }

        // For MV2 we explicitly hide blocked element in DOM via injecting inline style.
        // For MV3 this is done by browser itself.
        // Description related only to elements which are blocked by network rules.
        assert.ok(
            adgCheck && document.getElementById('iframe2-case-8').getBoundingClientRect().height !== 0,
            'Exception rule with subdocument modifier unblocks iframe',
        );
    });

    agTest(9, 'cosmetic rule with pseudo-class :has()', (assert) => {
        const case9 = document.querySelector('#case9');
        assert.ok(adgCheck && window.getComputedStyle(case9).display === 'none');
    });

    agTest(10, 'element hiding rule for elements in main and sub frames', (assert) => {
        // this test case is especially needed for Firefox to check styles injecting speed. AG-40169
        assert.ok(document.querySelector('#case10'), '#case10 element is present');

        const mainFrameElement = document.querySelector('#case10 > #subCase10-main-match');
        assert.ok(
            adgCheck && getComputedStyle(mainFrameElement).display === 'none',
            'div[class="subCase10"] in MAIN frame should be hidden',
        );

        const frame = document.querySelector('#case10 > #subFrame10');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const subFrameElement = subDoc.querySelector('#subCase10-sub-match');

        assert.ok(
            adgCheck && getComputedStyle(subFrameElement).display === 'none',
            'div[class="subCase10"] in SUB frame should be hidden',
        );
    });

    // Add new test cases here
    // TODO: Generic element-hiding rule
    // TODO: Domain exclusion: ~adguardteam.github.io##css
    // TODO: Elemhide exception: adguardteam.github.io#@#css
    // TODO: Generic CSS rule: #$#css { style }
    // TODO: Domain-specific CSS rule: adguardteam.github.io#$#css { style }
    // TODO: Domain exclusion from CSS rule: ~adguardteam.github.io#$#css { style }
    // TODO: CSS rule exception:adguardteam.github.io#$@#css { style }
    // TODO: Extended CSS rules
    // TODO: Simple basic rules
    // TODO: Basic rules with third-party modifier
    // TODO: Exception rules (@@)
    // TODO: Content-type modifiers (script, style, xmlhttprequest, media, etc)
    // TODO: Basic rules with domain restrictions
    // TODO: JS rules
});
