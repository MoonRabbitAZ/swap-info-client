<template>
  <div class="home-page-statistic">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message
          scheme="row"
          :message="'home-page-statistic.error-msg' | globalize"
        />
      </template>
      <template v-else>
        <div class="home-page-statistic__global-statistic">
          <span class="home-page-statistic__global-statistic-item">
            {{ 'home-page-statistic.eth-price' | globalize({
              value: statistics.ethPrice
            }) }}
          </span>
          <span class="home-page-statistic__global-statistic-item">
            {{ 'home-page-statistic.transactions' | globalize({
              value: statistics.transactionsNumber
            }) }}
          </span>
          <span class="home-page-statistic__global-statistic-item">
            {{ 'home-page-statistic.pairs' | globalize({
              value: statistics.pairsNumber
            }) }}
          </span>
          <span class="home-page-statistic__global-statistic-item">
            {{ 'home-page-statistic.fees' | globalize({
              value: statistics.fees
            }) }}
          </span>
        </div>
      </template>
    </template>
    <template v-else>
      <loader />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loader from '@/vue/components/Loader.vue'
import { ErrorHandler } from '@/ts/helpers/error-handler'
import { callers } from '@/api'
import ErrorMessage from '@/vue/components/ErrorMessage.vue'

export default Vue.extend({
  name: 'home-page-statistic',
  components: {
    Loader,
    ErrorMessage,
  },
  data () {
    return {
      isLoaded: false,
      isLoadFailed: false,
      statistics: {},
    }
  },
  created () {
    this.loadStatistics()
  },
  methods: {
    async loadStatistics () {
      try {
        const { data } = await callers.getStatistics()
        this.statistics = data
      } catch (error) {
        this.isLoadFailed = true
        ErrorHandler.processWithoutFeedback(error as Error)
      }
      this.isLoaded = true
    },
  },
})
</script>
<style lang="scss" scoped>
.home-page-statistic {
  background-color: var(--col-block-bg);
  border-radius: toRem(8);
  border: toRem(1) solid var(--col-border);
  padding: toRem(18);
  width: 100%;
  max-width: max-content;
}

.home-page-statistic__global-statistic-item {
  margin-right: toRem(20);
  font-size: toRem(14);

  &:last-child {
    margin-right: 0;
  }
}

.home-page-statistic__global-statistic {
  display: flex;
  flex-wrap: wrap;
  gap: toRem(10);
}
</style>
