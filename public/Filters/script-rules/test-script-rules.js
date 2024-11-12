import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-script-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-script-rules-filter');

    agTest(1, 'script rule', (assert) => {
        assert.ok(window.__testCase1, 'Script rule works');
    });

    agTest(2, 'script rule exception', (assert) => {
        assert.ok(adgCheck && window.adg_test === true, 'Exception script rule should disable script rule');
    });

    agTest(3, 'script rules order', (assert) => {
        assert.ok(window.orderTest === "1234", 'Rules have been applied in proper order');
    });
});
