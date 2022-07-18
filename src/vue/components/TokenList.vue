<template>
  <div class="token-list">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message :message="'token-list.error-msg' | globalize" />
      </template>
      <template v-else>
        <template v-if="list.length">
          <tokens-table :tokens="list" />
        </template>
        <template v-else>
          <no-data-message
            :message="'token-list.no-data-msg' | globalize"
          />
        </template>
      </template>
    </template>
    <template v-else>
      <loader />
    </template>

    <collection-loader
      class="token-list__collection-loader"
      :first-page-loader="getList"
      @first-page-load="setList"
      @next-page-load="concatList"
      ref="collectionLoader"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loader from '@/vue/components/Loader.vue'
import CollectionLoader from '@/vue/components/CollectionLoader.vue'
import { ErrorHandler } from '@/ts/helpers/error-handler'
import { callers } from '@/api'
import ErrorMessage from '@/vue/components/ErrorMessage.vue'
import NoDataMessage from '@/vue/components/NoDataMessage.vue'
import TokensTable from '@/vue/components/TokensTable.vue'

export default Vue.extend({
  name: 'token-list',
  components: {
    CollectionLoader,
    Loader,
    ErrorMessage,
    NoDataMessage,
    TokensTable,
  },
  data () {
    return {
      isLoaded: false,
      isLoadFailed: false,
      list: [],
    }
  },
  methods: {
    async getList () {
      let result
      this.isLoaded = false
      this.isLoadFailed = false

      try {
        result = await callers.getTokens()
      } catch (error) {
        this.isLoadFailed = true
        ErrorHandler.processWithoutFeedback(error as Error)
      }
      this.isLoaded = true

      return result
    },

    setList (newList: []) {
      this.list = newList
    },

    concatList (newChunk: []) {
      this.list = this.list.concat(newChunk)
    },
  },
})
</script>
<style lang="scss" scoped>
.token-list__collection-loader {
  padding: toRem(16);
  border-top: toRem(1) solid var(--col-border);
}

.token-list {
  position: relative;
  background-color: var(--col-block-bg);
  border-radius: toRem(8);
  border: toRem(1) solid var(--col-border);
}
</style>
