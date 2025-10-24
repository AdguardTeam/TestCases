# CSP report-uri blocking test

## Test cases

### Case 1: Data URI image loading (automated)

Data URI image should load successfully without CSP violation.

### Case 2: CSP violation and report blocking (automated)

External image from `https://httpbin.agrd.dev/image/png` should be blocked by CSP policy `img-src 'self' data:`.
Browser generates CSP violation report to `https://httpbin.agrd.dev/post`, that should be blocked by AdGuard filter.