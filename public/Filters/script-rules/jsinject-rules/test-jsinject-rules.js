/**
 * Before doing the test, import test-jsinject-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-jsinject-rules-filter'), null).display === 'none';

    QUnit.test("1. Test script rule", function(assert) {
        assert.ok(adgCheck && !window.__jsinjecTest);
    });
});
