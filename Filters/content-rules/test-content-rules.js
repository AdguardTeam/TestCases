/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("1. Test content id", function(assert) {
        var element = document.querySelector('#case1');
        assert.equal(window.getComputedStyle(element).display, "none");
    });

    QUnit.test("2. Test content content", function(assert) {
        var element = document.querySelector('#case2');
        assert.equal(window.getComputedStyle(element).display, "none");
    });

    QUnit.test("3. Test content class", function(assert) {
        var element = document.querySelector('#case3');
        assert.equal(window.getComputedStyle(element).display, "none");
    });
});
