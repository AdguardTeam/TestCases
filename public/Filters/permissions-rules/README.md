# $tpermissions rules tests
Compatible with AdGuard products, **that run CoreLibs v1.12 or later**, and AdGuard Browser extensions, **that run tsurlfilter vX.X.X or later** FIXME

### Case 1
Rules with `$permissions` modifier set Permissions Policy header with specified directive:
- rule with multiple modifier values set `PP` with multiple directives.
- for multiple rules `PP` headers are set separately and directives are not squashed.
