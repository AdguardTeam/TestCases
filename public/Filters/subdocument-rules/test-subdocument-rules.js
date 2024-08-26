import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-subdocument-rules.txt to AdGuard
 */

window.addEventListener('load', () => {
    const adgCheck = isSubscribed('subscribe-to-test-subdocument-rules-filter');

    agTest(1, '$subdocument modifier', (assert) => {
        const iframe = document.querySelector('#test-iframe > iframe');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const testIframeImg = innerDoc.querySelector('.test-iframe-img-1');
        assert.ok(
            adgCheck && window.getComputedStyle(testIframeImg).height === '0px',
            'Rule with subdocument modifier should block element in the iframe',
        );

        const testImg = document.querySelector('#case-1 > img');
        assert.ok(
            adgCheck && window.getComputedStyle(testImg).height === '40px',
            'Rule with subdocument modifier shouldn\'t block element in the top frame',
        );
    });

    agTest(2, '$subdocument inversion', (assert) => {
        const iframe = document.querySelector('#test-iframe > iframe');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const testIframeImg = innerDoc.querySelector('.test-iframe-img-2');
        assert.ok(
            adgCheck && window.getComputedStyle(testIframeImg).height === '40px',
            'Rule with inverted subdocument modifier should not block element in the iframe',
        );

        const testImg = document.querySelector('#case-2 > img');
        assert.ok(
            adgCheck && window.getComputedStyle(testImg).height === '0px',
            'Rule with inverted subdocument modifier should block element in the top frame',
        );
    });

    agTest(3, '$subdocument exceptions', (assert) => {
        const iframe = document.querySelector('#test-iframe > iframe');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const testIframeImg = innerDoc.querySelector('.test-iframe-img-3');
        assert.ok(
            adgCheck && window.getComputedStyle(testIframeImg).height === '40px',
            'Exceptions rule with $subdocument modifier should disable blocking $subdocument rule',
        );

        const testImg = document.querySelector('#case-3 > img');
        assert.ok(
            adgCheck && window.getComputedStyle(testImg).height === '40px',
            'Exceptions rule with $subdocument modifier should disable blocking $subdocument rule',
        );
    });
});
