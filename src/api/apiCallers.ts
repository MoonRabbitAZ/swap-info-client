import { AxiosStatic, AxiosInstance } from 'axios'
import { attachJsonApiUnpacker } from './apiInterceptors'
import { Token } from '@/typings/token'
import { Statistics } from '@/typings/statistics'
import { Pair } from '@/typings/pair'

export function makeApiCallers (axios: AxiosInstance) {
  const api = _cloneAxios(axios)
  attachJsonApiUnpacker(api)

  return {
    get (url: string) {
      return api.get(url)
    },
    getTokens () {
      return api.get<Token[]>('/integrations/dex-back/statistics/tokens')
    },
    getToken (id:string) {
      return api.get<Token[]>(`/integrations/dex-back/statistics/tokens/${id}`)
    },
    getPairs (params?: {
      'filter[token_id]'?: string,
    }) {
      return api.get<Pair[]>('/integrations/dex-back/statistics/pairs', { params })
    },
    getPair (id:string) {
      return api.get<Pair[]>(`/integrations/dex-back/statistics/pairs/${id}`)
    },
    getStatistics () {
      return api.get<Statistics>('/integrations/dex-back/statistics')
    },
  }
}

function _cloneAxios (axios: AxiosInstance) {
  return (axios as AxiosStatic).create()
}
