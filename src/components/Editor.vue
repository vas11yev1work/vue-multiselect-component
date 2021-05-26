<template>
  <div ref="vue2-editor" :class="{ 'vue2-empty': isEmpty }" class="vue2-editor">
    <input
      :readonly="readonly"
      :value="value"
      type="text"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @input="onInput"
      @keydown.delete="$emit('delete')"
    />
    <div ref="fake-text" class="fake">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    readonly: Boolean,
    isEmpty: Boolean
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
    onChange() {
      this.$nextTick(() => {
        this.$refs['vue2-editor'].style.width = `${this.$refs['fake-text'].offsetWidth}px`
      })
    }
  },
  mounted() {
    this.onChange()
  },
  watch: {
    value(v) {
      this.onChange()
      this.$emit('search-change', v)
    }
  }
}
</script>

<style lang="scss" scoped>
.vue2-editor {
  margin: 5px 5px 0 0;
  max-width: 100%;

  &.vue2-empty {
    margin: 5px 5px 0 5px;
  }

  input {
    min-height: 28px;
    font-size: 14px;
    width: 100%;
    outline: none;
    border: none;
    min-width: 15px;
    background-color: transparent;
  }

  .fake {
    font-size: 14px;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    left: -6000px;
    font-family: 'Open Sans', sans-serif;
    white-space: pre;
  }
}
</style>
