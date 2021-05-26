<template>
  <div class="vue2-value-item" @click.stop="$emit('click', id)">
    <span class="vue2-value-item-text"><slot></slot></span>
    <span class="vue2-close-icon">&times;</span>
  </div>
</template>

<script>
export default {
  props: {
    id: [String, Number],
  }
}
</script>

<style lang="scss" scoped>
.vue2-value-item {
  user-select: none;
  min-height: 28px;
  padding: 3px 7px;
  background-color: rgba(11, 149, 214, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 5px 0 0;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    .vue2-close-icon {
      color: #f65f5f;
    }
  }

  &:hover {
    background-color: rgba(11, 149, 214, 0.2);
  }

  .vue2-value-item-text {
    color: rgb(11, 149, 214);
    font-size: 13px;
    padding-right: 7px;
  }

  .vue2-close-icon {
    color: rgb(11, 149, 214);
    position: relative;
    padding-left: 7px;

    &::before {
      content: '';
      width: 1px;
      height: 18px;
      background-color: rgba(255, 255, 255, 0.6);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
