# $replace rule vs $generichide exception test

##Case 1
* Generic rule hides element `id="case1-block1"`.
* $generichide exception disables all generic cosmetic rules.
* $replace rule applyed for `id="case1-block1"`.
#### Expecting result: $generichide exception doesn't block $replace rule (text in element `id="case1-block1"` is replaced)