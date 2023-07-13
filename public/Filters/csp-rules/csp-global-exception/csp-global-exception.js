/* global tmp */

import { getAgTestRunner, isSubscribed } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import csp-global-exception.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-csp-global-exception-rules-filter');

    agTest(1, '$csp global exception (no arguments) test', (assert) => {
        assert.ok(
            adgCheck && document.getElementById('csp-global-exception').innerHTML === 'Inline script works',
            '$csp exception rule should disable other $csp rules.',
        );
        document.body.removeChild(tmp);
    });
});
