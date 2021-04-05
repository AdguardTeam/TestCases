/* global QUnit */

/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', () => {
    QUnit.test('Test generichide rule', (assert) => {
        const condition1 = getComputedStyle(window.document.querySelector('#case-1-generichide > .test-banner'), null).display === 'none';
        const condition2 = getComputedStyle(window.document.querySelector('#case-1-generichide > .test-banner1'), null).display === 'block';
        assert.ok(condition1 && condition2, '$generichide exception rule disables all generic cosmetic rules');
    });

    QUnit.test('Test generichide rule and js rule', (assert) => {
        const banner1 = window.document.querySelector('#case-1-generichide > .test-banner1');
        assert.ok(banner1.style.width === '200px', "$generichide exception rule doesn't disable js rules");
    });
});
