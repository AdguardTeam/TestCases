# $replace rule vs $content exception test

##Case 1
* content rule ($$) hides element `id="case1-block2"`.
* $replace rule applyed to element `id="case1-block1"`.
* $content exception rule disables all other rules applied before.
#### Expecting result: $replace rule is disabled and element `id="case1-block2"` is visible.