# $important vs $urlblock test

## Case 1

There are two rules:
- blocking rule for `adg3.png` with `$important` modifier;
- `$urlblock` exception rule.

### Expecting result

`$urlblock` exception **should not** disable `$important`, `adg3.png` is blocked.

It happens because `$important` rule has higher priority than `$urlblock` exception rule
due to the new [rules priority policy][kb-rule-priorities].

### Compatibility

New rules priority policy is already implemented in AdGuard Browser Extensions running **tsurlfilter v2.1.0**
and shall be implemented in AdGuard for Windows, Mac, Android in **CoreLibs v1.13**.


[kb-rule-priorities]: https://adguard.com/kb/general/ad-filtering/create-own-filters/#rule-priorities
