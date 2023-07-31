import { getAgTestRunner, isSubscribed } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-important-vs-urlblock.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-important-vs-urlblock-filter');

    agTest(1, '$important rule vs $urlblock exception', (assert) => {
        const image = document.querySelector('#case1 > img');
        const imageBlocked = (image === null) || (getComputedStyle(image, null).display === 'none');
        assert.ok(adgCheck && imageBlocked, '$urlblock exception should not disable $important rule.');
    });
});
