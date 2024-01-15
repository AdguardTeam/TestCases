# AdGuard Test Cases

## How to build

1. `yarn install`
2. `yarn build`

## Development

We use [Cloudflare pages](https://developers.cloudflare.com/pages) for hosting the app.

Local development powered by [Create React App](https://create-react-app.dev) with local proxy middleware, that proxies requests to [httpbin](https://httpbin.agrd.dev/) API.

Static data is stored in the `build` directory, CF pages functions are in the `functions` directory.

### Public static data

While making any [tests data](#tests-data) changes, run `yarn build:static` to rebuild public static data needed for autotesting.

### Test on the local machine

#### Install all dependencies

```shell
yarn install
```

#### Add to the `/etc/hosts` next line

```shell
127.0.0.1 local.testcases.agrd.dev
```

#### Create `cert` directory

if there is no one in the repository root

#### Install [`mkcert`](https://github.com/FiloSottile/mkcert#readme)

```shell
brew install mkcert
```

#### Create locally-trusted development certificate

```shell
mkcert -install
mkcert -key-file cert/key.pem -cert-file cert/cert.pem local.testcases.agrd.dev
```

#### Build static content

```shell
yarn build
```

#### Run the local server

```shell
yarn watch
```

Thr app will be available on `https://local.testcases.agrd.dev:4000/`

> **Please note, that AdGuard for Mac does not filter localhost connections by default!**.

## <a name="tests-data"></a> Manage tests list

The main data file is `./src/testsData.js`

## Known issues

- **Copy rules** functionality doesn't work in FF and Safari:
  `document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.`
