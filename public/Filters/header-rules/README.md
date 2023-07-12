# `$header` rules tests
Compatible with AdGuard products, **that run CoreLibs v1.11 or later**, and AdGuard Browser extensions, **that run tsurlfilter X.X.X or later**

### Case 1
Rule with `$header` modifier only blocks request with which it matches by a specified response header.
Header names are matched case-insensitively.
Unmatched request does not get blocked.
##### Case 1.1
Request is being matched header name only.
Request which doesn't get header with matching name in response is not blocked.
##### Case 1.2
Request is being matched by header name and header value.
Request which doesn't get header with matching name and value in response is not blocked.
##### Case 1.3
Request is being matched by header name and header value.
Value is being matched via regexp.
Request which doesn't get header with matching name and value in response is not blocked.

### Case 2
Rule with `$header` modifier only blocks request with which it matches by a specified response header and it's value.
Unmatched request does not get blocked.

### Case 3
Basic allowlist rule cancels out blocking rule with `$header` modifier.

### Case 4
Allowlist rule with `$header` modifier cancels out blocking rule with `$header` modifier, if they match the same request.
##### Case 4.1
Allowlist and blocking rules have same `$header` modifier values, thus request is not blocked.
##### Case 4.2
Allowlist $header rule doesn't unblock the request as it's modifier value is not the same as in blocking rule.

### Case 5
Blocking rule with `$header` and $important won't be cancelled out by a matching allowlist rule.

### Case 6
Allowlist `$header` rule that matches request by header value won't cancel out blocking rule without `$header` modifier.

### Case 7
Allowlist `$header` rule that matches request by header value won't cancel out blocking rule with different value of `$header` modifier.

### Case 8
Document-level allowlist rule cancels out all blocking `$header` rules.

### Case 9
`$header` is compatible with `$removeheader` modifier when targeting response headers.
##### Case 9.1
`$header,$removeheader` rule will remove request's response header if matched by `$header` value.
##### Case 9.2
`$header,$removeheader` rule won't apply if $header doesn't match.
##### Case 9.3
`$header,$removeheader` rule will be cancelled out by `$removeheader` allowlist rule.
##### Case 9.4
`$header` allowlist rule won't cancel out `$header,$removeheader` blocking rule, even if `$header` modifier values are the same.
