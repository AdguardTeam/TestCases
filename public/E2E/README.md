# Pages for end-to-end tests

Static pages that the end-to-end tests of AdGuard Browser Extension open as ordinary websites. They are not listed in
the test catalogue: the tests add the rules they need.

- `index.html`, served at `/E2E/`: elements with the `header`, `ads` and `ad-banner` classes and one outbound link.
- `ads.html`, served at `/E2E/ads`: an AdSense-style ad block, a script from `pagead2.googlesyndication.com` and
  an `ins.adsbygoogle` element.
- `detector.html`, served at `/E2E/detector`: shows whether the `DNT` and `Sec-GPC` headers reach an echo service.
  It requests `https://httpbin.org/headers` and falls back to `https://httpbingo.org/headers`.
- `interfere.txt`, served at `/E2E/interfere.txt`: a filter list with one rule, `@@||example.com$document`. A test
  subscribes to it as a custom filter, so the file has no title: the extension lists it by its address.

Tests depend on the element classes, ids and texts of these pages. Check the tests before changing them.
