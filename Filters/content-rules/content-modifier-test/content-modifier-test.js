/* global QUnit */

/**
 * Before doing the test, import content-modifier-test.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-content-modifier-filter'), null).display === 'none';

    QUnit.test("1. Test $content modifier with 'div' element", (assert) => {
        assert.ok(adgCheck && document.querySelector('#case1'), 'exception rule with $content modifier should disable all content rules');
    });

    QUnit.test("2. Test $content modifier with 'a' element and 'tag-content' attribute", (assert) => {
        assert.ok(adgCheck && document.querySelector('#case2'), 'exception rule with $content modifier should disable all content rules');
    });

    QUnit.test("3. Test $content modifier with 'div' element and 'wildcard' attribute", (assert) => {
        assert.ok(adgCheck && document.querySelector('#case3'), 'exception rule with $content modifier should disable all content rules');
    });

    QUnit.test("4. Test $content modifier with 'class' element", (assert) => {
        assert.ok(adgCheck && document.querySelector('#case4'), 'exception rule with $content modifier should disable all content rules');
    });
});
