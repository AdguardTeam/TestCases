/* global QUnit */
/* eslint-disable prefer-arrow-callback, func-names */

import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import css-rules.txt to AdGuard
 */
window.addEventListener('load', function () {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-css-rules-filter')).display === 'none';

    agTest(1, 'css rule - single rule', function (assert) {
        const TEST_ELEMENT_ID = 'case-1-single';
        const testElement = window.document.querySelector(`#${TEST_ELEMENT_ID}`);
        assert.ok(testElement instanceof Element, 'test element exists');

        const testStyle = getComputedStyle(window.document.querySelector(`#${TEST_ELEMENT_ID}`), null);
        assert.strictEqual(testStyle.width, '0px', 'single rule changed width');
        assert.strictEqual(testStyle.height, '0px', 'single rule changed height');
        assert.strictEqual(testStyle.margin, '0px', 'single rule changed margin');
        assert.strictEqual(testStyle.padding, '0px', 'single rule changed padding');
        assert.strictEqual(testStyle.overflow, 'visible', 'single rule changed overflow');
        assert.strictEqual(testStyle.display, 'none', 'single rule changed display');
    });

    agTest(2, 'css rule - multiple rules for one element', function (assert) {
        const TEST_ELEMENT_ID = 'case-2-multiple';
        const testElement = window.document.querySelector(`#${TEST_ELEMENT_ID}`);
        assert.ok(testElement instanceof Element, 'test element exists');

        const testStyle = getComputedStyle(window.document.querySelector(`#${TEST_ELEMENT_ID}`), null);
        assert.strictEqual(testStyle.width, '0px', 'single rule changed width');
        assert.strictEqual(testStyle.height, '0px', 'single rule changed height');
        assert.strictEqual(testStyle.margin, '0px', 'single rule changed margin');
        assert.strictEqual(testStyle.padding, '0px', 'single rule changed padding');
        assert.strictEqual(testStyle.overflow, 'visible', 'single rule changed overflow');
        assert.strictEqual(testStyle.display, 'none', 'single rule changed display');
    });

    agTest(3, 'css rule - few rules for one element with important in styles', function (assert) {
        const TEST_ELEMENT_ID = 'case-3-important';
        const testElement = window.document.querySelector(`#${TEST_ELEMENT_ID}`);
        assert.ok(testElement instanceof Element, 'test element exists');

        const testStyle = getComputedStyle(window.document.querySelector(`#${TEST_ELEMENT_ID}`), null);
        assert.strictEqual(testStyle.width, '0px', 'single rule changed width');
        assert.strictEqual(testStyle.height, '0px', 'single rule changed height');
        assert.strictEqual(testStyle.margin, '0px', 'single rule changed margin');
        assert.strictEqual(testStyle.padding, '0px', 'single rule changed padding');
        assert.strictEqual(testStyle.overflow, 'visible', 'single rule changed overflow');
        assert.strictEqual(testStyle.display, 'none', 'single rule changed display');
    });

    agTest(4, 'css rule - specific margins and paddings', function (assert) {
        const TEST_ELEMENT_ID = 'case-4-margin-padding';
        const INIT_VALUE = '1px';
        const testElement = window.document.querySelector(`#${TEST_ELEMENT_ID}`);
        assert.ok(testElement instanceof Element, 'test element exists');

        const testStyle = getComputedStyle(window.document.querySelector(`#${TEST_ELEMENT_ID}`), null);
        assert.strictEqual(testStyle['margin-top'], '0px', 'margin-top changed');
        assert.ok(testStyle['margin-right'] === INIT_VALUE && testStyle['margin-bottom'] === INIT_VALUE && testStyle['margin-left'] === INIT_VALUE, ' rest margins have not changed');
        assert.strictEqual(testStyle['padding-right'], '0px', 'padding-right changed');
        assert.ok(testStyle['padding-bottom'] === INIT_VALUE && testStyle['padding-left'] === INIT_VALUE && testStyle['padding-top'] === INIT_VALUE, ' rest paddings have not changed');
    });

    agTest(5, 'css rule - css rule + extended css selector', function (assert) {
        const TEST_ELEMENT_ID = 'case-5-extended';
        const testElement = window.document.querySelector(`#${TEST_ELEMENT_ID}`);
        assert.ok(testElement instanceof Element, 'test element exists');

        const testStyle = getComputedStyle(window.document.querySelector(`#${TEST_ELEMENT_ID}`), null);
        assert.strictEqual(testStyle.width, '0px', 'selected element width changed');
    });

    agTest(6, 'pseudo-class :has() for css-inject rule', (assert) => {
        const case6 = document.querySelector('#case6');
        assert.ok(window.getComputedStyle(case6).display === 'block');
    });

    agTest(7, 'pseudo-class :has() for css-inject rule exception', (assert) => {
        const case7 = document.querySelector('#case7');
        assert.ok(adgCheck && window.getComputedStyle(case7).visibility === 'visible');
    });
});
