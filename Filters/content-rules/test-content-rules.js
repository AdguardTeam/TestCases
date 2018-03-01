/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("1. Test content id", function(assert) {
        assert.notOk(document.querySelector('#case1'));
    });

    QUnit.test("2. Test content content", function(assert) {
        assert.notOk(document.querySelector('#case2'));
    });

    QUnit.test("3. Test content class", function(assert) {
        assert.notOk(document.querySelector('#case3'));
    });
});
