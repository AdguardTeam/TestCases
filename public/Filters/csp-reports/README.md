# CSP report-uri blocking test

## Test cases

### Case 1: Data URI image loading (automated)

Data URI image should load successfully without CSP violation.

### Case 2: External image blocking (manual)

External image from `https://httpbin.agrd.dev/image/png` should be blocked by CSP policy `img-src 'self' data:`.
Browser generates CSP violation report to `https://httpbin.agrd.dev/enemy`, that should be blocked by filter.

### Case 3: JSON fetch CSP violation (manual)

External JSON fetch from `https://httpbin.agrd.dev/json` violates CSP policy `connect-src 'self'` (Report-Only mode).
Browser generates CSP violation report to `https://httpbin.agrd.dev/post`, that should be allowed by whitelist filter.

## Manual testing

1. Open DevTools Network tab
2. Click test buttons to trigger CSP violations:
   - **Test 1**: Image CSP report → `/enemy` (should be blocked)
   - **Test 2**: JSON CSP report → `/post` (should be allowed)
3. Check Network tab for different outcomes:
   - CSP reports to `/enemy` should be blocked (red in Network tab)
   - CSP reports to `/post` should succeed (green in Network tab. It's okay, it might fail due to CORS)
4. Check filtering log shows blocked CSP report for Test 1 only
5. Check popup shows correct count of blocked resources
