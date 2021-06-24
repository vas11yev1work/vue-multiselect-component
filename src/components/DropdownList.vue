<template>
  <div class="vue2-dropdown-list">
    <ul v-if="options.length && !loading" class="vue2-list">
      <li
        v-for="item in optionsList"
        :key="item.id"
        :class="{ 'vue2-selected': selected.includes(item.id) }"
        class="vue2-list-item"
        @click="selected.includes(item.id) ? $emit('remove', item.id) : $emit('select', item.id)"
      >
        <div class="vue2-checkbox">
          <CheckboxEmpty class="checkbox-empty"/>
          <Checkbox class="checkbox"/>
        </div>
        <span class="vue2-item-text">{{ item[labelText] }}</span>
      </li>
    </ul>
    <div v-if="loading" class="vue2-info">
      <span class="vue2-info-text">Loading...</span>
    </div>
    <div v-if="!loading && !optionsList.length" class="vue2-info">
      <span class="vue2-info-text">No content</span>
    </div>
  </div>
</template>

<script>
import CheckboxEmpty from './icons/CheckboxEmpty'
import Checkbox from './icons/Checkbox'

export default {
  props: {
    options: Array,
    selected: Array,
    loading: Boolean,
    isSearch: Boolean,
    labelText: String
  },
  components: {
    CheckboxEmpty, Checkbox
  },
  computed: {
    optionsList() {
      if (this.isSearch) {
        return this.options.filter(el => !this.selected.includes(el.id))
      }
      return this.options || []
    }
  }
}
</script>

<style lang="scss" scoped>
.vue2-dropdown-list {
  border: 1px solid #ccd4dd;
  border-top: none;
  border-radius: 0 0 5px 5px;
  padding: 5px 0;
  max-height: 235px;
  overflow-x: auto;
  background-color: #ffffff;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;

  .vue2-list {
    list-style: none;

    .vue2-list-item {
      min-height: 32px;
      padding: 4px 7px;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: rgba(11, 149, 214, 0.06);
      }

      .vue2-item-text {
        font-size: 14px;
      }

      .checkbox-empty {
        display: block;
        width: 16px;
        margin-right: 7px;
      }

      .checkbox {
        display: none;
        width: 16px;
        margin-right: 7px;
      }

      &.vue2-selected {
        .vue2-checkbox {
          .checkbox-empty {
            display: none;
          }

          .checkbox {
            display: block;
          }
        }
      }
    }
  }

  .vue2-info {
    text-align: center;

    .vue2-info-text {
      font-size: 14px;
    }
  }
}
</style>
