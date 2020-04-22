/* global QUnit */

/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

const download = async (url) => {
    let response = await fetch(url, {mode: "no-cors"});
    let responseText = await response.text();
    return responseText;
};

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-network-rules-filter')).display === 'none';

    QUnit.test("Case 1: $network rule test", async assert => {
        try {
            await download('https://unit-test4.adguard.com');
        }
        catch(error) {
            assert.ok(true, "$network rule should block request");
        }
    });

    QUnit.test("Case 2: $network exception and priority test", async assert => {
        const result = await download('https://unit-test5.adguard.com');
        assert.ok(adgCheck && result === 'OK', "$network exception rule should disable $network rule and reject all other rules.");
    });

});
