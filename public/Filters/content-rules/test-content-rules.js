/* global QUnit */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-content-rules-filter'), null).display === 'none';

    agTest(1, 'just id', (assert) => {
        assert.notOk(document.querySelector('#case1'));
    });

    agTest(2, 'id and tag-content', (assert) => {
        assert.notOk(document.querySelector('#case2'));
    });

    agTest(3, 'class', (assert) => {
        assert.notOk(document.querySelector('#case3'));
    });

    agTest(4, 'wildcard', (assert) => {
        assert.notOk(document.querySelector('#case4'));
    });

    agTest(5, 'exceptions', (assert) => {
        assert.ok(adgCheck && document.querySelector('#case5'));
    });
});
