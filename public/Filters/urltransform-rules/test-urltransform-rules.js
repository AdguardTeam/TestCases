import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-urltransform-rules-filter');

    agTest(1, '$urltransform rule', async (assert) => {
        const response = await fetch('https://httpbin.agrd.dev/status/500', {
            headers: { Accept: 'text/html' },
        });
        assert.ok(adgCheck && response.ok, '$urltransform rule should transform an invalid URL into a valid one');
    });

    agTest(2, "$urltransform rule doesn't break POST requests", async (assert) => {
        const response = await fetch('https://httpbin.agrd.dev/royalmail', {
            method: 'POST',
            body: 'testdata',
            headers: { Accept: 'text/html' },
        });
        assert.ok(adgCheck && response.ok, '$urltransform rule should not break POST requests');
    });

    agTest(3, '$urltransform rule can change the origin', async (assert) => {
        try {
            const response = await fetch('https://example.org/status/200', {
                headers: { Accept: 'text/html' },
            });
            assert.ok(adgCheck && response.ok, '$urltransform rule should change the origin');
        } catch (TypeError) {
            assert.true(false, '$urltransform rule should change the origin');
        }
    });

    agTest(4, "$urltransform rule doesn't change the origin for a POST request", async (assert) => {
        try {
            const response = await fetch('https://example.org/post', {
                method: 'POST',
                body: 'testdata',
                headers: { Accept: 'text/html' },
            });
            assert.ok(adgCheck && !response.ok, '$urltransform rule should not change the origin for a POST request');
        } catch (TypeError) {
            // Succeed: TypeError is thrown because example.org don't send Access-Control-Allow-Origin with our origin
            assert.true(true, '');
        }
    });

    agTest(5, '$urltransform rule should work with $script modifier', async (assert) => {
        // Use <link rel="preload" as="script"> to make a real script-type request
        // without executing the response (avoids SyntaxError in console).
        // The urltransform rule should rewrite /status/502 to /status/200.
        const scriptLoaded = await new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = 'https://httpbin.agrd.dev/status/502';
            link.onload = () => {
                link.remove();
                resolve(true);
            };
            link.onerror = () => {
                link.remove();
                resolve(false);
            };
            document.head.appendChild(link);
        });
        assert.ok(adgCheck && scriptLoaded, 'script $urltransform should apply for JS resources');

        // A non-script request (fetch) to the same URL should NOT be transformed.
        const htmlResponse = await fetch('https://httpbin.agrd.dev/status/502', {
            headers: { Accept: 'text/html' },
        });
        assert.ok(adgCheck && !htmlResponse.ok, 'script $urltransform should not apply for non-script requests');
    });

    agTest(6, '$urltransform rule should work with $image modifier', async (assert) => {
        // Use an actual <img> element to make a real image request.
        // The urltransform rule should rewrite /status/503 to /image/png.
        const imageLoaded = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = 'https://httpbin.agrd.dev/status/503';
        });
        assert.ok(adgCheck && imageLoaded, 'image $urltransform should apply for image resources');

        // A non-image request (fetch) to the same URL should NOT be transformed.
        const htmlResponse = await fetch('https://httpbin.agrd.dev/status/503', {
            headers: { Accept: 'text/html' },
        });
        assert.ok(adgCheck && !htmlResponse.ok, 'image $urltransform should not apply for non-image requests');
    });
});
