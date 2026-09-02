# Deployment — AdGuard Test Cases

- [Deployment — AdGuard Test Cases](#deployment--adguard-test-cases)
    - [Deployment Summary](#deployment-summary)
    - [Release Pipeline](#release-pipeline)
        - [Step-by-step](#step-by-step)
        - [Migration from Bamboo](#migration-from-bamboo)
        - [Rollback](#rollback)
    - [CI/CD](#cicd)
        - [CI build (ci.yml)](#ci-build-ciyml)
    - [Environment Variables and Secrets](#environment-variables-and-secrets)
    - [Infrastructure Dependencies](#infrastructure-dependencies)

## Deployment Summary

| Parameter                    | Value                                      |
| ---------------------------- | ------------------------------------------ |
| **Live URL**                 | <https://testcases.agrd.dev>               |
| **Cloudflare Pages project** | `adguard-testcases`                        |
| **Deploy**                   | inline deploy job in `publish-release.yml` |
| **Public mirror**            | `AdguardTeam/TestCases`                    |
| **Runner label**             | `team-extensions`                          |
| **Slack channel**            | `#adguard-extension-vcs`                   |

Deploys run in the `publish-release.yml` deploy job, which runs
`wrangler pages deploy` inside its own Docker image. The `pnpm run deploy`
script in `package.json` is only a manual fallback for local/emergency use and
requires the Cloudflare env vars to be wired by hand.

## Release Pipeline

Version is driven entirely by `CHANGELOG.md` — there is no committed `version`
field in `package.json`. CI stamps a `-dev` suffix on every build; a real
version tag is created from `CHANGELOG.md` only during `publish-release.yml`.

### Step-by-step

1. A maintainer runs **`prepare-release.yml`** (`workflow_dispatch`) and
   provides the target tag (e.g. `v0.2.116`).
   The workflow opens a `release-bump/v0.2.116` PR that finalizes the
   `[Unreleased]` section in `CHANGELOG.md`.
2. After review, merge the release PR into `master`.
   This triggers **`publish-release.yml`**, which:
   - reads the released version from `CHANGELOG.md` and creates the git tag
     (`tag-from-changelog`);
   - builds the site artifact in Docker and deploys it to Cloudflare Pages in
     the release pipeline's own deploy job (production `branch: master`);
   - mirrors the tag to the public repo `AdguardTeam/TestCases` and creates the
     GitHub Release there, with the changelog section as the release body
     (`mirror-and-release`);
   - posts a Slack notification to `#adguard-extension-vcs` (success or
     failure).

   The deploy job targets the `production` environment (a required-reviewer
   protection rule defined in terraform-github). Approve the deployment in the
   Actions UI when prompted.
3. `publish-release.yml` can also be triggered manually via `workflow_dispatch`
   by providing an optional `ref` — see [Rollback](#rollback).

Separately, **`mirror.yml`** keeps the public mirror's code in sync on every
push to `master` (independent of releases).

### Migration from Bamboo

The old Bamboo `FILTERSTESTINCR` plan auto-incremented the patch version on
every master build and pushed a `skipci` commit. That is gone: versions now
change **only** through a release PR, and contributors add their changes under
the `[Unreleased]` heading in `CHANGELOG.md`. Master pushes build and validate
but no longer deploy or bump the version — deployment happens exclusively via
the release pipeline above.

### Rollback

To re-publish a previous version, run **`publish-release.yml`** manually
(`workflow_dispatch`) with `ref` set to the target tag or commit. Two caveats:

- `tag-from-changelog` **force-creates** the tag, so re-publishing an old
  version moves that tag to the dispatched ref.
- Re-running a version that already has a GitHub Release may fail at the
  release-creation step **after** the deploy has already happened; the
  Cloudflare deploy itself will have succeeded.

## CI/CD

| Workflow              | Trigger                              | What it does                                  |
| --------------------- | ------------------------------------ | --------------------------------------------- |
| `ci.yml`              | pull_request / push to master        | Lints, tests, and builds (no deploy)          |
| `mirror.yml`          | push to master                       | Mirrors code to the public repo               |
| `prepare-release.yml` | manual dispatch                      | Opens a release-bump PR                       |
| `publish-release.yml` | release-bump merge / manual dispatch | Tags, builds, deploys, mirrors, releases      |

### CI build (ci.yml)

Runs on every pull request and on pushes to `master`. It validates only — it
never deploys:

1. Checks out the code.
2. Stamps a `{next-patch}-dev` version derived from `CHANGELOG.md` into
   `package.json` (shared `set-dev-version` action) so the build is
   distinguishable from a real release.
3. Lints, tests, and builds inside Docker (`--target test-output`).

Deployment is intentionally **not** part of CI — the live site is updated only
through the release pipeline (see [Release Pipeline](#release-pipeline)).

## Environment Variables and Secrets

| Name                    | Scope                                  | Description           |
| ----------------------- | -------------------------------------- | --------------------- |
| `cloudflare_api_token`  | Vault (`ci-secrets/ext-filters-tests`) | Wrangler deploy token |
| `cloudflare_account_id` | Vault (`ci-secrets/ext-filters-tests`) | Cloudflare account ID |

Cloudflare credentials live in Vault, not as GitHub repository secrets. The
deploy job fetches them **inside the job itself** (Vault JWT, role
`ext-filters-tests`, path `secret/data/ci-secrets/ext-filters-tests`) and runs
`wrangler pages deploy` inside Docker.

Fetching them in the deploy job itself is required: GitHub Actions discards job
outputs whose values match a registered secret mask
([actions/runner#1498](https://github.com/actions/runner/issues/1498)), so
values fetched in a separate job and passed to the deploy step would arrive as
empty strings.

The Vault endpoint itself is configured through a repository/organization
variable:

| Variable    | Scope             | Description                           |
| ----------- | ----------------- | ------------------------------------- |
| `VAULT_URL` | repo/org variable | Base URL of the Vault server for OIDC |

**Rotation:** to rotate the Cloudflare credentials, update the values under
`ci-secrets/ext-filters-tests` in Vault — no GitHub-side change is needed, the
next deploy run picks them up automatically.

## Infrastructure Dependencies

| Dependency                             | Purpose                                        |
| -------------------------------------- | ---------------------------------------------- |
| Cloudflare Pages (`adguard-testcases`) | Hosts the static site at testcases.agrd.dev    |
| Vault (`ci-secrets/ext-filters-tests`) | Stores the Cloudflare deploy credentials       |
| `AdguardTeam/TestCases`                | Public mirror of this repo                     |
| `AdGuardSoftwareLimited/actions`       | Shared workflows (mirror, tagging, releases)   |
| `team-extensions` runner               | Self-hosted GitHub Actions runner              |
