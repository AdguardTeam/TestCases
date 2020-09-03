/* global QUnit */

// Before doing the test, import test-redirect-security.txt to AdGuard

/**
 * Makes requests with used secret key and without secret key and checks the results
 *
 * @param {array} urls
 * @param assert
 */
const redirectResourcesSecurityTest = async (assert, urls) => {
    for (const url of urls) {
        // first request
        const response1 = await fetch(url);
        assert.ok(
            response1.status === 200
            && response1.redirected
            && response1.url.includes('?secret='),
            `First request for ${url} is ok`
        );

        // second request with the same secret key
        await assert.rejects(
            fetch(response1.url),
            "Second request with the same secret key should fail"
        );

        // get url without secret key
        const urlNoSecret = response1.url.substring(0, response1.url.indexOf('?secret='));

        // third request without secret key
        await assert.rejects(
            fetch(urlNoSecret),
            "Third request without secret key should fail"
        );
    }
}

window.addEventListener('DOMContentLoaded', function () {
    QUnit.test("Case 1: $redirect resources security test", async assert => {
        await redirectResourcesSecurityTest(assert, [
            '../redirect-rules/test-files/redirect-test.png',
            '../redirect-rules/test-files/redirect-test.txt',
            '../redirect-rules/test-files/redirect-test.js',
            '../redirect-rules/test-files/redirect-test.html',
        ]);
    });
});
