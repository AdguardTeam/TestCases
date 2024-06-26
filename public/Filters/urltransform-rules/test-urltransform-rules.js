import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-urltransform-rules-filter');

    agTest(1, '$urltransform rule', async (assert) => {
        const response = await fetch('https://httpbin.agrd.dev/status/500');
        assert.ok(adgCheck && response.ok, '$urltransform rule should transform an invalid URL into a valid one');
    });

    agTest(2, "$urltransform rule doesn't break POST requests", async (assert) => {
        const response = await fetch('https://httpbin.agrd.dev/royalmail', { method: 'POST', body: 'testdata' });
        assert.ok(adgCheck && response.ok, '$urltransform rule should not break POST requests');
    });
});
