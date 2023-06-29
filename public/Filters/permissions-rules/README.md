# $tpermissions rules tests
Compatible with AdGuard products, **that run CoreLibs v1.12 or later**, and AdGuard Browser extensions, **that run tsurlfilter vX.X.X or later** FIXME

### Case 1
Rule with `$permissions` modifier sets Permissions Policy header with specified directive.
### Case 2
Rule with `$permissions` modifier sets Permissions Policy header with multiple directives.
### Case 3
All rules with `$permissions` modifier set their Permissions Policy headers directives.
Headers are set separately and directives are not squashed.
### Case 4
Single allowlist rule with `$permissions` modifier and no specified value disables all the `$permissions` rules matching the same pattern.