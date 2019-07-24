/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */

const download = async (url) => {
    let response = await fetch(url);
    let responseText = await response.text();
    return responseText;
};

const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-replace-rules-filter'), null).display == 'none';

window.addEventListener('load', function () {

    QUnit.test("Case 1: text response", async assert1 => {
        const case1 = await download("test-files/case1-text-response.txt");
        assert1.equal(case1, "Test passed", "PASSED! $replace rule works");
    });
      
    QUnit.test("Case 2: response is more then 3MB", async assert => {
        const case2 = await download("test-files/case2-response-over-3mb.txt");
        assert.ok(adgCheck && case2.substring(0, 7) == "Adguard", "PASSED! $replace rule doesn't apply to response more them 3Mb");
    });

    QUnit.test("Case 3: using with other rules (without $replace modifier) for a same request", async assert => {
        const case3 = await download("test-files/case3-using-with-other-rules.txt");
        assert.equal(case3, "Test passed", "PASSED! $replace rule has higher priority over rules without $replace applied for a same request");
    });

    QUnit.test("Case 4: multiple $replace rules matching a single request", async assert => {
        const case4 = await download("test-files/case4-multiple-replace-rules.txt");
        assert.equal(case4, "first and second $replace work", "PASSED! both $replace rules for the same request are applied alphabetically.");
    });

    QUnit.test("Case 5: disabling $replace rules", async assert => {
        const case5 = await download("test-files/case5-disabling-replace-rule.txt");
        assert.ok(adgCheck && case5 == "Adguard", "PASSED! exception $replace rule disables all other $replace rules.");
    });

    QUnit.test("Case 6: multiple $replace rules and disabling", async assert => {
        const case6 = await download("test-files/case6-disabling-multiple-replace-rules.txt");
        assert.equal(case6, "first $replace works", "PASSED! exception $replace rule disables $replace rule with matching pattern.");
    });

});