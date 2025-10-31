# CSP report-uri blocking test

## Setup

Before testing, copy the filter rules to your AdGuard user rules from test-csp-reports.txt

## Test cases

### Case 1: Data URI image loading (automated)

Data URI image should load successfully without CSP violation.

### Case 2: External image blocking (manual)

External image from `https://httpbin.agrd.dev/image/png` should be blocked by CSP policy `img-src 'self' data:`.
Browser generates CSP violation report to `https://httpbin.agrd.dev/status/201`, that should be blocked by filter.

### Case 3: JSON fetch CSP violation (manual)

External JSON fetch from `https://httpbin.agrd.dev/json` violates CSP policy `connect-src 'self'` (Report-Only mode).
Browser generates CSP violation report to `https://httpbin.agrd.dev/status/200`, that should be allowed by whitelist filter.

## Manual testing

1. Open DevTools Network tab
2. Click test buttons to trigger CSP violations:
   - **Test 1**: Image CSP report → `/status/201` (should be blocked)
   - **Test 2**: JSON CSP report → `/status/200` (should be allowed)
3. Check Network tab for different outcomes:
   - CSP reports to `/status/201` should be blocked (red in Network tab)
   - CSP reports to `/status/200` should be allowed (green in Network tab)
4. Check filtering log shows correct information about CSP reports
5. Check popup shows correct count of blocked resources
