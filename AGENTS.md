# AGENTS.md

## Project Overview

AdGuard Test Cases is a React web application that hosts manual and automated
test cases for AdGuard ad-blocking products. Each test case verifies a specific
filter rule type (element hiding, CSP, redirects, scriptlets, etc.) across
multiple AdGuard products (Windows, macOS, Android, browser extensions, Safari,
iOS). The app is deployed to Cloudflare Pages at `testcases.agrd.dev`.

## Technical Context

| Field                | Value                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| Language / Version   | JavaScript (ES2020+) / TypeScript for CF functions; Node ≥ 22         |
| Framework            | React 18 via Create React App                                         |
| Primary Dependencies | react, react-dom, react-markdown, sass, http-proxy-middleware         |
| Storage              | None — static files only                                              |
| Testing              | Jest (via `react-scripts test`)                                       |
| Target Platform      | Cloudflare Pages (static site + CF Pages Functions)                   |
| Project Type         | Single web application                                                |
| Linting              | ESLint 8 (airbnb + airbnb-typescript), Stylelint (SCSS), markdownlint |
| CI                   | Bamboo (`bamboo-specs/`)                                              |
| Performance Goals    | N/A — lightweight test harness                                        |
| Constraints          | Pre-commit hook enforces lint + stylelint + tests via Husky           |

## Project Structure

```text
├── package.json                  # Dependencies, scripts, Husky config
├── .eslintrc.js                  # ESLint config (Airbnb + TS)
├── tsconfig.json                 # TypeScript config (targets CF functions & src)
├── tsconfig.eslint.json          # TS config extended for linting
├── babel.config.js               # Babel presets (react-app)
├── buildStaticData.js            # Generates public/data.json from testsData.js
├── bamboo-specs/                 # Bamboo CI pipeline definitions
├── cert/                         # Local dev SSL certificates (mkcert)
├── functions/                    # Cloudflare Pages Functions (edge workers)
│   ├── csp/                      #   CSP header injection for test pages
│   ├── httpbin/                  #   Proxy to httpbin.agrd.dev
│   └── userscripts-csp/          #   CSP for userscript test pages
├── public/                       # Static assets served by CF Pages
│   ├── index.html                #   App shell
│   ├── Filters/                  #   Filter test cases (~38 rule-type dirs)
│   │   ├── element-hiding-rules/ #     e.g. element hiding test
│   │   ├── scriptlet-rules/      #     e.g. scriptlet injection test
│   │   └── ...                   #     (and 35 more rule-type directories)
│   ├── PopupBlocker/             #   Popup blocker test pages
│   ├── Userscripts/              #   Userscript API & SPA test pages
│   └── Web/                      #   Misc web tests (ETag, load)
└── src/                          # React app source
    ├── index.js                  #   App entry point
    ├── App.js                    #   Root component
    ├── testsData.js              #   Central test definitions (IDs, links, compat)
    ├── constants.js              #   Product types, product groups
    ├── components/               #   React UI components
    ├── helpers/                  #   Utility functions (clipboard, file fetch, compat parsing)
    └── styles/                   #   SCSS stylesheets
```

## Build And Test Commands

All commands use **Yarn 1.x**.

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `yarn install`      | Install dependencies                              |
| `yarn build`        | Production build (outputs to `build/`)            |
| `yarn serve`        | Start local dev server (CRA, HTTPS on port 4000)  |
| `yarn build:static` | Regenerate `public/data.json` from `testsData.js` |
| `yarn build:watch`  | Rebuild on file changes (watch mode)              |
| `yarn test`         | Run Jest unit tests (via react-scripts)           |
| `yarn lint`         | Run all linters (`lint:code` + `lint:md`)         |
| `yarn lint:code`    | Run ESLint on `.js` and `.ts` files               |
| `yarn lint:md`      | Run markdownlint on `.md` files                   |
| `yarn stylelint`    | Run Stylelint on SCSS files in `src/styles/`      |
| `yarn deploy`       | Deploy to Cloudflare Pages via Wrangler           |

For local development with Cloudflare Functions:

```sh
wrangler pages dev build
```

## Contribution Instructions

After completing any code change, verify the following:

1. Run `yarn lint` and fix all linter errors before committing.
2. Run `yarn stylelint` and fix all Stylelint errors if SCSS files were changed.
3. Run `yarn lint:md` and fix all markdownlint errors if any Markdown files were changed.
4. Run `yarn test` (or `cross-env CI=true react-scripts test`) and ensure all
   tests pass.
5. If `testsData.js` or helper functions it depends on were modified, run
   `yarn build:static` to regenerate `public/data.json`.
6. Run `yarn build` and verify it completes without errors.
7. Verify that new or changed code follows the Code Guidelines section below.
8. When adding a new filter test case:
    - Create a new directory under `public/Filters/` with the test HTML and rule
      files.
    - Add a corresponding entry in `src/testsData.js` with proper `id`, `title`,
      `link`, `rulesUrl`, and `compatibility` data.
    - Run `yarn build:static` after updating `testsData.js`.

## Code Guidelines

### Architecture

- The React app in `src/` is a thin UI that renders the test list defined in
  `testsData.js`. Each test case lives as a standalone HTML page with
  accompanying filter rules under `public/Filters/`, `public/Userscripts/`, or
  `public/PopupBlocker/`.
- Cloudflare Pages Functions in `functions/` handle server-side concerns (CSP
  headers, httpbin proxy). They are TypeScript and use the Cloudflare Workers
  runtime API.
- `testsData.js` is the single source of truth for all test metadata.
  `buildStaticData.js` transforms it into `public/data.json` for external
  consumption.

### Code Quality

- Follow the [AdGuard JavaScript Guidelines][js-guidelines].
- **Style**: Airbnb JavaScript/TypeScript style guide; see `.eslintrc.js`
  for the complete rule set.
- **SCSS**: Follows `stylelint-config-recommended-scss`.
- Do not duplicate tool configurations in this file; refer to the source
  config instead (`.eslintrc.js`, `stylelint` key in `package.json`,
  `.markdownlint*`).

[js-guidelines]: https://github.com/AdguardTeam/CodeGuidelines/blob/master/JavaScript/Javascript.md

### Testing

- Tests use Jest via `react-scripts test`.
- When modifying React components in `src/`, update or add corresponding tests.
- Test files are co-located with source files (e.g., `App.test.js` next to
  `App.js`).

### Test Case Compatibility

- Each filter test case in `src/testsData.js` declares a `compatibility` field
  that specifies which AdGuard products it targets (e.g., CoreLibs-only tests
  exclude browser extensions, Safari, and iOS).
- When reviewing test case code, **always check the `compatibility` field** in
  `testsData.js` to understand the target products. Do not suggest helpers,
  workarounds, or patterns that only apply to products excluded by this field.
  For example: do not recommend Safari/iOS-specific timing helpers for a test
  that targets only CoreLibs products (Windows, macOS, Android).

### Other

- Product compatibility in `testsData.js` uses typed constants from
  `constants.js` (`PRODUCT_TYPES`, `FIREFOX_BUILDS`). Always reference these
  constants — never use raw string product names.
- Cloudflare Functions use Mustache templates (in `templates.ts` files) for HTML
  generation.
