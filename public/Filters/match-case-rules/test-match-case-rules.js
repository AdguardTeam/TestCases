import { getAgTestRunner, isBlockedFetch, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-match-case-rules.txt to AdGuard
 */

const baseUrl = `${window.location.origin}/httpbin/anything`;

window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-match-case-rules-filter');

    agTest(1, '$match-case set + uppercase rule', async (assert) => {
        assert.ok(adgCheck);

        let isBlocked;
        const blockedTestUrl = `${baseUrl}/MATCH-CASE-1`;
        isBlocked = await isBlockedFetch(blockedTestUrl);
        assert.ok(isBlocked, 'uppercase url request is blocked');

        const notBlockedTestUrl = `${baseUrl}/match-case-1`;
        isBlocked = await isBlockedFetch(notBlockedTestUrl);
        assert.ok(!isBlocked, 'lowercase url request is NOT blocked');
    });

    agTest(2, '$match-case set + lowercase rule', async (assert) => {
        assert.ok(adgCheck);

        let isBlocked;

        const blockedTestUrl = `${baseUrl}/match-case-2`;
        isBlocked = await isBlockedFetch(blockedTestUrl);
        assert.ok(isBlocked, 'lowercase url request is blocked');

        const notBlockedTestUrl = `${baseUrl}/MATCH-CASE-2`;
        isBlocked = await isBlockedFetch(notBlockedTestUrl);
        assert.ok(!isBlocked, 'uppercase url request is NOT blocked');
    });

    agTest(3, 'no $match-case', async (assert) => {
        assert.ok(adgCheck);

        let blockedTestUrl;
        let isBlocked;

        blockedTestUrl = `${baseUrl}/Match-Case-3`;
        isBlocked = await isBlockedFetch(blockedTestUrl);
        assert.ok(isBlocked, 'Match-Case-3 request is blocked');

        blockedTestUrl = `${baseUrl}/MATCH-CASE-3`;
        isBlocked = await isBlockedFetch(blockedTestUrl);
        assert.ok(isBlocked, 'MATCH-CASE-3 request is blocked');

        blockedTestUrl = `${baseUrl}/match-case-3`;
        isBlocked = await isBlockedFetch(blockedTestUrl);
        assert.ok(isBlocked, 'match-case-3 request is blocked');
    });
});
