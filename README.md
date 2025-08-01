# AdGuard Test Cases

## How to build

1. `yarn install`
2. `yarn build`

## Development

We use [Cloudflare pages][cfpages] for hosting the app.

Local development powered by [Create React App][createreactapp] with local proxy middleware, that proxies requests to [httpbin][httpbin] API.

Static data is stored in the `build` directory, CF pages functions are in the `functions` directory.

To launch functions in the dev mode run:

```sh
wrangler pages dev build
```

If you want to update public directory in the watch mode run:

```sh
yarn build:watch
```

[cfpages]: https://developers.cloudflare.com/pages
[createreactapp]: https://create-react-app.dev
[httpbin]: https://httpbin.agrd.dev

### Public static data

While making any [tests data](#manage-tests-list) changes, run
`yarn build:static` to rebuild public static data needed for autotesting.

### Test on the local machine (MacOS)

1. Install dependencies: `yarn install`
1. Add to the `/etc/hosts` next line:

    ```hosts
    127.0.0.1 local.testcases.agrd.dev
    ```

1. Create `cert` directory if there is no one in the repository root:

   ```sh
   mkdir cert
   ```

1. [Install `mkcert`][mkcert]
1. Create locally-trusted development certificate:

   ```sh
   # Install root certificate
   mkcert -install
   # Create certificate for the domain
   mkcert -key-file cert/key.pem -cert-file cert/cert.pem local.testcases.agrd.dev
   ```

1. Build static content: `yarn build`
1. Run the local server: `yarn serve`

The app will be available on `https://local.testcases.agrd.dev:4000/`

> Please note that AdGuard for Mac does not filter localhost connections by
> default.
> It can be enabled manually in `Advanced settings` -> `network.filtering.localhost`.

[mkcert]: https://github.com/FiloSottile/mkcert#readme

### Test on the local machine (Windows)

If you are using Windows, you can run the app locally with the following steps:

1. Install dependencies: `yarn install`
1. Add to the `C:\Windows\System32\drivers\etc\hosts` next line:

    ```hosts
    127.0.0.1 local.testcases.agrd.dev
    ```

1. Create `cert` directory if there is no one in the repository root:

  ```sh
  mkdir cert
  ```

1. [Install `mkcert`][mkcertwin] (or you can built it from `mkcert` sources by
issuing `go build` command which produces `mkcert.exe` file, but it requires `go` installed)
1. Create locally-trusted development certificate:

   ```sh
   # Install root certificate
   mkcert -install
   # Create certificate for the domain
   mkcert -key-file cert/key.pem -cert-file cert/cert.pem local.testcases.agrd.dev
   ```

1. Build static content: `yarn build`
1. Run the local server: `yarn serve`

> **Note 1:** if you want to uninstall the root certificate, you can use
> `mkcert -uninstall` command.
>
> **Note 2:** it is not recommended to run the app on WSL2, because its an OS withing an OS,
> which means two different hosts files, two certificate store, etc.
> Its better to use it on Windows directly.

[mkcertwin]: https://github.com/FiloSottile/mkcert?tab=readme-ov-file#windows

## Manage tests list

The main data file is `./src/testsData.js`

## Known issues

- **Copy rules** functionality doesn't work in FF and Safari:
  `document.execCommand(‘cut’/‘copy’) was denied because it was not called from inside a short running user-generated event handler.`
