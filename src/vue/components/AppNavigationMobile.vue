<template>
  <transition name="app-navigation-mobile-transition">
    <nav
      v-if="isShown"
      class="app-navigation-mobile"
      scroll-lock-ignore
    >
      <router-link
        class="app-navigation-mobile__link"
        @click.native="closeNavigation"
        :to="$routes.home"
      >
        {{ 'app-navigation-mobile.overview-link' | globalize }}
      </router-link>
      <router-link
        class="app-navigation-mobile__link"
        @click.native="closeNavigation"
        :to="$routes.tokens"
      >
        {{ 'app-navigation-mobile.tokens-link' | globalize }}
      </router-link>
      <router-link
        class="app-navigation-mobile__link"
        @click.native="closeNavigation"
        :to="$routes.pairs"
      >
        {{ 'app-navigation-mobile.pairs-link' | globalize }}
      </router-link>
    </nav>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '@/ts/helpers/scroll-lock'

export default Vue.extend({
  name: 'app-navigation-mobile',
  props: {
    isShown: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isShown (val) {
      if (val) {
        lockBodyScroll()
      } else {
        unlockBodyScroll()
      }
    },
  },
  methods: {
    closeNavigation () {
      this.$emit('update:isShown', false)
    },
  },
})
</script>

<style lang="scss" scoped>
.app-navigation-mobile {
  position: fixed;
  width: 100vw;
  height: calc(vh(100) - toRem(76));
  top: toRem(76);
  left: 0;
  z-index: var(--app-navbar-mobile-z-index);
  background-color: var(--col-dark-cyan);
  display: flex;
  flex-direction: column;
  padding: toRem(60) 0;
  overflow: scroll;
}

.app-navigation-mobile__link {
  padding: toRem(20);
  font-size: toRem(20);
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  margin-bottom: toRem(60);

  &:last-child {
    margin-bottom: 0;
  }

  &.router-link-active {
    background-color: rgba(var(--col-pure-cyan-rgb), 0.3);
    color: var(--col-pure-cyan);
  }
}

.app-navigation-mobile-transition-enter-active {
  animation: app-navigation-mobile-keyframes 0.3s ease-in-out;
}

.app-navigation-mobile-transition-leave-active {
  animation: app-navigation-mobile-keyframes 0.3s ease-in-out reverse;
}

@keyframes app-navigation-mobile-keyframes {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
