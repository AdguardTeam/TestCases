# $ping, $xmlhttprequest, $websocket rules test 

### Case 1: $cookie rule blocks request cookie

Cookie `case1` should be set on `api/cookie/case1` request.
Cookie `case1` should be blocked by rule on `api/whoami` request.

### Case 2: $cookie rule blocks response cookie

Cookie `case2` should be blocked by rule on request to `api/cookie/case2`.

### Case 3: $cookie allowlist rule bypass request cookie

Cookie `case3` should be set on `api/cookie/case3` request.
Cookie `case3` should be sent to `api/whoami` endpoint.

### Case 4: $cookie allowlist rule bypass response cookie

Cookie `case4` should be set on `api/cookie/case4` request.
Cookie `case4` should be sent to `api/whoami` endpoint.

