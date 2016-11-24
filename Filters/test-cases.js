/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', function() {

    QUnit.test("1. Test domain-specific element hiding rule", function(assert) {
        var element = document.querySelector('#case-1-elemhide > .banner');
        assert.equal(window.getComputedStyle(element).display, "none");
    
    QUnit.test("2. Test generic element hiding rule", function(assert) {
        var element = document.querySelector('#case-2-generic-elemhide');
        assert.equal(window.getComputedStyle(element).display, "none");
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
