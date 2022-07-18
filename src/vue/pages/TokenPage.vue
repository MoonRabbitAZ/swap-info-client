<template>
  <div class="app-container">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message
          class="token-page__error"
          :message="'token-page.error-msg' | globalize"
        />
      </template>
      <template v-else>
        <div class="token-page__header">
          <h1>{{ token.name }} ({{ token.symbol }})</h1>

          <div class="token-page__links">
            <!-- eslint-disable max-len -->
            <a
              class="
                app__button-secondary
                app__button-secondary--small
                token-page__link
              "
              target="_blank"
              :href="`${config.MOONRABBIT_SWAP_LINK}/#/add/${token.contract}/AAA`"
            >
              {{ 'token-page.add-liquidity-btn' | globalize }}
            </a>
            <a
              class="
                app__button-primary
                app__button-primary--small
                token-page__link
              "
              target="_blank"
              :href="`${config.MOONRABBIT_SWAP_LINK}/#/swap?inputCurrency=${token.contract}`"
            >
              {{ 'token-page.trade-btn' | globalize }}
            </a>
            <!-- eslint-enable max-len -->
          </div>
        </div>

        <h3 class="token-page__block-title">
          {{ 'token-page.token-stats-title' | globalize }}
        </h3>

        <div class="token-page__statistics">
          <div class="app-block">
            <p class="app-block__header-txt">
              {{ 'token-page.total-liquidity-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ token.liquidity | formatMoney }}
            </p>
          </div>
          <div class="app-block">
            <p class="app-block__header-txt">
              {{ 'token-page.volume-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ token.volume24Hours | formatMoney }}
            </p>
          </div>
          <div class="app-block">
            <p class="app-block__header-txt">
              {{ 'token-page.transactions-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ token.transactionsNumber | formatNumber }}
            </p>
          </div>
        </div>

        <h3 class="token-page__block-title">
          {{ 'token-page.top-pairs-title' | globalize }}
        </h3>
        <pair-list :token-id="id" />

        <h3 class="token-page__block-title">
          {{ 'token-page.token-info-title' | globalize }}
        </h3>

        <div class="token-page__token-info app-block">
          <div>
            <p class="app-block__header-txt">
              {{ 'token-page.symbol-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ token.symbol }}
            </p>
          </div>
          <div>
            <p class="app-block__header-txt">
              {{ 'token-page.name-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ token.name }}
            </p>
          </div>
          <div>
            <p class="app-block__header-txt">
              {{ 'token-page.address-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt token-page__address-value">
              {{ token.contract | cropText(6) }}
              <copy-button :copy-value="token.contract" />
            </p>
          </div>
          <div>
            <!-- eslint-disable max-len -->
            <a
              class="
                app__button-secondary
                app__button-secondary--small
                token-page__link
              "
              target="_blank"
              :href="`${config.MOONRABBIT_EXPLORER_LINK}/address/${token.contract}`"
            >
              {{ 'token-page.view-on-btn' | globalize }}
            </a>
            <!-- eslint-enable max-len -->
          </div>
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
import PairList from '@/vue/components/PairList.vue'
import config from '@/config'
import CopyButton from '@/vue/components/CopyButton.vue'

export default Vue.extend({
  name: 'token-page',
  components: {
    Loader,
    ErrorMessage,
    PairList,
    CopyButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      isLoaded: false,
      isLoadFailed: false,
      token: {},
      config,
    }
  },
  created () {
    this.loadToken()
  },
  methods: {
    async loadToken () {
      try {
        const { data } = await callers.getToken(this.id)
        this.token = data
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
.token-page__link {
  width: max-content;
  text-decoration: none;
}

.token-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include respond-to(small) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.token-page__block-title {
  margin: toRem(32) 0 toRem(10);
}

.token-page__statistics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: toRem(20);

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
  }
}

.token-page__token-info {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-gap: toRem(30);

  &:last-child {
    place-items: center end;
  }

  @include respond-to(xtablet) {
   grid-template-columns: 1fr;

   &:last-child {
    place-items: start;
  }
  }
}

.token-page__links {
  display: flex;
  gap: toRem(20);

  @include respond-to(small) {
    margin-top: toRem(20);
  }
}

.token-page__address-value {
  display: flex;
  gap: toRem(10);
}

.token-page__error {
  background-color: var(--col-block-bg);
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--col-border);
}
</style>
