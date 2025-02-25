# AdGuard Test Cases

## How to build

1. `yarn install`
2. `yarn build`

## Development

We use [Cloudflare pages](https://developers.cloudflare.com/pages) for hosting the app.

Local development powered by [Create React App](https://create-react-app.dev) with local proxy middleware, that proxies requests to [httpbin](https://httpbin.agrd.dev/) API.

Static data is stored in the `build` directory, CF pages functions are in the `functions` directory.

To launch functions in the dev mode run:

```
wrangler pages dev build
```

If you want to update public directory in the watch mode run:

```
yarn build:watch
```

### Public static data

While making any [tests data](#tests-data) changes, run `yarn build:static` to rebuild public static data needed for autotesting.

### <a name="test-local-macos"> Test on the local machine (MacOS)

1. Install dependencies: `yarn install`
2. Add to the `/etc/hosts` next line:
    ```hosts
    127.0.0.1 local.testcases.agrd.dev
    ```
3. Create `cert` directory if there is no one in the repository root: `mkdir cert`
4. [Install `mkcert`](https://github.com/FiloSottile/mkcert#readme)
5. Create locally-trusted development certificate:
   ```shell
   # Install root certificate
   mkcert -install
   # Create certificate for the domain
   mkcert -key-file cert/key.pem -cert-file cert/cert.pem local.testcases.agrd.dev
   ```
6. Build static content: `yarn build`
7. Run the local server: `yarn serve`

The app will be available on `https://local.testcases.agrd.dev:4000/`

> **Please note, that AdGuard for Mac does not filter localhost connections!**.

### Test on the local machine (Windows)

If you are using Windows, you can run the app locally with the following steps:

1. Install dependencies: `yarn install`
2. Add to the `C:\Windows\System32\drivers\etc\hosts` next line:
    ```hosts
    127.0.0.1 local.testcases.agrd.dev
    ```
3. Create `cert` directory if there is no one in the repository root: `mkdir cert`
4. [Install `mkcert`](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#windows) (or you can built it from `mkcert` sources by issuing `go build` command which produces `mkcert.exe` file, but it requires `go` installed)
5. Create locally-trusted development certificate:
   ```shell
   # Install root certificate
   mkcert -install
   # Create certificate for the domain
   mkcert -key-file cert/key.pem -cert-file cert/cert.pem local.testcases.agrd.dev
   ```
6. Build static content: `yarn build`
7. Run the local server: `yarn serve`

> **Note 1:** if you want to uninstall the root certificate, you can use `mkcert -uninstall` command.

> **Note 2:** it is not recommended to run the app on WSL2, because its an OS withing an OS,
> which means two different hosts files, two certificate store, etc.
> Its better to use it on Windows directly.

### Test on surge.sh

Available domains can be checked by `surge list`.

If there is not any domain, set up surge first:
<https://surge.sh/help/getting-started-with-surge>

Then:

```text
yarn build
cd build
surge --domain=<available-domain>.surge.sh
```

<!-- TODO: make sure that surge.sh is present in the filtering rules. AG-40268 -->

Enjoy your testing at `<available-domain>.surge.sh`.

> Testing on surge.sh may be useful, since AdGuard for Mac may not filter localhost connections.
> That's why [testing locally](#test-local-macos) may not be enough.

## <a name="tests-data"></a> Manage tests list

The main data file is `./src/testsData.js`

## Known issues

- **Copy rules** functionality doesn't work in FF and Safari:
  `document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.`
