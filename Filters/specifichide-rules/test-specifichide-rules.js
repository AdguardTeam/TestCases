/* eslint-disable prefer-arrow-callback, func-names */

import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-specifichide-rules.txt to AdGuard
 */

window.addEventListener('load', function () {
    const adgCheck = isSubscribed('subscribe-to-test-specifichide-rules-filter');

    agTest(1, '$specifichide modifier', function (assert) {
        const element = document.querySelector('#case-1 > .test-banner-1');
        assert.ok(
            adgCheck
            && window.getComputedStyle(element).display === 'block',
            'Rule with specifichide modifier should disable basic rule',
        );
    });

    agTest(2, '$specifichide modifier vs generic basic rule', function (assert) {
        const element = document.querySelector('#case-2 > .test-banner-2');
        assert.ok(
            adgCheck
            && window.getComputedStyle(element).display === 'none',
            "Rule with specifichide modifier shouldn't disable generic basic rule",
        );
    });

    agTest(3, '$specifichide modifier vs generic css rule', function (assert) {
        const element = document.querySelector('#case-3 > .test-banner-3');
        assert.ok(
            adgCheck
            && window.getComputedStyle(element).display === 'block'
            && window.getComputedStyle(element).width === '200px',
            "Rule with specifichide modifier shouldn't disable generic css rule",
        );
    });
});
