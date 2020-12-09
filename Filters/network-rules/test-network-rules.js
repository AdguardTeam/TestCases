/* global QUnit */

/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

const download = async (url) => {
    let response = await fetch(url);
    let responseText = await response.text();
    return responseText;
};

const request = async (url) => fetch(url, { mode: "no-cors" });

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-network-rules-filter')).display === 'none';

    QUnit.test("Case 1: $network rule test", async assert => {
        try {
            await request('https://unit-test3.adguard.com');
        }
        catch(e) {
            assert.ok(true, "$network rule should block request");
        }
    });

    QUnit.test("Case 2: $network exception and priority test", async assert => {
        const result = await download('https://unit-test5.adguard.com/test.txt');
        assert.ok(adgCheck && result === 'OK', "$network exception rule should disable $network rule and reject all other rules.");
    });

});
