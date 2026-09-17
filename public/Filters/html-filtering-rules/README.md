# HTML filtering rules tests

Tests for `:contains()` argument handling in HTML filtering rules (`$$`).

<!-- FIXME: consider adding versions of CoreLibs and Browser Extension where added -->

## Case 1: quoted plain-text argument

Rule: `$$script:contains("(function(g,b,a,c,e,d)")`.

The wrapping double quotes are a transport encoding (added by AGTree
normalization), not part of the matched text: the script element whose text
contains `(function(g,b,a,c,e,d)` must be removed.

## Case 2: quoted regexp-lookalike argument

Rule: `$$script:contains("/html-filtering-quoted-regex-\d+/")`.

After unquoting, the argument keeps regexp semantics: the script whose text
contains `html-filtering-quoted-regex-123` must be removed, while the script
whose text contains the pattern literally (`/html-filtering-quoted-regex-\d+/`)
must survive.

## Case 3: unquoted regexp argument (baseline)

Rule: `$$script:contains(/html-filtering-plain-regex-\d+/)`.

Baseline regexp handling: the script whose text contains
`html-filtering-plain-regex-456` must be removed.
