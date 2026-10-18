# `$stealth` rules test

Checks canvas fingerprinting protection of AdGuard Browser Extension and the
exceptions that turn it off. Supported by AdGuard Browser Extension (MV2 and
MV3) starting with v5.6.

## How the test works

The page draws four solid opaque rectangles on a canvas and reads them back
with `getImageData()` and `toDataURL()`. An iframe of the page, loaded from the
same host, does the same. Solid rectangles render the same way in every
browser, so the native pixel values are known in advance. Each readout shows
one of the statuses:

- `native` — the readout matches the drawing.
- `noised` — protection changed some pixels by one level in one color channel.
  `toDataURL()` is `noised` only when it encodes the same pixels as the
  `getImageData()` readout.
- `unexpected` — the readout differs in another way.

**Canvas readout** shows the status shared by all four readouts, or
`inconsistent` when they differ.

## Setup

1. Open the test page with **Block fingerprinting** turned off. **Canvas
   readout** must be `native`. Otherwise the browser changes canvas readouts
   itself, e.g., Firefox in private windows or with strict Enhanced Tracking
   Protection, and the test cannot be run there.
2. In Chromium MV3 browsers, allow user scripts for the extension: turn on
   **Allow user scripts** on its details page, or **Developer mode** before
   Chrome 138.
3. In the extension settings, open **Tracking protection**, turn it on and
   turn on **Block fingerprinting**. No warning must be shown under **Block
   fingerprinting**.
4. Subscribe to the test filter. It only hides the subscribe banner.

For each case, replace the user rules with the rules of the case and reload
the test page. Changes of rules, the allowlist and **Block fingerprinting**
apply to pages loaded afterwards.

## Case 1: protection without exceptions

No user rules.

**Expected result:** **Canvas readout** is `noised`.

## Case 2: `$stealth=fingerprinting` exception

```adblock
@@||testcases.agrd.dev^$stealth=fingerprinting
@@||pages.dev^$stealth=fingerprinting
```

**Expected result:** **Canvas readout** is `native`.

## Case 3: `$stealth` exception

```adblock
@@||testcases.agrd.dev^$stealth
@@||pages.dev^$stealth
```

**Expected result:** **Canvas readout** is `native`.

## Case 4: `$document` exception

```adblock
@@||testcases.agrd.dev^$document
@@||pages.dev^$document
```

**Expected result:** **Canvas readout** is `native`. The subscribe banner is
shown, because `$document` turns off all filtering on the page.

## Case 5: allowlist

No user rules. On the **Allowlist** settings page, add the host of the test
page, e.g., `testcases.agrd.dev`, and save.

**Expected result:** **Canvas readout** is `native`. The subscribe banner is
shown, because the allowlist turns off all filtering on the page.

Remove the host from the allowlist after the case.

## Case 6: `$stealth=fingerprinting` exception cancelled by `$badfilter`

```adblock
@@||testcases.agrd.dev^$stealth=fingerprinting
@@||pages.dev^$stealth=fingerprinting
@@||testcases.agrd.dev^$stealth=fingerprinting,badfilter
@@||pages.dev^$stealth=fingerprinting,badfilter
```

**Expected result:** **Canvas readout** is `noised`.
