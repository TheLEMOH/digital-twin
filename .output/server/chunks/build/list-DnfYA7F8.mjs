import { defineComponent, shallowRef, withAsyncContext, mergeProps, unref, withCtx, createVNode, useSlots, computed, renderSlot, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, ref, isRef, useTemplateRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useForwardPropsEmits, AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent, Primitive } from 'reka-ui';
import { reactivePick, useVModel } from '@vueuse/core';
import { u as useHead, _ as _export_sfc, b as useAppConfig, c as useComponentUI, t as tv, g as get, d as _sfc_main$e, j as useRouter, k as _sfc_main$9, e as useFormField, f as useFieldGroup, h as useComponentIcons, i as _sfc_main$c, a as __nuxt_component_0$1, l as looseToNumber } from './server.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { d as dataService, a as dataServiceProfiler, _ as _sfc_main$2$1, b as _sfc_main$1$1, c as colorer, e as _sfc_main$8 } from './registerProfiler-CNKjU182.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';

const theme$1 = {
  "slots": {
    "root": "w-full",
    "item": "border-b border-default last:border-b-0",
    "header": "flex",
    "trigger": "group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0",
    "content": "data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none",
    "body": "text-sm pb-3.5",
    "leadingIcon": "shrink-0 size-5",
    "trailingIcon": "shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200",
    "label": "text-start break-words"
  },
  "variants": {
    "disabled": {
      "true": {
        "trigger": "cursor-not-allowed opacity-75"
      }
    }
  }
};
const _sfc_main$7 = {
  __name: "UAccordion",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    trailingIcon: { type: null, required: false },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    collapsible: { type: Boolean, required: false, default: true },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    type: { type: String, required: false, default: "single" },
    disabled: { type: Boolean, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("accordion", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "collapsible", "defaultValue", "disabled", "modelValue", "unmountOnHide"), emits);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.accordion || {} })({
      disabled: props.disabled
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionRoot), mergeProps(unref(rootProps), {
        type: __props.type,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.items, (item, index) => {
              _push2(ssrRenderComponent(unref(AccordionItem), {
                key: index,
                value: unref(get)(item, props.valueKey) ?? String(index),
                disabled: item.disabled,
                "data-slot": "item",
                class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item, item.class] })
              }, {
                default: withCtx(({ open }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(AccordionHeader), {
                      as: "div",
                      "data-slot": "header",
                      class: ui.value.header({ class: [unref(uiProp)?.header, item.ui?.header] })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AccordionTrigger), {
                            "data-slot": "trigger",
                            class: ui.value.trigger({ class: [unref(uiProp)?.trigger, item.ui?.trigger], disabled: item.disabled })
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderSlot(_ctx.$slots, "leading", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => {
                                  if (item.icon) {
                                    _push5(ssrRenderComponent(_sfc_main$e, {
                                      name: item.icon,
                                      "data-slot": "leadingIcon",
                                      class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                }, _push5, _parent5, _scopeId4);
                                if (unref(get)(item, props.labelKey) || !!slots.default) {
                                  _push5(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] }))}"${_scopeId4}>`);
                                  ssrRenderSlot(_ctx.$slots, "default", {
                                    item,
                                    index,
                                    open
                                  }, () => {
                                    _push5(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                  }, _push5, _parent5, _scopeId4);
                                  _push5(`</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                ssrRenderSlot(_ctx.$slots, "trailing", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => {
                                  _push5(ssrRenderComponent(_sfc_main$e, {
                                    name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                    "data-slot": "trailingIcon",
                                    class: ui.value.trailingIcon({ class: [unref(uiProp)?.trailingIcon, item.ui?.trailingIcon] })
                                  }, null, _parent5, _scopeId4));
                                }, _push5, _parent5, _scopeId4);
                              } else {
                                return [
                                  renderSlot(_ctx.$slots, "leading", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                      key: 0,
                                      name: item.icon,
                                      "data-slot": "leadingIcon",
                                      class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                  ]),
                                  unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    "data-slot": "label",
                                    class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] })
                                  }, [
                                    renderSlot(_ctx.$slots, "default", {
                                      item,
                                      index,
                                      open
                                    }, () => [
                                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                    ])
                                  ], 2)) : createCommentVNode("", true),
                                  renderSlot(_ctx.$slots, "trailing", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    createVNode(_sfc_main$e, {
                                      name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                      "data-slot": "trailingIcon",
                                      class: ui.value.trailingIcon({ class: [unref(uiProp)?.trailingIcon, item.ui?.trailingIcon] })
                                    }, null, 8, ["name", "class"])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(AccordionTrigger), {
                              "data-slot": "trigger",
                              class: ui.value.trigger({ class: [unref(uiProp)?.trigger, item.ui?.trigger], disabled: item.disabled })
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "leading", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => [
                                  item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                    key: 0,
                                    name: item.icon,
                                    "data-slot": "leadingIcon",
                                    class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item?.ui?.leadingIcon] })
                                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                ]),
                                unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  "data-slot": "label",
                                  class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] })
                                }, [
                                  renderSlot(_ctx.$slots, "default", {
                                    item,
                                    index,
                                    open
                                  }, () => [
                                    createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                  ])
                                ], 2)) : createCommentVNode("", true),
                                renderSlot(_ctx.$slots, "trailing", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => [
                                  createVNode(_sfc_main$e, {
                                    name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                    "data-slot": "trailingIcon",
                                    class: ui.value.trailingIcon({ class: [unref(uiProp)?.trailingIcon, item.ui?.trailingIcon] })
                                  }, null, 8, ["name", "class"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`]) {
                      _push3(ssrRenderComponent(unref(AccordionContent), {
                        "data-slot": "content",
                        class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot(_ctx.$slots, item.slot || "content", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => {
                              _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: [unref(uiProp)?.body, item.ui?.body] }))}"${_scopeId3}>`);
                              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => {
                                _push4(`${ssrInterpolate(item.content)}`);
                              }, _push4, _parent4, _scopeId3);
                              _push4(`</div>`);
                            }, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, item.slot || "content", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                createVNode("div", {
                                  "data-slot": "body",
                                  class: ui.value.body({ class: [unref(uiProp)?.body, item.ui?.body] })
                                }, [
                                  renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    createTextVNode(toDisplayString(item.content), 1)
                                  ])
                                ], 2)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(unref(AccordionHeader), {
                        as: "div",
                        "data-slot": "header",
                        class: ui.value.header({ class: [unref(uiProp)?.header, item.ui?.header] })
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AccordionTrigger), {
                            "data-slot": "trigger",
                            class: ui.value.trigger({ class: [unref(uiProp)?.trigger, item.ui?.trigger], disabled: item.disabled })
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "leading", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                  key: 0,
                                  name: item.icon,
                                  "data-slot": "leadingIcon",
                                  class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item?.ui?.leadingIcon] })
                                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                              ]),
                              unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                                key: 0,
                                "data-slot": "label",
                                class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] })
                              }, [
                                renderSlot(_ctx.$slots, "default", {
                                  item,
                                  index,
                                  open
                                }, () => [
                                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                ])
                              ], 2)) : createCommentVNode("", true),
                              renderSlot(_ctx.$slots, "trailing", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                createVNode(_sfc_main$e, {
                                  name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                  "data-slot": "trailingIcon",
                                  class: ui.value.trailingIcon({ class: [unref(uiProp)?.trailingIcon, item.ui?.trailingIcon] })
                                }, null, 8, ["name", "class"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1032, ["class"]),
                      item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`] ? (openBlock(), createBlock(unref(AccordionContent), {
                        key: 0,
                        "data-slot": "content",
                        class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, item.slot || "content", {
                            item,
                            index,
                            open,
                            ui: ui.value
                          }, () => [
                            createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: [unref(uiProp)?.body, item.ui?.body] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                createTextVNode(toDisplayString(item.content), 1)
                              ])
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item, index) => {
                return openBlock(), createBlock(unref(AccordionItem), {
                  key: index,
                  value: unref(get)(item, props.valueKey) ?? String(index),
                  disabled: item.disabled,
                  "data-slot": "item",
                  class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item, item.class] })
                }, {
                  default: withCtx(({ open }) => [
                    createVNode(unref(AccordionHeader), {
                      as: "div",
                      "data-slot": "header",
                      class: ui.value.header({ class: [unref(uiProp)?.header, item.ui?.header] })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AccordionTrigger), {
                          "data-slot": "trigger",
                          class: ui.value.trigger({ class: [unref(uiProp)?.trigger, item.ui?.trigger], disabled: item.disabled })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item?.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                            ]),
                            unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index,
                                open
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              createVNode(_sfc_main$e, {
                                name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: [unref(uiProp)?.trailingIcon, item.ui?.trailingIcon] })
                              }, null, 8, ["name", "class"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]),
                      _: 2
                    }, 1032, ["class"]),
                    item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`] ? (openBlock(), createBlock(unref(AccordionContent), {
                      key: 0,
                      "data-slot": "content",
                      class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index,
                          open,
                          ui: ui.value
                        }, () => [
                          createVNode("div", {
                            "data-slot": "body",
                            class: ui.value.body({ class: [unref(uiProp)?.body, item.ui?.body] })
                          }, [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              createTextVNode(toDisplayString(item.content), 1)
                            ])
                          ], 2)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "class"]);
              }), 128))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Accordion.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Links",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      { title: "Карта", to: "/" },
      { title: "Моделирование", to: "https://gis.krasn.ru/agro/demo/" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "menu" }, _attrs))} data-v-b9377fbb><ul class="text-xl" data-v-b9377fbb><!--[-->`);
      ssrRenderList(items, (item) => {
        _push(`<li data-v-b9377fbb>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu/Links.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const Links = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-b9377fbb"]]), { __name: "MenuLinks" });
const _imports_0 = publicAssetsURL("/logo.png");
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Logo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logo bg-gray-100 dark:bg-gray-800 shadow-md" }, _attrs))} data-v-146c5708><div class="logo-body" data-v-146c5708><div class="logo-content" data-v-146c5708><div class="logo-part-one" data-v-146c5708><img width="80px"${ssrRenderAttr("src", _imports_0)} data-v-146c5708><div class="flex flex-col font-medium dark:text-white" data-v-146c5708><span class="text-3xl" data-v-146c5708>Сценариум</span><span class="text-2xl" data-v-146c5708>данные и модели</span></div></div>`);
      _push(ssrRenderComponent(Links, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu/Logo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Logo = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-146c5708"]]), { __name: "MenuLogo" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BodyCalculation",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const pollutants = __props.item.meteo?.filter((i) => i.code?.startsWith("i") || i.code?.startsWith("p-"));
    const meteorology = __props.item.meteo?.filter((i) => i.code?.startsWith("m-"));
    const inversion = (data) => {
      const value = +data.inversion.toFixed(2);
      if (isNaN(value)) {
        return 0;
      } else {
        return value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-4" }, _attrs))} data-v-f5f2720b><div class="grid grid-cols-[auto_1fr] gap-5" data-v-f5f2720b><section data-v-f5f2720b><h2 class="text-base mb-2 font-bold" data-v-f5f2720b>Загрязнение за период расчёт</h2><!--[-->`);
      ssrRenderList(unref(pollutants), (data, index) => {
        _push(`<div class="flex gap-2" data-v-f5f2720b><div class="left-part" data-v-f5f2720b><span data-v-f5f2720b>${ssrInterpolate(index + 1)}) ${ssrInterpolate(data.name)}:</span></div><span class="shrink-0" data-v-f5f2720b><b data-v-f5f2720b>${ssrInterpolate(data.value?.avg?.toFixed(2))} </b><span data-v-f5f2720b>${ssrInterpolate(data.units)}</span></span><div class="flex gap-1 items-center text-sm text-muted shrink-0" data-v-f5f2720b><span data-v-f5f2720b>мин: ${ssrInterpolate(data.value?.min)}</span>, <span data-v-f5f2720b>макс: ${ssrInterpolate(data.value?.max)}</span></div></div>`);
      });
      _push(`<!--]--><h2 class="text-base mt-2 mb-2 font-bold" data-v-f5f2720b>Метеопараметры за период расчёт</h2><!--[-->`);
      ssrRenderList(unref(meteorology), (data, index) => {
        _push(`<div class="flex gap-2" data-v-f5f2720b><div class="left-part" data-v-f5f2720b><span data-v-f5f2720b>${ssrInterpolate(index + 1)}) ${ssrInterpolate(data.name)}:</span></div><span class="shrink-0" data-v-f5f2720b><b data-v-f5f2720b>${ssrInterpolate(data.value?.avg?.toFixed(2))} </b><span data-v-f5f2720b>${ssrInterpolate(data.units)}</span></span><div class="flex gap-1 items-center text-sm text-muted shrink-0" data-v-f5f2720b><span data-v-f5f2720b>мин: ${ssrInterpolate(data.value?.min)}</span>, <span data-v-f5f2720b>макс: ${ssrInterpolate(data.value?.max)}</span></div></div>`);
      });
      _push(`<!--]--></section><section data-v-f5f2720b><h2 class="text-base mb-2 font-bold" data-v-f5f2720b>Температурная инверсия</h2><!--[-->`);
      ssrRenderList(__props.item.inversion?.daily, (data, index) => {
        _push(`<div class="flex gap-2" data-v-f5f2720b><span data-v-f5f2720b>${ssrInterpolate(index + 1)}) ${ssrInterpolate(new Date(data.time.split(" ")[0]).toLocaleDateString("ru-RU"))}:</span><span data-v-f5f2720b><b data-v-f5f2720b>${ssrInterpolate(inversion(data))}</b> °C</span></div>`);
      });
      _push(`<!--]--></section></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Сalculations/components/BodyCalculation.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BodyCalculation = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-f5f2720b"]]), { __name: "СalculationsComponentsBodyCalculation" });
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-sm/4 gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-base/5 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-base/5 gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UInput",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: [String, Object], required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    fixed: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("input", props);
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, { deferInputValidation: true });
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.input || {} })({
      type: props.type,
      color: color.value,
      variant: props.variant,
      size: inputSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      fixed: props.fixed,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const inputRef = useTemplateRef("inputRef");
    function updateInput(value) {
      if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number || props.type === "number") {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ||= null;
      }
      if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
        value ||= void 0;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttrs(mergeProps({
              id: unref(id),
              ref_key: "inputRef",
              ref: inputRef,
              type: __props.type,
              value: unref(modelValue),
              name: unref(name),
              placeholder: __props.placeholder,
              "data-slot": "base",
              class: ui.value.base({ class: unref(uiProp)?.base }),
              disabled: unref(disabled),
              required: __props.required,
              autocomplete: __props.autocomplete
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(uiProp)?.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$c, mergeProps({
                    size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(uiProp)?.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("input", mergeProps({
                id: unref(id),
                ref_key: "inputRef",
                ref: inputRef,
                type: __props.type,
                value: unref(modelValue),
                name: unref(name),
                placeholder: __props.placeholder,
                "data-slot": "base",
                class: ui.value.base({ class: unref(uiProp)?.base }),
                disabled: unref(disabled),
                required: __props.required,
                autocomplete: __props.autocomplete
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
              renderSlot(_ctx.$slots, "default", { ui: ui.value }),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: unref(uiProp)?.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                    key: 0,
                    name: unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                    key: 1,
                    size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: unref(uiProp)?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                  unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                    key: 0,
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FilterCalculation",
  __ssrInlineRender: true,
  setup(__props) {
    const pollution = [
      { label: "Сначала загрязненные", value: "1" },
      { label: "Сначала чистые", value: "3" },
      { label: "Наибольшая инверсия", value: "4" },
      { label: "Наименьшая инверсия", value: "5" },
      { label: "По дате", value: "6" }
    ];
    const selectedPollution = ref("1");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$2$1;
      const _component_UInput = _sfc_main$3;
      const _component_USelect = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex mb-2 gap-1 justify-end" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UFormField, { label: "Наименование" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Сортировка" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelect, {
              class: "w-50",
              modelValue: unref(selectedPollution),
              "onUpdate:modelValue": ($event) => isRef(selectedPollution) ? selectedPollution.value = $event : null,
              items: pollution
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelect, {
                class: "w-50",
                modelValue: unref(selectedPollution),
                "onUpdate:modelValue": ($event) => isRef(selectedPollution) ? selectedPollution.value = $event : null,
                items: pollution
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Сalculations/components/FilterCalculation.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FilterCalculation = Object.assign(_sfc_main$2, { __name: "СalculationsComponentsFilterCalculation" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeaderCalculation",
  __ssrInlineRender: true,
  props: {
    item: {},
    index: {}
  },
  setup(__props) {
    const router = useRouter();
    const diff = computed(() => {
      const dMs = new Date(__props.item.dateTo).getTime() - new Date(__props.item.dateFrom).getTime();
      return Math.floor(dMs / (1e3 * 60 * 60 * 24));
    });
    const temperature = __props.item.meteo?.find((item) => item.code == "m-t");
    const pm25 = __props.item.meteo?.find((item) => item.code == "p-pm2");
    const inversion = __props.item.inversion;
    const backgroundTemp = colorer.paintSelf("m-t", temperature?.value?.avg || 0);
    const backgroundPm = colorer.paintSelf("p-pm2", pm25?.value?.avg || 0);
    const clickGoButton = (event) => {
      event.stopPropagation();
      const query = { start: __props.item.dateFrom, end: __props.item.dateTo };
      router.push({ path: "/", query });
    };
    const inv = (inversion2) => {
      const value = +inversion2?.average.toFixed(2);
      if (isNaN(value)) {
        return 0;
      } else {
        return value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UKbd = _sfc_main$8;
      const _component_UButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-2" }, _attrs))}><h2 class="text-xl"><span class="text-muted">#${ssrInterpolate(__props.index + 1)}</span> ${ssrInterpolate(__props.item.name)}</h2><span class="text-muted text-sm">${ssrInterpolate(new Date(__props.item.dateFrom).toLocaleDateString("ru-RU"))} - ${ssrInterpolate(new Date(__props.item.dateTo).toLocaleDateString("ru-RU"))} `);
      _push(ssrRenderComponent(_component_UKbd, { size: "sm" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(diff) + 1)} дн.`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(diff) + 1) + " дн.", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><div class="flex gap-2 items-center justify-between"><span class="text-base">${ssrInterpolate(__props.item.description)}</span>`);
      _push(ssrRenderComponent(_component_UButton, {
        class: "cursor-pointer",
        ref: "go",
        variant: "ghost",
        onClick: clickGoButton
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Перейти`);
          } else {
            return [
              createTextVNode("Перейти")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-1">`);
      _push(ssrRenderComponent(_component_UKbd, {
        size: "lg",
        style: { background: unref(backgroundTemp), color: `contrast-color(${unref(backgroundTemp)})` }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-1"${_scopeId}><span${_scopeId}>T</span><span${_scopeId}>${ssrInterpolate(unref(temperature)?.value?.avg)}</span><span${_scopeId}>${ssrInterpolate(unref(temperature)?.units)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-1" }, [
                createVNode("span", null, "T"),
                createVNode("span", null, toDisplayString(unref(temperature)?.value?.avg), 1),
                createVNode("span", null, toDisplayString(unref(temperature)?.units), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UKbd, {
        size: "lg",
        style: { background: unref(backgroundPm), color: `contrast-color(${unref(backgroundTemp)})` }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-1"${_scopeId}><span${_scopeId}>Pm2.5</span><span${_scopeId}>${ssrInterpolate(unref(pm25)?.value?.avg)}</span><span${_scopeId}>${ssrInterpolate(unref(pm25)?.units)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-1" }, [
                createVNode("span", null, "Pm2.5"),
                createVNode("span", null, toDisplayString(unref(pm25)?.value?.avg), 1),
                createVNode("span", null, toDisplayString(unref(pm25)?.units), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UKbd, { size: "lg" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-1"${_scopeId}><span${_scopeId}>Инверсия</span><span${_scopeId}>${ssrInterpolate(inv(unref(inversion)))}</span><span${_scopeId}>°C</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-1" }, [
                createVNode("span", null, "Инверсия"),
                createVNode("span", null, toDisplayString(inv(unref(inversion))), 1),
                createVNode("span", null, "°C")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Сalculations/components/HeaderCalculation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HeaderCalculation = Object.assign(_sfc_main$1, { __name: "СalculationsComponentsHeaderCalculation" });
function avgByPeriod(data, indicators) {
  if (!Array.isArray(data) || data.length === 0 || !Array.isArray(indicators) || indicators.length === 0) {
    return {};
  }
  const codes = indicators.map((ind) => ind.code);
  const sums = /* @__PURE__ */ new Map();
  const counts = /* @__PURE__ */ new Map();
  const mins = /* @__PURE__ */ new Map();
  const maxs = /* @__PURE__ */ new Map();
  codes.forEach((code) => {
    sums.set(code, 0);
    counts.set(code, 0);
    mins.set(code, Infinity);
    maxs.set(code, -Infinity);
  });
  for (const record of data) {
    for (const code of codes) {
      const rawValue = record[code];
      let numericValue = null;
      if (rawValue === null || rawValue === void 0) {
        continue;
      }
      if (typeof rawValue === "number") {
        numericValue = rawValue;
      } else if (typeof rawValue === "string") {
        const cleaned = rawValue.trim().replace(",", ".");
        const parsed = parseFloat(cleaned);
        if (!isNaN(parsed)) {
          numericValue = parsed;
        }
      }
      if (numericValue !== null) {
        sums.set(code, (sums.get(code) || 0) + numericValue);
        counts.set(code, (counts.get(code) || 0) + 1);
        if (numericValue < (mins.get(code) || Infinity)) {
          mins.set(code, numericValue);
        }
        if (numericValue > (maxs.get(code) || -Infinity)) {
          maxs.set(code, numericValue);
        }
      }
    }
  }
  const result = {};
  codes.forEach((code) => {
    const count = counts.get(code) || 0;
    if (count > 0) {
      result[code] = {
        avg: +((sums.get(code) || 0) / count).toFixed(2),
        min: +(mins.get(code) || 0).toFixed(2),
        max: +(maxs.get(code) || 0).toFixed(2)
      };
    } else {
      result[code] = {
        avg: null,
        min: null,
        max: null
      };
    }
  });
  return result;
}
function getProfile(day) {
  const levels = [];
  for (const key in day) {
    if (key.startsWith("t_h")) {
      const height = parseInt(key.slice(3), 10);
      levels.push({ height, temp: day[key] });
    }
  }
  levels.sort((a, b) => a.height - b.height);
  return levels;
}
function calculateInversion(day) {
  const profile = getProfile(day);
  let inversionSum = 0;
  for (let i = 0; i < profile.length - 1; i++) {
    const lower = profile[i];
    const upper = profile[i + 1];
    const diff = upper.temp - lower.temp;
    if (diff > 0) {
      inversionSum += diff;
    }
  }
  return inversionSum;
}
function analyzeInversions(data) {
  const daily = data.map((day) => ({
    time: day.time,
    inversion: calculateInversion(day)
  }));
  const total = daily.reduce((s, r) => s + r.inversion, 0);
  return { daily, average: total / daily.length };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Сценариум - КНЦ СО РАН"
    });
    const items = [
      {
        "id": "calc-2023-01-06",
        "name": "Красноярск 2023-01-06",
        "code": "CALC-001",
        "dateFrom": "2023-01-06",
        "dateTo": "2023-01-09",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2023-01-20-23",
        "name": "Красноярск 2023-01-20",
        "code": "CALC-002",
        "dateFrom": "2023-01-20",
        "dateTo": "2023-01-23",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2023-01-20-24",
        "name": "Красноярск 2023-01-20",
        "code": "CALC-003",
        "dateFrom": "2023-01-20",
        "dateTo": "2023-01-24",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2023-02-06",
        "name": "Красноярск 2023-02-06",
        "code": "CALC-004",
        "dateFrom": "2023-02-06",
        "dateTo": "2023-02-10",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-01-03",
        "name": "Красноярск 2024-01-03",
        "code": "CALC-005",
        "dateFrom": "2024-01-03",
        "dateTo": "2024-01-07",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
      },
      {
        "id": "calc-2024-01-06",
        "name": "Красноярск 2024-01-06",
        "code": "CALC-006",
        "dateFrom": "2024-01-06",
        "dateTo": "2024-01-09",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
      },
      {
        "id": "calc-2024-01-18",
        "name": "Красноярск 2024-01-18",
        "code": "CALC-007",
        "dateFrom": "2024-01-18",
        "dateTo": "2024-01-25",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
      },
      {
        "id": "calc-2024-01-29",
        "name": "Красноярск 2024-01-29",
        "code": "CALC-008",
        "dateFrom": "2024-01-29",
        "dateTo": "2024-02-05",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
      },
      {
        "id": "calc-2024-02-06",
        "name": "Красноярск 2024-02-06",
        "code": "CALC-009",
        "dateFrom": "2024-02-06",
        "dateTo": "2024-02-10",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2), LCZ (Local Climate Zones), BEM (Building Energy Model)"
      },
      {
        "id": "calc-2024-02-18",
        "name": "Красноярск 2024-02-18",
        "code": "CALC-010",
        "dateFrom": "2024-02-18",
        "dateTo": "2024-02-23",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-02-25",
        "name": "Красноярск 2024-02-25",
        "code": "CALC-011",
        "dateFrom": "2024-02-25",
        "dateTo": "2024-02-29",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-06-12",
        "name": "Красноярск 2024-06-12",
        "code": "CALC-012",
        "dateFrom": "2024-06-12",
        "dateTo": "2024-06-17",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-06-26",
        "name": "Красноярск 2024-06-26",
        "code": "CALC-013",
        "dateFrom": "2024-06-26",
        "dateTo": "2024-06-29",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-10-16",
        "name": "Красноярск 2024-10-16",
        "code": "CALC-014",
        "dateFrom": "2024-10-16",
        "dateTo": "2024-10-20",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-11-01",
        "name": "Красноярск 2024-11-01",
        "code": "CALC-015",
        "dateFrom": "2024-11-01",
        "dateTo": "2024-11-05",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-11-29",
        "name": "Красноярск 2024-11-29",
        "code": "CALC-016",
        "dateFrom": "2024-11-29",
        "dateTo": "2024-12-03",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      },
      {
        "id": "calc-2024-12-17",
        "name": "Красноярск 2024-12-17",
        "code": "CALC-017",
        "dateFrom": "2024-12-17",
        "dateTo": "2024-12-23",
        "description": "Метод расчета: RADM2 (Regional Acid Deposition Model version 2)"
      }
    ];
    const calculations = shallowRef([]);
    const { dta, indicators } = ([__temp, __restore] = withAsyncContext(() => dataService.getDta()), __temp = await __temp, __restore(), __temp);
    const promises = items.map(async (item) => {
      const promise = dataService.setDataService.getDataByDta({ begin: item.dateFrom, end: item.dateTo, timeInterval: "day", codeDta: "dta-air" });
      const promiseProfiler = dataServiceProfiler.setDataService.getDataById({ begin: item.dateFrom, end: item.dateTo, timeInterval: "day", codeDta: "knc-mtp5", id: 4310 });
      const result = await promise;
      const resultProfiler = await promiseProfiler;
      return { data: result, dataProfiler: resultProfiler, item };
    });
    Promise.all(promises).then((data) => {
      calculations.value = data.map((calculations2) => {
        const inversion = analyzeInversions(calculations2.dataProfiler);
        const avgData = avgByPeriod(calculations2.data, indicators);
        const meteo = indicators.map((indicator) => ({ value: avgData[indicator.code], ...indicator }));
        return { meteo: meteo.filter((item) => item.value?.avg), ...calculations2.item, inversion };
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAccordion = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}>`);
      _push(ssrRenderComponent(Logo, null, null, _parent));
      _push(`<div class="page-body"><div class="page-content"><p class="p-5 leading-relaxed"> Модели загрязнения, рассчитанные заранее, с периодом расчёта, описанием и усреднённой метеорологической метаинформацией с постов мониторинга (средние, минимальные и максимальные значения температуры, давления, влажности, ветра и PM2.5). </p>`);
      _push(ssrRenderComponent(FilterCalculation, null, null, _parent));
      _push(ssrRenderComponent(_component_UAccordion, {
        items: unref(calculations),
        type: "multiple"
      }, {
        default: withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(HeaderCalculation, {
              item,
              index
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(HeaderCalculation, {
                item,
                index
              }, null, 8, ["item", "index"])
            ];
          }
        }),
        body: withCtx(({ index, item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(BodyCalculation, { item }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(BodyCalculation, { item }, null, 8, ["item"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list-DnfYA7F8.mjs.map
