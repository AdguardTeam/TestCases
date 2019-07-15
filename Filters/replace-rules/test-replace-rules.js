/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("Case 1: text response", function(assert) {
        assert.ok(document.querySelector("#case1 > h3").innerHTML == "$replace rule works", "PASSED!");
    });

    QUnit.test("Case 4: using with other rules (without $replace modifier) for a same request", function(assert) {
        assert.ok(document.querySelector("#case4 > h3").innerHTML == "Done", "PASSED!");
    });

    QUnit.test("Case 5: using with exception rules including $document modifiers for a same request", function(assert) {
        assert.ok(document.querySelector("#case5 > h3").innerHTML == "$replace rule disabled", "PASSED!");
    });

    QUnit.test("Case 6: using with exception rules including $generichide modifiers for a same request", function(assert) {
        assert.ok(getComputedStyle(document.querySelector("#case6"), null).display === "block" && document.querySelector("#case6 > h3").innerHTML == "$replace rule works", "PASSED!");
    });

    QUnit.test("Case 7: multiple $replace rules matching a single request", function(assert) {
        assert.ok(document.querySelector("#case7 > h3").innerHTML == "first $replace works and second $replace as well", "PASSED!");
    });

    QUnit.test("Case 8: disabling $replace rules", function(assert) {
        assert.ok(document.querySelector("#case8 > h3").innerHTML == "testing disabling $replace rule", "PASSED!");
    });

    QUnit.test("Case 9: multiple $replace rules", function(assert) {
        assert.ok(document.querySelector("#case9 > h3").innerHTML == "first $replace rule", "PASSED!");
    });

});