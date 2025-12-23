import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-content-rules.txt to AdGuard
 */
window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-content-rules-filter');

    agTest(1, 'just id', (assert) => {
        assert.ok(adgCheck && !document.querySelector('#case1'));
    });

    agTest(2, 'id and tag-content', (assert) => {
        assert.ok(adgCheck && !document.querySelector('#case2'));
    });

    agTest(3, 'class', (assert) => {
        assert.ok(adgCheck && !document.querySelector('#case3'));
    });

    agTest(4, 'wildcard', (assert) => {
        assert.ok(adgCheck && !document.querySelector('#case4'));
    });

    agTest(5, 'exceptions', (assert) => {
        assert.ok(adgCheck && document.querySelector('#case5'));
    });

    agTest(6, 'attribute without value', (assert) => {
        assert.ok(adgCheck && !document.querySelector('#case6'));
    });

    agTest(7, ':contains() pseudo-class and child combinator', (assert) => {
        assert.ok(adgCheck && !document.querySelector('#case7-1'));
        assert.ok(adgCheck && document.querySelector('#case7-2'));
    });

    agTest(8, 'grouping combinator', (assert) => {
        assert.ok(adgCheck && !document.querySelector('#case8-1'));
        assert.ok(adgCheck && !document.querySelector('#case8-2'));
        assert.ok(adgCheck && !document.querySelector('#case8-3'));
    });

    agTest(9, 'complex selector', (assert) => {
        assert.ok(adgCheck && document.querySelector('#case9-1'));
        assert.ok(adgCheck && document.querySelector('#case9-2'));
        assert.ok(adgCheck && document.querySelector('#case9-3'));
        assert.ok(adgCheck && document.querySelector('#case9-4'));
        assert.ok(adgCheck && !document.querySelector('#case9-5'));
        assert.ok(adgCheck && !document.querySelector('#case9-6'));
    });

    agTest(10, 'special selector chain', (assert) => {
        assert.ok(adgCheck && document.querySelector('#case10-1'));
        assert.ok(adgCheck && document.querySelector('#case10-2'));
        assert.ok(adgCheck && document.querySelector('#case10-3'));
        assert.ok(adgCheck && document.querySelector('#case10-4'));
        assert.ok(adgCheck && !document.querySelector('#case10-5'));
        assert.ok(adgCheck && document.querySelector('#case10-6'));
    });
});
