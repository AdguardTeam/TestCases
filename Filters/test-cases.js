/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener(function() {

    QUnit.test("1. Test domain-specific element hiding rule", function(assert) {
        var element = document.querySelector('#case-1-elemhide > .banner');
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
    // TODO: Simple basic rules 
    // TODO: Basic rules with third-party modifier
    // TODO: Exception rules (@@)
    // TODO: Content-type modifiers (script, style, xmlhttprequest, subdocument, media, etc)
    // TODO: Basic rules with domain restrictions
    // TODO: JS rules
    
}, 'load');
