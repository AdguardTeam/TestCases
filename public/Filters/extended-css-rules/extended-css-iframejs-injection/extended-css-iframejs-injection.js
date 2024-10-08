import { getAgTestRunner } from '../../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import extended-css-iframejs-injection.txt to AdGuard
 */
window.addEventListener('load', () => {
    agTest(1, 'rules injection into iframe created by JS', (assert) => {
        const frame = document.querySelector('#case1 > #frame1');
        const innerDoc = frame.contentDocument || frame.contentWindow.document;
        assert.ok(
            innerDoc.querySelector('#inframe1').style.display === 'none',
            'Extended CSS rules should work inside of iframes created by JS',
        );
    });
});
