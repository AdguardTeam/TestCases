/**
 * Before doing the test, import test_filter.txt to Adguard
 */
window.addEventListener('load', function() {

    QUnit.test("Test generic hide rule", function(assert) {
        const condition1 = getComputedStyle(window.document.querySelector('#case-1-generichide > .test-banner'), null).display === "none";
        const condition2 = getComputedStyle(window.document.querySelector('#case-1-generichide > .test-banner1'), null).display === "block";
        assert.ok(condition1 && condition2, "$generichide rule disables all cosmetic rules");
    });
});
