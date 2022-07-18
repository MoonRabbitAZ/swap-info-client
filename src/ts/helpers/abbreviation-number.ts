import { MathUtil } from '@/ts/helpers/math-util'
import { globalize } from '@/vue/filters/globalize'
import BigNumber from 'bignumber.js'
import config from '@/config'

export function abbreviationNumber (
  value: number | string,
  format: BigNumber.Format,
  DECIMAL_PLACES: number = config.DECIMAL_PLACES,
  amountWithoutAbbrevation: number = 1000,
) {
  let number: string | number = Math.abs(+value)
  if (value > -amountWithoutAbbrevation && value < amountWithoutAbbrevation) {
    return MathUtil.format(value, DECIMAL_PLACES, format)
  }

  const decimalPlaces = Math.pow(10, DECIMAL_PLACES)
  const abbreviation = [
    globalize('abbreviation-numbers.thousand'),
    globalize('abbreviation-numbers.million'),
    globalize('abbreviation-numbers.billion'),
    globalize('abbreviation-numbers.trillion'),
  ]

  for (let i = abbreviation.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3)
    if (size <= number) {
      // eslint-disable-next-line max-len
      const multiplyValue = MathUtil.multiply(number, decimalPlaces, DECIMAL_PLACES)
      const divideValue = MathUtil.divide(multiplyValue, size, DECIMAL_PLACES)
      const roundValue = MathUtil.round(divideValue)
      number = MathUtil.divide(roundValue, decimalPlaces, DECIMAL_PLACES)
      if (value < 0) {
        number = -number
      }
      number = MathUtil.format(number, DECIMAL_PLACES, format)
      number += abbreviation[i]

      break
    }
  }

  return String(number)
}
