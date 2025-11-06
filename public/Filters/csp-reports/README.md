# CSP report-uri blocking test

Tests AdGuard's ability to block Content Security Policy (CSP) violation reports sent by the browser.

## Setup

Before testing, copy the filter rules to your AdGuard user rules from `test-csp-reports.txt`

## Test cases

### Case 1 (Automated)
Verifies that CSP policy is working correctly:
- External image `https://httpbin.agrd.dev/image/png` is blocked by CSP policy `img-src 'self' data:`
- Browser generates CSP violation report

### Case 2 (Manual)
Tests blocking of CSP reports:
- Load external image → triggers CSP violation
- CSP report sent to `https://httpbin.agrd.dev/status/201`
- **Expected:** Report should be blocked

### Case 3 (Manual)
Tests whitelist and first-party CSP reports:
- Fetch external JSON → triggers CSP violation
- CSP reports sent to:
  - `https://httpbin.agrd.dev/status/200` - allowed by whitelist `@@||httpbin.agrd.dev/status/200^`
  - `/Filters/csp-reports/test-csp-reports` - first-party endpoint (not blocked)
- **Expected:** Both reports allowed

## Testing

1. Subscribe to test filter rules
2. Open DevTools Network tab
3. Run Test 1 (automated) - should pass
4. Click Test 2 and Test 3 buttons
5. Check Network tab and Filtering log for blocked/allowed CSP report requests
