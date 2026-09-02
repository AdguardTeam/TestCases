# syntax=docker/dockerfile:1
# Multi-stage Dockerfile for ext-filters-tests
# Dependencies are cached until package.json / pnpm-lock.yaml change.
# Each stage can be built independently via --target.

FROM adguard/node-ssh:22.22--0 AS base
SHELL ["/bin/bash", "-lc"]

WORKDIR /app

# pnpm store directory — set once here, no need for pnpm config set in every RUN
ENV npm_config_store_dir=/pnpm-store

# ============================================================================
# Stage: deps
# Cached until package.json / lockfile change
# ============================================================================
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# --ignore-scripts: skips husky's postinstall git-hook install (husky v3) and
# any other lifecycle scripts — no git hooks are needed in CI
RUN --mount=type=cache,target=/pnpm-store,id=ext-filters-tests-pnpm \
    pnpm install \
        --frozen-lockfile \
        --ignore-scripts \
        --prefer-offline

# ============================================================================
# Stage: source
# Full source copy — parent for all lint/test/build stages
# ============================================================================
FROM deps AS source

COPY . /app

# ============================================================================
# Stage: test-output
# Lints, runs tests, and builds the site. The build output produced here
# (/app/build) is reused by build-output, so the CRA build runs exactly once
# per pipeline. Used as the CI validation target: `docker build
# --target test-output .` fails if any step fails.
# ============================================================================
FROM source AS test-output

# CI=true makes react-scripts test run once without watch mode
RUN --mount=type=cache,target=/pnpm-store,id=ext-filters-tests-pnpm \
    pnpm lint && \
    CI=true pnpm test && \
    pnpm build:static && \
    pnpm build

# ============================================================================
# Stage: build-output
# Exports the already-built site from test-output (no rebuild). Both workflows
# target this via `--target build-output --output ./build`.
# ============================================================================
FROM scratch AS build-output
COPY --from=test-output /app/build /

# ============================================================================
# Stage: deploy
# Cloudflare Pages deploy image used by publish-release.yml. Kept separate from
# the lint/test/build stages so the release deploys with the pinned wrangler
# version without rebuilding the app.
# ============================================================================
FROM node:24-slim AS deploy
ARG WRANGLER_VERSION DEPLOY_DIR PROJECT_NAME BRANCH
RUN npm install -g "wrangler@${WRANGLER_VERSION}" --silent
WORKDIR /site
COPY ./site ./
RUN --mount=type=secret,id=CLOUDFLARE_API_TOKEN \
    --mount=type=secret,id=CLOUDFLARE_ACCOUNT_ID \
    CLOUDFLARE_API_TOKEN="$(cat /run/secrets/CLOUDFLARE_API_TOKEN)" \
    CLOUDFLARE_ACCOUNT_ID="$(cat /run/secrets/CLOUDFLARE_ACCOUNT_ID)" \
    wrangler pages deploy "${DEPLOY_DIR}" \
      --project-name="${PROJECT_NAME}" \
      --branch="${BRANCH}"
