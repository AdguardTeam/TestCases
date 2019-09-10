/**
 * Before doing the test, import test-network-rules.txt to AdGuard
 */

const download = async (url, element) => {
    let response = await fetch(url);
    let responseText = await response.text();
    document.getElementById(element).innerHTML = responseText;
};

window.addEventListener('DOMContentLoaded', function () {

    const adgCheck = getComputedStyle(window.document.getElementById('subscribe-to-test-network-rules-filter')).display === 'none';
    
    QUnit.test("Case 1: $network rule test", async assert => {
        try {
            await download('https://unit-test3.adguard.com', 'case1');
            const case1 = document.getElementById('case1').innerText;     
            assert.equal(case1, "Case 1", "$network rule should block request");
        }
        catch(error) {
            const case1 = document.getElementById('case1').innerText;     
            assert.ok(case1, "Case 1", "$network rule should block request");
        }
    });

    QUnit.test("Case 2: $network rule test", async assert => { 
        try {
            await download('https://unit-test4.adguard.com', 'case2');
            const case2 = document.getElementById('case2').innerText;    
            assert.equal(case2, "Case 2", "$network rule should block request");
        }
        catch(error) {
            const case2 = document.getElementById('case2').innerText;
            assert.ok(case2, "Case 2", "$network rule should block request");
        } 
    });

});