# $replace rule vs $elemhide exceptions test

##Case 1
* basic rule hides element subscription link.
* $elemhide exception rule (disables basic rules)
* $replace rule to change subscription link text to nothing.
#### Expecting result: subscription link text is empty.