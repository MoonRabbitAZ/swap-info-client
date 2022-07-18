<template>
  <div class="icon">
    <eye-icon v-if="ICON_NAMES.eye === name" />
    <alert-icon v-if="ICON_NAMES.alert === name" />
    <close-icon v-if="ICON_NAMES.close === name" />
    <info-icon v-if="ICON_NAMES.info === name" />
    <checkbox-circle-icon v-if="ICON_NAMES.checkboxCircle === name" />
    <clock-icon v-if="ICON_NAMES.clock === name" />
    <copy-icon v-if="ICON_NAMES.copy === name" />
    <burger-btn-icon v-if="ICON_NAMES.burgerBtn === name" />
    <chevron-down-icon v-if="ICON_NAMES.chevronDown === name" />
    <hand-coin-icon v-if="ICON_NAMES.handCoin === name" />
    <error-icon v-if="ICON_NAMES.error === name" />
    <empty-icon v-if="ICON_NAMES.empty === name" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ICON_NAMES } from '@/ts/const/icon-names.const'
import EyeIcon from '@/vue/components/icons/EyeIcon.vue'
import AlertIcon from '@/vue/components/icons/AlertIcon.vue'
import CloseIcon from '@/vue/components/icons/CloseIcon.vue'
import ClockIcon from '@/vue/components/icons/ClockIcon.vue'
import InfoIcon from '@/vue/components/icons/InfoIcon.vue'
import CheckboxCircleIcon from '@/vue/components/icons/CheckboxCircleIcon.vue'
import CopyIcon from '@/vue/components/icons/CopyIcon.vue'
import BurgerBtnIcon from '@/vue/components/icons/BurgerBtnIcon.vue'
import ChevronDownIcon from '@/vue/components/icons/ChevronDownIcon.vue'
import HandCoinIcon from '@/vue/components/icons/HandCoinIcon.vue'
import ErrorIcon from '@/vue/components/icons/ErrorIcon.vue'
import EmptyIcon from '@/vue/components/icons/EmptyIcon.vue'

const validateIconName = (name: string) =>
  Object.values(ICON_NAMES).includes(name)

export default Vue.extend({
  name: 'icon',
  components: {
    EyeIcon,
    AlertIcon,
    CloseIcon,
    ClockIcon,
    InfoIcon,
    CheckboxCircleIcon,
    CopyIcon,
    BurgerBtnIcon,
    ChevronDownIcon,
    HandCoinIcon,
    ErrorIcon,
    EmptyIcon,
  },
  props: {
    name: { type: String, required: true, validator: validateIconName },
  },
  data () {
    return {
      ICON_NAMES,
    }
  },
})
</script>
<style lang="scss">
.icon {
  display: inline-grid;
  align-items: center;
}
</style>
