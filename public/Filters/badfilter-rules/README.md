# $badfilter rules test 

## Case 1
* First rule blocks request for `dg1.png`.
* Applied second rule with `$badfilter` modifier.
#### Expecting result: $badfilter rule should disable the rule to which it refers (`adg1.png` is displayed)

## Case 2
* First rule blocks request for `dg2.png`.
* Second rule is exception to disable the first rule.
* Applied exception rule with `$badfilter` modifier.
#### Expecting result: $badfilter exception rule should disable the exception rule to which it refers (`adg2.png` is hidden)

## Case 3
* First rule with `$domain` modifier blocks request for `dg3.png`.
* Applied rule with `$badfilter` and `$domain` modifier matching the same pattern.
#### Expecting result: $badfilter rule should disable the rule with $domain modifier to which it refers. (`adg3.png` is displayed)
