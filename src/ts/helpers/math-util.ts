import BigNumber from 'bignumber.js'
import config from '@/config'

enum ROUNDING_MODES {
  ROUND_UP = 0,
  ROUND_DOWN = 1,
  ROUND_CEIL = 2,
  ROUND_FLOOR = 3,
  ROUND_HALF_UP = 4,
  ROUND_HALF_DOWN = 5,
  ROUND_HALF_EVEN = 6,
  ROUND_HALF_CEIL = 7,
  ROUND_HALF_FLOOR = 8,
}

const DECIMAL_PLACES = config.DECIMAL_PLACES
const ONE = 1000000

export class MathUtil {
  static format (
    value: string | number | BigNumber,
    decimalPlaces: number = DECIMAL_PLACES,
    config?: BigNumber.Format,
  ) {
    BigNumber.config({
      FORMAT: config || {
        groupSeparator: '',
        decimalSeparator: '.',
        fractionGroupSeparator: '',
      },
    })

    const num = new BigNumber(value)
    const result = new BigNumber(
      num.toFixed(decimalPlaces, ROUNDING_MODES.ROUND_FLOOR),
    )

    return result.toFormat()
  }

  static add (
    a: string | number,
    b: string | number,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
  ) {
    BigNumber.config({ ROUNDING_MODE: ROUND_TYPE })
    BigNumber.config({ DECIMAL_PLACES })

    const one = new BigNumber(a)
    const two = new BigNumber(b)

    const result = one.plus(two)
    return result
      .toFixed(DECIMAL_PLACES)
  }

  static compare (a: string | number, b: string | number) {
    const one = new BigNumber(a)
    const two = new BigNumber(b)

    return one.comparedTo(two)
  }

  static multiply (
    a: string | number,
    b: string | number,
    decimalPlaces: number = DECIMAL_PLACES,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
  ) {
    BigNumber.config({ ROUNDING_MODE: ROUND_TYPE })
    BigNumber.config({ DECIMAL_PLACES: 0 })

    const mul1 = new BigNumber(new BigNumber(a).times(new BigNumber(ONE)))
    const mul2 = new BigNumber(new BigNumber(b).times(new BigNumber(ONE)))
    const result = mul1.times(mul2)

    BigNumber.config({ DECIMAL_PLACES: decimalPlaces })

    return result
      .dividedBy(new BigNumber(ONE))
      .dividedBy(new BigNumber(ONE))
      .toFixed(decimalPlaces)
  }

  static divide (
    a: string | number,
    b: string | number,
    decimalPlaces: number = DECIMAL_PLACES,
    ROUND_TYPE = ROUNDING_MODES.ROUND_UP,
  ) {
    BigNumber.config({ ROUNDING_MODE: ROUND_TYPE })
    BigNumber.config({ DECIMAL_PLACES: decimalPlaces })

    const num = new BigNumber(new BigNumber(a).times(new BigNumber(ONE)))
    const denum = new BigNumber(new BigNumber(b).times(new BigNumber(ONE)))

    const result = num.dividedBy(denum)

    return result
      .toFixed(decimalPlaces)
  }

  static MAX_UINT256 = MathUtil.format(
    new BigNumber(2).pow(256).minus(1),
  )

  static round (n: number | string) : number {
    return Math.round(+n)
  }
}
