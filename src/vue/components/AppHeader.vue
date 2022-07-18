<template>
  <div
    class="app-header"
    :class="{'app-header--fixed': isMobileNavigationShown}"
  >
    <div class="app-header__wrapper">
      <div class="app-header__logo-wrp">
        <router-link :to="$routes.home">
          <img
            class="app-header__logo"
            src="@static/branding/logo.svg"
            alt="logo"
          >
        </router-link>
      </div>
      <div class="app-header__content">
        <div class="app-header__nav-links">
          <router-link class="app-header__nav-link" :to="$routes.home">
            {{ 'app-header.overview-link' | globalize }}
          </router-link>
          <router-link class="app-header__nav-link" :to="$routes.tokens">
            {{ 'app-header.tokens-link' | globalize }}
          </router-link>
          <router-link class="app-header__nav-link" :to="$routes.pairs">
            {{ 'app-header.pairs-link' | globalize }}
          </router-link>
        </div>
        <button
          @click="isMobileNavigationShown = !isMobileNavigationShown"
          class="app__button-icon app-header__navigation-btn"
          type="button"
        >
          <icon
            class="app-header__navigation-btn-icon"
            :name="isMobileNavigationShown
              ? ICON_NAMES.close
              : ICON_NAMES.burgerBtn
            "
          />
        </button>
      </div>
    </div>
    <app-navigation-mobile
      :is-shown.sync="isMobileNavigationShown"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppNavigationMobile from '@/vue/components/AppNavigationMobile.vue'
import { ICON_NAMES } from '@/ts/const/icon-names.const'

export default Vue.extend({
  name: 'app-header',
  components: { AppNavigationMobile },
  data () {
    return {
      isMobileNavigationShown: false,
      ICON_NAMES,
    }
  },
})
</script>
<style lang="scss" scoped>
.app-header {
  background-color: var(--col-dark-cyan);
}

.app-header__wrapper {
  padding: toRem(20) var(--app-side-padding);
  display: flex;
  align-items: center;
  position: relative;
  z-index: var(--app-navbar-z-index);
  max-width: toRem(1512);
  margin: 0 auto;

  @include respond-to(medium) {
    padding: toRem(20) var(--app-side-padding-medium);
  }
  @include respond-to(tablet) {
    padding: toRem(20) var(--app-side-padding-small);
    justify-content: space-between;
  }
}

.app-header__content {
  display: flex;
  align-items: center;
}

.app-header__logo {
  width: toRem(170);
  height: toRem(36);
  margin-right: toRem(100);

  @include respond-to(medium) {
    margin-right: toRem(50);
  }
}

.app-header__navigation-btn-icon {
  width: toRem(18);
  height: toRem(16);
  fill: var(--col-light-blue);
}

.app-header__navigation-btn {
  display: none;

  @include respond-to(tablet) {
    display: flex;
    margin-left: toRem(28);
  }
}

.app-header--fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--app-navbar-mobile-z-index);
}

.app-header__nav-link {
  padding: toRem(10) toRem(49);
  color: var(--col-pale-cyan);
  text-decoration: none;
  margin-right: toRem(20);
  font-size: toRem(16);
  line-height: 1.25;

  &:last-child {
    margin-right: 0;
  }

  &.router-link-active {
    background-color: rgba(var(--col-pure-cyan-rgb), 0.3);
    border-radius: toRem(8);
    color: var(--col-pure-cyan);
  }
}

.app-header__nav-links {
  display: flex;

  @include respond-to(tablet) {
    display: none;
  }
}
</style>
