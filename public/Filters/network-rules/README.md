# $network rules test 

## Case 1
* Fetching responce from `https://unit-test3.adguard.com`
* Applying `$network` rule for `https://unit-test3.adguard.com` IP address 
#### Expecting result: `$network` rule blocks fetching url

## Case 2
* Fetching responce from `https://unit-test4.adguard.com`
* Applying `$network` rule for `https://unit-test4.adguard.com` IP address 
* Applying `$network` exception rule to disable previous rule and reject all other rules.
* Applying `$replace` rule wish is rejected by previous rule.
#### Expecting result: `$network` exception rule disables `$network` rule and reject all other rules.