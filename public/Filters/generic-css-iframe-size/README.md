# Generic CSS iframe size

Tests that generic CSS element-hiding rules (`##.generic-ad-banner`) are
injected into iframes based on two criteria from `shouldApplyGenericCss`:

1. **Area threshold** — frame pixel area ≥ 76,800 px².
2. **Viewport percentage** — frame area ≥ 15% of top window area (fallback
   for small screens where the area threshold alone is too coarse).

Generic CSS is applied when **either** condition is met.

## Test cases

| # | Iframe size           | What it tests                              | Expected result |
| - | --------------------- | ------------------------------------------ | --------------- |
| 1 | 370×208 (76,960 px²)  | Above new area threshold, below old (100k) | CSS injected    |
| 2 | 500×201 (100,500 px²) | Above both area thresholds                 | CSS injected    |
| 3 | 1×1 (1 px²)           | Below both thresholds                      | Skipped         |
| 4 | 300×250 (75,000 px²)  | Below area threshold but ≥ 15% of viewport | CSS injected    |
| 5 | 200×100 (20,000 px²)  | Below area threshold and < 15% of viewport | Skipped         |

Tests 4–5 require a small top window — **max 800×600 px** — so the viewport percentage
path is exercised. **Manual resizing may be required** since `window.resizeTo()`
is blocked by browsers for non-popup windows, i.e. cannot be done programmatically.
That's why the testcase is marked as "manual" in `testsData.js`.
