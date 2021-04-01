/* global QUnit */

/**
 * Before doing the test, import test-removeparam-rules.txt to AdGuard
 */

const request = async (url) => {
  let response = await fetch(url);
  return response;
};

const baseUrl = window.location.origin;

window.addEventListener("DOMContentLoaded", function () {
  QUnit.test("Case 1: $removeparam rule test", async (assert) => {
    const testUrl = baseUrl + "/?p1case1=true&p2case1=true";
    const result = await request(testUrl);
    assert.ok(
      !result.url.includes("p1case1=true") &&
        result.url.includes("p2case1=true"),
      "$removeparam rule removes passed parameter"
    );
  });

  QUnit.test("Case 2: $removeparam with regexp test", async (assert) => {
    const testUrl = baseUrl + "/?p1case2=true&p2case2=true";
    const result = await request(testUrl);
    assert.ok(
      result.url.includes("p1case2=true") &&
        !result.url.includes("p2case2=true"),
      "$removeparam rule removes passed regexp parameter"
    );
  });

  QUnit.test(
    "Case 3: Test two $removeparam rules for the same request",
    async (assert) => {
      const testUrl = baseUrl + "/?p1case3=true&p2case3=true";
      const result = await request(testUrl);
      assert.ok(
        !result.url.includes("p1case3=true") &&
          !result.url.includes("p2case3=true"),
        "Both $removeparam rule are applied"
      );
    }
  );

  QUnit.test("Case 4: $removeparam case sensitivity test", async (assert) => {
    const testUrl = baseUrl + "/?p1case4=true&p2case4=true";
    const result = await request(testUrl);
    assert.ok(
      result.url.includes("p1case4=true") &&
        result.url.includes("p2case4=true"),
      "$removeparam is case sensitive"
    );
  });

  QUnit.test("Case 5: $removeparam exception test", async (assert) => {
    const testUrl = baseUrl + "/?p1case5=true&p2case5=true";
    const result = await request(testUrl);
    assert.ok(
      !result.url.includes("p1case5=true") &&
        result.url.includes("p2case5=true"),
      "$removeparam exception prevents removing parameter"
    );
  });

  QUnit.test("Case 6: $removeparam with $important test", async (assert) => {
    const testUrl = baseUrl + "/?p1case6=true&p2case6=true";
    const result = await request(testUrl);
    assert.ok(
      !result.url.includes("p1case6=true") &&
        !result.url.includes("p2case6=true"),
      "$removeparam rule with $important modifier has priority over $removeparam exception rule"
    );
  });

  QUnit.test("Case 7: $removeparam with $domain test", async (assert) => {
    const testUrl = baseUrl + "/?p1case7=true&p2case7=true";
    const result = await request(testUrl);
    assert.ok(
      !result.url.includes("p1case7=true") &&
        !result.url.includes("p2case7=true"),
      "$removeparam works with $domain modifier"
    );
  });
  QUnit.test("Case 8: $removeparam with inversion test", async (assert) => {
    const testUrl = baseUrl + "/?p1case8=true&p2case8=true";
    const result = await request(testUrl);
    assert.ok(
      result.url.includes("p1case8=true") &&
        !result.url.includes("p2case8=true"),
      "$removeparam works with inversion"
    );
  });
  QUnit.test("Case 9: negate $removeparam test", async (assert) => {
    const testUrl = baseUrl + "/?p1case9=true&p2case9=true";
    const result = await request(testUrl);
    assert.ok(
      result.url.includes("p1case9=true") &&
        result.url.includes("p2case9=true"),
      "$removeparam"
    );
  });
});
