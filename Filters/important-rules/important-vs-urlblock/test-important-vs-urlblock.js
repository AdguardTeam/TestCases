import { getAgTestRunner, isSubscribed } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-important-vs-urlblock.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-important-vs-urlblock-filter');

    agTest(1, '$important rule vs $urlblock exception', (assert) => {
        const imageDisplayed = getComputedStyle(document.querySelector('#case1 > img'), null).display === 'none';
        assert.ok(adgCheck && imageDisplayed, '$urlblock exception should not disable $important rule.');
    });
});
