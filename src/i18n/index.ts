import i18next, { i18n as i18nextInstance, InitOptions, TOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import _merge from 'lodash/merge'
import _get from 'lodash/get'
import { abbreviationNumber } from '@/ts/helpers/abbreviation-number'
import { toCurrencySymbol } from '@/ts/helpers/money-helpers'
import { MathUtil } from '@/ts/helpers/math-util'

// i18next api:
// https://www.i18next.com/overview/api

// list of iso639 codes on wiki
// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

type Listener = (lng: string) => void
type Resource = { translations: any, config: any }

class I18n {
  _i18nextInstance: i18nextInstance
  _i18nextConfig: InitOptions
  _languageChangeListeners: Array<Listener>

  constructor () {
    this._i18nextInstance = i18next.createInstance()
    this._i18nextConfig = this._buildDefaultConfig()
    this._languageChangeListeners = []
  }

  async init (): Promise<void> {
    const languageDetector = new LanguageDetector()
    languageDetector.addDetector(this.customNavigatorLanguageDetector())

    this._i18nextInstance
      .use(languageDetector)
      .init(this._i18nextConfig)

    // on init, i18n detected and set language, now we should apply it
    await this.changeLanguage(this.language)
  }

  async changeLanguage (lng: string): Promise<void> {
    if (!this._i18nextInstance.options.resources?.[lng]) {
      const lngResources = await this._loadResources(lng) as Resource
      this._appendResources(lng, lngResources)
    }

    this._i18nextInstance.changeLanguage(lng)
    this._languageChangeListeners.forEach(cb => cb(lng))
  }

  async _loadResources (lang: string): Promise<Resource | void> {
    let result

    switch (lang) {
      case 'en':
        result = _merge(
          await require.ensure([], require => require('./resources/en')),
        )
        break

      default:
        throw new Error(`I18n._loadResources(): unknown language: ${lang}`)
    }
    return result
  }

  _appendResources (lang: string, ...resources: Resource[]) {
    for (const resource of resources) {
      const parsed = this._parseResource(resource)

      if (parsed.translations) {
        this._i18nextInstance.addResourceBundle(
          lang, 'translation', parsed.translations, true, true,
        )
      }

      if (parsed.config) {
        this._i18nextInstance.addResourceBundle(
          lang, 'config', parsed.config, true, true,
        )
      }
    }
  }

  _parseResource (resource: Resource): Resource {
    const result = {} as Resource

    if (resource.translations) {
      result.translations = resource.translations
    }

    if (resource.config) {
      result.config = resource.config
    }
    return result
  }

  onLanguageChanged (listener: Listener) {
    this._languageChangeListeners.push(listener)

    // subscription remover
    return () => {
      this._languageChangeListeners = this._languageChangeListeners
        .filter(item => item !== listener)
    }
  }

  get languages () {
    const supportedLngs = this._i18nextInstance.options.supportedLngs || []
    return supportedLngs.filter((item: String) => item !== 'cimode')
  }

  get language () {
    return this._i18nextInstance.language
  }

  t (key: string, options?: TOptions) {
    return this._i18nextInstance.t(key, options)
  }

  _buildDefaultConfig () : InitOptions {
    return {
      fallbackLng: 'en',
      debug: false,
      resources: {},
      supportedLngs: ['en'],
      // set to true if you need en-US/en-UK lng's:
      nonExplicitSupportedLngs: false,
      detection: {
        order: [
          'querystring',
          'cookie',
          'localStorage',
          'customNavigatorLanguageDetector',
          'navigator',
          'htmlTag',
          'path',
          'subdomain',
        ],
      },
      interpolation: {
        format: (param, format) => {
          const lngConfig = this._i18nextInstance
            .getResourceBundle(this.language, 'config')

          switch (format!.toLowerCase()) {
            case 'money':
              const value = param?.value || param
              const defaultFormat =
                _get(lngConfig, 'number.formats.amounts.default')
              const decimalPlaces = param?.decimalPlaces ||
                defaultFormat.decimalPlaces

              const formatedBalance = MathUtil
                .format(value, decimalPlaces, defaultFormat)
              const symbol = toCurrencySymbol(param?.currency || 'USD')

              return symbol.concat(formatedBalance)
            case 'percent':
              const defaultPercentFormat =
                _get(lngConfig, 'number.formats.percent')

              return MathUtil.format(
                param,
                defaultPercentFormat.decimalPlaces,
                defaultPercentFormat,
              )
            case 'number':
              const numberFormat = _get(lngConfig, 'number.formats.default')
              return MathUtil
                .format(param, numberFormat.decimalPlaces, numberFormat)
            default:
              console.warn(`Unknown format: ${format}, skipping…`)
              return param
          }
        },
      },
    }
  }
  customNavigatorLanguageDetector () {
    return {
      name: 'customNavigatorLanguageDetector',
      lookup () {
        const browserLangCode = window.navigator.language
        return browserLangCode.substring(0, 2)
      },
    }
  }
}

export const i18n = new I18n()
