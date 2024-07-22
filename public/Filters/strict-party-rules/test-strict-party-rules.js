
import { getAgTestRunner, isBlockedFetch, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-strict-party-rules.txt to AdGuard
 */

const baseUrl = `${window.location.origin}/httpbin`;
const httpbinUrl = 'https://httpbin.agrd.dev';

window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-strict-party-rules-filter');

    agTest(1, 'strict-third-party test', async (assert) => {
        assert.ok(adgCheck);

        let isBlocked;
        const blockedTestUrl = `${httpbinUrl}/xml`;
        isBlocked = await isBlockedFetch(blockedTestUrl);
        assert.ok(isBlocked, 'Request to subdomain is treated as strictly third-party and blocked');

        const notBlockedTestUrl = `${baseUrl}/xml`;
        isBlocked = await isBlockedFetch(notBlockedTestUrl);
        assert.ok(!isBlocked, 'Request to the same domain is not strictly third-party and not blocked');
    });

    agTest(2, 'strict-first-party test', async (assert) => {
        assert.ok(adgCheck);

        let isBlocked;
        const blockedTestUrl = `${baseUrl}/anything`;
        isBlocked = await isBlockedFetch(blockedTestUrl);
        assert.ok(isBlocked, 'Request to the same domain is strictly first-party and blocked');

        const notBlockedTestUrl = `${httpbinUrl}/anything`;
        isBlocked = await isBlockedFetch(notBlockedTestUrl);
        assert.ok(!isBlocked, 'Request to the sub domain is non strictly first-party and not blocked');
    });
});
