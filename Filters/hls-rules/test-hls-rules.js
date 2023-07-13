import { getAgTestRunner, isSubscribed } from '../helpers.js';

const agTest = getAgTestRunner(window.location);

/**
 * Before doing the test, import test-hls-rules.txt to AdGuard
 */

const expectedData1 = `#EXTM3U
#EXT-X-TARGETDURATION:10
#UPLYNK-SEGMENT:abc123,segment
#UPLYNK-KEY:ccdd2233
#EXT-X-DISCONTINUITY
#EXTINF,10
01.ts
#EXTINF,10
02.ts
#EXT-X-ENDLIST`;

const expectedData2 = `#EXTINF,5
preroll.ts`;

const getHlsData = async (path) => {
    // eslint-disable-next-line compat/compat
    const response = await fetch(path);
    const hlsData = await response.text();
    return hlsData.trim();
};

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = isSubscribed('subscribe-to-test-hls-rules-filter');

    agTest(1, '$hls rule', async (assert) => {
        const hlsData = await getHlsData('test-files/hls-test-1.m3u');
        assert.ok(hlsData === expectedData1, '$hls rule should remove segments by provided pattern');
    });

    agTest(2, '$hls exception rule', async (assert) => {
        const hlsData = await getHlsData('test-files/hls-test-2.m3u');
        assert.ok(adgCheck && hlsData === expectedData2, '$hls exception rule should disable $hls rule');
    });
});
