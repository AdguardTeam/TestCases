import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);
const baseUrl = window.location.origin;

/**
 * Before doing the test, import test-permissions-rules-mv3.txt to AdGuard
 */
window.addEventListener('DOMContentLoaded', () => {
    agTest(1, 'permissions are set correctly in the main frame', async (assert) => {
        const allowlist = await document.featurePolicy.getAllowlistForFeature('autoplay');
        assert.deepEqual(allowlist.sort(), [baseUrl, 'https://example.com'].sort());
    });

    agTest(2, 'permissions are set correctly in sub frames', async (assert) => {
        const iframe = document.querySelector('#case2');
        const iframeDocument = iframe.contentWindow.document;
        const allowlist = await iframeDocument.featurePolicy.getAllowlistForFeature('geolocation');
        assert.deepEqual(allowlist.sort(), [baseUrl, 'https://example.com'].sort());
    });
});
