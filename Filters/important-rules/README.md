# $important rules test 

## Case 1
* First rule with $important modifier blocks request for `adg1.png`.
* Second exception rule allows request for `adg1.png`.
#### Expecting result: $important rule should have priority over exception rule (`adg1.png` is hidden)

## Case 2
* First rule with $important modifier blocks request for `adg2.png`.
* Second exception rule with $important modifier allows request for `adg2.png`.
#### Expecting result: $important exception rule should have priority over $important rule (`adg2.png` is displayed)
