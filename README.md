# testcases.adguard.com on react.js

## How to test:

1. download the project
2. npm run buid
3. npm install --global surge
4. surge --domain=*any_domain*.surge.sh
5. project: *location*/filters-tests/**build**
6. Enjoy your testing at *any_domain*.surge.sh!

#### Test version availabe at react-f18.surge.sh

## Manage tests list:
The main data file is ./src/testsData.js

## Known issues

* **Copy rules** functionality doesn't work in FF and Safari:
`document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.`