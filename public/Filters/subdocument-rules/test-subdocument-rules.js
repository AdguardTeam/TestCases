/* global QUnit */

/**
 * Before doing the test, import test-subdocument-rules.txt to AdGuard
 */

window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-subdocument-rules-filter'), null).display === 'none';

    QUnit.test('1. Test rule with subdocument modifier', (assert) => {
        const iframe = document.querySelector('#test-iframe > iframe');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const testIframeImg = innerDoc.querySelector('.test-iframe-img-1');
        assert.ok(adgCheck && window.getComputedStyle(testIframeImg).height === '0px',
            'Rule with subdocument modifier should block element in the iframe');

        const testImg = document.querySelector('#case-1 > img');
        assert.ok(adgCheck && window.getComputedStyle(testImg).height === '40px',
            'Rule with subdocument modifier shouldn\'t block element in the top frame');
    });

    QUnit.test('2. Test rule with negated subdocument modifier', (assert) => {
        const iframe = document.querySelector('#test-iframe > iframe');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const testIframeImg = innerDoc.querySelector('.test-iframe-img-2');
        assert.ok(adgCheck && window.getComputedStyle(testIframeImg).height === '40px',
            'Rule with negated subdocument modifier shouldn\'t block element in the iframe');

        const testImg = document.querySelector('#case-2 > img');
        assert.ok(adgCheck && window.getComputedStyle(testImg).height === '0px',
            'Rule with negated subdocument modifier should block element in the top frame');
    });

    QUnit.test('3. Test exclusion rule with subdocument modifier', (assert) => {
        const iframe = document.querySelector('#test-iframe > iframe');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const testIframeImg = innerDoc.querySelector('.test-iframe-img-3');
        assert.ok(adgCheck && window.getComputedStyle(testIframeImg).height === '40px',
            'Exclusion rule with subdocument modifier should disable subdocument rule');

        const testImg = document.querySelector('#case-3 > img');
        assert.ok(adgCheck && window.getComputedStyle(testImg).height === '40px',
            'Exclusion rule with subdocument modifier should disable subdocument rule');
    });
});