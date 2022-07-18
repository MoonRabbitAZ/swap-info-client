<template>
  <div class="app-container">
    <h2 class="tokens-page__title">
      {{ 'tokens-page.title' | globalize }}
    </h2>

    <token-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TokenList from '@/vue/components/TokenList.vue'

export default Vue.extend({
  name: 'tokens-page',
  components: { TokenList },
})
</script>
<style lang="scss" scoped>
.tokens-page__title {
  margin-bottom: toRem(10);
}
</style>
