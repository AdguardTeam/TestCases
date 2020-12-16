/* global QUnit */

/**
 * Before doing the test, import test-removeparam-rules.txt to AdGuard
 */

const download = async (url) => {
    let response = await fetch(url);
    return response;
};

const baseUrl = window.location.origin;

window.addEventListener('DOMContentLoaded', function () {

    QUnit.test("Case 1: $removeparam rule test", async assert => {
        const testUrl = baseUrl + '/?p1case1=true&p2case1=true'
        const result = await download(testUrl);
        assert.ok(!result.url.includes('p1case1=true') && result.url.includes('p2case1=true'), "$removeparam rule removes passed parameter");
    });

    QUnit.test("Case 2: $removeparam with regexp test", async assert => {
        const testUrl = baseUrl + '/?p1case2=true&p2case2=true'
        const result = await download(testUrl);
        assert.ok(result.url.includes('p1case2=true') && !result.url.includes('p2case2=true'), "$removeparam rule removes passed regexp parameter");
    });
});

// console.log(`REQUEST: ${testUrl}\nRESULT: ${result.url}`);
