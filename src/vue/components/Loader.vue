<template>
  <div class="loader" :class="{ 'loader--position-center': positionCenter }">
    <div class="loader__animation" />
    <p
      class="loader__message"
      v-if="messageId"
    >
      {{ messageId | globalize }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'loader',
  props: {
    messageId: { type: String, default: '' },
    positionCenter: { type: Boolean, default: true },
  },
})
</script>

<style lang="scss">
.loader {
  display: flex;
  align-items: center;
}

.loader--position-center {
  justify-content: center;
}

.loader__message {
  color: var(--col-light-blue);
  margin-left: toRem(20);
}

.loader__animation {
  width: toRem(50);
  height: toRem(50);
  border-radius: 50%;
  position: relative;

  &:after,
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: toRem(30);
    height: toRem(30);
    border: toRem(5) solid transparent;
    border-bottom: toRem(5) solid var(--col-light-blue);
    border-radius: 50%;
    animation: rotate 1s linear infinite;
  }

  &:before {
    width: toRem(40);
    height: toRem(40);
    animation-direction: reverse;
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
