import { inject, withAsyncContext, provide, unref, shallowRef, watch, ref, computed, defineComponent, mergeProps, isRef, withCtx, createTextVNode, toDisplayString, toRef, createVNode, useSlots, renderSlot, toHandlers, openBlock, createBlock, createCommentVNode, Fragment, renderList, useId, resolveDynamicComponent, useModel, useAttrs, mergeModels, useTemplateRef, createSlots, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderSlot, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { u as useHead, q as useRoute, _ as _export_sfc, r as _sfc_main$8$1, j as useRouter, k as _sfc_main$9$1, b as useAppConfig, c as useComponentUI, m as usePortal, t as tv, n as useLocale, e as useFormField, d as _sfc_main$e$1, i as _sfc_main$c$1, g as get$1, f as useFieldGroup, h as useComponentIcons, p as useState, o as omit } from './server.mjs';
import { d as dataService, b as _sfc_main$1$1, _ as _sfc_main$2$1, c as colorer, a as dataServiceProfiler, g as getDiff, e as _sfc_main$w, S as SetDataService } from './registerProfiler-CNKjU182.mjs';
import { n as defu } from '../_/nitro.mjs';
import { useForwardPropsEmits, DialogRoot, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal, DialogOverlay, RadioGroupRoot, Label, RadioGroupItem, RadioGroupIndicator, useForwardProps, Separator, TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent, Primitive, CheckboxRoot, CheckboxIndicator, SliderRoot, SliderTrack, SliderRange, SliderThumb, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow, CheckboxGroupRoot } from 'reka-ui';
import { HoverCard, Popover, RangeCalendar, Calendar } from 'reka-ui/namespaced';
import { reactivePick, reactiveOmit, createReusableTemplate } from '@vueuse/core';
import { getWeekNumber } from 'reka-ui/date';
import { today, getLocalTimeZone, CalendarDate, DateFormatter } from '@internationalized/date';
import * as echarts from 'echarts/core';
import { GridComponent, MarkLineComponent, TooltipComponent, DataZoomComponent, ToolboxComponent, TitleComponent, LegendComponent, VisualMapComponent } from 'echarts/components';
import { LineChart, HeatmapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
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

const _sfc_main$v = {
  __name: "MapComponentsMap",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "map",
        class: "map"
      }, _attrs))} data-v-199f11e3></div>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Map/components/Map.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const Map$1 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-199f11e3"]]);
const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
  const v = glob$1[path$13];
  if (v) return typeof v === "function" ? v() : Promise.resolve(v);
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
const polygons$3 = [];
for (let i = 150; i <= 375; i += 25) {
  polygons$3.push(await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../assets/140.json": () => import('./140-CNMSuWyc.mjs'), "../../../assets/150.json": () => import('./150-Bkd7vqt_.mjs'), "../../../assets/175.json": () => import('./175-DzyZDuu0.mjs'), "../../../assets/200.json": () => import('./200-DUjvkKaj.mjs'), "../../../assets/225.json": () => import('./225-DDMSAsyy.mjs'), "../../../assets/250.json": () => import('./250-Da6maYL-.mjs'), "../../../assets/275.json": () => import('./275-Dyp-ESb4.mjs'), "../../../assets/300.json": () => import('./300-Ia9vWIJk.mjs'), "../../../assets/325.json": () => import('./325-DXzOm67b.mjs'), "../../../assets/350.json": () => import('./350-CfTcCQig.mjs'), "../../../assets/375.json": () => import('./375-D7-LOXA1.mjs') }), `../../../assets/${i}.json`, 5));
}
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "Indicators",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const selectedIndicator = inject("selectedIndicator");
    const openDialogProfiler = inject("openDialogProfiler");
    const open = () => {
      openDialogProfiler.value = true;
    };
    const value = computed({
      get() {
        return selectedIndicator?.value.code;
      },
      set(newValue) {
        const finded = __props.items.find((i) => i.code == newValue);
        selectedIndicator.value = finded || { code: "m-t" };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9$1;
      const _component_USelect = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "indicators" }, _attrs))} data-v-7650f873>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-chart-column",
        onClick: open
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        items: __props.items,
        "value-key": "code",
        "label-key": "name",
        style: { "width": "300px" }
      }, {
        item: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(item.name)} (${ssrInterpolate(item.units)}) `);
          } else {
            return [
              createTextVNode(toDisplayString(item.name) + " (" + toDisplayString(item.units) + ") ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Indicator/components/Indicators.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const Indicators = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$u, [["__scopeId", "data-v-7650f873"]]), { __name: "IndicatorComponentsIndicators" });
function useLegend() {
  const selectedIndicator = inject("selectedIndicator");
  const scheme = ref(colorer.getScheme(selectedIndicator?.value.code));
  watch(
    selectedIndicator,
    (indicator) => {
      scheme.value = colorer.getScheme(indicator.code);
    },
    { immediate: true }
  );
  return scheme;
}
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "Legend",
  __ssrInlineRender: true,
  setup(__props) {
    const scheme = useLegend();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "legend" }, _attrs))} data-v-c82b2104><!--[-->`);
      ssrRenderList(unref(scheme), (item, index) => {
        _push(`<!--[-->`);
        if (index % 2 == 0) {
          _push(`<div class="legend-item" data-v-c82b2104><div class="color" style="${ssrRenderStyle({ background: unref(scheme)[index + 1] })}" data-v-c82b2104></div> ${ssrInterpolate(unref(scheme)[index])}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Legend/components/Legend.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const Legend = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$t, [["__scopeId", "data-v-c82b2104"]]), { __name: "LegendComponentsLegend" });
function pointerDownOutside(e, options = {}) {
  const originalEvent = e.detail.originalEvent;
  const target = originalEvent.target;
  if (!target?.isConnected) {
    e.preventDefault();
    return;
  }
  if (options.scrollable) {
    if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
      e.preventDefault();
    }
  }
}
const theme$b = {
  "slots": {
    "content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
    "arrow": "fill-bg stroke-default"
  }
};
const _sfc_main$s = {
  __name: "UPopover",
  __ssrInlineRender: true,
  props: {
    mode: { type: null, required: false, default: "click" },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    reference: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false },
    openDelay: { type: Number, required: false, default: 0 },
    closeDelay: { type: Number, required: false, default: 0 }
  },
  emits: ["close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("popover", props);
    const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay") : reactivePick(props, "defaultOpen", "open", "modal");
    const rootProps = useForwardPropsEmits(pick, emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside
      };
    });
    const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
    const ui = computed(() => tv({ extend: tv(theme$b), ...appConfig.ui?.popover || {} })({
      side: contentProps.value.side
    }));
    const Component = computed(() => props.mode === "hover" ? HoverCard : Popover);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Component).Root, mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default || !!__props.reference) {
              _push2(ssrRenderComponent(unref(Component).Trigger, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if ("Anchor" in Component.value && !!slots.anchor) {
              _push2(ssrRenderComponent(unref(Component).Anchor, { "as-child": "" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "anchor", close ? { close } : {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "anchor", close ? { close } : {})
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Component).Portal, unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Component).Content, mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", close ? { close } : {}, null, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(Component).Arrow, mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                          !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Component).Content, mergeProps(contentProps.value, {
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                        !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                        }), null, 16, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1040, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default || !!__props.reference ? (openBlock(), createBlock(unref(Component).Trigger, {
                key: 0,
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["reference", "class"])) : createCommentVNode("", true),
              "Anchor" in Component.value && !!slots.anchor ? (openBlock(), createBlock(unref(Component).Anchor, {
                key: 1,
                "as-child": ""
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "anchor", close ? { close } : {})
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true),
              createVNode(unref(Component).Portal, unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(Component).Content, mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                      !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                      }), null, 16, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040, ["class"])
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Popover.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const theme$a = {
  "slots": {
    "root": "",
    "header": "flex items-center justify-between",
    "body": "flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0",
    "heading": "text-center font-medium truncate mx-auto",
    "grid": "w-full border-collapse select-none space-y-1 focus:outline-none",
    "gridRow": "grid grid-cols-7 place-items-center",
    "gridWeekDaysRow": "mb-1 grid w-full grid-cols-7",
    "gridBody": "grid",
    "headCell": "rounded-md",
    "headCellWeek": "rounded-md text-muted",
    "cell": "relative text-center",
    "cellTrigger": [
      "m-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-today:font-semibold data-[outside-view]:text-muted",
      "transition"
    ],
    "cellWeek": "relative text-center text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "headCell": "text-primary",
        "cellTrigger": "focus-visible:ring-primary"
      },
      "secondary": {
        "headCell": "text-secondary",
        "cellTrigger": "focus-visible:ring-secondary"
      },
      "success": {
        "headCell": "text-success",
        "cellTrigger": "focus-visible:ring-success"
      },
      "info": {
        "headCell": "text-info",
        "cellTrigger": "focus-visible:ring-info"
      },
      "warning": {
        "headCell": "text-warning",
        "cellTrigger": "focus-visible:ring-warning"
      },
      "error": {
        "headCell": "text-error",
        "cellTrigger": "focus-visible:ring-error"
      },
      "neutral": {
        "headCell": "text-highlighted",
        "cellTrigger": "focus-visible:ring-inverted"
      }
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "xs": {
        "heading": "text-xs",
        "cell": "text-xs",
        "cellWeek": "text-xs",
        "headCell": "text-[10px]",
        "headCellWeek": "text-[10px]",
        "cellTrigger": "size-7",
        "body": "space-y-2 pt-2"
      },
      "sm": {
        "heading": "text-xs",
        "headCell": "text-xs",
        "headCellWeek": "text-xs",
        "cellWeek": "text-xs",
        "cell": "text-xs",
        "cellTrigger": "size-7"
      },
      "md": {
        "heading": "text-sm",
        "headCell": "text-xs",
        "headCellWeek": "text-xs",
        "cellWeek": "text-xs",
        "cell": "text-sm",
        "cellTrigger": "size-8"
      },
      "lg": {
        "heading": "text-md",
        "headCell": "text-md",
        "headCellWeek": "text-md",
        "cellTrigger": "size-9 text-md"
      },
      "xl": {
        "heading": "text-lg",
        "headCell": "text-lg",
        "headCellWeek": "text-lg",
        "cellTrigger": "size-10 text-lg"
      }
    },
    "weekNumbers": {
      "true": {
        "gridRow": "grid-cols-8",
        "gridWeekDaysRow": "grid-cols-8 [&>*:first-child]:col-start-2"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": {
        "cellTrigger": "data-[selected]:bg-primary data-[selected]:text-inverted data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20"
      }
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": {
        "cellTrigger": "data-[selected]:bg-secondary data-[selected]:text-inverted data-today:not-data-[selected]:text-secondary data-[highlighted]:bg-secondary/20 hover:not-data-[selected]:bg-secondary/20"
      }
    },
    {
      "color": "success",
      "variant": "solid",
      "class": {
        "cellTrigger": "data-[selected]:bg-success data-[selected]:text-inverted data-today:not-data-[selected]:text-success data-[highlighted]:bg-success/20 hover:not-data-[selected]:bg-success/20"
      }
    },
    {
      "color": "info",
      "variant": "solid",
      "class": {
        "cellTrigger": "data-[selected]:bg-info data-[selected]:text-inverted data-today:not-data-[selected]:text-info data-[highlighted]:bg-info/20 hover:not-data-[selected]:bg-info/20"
      }
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": {
        "cellTrigger": "data-[selected]:bg-warning data-[selected]:text-inverted data-today:not-data-[selected]:text-warning data-[highlighted]:bg-warning/20 hover:not-data-[selected]:bg-warning/20"
      }
    },
    {
      "color": "error",
      "variant": "solid",
      "class": {
        "cellTrigger": "data-[selected]:bg-error data-[selected]:text-inverted data-today:not-data-[selected]:text-error data-[highlighted]:bg-error/20 hover:not-data-[selected]:bg-error/20"
      }
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": {
        "cellTrigger": "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-primary/50 data-[selected]:text-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/10 hover:not-data-[selected]:bg-primary/10"
      }
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": {
        "cellTrigger": "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-secondary/50 data-[selected]:text-secondary data-today:not-data-[selected]:text-secondary data-[highlighted]:bg-secondary/10 hover:not-data-[selected]:bg-secondary/10"
      }
    },
    {
      "color": "success",
      "variant": "outline",
      "class": {
        "cellTrigger": "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-success/50 data-[selected]:text-success data-today:not-data-[selected]:text-success data-[highlighted]:bg-success/10 hover:not-data-[selected]:bg-success/10"
      }
    },
    {
      "color": "info",
      "variant": "outline",
      "class": {
        "cellTrigger": "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-info/50 data-[selected]:text-info data-today:not-data-[selected]:text-info data-[highlighted]:bg-info/10 hover:not-data-[selected]:bg-info/10"
      }
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": {
        "cellTrigger": "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-warning/50 data-[selected]:text-warning data-today:not-data-[selected]:text-warning data-[highlighted]:bg-warning/10 hover:not-data-[selected]:bg-warning/10"
      }
    },
    {
      "color": "error",
      "variant": "outline",
      "class": {
        "cellTrigger": "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-error/50 data-[selected]:text-error data-today:not-data-[selected]:text-error data-[highlighted]:bg-error/10 hover:not-data-[selected]:bg-error/10"
      }
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": {
        "cellTrigger": "data-[selected]:bg-primary/10 data-[selected]:text-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20"
      }
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": {
        "cellTrigger": "data-[selected]:bg-secondary/10 data-[selected]:text-secondary data-today:not-data-[selected]:text-secondary data-[highlighted]:bg-secondary/20 hover:not-data-[selected]:bg-secondary/20"
      }
    },
    {
      "color": "success",
      "variant": "soft",
      "class": {
        "cellTrigger": "data-[selected]:bg-success/10 data-[selected]:text-success data-today:not-data-[selected]:text-success data-[highlighted]:bg-success/20 hover:not-data-[selected]:bg-success/20"
      }
    },
    {
      "color": "info",
      "variant": "soft",
      "class": {
        "cellTrigger": "data-[selected]:bg-info/10 data-[selected]:text-info data-today:not-data-[selected]:text-info data-[highlighted]:bg-info/20 hover:not-data-[selected]:bg-info/20"
      }
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": {
        "cellTrigger": "data-[selected]:bg-warning/10 data-[selected]:text-warning data-today:not-data-[selected]:text-warning data-[highlighted]:bg-warning/20 hover:not-data-[selected]:bg-warning/20"
      }
    },
    {
      "color": "error",
      "variant": "soft",
      "class": {
        "cellTrigger": "data-[selected]:bg-error/10 data-[selected]:text-error data-today:not-data-[selected]:text-error data-[highlighted]:bg-error/20 hover:not-data-[selected]:bg-error/20"
      }
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": {
        "cellTrigger": "data-[selected]:bg-primary/10 data-[selected]:text-primary data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-primary/25 data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20"
      }
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": {
        "cellTrigger": "data-[selected]:bg-secondary/10 data-[selected]:text-secondary data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-secondary/25 data-today:not-data-[selected]:text-secondary data-[highlighted]:bg-secondary/20 hover:not-data-[selected]:bg-secondary/20"
      }
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": {
        "cellTrigger": "data-[selected]:bg-success/10 data-[selected]:text-success data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-success/25 data-today:not-data-[selected]:text-success data-[highlighted]:bg-success/20 hover:not-data-[selected]:bg-success/20"
      }
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": {
        "cellTrigger": "data-[selected]:bg-info/10 data-[selected]:text-info data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-info/25 data-today:not-data-[selected]:text-info data-[highlighted]:bg-info/20 hover:not-data-[selected]:bg-info/20"
      }
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": {
        "cellTrigger": "data-[selected]:bg-warning/10 data-[selected]:text-warning data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-warning/25 data-today:not-data-[selected]:text-warning data-[highlighted]:bg-warning/20 hover:not-data-[selected]:bg-warning/20"
      }
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": {
        "cellTrigger": "data-[selected]:bg-error/10 data-[selected]:text-error data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-error/25 data-today:not-data-[selected]:text-error data-[highlighted]:bg-error/20 hover:not-data-[selected]:bg-error/20"
      }
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": {
        "cellTrigger": "data-[selected]:bg-inverted data-[selected]:text-inverted data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10"
      }
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": {
        "cellTrigger": "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-[selected]:text-default data-[selected]:bg-default data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/10 hover:not-data-[selected]:bg-inverted/10"
      }
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": {
        "cellTrigger": "data-[selected]:bg-elevated data-[selected]:text-default data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10"
      }
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": {
        "cellTrigger": "data-[selected]:bg-elevated data-[selected]:text-default data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "solid"
  }
};
const _sfc_main$r = {
  __name: "UCalendar",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    nextYearIcon: { type: null, required: false },
    nextYear: { type: Object, required: false },
    nextMonthIcon: { type: null, required: false },
    nextMonth: { type: Object, required: false },
    prevYearIcon: { type: null, required: false },
    prevYear: { type: Object, required: false },
    prevMonthIcon: { type: null, required: false },
    prevMonth: { type: Object, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    range: { type: Boolean, required: false },
    multiple: { type: Boolean, required: false },
    monthControls: { type: Boolean, required: false, default: true },
    yearControls: { type: Boolean, required: false, default: true },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    weekNumbers: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultPlaceholder: { type: null, required: false },
    placeholder: { type: null, required: false },
    allowNonContiguousRanges: { type: Boolean, required: false },
    pagedNavigation: { type: Boolean, required: false },
    preventDeselect: { type: Boolean, required: false },
    maximumDays: { type: Number, required: false },
    weekStartsOn: { type: Number, required: false },
    weekdayFormat: { type: String, required: false },
    fixedWeeks: { type: Boolean, required: false, default: true },
    maxValue: { type: null, required: false },
    minValue: { type: null, required: false },
    numberOfMonths: { type: Number, required: false },
    disabled: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false },
    initialFocus: { type: Boolean, required: false },
    isDateDisabled: { type: Function, required: false },
    isDateUnavailable: { type: Function, required: false },
    isDateHighlightable: { type: Function, required: false },
    nextPage: { type: Function, required: false },
    prevPage: { type: Function, required: false },
    disableDaysOutsideCurrentView: { type: Boolean, required: false },
    fixedDate: { type: String, required: false }
  },
  emits: ["update:modelValue", "update:placeholder", "update:validModelValue", "update:startValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir, t, locale } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("calendar", props);
    const rootProps = useForwardPropsEmits(reactiveOmit(props, "range", "modelValue", "defaultValue", "color", "variant", "size", "monthControls", "yearControls", "class", "ui"), emits);
    const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
    const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
    const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
    const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
    const ui = computed(() => tv({ extend: tv(theme$a), ...appConfig.ui?.calendar || {} })({
      color: props.color,
      size: props.size,
      variant: props.variant,
      weekNumbers: props.weekNumbers
    }));
    function paginateYear(date, sign) {
      if (sign === -1) {
        return date.subtract({ years: 1 });
      }
      return date.add({ years: 1 });
    }
    const Calendar$1 = computed(() => props.range ? RangeCalendar : Calendar);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Calendar$1).Root, mergeProps(unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx(({ weekDays, grid }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Calendar$1).Header, {
              "data-slot": "header",
              class: ui.value.header({ class: unref(uiProp)?.header })
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (props.yearControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Prev, {
                      "prev-page": (date) => paginateYear(date, -1),
                      "aria-label": unref(t)("calendar.prevYear"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$9$1, mergeProps({
                            icon: prevYearIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.prevYear), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$9$1, mergeProps({
                              icon: prevYearIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.prevYear), null, 16, ["icon", "size"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (props.monthControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Prev, {
                      "aria-label": unref(t)("calendar.prevMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$9$1, mergeProps({
                            icon: prevMonthIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.prevMonth), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$9$1, mergeProps({
                              icon: prevMonthIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.prevMonth), null, 16, ["icon", "size"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(Calendar$1).Heading, {
                    "data-slot": "heading",
                    class: ui.value.heading({ class: unref(uiProp)?.heading })
                  }, {
                    default: withCtx(({ headingValue }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "heading", { value: headingValue }, () => {
                          _push4(`${ssrInterpolate(headingValue)}`);
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "heading", { value: headingValue }, () => [
                            createTextVNode(toDisplayString(headingValue), 1)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (props.monthControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Next, {
                      "aria-label": unref(t)("calendar.nextMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$9$1, mergeProps({
                            icon: nextMonthIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.nextMonth), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$9$1, mergeProps({
                              icon: nextMonthIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.nextMonth), null, 16, ["icon", "size"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (props.yearControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Next, {
                      "next-page": (date) => paginateYear(date, 1),
                      "aria-label": unref(t)("calendar.nextYear"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$9$1, mergeProps({
                            icon: nextYearIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.nextYear), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$9$1, mergeProps({
                              icon: nextYearIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.nextYear), null, 16, ["icon", "size"])
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
                    props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                      key: 0,
                      "prev-page": (date) => paginateYear(date, -1),
                      "aria-label": unref(t)("calendar.prevYear"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$9$1, mergeProps({
                          icon: prevYearIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.prevYear), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["prev-page", "aria-label"])) : createCommentVNode("", true),
                    props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                      key: 1,
                      "aria-label": unref(t)("calendar.prevMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$9$1, mergeProps({
                          icon: prevMonthIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.prevMonth), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["aria-label"])) : createCommentVNode("", true),
                    createVNode(unref(Calendar$1).Heading, {
                      "data-slot": "heading",
                      class: ui.value.heading({ class: unref(uiProp)?.heading })
                    }, {
                      default: withCtx(({ headingValue }) => [
                        renderSlot(_ctx.$slots, "heading", { value: headingValue }, () => [
                          createTextVNode(toDisplayString(headingValue), 1)
                        ])
                      ]),
                      _: 3
                    }, 8, ["class"]),
                    props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                      key: 2,
                      "aria-label": unref(t)("calendar.nextMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$9$1, mergeProps({
                          icon: nextMonthIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.nextMonth), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["aria-label"])) : createCommentVNode("", true),
                    props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                      key: 3,
                      "next-page": (date) => paginateYear(date, 1),
                      "aria-label": unref(t)("calendar.nextYear"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$9$1, mergeProps({
                          icon: nextYearIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.nextYear), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["next-page", "aria-label"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId}><!--[-->`);
            ssrRenderList(grid, (month) => {
              _push2(ssrRenderComponent(unref(Calendar$1).Grid, {
                key: month.value.toString(),
                "data-slot": "grid",
                class: ui.value.grid({ class: unref(uiProp)?.grid })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Calendar$1).GridHead, null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Calendar$1).GridRow, {
                            "data-slot": "gridWeekDaysRow",
                            class: ui.value.gridWeekDaysRow({ class: unref(uiProp)?.gridWeekDaysRow })
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(weekDays, (day) => {
                                  _push5(ssrRenderComponent(unref(Calendar$1).HeadCell, {
                                    key: day,
                                    "data-slot": "headCell",
                                    class: ui.value.headCell({ class: unref(uiProp)?.headCell })
                                  }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "week-day", { day }, () => {
                                          _push6(`${ssrInterpolate(day)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                            createTextVNode(toDisplayString(day), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                    return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                      key: day,
                                      "data-slot": "headCell",
                                      class: ui.value.headCell({ class: unref(uiProp)?.headCell })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                          createTextVNode(toDisplayString(day), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Calendar$1).GridRow, {
                              "data-slot": "gridWeekDaysRow",
                              class: ui.value.gridWeekDaysRow({ class: unref(uiProp)?.gridWeekDaysRow })
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                  return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                    key: day,
                                    "data-slot": "headCell",
                                    class: ui.value.headCell({ class: unref(uiProp)?.headCell })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                        createTextVNode(toDisplayString(day), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Calendar$1).GridBody, {
                      "data-slot": "gridBody",
                      class: ui.value.gridBody({ class: unref(uiProp)?.gridBody })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(month.rows, (weekDates, index) => {
                            _push4(ssrRenderComponent(unref(Calendar$1).GridRow, {
                              key: `weekDate-${index}`,
                              "data-slot": "gridRow",
                              class: ui.value.gridRow({ class: unref(uiProp)?.gridRow })
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (__props.weekNumbers && weekDates[0]) {
                                    _push5(`<td role="gridcell" data-slot="cellWeek" class="${ssrRenderClass(ui.value.cellWeek({ class: unref(uiProp)?.cellWeek }))}"${_scopeId4}>${ssrInterpolate(unref(getWeekNumber)(weekDates[0], unref(locale).code))}</td>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<!--[-->`);
                                  ssrRenderList(weekDates, (weekDate) => {
                                    _push5(ssrRenderComponent(unref(Calendar$1).Cell, {
                                      key: weekDate.toString(),
                                      date: weekDate,
                                      "data-slot": "cell",
                                      class: ui.value.cell({ class: unref(uiProp)?.cell })
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(Calendar$1).CellTrigger, {
                                            day: weekDate,
                                            month: month.value,
                                            "data-slot": "cellTrigger",
                                            class: ui.value.cellTrigger({ class: unref(uiProp)?.cellTrigger })
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                ssrRenderSlot(_ctx.$slots, "day", { day: weekDate }, () => {
                                                  _push7(`${ssrInterpolate(weekDate.day)}`);
                                                }, _push7, _parent7, _scopeId6);
                                              } else {
                                                return [
                                                  renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                                    createTextVNode(toDisplayString(weekDate.day), 1)
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(unref(Calendar$1).CellTrigger, {
                                              day: weekDate,
                                              month: month.value,
                                              "data-slot": "cellTrigger",
                                              class: ui.value.cellTrigger({ class: unref(uiProp)?.cellTrigger })
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                                  createTextVNode(toDisplayString(weekDate.day), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["day", "month", "class"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    __props.weekNumbers && weekDates[0] ? (openBlock(), createBlock("td", {
                                      key: 0,
                                      role: "gridcell",
                                      "data-slot": "cellWeek",
                                      class: ui.value.cellWeek({ class: unref(uiProp)?.cellWeek })
                                    }, toDisplayString(unref(getWeekNumber)(weekDates[0], unref(locale).code)), 3)) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                      return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                        key: weekDate.toString(),
                                        date: weekDate,
                                        "data-slot": "cell",
                                        class: ui.value.cell({ class: unref(uiProp)?.cell })
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Calendar$1).CellTrigger, {
                                            day: weekDate,
                                            month: month.value,
                                            "data-slot": "cellTrigger",
                                            class: ui.value.cellTrigger({ class: unref(uiProp)?.cellTrigger })
                                          }, {
                                            default: withCtx(() => [
                                              renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                                createTextVNode(toDisplayString(weekDate.day), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["day", "month", "class"])
                                        ]),
                                        _: 2
                                      }, 1032, ["date", "class"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                              return openBlock(), createBlock(unref(Calendar$1).GridRow, {
                                key: `weekDate-${index}`,
                                "data-slot": "gridRow",
                                class: ui.value.gridRow({ class: unref(uiProp)?.gridRow })
                              }, {
                                default: withCtx(() => [
                                  __props.weekNumbers && weekDates[0] ? (openBlock(), createBlock("td", {
                                    key: 0,
                                    role: "gridcell",
                                    "data-slot": "cellWeek",
                                    class: ui.value.cellWeek({ class: unref(uiProp)?.cellWeek })
                                  }, toDisplayString(unref(getWeekNumber)(weekDates[0], unref(locale).code)), 3)) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                    return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                      key: weekDate.toString(),
                                      date: weekDate,
                                      "data-slot": "cell",
                                      class: ui.value.cell({ class: unref(uiProp)?.cell })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Calendar$1).CellTrigger, {
                                          day: weekDate,
                                          month: month.value,
                                          "data-slot": "cellTrigger",
                                          class: ui.value.cellTrigger({ class: unref(uiProp)?.cellTrigger })
                                        }, {
                                          default: withCtx(() => [
                                            renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                              createTextVNode(toDisplayString(weekDate.day), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["day", "month", "class"])
                                      ]),
                                      _: 2
                                    }, 1032, ["date", "class"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Calendar$1).GridHead, null, {
                        default: withCtx(() => [
                          createVNode(unref(Calendar$1).GridRow, {
                            "data-slot": "gridWeekDaysRow",
                            class: ui.value.gridWeekDaysRow({ class: unref(uiProp)?.gridWeekDaysRow })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                  key: day,
                                  "data-slot": "headCell",
                                  class: ui.value.headCell({ class: unref(uiProp)?.headCell })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                      createTextVNode(toDisplayString(day), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(Calendar$1).GridBody, {
                        "data-slot": "gridBody",
                        class: ui.value.gridBody({ class: unref(uiProp)?.gridBody })
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(Calendar$1).GridRow, {
                              key: `weekDate-${index}`,
                              "data-slot": "gridRow",
                              class: ui.value.gridRow({ class: unref(uiProp)?.gridRow })
                            }, {
                              default: withCtx(() => [
                                __props.weekNumbers && weekDates[0] ? (openBlock(), createBlock("td", {
                                  key: 0,
                                  role: "gridcell",
                                  "data-slot": "cellWeek",
                                  class: ui.value.cellWeek({ class: unref(uiProp)?.cellWeek })
                                }, toDisplayString(unref(getWeekNumber)(weekDates[0], unref(locale).code)), 3)) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                    key: weekDate.toString(),
                                    date: weekDate,
                                    "data-slot": "cell",
                                    class: ui.value.cell({ class: unref(uiProp)?.cell })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Calendar$1).CellTrigger, {
                                        day: weekDate,
                                        month: month.value,
                                        "data-slot": "cellTrigger",
                                        class: ui.value.cellTrigger({ class: unref(uiProp)?.cellTrigger })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                            createTextVNode(toDisplayString(weekDate.day), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["day", "month", "class"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date", "class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(unref(Calendar$1).Header, {
                "data-slot": "header",
                class: ui.value.header({ class: unref(uiProp)?.header })
              }, {
                default: withCtx(() => [
                  props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                    key: 0,
                    "prev-page": (date) => paginateYear(date, -1),
                    "aria-label": unref(t)("calendar.prevYear"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$9$1, mergeProps({
                        icon: prevYearIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.prevYear), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["prev-page", "aria-label"])) : createCommentVNode("", true),
                  props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                    key: 1,
                    "aria-label": unref(t)("calendar.prevMonth"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$9$1, mergeProps({
                        icon: prevMonthIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.prevMonth), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : createCommentVNode("", true),
                  createVNode(unref(Calendar$1).Heading, {
                    "data-slot": "heading",
                    class: ui.value.heading({ class: unref(uiProp)?.heading })
                  }, {
                    default: withCtx(({ headingValue }) => [
                      renderSlot(_ctx.$slots, "heading", { value: headingValue }, () => [
                        createTextVNode(toDisplayString(headingValue), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["class"]),
                  props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                    key: 2,
                    "aria-label": unref(t)("calendar.nextMonth"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$9$1, mergeProps({
                        icon: nextMonthIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.nextMonth), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : createCommentVNode("", true),
                  props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                    key: 3,
                    "next-page": (date) => paginateYear(date, 1),
                    "aria-label": unref(t)("calendar.nextYear"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$9$1, mergeProps({
                        icon: nextYearIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.nextYear), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["next-page", "aria-label"])) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["class"]),
              createVNode("div", {
                "data-slot": "body",
                class: ui.value.body({ class: unref(uiProp)?.body })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(grid, (month) => {
                  return openBlock(), createBlock(unref(Calendar$1).Grid, {
                    key: month.value.toString(),
                    "data-slot": "grid",
                    class: ui.value.grid({ class: unref(uiProp)?.grid })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Calendar$1).GridHead, null, {
                        default: withCtx(() => [
                          createVNode(unref(Calendar$1).GridRow, {
                            "data-slot": "gridWeekDaysRow",
                            class: ui.value.gridWeekDaysRow({ class: unref(uiProp)?.gridWeekDaysRow })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                  key: day,
                                  "data-slot": "headCell",
                                  class: ui.value.headCell({ class: unref(uiProp)?.headCell })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                      createTextVNode(toDisplayString(day), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(Calendar$1).GridBody, {
                        "data-slot": "gridBody",
                        class: ui.value.gridBody({ class: unref(uiProp)?.gridBody })
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(Calendar$1).GridRow, {
                              key: `weekDate-${index}`,
                              "data-slot": "gridRow",
                              class: ui.value.gridRow({ class: unref(uiProp)?.gridRow })
                            }, {
                              default: withCtx(() => [
                                __props.weekNumbers && weekDates[0] ? (openBlock(), createBlock("td", {
                                  key: 0,
                                  role: "gridcell",
                                  "data-slot": "cellWeek",
                                  class: ui.value.cellWeek({ class: unref(uiProp)?.cellWeek })
                                }, toDisplayString(unref(getWeekNumber)(weekDates[0], unref(locale).code)), 3)) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                    key: weekDate.toString(),
                                    date: weekDate,
                                    "data-slot": "cell",
                                    class: ui.value.cell({ class: unref(uiProp)?.cell })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Calendar$1).CellTrigger, {
                                        day: weekDate,
                                        month: month.value,
                                        "data-slot": "cellTrigger",
                                        class: ui.value.cellTrigger({ class: unref(uiProp)?.cellTrigger })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                            createTextVNode(toDisplayString(weekDate.day), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["day", "month", "class"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date", "class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["class"]);
                }), 128))
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Calendar.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
function findDayChangeIndex(datesArray) {
  if (datesArray.length <= 1) return [];
  const transitions = [];
  const datesOnly = datesArray.map((dateStr) => dateStr.split(" ")[0]);
  for (let i = 1; i < datesOnly.length; i++) {
    if (datesOnly[i] !== datesOnly[i - 1]) {
      transitions.push({
        oldDayEndIndex: i - 1,
        newDayStartIndex: i,
        oldDay: datesOnly[i - 1] || null,
        newDay: datesOnly[i] || null,
        transitionPoint: i
      });
    }
  }
  return transitions;
}
function createPoints(points, backgrounds, indicator) {
  return points.map((item) => {
    const background = backgrounds[item][indicator.code] || { color: "#fff", value: 0 };
    return {
      time: item,
      type: "point",
      background: background.color,
      value: background.value
    };
  });
}
function createBackgrounds(avg2) {
  return Object.fromEntries(
    Object.entries(avg2).map(([time, value]) => [time, colorer.paintObject(value)])
  );
}
function setTransition(points, transition) {
  let count = 0;
  transition.forEach((item) => {
    points.splice(item.newDayStartIndex + count, 0, { type: "pointBorder", time: item.newDay || "Не указано" });
    count++;
  });
}
function createTimeline({ borders, points, backgrounds, indicator }) {
  const transition = findDayChangeIndex(points);
  const timelineMode = getDiff(borders.start, borders.end) < 5 ? "hour" : "day";
  const newPoints = createPoints(points, backgrounds, indicator);
  if (timelineMode == "hour")
    setTransition(newPoints, transition);
  return { mode: timelineMode, points: newPoints };
}
function useTimeline({ items, avg: avg2 }) {
  const selectedDate = inject("selectedDate");
  const selectedDates = inject("selectedDates");
  const selectedIndicator = inject("selectedIndicator");
  const itemsInPage = 15;
  const selectedIndex = ref(0);
  const page = ref(0);
  const backgrounds = computed(() => {
    return createBackgrounds(avg2.value);
  });
  const timeline = shallowRef({ mode: "hour", points: [] });
  const pointsByPage = computed(() => {
    const from = itemsInPage * page.value;
    const to = from + itemsInPage;
    return timeline.value.points.slice(from, to);
  });
  const maxPage = computed(() => {
    if (!items.value) return 0;
    return Math.ceil(timeline.value.points.length / itemsInPage);
  });
  const increasePage = () => {
    if (page.value + 1 < maxPage.value) {
      page.value += 1;
    }
  };
  const decreasePage = () => {
    if (page.value > 0) {
      page.value -= 1;
    }
  };
  const setSelected = (item, index) => {
    selectedIndex.value = index;
  };
  const pressArrowLeft = () => {
    let index = selectedIndex.value - 1;
    let point = timeline.value.points[index];
    if (point && selectedDate?.value) {
      if (point.type == "pointBorder") {
        index = selectedIndex.value - 2;
        point = timeline.value.points[index];
      }
      selectedIndex.value = index;
      page.value = Math.floor(index / itemsInPage);
      selectedDate.value = point?.time;
    }
  };
  const pressArrowRight = () => {
    let index = selectedIndex.value + 1;
    let point = timeline.value.points[index];
    if (point && selectedDate?.value) {
      if (point.type == "pointBorder") {
        index = selectedIndex.value + 2;
        point = timeline.value.points[index];
      }
      selectedIndex.value = index;
      page.value = Math.floor(index / itemsInPage);
      selectedDate.value = point?.time;
    }
  };
  watch([items, backgrounds], ([newItems, newBackground]) => {
    timeline.value = createTimeline({ points: newItems, borders: selectedDates.value, backgrounds: newBackground, indicator: selectedIndicator.value });
    const finded = timeline.value.points.findIndex((item) => item.time == selectedDate?.value);
    if (finded == -1 && timeline.value.points[0] && selectedDate?.value) {
      selectedDate.value = timeline.value.points[0].time;
      page.value = 0;
    }
    if (finded > -1) {
      page.value = Math.floor(finded / itemsInPage);
      selectedIndex.value = finded + itemsInPage * page.value;
    }
  }, { immediate: true });
  watch(() => selectedDates, () => {
    page.value = 0;
  });
  return {
    page,
    maxPage,
    pointsByPage,
    selectedIndex,
    timeline,
    itemsInPage,
    selectedDates,
    pressArrowLeft,
    pressArrowRight,
    increasePage,
    decreasePage,
    setSelected
  };
}
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "Point",
  __ssrInlineRender: true,
  props: {
    item: {},
    isSelected: { type: Boolean },
    mode: {}
  },
  emits: ["onClick"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const view = computed(() => {
      const s = __props.item.time.split(" ");
      return __props.mode == "day" ? s[0] : s[1].slice(0, -3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = _sfc_main$s;
      _push(ssrRenderComponent(_component_UPopover, mergeProps({
        mode: "hover",
        arrow: "",
        dismissible: false
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="popover-content" data-v-6e07d659${_scopeId}><span data-v-6e07d659${_scopeId}> Среднее <b data-v-6e07d659${_scopeId}>${ssrInterpolate(__props.item.value.toFixed(2))}</b></span></div>`);
          } else {
            return [
              createVNode("div", { class: "popover-content" }, [
                createVNode("span", null, [
                  createTextVNode(" Среднее "),
                  createVNode("b", null, toDisplayString(__props.item.value.toFixed(2)), 1)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([__props.isSelected ? "selected" : "", "point"])}" data-v-6e07d659${_scopeId}><div class="${ssrRenderClass(["point-circle"])}" style="${ssrRenderStyle({ background: __props.item.background })}" data-v-6e07d659${_scopeId}></div><div class="point-text" data-v-6e07d659${_scopeId}>${ssrInterpolate(unref(view))}</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: [__props.isSelected ? "selected" : "", "point"],
                onClick: ($event) => emits("onClick")
              }, [
                createVNode("div", {
                  class: ["point-circle"],
                  style: { background: __props.item.background }
                }, null, 4),
                createVNode("div", { class: "point-text" }, toDisplayString(unref(view)), 1)
              ], 10, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Timeline/components/Point.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const Point = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$q, [["__scopeId", "data-v-6e07d659"]]), { __name: "TimelineComponentsPoint" });
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "PointTransition",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "point" }, _attrs))} data-v-86e99a8a><div class="${ssrRenderClass(["point-circle"])}" data-v-86e99a8a></div><span class="point-text" data-v-86e99a8a>${ssrInterpolate(__props.item.time)}</span></div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Timeline/components/PointTransition.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const PointTransition = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$p, [["__scopeId", "data-v-86e99a8a"]]), { __name: "TimelineComponentsPointTransition" });
const _sfc_main$o = {
  __name: "TimelineComponentsTimeline",
  __ssrInlineRender: true,
  props: ["items", "avg"],
  emits: ["updateDate"],
  setup(__props, { emit: __emit }) {
    const selectedDate = inject("selectedDate");
    const {
      page,
      maxPage,
      pointsByPage,
      itemsInPage,
      timeline,
      selectedDates,
      increasePage,
      decreasePage,
      setSelected
    } = useTimeline({ items: toRef(() => __props.items), avg: toRef(() => __props.avg) });
    const isSelected = (item) => {
      return item.time == selectedDate.value;
    };
    const df = new DateFormatter("ru-RU", {
      dateStyle: "medium"
    });
    const modelValue = shallowRef(selectedDates.value);
    const display = computed(() => {
      const start = df.format(modelValue.value.start.toDate(getLocalTimeZone()));
      return start;
    });
    const setValidValue = () => {
      selectedDates.value = modelValue.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = _sfc_main$s;
      const _component_UButton = _sfc_main$9$1;
      const _component_UCalendar = _sfc_main$r;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "timeline",
        tabindex: "0"
      }, _attrs))} data-v-818bca0f>`);
      _push(ssrRenderComponent(_component_UPopover, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCalendar, {
              range: "",
              class: "p-2",
              modelValue: unref(modelValue),
              "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
              "onUpdate:validModelValue": setValidValue
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCalendar, {
                range: "",
                class: "p-2",
                modelValue: unref(modelValue),
                "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
                "onUpdate:validModelValue": setValidValue
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              style: { "width": "190px" },
              color: "neutral",
              variant: "subtle",
              icon: "i-lucide-calendar"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(display))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(display)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                style: { "width": "190px" },
                color: "neutral",
                variant: "subtle",
                icon: "i-lucide-calendar"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(display)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-818bca0f>${ssrInterpolate(unref(page) + 1)}/${ssrInterpolate(unref(maxPage))}</span><div class="flex flex-col items-end" data-v-818bca0f>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: unref(decreasePage),
        icon: "i-lucide-arrow-left"
      }, null, _parent));
      _push(`</div><div class="timeline-body" data-v-818bca0f>`);
      if (__props.items.length != 0) {
        _push(`<!--[--><div class="line" data-v-818bca0f></div><!--[-->`);
        ssrRenderList(unref(pointsByPage), (item, index) => {
          _push(`<!--[-->`);
          if (item.type == "point") {
            _push(ssrRenderComponent(Point, {
              item,
              mode: unref(timeline).mode,
              onOnClick: ($event) => (selectedDate.value = item.time, unref(setSelected)(item, index + unref(itemsInPage) * unref(page))),
              isSelected: isSelected(item)
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(PointTransition, { item }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<span style="${ssrRenderStyle({ "grid-column": `1 / span ${unref(itemsInPage)}` })}" data-v-818bca0f>Нет данных</span>`);
      }
      _push(`</div><div class="flex flex-col items-start" data-v-818bca0f>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: unref(increasePage),
        icon: "i-lucide-arrow-right"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Timeline/components/Timeline.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const Timeline = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-818bca0f"]]);
const theme$9 = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};
const _sfc_main$n = {
  __name: "UModal",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    scrollable: { type: Boolean, required: false },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("modal", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside: (e) => pointerDownOutside(e, { scrollable: props.scrollable })
      };
    });
    const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme$9), ...appConfig.ui?.modal || {} })({
      transition: props.transition,
      fullscreen: props.fullscreen,
      overlay: props.overlay,
      scrollable: props.scrollable
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DefineContentTemplate), null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$9$1, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(uiProp)?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: unref(uiProp)?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: unref(uiProp)?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: unref(uiProp)?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)("modal.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: unref(uiProp)?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            !!slots.body ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: unref(uiProp)?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close })
                            ], 2)) : createCommentVNode("", true),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: unref(uiProp)?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DialogContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: unref(uiProp)?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true),
                                __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                    props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)("modal.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: unref(uiProp)?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          !!slots.body ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: unref(uiProp)?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close })
                          ], 2)) : createCommentVNode("", true),
                          !!slots.footer ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: unref(uiProp)?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.scrollable) {
                    _push3(ssrRenderComponent(unref(DialogOverlay), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ReuseContentTemplate))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    if (__props.overlay) {
                      _push3(ssrRenderComponent(unref(DialogOverlay), {
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ReuseContentTemplate))
                      ]),
                      _: 1
                    }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, 8, ["class"])) : createCommentVNode("", true),
                      createVNode(unref(ReuseContentTemplate))
                    ], 64))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DefineContentTemplate), null, {
                default: withCtx(() => [
                  createVNode(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: unref(uiProp)?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: unref(uiProp)?.title })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: unref(uiProp)?.description })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                  props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)("modal.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: unref(uiProp)?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        !!slots.body ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: unref(uiProp)?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close })
                        ], 2)) : createCommentVNode("", true),
                        !!slots.footer ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: unref(uiProp)?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1024),
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal), unref(portalProps), {
                default: withCtx(() => [
                  __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseContentTemplate))
                    ]),
                    _: 1
                  }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(ReuseContentTemplate))
                  ], 64))
                ]),
                _: 1
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const theme$8 = {
  "slots": {
    "root": "relative",
    "fieldset": "flex gap-x-2",
    "legend": "mb-1 block font-medium text-default",
    "item": "flex items-start",
    "container": "flex items-center",
    "base": "rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full after:bg-default after:rounded-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "secondary": {
        "base": "focus-visible:outline-secondary",
        "indicator": "bg-secondary"
      },
      "success": {
        "base": "focus-visible:outline-success",
        "indicator": "bg-success"
      },
      "info": {
        "base": "focus-visible:outline-info",
        "indicator": "bg-info"
      },
      "warning": {
        "base": "focus-visible:outline-warning",
        "indicator": "bg-warning"
      },
      "error": {
        "base": "focus-visible:outline-error",
        "indicator": "bg-error"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "item": ""
      },
      "card": {
        "item": "border border-muted rounded-lg"
      },
      "table": {
        "item": "border border-muted"
      }
    },
    "orientation": {
      "horizontal": {
        "fieldset": "flex-row"
      },
      "vertical": {
        "fieldset": "flex-col"
      }
    },
    "indicator": {
      "start": {
        "item": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "item": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs",
        "base": "size-3",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "sm": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs",
        "base": "size-3.5",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "md": {
        "fieldset": "gap-y-1",
        "legend": "text-sm",
        "base": "size-4",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "lg": {
        "fieldset": "gap-y-1",
        "legend": "text-sm",
        "base": "size-4.5",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "xl": {
        "fieldset": "gap-y-1.5",
        "legend": "text-base",
        "base": "size-5",
        "item": "text-base",
        "container": "h-6",
        "indicator": "after:size-2"
      }
    },
    "disabled": {
      "true": {
        "item": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    },
    "required": {
      "true": {
        "legend": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-3"
      }
    },
    {
      "size": "md",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-4.5"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-s-lg last-of-type:rounded-e-lg",
        "fieldset": "gap-0 -space-x-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
        "fieldset": "gap-0 -space-y-px"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-secondary/10 has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-success/10 has-data-[state=checked]:border-success/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-info/10 has-data-[state=checked]:border-info/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-warning/10 has-data-[state=checked]:border-warning/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-error/10 has-data-[state=checked]:border-error/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-elevated has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "variant": [
        "card",
        "table"
      ],
      "disabled": true,
      "class": {
        "item": "cursor-not-allowed"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "list",
    "orientation": "vertical",
    "indicator": "start"
  }
};
const _sfc_main$m = {
  __name: "URadioGroup",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    legend: { type: String, required: false },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    size: { type: null, required: false },
    variant: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    indicator: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    disabled: { type: Boolean, required: false },
    loop: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false }
  },
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("radioGroup", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "loop", "required"), emits);
    const { emitFormChange, emitFormInput, color, name, size, id: _id, disabled, ariaAttrs } = useFormField(props, { bind: false });
    const id = _id.value ?? useId();
    const ui = computed(() => tv({ extend: tv(theme$8), ...appConfig.ui?.radioGroup || {} })({
      size: size.value,
      color: color.value,
      disabled: disabled.value,
      required: props.required,
      orientation: props.orientation,
      variant: props.variant,
      indicator: props.indicator
    }));
    function normalizeItem(item) {
      if (item === null) {
        return {
          id: `${id}:null`,
          value: void 0,
          label: void 0
        };
      }
      if (typeof item === "string" || typeof item === "number" || typeof item === "bigint") {
        return {
          id: `${id}:${item}`,
          value: String(item),
          label: String(item)
        };
      }
      const value = get$1(item, props.valueKey);
      const label = get$1(item, props.labelKey);
      const description = get$1(item, props.descriptionKey);
      return {
        ...item,
        value,
        label,
        description,
        id: `${id}:${value}`
      };
    }
    const normalizedItems = computed(() => {
      if (!props.items) {
        return [];
      }
      return props.items.map(normalizeItem);
    });
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RadioGroupRoot), mergeProps({ id: unref(id) }, unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        orientation: __props.orientation,
        name: unref(name),
        disabled: unref(disabled),
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] }),
        "onUpdate:modelValue": onUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<fieldset${ssrRenderAttrs(mergeProps({
              "data-slot": "fieldset",
              class: ui.value.fieldset({ class: unref(uiProp)?.fieldset })
            }, unref(ariaAttrs)))}${_scopeId}>`);
            if (__props.legend || !!slots.legend) {
              _push2(`<legend data-slot="legend" class="${ssrRenderClass(ui.value.legend({ class: unref(uiProp)?.legend }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "legend", {}, () => {
                _push2(`${ssrInterpolate(__props.legend)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</legend>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(normalizedItems.value, (item) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? "div" : unref(Label)), {
                key: item.value,
                "data-slot": "item",
                class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item, item.class], disabled: item.disabled || unref(disabled) })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: [unref(uiProp)?.container, item.ui?.container] }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(RadioGroupItem), {
                      id: item.id,
                      value: item.value,
                      disabled: item.disabled || unref(disabled),
                      "data-slot": "base",
                      class: ui.value.base({ class: [unref(uiProp)?.base, item.ui?.base], disabled: item.disabled || unref(disabled) })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(RadioGroupIndicator), {
                            "data-slot": "indicator",
                            class: ui.value.indicator({ class: [unref(uiProp)?.indicator, item.ui?.indicator] })
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(RadioGroupIndicator), {
                              "data-slot": "indicator",
                              class: ui.value.indicator({ class: [unref(uiProp)?.indicator, item.ui?.indicator] })
                            }, null, 8, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (item.label || !!slots.label || (item.description || !!slots.description)) {
                      _push3(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: [unref(uiProp)?.wrapper, item.ui?.wrapper] }))}"${_scopeId2}>`);
                      if (item.label || !!slots.label) {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                          for: item.id,
                          "data-slot": "label",
                          class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label], disabled: item.disabled || unref(disabled) })
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              ssrRenderSlot(_ctx.$slots, "label", {
                                item,
                                modelValue: __props.modelValue
                              }, () => {
                                _push4(`${ssrInterpolate(item.label)}`);
                              }, _push4, _parent4, _scopeId3);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "label", {
                                  item,
                                  modelValue: __props.modelValue
                                }, () => [
                                  createTextVNode(toDisplayString(item.label), 1)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }), _parent3, _scopeId2);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (item.description || !!slots.description) {
                        _push3(`<p data-slot="description" class="${ssrRenderClass(ui.value.description({ class: [unref(uiProp)?.description, item.ui?.description], disabled: item.disabled || unref(disabled) }))}"${_scopeId2}>`);
                        ssrRenderSlot(_ctx.$slots, "description", {
                          item,
                          modelValue: __props.modelValue
                        }, () => {
                          _push3(`${ssrInterpolate(item.description)}`);
                        }, _push3, _parent3, _scopeId2);
                        _push3(`</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("div", {
                        "data-slot": "container",
                        class: ui.value.container({ class: [unref(uiProp)?.container, item.ui?.container] })
                      }, [
                        createVNode(unref(RadioGroupItem), {
                          id: item.id,
                          value: item.value,
                          disabled: item.disabled || unref(disabled),
                          "data-slot": "base",
                          class: ui.value.base({ class: [unref(uiProp)?.base, item.ui?.base], disabled: item.disabled || unref(disabled) })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RadioGroupIndicator), {
                              "data-slot": "indicator",
                              class: ui.value.indicator({ class: [unref(uiProp)?.indicator, item.ui?.indicator] })
                            }, null, 8, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["id", "value", "disabled", "class"])
                      ], 2),
                      item.label || !!slots.label || (item.description || !!slots.description) ? (openBlock(), createBlock("div", {
                        key: 0,
                        "data-slot": "wrapper",
                        class: ui.value.wrapper({ class: [unref(uiProp)?.wrapper, item.ui?.wrapper] })
                      }, [
                        item.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                          key: 0,
                          for: item.id,
                          "data-slot": "label",
                          class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label], disabled: item.disabled || unref(disabled) })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "label", {
                              item,
                              modelValue: __props.modelValue
                            }, () => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["for", "class"])) : createCommentVNode("", true),
                        item.description || !!slots.description ? (openBlock(), createBlock("p", {
                          key: 1,
                          "data-slot": "description",
                          class: ui.value.description({ class: [unref(uiProp)?.description, item.ui?.description], disabled: item.disabled || unref(disabled) })
                        }, [
                          renderSlot(_ctx.$slots, "description", {
                            item,
                            modelValue: __props.modelValue
                          }, () => [
                            createTextVNode(toDisplayString(item.description), 1)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ], 2)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
            });
            _push2(`<!--]--></fieldset>`);
          } else {
            return [
              createVNode("fieldset", mergeProps({
                "data-slot": "fieldset",
                class: ui.value.fieldset({ class: unref(uiProp)?.fieldset })
              }, unref(ariaAttrs)), [
                __props.legend || !!slots.legend ? (openBlock(), createBlock("legend", {
                  key: 0,
                  "data-slot": "legend",
                  class: ui.value.legend({ class: unref(uiProp)?.legend })
                }, [
                  renderSlot(_ctx.$slots, "legend", {}, () => [
                    createTextVNode(toDisplayString(__props.legend), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(normalizedItems.value, (item) => {
                  return openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? "div" : unref(Label)), {
                    key: item.value,
                    "data-slot": "item",
                    class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item, item.class], disabled: item.disabled || unref(disabled) })
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        "data-slot": "container",
                        class: ui.value.container({ class: [unref(uiProp)?.container, item.ui?.container] })
                      }, [
                        createVNode(unref(RadioGroupItem), {
                          id: item.id,
                          value: item.value,
                          disabled: item.disabled || unref(disabled),
                          "data-slot": "base",
                          class: ui.value.base({ class: [unref(uiProp)?.base, item.ui?.base], disabled: item.disabled || unref(disabled) })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RadioGroupIndicator), {
                              "data-slot": "indicator",
                              class: ui.value.indicator({ class: [unref(uiProp)?.indicator, item.ui?.indicator] })
                            }, null, 8, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["id", "value", "disabled", "class"])
                      ], 2),
                      item.label || !!slots.label || (item.description || !!slots.description) ? (openBlock(), createBlock("div", {
                        key: 0,
                        "data-slot": "wrapper",
                        class: ui.value.wrapper({ class: [unref(uiProp)?.wrapper, item.ui?.wrapper] })
                      }, [
                        item.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                          key: 0,
                          for: item.id,
                          "data-slot": "label",
                          class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label], disabled: item.disabled || unref(disabled) })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "label", {
                              item,
                              modelValue: __props.modelValue
                            }, () => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["for", "class"])) : createCommentVNode("", true),
                        item.description || !!slots.description ? (openBlock(), createBlock("p", {
                          key: 1,
                          "data-slot": "description",
                          class: ui.value.description({ class: [unref(uiProp)?.description, item.ui?.description], disabled: item.disabled || unref(disabled) })
                        }, [
                          renderSlot(_ctx.$slots, "description", {
                            item,
                            modelValue: __props.modelValue
                          }, () => [
                            createTextVNode(toDisplayString(item.description), 1)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["class"]);
                }), 128))
              ], 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/RadioGroup.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const theme$7 = {
  "slots": {
    "root": "flex items-center align-center text-center",
    "border": "",
    "container": "font-medium text-default flex",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xs",
    "label": "text-sm"
  },
  "variants": {
    "color": {
      "primary": {
        "border": "border-primary"
      },
      "secondary": {
        "border": "border-secondary"
      },
      "success": {
        "border": "border-success"
      },
      "info": {
        "border": "border-info"
      },
      "warning": {
        "border": "border-warning"
      },
      "error": {
        "border": "border-error"
      },
      "neutral": {
        "border": "border-default"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex-row",
        "border": "w-full",
        "container": "mx-3 whitespace-nowrap"
      },
      "vertical": {
        "root": "h-full flex-col",
        "border": "h-full",
        "container": "my-2"
      }
    },
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "type": {
      "solid": {
        "border": "border-solid"
      },
      "dashed": {
        "border": "border-dashed"
      },
      "dotted": {
        "border": "border-dotted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "border": "border-t"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "border": "border-t-[2px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "border": "border-t-[3px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "border": "border-t-[4px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "border": "border-t-[5px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "border": "border-s"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "border": "border-s-[2px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "border": "border-s-[3px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "border": "border-s-[4px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "border": "border-s-[5px]"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral",
    "size": "xs",
    "type": "solid"
  }
};
const _sfc_main$l = {
  __name: "USeparator",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    label: { type: String, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    type: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    decorative: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("separator", props);
    const rootProps = useForwardProps(reactivePick(props, "as", "decorative", "orientation"));
    const ui = computed(() => tv({ extend: tv(theme$7), ...appConfig.ui?.separator || {} })({
      color: props.color,
      orientation: props.orientation,
      size: props.size,
      type: props.type
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Separator), mergeProps(unref(rootProps), {
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="border" class="${ssrRenderClass(ui.value.border({ class: unref(uiProp)?.border }))}"${_scopeId}></div>`);
            if (__props.label || __props.icon || __props.avatar || !!slots.default) {
              _push2(`<!--[--><div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(uiProp)?.container }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
                if (__props.label) {
                  _push2(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: unref(uiProp)?.label }))}"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
                } else if (__props.icon) {
                  _push2(ssrRenderComponent(_sfc_main$e$1, {
                    name: __props.icon,
                    "data-slot": "icon",
                    class: ui.value.icon({ class: unref(uiProp)?.icon })
                  }, null, _parent2, _scopeId));
                } else if (__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$c$1, mergeProps({
                    size: unref(uiProp)?.avatarSize || ui.value.avatarSize()
                  }, __props.avatar, {
                    "data-slot": "avatar",
                    class: ui.value.avatar({ class: unref(uiProp)?.avatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div><div data-slot="border" class="${ssrRenderClass(ui.value.border({ class: unref(uiProp)?.border }))}"${_scopeId}></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                "data-slot": "border",
                class: ui.value.border({ class: unref(uiProp)?.border })
              }, null, 2),
              __props.label || __props.icon || __props.avatar || !!slots.default ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("div", {
                  "data-slot": "container",
                  class: ui.value.container({ class: unref(uiProp)?.container })
                }, [
                  renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                    __props.label ? (openBlock(), createBlock("span", {
                      key: 0,
                      "data-slot": "label",
                      class: ui.value.label({ class: unref(uiProp)?.label })
                    }, toDisplayString(__props.label), 3)) : __props.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                      key: 1,
                      name: __props.icon,
                      "data-slot": "icon",
                      class: ui.value.icon({ class: unref(uiProp)?.icon })
                    }, null, 8, ["name", "class"])) : __props.avatar ? (openBlock(), createBlock(_sfc_main$c$1, mergeProps({
                      key: 2,
                      size: unref(uiProp)?.avatarSize || ui.value.avatarSize()
                    }, __props.avatar, {
                      "data-slot": "avatar",
                      class: ui.value.avatar({ class: unref(uiProp)?.avatar })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ])
                ], 2),
                createVNode("div", {
                  "data-slot": "border",
                  class: ui.value.border({ class: unref(uiProp)?.border })
                }, null, 2)
              ], 64)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Separator.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const theme$6 = {
  "slots": {
    "base": "font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
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
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-md",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    },
    "square": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-primary text-inverted"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-secondary text-inverted"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "bg-success text-inverted"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "bg-info text-inverted"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "bg-warning text-inverted"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "bg-error text-inverted"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-primary ring ring-inset ring-primary/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-secondary ring ring-inset ring-secondary/50"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "text-success ring ring-inset ring-success/50"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "text-info ring ring-inset ring-info/50"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "text-warning ring ring-inset ring-warning/50"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "text-error ring ring-inset ring-error/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-primary/10 text-primary"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-secondary/10 text-secondary"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "bg-success/10 text-success"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "bg-info/10 text-info"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "bg-warning/10 text-warning"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "bg-error/10 text-error"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "bg-success/10 text-success ring ring-inset ring-success/25"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "bg-info/10 text-info ring ring-inset ring-info/25"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "bg-error/10 text-error ring ring-inset ring-error/25"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-0.5"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-1"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$k = {
  __name: "UBadge",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "span" },
    label: { type: [String, Number], required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("badge", props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => tv({ extend: tv(theme$6), ...appConfig.ui?.badge || {} })({
      color: props.color,
      variant: props.variant,
      size: fieldGroupSize.value || props.size,
      square: props.square || !slots.default && !props.label,
      fieldGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "base",
        class: ui.value.base({ class: [unref(uiProp)?.base, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
              if (unref(isLeading) && unref(leadingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$e$1, {
                  name: unref(leadingIconName),
                  "data-slot": "leadingIcon",
                  class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
                }, null, _parent2, _scopeId));
              } else if (!!__props.avatar) {
                _push2(ssrRenderComponent(_sfc_main$c$1, mergeProps({
                  size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                }, __props.avatar, {
                  "data-slot": "leadingAvatar",
                  class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
              if (__props.label !== void 0 && __props.label !== null) {
                _push2(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: unref(uiProp)?.label }))}"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
              if (unref(isTrailing) && unref(trailingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$e$1, {
                  name: unref(trailingIconName),
                  "data-slot": "trailingIcon",
                  class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e$1, {
                  key: 0,
                  name: unref(leadingIconName),
                  "data-slot": "leadingIcon",
                  class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c$1, mergeProps({
                  key: 1,
                  size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                }, __props.avatar, {
                  "data-slot": "leadingAvatar",
                  class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar })
                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                  key: 0,
                  "data-slot": "label",
                  class: ui.value.label({ class: unref(uiProp)?.label })
                }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e$1, {
                  key: 0,
                  name: unref(trailingIconName),
                  "data-slot": "trailingIcon",
                  class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Badge.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const theme$5 = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};
const _sfc_main$j = {
  __name: "UTabs",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    content: { type: Boolean, required: false, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultValue: { type: [String, Number], required: false, default: "0" },
    modelValue: { type: [String, Number], required: false },
    activationMode: { type: String, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("tabs", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "unmountOnHide"), emits);
    const ui = computed(() => tv({ extend: tv(theme$5), ...appConfig.ui?.tabs || {} })({
      color: props.color,
      variant: props.variant,
      size: props.size,
      orientation: props.orientation
    }));
    const triggersRef = ref([]);
    function setTriggerRef(index, el) {
      triggersRef.value[index] = el;
    }
    __expose({
      triggersRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        orientation: __props.orientation,
        "activation-mode": __props.activationMode,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), {
              "data-slot": "list",
              class: ui.value.list({ class: unref(uiProp)?.list })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: unref(uiProp)?.indicator })
                  }, null, _parent3, _scopeId2));
                  ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.items, (item, index) => {
                    _push3(ssrRenderComponent(unref(TabsTrigger), {
                      key: index,
                      ref_for: true,
                      ref: (el) => setTriggerRef(index, el),
                      value: unref(get$1)(item, props.valueKey) ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [unref(uiProp)?.trigger, item.ui?.trigger] })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.icon) {
                              _push4(ssrRenderComponent(_sfc_main$e$1, {
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, _parent4, _scopeId3));
                            } else if (item.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$c$1, mergeProps({
                                size: item.ui?.leadingAvatarSize || unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          if (unref(get$1)(item, props.labelKey) || !!slots.default) {
                            _push4(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => {
                              _push4(`${ssrInterpolate(unref(get$1)(item, props.labelKey))}`);
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.badge || item.badge === 0) {
                              _push4(ssrRenderComponent(_sfc_main$k, mergeProps({
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$c$1, mergeProps({
                                key: 1,
                                size: item.ui?.leadingAvatarSize || unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ]),
                            unref(get$1)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get$1)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$k, mergeProps({
                                key: 0,
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode(unref(TabsIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: unref(uiProp)?.indicator })
                    }, null, 8, ["class"]),
                    renderSlot(_ctx.$slots, "list-leading"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                      return openBlock(), createBlock(unref(TabsTrigger), {
                        key: index,
                        ref_for: true,
                        ref: (el) => setTriggerRef(index, el),
                        value: unref(get$1)(item, props.valueKey) ?? String(index),
                        disabled: item.disabled,
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [unref(uiProp)?.trigger, item.ui?.trigger] })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                              key: 0,
                              name: item.icon,
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                            }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$c$1, mergeProps({
                              key: 1,
                              size: item.ui?.leadingAvatarSize || unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                            }, { ref_for: true }, item.avatar, {
                              "data-slot": "leadingAvatar",
                              class: ui.value.leadingAvatar({ class: [unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ]),
                          unref(get$1)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "label",
                            class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] })
                          }, [
                            renderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => [
                              createTextVNode(toDisplayString(unref(get$1)(item, props.labelKey)), 1)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$k, mergeProps({
                              key: 0,
                              color: "neutral",
                              variant: "outline",
                              size: item.ui?.trailingBadgeSize || unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                            }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                              "data-slot": "trailingBadge",
                              class: ui.value.trailingBadge({ class: [unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled", "class"]);
                    }), 128)),
                    renderSlot(_ctx.$slots, "list-trailing")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!__props.content) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.items, (item, index) => {
                _push2(ssrRenderComponent(unref(TabsContent), {
                  key: index,
                  value: unref(get$1)(item, props.valueKey) ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, item.slot || "content", {
                        item,
                        index,
                        ui: ui.value
                      }, () => {
                        _push3(`${ssrInterpolate(item.content)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          createTextVNode(toDisplayString(item.content), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(TabsList), {
                "data-slot": "list",
                class: ui.value.list({ class: unref(uiProp)?.list })
              }, {
                default: withCtx(() => [
                  createVNode(unref(TabsIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: unref(uiProp)?.indicator })
                  }, null, 8, ["class"]),
                  renderSlot(_ctx.$slots, "list-leading"),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                    return openBlock(), createBlock(unref(TabsTrigger), {
                      key: index,
                      ref_for: true,
                      ref: (el) => setTriggerRef(index, el),
                      value: unref(get$1)(item, props.valueKey) ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [unref(uiProp)?.trigger, item.ui?.trigger] })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "leading", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$c$1, mergeProps({
                            key: 1,
                            size: item.ui?.leadingAvatarSize || unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                          }, { ref_for: true }, item.avatar, {
                            "data-slot": "leadingAvatar",
                            class: ui.value.leadingAvatar({ class: [unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ]),
                        unref(get$1)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "label",
                          class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label] })
                        }, [
                          renderSlot(_ctx.$slots, "default", {
                            item,
                            index
                          }, () => [
                            createTextVNode(toDisplayString(unref(get$1)(item, props.labelKey)), 1)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "trailing", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$k, mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled", "class"]);
                  }), 128)),
                  renderSlot(_ctx.$slots, "list-trailing")
                ]),
                _: 3
              }, 8, ["class"]),
              !!__props.content ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.items, (item, index) => {
                return openBlock(), createBlock(unref(TabsContent), {
                  key: index,
                  value: unref(get$1)(item, props.valueKey) ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot || "content", {
                      item,
                      index,
                      ui: ui.value
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "class"]);
              }), 128)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const iaqi = "#E55D3A";
const i371 = "#D97A5C";
const i58 = "#FF006E";
const i59 = "#FFAB00";
const i60 = "#4DB89A";
const i1 = "#A85AB3";
const i64 = "#00C853";
const i62 = "#D500F9";
const i63 = "#D98A4A";
const i312 = "#9E5AA8";
const i296 = "#6AAE72";
const i298 = "#4A8CB0";
const i311 = "#B57A3A";
const lineColor = {
  iaqi,
  i371,
  i58,
  i59,
  i60,
  "m-p": "#D94A6E",
  i1,
  "p-pm10": "#D98A2A",
  "p-pm2": "#D9701A",
  "m-h": "#2979FF",
  "m-wd": "#3A9E9E",
  i64,
  i62,
  "m-wv": "#4CB89A",
  "m-t": "#D94A4A",
  i63,
  i312,
  i296,
  i298,
  i311
};
function calculateHourlyAverage(allSitesData) {
  const timeMap = /* @__PURE__ */ new Map();
  for (const siteData of allSitesData) {
    for (const [time, value] of siteData) {
      const existing = timeMap.get(time);
      if (existing) {
        existing.sum += value;
        existing.count++;
      } else {
        timeMap.set(time, { sum: value, count: 1 });
      }
    }
  }
  const result = [];
  for (const [time, { sum, count }] of timeMap.entries()) {
    result.push([time, (sum / count).toFixed(3)]);
  }
  result.sort((a, b) => a[0].localeCompare(b[0]));
  return result;
}
function normalizeEntry(entry, mode) {
  if (!Array.isArray(entry) || entry.length !== 2) return null;
  const [dateTimeStr, value] = entry;
  if (typeof dateTimeStr !== "string") return null;
  const [datePart, timePart] = dateTimeStr.split(" ");
  if (!datePart || !timePart) return null;
  const [year, month, day] = datePart.split("-").map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  let dateObj;
  if (mode === "daily") {
    dateObj = new Date(year, month - 1, day);
  } else {
    const hour = parseInt(timePart.split(":")[0], 10);
    if (isNaN(hour)) return null;
    dateObj = new Date(year, month - 1, day, hour);
  }
  if (isNaN(dateObj.getTime())) return null;
  let key;
  if (mode === "daily") {
    key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  } else {
    const hour = dateObj.getHours();
    key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}|${hour}`;
  }
  return { key, dateObj, value };
}
function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function formatDate(date, mode) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  if (mode === "daily") {
    return `${year}-${month}-${day} 00:00:00`;
  } else {
    const hour = String(date.getHours()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:00:00`;
  }
}
function buildMapAndRange(data, mode, forcedStart, forcedEnd) {
  const map = /* @__PURE__ */ new Map();
  let minDate = forcedStart ? new Date(forcedStart) : null;
  let maxDate = forcedEnd ? new Date(forcedEnd) : null;
  for (const entry of data) {
    const normalized = normalizeEntry(entry, mode);
    if (!normalized) continue;
    const { key, dateObj, value } = normalized;
    map.set(key, value);
    if (!forcedStart) {
      const dayStart = startOfDay(dateObj);
      const ts = dayStart.getTime();
      if (minDate === null || ts < minDate.getTime()) minDate = dayStart;
      if (maxDate === null || ts > maxDate.getTime()) maxDate = dayStart;
    }
  }
  if (minDate === null || maxDate === null) return { map, minDate: null, maxDate: null };
  if (forcedStart) minDate.setHours(0, 0, 0, 0);
  if (forcedEnd) maxDate.setHours(0, 0, 0, 0);
  return { map, minDate, maxDate };
}
function generateHourly(minDate, maxDate, existingMap) {
  const result = [];
  let current = new Date(minDate);
  while (current.getTime() <= maxDate.getTime()) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    for (let hour = 0; hour <= 23; hour++) {
      const key = `${dateStr}|${hour}`;
      const value = existingMap.has(key) ? existingMap.get(key) : null;
      const dateObj = new Date(year, current.getMonth(), current.getDate(), hour);
      result.push([formatDate(dateObj, "hourly"), value]);
    }
    current.setDate(current.getDate() + 1);
  }
  return result;
}
function generateDaily(minDate, maxDate, existingMap) {
  const result = [];
  let current = new Date(minDate);
  while (current.getTime() <= maxDate.getTime()) {
    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;
    const value = existingMap.has(key) ? existingMap.get(key) : null;
    result.push([formatDate(current, "daily"), value]);
    current.setDate(current.getDate() + 1);
  }
  return result;
}
function detectMode(data) {
  const uniqueDays = /* @__PURE__ */ new Set();
  for (const entry of data) {
    if (!Array.isArray(entry) || entry.length !== 2) continue;
    const dateTimeStr = entry[0];
    if (typeof dateTimeStr !== "string") continue;
    const datePart = dateTimeStr.split(" ")[0];
    if (datePart) uniqueDays.add(datePart);
  }
  return uniqueDays.size <= 5 ? "hourly" : "daily";
}
function fillMissingData(data, startDate, endDate) {
  if (!Array.isArray(data) || data.length === 0) return [];
  const mode = detectMode(data);
  const { map, minDate, maxDate } = buildMapAndRange(data, mode, startDate, endDate);
  if (minDate === null || maxDate === null) return [];
  if (mode === "hourly") {
    return generateHourly(minDate, maxDate, map);
  } else {
    return generateDaily(minDate, maxDate, map);
  }
}
let DefaultStrategy$1 = class DefaultStrategy {
  createChart({ siteData, indicator, indexY, code }) {
    return siteData.map((site) => {
      const data = site.data?.map((d) => d[code || 0] ? [d.time, d[code || 0] || null] : null, { groupId: indicator?.name });
      const color = indicator?.code ? lineColor[indicator.code] : "#000000";
      return {
        data: data || [],
        type: "line",
        name: `${site.name}. ${indicator?.name}`,
        showSymbol: true,
        yAxisIndex: indexY,
        symbolSize: 2,
        itemStyle: { color }
      };
    });
  }
};
class AvgStrategy {
  createChart({ siteData, indicator, indexY, code }) {
    const series = siteData.map((site) => {
      const data = site.data?.map((d) => [d.time, d[code || 0] || null]);
      return data;
    });
    const avg2 = calculateHourlyAverage(series);
    const color = indicator?.code ? lineColor[indicator.code] : "#000000";
    return [{
      data: avg2 || [],
      type: "line",
      name: `${indicator?.name}`,
      showSymbol: true,
      yAxisIndex: indexY,
      symbolSize: 2,
      itemStyle: { color }
    }];
  }
}
let YearStrategy$1 = class YearStrategy {
  createChart({ siteData, indicator, indexY, code }) {
    return siteData.map((site, indexX) => {
      const data = site.data?.map((d) => d[code || 0] ? [d.time, d[code || 0] || null] : null, { groupId: indicator?.name });
      const { start: startDate, end: endDate } = site;
      const color = indicator?.code ? lineColor[indicator.code] : "#000000";
      const fillData = fillMissingData(data, startDate, endDate);
      return {
        data: fillData || [],
        type: "line",
        name: `${site.name}. ${indicator?.name}`,
        showSymbol: true,
        yAxisIndex: indexY,
        xAxisIndex: indexX,
        symbolSize: 2,
        itemStyle: { color }
      };
    });
  }
};
const defaultStrategy$1 = new DefaultStrategy$1();
const avgStrategy = new AvgStrategy();
const yearStrategy$1 = new YearStrategy$1();
const chartStrategies = { default: defaultStrategy$1, avg: avgStrategy, year: yearStrategy$1 };
const setDialogDataService = new SetDataService({ uid: "khlnn3o37xah7pj2" });
const cache = /* @__PURE__ */ new Map();
const getOptions = (timePeriod) => {
  const { start, end } = timePeriod;
  const startStr = start.toString();
  const endStr = end.toString();
  const timeInterval = getDiff(start, end) < 5 ? "hour" : "day";
  return { startStr, endStr, timeInterval };
};
const get = async ({ selected, timePeriod, sites }) => {
  const { startStr, endStr, timeInterval } = getOptions(timePeriod);
  const finded = selected.map((id) => sites.find((s) => s.id === id)).filter((s) => s !== void 0);
  const promises = finded.map(async (site) => {
    const { id, codeDta } = site;
    const dataFromCache = cache.get(`${startStr}/${endStr}/${site.id}`);
    if (dataFromCache) {
      return { data: dataFromCache, ...site };
    } else {
      const data = await setDialogDataService.getDataById({
        begin: startStr,
        end: endStr,
        timeInterval,
        codeDta,
        id
      });
      cache.set(`${startStr}/${endStr}/${site.id}`, data);
      return { data, ...site, start: startStr, end: endStr };
    }
  });
  return await Promise.all(promises);
};
class DefaultStrategy2 {
  async getData(options) {
    return await get(options);
  }
}
class YearStrategy2 {
  async getData(options) {
    const { start, end } = options.timePeriod;
    let changedStart = new CalendarDate(start.year, start.month, start.day);
    let changedEnd = new CalendarDate(end.year, end.month, end.day);
    const promises = [];
    for (let i = end.year; i >= 2024; i--) {
      promises.push(get({ selected: options.selected, timePeriod: { start: changedStart, end: changedEnd }, sites: options.sites }));
      changedStart = changedStart.subtract({ years: 1 });
      changedEnd = changedEnd.subtract({ years: 1 });
    }
    return Promise.all(promises).then((e) => {
      return e.flat();
    });
  }
}
const defaultStrategy = new DefaultStrategy2();
const yearStrategy = new YearStrategy2();
const dataStrategies = { default: defaultStrategy, avg: defaultStrategy, year: yearStrategy };
function useSiteDialog() {
  const selectedFeature = inject("selectedFeature");
  const selectedIndicator = inject("selectedIndicator");
  const selectedDates = inject("selectedDates");
  const indicators = inject("indicators");
  const sites = inject("sites");
  const timePeriod = shallowRef({ ...selectedDates.value });
  const value = shallowRef([selectedIndicator?.value.code || "m-t"]);
  const siteData = shallowRef([]);
  const selectedSites = ref([]);
  const mode = ref("avg");
  selectedSites.value.push(selectedFeature?.value.properties.id);
  const selectedChartStrategy = computed(() => chartStrategies[mode.value] || chartStrategies["default"]);
  const selectedDataStrategy = computed(() => dataStrategies[mode.value] || dataStrategies["default"]);
  const lastData = computed(() => {
    const allIndicators = [...new Set(
      siteData.value.flatMap(
        (site) => site.data?.flatMap((dataItem) => Object.keys(dataItem)) ?? []
      )
    )];
    const matchedIndicators = indicators.filter(
      (indicator) => allIndicators.includes(`${indicator.code}`)
    );
    return matchedIndicators;
  });
  const chartData = computed(() => {
    if (!selectedFeature?.value) {
      return [];
    }
    const res = value.value.map((code, indexY) => {
      const indicator = indicators?.find((i) => i.code == code);
      if (indicator)
        return selectedChartStrategy.value.createChart({
          siteData: siteData.value,
          indicator,
          indexY,
          code
        });
    }).flat();
    return res;
  });
  watch(selectedSites, async (selected) => {
    selectedDataStrategy.value.getData({
      selected,
      timePeriod: timePeriod.value,
      sites: sites.value
    }).then((r) => siteData.value = r);
  }, { immediate: true });
  watch(timePeriod, async (newTimePeriod) => {
    selectedDataStrategy.value.getData({
      selected: selectedSites.value,
      timePeriod: newTimePeriod,
      sites: sites.value
    }).then((r) => siteData.value = r);
  });
  watch(mode, async (value2) => {
    selectedDataStrategy.value.getData({
      selected: selectedSites.value,
      timePeriod: timePeriod.value,
      sites: sites.value
    }).then((r) => siteData.value = r);
  });
  return { selectedFeature, timePeriod, chartData, selectedIndicator, value, lastData, selectedSites, mode };
}
const theme$4 = {
  "slots": {
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full text-inverted",
    "icon": "shrink-0 size-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "secondary": {
        "base": "focus-visible:outline-secondary",
        "indicator": "bg-secondary"
      },
      "success": {
        "base": "focus-visible:outline-success",
        "indicator": "bg-success"
      },
      "info": {
        "base": "focus-visible:outline-info",
        "indicator": "bg-info"
      },
      "warning": {
        "base": "focus-visible:outline-warning",
        "indicator": "bg-warning"
      },
      "error": {
        "base": "focus-visible:outline-error",
        "indicator": "bg-error"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "root": ""
      },
      "card": {
        "root": "border border-muted rounded-lg"
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": "card",
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "card",
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "card",
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "card",
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "card",
      "class": {
        "root": "p-4.5"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "variant": "card",
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "list",
    "indicator": "start"
  }
};
const _sfc_main$i = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UCheckbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    indicator: { type: null, required: false },
    icon: { type: null, required: false },
    indeterminateIcon: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    name: { type: String, required: false },
    value: { type: null, required: false },
    id: { type: String, required: false },
    defaultValue: { type: [Boolean, String], required: false }
  }, {
    "modelValue": { type: [Boolean, String], ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = useSlots();
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue", { type: [Boolean, String], ...{ default: void 0 } });
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("checkbox", props);
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id = _id.value ?? useId();
    const attrs = useAttrs();
    const forwardedAttrs = computed(() => {
      const { "data-state": _, ...rest } = attrs;
      return rest;
    });
    const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.checkbox || {} })({
      size: size.value,
      color: color.value,
      variant: props.variant,
      indicator: props.indicator,
      required: props.required,
      disabled: disabled.value
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: !__props.variant || __props.variant === "list" ? __props.as : unref(Label),
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(uiProp)?.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ...forwardedAttrs.value, ...unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
              name: unref(name),
              disabled: unref(disabled),
              "data-slot": "base",
              class: ui.value.base({ class: unref(uiProp)?.base })
            }), {
              default: withCtx(({ modelValue: modelValue2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CheckboxIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: unref(uiProp)?.indicator })
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (modelValue2 === "indeterminate") {
                          _push4(ssrRenderComponent(_sfc_main$e$1, {
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: unref(uiProp)?.icon })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$e$1, {
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: unref(uiProp)?.icon })
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$e$1, {
                            key: 0,
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: unref(uiProp)?.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$e$1, {
                            key: 1,
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: unref(uiProp)?.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CheckboxIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: unref(uiProp)?.indicator })
                    }, {
                      default: withCtx(() => [
                        modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$e$1, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: unref(uiProp)?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$e$1, {
                          key: 1,
                          name: __props.icon || unref(appConfig).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: unref(uiProp)?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
              _push2(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId}>`);
              if (__props.label || !!slots.label) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  for: unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: unref(uiProp)?.label })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                        _push3(`${ssrInterpolate(__props.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          createTextVNode(toDisplayString(__props.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push2(`<p data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(uiProp)?.description }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                  _push2(`${ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: unref(uiProp)?.container })
              }, [
                createVNode(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ...forwardedAttrs.value, ...unref(ariaAttrs) }, {
                  modelValue: modelValue.value,
                  "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
                  name: unref(name),
                  disabled: unref(disabled),
                  "data-slot": "base",
                  class: ui.value.base({ class: unref(uiProp)?.base })
                }), {
                  default: withCtx(({ modelValue: modelValue2 }) => [
                    createVNode(unref(CheckboxIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: unref(uiProp)?.indicator })
                    }, {
                      default: withCtx(() => [
                        modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$e$1, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: unref(uiProp)?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$e$1, {
                          key: 1,
                          name: __props.icon || unref(appConfig).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: unref(uiProp)?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  _: 1
                }, 16, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
              ], 2),
              __props.label || !!slots.label || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
              }, [
                __props.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  key: 0,
                  for: unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: unref(uiProp)?.label })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      createTextVNode(toDisplayString(__props.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: unref(uiProp)?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const theme$3 = {
  "slots": {
    "root": "relative",
    "fieldset": "flex gap-x-2",
    "legend": "mb-1 block font-medium text-default",
    "item": ""
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "fieldset": "flex-row"
      },
      "vertical": {
        "fieldset": "flex-col"
      }
    },
    "color": {
      "primary": {},
      "secondary": {},
      "success": {},
      "info": {},
      "warning": {},
      "error": {},
      "neutral": {}
    },
    "variant": {
      "list": {},
      "card": {},
      "table": {
        "item": "border border-muted"
      }
    },
    "size": {
      "xs": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs"
      },
      "sm": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs"
      },
      "md": {
        "fieldset": "gap-y-1",
        "legend": "text-sm"
      },
      "lg": {
        "fieldset": "gap-y-1",
        "legend": "text-sm"
      },
      "xl": {
        "fieldset": "gap-y-1.5",
        "legend": "text-base"
      }
    },
    "required": {
      "true": {
        "legend": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {}
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": "table",
      "class": {
        "item": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "table",
      "class": {
        "item": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "table",
      "class": {
        "item": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "table",
      "class": {
        "item": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "table",
      "class": {
        "item": "p-4.5"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-s-lg last-of-type:rounded-e-lg",
        "fieldset": "gap-0 -space-x-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
        "fieldset": "gap-0 -space-y-px"
      }
    },
    {
      "color": "primary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-secondary/10 has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-success/10 has-data-[state=checked]:border-success/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-info/10 has-data-[state=checked]:border-info/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-warning/10 has-data-[state=checked]:border-warning/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-error/10 has-data-[state=checked]:border-error/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-elevated has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "variant": "table",
      "disabled": true,
      "class": {
        "item": "cursor-not-allowed"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "variant": "list",
    "color": "primary"
  }
};
const _sfc_main$h = {
  __name: "UCheckboxGroup",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    legend: { type: String, required: false },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    size: { type: null, required: false },
    variant: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    disabled: { type: Boolean, required: false },
    loop: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    color: { type: null, required: false },
    indicator: { type: null, required: false },
    icon: { type: null, required: false }
  },
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("checkboxGroup", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "modelValue", "defaultValue", "orientation", "loop", "required"), emits);
    const checkboxProps = useForwardProps(reactivePick(props, "variant", "indicator", "icon"));
    const getProxySlots = () => omit(slots, ["legend"]);
    const { emitFormChange, emitFormInput, color, name, size, id: _id, disabled, ariaAttrs } = useFormField(props, { bind: false });
    const id = _id.value ?? useId();
    const ui = computed(() => tv({ extend: theme$3, ...appConfig.ui?.checkboxGroup || {} })({
      size: size.value,
      required: props.required,
      orientation: props.orientation,
      color: props.color,
      variant: props.variant,
      disabled: disabled.value
    }));
    function normalizeItem(item) {
      if (item === null) {
        return {
          id: `${id}:null`,
          value: void 0,
          label: void 0
        };
      }
      if (typeof item === "string" || typeof item === "number") {
        return {
          id: `${id}:${item}`,
          value: String(item),
          label: String(item)
        };
      }
      const value = get$1(item, props.valueKey);
      const label = get$1(item, props.labelKey);
      const description = get$1(item, props.descriptionKey);
      return {
        ...item,
        value,
        label,
        description,
        id: `${id}:${value}`
      };
    }
    const normalizedItems = computed(() => {
      if (!props.items) {
        return [];
      }
      return props.items.map(normalizeItem);
    });
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CheckboxGroupRoot), mergeProps({ id: unref(id) }, unref(rootProps), {
        name: unref(name),
        disabled: unref(disabled),
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] }),
        "onUpdate:modelValue": onUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<fieldset${ssrRenderAttrs(mergeProps({
              "data-slot": "fieldset",
              class: ui.value.fieldset({ class: unref(uiProp)?.fieldset })
            }, unref(ariaAttrs)))}${_scopeId}>`);
            if (__props.legend || !!slots.legend) {
              _push2(`<legend data-slot="legend" class="${ssrRenderClass(ui.value.legend({ class: unref(uiProp)?.legend }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "legend", {}, () => {
                _push2(`${ssrInterpolate(__props.legend)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</legend>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(normalizedItems.value, (item) => {
              _push2(ssrRenderComponent(_sfc_main$i, mergeProps({
                key: item.value
              }, { ref_for: true }, { ...item, ...unref(checkboxProps) }, {
                color: unref(color),
                size: unref(size),
                name: unref(name),
                disabled: item.disabled || unref(disabled),
                ui: { ...unref(uiProp) ? unref(omit)(unref(uiProp), ["root"]) : void 0, ...item.ui || {} },
                "data-slot": "item",
                class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item, item.class], disabled: item.disabled || unref(disabled) })
              }), createSlots({ _: 2 }, [
                renderList(getProxySlots(), (_2, name2) => {
                  return {
                    name: name2,
                    fn: withCtx((_3, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        ssrRenderSlot(_ctx.$slots, name2, { item }, null, _push3, _parent3, _scopeId2);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, name2, { item })
                        ];
                      }
                    })
                  };
                })
              ]), _parent2, _scopeId));
            });
            _push2(`<!--]--></fieldset>`);
          } else {
            return [
              createVNode("fieldset", mergeProps({
                "data-slot": "fieldset",
                class: ui.value.fieldset({ class: unref(uiProp)?.fieldset })
              }, unref(ariaAttrs)), [
                __props.legend || !!slots.legend ? (openBlock(), createBlock("legend", {
                  key: 0,
                  "data-slot": "legend",
                  class: ui.value.legend({ class: unref(uiProp)?.legend })
                }, [
                  renderSlot(_ctx.$slots, "legend", {}, () => [
                    createTextVNode(toDisplayString(__props.legend), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(normalizedItems.value, (item) => {
                  return openBlock(), createBlock(_sfc_main$i, mergeProps({
                    key: item.value
                  }, { ref_for: true }, { ...item, ...unref(checkboxProps) }, {
                    color: unref(color),
                    size: unref(size),
                    name: unref(name),
                    disabled: item.disabled || unref(disabled),
                    ui: { ...unref(uiProp) ? unref(omit)(unref(uiProp), ["root"]) : void 0, ...item.ui || {} },
                    "data-slot": "item",
                    class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item, item.class], disabled: item.disabled || unref(disabled) })
                  }), createSlots({ _: 2 }, [
                    renderList(getProxySlots(), (_2, name2) => {
                      return {
                        name: name2,
                        fn: withCtx(() => [
                          renderSlot(_ctx.$slots, name2, { item })
                        ])
                      };
                    })
                  ]), 1040, ["color", "size", "name", "disabled", "ui", "class"]);
                }), 128))
              ], 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/CheckboxGroup.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "IndicatorsList",
  __ssrInlineRender: true,
  props: {
    items: {},
    selectedIndicator: {}
  },
  emits: ["select-indicator"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const groupItems = computed(() => {
      return __props.items?.map((item) => {
        return {
          label: `${item.name}` || `Не указано`,
          meaning: `${item.value}`,
          value: item.code
        };
      });
    });
    const value = computed({
      get() {
        return __props.selectedIndicator;
      },
      set(v) {
        if (v.length > 0)
          emits("select-indicator", v);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCheckboxGroup = _sfc_main$h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "indicators" }, _attrs))} data-v-d6d14ec7>`);
      _push(ssrRenderComponent(_component_UCheckboxGroup, {
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        items: unref(groupItems)
      }, {
        label: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between" data-v-d6d14ec7${_scopeId}><span data-v-d6d14ec7${_scopeId}>${ssrInterpolate(item.label)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between" }, [
                createVNode("span", null, toDisplayString(item.label), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Indicator/components/IndicatorsList.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const IndicatorsList = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$g, [["__scopeId", "data-v-d6d14ec7"]]), { __name: "IndicatorComponentsIndicatorsList" });
const _sfc_main$f = {
  __name: "ChartComponentsLine",
  __ssrInlineRender: true,
  props: ["series"],
  setup(__props) {
    echarts.use([GridComponent, LineChart, CanvasRenderer, MarkLineComponent, UniversalTransition, TooltipComponent, DataZoomComponent, ToolboxComponent]);
    useTemplateRef("chart");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "chart",
        ref: "chart"
      }, _attrs))} data-v-2c2b5245></div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Chart/components/Line.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Line = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-2c2b5245"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "List",
  __ssrInlineRender: true,
  props: {
    items: {},
    selected: {},
    valueField: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const groupItems = computed(() => {
      return __props.items?.map((item) => {
        return {
          ...item,
          value: item[__props.valueField]
        };
      });
    });
    const value = computed({
      get() {
        return __props.selected;
      },
      set(v) {
        if (v.length > 0)
          emits("select", v);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCheckboxGroup = _sfc_main$h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list" }, _attrs))} data-v-aee86d2c>`);
      _push(ssrRenderComponent(_component_UCheckboxGroup, {
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        items: unref(groupItems)
      }, {
        label: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between" data-v-aee86d2c${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "label", { item }, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between" }, [
                renderSlot(_ctx.$slots, "label", { item }, void 0, true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/List/components/List.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const List = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$e, [["__scopeId", "data-v-aee86d2c"]]), { __name: "ListComponentsList" });
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "SiteDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpenDialog = inject("isOpenDialog");
    const sites = inject("sites");
    const { selectedFeature, timePeriod, chartData, value, lastData, selectedSites, mode } = useSiteDialog();
    const setValue = (e) => {
      value.value = e;
    };
    const setValueSite = (e) => {
      selectedSites.value = e;
    };
    const df = new DateFormatter("ru-RU", {
      dateStyle: "medium"
    });
    const modelValue = shallowRef(timePeriod.value);
    const display = computed(() => {
      const start = df.format(timePeriod.value.start.toDate(getLocalTimeZone()));
      const end = df.format(timePeriod.value.end.toDate(getLocalTimeZone()));
      return `${start} - ${end}`;
    });
    const setValidValue = () => {
      timePeriod.value = modelValue.value;
    };
    const tabs = [{ label: "Показатели", slot: "indicators" }, { label: "Датчики", slot: "sites" }];
    const modes = [
      { value: "default", label: "По умолчанию" },
      { value: "avg", label: "Показать усредненные значения" },
      { value: "year", label: "Показать годовые значения" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$n;
      const _component_UPopover = _sfc_main$s;
      const _component_UButton = _sfc_main$9$1;
      const _component_UCalendar = _sfc_main$r;
      const _component_URadioGroup = _sfc_main$m;
      const _component_USeparator = _sfc_main$l;
      const _component_UTabs = _sfc_main$j;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        fullscreen: "",
        title: unref(selectedFeature)?.properties.name,
        open: unref(isOpenDialog),
        "onUpdate:open": ($event) => isRef(isOpenDialog) ? isOpenDialog.value = $event : null
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="site-dialog" data-v-a340a3a5${_scopeId}><div class="wrapper" data-v-a340a3a5${_scopeId}><h2 data-v-a340a3a5${_scopeId}>Данные</h2>`);
            _push2(ssrRenderComponent(Line, { series: unref(chartData) }, null, _parent2, _scopeId));
            _push2(`</div><div class="wrapper-settings" data-v-a340a3a5${_scopeId}><h2 data-v-a340a3a5${_scopeId}>Период</h2>`);
            _push2(ssrRenderComponent(_component_UPopover, null, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UCalendar, {
                    modelValue: unref(modelValue),
                    "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
                    range: "",
                    class: "p-2",
                    "onUpdate:validModelValue": setValidValue
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UCalendar, {
                      modelValue: unref(modelValue),
                      "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
                      range: "",
                      class: "p-2",
                      "onUpdate:validModelValue": setValidValue
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    variant: "subtle",
                    icon: "i-lucide-calendar"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(display))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(display)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "subtle",
                      icon: "i-lucide-calendar"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(display)), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h2 data-v-a340a3a5${_scopeId}>Настройки</h2>`);
            _push2(ssrRenderComponent(_component_URadioGroup, {
              modelValue: unref(mode),
              "onUpdate:modelValue": ($event) => isRef(mode) ? mode.value = $event : null,
              items: modes
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USeparator, { color: "primary" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UTabs, { items: tabs }, {
              indicators: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(IndicatorsList, {
                    items: unref(lastData),
                    "selected-indicator": unref(value),
                    onSelectIndicator: setValue
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(IndicatorsList, {
                      items: unref(lastData),
                      "selected-indicator": unref(value),
                      onSelectIndicator: setValue
                    }, null, 8, ["items", "selected-indicator"])
                  ];
                }
              }),
              sites: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(List, {
                    items: unref(sites),
                    selected: unref(selectedSites),
                    valueField: "id",
                    onSelect: setValueSite
                  }, {
                    label: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(item.name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(item.name), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(List, {
                      items: unref(sites),
                      selected: unref(selectedSites),
                      valueField: "id",
                      onSelect: setValueSite
                    }, {
                      label: withCtx(({ item }) => [
                        createTextVNode(toDisplayString(item.name), 1)
                      ]),
                      _: 1
                    }, 8, ["items", "selected"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "site-dialog" }, [
                createVNode("div", { class: "wrapper" }, [
                  createVNode("h2", null, "Данные"),
                  createVNode(Line, { series: unref(chartData) }, null, 8, ["series"])
                ]),
                createVNode("div", { class: "wrapper-settings" }, [
                  createVNode("h2", null, "Период"),
                  createVNode(_component_UPopover, null, {
                    content: withCtx(() => [
                      createVNode(_component_UCalendar, {
                        modelValue: unref(modelValue),
                        "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
                        range: "",
                        class: "p-2",
                        "onUpdate:validModelValue": setValidValue
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "subtle",
                        icon: "i-lucide-calendar"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(display)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("h2", null, "Настройки"),
                  createVNode(_component_URadioGroup, {
                    modelValue: unref(mode),
                    "onUpdate:modelValue": ($event) => isRef(mode) ? mode.value = $event : null,
                    items: modes
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_USeparator, { color: "primary" }),
                  createVNode(_component_UTabs, { items: tabs }, {
                    indicators: withCtx(() => [
                      createVNode(IndicatorsList, {
                        items: unref(lastData),
                        "selected-indicator": unref(value),
                        onSelectIndicator: setValue
                      }, null, 8, ["items", "selected-indicator"])
                    ]),
                    sites: withCtx(() => [
                      createVNode(List, {
                        items: unref(sites),
                        selected: unref(selectedSites),
                        valueField: "id",
                        onSelect: setValueSite
                      }, {
                        label: withCtx(({ item }) => [
                          createTextVNode(toDisplayString(item.name), 1)
                        ]),
                        _: 1
                      }, 8, ["items", "selected"])
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteDialog/components/SiteDialog.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const SiteDialog = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$d, [["__scopeId", "data-v-a340a3a5"]]), { __name: "SiteDialogComponentsSiteDialog" });
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "ButtonSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const open = inject("isOpenSidebar");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sibebarButton" }, _attrs))} data-v-606c9ef3>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: ($event) => open.value = true,
        icon: "i-lucide-menu"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/components/ButtonSidebar.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const ButtonSidebar = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$c, [["__scopeId", "data-v-606c9ef3"]]), { __name: "SidebarComponentsButtonSidebar" });
const theme$2 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 overflow-y-auto p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "side": {
      "top": {
        "content": ""
      },
      "right": {
        "content": "max-w-md"
      },
      "bottom": {
        "content": ""
      },
      "left": {
        "content": "max-w-md"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg"
      }
    },
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
      }
    }
  },
  "compoundVariants": [
    {
      "side": "top",
      "inset": true,
      "class": {
        "content": "max-h-[calc(100%-2rem)] inset-x-4 top-4"
      }
    },
    {
      "side": "top",
      "inset": false,
      "class": {
        "content": "max-h-full inset-x-0 top-0"
      }
    },
    {
      "side": "right",
      "inset": true,
      "class": {
        "content": "w-[calc(100%-2rem)] inset-y-4 right-4"
      }
    },
    {
      "side": "right",
      "inset": false,
      "class": {
        "content": "w-full inset-y-0 right-0"
      }
    },
    {
      "side": "bottom",
      "inset": true,
      "class": {
        "content": "max-h-[calc(100%-2rem)] inset-x-4 bottom-4"
      }
    },
    {
      "side": "bottom",
      "inset": false,
      "class": {
        "content": "max-h-full inset-x-0 bottom-0"
      }
    },
    {
      "side": "left",
      "inset": true,
      "class": {
        "content": "w-[calc(100%-2rem)] inset-y-4 left-4"
      }
    },
    {
      "side": "left",
      "inset": false,
      "class": {
        "content": "w-full inset-y-0 left-0"
      }
    },
    {
      "transition": true,
      "side": "top",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "right",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "bottom",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "left",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]"
      }
    }
  ]
};
const _sfc_main$b = {
  __name: "USlideover",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    transition: { type: Boolean, required: false, default: true },
    side: { type: null, required: false, default: "right" },
    inset: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("slideover", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside
      };
    });
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.slideover || {} })({
      transition: props.transition,
      side: props.side,
      inset: props.inset
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.overlay) {
                    _push3(ssrRenderComponent(unref(DialogOverlay), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    "data-side": __props.side,
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$9$1, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("slideover.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("slideover.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                          _push4(`</div>`);
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(uiProp)?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: unref(uiProp)?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: unref(uiProp)?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: unref(uiProp)?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)("slideover.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: unref(uiProp)?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: unref(uiProp)?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close })
                            ], 2),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: unref(uiProp)?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(DialogContent), mergeProps({
                      "data-side": __props.side,
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: unref(uiProp)?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true),
                                __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                    props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)("slideover.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: unref(uiProp)?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          createVNode("div", {
                            "data-slot": "body",
                            class: ui.value.body({ class: unref(uiProp)?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close })
                          ], 2),
                          !!slots.footer ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: unref(uiProp)?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal), unref(portalProps), {
                default: withCtx(() => [
                  __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                  }, null, 8, ["class"])) : createCommentVNode("", true),
                  createVNode(unref(DialogContent), mergeProps({
                    "data-side": __props.side,
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: unref(uiProp)?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: unref(uiProp)?.title })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: unref(uiProp)?.description })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                  props.close ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)("slideover.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: unref(uiProp)?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        createVNode("div", {
                          "data-slot": "body",
                          class: ui.value.body({ class: unref(uiProp)?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close })
                        ], 2),
                        !!slots.footer ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: unref(uiProp)?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    "arrow": "fill-bg stroke-default",
    "text": "truncate",
    "kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
    "kbdsSize": "sm"
  }
};
const _sfc_main$a = {
  __name: "UTooltip",
  __ssrInlineRender: true,
  props: {
    text: { type: String, required: false },
    kbds: { type: Array, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    reference: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    delayDuration: { type: Number, required: false },
    disableHoverableContent: { type: Boolean, required: false },
    disableClosingTrigger: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    ignoreNonKeyboardFocus: { type: Boolean, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("tooltip", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "ignoreNonKeyboardFocus"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.tooltip || {} })({
      side: contentProps.value.side
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(rootProps), {
        disabled: !(__props.text || __props.kbds?.length || !!slots.content) || props.disabled
      }, _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default || !!__props.reference) {
              _push2(ssrRenderComponent(unref(TooltipTrigger), mergeProps(_ctx.$attrs, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(TooltipPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TooltipContent), mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", { ui: ui.value }, () => {
                          if (__props.text) {
                            _push4(`<span data-slot="text" class="${ssrRenderClass(ui.value.text({ class: unref(uiProp)?.text }))}"${_scopeId3}>${ssrInterpolate(__props.text)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (__props.kbds?.length) {
                            _push4(`<span data-slot="kbds" class="${ssrRenderClass(ui.value.kbds({ class: unref(uiProp)?.kbds }))}"${_scopeId3}><!--[-->`);
                            ssrRenderList(__props.kbds, (kbd, index) => {
                              _push4(ssrRenderComponent(_sfc_main$w, mergeProps({
                                key: index,
                                size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(TooltipArrow), mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                            __props.text ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "text",
                              class: ui.value.text({ class: unref(uiProp)?.text })
                            }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                            __props.kbds?.length ? (openBlock(), createBlock("span", {
                              key: 1,
                              "data-slot": "kbds",
                              class: ui.value.kbds({ class: unref(uiProp)?.kbds })
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                                return openBlock(), createBlock(_sfc_main$w, mergeProps({
                                  key: index,
                                  size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                                }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                              }), 128))
                            ], 2)) : createCommentVNode("", true)
                          ]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                    }), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                          __props.text ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "text",
                            class: ui.value.text({ class: unref(uiProp)?.text })
                          }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                          __props.kbds?.length ? (openBlock(), createBlock("span", {
                            key: 1,
                            "data-slot": "kbds",
                            class: ui.value.kbds({ class: unref(uiProp)?.kbds })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                              return openBlock(), createBlock(_sfc_main$w, mergeProps({
                                key: index,
                                size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                            }), 128))
                          ], 2)) : createCommentVNode("", true)
                        ]),
                        !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                        }), null, 16, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default || !!__props.reference ? (openBlock(), createBlock(unref(TooltipTrigger), mergeProps({ key: 0 }, _ctx.$attrs, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1040, ["reference", "class"])) : createCommentVNode("", true),
              createVNode(unref(TooltipPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                        __props.text ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "text",
                          class: ui.value.text({ class: unref(uiProp)?.text })
                        }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                        __props.kbds?.length ? (openBlock(), createBlock("span", {
                          key: 1,
                          "data-slot": "kbds",
                          class: ui.value.kbds({ class: unref(uiProp)?.kbds })
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                            return openBlock(), createBlock(_sfc_main$w, mergeProps({
                              key: index,
                              size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                            }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                          }), 128))
                        ], 2)) : createCommentVNode("", true)
                      ]),
                      !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                      }), null, 16, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative flex items-center select-none touch-none",
    "track": "relative bg-accented overflow-hidden rounded-full grow",
    "range": "absolute rounded-full",
    "thumb": "rounded-full bg-default ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
  },
  "variants": {
    "color": {
      "primary": {
        "range": "bg-primary",
        "thumb": "ring-primary focus-visible:outline-primary/50"
      },
      "secondary": {
        "range": "bg-secondary",
        "thumb": "ring-secondary focus-visible:outline-secondary/50"
      },
      "success": {
        "range": "bg-success",
        "thumb": "ring-success focus-visible:outline-success/50"
      },
      "info": {
        "range": "bg-info",
        "thumb": "ring-info focus-visible:outline-info/50"
      },
      "warning": {
        "range": "bg-warning",
        "thumb": "ring-warning focus-visible:outline-warning/50"
      },
      "error": {
        "range": "bg-error",
        "thumb": "ring-error focus-visible:outline-error/50"
      },
      "neutral": {
        "range": "bg-inverted",
        "thumb": "ring-inverted focus-visible:outline-inverted/50"
      }
    },
    "size": {
      "xs": {
        "thumb": "size-3"
      },
      "sm": {
        "thumb": "size-3.5"
      },
      "md": {
        "thumb": "size-4"
      },
      "lg": {
        "thumb": "size-4.5"
      },
      "xl": {
        "thumb": "size-5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full",
        "range": "h-full"
      },
      "vertical": {
        "root": "flex-col h-full",
        "range": "w-full"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "track": "h-[6px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "track": "h-[7px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "track": "h-[8px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "track": "h-[9px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "track": "h-[10px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "track": "w-[6px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "track": "w-[7px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "track": "w-[8px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "track": "w-[9px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "track": "w-[10px]"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};
const _sfc_main$9 = {
  __name: "USlider",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    tooltip: { type: [Boolean, Object], required: false },
    defaultValue: { type: [Number, Array], required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    name: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    inverted: { type: Boolean, required: false },
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    step: { type: Number, required: false, default: 1 },
    minStepsBetweenThumbs: { type: Number, required: false }
  }, {
    "modelValue": { type: null },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue");
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("slider", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "orientation", "min", "max", "step", "minStepsBetweenThumbs", "inverted"), emits);
    const { id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const defaultSliderValue = computed(() => {
      if (typeof props.defaultValue === "number") {
        return [props.defaultValue];
      }
      return props.defaultValue;
    });
    const sliderValue = computed({
      get() {
        if (typeof modelValue.value === "number") {
          return [modelValue.value];
        }
        return modelValue.value ?? defaultSliderValue.value;
      },
      set(value) {
        modelValue.value = value?.length !== 1 ? value : value[0];
      }
    });
    const thumbs = computed(() => sliderValue.value?.length ?? 1);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.slider || {} })({
      disabled: disabled.value,
      size: size.value,
      color: color.value,
      orientation: props.orientation
    }));
    function onChange(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SliderRoot), mergeProps({ ...unref(rootProps), ...unref(ariaAttrs) }, {
        id: unref(id),
        modelValue: sliderValue.value,
        "onUpdate:modelValue": [($event) => sliderValue.value = $event, ($event) => unref(emitFormInput)()],
        name: unref(name),
        disabled: unref(disabled),
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] }),
        "default-value": defaultSliderValue.value,
        onValueCommit: onChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SliderTrack), {
              "data-slot": "track",
              class: ui.value.track({ class: unref(uiProp)?.track })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SliderRange), {
                    "data-slot": "range",
                    class: ui.value.range({ class: unref(uiProp)?.range })
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SliderRange), {
                      "data-slot": "range",
                      class: ui.value.range({ class: unref(uiProp)?.range })
                    }, null, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(thumbs.value, (thumb) => {
              _push2(`<!--[-->`);
              if (!!__props.tooltip) {
                _push2(ssrRenderComponent(_sfc_main$a, mergeProps({
                  text: thumbs.value > 1 ? String(sliderValue.value?.[thumb - 1]) : String(sliderValue.value),
                  "disable-closing-trigger": ""
                }, { ref_for: true }, typeof __props.tooltip === "object" ? __props.tooltip : {}), {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(SliderThumb), {
                        "data-slot": "thumb",
                        class: ui.value.thumb({ class: unref(uiProp)?.thumb }),
                        "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(SliderThumb), {
                          "data-slot": "thumb",
                          class: ui.value.thumb({ class: unref(uiProp)?.thumb }),
                          "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                        }, null, 8, ["class", "aria-label"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(SliderThumb), {
                  "data-slot": "thumb",
                  class: ui.value.thumb({ class: unref(uiProp)?.thumb }),
                  "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(unref(SliderTrack), {
                "data-slot": "track",
                class: ui.value.track({ class: unref(uiProp)?.track })
              }, {
                default: withCtx(() => [
                  createVNode(unref(SliderRange), {
                    "data-slot": "range",
                    class: ui.value.range({ class: unref(uiProp)?.range })
                  }, null, 8, ["class"])
                ]),
                _: 1
              }, 8, ["class"]),
              (openBlock(true), createBlock(Fragment, null, renderList(thumbs.value, (thumb) => {
                return openBlock(), createBlock(Fragment, { key: thumb }, [
                  !!__props.tooltip ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
                    key: 0,
                    text: thumbs.value > 1 ? String(sliderValue.value?.[thumb - 1]) : String(sliderValue.value),
                    "disable-closing-trigger": ""
                  }, { ref_for: true }, typeof __props.tooltip === "object" ? __props.tooltip : {}), {
                    default: withCtx(() => [
                      createVNode(unref(SliderThumb), {
                        "data-slot": "thumb",
                        class: ui.value.thumb({ class: unref(uiProp)?.thumb }),
                        "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                      }, null, 8, ["class", "aria-label"])
                    ]),
                    _: 2
                  }, 1040, ["text"])) : (openBlock(), createBlock(unref(SliderThumb), {
                    key: 1,
                    "data-slot": "thumb",
                    class: ui.value.thumb({ class: unref(uiProp)?.thumb }),
                    "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                  }, null, 8, ["class", "aria-label"]))
                ], 64);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Slider.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$8 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UColorModeButton",
  __ssrInlineRender: true,
  props: {
    color: { type: null, required: false, default: "neutral" },
    variant: { type: null, required: false, default: "ghost" },
    label: { type: String, required: false },
    activeColor: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    exactActiveClass: { type: String, required: false },
    viewTransition: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const colorMode = useColorMode();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("button", props);
    const buttonProps = useForwardProps(reactiveOmit(props, "icon"));
    const isDark = computed({
      get() {
        return colorMode.value === "dark";
      },
      set(_isDark) {
        colorMode.preference = _isDark ? "dark" : "light";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$9$1, mergeProps({
        ...unref(buttonProps),
        "aria-label": isDark.value ? unref(t)("colorMode.switchToLight") : unref(t)("colorMode.switchToDark"),
        ..._ctx.$attrs
      }, {
        onClick: ($event) => isDark.value = !isDark.value
      }, _attrs), {
        leading: withCtx(({ ui }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$e$1, {
              class: ui.leadingIcon({ class: [unref(uiProp)?.leadingIcon, "hidden dark:inline-block"] }),
              name: unref(appConfig).ui.icons.dark
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$e$1, {
              class: ui.leadingIcon({ class: [unref(uiProp)?.leadingIcon, "dark:hidden"] }),
              name: unref(appConfig).ui.icons.light
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$e$1, {
                class: ui.leadingIcon({ class: [unref(uiProp)?.leadingIcon, "hidden dark:inline-block"] }),
                name: unref(appConfig).ui.icons.dark
              }, null, 8, ["class", "name"]),
              createVNode(_sfc_main$e$1, {
                class: ui.leadingIcon({ class: [unref(uiProp)?.leadingIcon, "dark:hidden"] }),
                name: unref(appConfig).ui.icons.light
              }, null, 8, ["class", "name"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/color-mode/ColorModeButton.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SiteSittengs",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedSiteGroup = inject("selectedSiteGroup");
    const codes = [{ label: "Министерство", value: "m" }, { label: "КНЦ", value: "s" }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USeparator = _sfc_main$l;
      const _component_UFormField = _sfc_main$2$1;
      const _component_USelect = _sfc_main$1$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_USeparator, { label: "Настройки постов мониторинга" }, null, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Параметр" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(selectedSiteGroup),
              "onUpdate:modelValue": ($event) => isRef(selectedSiteGroup) ? selectedSiteGroup.value = $event : null,
              style: { "width": "150px" },
              placeholder: "Выберите группу постов",
              multiple: "",
              items: codes
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelect, {
                modelValue: unref(selectedSiteGroup),
                "onUpdate:modelValue": ($event) => isRef(selectedSiteGroup) ? selectedSiteGroup.value = $event : null,
                style: { "width": "150px" },
                placeholder: "Выберите группу постов",
                multiple: "",
                items: codes
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/components/SiteSittengs.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const SiteSittengs = Object.assign(_sfc_main$7, { __name: "SidebarComponentsSiteSittengs" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TiffSettings",
  __ssrInlineRender: true,
  setup(__props) {
    const tiffOpacity = inject("tiffOpacity");
    const selectedTiffIndicator = inject("selectedTiffIndicator");
    const selectedBand = inject("selectedBand");
    const tiffFilterRange = inject("tiffFilterRange");
    const codes = [
      "AL",
      "ALB",
      "ALT",
      "co",
      "E_CO",
      "E_HCHO",
      "E_NH3",
      "E_NO",
      "E_NO2",
      "E_SO2",
      "EXCH_H",
      "hcho",
      "HGT",
      "hno3",
      "MAPFAC_M",
      "MAPFAC_MX",
      "MAPFAC_MY",
      "MAPFAC_U",
      "MAPFAC_V",
      "MU",
      "MU_U",
      "MU_V",
      "MUB",
      "nh3",
      "no",
      "no2",
      "no3",
      "o3",
      "P",
      "PB",
      "PH",
      "PHB",
      "RHO",
      "RW",
      "so2",
      "T",
      "wind",
      "WW",
      "XKHH",
      "XKHV",
      "XKMH",
      "XKMV"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USeparator = _sfc_main$l;
      const _component_UFormField = _sfc_main$2$1;
      const _component_USelect = _sfc_main$1$1;
      const _component_USlider = _sfc_main$9;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_USeparator, { label: "Настройки Tiff" }, null, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Параметр" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(selectedTiffIndicator),
              "onUpdate:modelValue": ($event) => isRef(selectedTiffIndicator) ? selectedTiffIndicator.value = $event : null,
              style: { "width": "150px" },
              placeholder: "Выберите параметр",
              items: codes
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelect, {
                modelValue: unref(selectedTiffIndicator),
                "onUpdate:modelValue": ($event) => isRef(selectedTiffIndicator) ? selectedTiffIndicator.value = $event : null,
                style: { "width": "150px" },
                placeholder: "Выберите параметр",
                items: codes
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: `Прозрачность ${unref(tiffOpacity)}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USlider, {
              modelValue: unref(tiffOpacity),
              "onUpdate:modelValue": ($event) => isRef(tiffOpacity) ? tiffOpacity.value = $event : null,
              min: 0,
              max: 1,
              step: 0.1
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USlider, {
                modelValue: unref(tiffOpacity),
                "onUpdate:modelValue": ($event) => isRef(tiffOpacity) ? tiffOpacity.value = $event : null,
                min: 0,
                max: 1,
                step: 0.1
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: `Канал ${unref(selectedBand)}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USlider, {
              modelValue: unref(selectedBand),
              "onUpdate:modelValue": ($event) => isRef(selectedBand) ? selectedBand.value = $event : null,
              min: 0,
              max: 31,
              step: 1
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USlider, {
                modelValue: unref(selectedBand),
                "onUpdate:modelValue": ($event) => isRef(selectedBand) ? selectedBand.value = $event : null,
                min: 0,
                max: 31,
                step: 1
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: `Фильтр ${unref(tiffFilterRange)[0]}-${unref(tiffFilterRange)[1]}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USlider, {
              modelValue: unref(tiffFilterRange),
              "onUpdate:modelValue": ($event) => isRef(tiffFilterRange) ? tiffFilterRange.value = $event : null,
              min: 0,
              max: 5,
              step: 0.01,
              "min-steps-between-thumbs": 0.1
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USlider, {
                modelValue: unref(tiffFilterRange),
                "onUpdate:modelValue": ($event) => isRef(tiffFilterRange) ? tiffFilterRange.value = $event : null,
                min: 0,
                max: 5,
                step: 0.01,
                "min-steps-between-thumbs": 0.1
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/components/TiffSettings.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const TiffSettings = Object.assign(_sfc_main$6, { __name: "SidebarComponentsTiffSettings" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const open = inject("isOpenSidebar");
    const visibleFill = inject("visibleFill");
    const visibleFillExtrusion = inject("visibleFillExtrusion");
    const visibleVoronoi = inject("visibleVoronoi");
    const visibleDeckGL = inject("visibleDeckGL");
    const selectedSubstrate = inject("selectedSubstrate");
    const substrates = [{ label: "Спутник", value: "satellite" }, { label: "OSM", value: "osm" }];
    const selectedHeight = inject("selectedHeight");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USlideover = _sfc_main$b;
      const _component_USeparator = _sfc_main$l;
      const _component_UFormField = _sfc_main$2$1;
      const _component_USelect = _sfc_main$1$1;
      const _component_UCheckbox = _sfc_main$i;
      const _component_USlider = _sfc_main$9;
      const _component_UColorModeButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_USlideover, mergeProps({
        overlay: false,
        dismissible: false,
        modal: false,
        title: "Меню",
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(SiteSittengs, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USeparator, { label: "Слои" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, { label: "Подложка" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: unref(selectedSubstrate),
                    "onUpdate:modelValue": ($event) => isRef(selectedSubstrate) ? selectedSubstrate.value = $event : null,
                    style: { "width": "150px" },
                    placeholder: "Выберите слой",
                    items: substrates
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: unref(selectedSubstrate),
                      "onUpdate:modelValue": ($event) => isRef(selectedSubstrate) ? selectedSubstrate.value = $event : null,
                      style: { "width": "150px" },
                      placeholder: "Выберите слой",
                      items: substrates
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              label: "Полигоны 2D",
              modelValue: unref(visibleFill),
              "onUpdate:modelValue": ($event) => isRef(visibleFill) ? visibleFill.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UCheckbox, {
              label: "Полигоны 3D",
              modelValue: unref(visibleFillExtrusion),
              "onUpdate:modelValue": ($event) => isRef(visibleFillExtrusion) ? visibleFillExtrusion.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UCheckbox, {
              label: "Полигоны DeckGL",
              modelValue: unref(visibleDeckGL),
              "onUpdate:modelValue": ($event) => isRef(visibleDeckGL) ? visibleDeckGL.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UCheckbox, {
              label: "Диаграмма Вороного",
              modelValue: unref(visibleVoronoi),
              "onUpdate:modelValue": ($event) => isRef(visibleVoronoi) ? visibleVoronoi.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: `Высота ${unref(selectedHeight)}`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USlider, {
                    modelValue: unref(selectedHeight),
                    "onUpdate:modelValue": ($event) => isRef(selectedHeight) ? selectedHeight.value = $event : null,
                    min: 125,
                    max: 375,
                    step: 25
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USlider, {
                      modelValue: unref(selectedHeight),
                      "onUpdate:modelValue": ($event) => isRef(selectedHeight) ? selectedHeight.value = $event : null,
                      min: 125,
                      max: 375,
                      step: 25
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, { label: `Тема` }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UColorModeButton, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UColorModeButton)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(TiffSettings, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode(SiteSittengs),
                createVNode(_component_USeparator, { label: "Слои" }),
                createVNode(_component_UFormField, { label: "Подложка" }, {
                  default: withCtx(() => [
                    createVNode(_component_USelect, {
                      modelValue: unref(selectedSubstrate),
                      "onUpdate:modelValue": ($event) => isRef(selectedSubstrate) ? selectedSubstrate.value = $event : null,
                      style: { "width": "150px" },
                      placeholder: "Выберите слой",
                      items: substrates
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode("div", null, [
                  createVNode(_component_UCheckbox, {
                    label: "Полигоны 2D",
                    modelValue: unref(visibleFill),
                    "onUpdate:modelValue": ($event) => isRef(visibleFill) ? visibleFill.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UCheckbox, {
                    label: "Полигоны 3D",
                    modelValue: unref(visibleFillExtrusion),
                    "onUpdate:modelValue": ($event) => isRef(visibleFillExtrusion) ? visibleFillExtrusion.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UCheckbox, {
                    label: "Полигоны DeckGL",
                    modelValue: unref(visibleDeckGL),
                    "onUpdate:modelValue": ($event) => isRef(visibleDeckGL) ? visibleDeckGL.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UCheckbox, {
                    label: "Диаграмма Вороного",
                    modelValue: unref(visibleVoronoi),
                    "onUpdate:modelValue": ($event) => isRef(visibleVoronoi) ? visibleVoronoi.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode(_component_UFormField, {
                  label: `Высота ${unref(selectedHeight)}`
                }, {
                  default: withCtx(() => [
                    createVNode(_component_USlider, {
                      modelValue: unref(selectedHeight),
                      "onUpdate:modelValue": ($event) => isRef(selectedHeight) ? selectedHeight.value = $event : null,
                      min: 125,
                      max: 375,
                      step: 25
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                createVNode(_component_UFormField, { label: `Тема` }, {
                  default: withCtx(() => [
                    createVNode(_component_UColorModeButton)
                  ]),
                  _: 1
                }),
                createVNode(TiffSettings)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/components/Sidebar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Sidebar = Object.assign(_sfc_main$5, { __name: "SidebarComponentsSidebar" });
const polygons$2 = [];
for (let i = 150; i <= 375; i += 25) {
  polygons$2.push(await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../assets/140.json": () => import('./140-CNMSuWyc.mjs'), "../../../assets/150.json": () => import('./150-Bkd7vqt_.mjs'), "../../../assets/175.json": () => import('./175-DzyZDuu0.mjs'), "../../../assets/200.json": () => import('./200-DUjvkKaj.mjs'), "../../../assets/225.json": () => import('./225-DDMSAsyy.mjs'), "../../../assets/250.json": () => import('./250-Da6maYL-.mjs'), "../../../assets/275.json": () => import('./275-Dyp-ESb4.mjs'), "../../../assets/300.json": () => import('./300-Ia9vWIJk.mjs'), "../../../assets/325.json": () => import('./325-DXzOm67b.mjs'), "../../../assets/350.json": () => import('./350-CfTcCQig.mjs'), "../../../assets/375.json": () => import('./375-D7-LOXA1.mjs') }), `../../../assets/${i}.json`, 5));
}
const polygons$1 = [];
for (let i = 150; i <= 375; i += 25) {
  polygons$1.push(await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../assets/140.json": () => import('./140-CNMSuWyc.mjs'), "../../../assets/150.json": () => import('./150-Bkd7vqt_.mjs'), "../../../assets/175.json": () => import('./175-DzyZDuu0.mjs'), "../../../assets/200.json": () => import('./200-DUjvkKaj.mjs'), "../../../assets/225.json": () => import('./225-DDMSAsyy.mjs'), "../../../assets/250.json": () => import('./250-Da6maYL-.mjs'), "../../../assets/275.json": () => import('./275-Dyp-ESb4.mjs'), "../../../assets/300.json": () => import('./300-Ia9vWIJk.mjs'), "../../../assets/325.json": () => import('./325-DXzOm67b.mjs'), "../../../assets/350.json": () => import('./350-CfTcCQig.mjs'), "../../../assets/375.json": () => import('./375-D7-LOXA1.mjs') }), `../../../assets/${i}.json`, 5));
}
const polygons = [];
for (let i = 150; i <= 375; i += 25) {
  polygons.push(await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../assets/140.json": () => import('./140-CNMSuWyc.mjs'), "../../../assets/150.json": () => import('./150-Bkd7vqt_.mjs'), "../../../assets/175.json": () => import('./175-DzyZDuu0.mjs'), "../../../assets/200.json": () => import('./200-DUjvkKaj.mjs'), "../../../assets/225.json": () => import('./225-DDMSAsyy.mjs'), "../../../assets/250.json": () => import('./250-Da6maYL-.mjs'), "../../../assets/275.json": () => import('./275-Dyp-ESb4.mjs'), "../../../assets/300.json": () => import('./300-Ia9vWIJk.mjs'), "../../../assets/325.json": () => import('./325-DXzOm67b.mjs'), "../../../assets/350.json": () => import('./350-CfTcCQig.mjs'), "../../../assets/375.json": () => import('./375-D7-LOXA1.mjs') }), `../../../assets/${i}.json`, 5));
}
function existData(data, indicator) {
  const filtered = data.filter((d) => d[indicator] !== void 0);
  const times = filtered.map((f) => f.time);
  const uniq = Array.from(new Set(times));
  return uniq;
}
function useExistDates({ selectedIndicator, setData }) {
  const existDate = ref([]);
  watch(selectedIndicator, (indicator) => {
    const dates = existData(setData.value, indicator.code);
    existDate.value = Array.from(new Set(dates));
  }, { immediate: true });
  watch(setData, (data) => {
    const dates = existData(data, selectedIndicator.value.code);
    existDate.value = Array.from(new Set(dates));
  }, { immediate: true });
  return { existDate };
}
function groupByHour$1(data, field) {
  const grouped = {};
  data.forEach((item) => {
    const dateTime = item[field];
    const hourKey = dateTime;
    if (!grouped[hourKey]) {
      grouped[hourKey] = [];
    }
    grouped[hourKey].push(item);
  });
  return grouped;
}
function useDataGroupedBySite({ setData }) {
  const dataGroupedBySite = computed(() => {
    const grouped = groupByHour$1(setData.value, "site");
    return grouped;
  });
  return { dataGroupedBySite };
}
const getDateFromQuery = (query) => {
  const { start, end } = query;
  const startDateParse = `${start}`.split("-");
  const endDateParse = `${end}`.split("-");
  let startCalendarDate = null;
  let endCalendarDate = null;
  if (startDateParse[0] && startDateParse[1] && startDateParse[2])
    startCalendarDate = new CalendarDate(+startDateParse[0], +startDateParse[1], +startDateParse[2]);
  else startCalendarDate = today(getLocalTimeZone());
  if (endDateParse[0] && endDateParse[1] && endDateParse[2])
    endCalendarDate = new CalendarDate(+endDateParse[0], +endDateParse[1], +endDateParse[2]);
  else endCalendarDate = today(getLocalTimeZone());
  return { startCalendarDate, endCalendarDate };
};
function useDates() {
  const route = useRoute();
  const query = route.query;
  const { startCalendarDate, endCalendarDate } = getDateFromQuery(query);
  const selectedDate = shallowRef(`${today(getLocalTimeZone()).toString()} 00:00:00`);
  const selectedDates = shallowRef({
    start: startCalendarDate,
    end: endCalendarDate
  });
  return {
    selectedDate,
    selectedDates
  };
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Progress",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UProgress = _sfc_main$8$1;
      _push(ssrRenderComponent(_component_UProgress, mergeProps({
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        size: "xs",
        class: "myProgress"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loading/components/Progress.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Progress = Object.assign(_sfc_main$4, { __name: "LoadingComponentsProgress" });
const { parseTiffDataset } = await import('./parseTiff-Dt135VeA.mjs');
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BackButton",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const goList = () => {
      router.push("/list");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "back-button" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-arrow-left",
        label: "Назад",
        onClick: ($event) => goList()
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation/components/BackButton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BackButton = Object.assign(_sfc_main$3, { __name: "NavigationComponentsBackButton" });
const heightMap = {
  "t_h1000": 1e3,
  "t_h0950": 950,
  "t_h0900": 900,
  "t_h0850": 850,
  "t_h0800": 800,
  "t_h0750": 750,
  "t_h0700": 700,
  "t_h0650": 650,
  "t_h0600": 600,
  "t_h0550": 550,
  "t_h0500": 500,
  "t_h0450": 450,
  "t_h0400": 400,
  "t_h0350": 350,
  "t_h0300": 300,
  "t_h0250": 250,
  "t_h0200": 200,
  "t_h0150": 150,
  "t_h0100": 100,
  "t_h0075": 75,
  "t_h0050": 50,
  "t_h0025": 25,
  "t_h0000": 0
};
function createProfilerChart(data) {
  const keys = Object.keys(heightMap);
  return keys.map((key) => ({
    name: heightMap[key] + " м",
    type: "line",
    data: data.map((item) => [item.time, item[key]]),
    symbolSize: 3
  }));
}
function createInversionChart(data) {
  const sortedKeys = Object.keys(heightMap).sort((a, b) => heightMap[a] - heightMap[b]);
  const heatmapData = [];
  data.forEach((item) => {
    const timeMs = item.time;
    for (let i = 1; i < sortedKeys.length; i++) {
      const curKey = sortedKeys[i];
      const prevKey = sortedKeys[i - 1];
      const height = heightMap[curKey];
      const delta = item[curKey] - item[prevKey];
      heatmapData.push([timeMs, height, delta > 0 ? +delta.toFixed(3) : null]);
    }
  });
  return {
    type: "heatmap",
    data: heatmapData
  };
}
function useProfilerDialog() {
  const selectedDates = inject("selectedDates");
  const profilerChart = shallowRef([]);
  const inversionChart = shallowRef({});
  watch(selectedDates, async (value) => {
    const begin = value.start.toString();
    const end = value.end.toString();
    const result = await dataServiceProfiler.setDataService.getDataById({ begin, end, timeInterval: "hour", codeDta: "knc-mtp5", id: 4310 });
    const chart = createProfilerChart(result);
    const inversion = createInversionChart(result);
    profilerChart.value = chart;
    inversionChart.value = inversion;
  }, { immediate: true });
  return { profilerChart, inversionChart };
}
const _sfc_main$2 = {
  __name: "ChartComponentsHeatmap",
  __ssrInlineRender: true,
  props: ["series"],
  setup(__props) {
    echarts.use([TitleComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent, UniversalTransition, TooltipComponent, VisualMapComponent, HeatmapChart]);
    useTemplateRef("chart");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "chart",
        ref: "chart"
      }, _attrs))} data-v-e6d2fb8c></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Chart/components/Heatmap.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Heatmap = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e6d2fb8c"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProfilerDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const openDialogProfiler = inject("openDialogProfiler");
    const { profilerChart, inversionChart } = useProfilerDialog();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$n;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: unref(openDialogProfiler),
        "onUpdate:open": ($event) => isRef(openDialogProfiler) ? openDialogProfiler.value = $event : null,
        fullscreen: "",
        title: "Температурный профилемер"
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="parent" data-v-281d8110${_scopeId}>`);
            _push2(ssrRenderComponent(Line, {
              series: unref(profilerChart),
              class: "div2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(Heatmap, {
              series: unref(inversionChart),
              class: "div3"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "parent" }, [
                createVNode(Line, {
                  series: unref(profilerChart),
                  class: "div2"
                }, null, 8, ["series"]),
                createVNode(Heatmap, {
                  series: unref(inversionChart),
                  class: "div3"
                }, null, 8, ["series"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfilerDialog/components/ProfilerDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProfilerDialog = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-281d8110"]]), { __name: "ProfilerDialogComponentsProfilerDialog" });
function useSiteSettings() {
  const selectedSiteGroup = shallowRef(["m"]);
  return { selectedSiteGroup };
}
function groupByHour(data) {
  const grouped = {};
  data.forEach((item) => {
    const dateTime = item.time;
    const hourKey = dateTime.substring(0, 19);
    if (!grouped[hourKey]) {
      grouped[hourKey] = [];
    }
    grouped[hourKey].push(item);
  });
  return grouped;
}
const createSiteFeature = (site, data) => {
  return {
    type: "Feature",
    properties: {
      ...site,
      ...data
    },
    geometry: {
      type: "Point",
      coordinates: [site.geom_x, site.geom_y]
    }
  };
};
const createSiteFeatureCollection = (sites, data) => {
  const groupedByHour = groupByHour(data);
  const res = {};
  for (const time in groupedByHour) {
    const featuresCollection = {
      type: "FeatureCollection",
      features: []
    };
    const features = [];
    sites.forEach((site) => {
      const filtered = groupedByHour[time]?.find((i) => i.site == site.id);
      if (filtered)
        features.push(createSiteFeature(site, filtered));
    });
    featuresCollection.features = features;
    res[time] = featuresCollection;
  }
  return res;
};
const avg = (setData, indicators) => {
  const grouped = groupByHour(setData);
  const res = {};
  indicators.forEach((indicator) => {
    const code = indicator.code;
    let avg2 = 0;
    for (let i in grouped) {
      if (!res[i])
        res[i] = {};
      const day = grouped[i].filter((g) => g[code]);
      const sum = day.reduce((acc, value) => {
        const v = value[code];
        return acc + +v;
      }, 0);
      avg2 = sum / day.length || 0;
      res[i][code] = avg2;
    }
  });
  return res;
};
function siteFilter(sites, selectedGroup) {
  return sites.filter((site) => selectedGroup.includes(site.code.charAt(0)));
}
function siteDataFilter(data, sites) {
  const ids = sites.map((site) => site.id);
  return data.filter((d) => ids.includes(d.site));
}
const getData = async ({ begin, end, dta, dataService: dataService2, indicators, selectedSiteGroup }) => {
  const data = await dataService2.getData({ begin, end, dta });
  const sitesDta = dta.map((i) => i.sites).flat();
  const filteredSites = siteFilter(sitesDta, selectedSiteGroup);
  const filteredData = siteDataFilter(data, filteredSites);
  const collection = createSiteFeatureCollection(filteredSites, filteredData);
  const avgData = avg(filteredData, indicators);
  return { data, collection, avgData, sitesDta };
};
async function useSite({ selectedDates, selectedDate, selectedSiteGroup }) {
  const loading = inject("loading");
  const features = shallowRef({});
  const setData = shallowRef([]);
  const sites = shallowRef([]);
  const avgByDate = shallowRef({});
  const { dta, indicators } = await dataService.getDta();
  loading.value = true;
  const { data, collection, avgData, sitesDta } = await getData({ begin: selectedDates.value.start, end: selectedDates.value.end, dta, dataService, indicators, selectedSiteGroup: selectedSiteGroup.value }).finally(() => loading.value = false);
  setData.value = data;
  features.value = collection;
  avgByDate.value = avgData;
  sites.value = sitesDta;
  watch(selectedDates, async (value) => {
    loading.value = true;
    getData({ begin: value.start, end: value.end, dta, dataService, indicators, selectedSiteGroup: selectedSiteGroup.value }).then(({ data: data2, collection: collection2, avgData: avgData2 }) => {
      setData.value = data2;
      features.value = collection2;
      avgByDate.value = avgData2;
      if (selectedDate)
        selectedDate.value = `${value.start.toString()} 00:00:00`;
    }).finally(() => loading.value = false);
  });
  watch(selectedSiteGroup, async (value) => {
    const filteredSites = siteFilter(sites.value, value);
    const filteredData = siteDataFilter(setData.value, filteredSites);
    features.value = createSiteFeatureCollection(filteredSites, filteredData);
    avgByDate.value = avg(filteredData, indicators);
  });
  return { sites, features, setData, indicators, avgByDate, loading };
}
function useTiffSettings() {
  const tiffOpacity = shallowRef(0.8);
  const selectedTiffIndicator = shallowRef("no2");
  const selectedBand = shallowRef(0);
  const tiffFilterRange = shallowRef([0.01, 0.5]);
  return { tiffOpacity, selectedTiffIndicator, selectedBand, tiffFilterRange };
}
function useProfilerSettings() {
  const openDialogProfiler = ref(false);
  return { openDialogProfiler };
}
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Сценариум - КНЦ СО РАН"
    });
    const { selectedDate, selectedDates } = useDates();
    const selectedIndicator = inject("selectedIndicator");
    const selectedFeature = inject("selectedFeature");
    const { selectedSiteGroup } = useSiteSettings();
    const { sites, features, setData, indicators, dataGroupedByHour, avgByDate, loading } = ([__temp, __restore] = withAsyncContext(() => useSite({ selectedDate, selectedDates, selectedSiteGroup })), __temp = await __temp, __restore(), __temp);
    const { selectedTiffIndicator, tiffOpacity, selectedBand, tiffFilterRange } = useTiffSettings();
    const { existDate } = useExistDates({ setData, selectedIndicator });
    const { dataGroupedBySite } = useDataGroupedBySite({ setData });
    const { openDialogProfiler } = useProfilerSettings();
    provide("selectedDates", selectedDates);
    provide("selectedDate", selectedDate);
    provide("selectedTiffIndicator", selectedTiffIndicator);
    provide("tiffOpacity", tiffOpacity);
    provide("selectedBand", selectedBand);
    provide("tiffFilterRange", tiffFilterRange);
    provide("selectedSiteGroup", selectedSiteGroup);
    provide("openDialogProfiler", openDialogProfiler);
    provide("setData", setData);
    provide("dataGroupedBySite", dataGroupedBySite);
    provide("dataGroupedByHour", dataGroupedByHour);
    provide("indicators", indicators);
    provide("sites", sites);
    provide("features", features);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(loading)) {
        _push(ssrRenderComponent(Progress, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(BackButton, null, null, _parent));
      _push(ssrRenderComponent(Map$1, null, null, _parent));
      _push(ssrRenderComponent(Indicators, { items: unref(indicators) }, null, _parent));
      _push(ssrRenderComponent(Legend, null, null, _parent));
      _push(ssrRenderComponent(Timeline, {
        items: unref(existDate),
        avg: unref(avgByDate)
      }, null, _parent));
      if (unref(selectedFeature)) {
        _push(ssrRenderComponent(SiteDialog, { key: unref(selectedFeature) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(ProfilerDialog, null, null, _parent));
      _push(ssrRenderComponent(ButtonSidebar, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-47cUsCGh.mjs.map
