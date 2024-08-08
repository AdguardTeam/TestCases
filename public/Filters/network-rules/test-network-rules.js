import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

const download = async (url) => {
    // eslint-disable-next-line compat/compat
    const response = await fetch(url);
    const responseText = await response.text();
    return responseText;
};

// eslint-disable-next-line compat/compat
const request = async url => fetch(url, { mode: 'no-cors' });

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-network-rules-filter');

    agTest(1, '$network rule', async (assert) => {
        try {
            await request('https://94.140.14.14/');
        } catch (e) {
            assert.ok(true, '$network rule should block request');
        }
    });

    agTest(2, '$network exception and priority test', async (assert) => {
        const result = await download('https://1.0.0.1/cdn-cgi/trace');
        assert.ok(
            adgCheck && result.indexOf('h=1.0.0.1') !== -1,
            '$network exception rule should disable $network rule and reject all other rules.',
        );
    });
});
