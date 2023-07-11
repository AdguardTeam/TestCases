# `$header` rules tests
Compatible with AdGuard products, **that run CoreLibs v1.11 or later**, and AdGuard Browser extensions, **that run tsurlfilter X.X.X or later**

### Case 1
Rule with `$header` modifier only blocks request with which it matches by a specified response header.
Header names are matched case-insensitively.
Unmatched request does not get blocked.
##### Case 1.1
Rule is being blocked by matching header name only.
Request which doesn't get header with matching name in response is not blocked.
##### Case 1.2
Rule is being blocked by matching header name and header value.
Request which doesn't get header with matching name and value in response is not blocked.
##### Case 1.3
Rule is being blocked by matching header name and header value.
Value is being matched via regexp.
Request which doesn't get header with matching name and value in response is not blocked.

### Case 2
Rule with `$header` modifier only blocks request with which it matches by a specified response header and it's value.
Unmatched request does not get blocked.

### Case 3
Allowlist rule unblocks a request that would be blocked by a header rule otherwise, if their `$header` modifier values are the same.

### Case 4
Blocking rule with `$header` and $important won't be cancelled out by a matching allowlist rule.

### Case 5
Allowlist `$header` rule that matches request by header value won't cancel out blocking rule without `$header` modifier.

### Case 6
Allowlist `$header` rule that matches request by header value won't cancel out blocking rule with different value of `$header` modifier.

### Case 7
Document-level allowlist rule cancels out all blocking `$header` rules.

### Case 8
`$header` is compatible with `$removeheader` modifier when targeting response headers.
##### Case 8.1
`$header,removeheader` rule will remove request's response header if matched by $header value.
##### Case 8.2
`$header,removeheader` rule will be cancelled out by `$removeheader` allowlist rule.
##### Case 8.2
`$header` allowlist rule won't cancel out `$header,removeheader` blocking rule, even if `$header` modifier values are the same.