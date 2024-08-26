/* eslint-disable no-undef */

import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-nonbasic-path-modifier.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-nonbasic-path-modifier');

    agTest(1, 'plain match', (assert) => {
        assert.ok(document.querySelector('#case1'));
        const frame = document.querySelector('#case1 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case1');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'none',
            'Rule with subpage1 path should be found',
        );
    });

    agTest(2, 'plain no match', (assert) => {
        assert.ok(document.querySelector('#case2'));
        const frame = document.querySelector('#case2 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case2');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'block',
            'Rule with subpage2 path should not be found',
        );
    });

    agTest(3, 'regex match', (assert) => {
        assert.ok(document.querySelector('#case3'));
        const frame = document.querySelector('#case3 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case3');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'none',
            'Rule with sub regex path should be found',
        );
    });

    agTest(4, 'regex no match', (assert) => {
        assert.ok(document.querySelector('#case4'));
        const frame = document.querySelector('#case4 > #subpage1');
        const subDoc = frame.contentDocument || frame.contentWindow.document;

        const element = subDoc.querySelector('#case4');
        assert.ok(
            adgCheck && getComputedStyle(element).display === 'block',
            'Rule with non-matching regex path should not be found',
        );
    });
});
