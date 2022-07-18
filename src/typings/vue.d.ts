
import Vue from 'vue'
import type {
  GlobalAppConfigType,
  IconNamesType,
} from './global'

declare module 'vue/types/vue' {
  interface Vue {
    $icons: typeof IconNamesType
    $routes: typeof RoutesReferenceType
  }
}
