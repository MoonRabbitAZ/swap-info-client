<template>
  <div class="no-data-message">
    <icon
      class="no-data-message__icon"
      :name="iconName"
    />
    <p class="no-data-message__message">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ICON_NAMES } from '@/ts/const/icon-names.const'

export default Vue.extend({
  name: 'no-data-message',
  props: {
    iconName: { type: String, default: ICON_NAMES.empty },
    message: { type: String, required: true },
  },
})
</script>

<style lang="scss">
  .no-data-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: toRem(10);
    text-align: center;
    max-width: toRem(350);
    margin: 0 auto;
    padding-bottom: toRem(20);
  }

  .no-data-message__message {
    font-size: toRem(18);
    line-height: 1.2;
    font-weight: 700;
    color: var(--col-text);

    @include respond-to(tablet) {
      font-size: toRem(16);
    }
  }

  .no-data-message__icon {
    width: toRem(140);
    height: toRem(140);
  }
</style>
