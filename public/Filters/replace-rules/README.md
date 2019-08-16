# $replace rules tests:

* ### Case 1
Requested for file `test-files/case1-text-response.txt` and applied $replace rule (`Adguard` replaced to `Test passed`)

* ### Case 2
Requested for file (more then 3Mb) `test-files/case2-response-over-3mb.txt` and applied $replace rule (try to replace `Adguard` to `Test passed`) but $replace rule doesn't applied for response more then 3Mb.

* ### Case 3
Requested for file `test-files/case3-using-with-other-rules.txt` and applied two rules: with and without $replace modifier.

* ### Case 4
Requested for file `test-files/case4-multiple-replace-rules.txt` and applied two $replace rules (they must apllied alphabetically)

* ### Case 5
Requested for file `test-files/case5-disabling-replace-rule.txt` and applied two $replace rules and exception $replace rule.

* ### Case 6
Requested for file `test-files/case6-disabling-multiple-replace-rules.txt` and applied two $replace rules and exception $replace rule with pattern matching the second $replace rule (case from KB: Multiple $replace rules example)

* ### Case 7
Requested for script `test-files/case7-content-type-modifier.js` and applied $replace rule and rule with $script content type modifier
