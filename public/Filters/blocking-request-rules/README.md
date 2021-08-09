# $ping, $xmlhttprequest, $websocket rules test 

### Case 1: Test $ping modifier
Rule with `$ping` modifier should block `navigator.sendBeacon()` request.
#### WARNING!
Test is not fully automatic. To be 100% sure you have to check in DevTools console the request to `https://adguard.com` is blocked by the client.

### Case 2: Test $xmlhttprequest modifier
Rule with `$xmlhttprequest` modifier should block xmlhttprequest request.
#### Please note
Corelibs often can't accurately detect this type of request and sometimes detects it as `other` or `script`.
Will be fixed soon [GitHub #1469](https://github.com/AdguardTeam/CoreLibs/issues/1469)

### Case 3: Test $websocket modifier
Rule with `$websocket` modifier should block websocket request.
