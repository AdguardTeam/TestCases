import { getAgTestRunner } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-denyallow-rules.txt to AdGuard
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
    agTest(1, '$denyallow blocking rule test', async (assert) => {
        const FIRST_PARTY_URL = '/Filters/denyallow-rules/assets/adguard_circle.png';
        // eslint-disable-next-line max-len
        const THIRD_PARTY_URL = 'https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Filters/denyallow-rules/assets/adguard_circle.png';

        const testLoadImg = await loadImage(THIRD_PARTY_URL);
        assert.ok(testLoadImg.height > 5);

        const testBlockedImg = await loadImage(FIRST_PARTY_URL);
        assert.notOk(testBlockedImg.height > 5);
    });

    agTest(2, '$denyallow whitelist rule test', async (assert) => {
        const FIRST_PARTY_URL = '/Filters/denyallow-rules/assets/adguard_dns_map.png';
        // eslint-disable-next-line max-len
        const THIRD_PARTY_URL = 'https://raw.githubusercontent.com/AdguardTeam/TestCases/master/public/Filters/denyallow-rules/assets/adguard_dns_map.png';

        const testBlockedImg = await loadImage(THIRD_PARTY_URL);
        assert.notOk(testBlockedImg.height > 5);

        const testLoadImg = await loadImage(FIRST_PARTY_URL);
        assert.ok(testLoadImg.height > 5);
    });

    agTest(3, '$denyallow with extra blocking rule', async (assert) => {
        // eslint-disable-next-line max-len
        const BLOCKED_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/NCDN_-_CDN.png/800px-NCDN_-_CDN.png';
        const testBlockedImg = await loadImage(BLOCKED_URL);
        assert.notOk(testBlockedImg.height > 5);
    });

    agTest(4, '$denyallow domain that was not blocked', async (assert) => {
        const NOT_BLOCKED_URL = 'https://use.fontawesome.com/releases/v5.15.4/css/all.css';
        // eslint-disable-next-line compat/compat
        const page = await fetch(NOT_BLOCKED_URL);
        assert.ok(page.ok);
    });
});
