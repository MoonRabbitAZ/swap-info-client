import { globalize } from './globalize'

export function formatPercent (value: string | number) {
  return globalize('formats.percent', { value })
}
