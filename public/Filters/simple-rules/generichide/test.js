/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', function() {

    QUnit.test("5. Test generic hide", function(assert) {
        var element = document.querySelector('#case-1-generichide > .banner');
        assert.equal(window.getComputedStyle(element).display, "none");
        element = document.querySelector('#case-1-generichide > .banner1');
        assert.equal(window.getComputedStyle(element).display, "block");
    });
});
