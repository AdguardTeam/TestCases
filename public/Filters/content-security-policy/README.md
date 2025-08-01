# CSP and Trusted Types tests

Scriptlet and JS rules can be limited by Content Security Policy (CSP) and
Trusted Types.

In some products there's no way to resolve these issues so they are marked as
incompatible.

In other products there's a way to partially resolve incompatibilities:

* MV3 Web Extension (Chrome-based) is capable of using
  `browser.scripting.executeScript` to inject scripts and thus overcome the
  issues. However, it won't work for JS rules that are not "registered", i.e.
  not bundled within the extension.
* iOS Web Extension (Web Extension) also uses `browser.scripting.executeScript`.
* macOS App Extension has no way to circumvent CSP issues. However, it seems to
  not suffer from Trusted Types limitations at the moment.
