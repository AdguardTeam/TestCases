import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

const request = async (url) => fetch(url, { mode: 'no-cors' });

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
        const response = await fetch('https://8.8.8.8/resolve?name=example.com&type=A');
        const result = await response.json();
        assert.ok(
            adgCheck && result.Status === 0,
            '$network exception rule should disable $network rule and reject all other rules.',
        );
    });
});
