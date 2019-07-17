/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */
window.addEventListener('load', function() {

    QUnit.test("Case 1: text response", function(assert) {
        assert.equal(document.querySelector("#case1 > h3").innerHTML, "$replace rule works", "PASSED! $replace rule works");
    });

    QUnit.test("Case 2: response is more then 3MB", function(assert) {
        assert.ok(document.querySelector("#case2 > h3").innerHTML != "$replace rule works" && document.querySelector("#case1 > h3").innerHTML == "$replace rule works", "PASSED! $replace rule doesn't applied to response more them 3Mb");
    });

    QUnit.test("Case 3: using with other rules (without $replace modifier) for a same request", function(assert) {
        assert.equal(document.querySelector("#case3 > h3").innerHTML, "Done", "PASSED! $replace rule has higher priority over rules without $replace applied to a same request");
    });

    QUnit.test("Case 4: using with exception rules including $document modifiers for a same request", function(assert) {
        assert.ok(document.querySelector("#case4 > h3").innerHTML == "Testing" && document.querySelector("#case1 > h3").innerHTML == "$replace rule works", "PASSED! $replace rule disabled by exception rule with $document modifier applied to a same request");
    });

    QUnit.test("Case 5: using with exception rules including $generichide modifiers for a same request", function(assert) {
        assert.ok(getComputedStyle(document.querySelector("#case5"), null).display == "block" && document.querySelector("#case5 > h3").innerHTML == "$replace rule works", "PASSED! exception rule with $generichide modifiers doesn't disable the $replace rule");
    });

    QUnit.test("Case 6: multiple $replace rules matching a single request", function(assert) {
        assert.equal(document.querySelector("#case6 > h3").innerHTML, "first $replace works and second $replace as well", "PASSED! both $replace rules for the same request are applied.");
    });

    QUnit.test("Case 7: disabling $replace rules", function(assert) {
        assert.ok(document.querySelector("#case7 > h3").innerHTML == "testing disabling $replace rule" && document.querySelector("#case1 > h3").innerHTML == "$replace rule works", "PASSED! exception $replace rule disables all other $replace rules.");
    });

    QUnit.test("Case 8: multiple $replace rules and disabling", function(assert) {
        assert.equal(document.querySelector("#case8 > h3").innerHTML, "first $replace rule", "PASSED! exception $replace rule disables $replace rule with matching pattern.");
    });

});