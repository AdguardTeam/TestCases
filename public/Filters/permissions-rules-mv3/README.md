# $permissions rules test for MV3

This test suite added specifically for MV3 to check is it correctly
works without `content-type` modifiers, see [AdguardBrowserExtension#2954].

[AdguardBrowserExtension#2954](https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2954)

## Limitations

You can read about limitations in the readme file for `$permissions rules test`.

## Case 1

Checks if `$permissions` rules are applied correctly in the main frame.
It sets the `autoplay` feature policy to `self` and `https://example.com`.

#### Expecting result: applies `autoplay` feature policy to `self` and `https://example.com`

## Case 2

Checks if `$permissions` rules are applied correctly in the subframe.
Technically, did the same as in the first case, but in the subframe.

#### Expecting result: applies `geolocation` feature policy to `self` and `https://example.com`
