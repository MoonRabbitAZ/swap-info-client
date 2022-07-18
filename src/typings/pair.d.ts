import { Token } from '@/typings/token'

export type Pair = {
  token1: Token,
  token2: Token,
  liquidity: number,
  volume24Hours: number,
  volume7Days: number,
  fees24Hours: number,
  contract: string,
  type: string,
  id: string
}
