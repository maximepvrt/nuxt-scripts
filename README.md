<h1 align='center'>@nuxt/scripts</h1>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

<p align="center">
Powerful DX improvements for loading third-party scripts in Nuxt.
</p>

## Features

All the features from Unhead [useScript](https://unhead.unjs.io/usage/composables/use-script):

- 🦥 Lazy, but fast: `defer`, `fetchpriority: 'low'`, early connections (`preconnect`, `dns-prefetch`)
- ☕ Loading strategies: `idle`, `manual`, `Promise`
- 🪨 Single script instance for your app
- 🎃 Events for SSR scripts: `onload`, `onerror`, etc
- 🪝 Proxy API: call the script functions before it's loaded, noop for SSR, stubbable, etc
- 🇹 Fully typed APIs

Plus Nuxt goodies:

- ⏬ Serve third-party scripts from your own server
- 🕵️ Privacy Features - Trigger scripts loading on cookie consent, honour DoNotTrack.
- 🪵 DevTools integration - see all your loaded scripts with function logs

## Installation

1. Install `@nuxt/scripts` dependency to your project:

```bash
pnpm add -D @nuxt/scripts
#
yarn add -D @nuxt/scripts
#
npm install -D @nuxt/scripts
```

2. Add it to your `modules` section in your `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/scripts']
})
```

## Background

Loading third-party IIFE scripts using `useHead` composable is easy. However,
things start getting more complicated quickly around SSR, lazy loading, and type safety.

Nuxt Scripts was created to solve these issues and more with the goal of making third-party scripts a breeze to use.

## Usage

### Getting Started

To start using Nuxt Scripts, you can use the `useScript` composable to load your third-party scripts.

```ts
useScript('https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js')
```

See the Unhead [useScript](https://unhead.unjs.io/usage/composables/use-script) guide for next steps.

### Bundling Scripts

Bundling scripts can allow you to serve them from your own server, improving privacy and performance. It
can also help to get around ad blockers and other privacy tools when you need a script to load.

You can opt-in to have your scripts bundled by using the `assetStrategy` option. As this is
analyzed at build time, you must define it statically.

```ts
useScript('https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js', {
  assetStrategy: 'bundle'
})
// js-confetti.browser.js will be downloaded and bundled with your app as a static asset
```

### Sending Page Events

When using tracking scripts, it's common to send an event when the page changes. Due to Nuxt's head implementation being
async, the page title is not always available on route change immediately.

`useAnalyticsPageEvent` solves this by providing you with the page title and path when they change.

```ts
useAnalyticsPageEvent(({ title, path }) => {
  // triggered on route change
  gtag('event', 'page_view', {
    page_title: title,
    page_location: 'https://example.com',
    page_path: path
  })
})
```

### Privacy and Cookie Consent

Nuxt Scripts provides a `createScriptConsentTrigger` composable that allows you to load scripts based on the user's consent.

```ts
const agreedToCookies = ref(false)
useScript('https://www.google-analytics.com/analytics.js', {
  // will be loaded in when the ref is true
  trigger: createScriptConsentTrigger({
    honourDoNotTrack: true, // optional, disabled by default
    consent: agreedToCookies
  })
})
```

## API

### `useScript`

Please see the [useScript](https://unhead.unjs.io/usage/composables/use-script) documentation.

### `createScriptConsentTrigger`

This composable is a wrapper around `useScript` that respects privacy and cookie consent.

For the script to load you must provide a `consent` option. This can be promise, ref, or boolean.

```ts
const agreedToCookies = ref(false)
useScript('https://www.google-analytics.com/analytics.js', {
  // will be loaded in when the ref is true
  trigger: createScriptConsentTrigger({
    consent: agreedToCookies
  })
})
```

You can respect the end-users browser Do Not Track option by providing the opt-in `honourDoNotTrack: true` config.

This is not enabled by default as most Analytics ignore this by default.

```ts
const agreedToCookies = ref(false)
useScript('https://www.google-analytics.com/analytics.js', {
  trigger: createScriptConsentTrigger({
    honourDoNotTrack: true,
    consent: agreedToCookies
  })
})
```

### `useAnalyticsPageEvent`

It's common when using tracking scripts to send an event when the page changes. Due to Nuxt's head implementation being
async, it's not possible to send the page title on route change.

`useAnalyticsPageEvent` solves this by providing you with the page title and path when they change.

You can either provide a function to call on page change or use the ref that's returned.

```ts
useAnalyticsPageEvent(({ title, path }) => {
  gtag('event', 'page_view', {
    page_title: title,
    page_location: 'https://example.com',
    page_path: path
  })
})
```

```ts
const trackedPage = useAnalyticsPageEvent()
watch(trackedPage, ({ title, path }) => {
  gtag('event', 'page_view', {
    page_title: title,
    page_location: 'https://example.com',
    page_path: path
  })
})
```

## License

Licensed under the [MIT license](https://github.com/nuxt/scripts/blob/main/LICENSE.md).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxt/scripts/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxt/scripts

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxt/scripts.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxt/scripts

[license-src]: https://img.shields.io/github/license/nuxt/scripts.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/nuxt/scripts/blob/main/LICENSE

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
