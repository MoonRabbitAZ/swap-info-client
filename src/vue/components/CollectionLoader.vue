<template>
  <div
    v-if="!isCollectionFetched && isLoaded"
    class="collection-loader"
  >
    <button
      class="app__button-text"
      type="button"
      @click="loadNextPage">
      {{ 'collection-loader.more-btn' | globalize }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ErrorHandler } from '@/ts/helpers/error-handler'
import { AxiosResponse } from 'axios'
import { callers } from '@/api'
import config from '@/config'

const EVENTS = {
  firstPageLoad: 'first-page-load',
  nextPageLoad: 'next-page-load',
  error: 'error',
}

export default Vue.extend({
  name: 'collection-loader',
  props: {
    firstPageLoader: {
      type: Function as PropType<() => Promise<AxiosResponse>>,
      required: true,
    },
    pageLimit: {
      type: Number,
      default: config.PAGE_LIMIT,
    },
  },
  data: () => ({
    nextPageLoader: (() => {}) as () => Promise<AxiosResponse>,
    isCollectionFetched: false,
    isLoaded: false,
  }),
  watch: {
    firstPageLoader: {
      immediate: true,
      handler: 'loadFirstPage',
    },
  },
  methods: {
    loadFirstPage () {
      this.loadPage(EVENTS.firstPageLoad, this.firstPageLoader)
    },
    loadNextPage () {
      this.loadPage(EVENTS.nextPageLoad, this.nextPageLoader)
    },
    async loadPage (eventName: string, loaderFn: () => Promise<AxiosResponse>) {
      this.isLoaded = false

      try {
        const response = await loaderFn()
        this.$emit(eventName, response.data)
        this.nextPageLoader = () => callers.get(response.links.next)
        this.isCollectionFetched = response.data.length < this.pageLimit
      } catch (e) {
        this.isCollectionFetched = true
        this.$emit(EVENTS.error, e)
        ErrorHandler.processWithoutFeedback(e as Error)
      }
      this.isLoaded = true
    },
  },
})
</script>
<style lang="scss" scoped>
  .collection-loader {
    display: flex;
    justify-content: center;
  }
</style>
