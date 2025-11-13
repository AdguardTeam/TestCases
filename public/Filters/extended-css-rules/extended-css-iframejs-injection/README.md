# AdGuard for iOS compatibility

All testcases are supported by AdGuard for iOS since iOS 15 and AdGuard for iOS v4.3.
But there are few notes:

- testcase 1 may fail because extended CSS rules are being injected slower
  than the test assertion, causing a race condition;
  a workaround for the checking has been added, but if it fails,
  check the element styles manually in the browser dev tools;
- testcase 3—srcdoc—should work on iOS in Safari 18.5 or newer
  due to <https://github.com/WebKit/WebKit/pull/41581>.
