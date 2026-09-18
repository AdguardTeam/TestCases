# Compatibility notes

## Case 6

Case 6 is supported by **CoreLibs v1.18 or later** and **AdGuard Browser Extension for Firefox v5.2 or later**.

## Case 7

Case 7 is supported by **CoreLibs v1.13 or later** and **AdGuard Browser Extension for Firefox v5.3 or later**.

## Cases 8, 9, 10

Cases 8, 9, 10 are supported by **AdGuard Browser Extension for Firefox v5.3 or later**.

## Case 11

Case 11 verifies the unbalanced plain-text `:contains()` argument semantics
(AG-43979) with CoreLibs parity: the raw text between the parentheses of
the pseudo-class is matched as-is, no quoting is inserted or stripped.

Supported by **CoreLibs**. Not supported yet by **AdGuard Browser
Extension for Firefox** — support will be added in v5.6.
