/* global QUnit */

/* eslint-disable no-undef */

/**
 * Before doing the test, import test-nonbasic-path-modifier.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    QUnit.test('1. Test plain match', (assert) => {
        assert.ok(document.querySelector('#case1'));
        const frame = document.querySelector('#case1 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;
        assert.notOk(subDoc.querySelector('#case1'));
    });

    QUnit.test('2. Test plain no match', (assert) => {
        assert.ok(document.querySelector('#case2'));
        const frame = document.querySelector('#case2 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(subDoc.querySelector('#case2'));
    });

    QUnit.test('3. Test regex match', (assert) => {
        assert.ok(document.querySelector('#case3'));
        const frame = document.querySelector('#case3 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;
        assert.notOk(subDoc.querySelector('#case3'));
    });

    QUnit.test('4. Test regex no match', (assert) => {
        assert.ok(document.querySelector('#case4'));
        const frame = document.querySelector('#case4 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(subDoc.querySelector('#case4'));
    });
});