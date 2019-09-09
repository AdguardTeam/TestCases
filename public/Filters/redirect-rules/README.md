# $redirect rules test 

## Case 1 - CSS redirect
* `test-files/redirect-test.css` sets width of `#case1` to `500px`
* $redirect rule redirects `redirect-test.css` to `noopcss`
#### Expecting result: $redirect rulle works (`width` of `case1` is not `500px`)

## Case 2 - JS redirect
* `test-files/redirect-test.js` sets innerText of `#case2` to `JS script was here`
* $redirect rule redirects `redirect-test.js` to `noopjs`
#### Expecting result: $redirect rulle works (`innerText` of `case2` is not `JS script was here`)