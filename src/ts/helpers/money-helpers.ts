const CUR_SYM_MAP: Record<string, string> = {
  USD: '$',
}

export function toCurrencySymbol (currency: string) {
  return CUR_SYM_MAP[currency?.toUpperCase()] || ''
}
