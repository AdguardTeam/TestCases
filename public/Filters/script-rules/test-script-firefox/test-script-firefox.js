import { getAgTestRunner, isSubscribed } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-script-firefox.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-script-firefox-filter');

    agTest(1, 'script rule', (assert) => {
        assert.ok(adgCheck && !window.__firefoxTest1, 'Script rule does not work in Firefox');
    });

    agTest(2, 'script rule for cookie', (assert) => {
        const cookies = document.cookie;
        assert.ok(adgCheck && !cookies.includes('adg_test'), 'Script rule for cookies does not work in Firefox');
    });
});
