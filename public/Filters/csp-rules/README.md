# $csp rules test 

## Case 1
* The inline script creates element `id="csp-test"` with the following text `Inline script works`.
* $csp rule allows scripts only from original source (`$csp=script-src 'self'`).
* basic rule hides element `id="some-element"`.
#### Expecting result: inline script rejected, basic rule works (there is no element `id="some-element"`; element `id="csp-test"` is hidden)

## Case 2
* Requesting for three images (https and http).
* first $csp rule allows images only from `https` (pic1 and pic3).
* second $csp rule allows images only from `scp001.surge.sh` (pic1 and pic2)
#### Expecting result: all $csp rules work together (only pic1 is visible)

## Case 3
* inline style hides `id="case3"`.
* $csp rule allows styles only from original source (`$csp=script-src 'self'`).
* $csp exception rule disables previous $csp rule.
#### Expecting result: $csp exception rule disables $csp rule with matching pattern (element `id="case3"` is hidden)