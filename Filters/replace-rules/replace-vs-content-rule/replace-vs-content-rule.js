import { getAgTestRunner, isSubscribed } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import replace-vs-content-rule.txt to AdGuard
 */

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-replace-vs-content-rule-filter');

    agTest(1, 'using with exception rule including $content modifier for a same request', (assert) => {
        const block1 = document.getElementById('case1-block1').innerText;
        const block2 = getComputedStyle(window.document.getElementById('case1-block2'), null).display === 'block';
        assert.ok(
            block1 !== 'replace rule works' && block2 && adgCheck,
            'Exception rule with $content modifier should disable the $replace rule',
        );
    });
});
