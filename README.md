# AdGuard Test Cases

## How to build

1. `yarn install`
2. `yarn run build`

## How to develop:

1. `yarn run build`
2. `yarn install --global surge`
3. `surge --domain=_any_domain_.surge.sh`
4. project: `_location_/filters-tests/**build**`
5. Enjoy your testing at `_any_domain_.surge.sh`!

#### Test version availabe at react-f18.surge.sh

## Manage tests list:

The main data file is `./src/testsData.js`

## Known issues

- **Copy rules** functionality doesn't work in FF and Safari:
  `document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.`
