import _pickBy from 'lodash/pickBy'
import _mapKeys from 'lodash/mapKeys'

const config = {
  /**
   * App name
   */
  APP_NAME: 'MoonRabbit info',
  DECIMAL_PLACES: 2,
  API_URL: '',
  PAGE_LIMIT: 15,
  MOONRABBIT_EXPLORER_LINK: '',
  MOONRABBIT_SWAP_LINK: '',
}

declare const document: Document & { ENV: { [k: string]: unknown } }
declare const window: Document & { ENV: { [k: string]: unknown } }
declare const global: Document & { ENV: { [k: string]: unknown } }

const pickEnvConfigKeys = (source: { [k: string]: unknown }) => {
  return _mapKeys(
    source,
    (v, k) => k.replace(/^VUE_APP_/, ''),
  )
}
Object.assign(
  config,
  pickEnvConfigKeys(process.env),
  pickEnvConfigKeys(document.ENV || window.ENV || global.ENV),
)
export default config
