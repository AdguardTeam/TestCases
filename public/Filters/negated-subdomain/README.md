# Domain with negated domain rules test

Rule example: `test.com,~sub.test.com###banner`.

For the moment this rule is invalid in AdGuard for Safari.

Because of CORS policy we have to test it in two cases: for domain and for subdomain

### Case 1
`adguard.com,~testcases.adguard.com###app`
The rule should block element on `adguard.com` and shouldn't block it on `testcases.adguard.com`
#### Expecting result:
the rule is invalid in Safari, so it will not work and element will not be blocked on `testcases.adguard.com`,
in other apps rule works fine and test element isn't been blocked.

### Case 2
`testcases.adguard.com,~sub.testcases.adguard.com###case2`
The rule should block element on `testcases.adguard.com` and shouldn't block it on `sub.testcases.adguard.com`
#### Expecting result:
the rule is invalid in Safari, so it will not work and element will not be blocked on `testcases.adguard.com`,
in other apps rule works fine and test element isn't been blocked.

For testing on `surge.sh` please use domain `ndmn.surge.sh`
