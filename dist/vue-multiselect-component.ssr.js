'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
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
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue2-value-item",
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.$emit('click', _vm.id);
      }
    }
  }, [_vm._ssrNode("<span class=\"vue2-value-item-text\" data-v-a488532c>", "</span>", [_vm._t("default")], 2), _vm._ssrNode(" <span class=\"vue2-close-icon\" data-v-a488532c>×</span>")], 2);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-a488532c_0", {
    source: ".vue2-value-item[data-v-a488532c]{user-select:none;min-height:28px;padding:3px 7px;background-color:rgba(11,149,214,.15);display:flex;justify-content:center;align-items:center;margin:5px 5px 0 0;border-radius:3px;cursor:pointer;transition:.15s}.vue2-value-item:hover .vue2-close-icon[data-v-a488532c]{color:#f65f5f}.vue2-value-item[data-v-a488532c]:hover{background-color:rgba(11,149,214,.2)}.vue2-value-item .vue2-value-item-text[data-v-a488532c]{color:#0b95d6;font-size:13px;padding-right:7px}.vue2-value-item .vue2-close-icon[data-v-a488532c]{color:#0b95d6;position:relative;padding-left:7px}.vue2-value-item .vue2-close-icon[data-v-a488532c]::before{content:\"\";width:1px;height:18px;background-color:rgba(255,255,255,.6);position:absolute;top:50%;left:0;transform:translateY(-50%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$7 = "data-v-a488532c";
/* module identifier */

var __vue_module_identifier__$7 = "data-v-a488532c";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, createInjectorSSR, undefined);//
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
    onInput: function onInput(e) {
      this.$emit('input', e.target.value);
    },
    onChange: function onChange() {
      var _this = this;

      this.$nextTick(function () {
        _this.$refs['vue2-editor'].style.width = "".concat(_this.$refs['fake-text'].offsetWidth, "px");
      });
    }
  },
  mounted: function mounted() {
    this.onChange();
  },
  watch: {
    value: function value(v) {
      this.onChange();
      this.$emit('search-change', v);
    }
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "vue2-editor",
    staticClass: "vue2-editor",
    class: {
      'vue2-empty': _vm.isEmpty
    }
  }, [_vm._ssrNode("<input" + _vm._ssrAttr("readonly", _vm.readonly) + " type=\"text\"" + _vm._ssrAttr("value", _vm.value) + " class=\"vue2-editor-input\" data-v-09827013> <div class=\"fake\" data-v-09827013>" + _vm._ssrEscape(_vm._s(_vm.value)) + "</div>")]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-09827013_0", {
    source: ".vue2-editor[data-v-09827013]{margin:5px 5px 0 0;max-width:100%}.vue2-editor.vue2-empty[data-v-09827013]{margin:5px 5px 0 5px}.vue2-editor input[data-v-09827013]{min-height:28px;font-size:14px;width:100%;outline:0;border:none;min-width:15px;background-color:transparent}.vue2-editor .fake[data-v-09827013]{font-size:14px;position:absolute;visibility:hidden;opacity:0;left:-6000px;font-family:\"Open Sans\",sans-serif;white-space:pre}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = "data-v-09827013";
/* module identifier */

var __vue_module_identifier__$6 = "data-v-09827013";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, createInjectorSSR, undefined);//
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
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
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
  }, [_vm._ssrNode("<path" + _vm._ssrAttr("stroke", _vm.color) + " d=\"M1 1L8 8M8 1L1 8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path>")]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = "data-v-4781ef59";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);//
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
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
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
  }, [_vm._ssrNode("<path" + _vm._ssrAttr("fill", _vm.color) + " d=\"M12.6777 0.699997H1.32226C0.806766 0.699997 0.531258 1.30715 0.870714 1.6951L6.54845 8.18394C6.7875 8.45714 7.2125 8.45714 7.45155 8.18394L13.1293 1.6951C13.4687 1.30715 13.1932 0.699997 12.6777 0.699997Z\"></path>")]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-946df422";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);//
//
//
//
//
//
var script$3 = {};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
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
  }, [_vm._ssrNode("<rect height=\"15\" rx=\"1.5\" stroke=\"#CCD4DD\" width=\"15\" x=\"0.5\" y=\"0.5\"></rect>")]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-6e43e227";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
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
var script$2 = {};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
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
  }, [_vm._ssrNode("<rect fill=\"#0B95D6\" height=\"16\" rx=\"2\" width=\"16\"></rect> <g clip-path=\"url(#clip0)\"><path d=\"M4.4813 6.76042L6.75313 9.19848C6.7888 9.23677 6.84756 9.23677 6.88323 9.19848L11.6622 4.06982C11.6979 4.03154 11.7567 4.03154 11.7923 4.06982L12.9741 5.33811C12.9907 5.3559 13 5.37978 13 5.40464V5.5222C13 5.54706 12.9907 5.57094 12.9741 5.58873L7.02674 11.9713C7.00965 11.9897 6.9862 12 6.96171 12H6.67465C6.65016 12 6.62671 11.9897 6.60962 11.9713L3.06199 8.1641C3.02751 8.12709 3.02751 8.06804 3.06199 8.03103L4.24597 6.76042C4.26308 6.74206 4.28653 6.73172 4.31102 6.73172H4.41625C4.44073 6.73172 4.46419 6.74206 4.4813 6.76042Z\" fill=\"white\"></path></g> <defs><clipPath id=\"clip0\"><rect fill=\"white\" height=\"8\" transform=\"translate(3 4)\" width=\"10\"></rect></clipPath></defs>")]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-5b84c906";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);//
var script$1 = {
  props: {
    options: Array,
    selected: Array,
    loading: Boolean,
    isSearch: Boolean,
    labelText: String
  },
  components: {
    CheckboxEmpty: __vue_component__$3,
    Checkbox: __vue_component__$2
  },
  computed: {
    optionsList: function optionsList() {
      var _this = this;

      if (this.isSearch) {
        return this.options.filter(function (el) {
          return !_this.selected.includes(el.id);
        });
      }

      return this.options || [];
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue2-dropdown-list"
  }, [_vm.options.length && !_vm.loading ? _vm._ssrNode("<ul class=\"vue2-list\" data-v-b5449558>", "</ul>", _vm._l(_vm.optionsList, function (item) {
    return _vm._ssrNode("<li" + _vm._ssrClass("vue2-list-item", {
      'vue2-selected': _vm.selected.includes(item.id)
    }) + " data-v-b5449558>", "</li>", [_vm._ssrNode("<div class=\"vue2-checkbox\" data-v-b5449558>", "</div>", [_c('CheckboxEmpty', {
      staticClass: "checkbox-empty"
    }), _vm._ssrNode(" "), _c('Checkbox', {
      staticClass: "checkbox"
    })], 2), _vm._ssrNode(" <span class=\"vue2-item-text\" data-v-b5449558>" + _vm._ssrEscape(_vm._s(item[_vm.labelText])) + "</span>")], 2);
  }), 0) : _vm._e(), _vm._ssrNode(" " + (_vm.loading ? "<div class=\"vue2-info\" data-v-b5449558><span class=\"vue2-info-text\" data-v-b5449558>Loading...</span></div>" : "<!---->") + " " + (!_vm.loading && !_vm.optionsList.length ? "<div class=\"vue2-info\" data-v-b5449558><span class=\"vue2-info-text\" data-v-b5449558>No content</span></div>" : "<!---->"))], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-b5449558_0", {
    source: ".vue2-dropdown-list[data-v-b5449558]{border:1px solid #ccd4dd;border-top:none;border-radius:0 0 5px 5px;padding:5px 0;max-height:235px;overflow-x:auto;background-color:#fff;position:absolute;z-index:100;left:0;right:0}.vue2-dropdown-list .vue2-list[data-v-b5449558]{list-style:none}.vue2-dropdown-list .vue2-list .vue2-list-item[data-v-b5449558]{min-height:32px;padding:4px 7px;display:flex;align-items:center;cursor:pointer}.vue2-dropdown-list .vue2-list .vue2-list-item[data-v-b5449558]:hover{background-color:rgba(11,149,214,.06)}.vue2-dropdown-list .vue2-list .vue2-list-item .vue2-item-text[data-v-b5449558]{font-size:14px}.vue2-dropdown-list .vue2-list .vue2-list-item .checkbox-empty[data-v-b5449558]{display:block;width:16px;margin-right:7px}.vue2-dropdown-list .vue2-list .vue2-list-item .checkbox[data-v-b5449558]{display:none;width:16px;margin-right:7px}.vue2-dropdown-list .vue2-list .vue2-list-item.vue2-selected .vue2-checkbox .checkbox-empty[data-v-b5449558]{display:none}.vue2-dropdown-list .vue2-list .vue2-list-item.vue2-selected .vue2-checkbox .checkbox[data-v-b5449558]{display:block}.vue2-dropdown-list .vue2-info[data-v-b5449558]{text-align:center}.vue2-dropdown-list .vue2-info .vue2-info-text[data-v-b5449558]{font-size:14px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-b5449558";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-b5449558";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);var script = {
  components: {
    ValueItem: __vue_component__$7,
    Editor: __vue_component__$6,
    Close: __vue_component__$5,
    Dropdown: __vue_component__$4,
    DropdownList: __vue_component__$1
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
    loading: Boolean,
    limit: {
      type: Number,
      default: 10
    },
    labelText: {
      type: String,
      default: 'label'
    },
    placeholderAsLabel: Boolean
  },
  data: function data() {
    return {
      inputValue: '',
      closeColor: '#ccd4dd',
      dropdownColor: '#ccd4dd',
      isOpen: false,
      searchValue: ''
    };
  },
  mounted: function mounted() {
    if (typeof document !== 'undefined') {
      document.addEventListener('mouseup', this.closeDropdown);
    }
  },
  methods: {
    searchChange: function searchChange(v) {
      this.$emit('search-change', v);
      this.searchValue = v;
    },
    openDropdown: function openDropdown() {
      this.$refs.editor.$el.querySelector('input').focus();
    },
    toggleDropdown: function toggleDropdown() {
      if (this.isOpen) {
        this.closeOptions();
      } else {
        this.openDropdown();
      }
    },
    closeOptions: function closeOptions() {
      if (this.isOpen) {
        this.$emit('close');
        this.isOpen = false;
        this.inputValue = '';
      }
    },
    openOptions: function openOptions() {
      if (!this.isOpen) {
        this.$emit('open');
        this.isOpen = true;
      }
    },
    closeDropdown: function closeDropdown(e) {
      if (!e.target.closest("#vue2-multi-select-".concat(this._uid))) {
        this.closeOptions();
      }
    },
    select: function select(id) {
      var candidate = this.options.find(function (el) {
        return el.id === id;
      });
      if (!candidate) return;
      var isSelected = !!this.internalValue.find(function (el) {
        return el === id;
      });

      if (isSelected) {
        this.removeItem(id);
      } else {
        this.selectItem(id);
      }
    },
    removeItem: function removeItem(id) {
      var index = this.internalValue.findIndex(function (itemId) {
        return itemId === id;
      });
      var newValue = this.internalValue.slice(0, index).concat(this.internalValue.slice(index + 1));
      this.$emit('input', newValue);
      this.$emit('removed', id);
    },
    selectItem: function selectItem(id) {
      var newValue = [].concat(_toConsumableArray(this.internalValue), [id]);
      this.$emit('input', newValue);
      this.$emit('selected', id);
    },
    onDelete: function onDelete() {
      if (!this.inputValue) {
        this.removeItem(this.internalValue[this.internalValue.length - 1]);
      }
    },
    clearItems: function clearItems() {
      this.$emit('input', []);
    },
    getItem: function getItem(id) {
      return this.options.find(function (el) {
        return el.id === id;
      });
    }
  },
  computed: {
    internalValue: function internalValue() {
      return this.value || [];
    },
    searchItems: function searchItems() {
      var _this = this;

      if (this.searchable && this.searchValue.trim() && this.options.length) {
        return this.options.filter(function (el) {
          return el[_this.labelText].toLowerCase().includes(_this.searchValue.toLowerCase());
        });
      }

      return this.options || [];
    },
    listValue: function listValue() {
      if (this.internalValue.length > this.limit && !this.isOpen) {
        return this.internalValue.slice(0, this.limit);
      }

      return this.internalValue;
    }
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('mouseup', this.closeDropdown);
  }
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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
  }, [_vm._ssrNode("<div" + _vm._ssrClass("vue2-multi-select", {
    'vue2-open': _vm.isOpen,
    'as-label': _vm.placeholderAsLabel
  }) + ">", "</div>", [_vm._ssrNode("<div class=\"vue2-value-items\">", "</div>", [_vm._ssrNode(((!_vm.placeholderAsLabel ? !_vm.value.length && !_vm.inputValue : true) ? "<span" + _vm._ssrClass("vue2-placeholder", {
    active: _vm.placeholderAsLabel && _vm.value.length || _vm.placeholderAsLabel && _vm.inputValue
  }) + ">" + _vm._ssrEscape("\n        " + _vm._s(_vm.placeholder) + "\n      ") + "</span>" : "<!---->") + " "), _vm._l(_vm.listValue, function (item) {
    return _c('ValueItem', {
      key: item,
      attrs: {
        "id": item
      },
      on: {
        "click": _vm.select
      }
    }, [_vm._v("\n        " + _vm._s(_vm.getItem(item)[_vm.labelText]) + "\n      ")]);
  }), _vm._ssrNode(" "), _c('Editor', {
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
      "focus": _vm.openOptions,
      "search-change": _vm.searchChange
    },
    model: {
      value: _vm.inputValue,
      callback: function callback($$v) {
        _vm.inputValue = $$v;
      },
      expression: "inputValue"
    }
  }), _vm._ssrNode(" " + (_vm.value.length > _vm.limit && !_vm.isOpen ? "<span class=\"vue2-input-info\">" + _vm._ssrEscape("\n        and " + _vm._s(_vm.value.length - _vm.limit) + " more\n      ") + "</span>" : "<!---->"))], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"vue2-actions\">", "</div>", [_vm.value.length ? _vm._ssrNode("<button class=\"vue2-action\">", "</button>", [_c('Close', {
    attrs: {
      "color": _vm.closeColor
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<button class=\"vue2-action\"" + _vm._ssrStyle(null, {
    transform: _vm.isOpen ? 'rotateX(180deg)' : 'rotateX(0)'
  }, null) + ">", "</button>", [_c('Dropdown', {
    staticClass: "dropdown",
    attrs: {
      "color": _vm.dropdownColor
    }
  })], 1)], 2)], 2), _vm._ssrNode(" "), _c('DropdownList', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isOpen,
      expression: "isOpen"
    }],
    attrs: {
      "is-search": !!_vm.searchValue.trim(),
      "loading": _vm.loading,
      "options": _vm.searchItems,
      "selected": _vm.value,
      "label-text": _vm.labelText
    },
    on: {
      "remove": _vm.select,
      "select": _vm.select
    }
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-837aafce_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-family:\"Open Sans\",sans-serif}.vue2-multi-select-wrap{position:relative}.vue2-multi-select{width:100%;border:1px solid #ccd4dd;border-radius:5px;padding:0 5px 5px 5px;cursor:text;display:flex}.vue2-multi-select.as-label{padding:3px 5px 5px 5px}.vue2-multi-select.vue2-open{border-radius:5px 5px 0 0}.vue2-multi-select .vue2-value-items{display:flex;flex-wrap:wrap;width:calc(100% - 50px);position:relative}.vue2-multi-select .vue2-value-items .vue2-transition-list{display:flex;flex-wrap:wrap}.vue2-multi-select .vue2-value-items .vue2-placeholder{position:absolute;margin-left:5px;z-index:-1;transition:.25s;top:0}.vue2-multi-select .vue2-value-items .vue2-placeholder.active{top:-17px;line-height:14px;font-size:13px;background-color:#fff;padding:0 2px;z-index:5}.vue2-multi-select .vue2-value-items .vue2-input-info{cursor:pointer}.vue2-multi-select .vue2-value-items .vue2-input-info,.vue2-multi-select .vue2-value-items .vue2-placeholder{line-height:28px;margin-top:5px;font-size:14px;color:#a7a7a7;user-select:none}.vue2-multi-select .vue2-actions{width:50px;padding-top:5px;display:flex;justify-content:flex-end}.vue2-multi-select .vue2-actions .vue2-action{height:100%;width:25px;border:none;background-color:transparent;border-radius:0;cursor:pointer}.vue2-multi-select .vue2-actions .vue2-action .dropdown{width:11px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-837aafce";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueMultiselectComponent', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;