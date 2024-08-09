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

    agTest(3, '$urltransform rule can change the origin', async (assert) => {
        try {
            const response = await fetch('https://example.org/status/200');
            assert.ok(adgCheck && response.ok, '$urltransform rule should change the origin');
        } catch (TypeError) {
            assert.true(false, '$urltransform rule should change the origin');
        }
    });

    agTest(4, "$urltransform rule doesn't change the origin for a POST request", async (assert) => {
        try {
            const response = await fetch('https://example.org/post', { method: 'POST', body: 'testdata' });
            assert.ok(adgCheck && !response.ok, '$urltransform rule should not change the origin for a POST request');
        } catch (TypeError) {
            // Succeed: TypeError is thrown because example.org don't send Access-Control-Allow-Origin with our origin
            assert.true(true, '');
        }
    });
});
