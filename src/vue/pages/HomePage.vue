<template>
  <div class="app-container">
    <h3 class="homepage__header">
      {{ 'homepage.analytics-title' | globalize }}
    </h3>

    <home-page-statistic />

    <div class="homepage__block-header">
      <h3>
        {{ 'homepage.tokens-title' | globalize }}
      </h3>
      <router-link :to="$routes.tokens" class="homepage__see-all-link">
        {{ 'homepage.see-all-link' | globalize }}
      </router-link>
    </div>

    <token-list />

    <div class="homepage__block-header">
      <h3>
        {{ 'homepage.pairs-title' | globalize }}
      </h3>
      <router-link :to="$routes.pairs" class="homepage__see-all-link">
        {{ 'homepage.see-all-link' | globalize }}
      </router-link>
    </div>

    <pair-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TokenList from '@/vue/components/TokenList.vue'
import PairList from '@/vue/components/PairList.vue'
import HomePageStatistic from '@/vue/pages/HomePage/HomePageStatistic.vue'

export default Vue.extend({
  name: 'home-page',
  components: { TokenList, PairList, HomePageStatistic },
})
</script>
<style lang="scss" scoped>
.homepage__block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: toRem(32) 0 toRem(10);
}

.homepage__header {
  margin-bottom: toRem(32);
}

.homepage__see-all-link {
  text-decoration: none;
}
</style>
