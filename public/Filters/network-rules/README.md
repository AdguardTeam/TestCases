# $network rules test

## Case 1
* Fetching response from `https://94.140.14.14/`
* Applying `$network` rule for `https://94.140.14.14/`
#### Expecting result: `$network` rule blocks fetching url

## Case 2
* Fetching response from `https://8.8.8.8/resolve?name=example.com&type=A`
* Applying `$network` rule for `8.8.8.8`
* Applying `$network` exception rule to disable previous rule and reject all other rules.
* Blocking rule `||8.8.8.8/resolve` is rejected by previous rule.
#### Expecting result: `$network` exception rule disables `$network` rule and reject all other rules.
