import { getAgTestRunner, isSubscribed } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-jsinject-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-jsinject-rules-filter');

    agTest(1, 'script rule', (assert) => {
        assert.ok(adgCheck && !document.__jsinjectTest);
    });
});
