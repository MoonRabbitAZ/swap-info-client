<template>
  <div class="app-container">
    <h2 class="pairs-page__title">
      {{ 'pairs-page.title' | globalize }}
    </h2>

    <pair-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PairList from '@/vue/components/PairList.vue'

export default Vue.extend({
  name: 'pairs-page',
  components: { PairList },
})
</script>
<style lang="scss" scoped>
.pairs-page__title {
  margin-bottom: toRem(10);
}
</style>
