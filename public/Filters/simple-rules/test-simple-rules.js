/* global QUnit */
/* eslint-disable prefer-arrow-callback, func-names */

/**
 * Before doing the test, import test-simple-rules.txt to Adguard
 */
window.addEventListener('load', function () {
    const adgCheck = getComputedStyle(
        window.document.getElementById('subscribe-to-test-simple-rules-filter'),
        null
    ).display === 'none';

    QUnit.test('1. Test domain-specific element hiding rule', function (assert) {
        const element = document.querySelector('#case-1-elemhide > .test-banner');
        assert.ok(window.getComputedStyle(element).display === 'none');
    });

    QUnit.test('2. Test generic element hiding rule', function (assert) {
        const element = document.querySelector('#case-2-generic-elemhide > .test-banner');
        assert.ok(window.getComputedStyle(element).display === 'none');
    });

    QUnit.test('3. Test element hiding rule exception', function (assert) {
        let element = document.querySelector('#case-3-elemhide-exception > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
        element = document.querySelector('#case-3-elemhide-exception > h1');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
        element = document.querySelector('#case-3-elemhide-exception > h2');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
        element = document.querySelector('#case-3-elemhide-exception > h3');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
    });

    QUnit.test('4. Test domain exclusion', function (assert) {
        const element = document.querySelector('#case-4-domain-exclusion > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === 'block');
    });

    QUnit.test('5. Test for wildcard for tld', function (assert) {
        const element = document.querySelector('#case-5-wildcard-for-tld > .test-banner');
        assert.ok(window.getComputedStyle(element).display === 'none');
    });

    QUnit.test('6. Test wildcard for tld support with $domain modifier', function (assert) {
        const element = document.querySelector('#case-6-wildcard-for-tld-basic-rules > img');
        const isImageBlocked = !element || (getComputedStyle(element).width !== '40px');
        assert.ok(isImageBlocked, 'rule with wildcard in tld blocks image');
        const txt = document.querySelector('#case-6-wildcard-for-tld-basic-rules > .tld-test').innerText;
        assert.ok(adgCheck && txt === 'test', 'rule with wildcard in tld blocks script');
    });

    QUnit.test('7. Test $third-party modifier', function (assert) {
        const testImg = document.querySelector('#case-7-third-party > img');
        if (testImg) {
            // browser extensions make image zero-size
            assert.ok(window.getComputedStyle(testImg).height === '0px', 'rule with $third-party modifier blocks the test-image');
        } else {
            // corelibs cuts image from DOM
            assert.ok(true, 'rule with $third-party modifier blocks the test-image');
        }
    });

    QUnit.test('8. Test $subdocument modifier', function (assert) {
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
                // Chromium browsers make iframe invisible (visibility: hidden)
                const iframe1Visibility = window.getComputedStyle(iframe1).visibility;
                assert.ok(iframe1Visibility === 'hidden', 'Rule with subdocument modifier blocks iframe');
            }
        }

        const iframe2Visibility = window.getComputedStyle(document.getElementById('iframe2-case-8')).visibility;
        assert.ok(adgCheck && iframe2Visibility === 'visible', 'Exception rule with subdocument modifier unblocks iframe');
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
