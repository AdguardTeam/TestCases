/* global QUnit */

/**
 * Before doing the test, import test-subdocument-rules.txt to AdGuard
 */

window.addEventListener('load', () => {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-subdocument-rules-filter'), null).display === 'none';

    QUnit.test('1. Test rule with subdocument modifier', (assert) => {
        const iframe = document.querySelector('#case-1 > iframe');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const testIframeImg = innerDoc.querySelector('.test-iframe-img');
        assert.ok(adgCheck && window.getComputedStyle(testIframeImg).height === '0px',
            'Rule with subdocument modifier should block element in the iframe');

        const testImg = document.querySelector('#case-1 > .test-img');
        assert.ok(adgCheck && window.getComputedStyle(testImg).height === '40px',
            'Rule with subdocument modifier shouldn\'t block element in the top frame');
    });
});
