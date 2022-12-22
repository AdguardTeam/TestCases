/* global QUnit */
/* eslint-disable prefer-arrow-callback, func-names */

/**
 * Before doing the test, import css-rules.txt to AdGuard
 */
window.addEventListener('load', function () {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-css-rules-filter')).display === 'none';

    QUnit.test('Test css rule: case 1 - single rule', function (assert) {
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

    QUnit.test('Test css rule: case 2 - multiple rules for one element', function (assert) {
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

    QUnit.test('Test css rule: case 3 - few rules for one element with important in styles', function (assert) {
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

    QUnit.test('Test css rule: case 4 - specific margins and paddings', function (assert) {
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

    QUnit.test('Test css rule: case 5 - css + extended css', function (assert) {
        const TEST_ELEMENT_ID = 'case-5-extended';
        const testElement = window.document.querySelector(`#${TEST_ELEMENT_ID}`);
        assert.ok(testElement instanceof Element, 'test element exists');

        const testStyle = getComputedStyle(window.document.querySelector(`#${TEST_ELEMENT_ID}`), null);
        assert.strictEqual(testStyle.width, '0px', 'selected element width changed');
    });

    QUnit.test('6. Test pseudo-class :has() for css-inject rule', (assert) => {
        const case6 = document.querySelector('#case6');
        assert.ok(window.getComputedStyle(case6).display === 'block');
    });

    QUnit.test('7. Test pseudo-class :has() for css-inject rule exception', (assert) => {
        const case7 = document.querySelector('#case7');
        assert.ok(adgCheck && window.getComputedStyle(case7).visibility === 'visible');
    });
});
