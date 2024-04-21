import { boolean, object, optional, string } from 'valibot'
import { registryScriptOptions } from '../utils'
import { useScript } from '#imports'
import type { RegistryScriptInput } from '#nuxt-scripts'

export const MatomoAnalyticsOptions = object({
  matomoUrl: string(), // site is required
  siteId: string(),
  trackPageView: optional(boolean()),
  enableLinkTracking: optional(boolean()),
})

export type MatomoAnalyticsInput = RegistryScriptInput<typeof MatomoAnalyticsOptions, false>

interface MatomoAnalyticsApi {
  _paq: unknown[]
}

declare global {
  interface Window extends MatomoAnalyticsApi {}
}

export function useScriptMatomoAnalytics<T extends MatomoAnalyticsApi>(options?: MatomoAnalyticsInput) {
  return useScript<T>({
    src: `https://${options?.matomoUrl}/matomo.js`,
    ...options?.scriptInput,
  }, {
    // avoids SSR breaking
    stub: import.meta.client
      ? undefined
      : () => {
          return []
        },
    ...registryScriptOptions({
      schema: MatomoAnalyticsOptions,
      options,
      clientInit: import.meta.server
        ? undefined
        : () => {
            const _paq = window._paq = window._paq || []
            options?.trackPageView !== false && _paq.push(['trackPageView'])
            options?.enableLinkTracking !== false && _paq.push(['enableLinkTracking'])
            _paq.push(['setTrackerUrl', `//${options?.matomoUrl}/matomo.php`])
            _paq.push(['setSiteId', options?.siteId])
          },
    }),
    use() {
      return { _paq: window._paq }
    },
  })
}