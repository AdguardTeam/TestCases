# Test case: $CSP global exception (no arguments).
* The inline script creates element `id="csp-global-exception"` with the following text `Inline script works`.
* $csp rule allows scripts only from original source (`$csp=script-src 'self'`).
* $csp global exception rule (no arguments) disables previous $csp rule.
#### Expecting result: $csp global exception (no arguments) disables $csp rule (inline script works)