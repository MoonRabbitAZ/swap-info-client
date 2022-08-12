<template>
  <div class="app-table">
    <div class="app-table__header pairs-table__header">
      <span class="app-table__header-cell pairs-table__name-cell">
        {{ 'pairs-table.name-header' | globalize }}
      </span>
      <span class="app-table__header-cell pairs-table__liqudity-cell">
        {{ 'pairs-table.liqudity-header' | globalize }}
      </span>
      <span class="app-table__header-cell pairs-table__volume-cell">
        {{ 'pairs-table.volume-header' | globalize }}
      </span>
      <span class="app-table__header-cell pairs-table__volume-7d-cell">
        {{ 'pairs-table.volume-7d-header' | globalize }}
      </span>
      <span class="app-table__header-cell pairs-table__fees-cell">
        {{ 'pairs-table.fees-header' | globalize }}
      </span>
    </div>
    <div class="app-table__body">
      <div
        class="app-table__body-row pairs-table__body-row"
        v-for="(pair, index) in pairs"
        :key="pair.id"
      >
        <span class="app-table__body-row-cell pairs-table__name-cell">
          {{ index + 1 }}
          <router-link
            class="pairs-table__pair-name-link"
            :to="{
              name: $routes.pair.name,
              params: { id: pair.id }
            }"
          >
            {{ pair.token1.symbol }}-{{ pair.token2.symbol }}
          </router-link>
        </span>
        <span class="app-table__body-row-cell pairs-table__liqudity-cell">
          {{ pair.liquidity | formatMoney }}
        </span>
        <span class="app-table__body-row-cell pairs-table__volume-cell">
          {{ pair.volume24Hours | formatMoney }}
        </span>
        <span class="app-table__body-row-cell pairs-table__volume-7d-cell">
          {{ pair.volume7Days | formatMoney }}
        </span>
        <span class="app-table__body-row-cell pairs-table__fees-cell">
          {{ pair.fees24Hours | formatMoney }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Pair } from '@/typings/pair'

export default Vue.extend({
  name: 'pairs-table',
  props: {
    pairs: {
      type: Array as PropType<Pair[]>,
      required: true,
    },
  },

})
</script>
<style lang="scss" scoped>
.pairs-table__header,
.pairs-table__body-row {
  grid-template-columns: 0.5fr 0.5fr 1fr 1fr 1fr;
  grid-template-areas: 'name liqudity volume volumeWeek fees';

  @include respond-to(medium) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: 'name liqudity volume fees';
  }
  @include respond-to(tablet) {
    grid-template-columns: toRem(100) 1fr 1fr;
    grid-template-areas: 'name liqudity volume';
  }
}

.pairs-table__pair-name-link {
  font-size: inherit;
  text-decoration: none;
  margin-left: toRem(10);
  color: var(--col-strong-cyan);

  &:hover {
    color: var(--col-pure-cyan);
  }
}

.pairs-table__name-cell {
  grid-area: name;
}

.pairs-table__liqudity-cell {
  grid-area: liqudity;
}
.pairs-table__volume-cell {
  grid-area: volume;

   @include respond-to(tablet) {
    text-align: right;
  }
}
.pairs-table__volume-7d-cell {
  grid-area: volumeWeek;

  @include respond-to(medium) {
    display: none;
  }
}
.pairs-table__fees-cell {
  grid-area: fees;

  @include respond-to(tablet) {
    display: none;
  }
}
</style>
