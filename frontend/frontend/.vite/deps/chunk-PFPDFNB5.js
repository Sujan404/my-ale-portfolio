import {
  script
} from "./chunk-GK6O4KBZ.js";
import {
  BaseStyle
} from "./chunk-6PVJNQTO.js";
import {
  isEmpty,
  isNotEmpty
} from "./chunk-3H4X4HWQ.js";
import {
  createElementBlock,
  createTextVNode,
  mergeProps,
  openBlock,
  renderSlot,
  toDisplayString
} from "./chunk-IJV5NOMV.js";

// node_modules/primevue/badge/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-badge {\n    display: inline-flex;\n    border-radius: ".concat(dt("badge.border.radius"), ";\n    align-items: center;\n    justify-content: center;\n    padding: ").concat(dt("badge.padding"), ";\n    background: ").concat(dt("badge.primary.background"), ";\n    color: ").concat(dt("badge.primary.color"), ";\n    font-size: ").concat(dt("badge.font.size"), ";\n    font-weight: ").concat(dt("badge.font.weight"), ";\n    min-width: ").concat(dt("badge.min.width"), ";\n    height: ").concat(dt("badge.height"), ";\n}\n\n.p-badge-dot {\n    width: ").concat(dt("badge.dot.size"), ";\n    min-width: ").concat(dt("badge.dot.size"), ";\n    height: ").concat(dt("badge.dot.size"), ";\n    border-radius: 50%;\n    padding: 0;\n}\n\n.p-badge-circle {\n    padding: 0;\n    border-radius: 50%;\n}\n\n.p-badge-secondary {\n    background: ").concat(dt("badge.secondary.background"), ";\n    color: ").concat(dt("badge.secondary.color"), ";\n}\n\n.p-badge-success {\n    background: ").concat(dt("badge.success.background"), ";\n    color: ").concat(dt("badge.success.color"), ";\n}\n\n.p-badge-info {\n    background: ").concat(dt("badge.info.background"), ";\n    color: ").concat(dt("badge.info.color"), ";\n}\n\n.p-badge-warn {\n    background: ").concat(dt("badge.warn.background"), ";\n    color: ").concat(dt("badge.warn.color"), ";\n}\n\n.p-badge-danger {\n    background: ").concat(dt("badge.danger.background"), ";\n    color: ").concat(dt("badge.danger.color"), ";\n}\n\n.p-badge-contrast {\n    background: ").concat(dt("badge.contrast.background"), ";\n    color: ").concat(dt("badge.contrast.color"), ";\n}\n\n.p-badge-sm {\n    font-size: ").concat(dt("badge.sm.font.size"), ";\n    min-width: ").concat(dt("badge.sm.min.width"), ";\n    height: ").concat(dt("badge.sm.height"), ";\n}\n\n.p-badge-lg {\n    font-size: ").concat(dt("badge.lg.font.size"), ";\n    min-width: ").concat(dt("badge.lg.min.width"), ";\n    height: ").concat(dt("badge.lg.height"), ";\n}\n\n.p-badge-xl {\n    font-size: ").concat(dt("badge.xl.font.size"), ";\n    min-width: ").concat(dt("badge.xl.min.width"), ";\n    height: ").concat(dt("badge.xl.height"), ";\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var props = _ref2.props, instance = _ref2.instance;
    return ["p-badge p-component", {
      "p-badge-circle": isNotEmpty(props.value) && String(props.value).length === 1,
      "p-badge-dot": isEmpty(props.value) && !instance.$slots["default"],
      "p-badge-sm": props.size === "small",
      "p-badge-lg": props.size === "large",
      "p-badge-xl": props.size === "xlarge",
      "p-badge-info": props.severity === "info",
      "p-badge-success": props.severity === "success",
      "p-badge-warn": props.severity === "warn",
      "p-badge-danger": props.severity === "danger",
      "p-badge-secondary": props.severity === "secondary",
      "p-badge-contrast": props.severity === "contrast"
    }];
  }
};
var BadgeStyle = BaseStyle.extend({
  name: "badge",
  theme,
  classes
});

// node_modules/primevue/badge/index.mjs
var script$1 = {
  name: "BaseBadge",
  "extends": script,
  props: {
    value: {
      type: [String, Number],
      "default": null
    },
    severity: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    }
  },
  style: BadgeStyle,
  provide: function provide() {
    return {
      $pcBadge: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Badge",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [createTextVNode(toDisplayString(_ctx.value), 1)];
  })], 16);
}
script2.render = render;

export {
  BadgeStyle,
  script2 as script
};
//# sourceMappingURL=chunk-PFPDFNB5.js.map
