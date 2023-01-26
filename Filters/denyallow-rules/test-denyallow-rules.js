/* global QUnit */

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

// const baseUrl = window.location.origin;

window.addEventListener('DOMContentLoaded', () => {
    QUnit.test('Case 1: $denyallow blocking rule test', async (assert) => {
        const testLoadImg = await loadImage(
            'https://cdn.adtidy.org/public/Adguard/Common/adguard_circle.png'
        );
        assert.ok(testLoadImg.height > 5);
        const testBlockedImg = await loadImage(
            '/Filters/denyallow-rules/assets/adguard_circle.png'
        );
        assert.notOk(testBlockedImg.height > 5);
    });

    QUnit.test('Case 2: $denyallow whitelist rule test', async (assert) => {
        const testBlockedImg = await loadImage(
            'https://cdn.adtidy.org/public/Adguard/Common/adguard_dns_map.png'
        );
        assert.notOk(testBlockedImg.height > 5);
        const testLoadImg = await loadImage(
            '/Filters/denyallow-rules/assets/adguard_dns_map.png'
        );
        assert.ok(testLoadImg.height > 5);
    });

    QUnit.test('Case 3: $denyallow with extra blocking rule', async (assert) => {
        const testBlockedImg = await loadImage(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/NCDN_-_CDN.png/800px-NCDN_-_CDN.png'
        );
        assert.notOk(testBlockedImg.height > 5);
    });

    QUnit.test('Case 4: $denyallow domain that wasn`t blocked', async (assert) => {
        // eslint-disable-next-line compat/compat
        const page = await fetch('https://use.fontawesome.com/releases/v5.15.4/css/all.css');
        assert.ok(page.ok);
    });
});
