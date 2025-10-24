# CSP report-uri blocking test

## Test cases

### Case 1: Data URI image loading (automated)

Data URI image should load successfully without CSP violation.

### Case 2: External image blocking (manual)

External image from `https://httpbin.agrd.dev/image/png` should be blocked by CSP policy `img-src 'self' data:`.
Browser generates CSP violation report to `https://httpbin.agrd.dev/post`, that should be blocked.

#### Manual testing

1. Open DevTools Network tab
2. Click "Click to start test" button  
3. Check that CSP report request is blocked in Network tab
4. Check that filtering log shows blocked CSP report request
5. Check that popup shows correct count of blocked resources
