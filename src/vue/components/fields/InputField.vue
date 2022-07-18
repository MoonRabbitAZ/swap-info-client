<template>
  <div
    class="input-field"
    :class="[
      {
        'input-field--readonly': isReadonly,
        'input-field--disabled': isDisabled,
        'input-field--error': errorMessage,
      },
      scheme ? `input-field--${scheme}` : ''
    ]"
  >
    <span
      v-if="label"
      class="input-field__label"
    >
      {{ label }}
    </span>
    <div
      class="input-field__frame"
      :class="{ 'input-field__frame--focused': isFocused, }"
    >
      <input
        v-bind="$attrs"
        v-on="listeners"
        class="input-field__input"
        :type="type"
        :value="value"
        :placeholder="$attrs.placeholder || ' '"
        :tabindex="isDisabled || isReadonly
          ? -1
          : $attrs.tabindex"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
      <div
        v-if="$slots.right"
        class="input-field__dock-right"
      >
        <slot name="right" />
      </div>
    </div>
    <p v-if="errorMessage" class="input-field__err-mes">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MathUtil } from '@/ts/helpers/math-util'

const EVENTS = {
  input: 'input',
}

const INPUT_TYPES = {
  number: 'number',
}

const SCHEME = {
  secondary: 'secondary',
  default: '',
}

export default Vue.extend({
  name: 'input-field',
  props: {
    label: { type: String, default: '' },
    value: { type: [String, Number], default: undefined },
    type: { type: String, default: '' },
    errorMessage: { type: String, default: '' },
    scheme: { type: String, default: SCHEME.default },
  },

  data () {
    return {
      EVENTS,
      isFocused: false,
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: (event: Event & { target: HTMLInputElement }) => {
          this.normalizeTargetValue(event.target)
          if (this.value === event.target.value) return
          this.$emit(EVENTS.input, event.target.value)
        },
      }
    },
    isDisabled () {
      return ['disabled', true, ''].includes(this.$attrs.disabled)
    },
    isReadonly () {
      return ['readonly', true, ''].includes(this.$attrs.readonly)
    },
  },

  methods: {
    normalizeTargetValue (target: HTMLInputElement) {
      if (!target.value) return

      if (this.type === INPUT_TYPES.number) {
        const normalizeValue = this.normalizeDecimalPrecision(
          this.normalizeRange(target.value),
        )
        if (target.value !== normalizeValue) target.value = normalizeValue
      }
    },

    normalizeRange (value: string) : string {
      const max = this.$attrs.max

      let result = value
      if (max && MathUtil.compare(value, max) > 0) {
        result = max
      }

      return result
    },

    normalizeDecimalPrecision (value: string) : string {
      const step = this.$attrs.step
      if (!step) {
        return value
      }

      let precision
      try {
        precision = (step?.match(/(?:\.|,)\d+$/) || ([] as RegExpMatchArray))![0]
          ?.slice(1)?.length ?? 0
      } catch (error) {
        precision = 0
      }

      let result = value
      if (precision) {
        const decimalsLongerThanPrecisionRe =
          new RegExp(`(?:\\.|,)\\d{${precision + 1},}$`)
        if (decimalsLongerThanPrecisionRe.test(value)) {
          const truncateExtraDecimalsRe =
            new RegExp(`((?:\\.|,)\\d{${precision}})\\d*`)
          result = value.replace(truncateExtraDecimalsRe, '$1')
        }
      }

      return result
    },
  },
})
</script>

<style lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
}

.input-field__frame {
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
  border: var(--field-border);
  border-radius: var(--field-border-radius);
  padding: var(--field-padding);
  background: var(--field-bg-color);
  min-height: var(--field-min-height);
  transition: var(--field-transition-duration) ease-in;
  transition-property: border-color, box-shadow, background-color;

  .input-field--secondary & {
    border-color: transparent;
    background: var(--field-secondary-bg-color);
  }

  &--focused,
  &:hover {

    transition-timing-function: ease-out;
    border-color: var(--field-border-color-hover);

    .input-field--secondary & {
      border-color: var(--field-secondary-border-color-hover);
    }
  }

  .input-field--disabled &,
  .input-field--readonly & {
    cursor: not-allowed;
    border-color: var(--field-border-color-disabled);

    &:hover,
    &--focused {
      border-color: var(--field-border-color-disabled);
    }
  }

  .input-field--error & {
    border-color: var(--field-color-error);
  }
}

.input-field__input {
  width: 100%;
  background-color: transparent;
  font-size: var(--field-font-size);
  line-height: var(--field-line-height);
  border: none;
  color: var(--field-text-color);
  text-overflow: ellipsis;
  caret-color: var(--field-text-color);
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-appearance: none;
    margin: 0;
  }

  .input-field--disabled &,
  .input-field--readonly & {
    color: var(--field-text-color-disabled);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--field-placeholder-color);
  }
}

.input-field__label {
  font-size: var(--field-label-font-size);
  font-weight: 700;
  margin-bottom: var(--field-label-margin);
  color: var(--field-label-color);
  display: inline-flex;
}

.input-field__err-mes {
  font-size: var(--field-error-message-font-size);
  color: var(--field-color-error);
}

.input-field__dock-right {
  margin-left: toRem(4);

  & > * {
    fill: var(--field-text-color);

    .input-field--disabled &,
    .input-field--readonly & {
      color: var(--field-text-color-disabled);
      fill: var(--field-text-color-disabled);
    }
  }
}
</style>
