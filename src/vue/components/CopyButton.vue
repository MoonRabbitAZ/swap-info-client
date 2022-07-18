<template>
  <div class="copy-button">
    <icon
      class="copy-button__icon"
      :name="isShowCopiedIcon ? 'checkbox-circle' : 'copy'"
      @click.native="copyLink(copyValue)"
    />
  </div>
</template>

<script>
import Icon from '@/vue/components/Icon'

export default {
  name: 'copy-button',

  components: {
    Icon,
  },

  props: {
    copyValue: {
      type: String,
      required: true,
    },
  },

  data: _ => ({
    isShowCopiedIcon: false,
  }),

  methods: {
    async copyLink (link) {
      this.isShowCopiedIcon = true
      await navigator.clipboard.writeText(link)

      setTimeout(() => {
        this.isShowCopiedIcon = false
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
.copy-button {
  position: relative;
}

.copy-button__icon {
  width: toRem(14);
  height: toRem(14);
  fill: var(--col-primary);
  cursor: pointer;
}
</style>
