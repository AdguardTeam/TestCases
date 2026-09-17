# Compatibility notes

## Case 6

Case 6 is supported by **CoreLibs v1.18 or later** and **AdGuard Browser Extension for Firefox v5.2 or later**.

## Case 7

Case 7 is supported by **CoreLibs v1.13 or later** and **AdGuard Browser Extension for Firefox v5.3 or later**.

## Cases 8, 9, 10

Cases 8, 9, 10 are supported by **AdGuard Browser Extension for Firefox v5.3 or later**.

## Cases 11, 12

Cases 11 and 12 verify quoted `:contains()` argument semantics (AG-43979):
wrapping quotes must be stripped before matching, and a quoted
regexp-lookalike keeps regexp semantics after unquoting. Supported by
**AdGuard Browser Extension for Firefox** once the AG-43979 chain
(agtree + tsurlfilter) is released; CoreLibs behavior is verified by the
core-libs instrumented test run. Case 13 is the unquoted-regexp baseline.
