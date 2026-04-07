# Development Guide

This guide explains how to set up the development environment, run the project
locally, and contribute code to AdGuard Test Cases.

## Prerequisites

Install the following tools before starting:

| Tool            | Version | Installation                                         |
| --------------- | ------- | ---------------------------------------------------- |
| [Node.js][node] | ≥ 22    | `brew install node` or [download][node]              |
| [Yarn][yarn]    | 1.x     | `npm install -g yarn`                                |
| [mkcert]        | latest  | `brew install mkcert` or see [mkcert README][mkcert] |
| [Wrangler] (\*) | ≥ 3.72  | Installed as a dev dependency via `yarn install`     |

> (\*) Wrangler is only needed when working with Cloudflare Pages Functions
> locally. It is included in `devDependencies` so no global install is required.

[node]: https://nodejs.org/
[yarn]: https://classic.yarnpkg.com/
[Wrangler]: https://developers.cloudflare.com/workers/wrangler/install-and-update/

## Getting Started

### 1. Clone the repository

```sh
git clone <repository-url>
cd filters-tests
```

### 2. Install dependencies

```sh
yarn install
```

> All dependency versions in [package.json](package.json) are pinned to exact
> versions (no `^` or `~` ranges). This prevents unintentional upgrades and
> reduces the risk of installing a compromised transitive release.
> When updating or installing a new version of a dependency, use the pinned version.

### 3. Configure the local domain

The dev server binds to `local.testcases.agrd.dev` with HTTPS. Add the
following line to your hosts file:

**macOS / Linux** — `/etc/hosts`:

```text
127.0.0.1 local.testcases.agrd.dev
```

**Windows** — `C:\Windows\System32\drivers\etc\hosts`:

```text
127.0.0.1 local.testcases.agrd.dev
```

### 4. Generate SSL certificates

Create the `cert/` directory (if it does not exist) and generate a locally
trusted certificate with [mkcert]:

```sh
mkdir -p cert

# Install the local CA (one-time)
mkcert -install

# Generate cert for the dev domain
mkcert -key-file cert/key.pem -cert-file cert/cert.pem local.testcases.agrd.dev
```

These paths are referenced in [.env.development](.env.development):

```text
HOST=local.testcases.agrd.dev
PORT=4000
HTTPS=true
SSL_KEY_FILE=cert/key.pem
SSL_CRT_FILE=cert/cert.pem
```

### 5. Build and run

```sh
# Build the static content
yarn build

# Start the dev server
yarn serve
```

The app will be available at `https://local.testcases.agrd.dev:4000/`.

## Development Workflow

### Available commands

All commands use Yarn 1.x. The full list is defined in
[package.json](package.json).

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `yarn serve`        | Start the local dev server (CRA, HTTPS, port 4000) |
| `yarn build`        | Production build (outputs to `build/`)             |
| `yarn build:static` | Regenerate `public/data.json` from `testsData.js`  |
| `yarn build:watch`  | Rebuild on file changes (watch mode)               |
| `yarn test`         | Run Jest unit tests                                |
| `yarn lint`         | Run all linters (`lint:code` + `lint:md`)          |
| `yarn lint:code`    | Run ESLint on `.js` and `.ts` files                |
| `yarn lint:md`      | Run markdownlint on Markdown files                 |
| `yarn stylelint`    | Run Stylelint on SCSS files in `src/styles/`       |

### Running Cloudflare Pages Functions locally

Cloudflare Pages Functions (in `functions/`) handle CSP headers and the httpbin
proxy. To test them locally, build first and then start the Wrangler dev server:

```sh
yarn build
npx wrangler pages dev build
```

During normal `yarn serve` development, the httpbin proxy is handled by the CRA
proxy middleware in [src/setupProxy.js](src/setupProxy.js) instead.

### Linting

The project uses three linters:

- **ESLint** — JavaScript and TypeScript (Airbnb + TypeScript config).
  Config: [.eslintrc.js](.eslintrc.js).
- **Stylelint** — SCSS files. Config: `stylelint` key in
  [package.json](package.json).
- **markdownlint** — Markdown files. Config:
  [.markdownlint.json](.markdownlint.json).

Run all linters at once:

```sh
yarn lint
yarn stylelint
```

### Testing

Tests use Jest via Create React App. Test files are co-located with source files
(e.g., [src/App.test.js](src/App.test.js) next to [src/App.js](src/App.js)).

```sh
# Interactive watch mode
yarn test

# Single run (used in CI and pre-commit hook)
cross-env CI=true react-scripts test
```

### Pre-commit hook

A Husky pre-commit hook runs automatically on every commit:

```text
yarn stylelint && yarn lint && cross-env CI=true react-scripts test
```

All checks must pass before the commit is accepted.

## Common Tasks

### Adding a new filter test case

1. Create a new directory under `public/Filters/` containing the test HTML page
   and rule files.
2. Add a corresponding entry in [src/testsData.js](src/testsData.js) with
   `id`, `title`, `link`, `rulesUrl`, and `compatibility` fields. Use constants
   from [src/constants.js](src/constants.js) (`PRODUCT_TYPES`, `FIREFOX_BUILDS`)
   for product compatibility — never use raw strings.
3. Regenerate the public static data:

    ```sh
    yarn build:static
    ```

4. Verify the build succeeds:

    ```sh
    yarn build
    ```

### Updating test metadata

When modifying [src/testsData.js](src/testsData.js) or the helper functions it
depends on, always regenerate `public/data.json`:

```sh
yarn build:static
```

### Working with Cloudflare Functions

Functions in `functions/` are TypeScript and use the Cloudflare Workers runtime
API. HTML generation uses Mustache templates (in `templates.ts` files).

To iterate on functions locally:

```sh
yarn build
npx wrangler pages dev build
```

## Troubleshooting

### macOS: AdGuard for Mac does not filter localhost

By default, AdGuard for Mac does not filter localhost connections. Enable it
manually in **Advanced Settings** → `network.filtering.localhost`.

### Windows: avoid running under WSL 2

Running the app on WSL 2 is not recommended because WSL 2 has separate hosts
files and certificate stores from the Windows host. Use Windows directly
instead.

### Removing the local root certificate

If you need to uninstall the mkcert root CA:

```sh
mkcert -uninstall
```

### Copy rules button does not work in Firefox / Safari

`document.execCommand('cut'/'copy')` is blocked because it is not called from
inside a short-running user-generated event handler. This is a known browser
limitation.

## Additional Resources

- [README.md](README.md) — project overview and usage
- [AGENTS.md](AGENTS.md) — LLM agent guidance, code guidelines, and project
  architecture
- [AdGuard JavaScript Guidelines][js-guidelines] — coding style reference

[js-guidelines]: https://github.com/AdguardTeam/CodeGuidelines/blob/master/JavaScript/Javascript.md
[mkcert]: https://github.com/FiloSottile/mkcert#readme
