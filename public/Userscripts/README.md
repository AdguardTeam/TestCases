# BREAKING CHANGE

Previously, for CoreLibs v1.19 and earlier,
userscripts without `@connect` directives allowed all domains by default.

But for CoreLibs v1.20 and later userscripts **MUST** have `@connect *` set explicitly
to maintain the previous permissive behavior.

See [CoreLibs#1985](https://github.com/AdguardTeam/CoreLibs/issues/1985).
