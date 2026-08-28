## $redirect resources security test

1. Makes request to some resource.
2. It's redirected to web-accessible resource by $redirect-rule.
3. Gets security key from the first request and makes second request to web-accessible resource using the same key.
   #### Expected behaviour: web-accessible resource request with the same security key should fail.
4. Makes third request to the same web-accessible resource, but without any security key.
   #### Expected behaviour: web-accessible resource request without security key should fail.
