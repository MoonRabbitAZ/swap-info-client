import Jsona from 'jsona'
import { AxiosInstance, AxiosResponse } from 'axios'
import { toCamelCaseDeep } from '@/api/helpers/case-converter'

export function attachJsonApiUnpacker (axios: AxiosInstance): void {
  const jsona = new Jsona()
  axios.interceptors.response.use((success): AxiosResponse => {
    success.links = success?.data?.links
    success.data = toCamelCaseDeep(jsona.deserialize(success.data))
    return success
  })
}
