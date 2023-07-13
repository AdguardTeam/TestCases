import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-to-rules.txt to AdGuard
 */

function loadImage(src) {
    // eslint-disable-next-line compat/compat
    return new Promise(((resolve) => {
        const testImg = document.createElement('img');
        testImg.setAttribute('src', src);
        testImg.addEventListener('load', () => {
            resolve(testImg);
        });
        testImg.addEventListener('error', () => {
            resolve(testImg);
        });
        document.getElementById('test-container').appendChild(testImg);
    }));
}

window.addEventListener('DOMContentLoaded', () => {
    agTest(1, '$to rule blocks request to a specified domain', async (assert) => {
        const PASS_URL = '/Filters/to-rules/assets/adguard_circle.png';
        // eslint-disable-next-line max-len
        const BLOCK_URL = 'https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Filters/denyallow-rules/assets/adguard_circle.png';

        const testLoadImg = await loadImage(PASS_URL);
        assert.ok(testLoadImg.height > 5);

        const testBlockedImg = await loadImage(BLOCK_URL);
        assert.notOk(testBlockedImg.height > 5);
    });
    agTest(2, '$to rule ublocks request to a specified domain', async (assert) => {
        const PASS_URL = '/Filters/to-rules/assets/adguard_dns_map.png';
        // eslint-disable-next-line max-len
        const BLOCK_URL = 'https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Filters/denyallow-rules/assets/adguard_dns_map.png';

        const testLoadImg = await loadImage(PASS_URL);
        assert.ok(testLoadImg.height > 5);

        const testBlockedImg = await loadImage(BLOCK_URL);
        assert.notOk(testBlockedImg.height > 5);
    });
});
