# $urltransform rules test

## Case 1
* Try fetching a resource from an invalid URL.
* A `$urltransform` rule should transform an invalid URL into a valid one.
* Expect fetch success.

## Case 2
* Try POSTing to an invalid URL.
* A `$urltransform` rule should transform an invalid URL into a valid one.
* A `$urltransform` rules should NOT break the POST request by redirecting it.
* Expect POST success.

## Case 3
* Try fetching a resource from an invalid URL.
* A `$urltransform` rule should transform an invalid URL into a valid one, changing the origin.
* Expect fetch success.

## Case 4
* Try POSTing to an invalid URL.
* A `$urltransform` rule that changes the origin should not be applied to a POST request.
* Expect fetch failure.
