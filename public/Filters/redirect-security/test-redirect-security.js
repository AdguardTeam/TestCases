import { getAgTestRunner } from '../helpers.js';

/**
 * NOTE: non-blocking redirects don't use native urls anymore, thus making
 * these tests obsolete for all redirect resources except for click2load,
 * which is not actually being tested here. AG-19259
 */

const agTest = getAgTestRunner(window.location);

// Before doing the test, import test-redirect-security.txt to AdGuard

/**
 * Makes requests with used secret key and without secret key and checks the results
 *
 * @param {object} assert QUnit assert object
 * @param {array} data Array of objects with url and isBlocking properties
 */
const redirectResourcesSecurityTest = async (assert, data) => {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const { url, isBlocking } of data) {
        // first request
        // eslint-disable-next-line no-await-in-loop, compat/compat
        const response1 = await fetch(url);

        if (isBlocking) {
            // blocking resources should be redirected to a page with a secret key
            assert.ok(
                response1.status === 200
                && response1.redirected
                && response1.url.includes('?secret='),
                `First request for ${url} is ok`,
            );

            // second request with the same secret key
            // eslint-disable-next-line no-await-in-loop
            await assert.rejects(
                // eslint-disable-next-line compat/compat
                fetch(response1.url),
                'Second request with the same secret key should fail',
            );

            // get url without secret key
            const urlNoSecret = response1.url.substring(0, response1.url.indexOf('?secret='));

            // third request without secret key
            // eslint-disable-next-line no-await-in-loop
            await assert.rejects(
                // eslint-disable-next-line no-await-in-loop, compat/compat
                fetch(urlNoSecret),
                'Third request without secret key should fail',
            );
        } else {
            // non-blocking redirects don't use native urls anymore, thus making
            // these tests obsolete for all redirect resources except for click2load,
            // which is not actually being tested here. AG-19259
            assert.ok(
                response1.status === 200
                && response1.redirected
                && response1.url.startsWith('data:'),
                `First request for ${url} is ok`,
            );
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    agTest(1, '$redirect resources security test', async (assert) => {
        await redirectResourcesSecurityTest(assert, [
            { url: '../redirect-rules/test-files/redirect-test.html', isBlocking: true },
            { url: '../redirect-rules/test-files/redirect-test.png', isBlocking: false },
        ]);
    });
});
