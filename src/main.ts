import './scss/app.scss'

import Vue from 'vue'
import App from '@/vue/App.vue'
import router from '@/vue-router'
import { ICON_NAMES } from '@/ts/const/icon-names.const'
import Icon from '@/vue/components/Icon.vue'
import { i18n } from '@/i18n'
import { globalize } from '@/vue/filters/globalize'
import VueClipboard from 'vue-clipboard2'
import { cropText } from '@/vue/filters/crop-text'
import { formatMoney } from '@/vue/filters/format-money'
import { formatPercent } from '@/vue/filters/format-percent'
import { formatNumber } from '@/vue/filters/format-number'
import { vueRoutes } from '@/vue-router/routes'

async function init () {
  await i18n.init()

  Vue.config.productionTip = false
  Vue.filter('globalize', globalize)
  Vue.filter('cropText', cropText)
  Vue.filter('formatMoney', formatMoney)
  Vue.filter('formatPercent', formatPercent)
  Vue.filter('formatNumber', formatNumber)

  Vue.component('icon', Icon)
  Vue.use(VueClipboard)

  Vue.prototype.$icons = ICON_NAMES
  Vue.prototype.$routes = vueRoutes

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}
init()
