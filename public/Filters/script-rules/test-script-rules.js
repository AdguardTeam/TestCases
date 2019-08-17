/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-script-rules-filter'), null).display === 'none';

    QUnit.test("1. Test script rule", function(assert) {
        assert.ok(window.__testCase1);
    });

    QUnit.test("2. Test script rule exception", function(assert) {
        assert.ok(adgCheck && !window.__testCase2);
    });
});
