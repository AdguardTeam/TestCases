/**
 * Before doing the test, import content-modifier-test.txt to AdGuard
 */
window.addEventListener('load', function() {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-content-modifier-filter'), null).display == 'none';

    QUnit.test("1. Test $content modifier with 'div' element", function(assert) {
        assert.ok(adgCheck && document.querySelector('#case1'), "exception rule with $content modifier should disable all content rules");
    });

    QUnit.test("2. Test $content modifier with 'a' element and 'tag-content' attribute", function(assert) {
        assert.ok(adgCheck && document.querySelector('#case2'), "exception rule with $content modifier should disable all content rules");
    });

    QUnit.test("3. Test $content modifier with 'div' element and 'wildcard' attribute", function(assert) {
        assert.ok(adgCheck && document.querySelector('#case3'), "exception rule with $content modifier should disable all content rules");
    });

    QUnit.test("4. Test $content modifier with 'class' element", function(assert) {
        assert.ok(adgCheck && document.querySelector('#case4'), "exception rule with $content modifier should disable all content rules");
    });
}); 