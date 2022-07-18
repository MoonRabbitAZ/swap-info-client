<template>
  <div class="pair-list">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message :message="'pair-list.error-msg' | globalize" />
      </template>
      <template v-else>
        <template v-if="list.length">
          <pairs-table :pairs="list" />
        </template>
        <template v-else>
          <no-data-message
            :message="'pair-list.no-data-msg' | globalize"
          />
        </template>
      </template>
    </template>
    <template v-else>
      <loader />
    </template>

    <collection-loader
      class="pair-list__collection-loader"
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
import PairsTable from '@/vue/components/PairsTable.vue'

export default Vue.extend({
  name: 'pair-list',
  components: {
    CollectionLoader,
    Loader,
    ErrorMessage,
    NoDataMessage,
    PairsTable,
  },
  props: {
    tokenId: {
      type: String,
      default: '',
    },
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
        result = await callers.getPairs({
          ...(this.tokenId && { 'filter[token_id]': this.tokenId }),
        })
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
.pair-list__collection-loader {
  padding: toRem(16);
  border-top: toRem(1) solid var(--col-border);
}

.pair-list {
  position: relative;
  background-color: var(--col-block-bg);
  border-radius: toRem(8);
  border: toRem(1) solid var(--col-border);
}
</style>
