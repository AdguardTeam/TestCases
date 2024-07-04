# $permissions rules test

## Limitations

There are some strict limitations in testing `$permissions` rules:

- `$permissions` rules only affect the main and subframes, so there is no way to debug response headers directly,
  like making a request to the server and checking the response headers.
  The only way to test the rules is to check the behavior of the page, but its also complicated,
  because browsers have different implementations and there are some inconsistencies and issues.
- The most logical way to perform the testing is to utilize certain features, such as obtaining the user's location.
  If the feature is blocked, an error will be thrown.
  The problem is that the error code and message cannot be distinguished between the different reasons for blocking,
  like the `Permissions-Policy` header or the browser settings also can block the feature.
- Firefox simply ignores `Permissions-Policy` header: https://bugzilla.mozilla.org/show_bug.cgi?id=1694922
  (until the bug is fixed, there is no need to test `$permissions` modifier in Firefox).
- As there is no better option, tests are done with the help of the `document.featurePolicy` interface,
  which is only available in Chromium-based browsers.

## Case 1

Checks if `$permissions` rules are applied correctly in the main frame.
It sets the `autoplay` feature policy to `self` and `https://example.com` and checks if the allowlist is correct.
It also tries to set `autoplay` feature policy to `self` and `https://example.net`, but right after that,
adds an allowlist for `https://example.net` and checks if the allowlist is still `self` and `https://example.com`;

#### Expecting result: allowlist for `autoplay` is `self` and `https://example.com`

## Case 2

Checks if `$permissions` rules are applied correctly in the subframe.
Technically, did the same as in the first case, but in the subframe.

#### Expecting result: allowlist for `geolocation` is `self` and `https://example.com`
