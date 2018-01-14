/**
 * Before doing the test, import test-extended-css-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("1. Test simple :has", function(assert) {
        assert.equal(window.getComputedStyle(case1).display, "none");
    });

    QUnit.test("2. Test simple :contains", function(assert) {
        assert.equal(window.getComputedStyle(case2).display, "none");
    });

    QUnit.test("3. Test simple :matches-css", function(assert) {
        assert.equal(window.getComputedStyle(case3).display, "none");
    });

    QUnit.test("4. Test simple :matches-css-after", function(assert) {
        assert.equal(window.getComputedStyle(case4).display, "none");
    });

    QUnit.test("5. Test simple :matches-css-before", function(assert) {
        assert.equal(window.getComputedStyle(case5).display, "none");
    });

    QUnit.test("6. Test simple :has-text", function(assert) {
        assert.equal(window.getComputedStyle(case6).display, "none");
    });

    QUnit.test("7. Test simple :-abp-has", function(assert) {
        assert.equal(window.getComputedStyle(case7).display, "none");
    });

    QUnit.test("8. Test simple :-abp-contains", function(assert) {
        assert.equal(window.getComputedStyle(case8).display, "none");
    });

    QUnit.test("9. Test simple regex :contains", function(assert) {
        assert.equal(window.getComputedStyle(case9).display, "none");
    });

    QUnit.test("10, Test simple regex :matches-css", function(assert) {
        assert.equal(window.getComputedStyle(case10).display, "none");
    });

    QUnit.test("11. Test simple regex :matches-css-after", function(assert) {
        assert.equal(window.getComputedStyle(case11).display, "none");
    });

    QUnit.test("12. Test simple regex :matches-css-before", function(assert) {
        assert.equal(window.getComputedStyle(case12).display, "none");
    });

    QUnit.test("13. Test simple selector followed by descendant combinator", function(assert) {
        assert.equal(window.getComputedStyle(case13).display, "none");
    });

    QUnit.test("14. Test simple selector followed by children combinator", function(assert) {
        assert.equal(window.getComputedStyle(case14).display, "none");
    });

    QUnit.test("15. Test simple selector followed by adjacent sibling combinator", function(assert) {
        assert.equal(window.getComputedStyle(case15).display, "none");
    });

    QUnit.test("16. Test simple selector followed by general sibling combinator", function(assert) {
        assert.equal(window.getComputedStyle(case16).display, "none");
    });

    QUnit.test("17. Test un-tokenizable complex selector", function(assert) {
        assert.equal(window.getComputedStyle(case17).display, "none");
    });
});
