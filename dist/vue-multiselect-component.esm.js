//
//
//
//
//
//
//
var script$7 = {
  props: {
    id: [String, Number]
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue2-value-item",
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.$emit('click', _vm.id);
      }
    }
  }, [_c('span', {
    staticClass: "vue2-value-item-text"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('span', {
    staticClass: "vue2-close-icon"
  }, [_vm._v("×")])]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = function (inject) {
  if (!inject) return;
  inject("data-v-a488532c_0", {
    source: ".vue2-value-item[data-v-a488532c]{user-select:none;min-height:28px;padding:3px 7px;background-color:rgba(11,149,214,.15);display:flex;justify-content:center;align-items:center;margin:5px 5px 0 0;border-radius:3px;cursor:pointer;transition:.15s}.vue2-value-item:hover .vue2-close-icon[data-v-a488532c]{color:#f65f5f}.vue2-value-item[data-v-a488532c]:hover{background-color:rgba(11,149,214,.2)}.vue2-value-item .vue2-value-item-text[data-v-a488532c]{color:#0b95d6;font-size:13px;padding-right:7px}.vue2-value-item .vue2-close-icon[data-v-a488532c]{color:#0b95d6;position:relative;padding-left:7px}.vue2-value-item .vue2-close-icon[data-v-a488532c]::before{content:\"\";width:1px;height:18px;background-color:rgba(255,255,255,.6);position:absolute;top:50%;left:0;transform:translateY(-50%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$7 = "data-v-a488532c";
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$6 = {
  props: {
    value: {
      type: String,
      default: ''
    },
    readonly: Boolean,
    isEmpty: Boolean
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },

    onChange() {
      this.$nextTick(() => {
        this.$refs['vue2-editor'].style.width = `${this.$refs['fake-text'].offsetWidth}px`;
      });
    }

  },

  mounted() {
    this.onChange();
  },

  watch: {
    value(v) {
      this.onChange();
      this.$emit('search-change', v);
    }

  }
};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "vue2-editor",
    staticClass: "vue2-editor",
    class: {
      'vue2-empty': _vm.isEmpty
    }
  }, [_c('input', {
    attrs: {
      "readonly": _vm.readonly,
      "type": "text"
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "blur": function ($event) {
        return _vm.$emit('blur');
      },
      "focus": function ($event) {
        return _vm.$emit('focus');
      },
      "input": _vm.onInput,
      "keydown": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) {
          return null;
        }

        return _vm.$emit('delete');
      }
    }
  }), _vm._v(" "), _c('div', {
    ref: "fake-text",
    staticClass: "fake"
  }, [_vm._v(_vm._s(_vm.value))])]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-371dfa72_0", {
    source: ".vue2-editor[data-v-371dfa72]{margin:5px 5px 0 0;max-width:100%}.vue2-editor.vue2-empty[data-v-371dfa72]{margin:5px 5px 0 5px}.vue2-editor input[data-v-371dfa72]{min-height:28px;font-size:14px;width:100%;outline:0;border:none;min-width:15px;background-color:transparent}.vue2-editor .fake[data-v-371dfa72]{font-size:14px;position:absolute;visibility:hidden;opacity:0;left:-6000px;font-family:\"Open Sans\",sans-serif;white-space:pre}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$6 = "data-v-371dfa72";
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

//
//
//
//
//
//
var script$5 = {
  props: {
    color: {
      type: String,
      default: '#000000'
    }
  }
};

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "fill": "none",
      "height": "9",
      "viewBox": "0 0 9 9",
      "width": "9",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "stroke": _vm.color,
      "d": "M1 1L8 8M8 1L1 8",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }
  })]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = undefined;
/* scoped */

const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
var script$4 = {
  props: {
    color: {
      type: String,
      default: '#ec5959'
    }
  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "fill": "none",
      "height": "9",
      "viewBox": "0 0 14 9",
      "width": "14",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "fill": _vm.color,
      "d": "M12.6777 0.699997H1.32226C0.806766 0.699997 0.531258 1.30715 0.870714 1.6951L6.54845 8.18394C6.7875 8.45714 7.2125 8.45714 7.45155 8.18394L13.1293 1.6951C13.4687 1.30715 13.1932 0.699997 12.6777 0.699997Z"
    }
  })]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

//
//
//
//
//
//
var script$3 = {};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "fill": "none",
      "height": "16",
      "viewBox": "0 0 16 16",
      "width": "16",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('rect', {
    attrs: {
      "height": "15",
      "rx": "1.5",
      "stroke": "#CCD4DD",
      "width": "15",
      "x": "0.5",
      "y": "0.5"
    }
  })]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "fill": "none",
      "height": "16",
      "viewBox": "0 0 16 16",
      "width": "16",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('rect', {
    attrs: {
      "fill": "#0B95D6",
      "height": "16",
      "rx": "2",
      "width": "16"
    }
  }), _vm._v(" "), _c('g', {
    attrs: {
      "clip-path": "url(#clip0)"
    }
  }, [_c('path', {
    attrs: {
      "d": "M4.4813 6.76042L6.75313 9.19848C6.7888 9.23677 6.84756 9.23677 6.88323 9.19848L11.6622 4.06982C11.6979 4.03154 11.7567 4.03154 11.7923 4.06982L12.9741 5.33811C12.9907 5.3559 13 5.37978 13 5.40464V5.5222C13 5.54706 12.9907 5.57094 12.9741 5.58873L7.02674 11.9713C7.00965 11.9897 6.9862 12 6.96171 12H6.67465C6.65016 12 6.62671 11.9897 6.60962 11.9713L3.06199 8.1641C3.02751 8.12709 3.02751 8.06804 3.06199 8.03103L4.24597 6.76042C4.26308 6.74206 4.28653 6.73172 4.31102 6.73172H4.41625C4.44073 6.73172 4.46419 6.74206 4.4813 6.76042Z",
      "fill": "white"
    }
  })]), _vm._v(" "), _c('defs', [_c('clipPath', {
    attrs: {
      "id": "clip0"
    }
  }, [_c('rect', {
    attrs: {
      "fill": "white",
      "height": "8",
      "transform": "translate(3 4)",
      "width": "10"
    }
  })])])]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
var script$1 = {
  props: {
    options: Array,
    selected: Array,
    loading: Boolean,
    isSearch: Boolean
  },
  components: {
    CheckboxEmpty: __vue_component__$3,
    Checkbox: __vue_component__$2
  },
  computed: {
    optionsList() {
      if (this.isSearch) {
        return this.options.filter(el => !this.selected.includes(el.id));
      }

      return this.options || [];
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue2-dropdown-list"
  }, [_vm.options.length && !_vm.loading ? _c('ul', {
    staticClass: "vue2-list"
  }, _vm._l(_vm.optionsList, function (item) {
    return _c('li', {
      key: item.id,
      staticClass: "vue2-list-item",
      class: {
        'vue2-selected': _vm.selected.includes(item.id)
      },
      on: {
        "click": function ($event) {
          _vm.selected.includes(item.id) ? _vm.$emit('remove', item.id) : _vm.$emit('select', item.id);
        }
      }
    }, [_c('div', {
      staticClass: "vue2-checkbox"
    }, [_c('CheckboxEmpty', {
      staticClass: "checkbox-empty"
    }), _vm._v(" "), _c('Checkbox', {
      staticClass: "checkbox"
    })], 1), _vm._v(" "), _c('span', {
      staticClass: "vue2-item-text"
    }, [_vm._v(_vm._s(item.label))])]);
  }), 0) : _vm._e(), _vm._v(" "), _vm.loading ? _c('div', {
    staticClass: "vue2-info"
  }, [_c('span', {
    staticClass: "vue2-info-text"
  }, [_vm._v("Loading...")])]) : _vm._e()]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-ddf2e6b0_0", {
    source: ".vue2-dropdown-list[data-v-ddf2e6b0]{border:1px solid #ccd4dd;border-top:none;border-radius:0 0 5px 5px;padding:5px 0;max-height:235px;overflow-x:auto;background-color:#fff;position:absolute;left:0;right:0}.vue2-dropdown-list .vue2-list[data-v-ddf2e6b0]{list-style:none}.vue2-dropdown-list .vue2-list .vue2-list-item[data-v-ddf2e6b0]{min-height:32px;padding:4px 7px;display:flex;align-items:center;cursor:pointer}.vue2-dropdown-list .vue2-list .vue2-list-item[data-v-ddf2e6b0]:hover{background-color:rgba(11,149,214,.06)}.vue2-dropdown-list .vue2-list .vue2-list-item .vue2-item-text[data-v-ddf2e6b0]{font-size:14px}.vue2-dropdown-list .vue2-list .vue2-list-item .checkbox-empty[data-v-ddf2e6b0]{display:block;width:16px;margin-right:7px}.vue2-dropdown-list .vue2-list .vue2-list-item .checkbox[data-v-ddf2e6b0]{display:none;width:16px;margin-right:7px}.vue2-dropdown-list .vue2-list .vue2-list-item.vue2-selected .vue2-checkbox .checkbox-empty[data-v-ddf2e6b0]{display:none}.vue2-dropdown-list .vue2-list .vue2-list-item.vue2-selected .vue2-checkbox .checkbox[data-v-ddf2e6b0]{display:block}.vue2-dropdown-list .vue2-info[data-v-ddf2e6b0]{text-align:center}.vue2-dropdown-list .vue2-info .vue2-info-text[data-v-ddf2e6b0]{font-size:14px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-ddf2e6b0";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
var script = {
  components: {
    ValueItem: __vue_component__$7,
    Editor: __vue_component__$6,
    Close: __vue_component__$5,
    Dropdown: __vue_component__$4,
    DropdownList: __vue_component__$1
  },
  props: {
    writable: Boolean,
    searchable: Boolean,
    placeholder: String,
    value: Array,
    options: Array,
    loading: Boolean
  },

  data() {
    return {
      inputValue: '',
      closeColor: '#ccd4dd',
      dropdownColor: '#ccd4dd',
      isFocused: false,
      searchValue: ''
    };
  },

  mounted() {
    if (typeof document !== 'undefined') {
      document.addEventListener('mouseup', this.closeDropdown);
    }
  },

  methods: {
    openDropdown() {
      this.$refs.editor.$el.querySelector('input').focus();
    },

    closeDropdown(e) {
      if (!e.target.closest(`#vue2-multi-select-${this._uid}`)) {
        this.isFocused = false;
        this.inputValue = '';
      }
    },

    removeItem(id) {
      const index = this.value.findIndex(itemId => itemId === id);
      this.value.splice(index, 1);
    },

    selectItem(id) {
      this.value.push(id);
    },

    onDelete() {
      if (!this.inputValue) {
        this.value.splice(this.value.length - 1, 1);
      }
    },

    clearItems() {
      this.value.splice(0, this.value.length);
    },

    searchChange(search) {
      this.$emit('search-change', search);
      this.searchValue = search;
    }

  },
  computed: {
    getItem() {
      return id => {
        return this.options.find(el => el.id === id);
      };
    },

    searchItems() {
      if (this.searchable && this.searchValue.trim() && this.options.length) {
        return this.options.filter(el => el.label.toLowerCase().includes(this.searchValue.toLowerCase()));
      }

      return this.options || [];
    },

    listValue() {
      if (this.value.length > 10 && !this.isFocused) {
        return this.value.slice(0, 10);
      }

      return this.value;
    }

  },

  beforeDestroy() {
    document.removeEventListener('mouseup', this.closeDropdown);
  }

};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue2-multi-select-wrap",
    attrs: {
      "id": "vue2-multi-select-" + _vm._uid
    },
    on: {
      "click": _vm.openDropdown
    }
  }, [_c('div', {
    staticClass: "vue2-multi-select",
    class: {
      'vue2-open': _vm.isFocused
    }
  }, [_c('div', {
    staticClass: "vue2-value-items"
  }, [!_vm.value.length && !_vm.inputValue ? _c('span', {
    staticClass: "vue2-placeholder"
  }, [_vm._v(_vm._s(_vm.placeholder))]) : _vm._e(), _vm._v(" "), _vm._l(_vm.listValue, function (item) {
    return _c('ValueItem', {
      key: item,
      attrs: {
        "id": item
      },
      on: {
        "click": _vm.removeItem
      }
    }, [_vm._v("\n        " + _vm._s(_vm.getItem(item).label) + "\n      ")]);
  }), _vm._v(" "), _c('Editor', {
    key: "editor",
    ref: "editor",
    class: {
      'vue2-empty': !_vm.value.length
    },
    attrs: {
      "is-empty": !_vm.value.length,
      "readonly": !_vm.writable
    },
    on: {
      "delete": _vm.onDelete,
      "focus": function ($event) {
        _vm.isFocused = true;
      },
      "search-change": _vm.searchChange
    },
    model: {
      value: _vm.inputValue,
      callback: function ($$v) {
        _vm.inputValue = $$v;
      },
      expression: "inputValue"
    }
  }), _vm._v(" "), _vm.value.length > 10 && !_vm.isFocused ? _c('span', {
    staticClass: "vue2-input-info"
  }, [_vm._v("\n        and " + _vm._s(_vm.value.length - 10) + " more\n      ")]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "vue2-actions"
  }, [_vm.value.length ? _c('button', {
    staticClass: "vue2-action",
    on: {
      "mouseenter": function ($event) {
        _vm.closeColor = '#f65f5f';
      },
      "mouseleave": function ($event) {
        _vm.closeColor = '#ccd4dd';
      },
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.clearItems($event);
      }
    }
  }, [_c('Close', {
    attrs: {
      "color": _vm.closeColor
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "vue2-action",
    style: {
      transform: _vm.isFocused ? 'rotateX(180deg)' : 'rotateX(0)'
    },
    on: {
      "mouseenter": function ($event) {
        _vm.dropdownColor = '#9f9f9f';
      },
      "mouseleave": function ($event) {
        _vm.dropdownColor = '#ccd4dd';
      },
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.openDropdown($event);
      }
    }
  }, [_c('Dropdown', {
    staticClass: "dropdown",
    attrs: {
      "color": _vm.dropdownColor
    }
  })], 1)])]), _vm._v(" "), _c('DropdownList', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isFocused,
      expression: "isFocused"
    }],
    attrs: {
      "is-search": !!_vm.searchValue.trim(),
      "loading": _vm.loading,
      "options": _vm.searchItems,
      "selected": _vm.value
    },
    on: {
      "remove": _vm.removeItem,
      "select": _vm.selectItem
    }
  })], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-0e8905ce_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-family:\"Open Sans\",sans-serif}.vue2-multi-select-wrap{position:relative}.vue2-multi-select{width:100%;border:1px solid #ccd4dd;border-radius:5px;padding:0 5px 5px 5px;cursor:text;display:flex}.vue2-multi-select.vue2-open{border-radius:5px 5px 0 0}.vue2-multi-select .vue2-value-items{display:flex;flex-wrap:wrap;width:calc(100% - 50px);position:relative}.vue2-multi-select .vue2-value-items .vue2-transition-list{display:flex;flex-wrap:wrap}.vue2-multi-select .vue2-value-items .vue2-placeholder{position:absolute;margin-left:5px;z-index:-1}.vue2-multi-select .vue2-value-items .vue2-input-info{cursor:pointer}.vue2-multi-select .vue2-value-items .vue2-input-info,.vue2-multi-select .vue2-value-items .vue2-placeholder{line-height:28px;margin-top:5px;font-size:14px;color:#a7a7a7;user-select:none}.vue2-multi-select .vue2-actions{width:50px;padding-top:5px;display:flex;justify-content:flex-end}.vue2-multi-select .vue2-actions .vue2-action{height:100%;width:25px;border:none;background-color:transparent;border-radius:0;cursor:pointer}.vue2-multi-select .vue2-actions .vue2-action .dropdown{width:11px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueMultiselectComponent', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
