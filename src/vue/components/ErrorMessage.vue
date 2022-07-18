<template>
  <div
    class="error-message"
    :class="[ scheme ? `error-message--${scheme}` : '']"
  >
    <icon
      class="error-message__icon"
      :name="iconName"
    />
    <p class="error-message__message">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ICON_NAMES } from '@/ts/const/icon-names.const'

const SCHEME = {
  row: 'row',
  default: '',
}

export default Vue.extend({
  name: 'error-message',
  props: {
    iconName: { type: String, default: ICON_NAMES.error },
    message: { type: String, required: true },
    scheme: { type: String, default: SCHEME.default },
  },
})
</script>

<style lang="scss">
  .error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: toRem(10);
    text-align: center;
    margin: 0 auto;
    padding-bottom: toRem(20);

    &--row {
      display: flex;
      flex-direction: row;
      max-width: initial;
      gap: toRem(20);
      padding-bottom: 0;
    }
  }

  .error-message__message {
    color: var(--col-error);
    font-size: toRem(18);
    line-height: 1.2;
    font-weight: 700;

    .error-message--row & {
      font-size: toRem(16);
    }

    @include respond-to(tablet) {
      font-size: toRem(16);
    }
  }

  .error-message__icon {
    width: toRem(140);
    height: toRem(140);

    .error-message--row & {
      width: toRem(63);
      height: toRem(63);
      min-width: toRem(63);
      min-height: toRem(63);
    }
  }
</style>
