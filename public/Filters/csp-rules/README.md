# $csp rules test

## Case 1
* The inline script creates element `id="csp-test"` with the following text `Inline script works`.
* $csp rule allows scripts only from original source (`$csp=script-src 'self'`).
* basic rule hides element `id="some-element"`.
#### Expecting result: inline script rejected, basic rule works (there is no element `id="csp-test"`; element `id="some-element"` is hidden)

## Case 2
* Requesting for https://adguard.app and http://adguard.app
* first $csp rule allows requests only for `adguard.app`
* second $csp rule allows requests only for `https`
#### Expecting result: all $csp rules work together (only request for https://adguard.app has sent)

## Case 3
* inline style hides `id="case3"`.
* $csp rule allows styles only from original source (`$csp=script-src 'self'`).
* $csp exception rule disables previous $csp rule.
#### Expecting result: $csp exception rule disables $csp rule with matching pattern (element `id="case3"` is hidden)
