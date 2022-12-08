/* global QUnit */

/**
 * Before doing the test, import pseudo-classes-tests.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-pseudo-classes-filter')).display === 'none';

    QUnit.test('1. Test pseudo-class :has() for cosmetic rule', (assert) => {
        const case1 = document.querySelector('#case1');
        assert.equal(window.getComputedStyle(case1).display, 'none');
    });

    QUnit.test('2. Test pseudo-class :has() for cosmetic rule exception', (assert) => {
        const case2 = document.querySelector('#case2');
        assert.ok(adgCheck && window.getComputedStyle(case2).display === 'block');
    });

    QUnit.test('3. Test pseudo-class :has() for extended-css rule', (assert) => {
        const case3 = document.querySelector('#case3');
        assert.equal(window.getComputedStyle(case3).display, 'none');
    });

    QUnit.test('4. Test pseudo-class :has() for extended-css rule exception', (assert) => {
        const case4 = document.querySelector('#case4');
        assert.ok(adgCheck && window.getComputedStyle(case4).display === 'block');
    });

    QUnit.test('5. Test pseudo-class :has() for css-inject rule', (assert) => {
        const case5 = document.querySelector('#case5');
        assert.equal(window.getComputedStyle(case5).visibility, 'hidden');
    });

    QUnit.test('6. Test pseudo-class :has() for css-inject rule exception', (assert) => {
        const case6 = document.querySelector('#case6');
        assert.ok(adgCheck && window.getComputedStyle(case6).visibility === 'visible');
    });

    QUnit.test('7. Test pseudo-class :has() for generic cosmetic rule exception', (assert) => {
        const case7 = document.querySelector('#case7');
        assert.ok(adgCheck && window.getComputedStyle(case7).display === 'block');
    });

    QUnit.test('8. Test pseudo-class :has() for generic extended-css rule exception', (assert) => {
        const case8 = document.querySelector('#case8');
        assert.ok(adgCheck && window.getComputedStyle(case8).display === 'block');
    });
});
