<template>
  <div class="app-container">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message :message="'pair-page.error-msg' | globalize" />
      </template>
      <template v-else>
        <div class="pair-page__header">
          <h1>
            {{ 'pair-page.pair-title' | globalize({
              token1: pair.token1.symbol,
              token2: pair.token2.symbol
            }) }}
          </h1>

          <div class="pair-page__links">
            <!-- eslint-disable max-len -->
            <a
              class="
                app__button-secondary
                app__button-secondary--small
                pair-page__link
              "
              target="_blank"
              :href="`${config.MOONRABBIT_SWAP_LINK}/#/add/${pair.token1.contract}/${pair.token2.contract}`"
            >
              {{ 'pair-page.add-liquidity-btn' | globalize }}
            </a>
            <a
              class="
                app__button-primary
                app__button-primary--small
                pair-page__link
              "
              target="_blank"
              :href="`${config.MOONRABBIT_SWAP_LINK}/#/swap?inputCurrency=${pair.token1.contract}&outputCurrency=${pair.token2.contract}`"
            >
              {{ 'pair-page.trade-btn' | globalize }}
            </a>
            <!-- eslint-enable max-len -->
          </div>
        </div>

        <h3 class="pair-page__block-title">
          {{ 'pair-page.pair-stats-title' | globalize }}
        </h3>

        <div class="pair-page__statistics">
          <div class="app-block">
            <p class="app-block__header-txt">
              {{ 'pair-page.total-liquidity-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ pair.liquidity | formatMoney }}
            </p>
          </div>
          <div class="app-block">
            <p class="app-block__header-txt">
              {{ 'pair-page.volume-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ pair.volume24Hours | formatMoney }}
            </p>
          </div>
          <div class="app-block">
            <p class="app-block__header-txt">
              {{ 'pair-page.fees-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ pair.fees24Hours | formatMoney }}
            </p>
          </div>
        </div>

        <h3 class="pair-page__block-title">
          {{ 'pair-page.pair-info-title' | globalize }}
        </h3>

        <div class="pair-page__pair-info app-block">
          <div>
            <p class="app-block__header-txt">
              {{ 'pair-page.name-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt">
              {{ pair.token1.symbol }}-{{ pair.token2.symbol }}
            </p>
          </div>
          <div>
            <p class="app-block__header-txt">
              {{ 'pair-page.pair-address-lbl' | globalize }}
            </p>
            <p class="app-block__value-txt pair-page__address-value">
              {{ pair.contract | cropText(6) }}
              <copy-button :copy-value="pair.contract" />
            </p>
          </div>
          <div>
            <p class="app-block__header-txt">
              {{ 'pair-page.address-lbl' | globalize({
                token: pair.token1.symbol
              }) }}
            </p>
            <p class="app-block__value-txt pair-page__address-value">
              {{ pair.token1.contract | cropText(6) }}
              <copy-button :copy-value="pair.token1.contract" />
            </p>
          </div>
          <div>
            <p class="app-block__header-txt">
              {{ 'pair-page.address-lbl' | globalize({
                token: pair.token2.symbol
              }) }}
            </p>
            <p class="app-block__value-txt pair-page__address-value">
              {{ pair.token2.contract | cropText(6) }}
              <copy-button :copy-value="pair.token2.contract" />
            </p>
          </div>
          <div>
            <!-- eslint-disable max-len -->
            <a
              class="
                app__button-secondary
                app__button-secondary--small
                pair-page__link
              "
              target="_blank"
              :href="`${config.MOONRABBIT_EXPLORER_LINK}/address/${pair.contract}`"
            >
              {{ 'pair-page.view-on-btn' | globalize }}
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
import config from '@/config'
import CopyButton from '@/vue/components/CopyButton.vue'

export default Vue.extend({
  name: 'pair-page',
  components: {
    Loader,
    ErrorMessage,
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
      pair: {},
      config,
    }
  },
  created () {
    this.loadPair()
  },
  methods: {
    async loadPair () {
      try {
        const { data } = await callers.getPair(this.id)
        this.pair = data
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
.pair-page__link {
  width: max-content;
  text-decoration: none;
}

.pair-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include respond-to(small) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.pair-page__block-title {
  margin: toRem(32) 0 toRem(10);
}

.pair-page__statistics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: toRem(20);

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
  }
}

.pair-page__pair-info {
  display: grid;
  grid-template-columns: auto auto auto auto 1fr;
  grid-gap: toRem(30);

  &:last-child {
    place-items: center end;
  }

  .app-block__value-txt {
    font-size: toRem(18);
  }

  @include respond-to(xtablet) {
   grid-template-columns: 1fr;

   &:last-child {
    place-items: start;
  }
  }
}

.pair-page__links {
  display: flex;
  gap: toRem(20);

  @include respond-to(small) {
    margin-top: toRem(20);
  }
}

.pair-page__address-value {
  display: flex;
  gap: toRem(10);
}

</style>
