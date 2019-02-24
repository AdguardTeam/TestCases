/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    // Ugly wait 1 second
    var e = new Date().getTime() + (1000);
    while (new Date().getTime() <= e) {}

    QUnit.test("1. Test script rule", function(assert) {
        assert.ok(window.__testCase1);
    });

    QUnit.test("2. Test script rule exception", function(assert) {
        assert.notOk(window.__testCase2);
    });
});
