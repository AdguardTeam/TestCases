/* global QUnit */

/**
 * Before doing the test, import test-jsonprune-rules.txt to AdGuard
 */

const { log } = console;

const getJsonData = async (path) => {
    // eslint-disable-next-line compat/compat
    const response = await fetch(path);
    const data = await response.json();
    log(data);
    return response;
};

window.addEventListener('DOMContentLoaded', () => {
    const adgCheck = getComputedStyle(window.document
        .getElementById('subscribe-to-test-jsonprune-rules-filter')).display === 'none';

    QUnit.test('Case 1: $jsonprune rule', async (assert) => {
        const jsonData = await getJsonData('test-files/test-case-1.json');
        assert.ok(jsonData.test1 && !jsonData.test2, '$jsonprune rule should remove data from response json');
    });

    QUnit.test('Case 2: $jsonprune exception rule', async (assert) => {
        const jsonData = await getJsonData('test-files/test-case-2.json');
        assert.ok(adgCheck && jsonData.test1 && jsonData.test2, '$jsonprune exception rule should disable $jsonprune rule');
    });

    QUnit.test('Case 3: $jsonprune rule for multiple keys', async (assert) => {
        const jsonData = await getJsonData('test-files/test-case-3.json');
        assert.ok(!jsonData['one two']
            && !jsonData['two three four']
            && jsonData['three four five'], '$jsonprune rule should remove data from response json');
    });

    QUnit.test('Case 4: $jsonprune rule with expressions', async (assert) => {
        const jsonData = await getJsonData('test-files/test-case-4.json');
        assert.ok(jsonData.test_data.test1
            && !jsonData.test_data.ad_origin
            && jsonData.test_data.test2, '$jsonprune rule should remove data from response json by expression');
    });

    QUnit.test('Case 5: $jsonprune rule with expressions', async (assert) => {
        const jsonData = await getJsonData('test-files/test-case-5.json');
        assert.ok(!jsonData.level1.level2['Some key']
            && jsonData.level1.level2.test, '$jsonprune rule should remove data from response json by expression');
    });
});
