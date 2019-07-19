/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */

const download = async (url) => {
    let response = await fetch(url);
    let responseText = await response.text();
    return responseText;
};

window.addEventListener('load', function () {

    // QUnit.testStart(function (assert) {
    //     console.log("Now running: ", assert.name);
    // });
    // QUnit.module( "group a" );
    QUnit.test("Case 1: text response", async assert1 => {
        const case1 = await download("test-files/case1-text-response.txt");
        assert1.equal(case1, "Replaced", "PASSED! $replace rule works");
    });

    // QUnit.moduleDone(function( details ) {
    // });
      
    QUnit.skip("Case 2: response is more then 3MB", async assert => {
        const case2 = await download("test-files/case2-response-over-3mb.txt");
        assert.equal(case2.substring(0, 7), "Adguard", "PASSED! $replace rule doesn't applied to response more them 3Mb");
    });

    QUnit.test("Case 3: using with other rules (without $replace modifier) for a same request", async assert => {
        const case3 = await download("test-files/case3-using-with-other-rules.txt");
        assert.equal(case3, "Replaced", "PASSED! $replace rule has higher priority over rules without $replace applied to a same request");
    });

    QUnit.test("Case 4: using with exception rules including $document modifiers for a same request", async assert => {
        const case4 = await download("test-files/case4.html");
        assert.equal(case4, "Case 4", "PASSED! $replace rule disabled by exception rule with $document modifier applied to a same request");
    });

    QUnit.test("Case 5: using with exception rules including $generichide modifiers for a same request", async assert => {
        const case5 = await download("test-files/case5-using-with-generichide-exception.txt");
        const element = document.getElementById("case5").innerHTML.substring(0, 6);
        assert.ok(case5 == "Replaced" && element == "Case 5", "PASSED! exception rule with $generichide modifiers doesn't disable the $replace rule");
    });

    QUnit.test("Case 6: multiple $replace rules matching a single request", async assert => {
        const case6 = await download("test-files/case6-multiple-replace-rules.txt");
        assert.equal(case6, "first and second $replace work", "PASSED! both $replace rules for the same request are applied alphabetically.");
    });

    QUnit.test("Case 7: disabling $replace rules", async assert => {
        const case7 = await download("test-files/case7-disabling-replace-rule.txt");
        assert.equal(case7, "Replace", "PASSED! exception $replace rule disables all other $replace rules.");
    });

    QUnit.test("Case 8: multiple $replace rules and disabling", async assert => {
        const case8 = await download("test-files/case8-disabling-multiple-replace-rules.txt");
        assert.equal(case8, "first $replace works", "PASSED! exception $replace rule disables $replace rule with matching pattern.");
    });

});