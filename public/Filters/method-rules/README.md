# $method rules tests
Compatible with AdGuard products, **that run CoreLibs v1.12 or later**, and AdGuard Browser extensions, **that run tsurlfilter 2.1.1 or later**

### Case 1
Rule with `$method` modifier blocks requests with `get` method.
Rule does not block requests with other methods.
### Case 2
Allowlist rule with `$method` modifier only unblocks requests with `options` method.
Other requests are not affected.
### Case 3
Rule with `$method` modifier and inverted `~options` value only blocks requests with methods other than `options`.
Rule does not block requests with other methods.
### Case 4
Allowlist rule with `$method` modifier and inverted `~get` value only unblocks requests whose method is not `get`.
Requests with `get` method will still be blocked.
