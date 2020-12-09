/* global QUnit */

/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', function() {

    const adgCheck = getComputedStyle(
        window.document.getElementById('subscribe-to-test-simple-rules-filter'),
        null
    ).display === 'none';

    QUnit.test("1. Test domain-specific element hiding rule", (assert) => {
        const element = document.querySelector('#case-1-elemhide > .test-banner');
        assert.ok(window.getComputedStyle(element).display === "none");
    });

    QUnit.test("2. Test generic element hiding rule", (assert) => {
        const element = document.querySelector('#case-2-generic-elemhide > .test-banner');
        assert.ok(window.getComputedStyle(element).display === "none");
    });

    QUnit.test("3. Test element hiding rule exception", (assert) => {
        const element = document.querySelector('#case-3-elemhide-exception > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === "block");
    });

    QUnit.test("4. Test domain exclusion", (assert) => {
        const element = document.querySelector('#case-4-domain-exclusion > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === "block");
    });

    QUnit.test("5. Test for wildcard for tld", (assert) => {
        const element = document.querySelector('#case-5-wildcard-for-tld > .test-banner');
        assert.ok(window.getComputedStyle(element).display === "none");
    });

    QUnit.test("6. Test wildcard for tld support with $domain modifier", (assert) => {
        const element = document.querySelector('#case-6-wildcard-for-tld-basic-rules > img');
        const isImageBlocked = !element || (getComputedStyle(element).width !== "40px")
        assert.ok(isImageBlocked, 'rule with wildcard in tld blocks image');
        const txt = document.querySelector('#case-6-wildcard-for-tld-basic-rules > .tld-test').innerText;
        assert.ok(adgCheck && txt === 'test', 'rule with wildcard in tld blocks script');
    });

    QUnit.test("7. Test $third-party modifier", (assert) => {
        const testImg = document.querySelector('#case-7-third-party > img');
        if (testImg) {
            // browser extensions make image zero-size
            assert.ok(window.getComputedStyle(testImg).height === '0px', 'rule with $third-party modifier blocks the test-image');
        } else {
            // corelibs cuts image from DOM
            assert.ok(true, 'rule with $third-party modifier blocks the test-image');
        }
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
    // TODO: Content-type modifiers (script, style, xmlhttprequest, subdocument, media, etc)
    // TODO: Basic rules with domain restrictions
    // TODO: JS rules

});
