/* global QUnit */

import { getAgTestRunner } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-jsinject-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-jsinject-rules-filter'), null).display === 'none';

    agTest(1, 'script rule', (assert) => {
        assert.ok(adgCheck && !document.__jsinjectTest);
    });
});
