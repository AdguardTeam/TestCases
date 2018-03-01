/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("1. Test content id", function(assert) {
        assert.equal(window.getComputedStyle(case1).display, "none");
    });

    QUnit.test("2. Test content content", function(assert) {
        assert.equal(window.getComputedStyle(case2).display, "none");
    });

    QUnit.test("3. Test content class", function(assert) {
        assert.equal(window.getComputedStyle(case3).display, "none");
    });
});
