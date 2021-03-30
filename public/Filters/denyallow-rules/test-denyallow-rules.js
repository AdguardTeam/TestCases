/* global QUnit */

/**
 * Before doing the test, import test-denyallow-rules.txt to AdGuard
 */

function loadImage(src) {
  return new Promise(function (resolve, reject) {
    const testImg = document.createElement("img");
    testImg.setAttribute("src", src);
    testImg.addEventListener("load", function () {
      resolve(testImg);
    });
    testImg.addEventListener("error", function () {
      resolve(testImg);
    });
    document.getElementById("test-container").appendChild(testImg);
  });
}

const baseUrl = window.location.origin;

window.addEventListener("DOMContentLoaded", function () {
  QUnit.test("Case 1: $denyallow blocking rule test", async (assert) => {
    const testLoadImg = await loadImage(
      "https://cdn.adguard.com/public/Adguard/Common/adguard_circle.png"
    );
    assert.ok(testLoadImg.height > 5);
    const testBlockedImg = await loadImage(
      "/Filters/denyallow-rules/assets/adguard_circle.png"
    );
    assert.notOk(testBlockedImg.height > 5);
  });

  QUnit.test("Case 2: $denyallow whitelist rule test", async (assert) => {
    const testBlockedImg = await loadImage(
        "https://cdn.adguard.com/public/Adguard/Common/adguard_dns_map.png"
    );
    assert.notOk(testBlockedImg.height > 5);
    const testLoadImg = await loadImage(
        "/Filters/denyallow-rules/assets/adguard_dns_map.png"
    );
    assert.ok(testLoadImg.height > 5);
  });
});
