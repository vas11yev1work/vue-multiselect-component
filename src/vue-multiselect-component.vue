<template>
  <div :id="`vue2-multi-select-${_uid}`" class="vue2-multi-select-wrap" @click="openDropdown">
    <div :class="{ 'vue2-open': isFocused }" class="vue2-multi-select">
      <div class="vue2-value-items">
        <span v-if="!value.length && !inputValue" class="vue2-placeholder">{{ placeholder }}</span>
        <ValueItem
          v-for="item in listValue"
          :id="item"
          :key="item"
          @click="removeItem"
        >
          {{ getItem(item).label }}
        </ValueItem>
        <Editor
          key="editor"
          ref="editor"
          v-model="inputValue"
          :class="{ 'vue2-empty': !value.length }"
          :is-empty="!value.length"
          :readonly="!writable"
          @delete="onDelete"
          @focus="isFocused = true"
          @search-change="searchChange"
        />
        <span v-if="value.length > 10 && !isFocused" class="vue2-input-info">
          and {{ value.length - 10 }} more
        </span>
      </div>
      <div class="vue2-actions">
        <button
          v-if="value.length"
          class="vue2-action"
          @mouseenter="closeColor = '#f65f5f'"
          @mouseleave="closeColor = '#ccd4dd'"
          @click.stop="clearItems"
        >
          <Close :color="closeColor"/>
        </button>
        <button
          :style="{ transform: isFocused ? 'rotateX(180deg)' : 'rotateX(0)'}"
          class="vue2-action"
          @mouseenter="dropdownColor = '#9f9f9f'"
          @mouseleave="dropdownColor = '#ccd4dd'"
          @click.stop="toggleDropdown"
        >
          <Dropdown :color="dropdownColor" class="dropdown"/>
        </button>
      </div>
    </div>
    <DropdownList
      v-show="isFocused"
      :is-search="!!searchValue.trim()"
      :loading="loading"
      :options="searchItems"
      :selected="value"
      @remove="removeItem"
      @select="selectItem"
    />
  </div>
</template>

<script>
import ValueItem from './components/ValueItem'
import Editor from './components/Editor'
import Close from './components/icons/Close'
import Dropdown from './components/icons/Dropdown'
import DropdownList from './components/DropdownList'

export default {
  components: {
    ValueItem, Editor, Close, Dropdown, DropdownList
  },
  props: {
    writable: {
      type: Boolean,
      default: true
    },
    searchable: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    value: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    loading: Boolean
  },
  data() {
    return {
      inputValue: '',
      closeColor: '#ccd4dd',
      dropdownColor: '#ccd4dd',
      isFocused: false,
      searchValue: ''
    }
  },
  mounted() {
    if (typeof document !== 'undefined') {
      document.addEventListener('mouseup', this.closeDropdown)
    }
  },
  methods: {
    openDropdown() {
      this.$refs.editor.$el.querySelector('input').focus()
    },
    toggleDropdown() {
      if (this.isFocused) {
        this.closeOptions()
      } else {
        this.openDropdown()
      }
    },
    closeOptions() {
      this.isFocused = false
      this.inputValue = ''
    },
    closeDropdown(e) {
      if (!e.target.closest(`#vue2-multi-select-${this._uid}`)) {
        this.closeOptions()
      }
    },
    removeItem(id) {
      const index = this.value.findIndex(itemId => itemId === id)
      this.value.splice(index, 1)
    },
    selectItem(id) {
      this.value.push(id)
    },
    onDelete() {
      if (!this.inputValue) {
        this.value.splice(this.value.length - 1, 1)
      }
    },
    clearItems() {
      this.value.splice(0, this.value.length)
    },
    searchChange(search) {
      this.$emit('search-change', search)
      this.searchValue = search
    }
  },
  computed: {
    getItem() {
      return id => {
        return this.options.find(el => el.id === id)
      }
    },
    searchItems() {
      if (this.searchable && this.searchValue.trim() && this.options.length) {
        return this.options.filter(el => el.label.toLowerCase().includes(this.searchValue.toLowerCase()))
      }
      return this.options || []
    },
    listValue() {
      if (this.value.length > 10 && !this.isFocused) {
        return this.value.slice(0, 10)
      }
      return this.value
    }
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.closeDropdown)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

.vue2-multi-select-wrap {
  position: relative;
}

.vue2-multi-select {
  width: 100%;
  border: 1px solid #ccd4dd;
  border-radius: 5px;
  padding: 0 5px 5px 5px;
  cursor: text;
  display: flex;

  &.vue2-open {
    border-radius: 5px 5px 0 0;
  }

  .vue2-value-items {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 50px);
    position: relative;

    .vue2-transition-list {
      display: flex;
      flex-wrap: wrap;
    }

    .vue2-placeholder {
      position: absolute;
      margin-left: 5px;
      z-index: -1;
    }

    .vue2-input-info {
      cursor: pointer;
    }

    .vue2-placeholder, .vue2-input-info {
      line-height: 28px;
      margin-top: 5px;
      font-size: 14px;
      color: #a7a7a7;
      user-select: none;
    }
  }

  .vue2-actions {
    width: 50px;
    padding-top: 5px;
    display: flex;
    justify-content: flex-end;

    .vue2-action {
      height: 100%;
      width: 25px;
      border: none;
      background-color: transparent;
      border-radius: 0;
      cursor: pointer;

      .dropdown {
        width: 11px;
      }
    }
  }
}
</style>
