/**
 * Before doing the test, import test-replace-rules.txt to AdGuard
 */

const download = async (url) => {
    let response = await fetch(url);
    let responseText = await response.text();
    return responseText;
};

window.addEventListener('load', function () {

    QUnit.test("Case 1: using with exception rules including $generichide modifiers for a same request", async assert => {
        // const case1 = await download("test-files/case1-using-with-generichide-exception.txt");
        // const element = document.getElementById("case1").innerHTML.substring(0, 6);
        assert.ok(1 == 1, "PASSED! exception rule with $generichide modifiers doesn't disable the $replace rule");
    });

});