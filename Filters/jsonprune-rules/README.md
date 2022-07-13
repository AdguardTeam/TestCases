# $jsonprune rules tests
Compatible with AdGuard for Windows, macOS and Android with **CoreLibs v1.10**

### Case 1
Remove key "test2" from the response json.

### Case 2
Remove key "test1", but also apply exception rule to disable the previous one.

### Case 3
Remove all occurrences of the keys "one" and "two three" anywhere in the JSON document.

### Case 4
Remove all children of "test_data" that have an "ad_origin" key.

### Case 5
Remove all items that are at nesting level 3 and have a property "Some key" equal to "Some value".
