# $network rules test

## Case 1
* Fetching response from `https://94.140.14.14/`
* Applying `$network` rule for `https://94.140.14.14/`
#### Expecting result: `$network` rule blocks fetching url

## Case 2
* Fetching response from `https://94.140.14.15/info.txt`
* Applying `$network` rule for `94.140.14.15`
* Applying `$network` exception rule to disable previous rule and reject all other rules.
* Blocking rule `||94.140.14.15/info.txt` is rejected by previous rule.
#### Expecting result: `$network` exception rule disables `$network` rule and reject all other rules.
