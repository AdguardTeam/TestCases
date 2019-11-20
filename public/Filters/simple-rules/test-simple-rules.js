/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', function() {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-simple-rules-filter'), null).display == 'none';

    QUnit.test("1. Test domain-specific element hiding rule", function(assert) {
        var element = document.querySelector('#case-1-elemhide > .test-banner');
        assert.equal(window.getComputedStyle(element).display, "none");
    });
    
    QUnit.test("2. Test generic element hiding rule", function(assert) {
        var element = document.querySelector('#case-2-generic-elemhide > .test-banner');
        assert.equal(window.getComputedStyle(element).display, "none");
    });

    QUnit.test("3. Test element hiding rule exception", function(assert) {
        var element = document.querySelector('#case-3-elemhide-exception > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === "block");
    });
	
    QUnit.test("4. Test domain exclusion", function(assert) {
        var element = document.querySelector('#case-4-domain-exclusion > .test-banner');
        assert.ok(adgCheck && window.getComputedStyle(element).display === "block");
    });

    QUnit.test("5. Test for wildcard for tld", function(assert) {
        var element = document.querySelector('#case-5-wildcard-for-tld > .test-banner');
        assert.equal(window.getComputedStyle(element).display, "none");
    });

    QUnit.test("6. Test wildcard for tld support with $domain modifier", function(assert) {
        var element = document.querySelector('#case-6-wildcard-for-tld-basic-rules > img');
        const isBlocked = !element || (getComputedStyle(element).width !== "40px")
        assert.equal(isBlocked, true);
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
