import { i18n } from '@/i18n'
import { TOptions } from 'i18next'

export function globalize (
  translationId: string,
  interpolationOps: TOptions = {},
) {
  interpolationOps.interpolation = { escapeValue: false }
  return i18n.t(translationId, interpolationOps)
}
