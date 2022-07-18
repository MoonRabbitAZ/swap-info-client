import { globalize } from './globalize'

export function formatMoney (value: number | string) {
  return globalize('formats.money', { value })
}
