# AdGuard Test Cases

## How to build

1. `yarn install`
2. `yarn build`

## Development

### Test on the local machine

* Run `yarn install`

* Add to the `/etc/hosts` next line
    `127.0.0.1 local.testcases.adguard.com`

* Run the local server
    `yarn watch`
It will open `http://local.testcases.adguard.com:3000/` in your browser
and test code changes will be dynamically updated there

> **Please note, that AdGuard for Mac does not filter localhost connections by default!**.

### Test on surge.sh

Available domains can be checked by `surge list`.

If there is not any domain, set up surge first:
https://surge.sh/help/getting-started-with-surge

Then:
```
yarn build
cd build
surge --domain=_your_available_domain_.surge.sh
```

Enjoy your testing at `_your_available_domain_.surge.sh`!

## Manage tests list:

The main data file is `./src/testsData.js`

## Known issues

- **Copy rules** functionality doesn't work in FF and Safari:
  `document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.`
