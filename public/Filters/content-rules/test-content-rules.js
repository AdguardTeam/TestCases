/* global QUnit */

/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-content-rules-filter'), null).display === 'none';

    QUnit.test('1. Test content id', (assert) => {
        assert.notOk(document.querySelector('#case1'));
    });

    QUnit.test('2. Test content content', (assert) => {
        assert.notOk(document.querySelector('#case2'));
    });

    QUnit.test('3. Test content class', (assert) => {
        assert.notOk(document.querySelector('#case3'));
    });

    QUnit.test('4. Test content wildcard', (assert) => {
        assert.notOk(document.querySelector('#case4'));
    });

    QUnit.test('5. Test content exceptions', (assert) => {
        assert.ok(adgCheck && document.querySelector('#case5'));
    });
});
