/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("1. Test AdGuard scriptlet syntax", function(assert) {
        window.__testCase1 = 'ok';
        assert.notOk(window.__testCase1);
    });

    QUnit.test("2. Test UBO scriptlet syntax", function(assert) {
        window.__testCase2 = 'ok';
        assert.notOk(window.__testCase2);
    });

    QUnit.test("2. Test ABP scriptlet syntax", function(assert) {
        window.__testCase3 = 'ok';
        assert.notOk(window.__testCase3);
    });
});
