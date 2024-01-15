import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-csp-rules.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-csp-rules-filter');

    agTest(1, 'using with basic rules', (assert) => {
        const testElement1 = document.getElementById('csp-test');
        assert.ok(!testElement1, '$csp rule prevents executing inline script');

        const testElement2 = document.getElementById('some-element');
        const testElement2Hidden = getComputedStyle(testElement2).display === 'none';
        assert.ok(testElement2Hidden, '$csp rule should work together with basic rules.');
    });

    agTest(2, 'multiple $csp rules', async (assert) => {
        const baseUrl = 'https://httpbin.agrd.dev/anything';

        const response = await fetch(`${baseUrl}/test-1`);
        const test = await response.json();
        await assert.ok(test.url.endsWith('test-1'));

        await assert.rejects(fetch(`${baseUrl}/test-2`));

        await assert.ok(new Promise((resolve) => {
            const frame1 = document.getElementById('test-1');
            frame1.onload = () => {
                resolve(true);
            };
        }));

        await assert.ok(new Promise((resolve) => {
            const frame2 = document.getElementById('test-2');
            frame2.onerror = () => {
                resolve(true);
            };
        }));
    });

    agTest(3, '$csp exception and multiple $csp rules', (assert) => {
        const testElement = document.querySelector('#case3');
        const testElementHidden = getComputedStyle(testElement).display === 'none';
        assert.ok(adgCheck && testElementHidden, '$scp exception should disable the $csp rule with matching pattern.');
    });
});
