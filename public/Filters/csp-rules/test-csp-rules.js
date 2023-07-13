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
        // eslint-disable-next-line compat/compat
        const case3 = await fetch('https://adguard.app', { mode: 'no-cors' });
        assert.ok(case3, '$csp rule works allows to fetch matching url');

        await assert.rejects(
            // eslint-disable-next-line compat/compat
            fetch('http://adguard.app', { mode: 'no-cors' }),
            'multiple $csp rules should work together',
        );
    });

    agTest(3, '$scp exception and multiple $csp rules', (assert) => {
        const testElement = document.querySelector('#case3');
        const testElementHidden = getComputedStyle(testElement).display === 'none';
        assert.ok(adgCheck && testElementHidden, '$scp exception should disable the $csp rule with matching pattern.');
    });
});
