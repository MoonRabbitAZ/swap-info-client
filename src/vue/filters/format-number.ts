import { globalize } from './globalize'

export function formatNumber (value: string | number) {
  return globalize('formats.number', { value })
}
