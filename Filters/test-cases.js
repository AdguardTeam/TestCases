/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener(function() {

    QUnit.test("1. Test simple element hiding rule", function(assert) {
        var element = document.querySelector('#case-1-elemhide > .banner');
        assert.equal(window.getComputedStyle(element).display, "none");
    });

    // Add new test cases here
    
}, 'load');
