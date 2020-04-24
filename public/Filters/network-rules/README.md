# $network rules test 

## Case 1
* Fetching response from `https://unit-test3.adguard.com`
* Applying `$network` rule for `https://unit-test3.adguard.com` IP address - 176.103.130.134
#### Expecting result: `$network` rule blocks fetching url

## Case 2
* Fetching response from `https://unit-test5.adguard.com/test.txt`
* Applying `$network` rule for `https://unit-test5.adguard.com` IP address - 104.20.30.130
* Applying `$network` exception rule to disable previous rule and reject all other rules.
* Blocking rule `||unit-test5.adguard.com/test.txt` is rejected by previous rule.
#### Expecting result: `$network` exception rule disables `$network` rule and reject all other rules.
