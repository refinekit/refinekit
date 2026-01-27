import { SITE } from '~/config'

// Prepend base path to URL
export function url(path: string): string {
  const base = SITE.base.endsWith('/') ? SITE.base.slice(0, -1) : SITE.base
  return `${base}${path}`
}
