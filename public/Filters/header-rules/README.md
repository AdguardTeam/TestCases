# $header rules test

## Compatibility

MV3 support starts from v5.3

## Test cases

### Case 1: Compatibility with content type modifiers ($script, $style, $subdocument, etc)

In this test case we try to inject different content types and check if the $header rule is applied correctly:
- Script with `case1` header present - should be blocked
- Script without `case1` header - should be allowed
- Style with `case1` header present - should be allowed
- Style without `case1` header - should be allowed

### Case 2: Compatibility with $third-party modifier

In this test case we try to send a request to different domains which appends the `case2` header to the response:
- Third-party request to `httpbin.agrd.workers.dev` with `case2` header present - should be blocked
- Third-party request to `httpbin.agrd.workers.dev` without `case2` header - should be allowed
- First-party request to `self` with `case2` header present - should be allowed
- First-party request to `self` without `case2` header - should be allowed

Where `self` is the domain of the test page (`testcases.agrd.dev` or `*.pages.dev`).

#### WARNING

You should test only in `testcases.agrd.dev` or `*.pages.dev`, otherwise the test will fail.

### Case 3: Compatibility with $domain modifier

In this test case we try to send a request to different domains which appends the `case3` header to the response:
- Request to `httpbin.agrd.workers.dev` with `case3` header present - should be blocked
- Request to `httpbin.agrd.workers.dev` without `case3` header - should be allowed
- Request to `self` with `case3` header present - should be allowed
- Request to `self` without `case3` header - should be allowed

Where `self` is the domain of the test page (`testcases.agrd.dev` or `*.pages.dev`).

#### WARNING

You should test only in `testcases.agrd.dev` or `*.pages.dev`, otherwise the test will fail.

### Case 4: Compatibility with $match-case modifier

In this test case we try to send a request to different routes which appends the `case4` header to the response:
- Request to `/TestHeader` with `case4` header present - should be blocked
- Request to `/TestHeader` without `case4` header - should be allowed
- Request to `/testheader` with `case4` header present - should be allowed
- Request to `/testheader` without `case4` header - should be allowed
