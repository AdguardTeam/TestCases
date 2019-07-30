/**
 * Before doing the test, import test-csp-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', function() {

    QUnit.test("Case 1: Blocking all remote scripts", function(assert) {
        assert.equal(document.querySelector("#case1 > h3").innerHTML, "Dummy", "$csp rule should block all remote scripts.");
    });

});