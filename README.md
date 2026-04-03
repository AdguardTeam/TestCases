# AdGuard Test Cases

A web application that hosts manual and automated test cases for
[AdGuard] ad-blocking products. Each test case verifies a specific
filter rule type — element hiding, CSP, redirects, scriptlets, and others —
across multiple AdGuard products.

The app is deployed at **<https://testcases.agrd.dev>**.

[AdGuard]: https://adguard.com/

## What it does

AdGuard Test Cases provides a searchable catalogue of filter-rule tests.
QA engineers and developers use it to verify that AdGuard products correctly
apply individual rule types. The app covers:

- **Filter rules** — element hiding, CSS rules, extended CSS, scriptlets,
  redirects, blocking requests, CSP rules, cookie rules, header rules,
  replace rules, removeparam, removeheader, and more (38 rule categories).
- **Popup blocker** — tests for the AdGuard popup blocker component.
- **Userscripts** — GM API v4 tests, SPA navigation tests, and grant-none
  scenarios.

## Key concepts

- **Test case** — a standalone HTML page paired with a filter-rule file.
  Each test case targets one specific rule type and contains numbered
  sub-cases that exercise different aspects of that rule.
- **Compatibility** — every test case declares which AdGuard products
  support it (Windows, macOS, Android, browser extensions MV2/MV3, Safari,
  iOS, Content Blocker). Some test cases list partial exceptions where
  individual sub-cases are unsupported on certain products.
- **Filter subscription** — clicking "Subscribe" on a test case installs
  its rules into the user's AdGuard product, allowing immediate
  verification.

## Access

Open **<https://testcases.agrd.dev>** in any modern browser. No
authentication is required.

### Supported browsers

The app targets browsers listed in the `browserslist` configuration:

- Last 1 Chrome version
- Last 1 Firefox version
- Last 1 Safari version

## Quick start

1. Open <https://testcases.agrd.dev>.
2. Optionally filter by **product** using the dropdown
   (e.g., "Windows", "Chrome MV2", "Safari").
3. Optionally search by **test name** using the search field.
4. Click **Start test** to open the test page in a new tab.
5. Subscribe to the test's filter rules in your AdGuard product and verify
   the expected behavior on the test page.

## Features overview

### Test list

The main page displays all available test cases with:

- **Title** — the name and rule category of the test.
- **Compatibility badges** — which AdGuard products support the test.
- **Start test** — opens the test page.
- **Readme** — displays the test's documentation (when available).
- **Copy link** — copies the direct link to the test's filter rules.
- **Copy rules** — copies the raw filter rules to the clipboard.
- **Subscribe** — generates a subscription URL that can be added to an
  AdGuard product or userscript manager.

### Product filter

Select a specific AdGuard product from the dropdown to show only the test
cases compatible with that product. When a product is selected, any
partially incompatible sub-cases are passed as query-string exceptions so
the test page can skip them automatically.

### Search

Type in the search field to filter test cases by name.

### Static data API

The app exposes a JSON file at `/data.json` that contains all test
metadata (IDs, titles, links, rule URLs, and compatibility data). This
file is consumed by automated test runners.

## Known issues

- **Copy rules** does not work in Firefox and Safari —
  `document.execCommand('copy')` is denied because it is not called from
  inside a short-running user-generated event handler.

## Documentation

- [Development guide](DEVELOPMENT.md) — environment setup, commands,
  contribution workflow
- [LLM agent rules](AGENTS.md) — project architecture and code guidelines
