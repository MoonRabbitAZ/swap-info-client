<template>
  <div class="app-table">
    <div class="app-table__header tokens-table__header">
      <span class="app-table__header-cell tokens-table__name-cell">
        {{ 'tokens-table.name-header' | globalize }}
      </span>
      <span class="app-table__header-cell tokens-table__symbol-cell">
        {{ 'tokens-table.symbol-header' | globalize }}
      </span>
      <span class="app-table__header-cell tokens-table__liqudity-cell">
        {{ 'tokens-table.liqudity-header' | globalize }}
      </span>
      <span class="app-table__header-cell tokens-table__volume-cell">
        {{ 'tokens-table.volume-header' | globalize }}
      </span>
      <span class="app-table__header-cell tokens-table__price-cell">
        {{ 'tokens-table.price-header' | globalize }}
      </span>
      <span class="app-table__header-cell tokens-table__price-change-cell">
        {{ 'tokens-table.price-change-header' | globalize }}
      </span>
    </div>
    <div class="app-table__body">
      <div
        class="app-table__body-row tokens-table__body-row"
        v-for="(token, index) in tokens"
        :key="token.id"
      >
        <span class="app-table__body-row-cell tokens-table__name-cell">
          {{ index + 1 }}
          <router-link
            class="tokens-table__token-name-link"
            :to="{
              name: $routes.token.name,
              params: { id: token.id }
            }"
          >
            {{ token.name }}
          </router-link>
        </span>
        <span class="app-table__body-row-cell tokens-table__symbol-cell">
          {{ token.symbol }}
        </span>
        <span class="app-table__body-row-cell tokens-table__liquidity-cell">
          {{ token.liquidity | formatMoney }}
        </span>
        <span class="app-table__body-row-cell tokens-table__volume-cell">
          {{ token.volume24Hours | formatMoney }}
        </span>
        <span class="app-table__body-row-cell tokens-table__price-cell">
          {{ token.price | formatMoney }}
        </span>
        <span class="app-table__body-row-cell tokens-table__price-change-cell">
          {{ token.priceChange24Hours | formatPercent }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Token } from '@/typings/token'

export default Vue.extend({
  name: 'tokens-table',
  props: {
    tokens: {
      type: Array as PropType<Token[]>,
      required: true,
    },
  },

})
</script>
<style lang="scss" scoped>
.tokens-table__header,
.tokens-table__body-row {
  display: grid;
  grid-template-columns: 1.5fr 0.6fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'name symbol liquidity volume price change';

  @include respond-to(medium) {
    grid-template-columns: toRem(180) 1fr 1fr 1fr;
    grid-template-areas: 'name symbol liquidity volume';
  }
  @include respond-to(tablet) {
    grid-template-columns: toRem(100) 1fr 1fr;
    grid-template-areas: 'name liquidity volume';
  }
}

.tokens-table__token-name-link {
  font-size: inherit;
  text-decoration: none;
  margin-left: toRem(10);
  color: var(--col-strong-cyan);

  &:hover {
    color: var(--col-pure-cyan);
  }
}

.tokens-table__name-cell {
  grid-area: name;
}

.tokens-table__symbol-cell {
  grid-area: symbol;

  @include respond-to(tablet) {
    display: none;
  }
}

.tokens-table__liquidity-cell {
  grid-area: liquidity;
}

.tokens-table__volume-cell {
  grid-area: volume;

  @include respond-to(tablet) {
    text-align: right;
  }
}

.tokens-table__price-cell {
  grid-area: price;

  @include respond-to(medium) {
    display: none;
  }
}

.tokens-table__price-change-cell {
  grid-area: change;

  @include respond-to(medium) {
    display: none;
  }
}
</style>
