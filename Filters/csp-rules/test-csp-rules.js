/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("Case 1: text response", function(assert) {
        assert.ok(document.querySelector("#case1 > h3").innerHTML == "", "PASSED!");
    });

});