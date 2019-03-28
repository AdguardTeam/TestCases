/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("abort-on-property-write AdGuard syntax", function(assert) {
        window.__testCase1 = 'ok';
        assert.notOk(window.__testCase1);
    });

    QUnit.test("abort-on-property-write.js UBO syntax", function(assert) {
        window.__testCase2 = 'ok';
        assert.notOk(window.__testCase2);
    });

    QUnit.test("abort-on-property-write ABP syntax", function(assert) {
        window.__testCase3 = 'ok';
        assert.notOk(window.__testCase3);
    });
});
