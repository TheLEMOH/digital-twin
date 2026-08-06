import { useSlots, computed, inject, ref, useId, watch, provide, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, toRef, useTemplateRef, Fragment, renderList, reactive, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { Primitive, Label, useForwardPropsEmits, SelectRoot, SelectTrigger, SelectPortal, SelectContent, SelectGroup, SelectLabel, SelectSeparator, SelectItem, SelectItemText, SelectItemIndicator, SelectArrow } from 'reka-ui';
import { b as useAppConfig, c as useComponentUI, t as tv, s as formErrorsInjectionKey, v as formInputsInjectionKey, w as inputIdInjectionKey, x as formFieldInjectionKey, m as usePortal, e as useFormField, f as useFieldGroup, h as useComponentIcons, y as isArrayOfArray, d as _sfc_main$e, i as _sfc_main$c, g as get, z as _sfc_main$d, l as looseToNumber, A as getDisplayValue } from './server.mjs';
import { n as defu } from '../_/nitro.mjs';
import { reactivePick, createSharedComposable } from '@vueuse/core';

const theme$2 = {
  "slots": {
    "root": "",
    "wrapper": "",
    "labelWrapper": "flex content-center items-center justify-between gap-1",
    "label": "block font-medium text-default",
    "container": "relative",
    "description": "text-muted",
    "error": "mt-2 text-error",
    "hint": "text-muted",
    "help": "mt-2 text-muted"
  },
  "variants": {
    "size": {
      "xs": {
        "root": "text-xs"
      },
      "sm": {
        "root": "text-xs"
      },
      "md": {
        "root": "text-sm"
      },
      "lg": {
        "root": "text-sm"
      },
      "xl": {
        "root": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "orientation": {
      "vertical": {
        "container": "mt-1"
      },
      "horizontal": {
        "root": "flex justify-between place-items-baseline gap-2"
      }
    }
  },
  "defaultVariants": {
    "size": "md",
    "orientation": "vertical"
  }
};
const _sfc_main$2 = {
  __name: "UFormField",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    name: { type: String, required: false },
    errorPattern: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    help: { type: String, required: false },
    error: { type: [Boolean, String], required: false, default: void 0 },
    hint: { type: String, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    eagerValidation: { type: Boolean, required: false },
    validateOnInputDelay: { type: Number, required: false },
    orientation: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("formField", props);
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.formField || {} })({
      size: props.size,
      required: props.required,
      orientation: props.orientation
    }));
    const formErrors = inject(formErrorsInjectionKey, null);
    const error = computed(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
    const id = ref(useId());
    const ariaId = id.value;
    const formInputs = inject(formInputsInjectionKey, void 0);
    watch(id, () => {
      if (formInputs && props.name) {
        formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern };
      }
    }, { immediate: true });
    provide(inputIdInjectionKey, id);
    provide(formFieldInjectionKey, computed(() => ({
      error: error.value,
      name: props.name,
      size: props.size,
      eagerValidation: props.eagerValidation,
      validateOnInputDelay: props.validateOnInputDelay,
      errorPattern: props.errorPattern,
      hint: props.hint,
      description: props.description,
      help: props.help,
      ariaId
    })));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-orientation": __props.orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId}>`);
            if (__props.label || !!slots.label) {
              _push2(`<div data-slot="labelWrapper" class="${ssrRenderClass(ui.value.labelWrapper({ class: unref(uiProp)?.labelWrapper }))}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Label), {
                for: id.value,
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
              }, _parent2, _scopeId));
              if (__props.hint || !!slots.hint) {
                _push2(`<span${ssrRenderAttr("id", `${unref(ariaId)}-hint`)} data-slot="hint" class="${ssrRenderClass(ui.value.hint({ class: unref(uiProp)?.hint }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => {
                  _push2(`${ssrInterpolate(__props.hint)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || !!slots.description) {
              _push2(`<p${ssrRenderAttr("id", `${unref(ariaId)}-description`)} data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(uiProp)?.description }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass([(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: unref(uiProp)?.container })])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", { error: error.value }, null, _push2, _parent2, _scopeId);
            if (props.error !== false && (typeof error.value === "string" && error.value || !!slots.error)) {
              _push2(`<div${ssrRenderAttr("id", `${unref(ariaId)}-error`)} data-slot="error" class="${ssrRenderClass(ui.value.error({ class: unref(uiProp)?.error }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "error", { error: error.value }, () => {
                _push2(`${ssrInterpolate(error.value)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else if (__props.help || !!slots.help) {
              _push2(`<div${ssrRenderAttr("id", `${unref(ariaId)}-help`)} data-slot="help" class="${ssrRenderClass(ui.value.help({ class: unref(uiProp)?.help }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "help", { help: __props.help }, () => {
                _push2(`${ssrInterpolate(__props.help)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
              }, [
                __props.label || !!slots.label ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "labelWrapper",
                  class: ui.value.labelWrapper({ class: unref(uiProp)?.labelWrapper })
                }, [
                  createVNode(unref(Label), {
                    for: id.value,
                    "data-slot": "label",
                    class: ui.value.label({ class: unref(uiProp)?.label })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                        createTextVNode(toDisplayString(__props.label), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["for", "class"]),
                  __props.hint || !!slots.hint ? (openBlock(), createBlock("span", {
                    key: 0,
                    id: `${unref(ariaId)}-hint`,
                    "data-slot": "hint",
                    class: ui.value.hint({ class: unref(uiProp)?.hint })
                  }, [
                    renderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => [
                      createTextVNode(toDisplayString(__props.hint), 1)
                    ])
                  ], 10, ["id"])) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  id: `${unref(ariaId)}-description`,
                  "data-slot": "description",
                  class: ui.value.description({ class: unref(uiProp)?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 10, ["id"])) : createCommentVNode("", true)
              ], 2),
              createVNode("div", {
                class: [(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: unref(uiProp)?.container })]
              }, [
                renderSlot(_ctx.$slots, "default", { error: error.value }),
                props.error !== false && (typeof error.value === "string" && error.value || !!slots.error) ? (openBlock(), createBlock("div", {
                  key: 0,
                  id: `${unref(ariaId)}-error`,
                  "data-slot": "error",
                  class: ui.value.error({ class: unref(uiProp)?.error })
                }, [
                  renderSlot(_ctx.$slots, "error", { error: error.value }, () => [
                    createTextVNode(toDisplayString(error.value), 1)
                  ])
                ], 10, ["id"])) : __props.help || !!slots.help ? (openBlock(), createBlock("div", {
                  key: 1,
                  id: `${unref(ariaId)}-help`,
                  "data-slot": "help",
                  class: ui.value.help({ class: unref(uiProp)?.help })
                }, [
                  renderSlot(_ctx.$slots, "help", { help: __props.help }, () => [
                    createTextVNode(toDisplayString(__props.help), 1)
                  ])
                ], 10, ["id"])) : createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/FormField.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-bg stroke-default",
    "content": "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
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
      "class": "focus:ring-2 focus:ring-inset focus:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-error"
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
      "class": "focus:ring-2 focus:ring-inset focus:ring-inverted"
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
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelect",
  __ssrInlineRender: true,
  props: {
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    autocomplete: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["change", "blur", "focus", "update:modelValue", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("select", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
    const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.select || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const groups = computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const triggerRef = useTemplateRef("triggerRef");
    function onUpdate(value) {
      if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number) {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ??= null;
      }
      if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
        value ??= void 0;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onUpdateOpen(value) {
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
      }
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    const viewportRef = useTemplateRef("viewportRef");
    __expose({
      triggerRef: toRef(() => triggerRef.value?.$el),
      viewportRef: toRef(() => viewportRef.value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectRoot), mergeProps({ name: unref(name) }, unref(rootProps), {
        autocomplete: __props.autocomplete,
        disabled: unref(disabled),
        "default-value": __props.defaultValue,
        "model-value": __props.modelValue,
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }, _attrs), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectTrigger), mergeProps({
              id: unref(id),
              ref_key: "triggerRef",
              ref: triggerRef,
              "data-slot": "base",
              class: ui.value.base({ class: [unref(uiProp)?.base, props.class] })
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                    _push3(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(uiProp)?.leading }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (unref(isLeading) && unref(leadingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$e, {
                          name: unref(leadingIconName),
                          "data-slot": "leadingIcon",
                          class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
                        }, null, _parent3, _scopeId2));
                      } else if (!!__props.avatar) {
                        _push3(ssrRenderComponent(_sfc_main$c, mergeProps({
                          size: unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          "data-slot": "itemLeadingAvatar",
                          class: ui.value.itemLeadingAvatar({ class: unref(uiProp)?.itemLeadingAvatar })
                        }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  ssrRenderSlot(_ctx.$slots, "default", {
                    modelValue,
                    open,
                    ui: ui.value
                  }, () => {
                    _push3(`<!--[-->`);
                    ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                      _push3(`<!--[-->`);
                      if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                        _push3(`<span data-slot="value" class="${ssrRenderClass(ui.value.value({ class: unref(uiProp)?.value }))}"${_scopeId2}>${ssrInterpolate(displayedModelValue)}</span>`);
                      } else {
                        _push3(`<span data-slot="placeholder" class="${ssrRenderClass(ui.value.placeholder({ class: unref(uiProp)?.placeholder }))}"${_scopeId2}>${ssrInterpolate(__props.placeholder ?? " ")}</span>`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                  }, _push3, _parent3, _scopeId2);
                  if (unref(isTrailing) || !!slots.trailing) {
                    _push3(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(uiProp)?.trailing }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (unref(trailingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$e, {
                          name: unref(trailingIconName),
                          "data-slot": "trailingIcon",
                          class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                      key: 0,
                      "data-slot": "leading",
                      class: ui.value.leading({ class: unref(uiProp)?.leading })
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                          key: 0,
                          name: unref(leadingIconName),
                          "data-slot": "leadingIcon",
                          class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
                        }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                          key: 1,
                          size: unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          "data-slot": "itemLeadingAvatar",
                          class: ui.value.itemLeadingAvatar({ class: unref(uiProp)?.itemLeadingAvatar })
                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                      ])
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "default", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                        return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                          displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "value",
                            class: ui.value.value({ class: unref(uiProp)?.value })
                          }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                            key: 1,
                            "data-slot": "placeholder",
                            class: ui.value.placeholder({ class: unref(uiProp)?.placeholder })
                          }, toDisplayString(__props.placeholder ?? " "), 3))
                        ], 64);
                      }), 128))
                    ]),
                    unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                      key: 1,
                      "data-slot": "trailing",
                      class: ui.value.trailing({ class: unref(uiProp)?.trailing })
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
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
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SelectPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: unref(uiProp)?.content })
                  }, contentProps.value), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push4, _parent4, _scopeId3);
                        _push4(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass(ui.value.viewport({ class: unref(uiProp)?.viewport }))}"${_scopeId3}><!--[-->`);
                        ssrRenderList(groups.value, (group, groupIndex) => {
                          _push4(ssrRenderComponent(unref(SelectGroup), {
                            key: `group-${groupIndex}`,
                            "data-slot": "group",
                            class: ui.value.group({ class: unref(uiProp)?.group })
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(group, (item, index) => {
                                  _push5(`<!--[-->`);
                                  if (isSelectItem(item) && item.type === "label") {
                                    _push5(ssrRenderComponent(unref(SelectLabel), {
                                      "data-slot": "label",
                                      class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label, item.class] })
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else if (isSelectItem(item) && item.type === "separator") {
                                    _push5(ssrRenderComponent(unref(SelectSeparator), {
                                      "data-slot": "separator",
                                      class: ui.value.separator({ class: [unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(ssrRenderComponent(unref(SelectItem), {
                                      "data-slot": "item",
                                      class: ui.value.item({ class: [unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                      onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          ssrRenderSlot(_ctx.$slots, "item", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => {
                                            ssrRenderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => {
                                              if (isSelectItem(item) && item.icon) {
                                                _push6(ssrRenderComponent(_sfc_main$e, {
                                                  name: item.icon,
                                                  "data-slot": "itemLeadingIcon",
                                                  class: ui.value.itemLeadingIcon({ class: [unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.avatar) {
                                                _push6(ssrRenderComponent(_sfc_main$c, mergeProps({
                                                  size: item.ui?.itemLeadingAvatarSize || unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  "data-slot": "itemLeadingAvatar",
                                                  class: ui.value.itemLeadingAvatar({ class: [unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.chip) {
                                                _push6(ssrRenderComponent(_sfc_main$d, mergeProps({
                                                  size: item.ui?.itemLeadingChipSize || unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  "data-slot": "itemLeadingChip",
                                                  class: ui.value.itemLeadingChip({ class: [unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, _parent6, _scopeId5));
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            }, _push6, _parent6, _scopeId5);
                                            _push6(`<span data-slot="itemWrapper" class="${ssrRenderClass(ui.value.itemWrapper({ class: [unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId5}>`);
                                            _push6(ssrRenderComponent(unref(SelectItemText), {
                                              "data-slot": "itemLabel",
                                              class: ui.value.itemLabel({ class: [unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  ssrRenderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    _push7(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                                                  }, _push7, _parent7, _scopeId6);
                                                } else {
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            if (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"])) {
                                              _push6(`<span data-slot="itemDescription" class="${ssrRenderClass(ui.value.itemDescription({ class: [unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId5}>`);
                                              ssrRenderSlot(_ctx.$slots, "item-description", {
                                                item,
                                                index
                                              }, () => {
                                                _push6(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
                                              }, _push6, _parent6, _scopeId5);
                                              _push6(`</span>`);
                                            } else {
                                              _push6(`<!---->`);
                                            }
                                            _push6(`</span><span data-slot="itemTrailing" class="${ssrRenderClass(ui.value.itemTrailing({ class: [unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId5}>`);
                                            ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, null, _push6, _parent6, _scopeId5);
                                            _push6(ssrRenderComponent(unref(SelectItemIndicator), { "as-child": "" }, {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(_sfc_main$e, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    "data-slot": "itemTrailingIcon",
                                                    class: ui.value.itemTrailingIcon({ class: [unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(_sfc_main$e, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      "data-slot": "itemTrailingIcon",
                                                      class: ui.value.itemTrailingIcon({ class: [unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</span>`);
                                          }, _push6, _parent6, _scopeId5);
                                        } else {
                                          return [
                                            renderSlot(_ctx.$slots, "item", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }, () => [
                                                isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                  key: 0,
                                                  name: item.icon,
                                                  "data-slot": "itemLeadingIcon",
                                                  class: ui.value.itemLeadingIcon({ class: [unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                  key: 1,
                                                  size: item.ui?.itemLeadingAvatarSize || unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  "data-slot": "itemLeadingAvatar",
                                                  class: ui.value.itemLeadingAvatar({ class: [unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                  key: 2,
                                                  size: item.ui?.itemLeadingChipSize || unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  "data-slot": "itemLeadingChip",
                                                  class: ui.value.itemLeadingChip({ class: [unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                              ]),
                                              createVNode("span", {
                                                "data-slot": "itemWrapper",
                                                class: ui.value.itemWrapper({ class: [unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                              }, [
                                                createVNode(unref(SelectItemText), {
                                                  "data-slot": "itemLabel",
                                                  class: ui.value.itemLabel({ class: [unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                }, {
                                                  default: withCtx(() => [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class"]),
                                                isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                  key: 0,
                                                  "data-slot": "itemDescription",
                                                  class: ui.value.itemDescription({ class: [unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                }, [
                                                  renderSlot(_ctx.$slots, "item-description", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)
                                                  ])
                                                ], 2)) : createCommentVNode("", true)
                                              ], 2),
                                              createVNode("span", {
                                                "data-slot": "itemTrailing",
                                                class: ui.value.itemTrailing({ class: [unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index,
                                                  ui: ui.value
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$e, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      "data-slot": "itemTrailingIcon",
                                                      class: ui.value.itemTrailingIcon({ class: [unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  }
                                  _push5(`<!--]-->`);
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        "data-slot": "label",
                                        class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        "data-slot": "separator",
                                        class: ui.value.separator({ class: [unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        "data-slot": "item",
                                        class: ui.value.item({ class: [unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => [
                                            renderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => [
                                              isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                key: 0,
                                                name: item.icon,
                                                "data-slot": "itemLeadingIcon",
                                                class: ui.value.itemLeadingIcon({ class: [unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                key: 1,
                                                size: item.ui?.itemLeadingAvatarSize || unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                              }, { ref_for: true }, item.avatar, {
                                                "data-slot": "itemLeadingAvatar",
                                                class: ui.value.itemLeadingAvatar({ class: [unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                key: 2,
                                                size: item.ui?.itemLeadingChipSize || unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                inset: "",
                                                standalone: ""
                                              }, { ref_for: true }, item.chip, {
                                                "data-slot": "itemLeadingChip",
                                                class: ui.value.itemLeadingChip({ class: [unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                            ]),
                                            createVNode("span", {
                                              "data-slot": "itemWrapper",
                                              class: ui.value.itemWrapper({ class: [unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                            }, [
                                              createVNode(unref(SelectItemText), {
                                                "data-slot": "itemLabel",
                                                class: ui.value.itemLabel({ class: [unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                "data-slot": "itemDescription",
                                                class: ui.value.itemDescription({ class: [unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-description", {
                                                  item,
                                                  index
                                                }, () => [
                                                  createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)
                                                ])
                                              ], 2)) : createCommentVNode("", true)
                                            ], 2),
                                            createVNode("span", {
                                              "data-slot": "itemTrailing",
                                              class: ui.value.itemTrailing({ class: [unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-trailing", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }),
                                              createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$e, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    "data-slot": "itemTrailingIcon",
                                                    class: ui.value.itemTrailingIcon({ class: [unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8, ["name", "class"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 2)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                        ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(SelectArrow), mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content-top"),
                          createVNode("div", {
                            ref_key: "viewportRef",
                            ref: viewportRef,
                            role: "presentation",
                            "data-slot": "viewport",
                            class: ui.value.viewport({ class: unref(uiProp)?.viewport })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                              return openBlock(), createBlock(unref(SelectGroup), {
                                key: `group-${groupIndex}`,
                                "data-slot": "group",
                                class: ui.value.group({ class: unref(uiProp)?.group })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        "data-slot": "label",
                                        class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        "data-slot": "separator",
                                        class: ui.value.separator({ class: [unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        "data-slot": "item",
                                        class: ui.value.item({ class: [unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => [
                                            renderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => [
                                              isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                key: 0,
                                                name: item.icon,
                                                "data-slot": "itemLeadingIcon",
                                                class: ui.value.itemLeadingIcon({ class: [unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                key: 1,
                                                size: item.ui?.itemLeadingAvatarSize || unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                              }, { ref_for: true }, item.avatar, {
                                                "data-slot": "itemLeadingAvatar",
                                                class: ui.value.itemLeadingAvatar({ class: [unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                                key: 2,
                                                size: item.ui?.itemLeadingChipSize || unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                inset: "",
                                                standalone: ""
                                              }, { ref_for: true }, item.chip, {
                                                "data-slot": "itemLeadingChip",
                                                class: ui.value.itemLeadingChip({ class: [unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                            ]),
                                            createVNode("span", {
                                              "data-slot": "itemWrapper",
                                              class: ui.value.itemWrapper({ class: [unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                            }, [
                                              createVNode(unref(SelectItemText), {
                                                "data-slot": "itemLabel",
                                                class: ui.value.itemLabel({ class: [unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                "data-slot": "itemDescription",
                                                class: ui.value.itemDescription({ class: [unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-description", {
                                                  item,
                                                  index
                                                }, () => [
                                                  createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)
                                                ])
                                              ], 2)) : createCommentVNode("", true)
                                            ], 2),
                                            createVNode("span", {
                                              "data-slot": "itemTrailing",
                                              class: ui.value.itemTrailing({ class: [unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-trailing", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }),
                                              createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$e, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    "data-slot": "itemTrailingIcon",
                                                    class: ui.value.itemTrailingIcon({ class: [unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8, ["name", "class"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 2)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ], 2),
                          renderSlot(_ctx.$slots, "content-bottom"),
                          !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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
                    createVNode(unref(SelectContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: unref(uiProp)?.content })
                    }, contentProps.value), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content-top"),
                        createVNode("div", {
                          ref_key: "viewportRef",
                          ref: viewportRef,
                          role: "presentation",
                          "data-slot": "viewport",
                          class: ui.value.viewport({ class: unref(uiProp)?.viewport })
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                            return openBlock(), createBlock(unref(SelectGroup), {
                              key: `group-${groupIndex}`,
                              "data-slot": "group",
                              class: ui.value.group({ class: unref(uiProp)?.group })
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                  return openBlock(), createBlock(Fragment, {
                                    key: `group-${groupIndex}-${index}`
                                  }, [
                                    isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                      key: 0,
                                      "data-slot": "label",
                                      class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label, item.class] })
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                      key: 1,
                                      "data-slot": "separator",
                                      class: ui.value.separator({ class: [unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                    }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                      key: 2,
                                      "data-slot": "item",
                                      class: ui.value.item({ class: [unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                      onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "item", {
                                          item,
                                          index,
                                          ui: ui.value
                                        }, () => [
                                          renderSlot(_ctx.$slots, "item-leading", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => [
                                            isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                              key: 0,
                                              name: item.icon,
                                              "data-slot": "itemLeadingIcon",
                                              class: ui.value.itemLeadingIcon({ class: [unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                            }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                              key: 1,
                                              size: item.ui?.itemLeadingAvatarSize || unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                            }, { ref_for: true }, item.avatar, {
                                              "data-slot": "itemLeadingAvatar",
                                              class: ui.value.itemLeadingAvatar({ class: [unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                            }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                              key: 2,
                                              size: item.ui?.itemLeadingChipSize || unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                              inset: "",
                                              standalone: ""
                                            }, { ref_for: true }, item.chip, {
                                              "data-slot": "itemLeadingChip",
                                              class: ui.value.itemLeadingChip({ class: [unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                          ]),
                                          createVNode("span", {
                                            "data-slot": "itemWrapper",
                                            class: ui.value.itemWrapper({ class: [unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                          }, [
                                            createVNode(unref(SelectItemText), {
                                              "data-slot": "itemLabel",
                                              class: ui.value.itemLabel({ class: [unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item-label", {
                                                  item,
                                                  index
                                                }, () => [
                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]),
                                            isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              "data-slot": "itemDescription",
                                              class: ui.value.itemDescription({ class: [unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-description", {
                                                item,
                                                index
                                              }, () => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)
                                              ])
                                            ], 2)) : createCommentVNode("", true)
                                          ], 2),
                                          createVNode("span", {
                                            "data-slot": "itemTrailing",
                                            class: ui.value.itemTrailing({ class: [unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                          }, [
                                            renderSlot(_ctx.$slots, "item-trailing", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }),
                                            createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$e, {
                                                  name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                  "data-slot": "itemTrailingIcon",
                                                  class: ui.value.itemTrailingIcon({ class: [unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                }, null, 8, ["name", "class"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ], 2)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "disabled", "value", "onSelect"]))
                                  ], 64);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ], 2),
                        renderSlot(_ctx.$slots, "content-bottom"),
                        !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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
              createVNode(unref(SelectTrigger), mergeProps({
                id: unref(id),
                ref_key: "triggerRef",
                ref: triggerRef,
                "data-slot": "base",
                class: ui.value.base({ class: [unref(uiProp)?.base, props.class] })
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
                default: withCtx(() => [
                  unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                    key: 0,
                    "data-slot": "leading",
                    class: ui.value.leading({ class: unref(uiProp)?.leading })
                  }, [
                    renderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                        key: 0,
                        name: unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
                      }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                        key: 1,
                        size: unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: ui.value.itemLeadingAvatar({ class: unref(uiProp)?.itemLeadingAvatar })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ])
                  ], 2)) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "default", {
                    modelValue,
                    open,
                    ui: ui.value
                  }, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                      return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                        displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "value",
                          class: ui.value.value({ class: unref(uiProp)?.value })
                        }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                          key: 1,
                          "data-slot": "placeholder",
                          class: ui.value.placeholder({ class: unref(uiProp)?.placeholder })
                        }, toDisplayString(__props.placeholder ?? " "), 3))
                      ], 64);
                    }), 128))
                  ]),
                  unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                    key: 1,
                    "data-slot": "trailing",
                    class: ui.value.trailing({ class: unref(uiProp)?.trailing })
                  }, [
                    renderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                        key: 0,
                        name: unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ])
                  ], 2)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1040, ["id", "class"]),
              createVNode(unref(SelectPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(SelectContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: unref(uiProp)?.content })
                  }, contentProps.value), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content-top"),
                      createVNode("div", {
                        ref_key: "viewportRef",
                        ref: viewportRef,
                        role: "presentation",
                        "data-slot": "viewport",
                        class: ui.value.viewport({ class: unref(uiProp)?.viewport })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                          return openBlock(), createBlock(unref(SelectGroup), {
                            key: `group-${groupIndex}`,
                            "data-slot": "group",
                            class: ui.value.group({ class: unref(uiProp)?.group })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: `group-${groupIndex}-${index}`
                                }, [
                                  isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                    key: 0,
                                    "data-slot": "label",
                                    class: ui.value.label({ class: [unref(uiProp)?.label, item.ui?.label, item.class] })
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                    key: 1,
                                    "data-slot": "separator",
                                    class: ui.value.separator({ class: [unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                  }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                    key: 2,
                                    "data-slot": "item",
                                    class: ui.value.item({ class: [unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                    disabled: isSelectItem(item) && item.disabled,
                                    value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                    onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "item", {
                                        item,
                                        index,
                                        ui: ui.value
                                      }, () => [
                                        renderSlot(_ctx.$slots, "item-leading", {
                                          item,
                                          index,
                                          ui: ui.value
                                        }, () => [
                                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                            key: 0,
                                            name: item.icon,
                                            "data-slot": "itemLeadingIcon",
                                            class: ui.value.itemLeadingIcon({ class: [unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                            key: 1,
                                            size: item.ui?.itemLeadingAvatarSize || unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                          }, { ref_for: true }, item.avatar, {
                                            "data-slot": "itemLeadingAvatar",
                                            class: ui.value.itemLeadingAvatar({ class: [unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                            key: 2,
                                            size: item.ui?.itemLeadingChipSize || unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                            inset: "",
                                            standalone: ""
                                          }, { ref_for: true }, item.chip, {
                                            "data-slot": "itemLeadingChip",
                                            class: ui.value.itemLeadingChip({ class: [unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                        ]),
                                        createVNode("span", {
                                          "data-slot": "itemWrapper",
                                          class: ui.value.itemWrapper({ class: [unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                        }, [
                                          createVNode(unref(SelectItemText), {
                                            "data-slot": "itemLabel",
                                            class: ui.value.itemLabel({ class: [unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                          }, {
                                            default: withCtx(() => [
                                              renderSlot(_ctx.$slots, "item-label", {
                                                item,
                                                index
                                              }, () => [
                                                createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]),
                                          isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            "data-slot": "itemDescription",
                                            class: ui.value.itemDescription({ class: [unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                          }, [
                                            renderSlot(_ctx.$slots, "item-description", {
                                              item,
                                              index
                                            }, () => [
                                              createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)
                                            ])
                                          ], 2)) : createCommentVNode("", true)
                                        ], 2),
                                        createVNode("span", {
                                          "data-slot": "itemTrailing",
                                          class: ui.value.itemTrailing({ class: [unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                        }, [
                                          renderSlot(_ctx.$slots, "item-trailing", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }),
                                          createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                            default: withCtx(() => [
                                              createVNode(_sfc_main$e, {
                                                name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                "data-slot": "itemTrailingIcon",
                                                class: ui.value.itemTrailingIcon({ class: [unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                              }, null, 8, ["name", "class"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ], 2)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["class", "disabled", "value", "onSelect"]))
                                ], 64);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"]);
                        }), 128))
                      ], 2),
                      renderSlot(_ctx.$slots, "content-bottom"),
                      !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const kbdKeysMap = {
  meta: "",
  ctrl: "",
  alt: "",
  win: "⊞",
  command: "⌘",
  shift: "⇧",
  control: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌦",
  backspace: "⌫",
  escape: "Esc",
  tab: "⇥",
  capslock: "⇪",
  arrowup: "↑",
  arrowright: "→",
  arrowdown: "↓",
  arrowleft: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘"
};
const _useKbd = () => {
  const macOS = computed(() => false);
  const kbdKeysSpecificMap = reactive({
    meta: " ",
    alt: " ",
    ctrl: " "
  });
  function getKbdKey(value) {
    if (!value) {
      return;
    }
    if (["meta", "alt", "ctrl"].includes(value)) {
      return kbdKeysSpecificMap[value];
    }
    return kbdKeysMap[value] || value;
  }
  return {
    macOS,
    getKbdKey
  };
};
const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
const theme = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans uppercase",
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
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10"
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
    }
  ],
  "defaultVariants": {
    "variant": "outline",
    "color": "neutral",
    "size": "md"
  }
};
const _sfc_main = {
  __name: "UKbd",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "kbd" },
    value: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const { getKbdKey } = useKbd();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("kbd", props);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.kbd || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value({ class: [unref(uiProp)?.base, props.class], color: props.color, variant: props.variant, size: props.size })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(unref(getKbdKey)(__props.value))}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(unref(getKbdKey)(__props.value)), 1)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function colorizeByRange(items, colorRanges, fieldValue = "value") {
  return items.map((obj) => {
    const value = obj[fieldValue];
    for (let i = 0; i < colorRanges.length; i += 2) {
      const rangeEnd = colorRanges[i];
      const color = colorRanges[i + 1];
      if (value <= rangeEnd || i === colorRanges.length - 2) {
        return {
          ...obj,
          color
        };
      }
    }
    return obj;
  });
}
function colorize(value, colorScheme) {
  if (value <= colorScheme[0]) {
    return colorScheme[1];
  }
  for (let i = 0; i < colorScheme.length; i += 2) {
    const threshold = colorScheme[i];
    if (value < threshold) {
      return colorScheme[i - 1];
    }
  }
  return colorScheme[colorScheme.length - 1];
}
class Colorer {
  schemes;
  constructor(schemes) {
    this.schemes = schemes;
  }
  replace(schema) {
    this.schemes = schema;
  }
  paint(key, data) {
    const schema = this.schemes[key];
    if (schema) {
      const colored = colorizeByRange(data, schema);
      return colored;
    }
  }
  paintSelf(key, value) {
    const schema = this.schemes[key];
    return colorize(value, schema);
  }
  paintObject(data) {
    const res = {};
    for (let key in data) {
      const value = data[key];
      res[key] = { color: colorize(value, this.schemes[key]), value };
    }
    return res;
  }
  getScheme(key) {
    return this.schemes[key] || [0, "#ffffff"];
  }
}
const iaqi = [0, "#00E400", 50, "#00E400", 100, "#FFFF00", 150, "#FF7E00", 200, "#FF0000", 300, "#8B008B", 400, "#7E0023", 500, "#202020"];
const i371 = [0, "#00E400", 0.5, "#00E400", 1, "#FFFF00", 2, "#FF7E00", 4, "#FF0000", 8, "#8B008B", 16, "#7E0023"];
const i58 = [0, "#00E400", 0.05, "#00E400", 0.1, "#FFFF00", 0.2, "#FF7E00", 0.4, "#FF0000", 0.8, "#8B008B", 2, "#7E0023"];
const i59 = [0, "#00E400", 0.1, "#00E400", 0.2, "#FFFF00", 0.4, "#FF7E00", 0.8, "#FF0000", 1.6, "#8B008B", 2, "#7E0023"];
const i60 = [0, "#00E400", 0.05, "#00E400", 0.1, "#FFFF00", 0.2, "#FF7E00", 0.4, "#FF0000", 0.8, "#8B008B", 1, "#7E0023"];
const i1 = [0, "#00E400", 25e-5, "#00E400", 5e-4, "#FFFF00", 1e-3, "#FF7E00", 2e-3, "#FF0000", 4e-3, "#8B008B", 5e-3, "#7E0023"];
const i64 = [0, "#00E400", 2e-3, "#00E400", 4e-3, "#FFFF00", 8e-3, "#FF7E00", 0.016, "#FF0000", 0.032, "#8B008B", 0.04, "#7E0023"];
const i62 = [0, "#00E400", 0.125, "#00E400", 0.25, "#FFFF00", 0.5, "#FF7E00", 1, "#FF0000", 2, "#8B008B", 2.5, "#7E0023"];
const i63 = [0, "#00E400", 0.05, "#00E400", 0.1, "#FFFF00", 0.2, "#FF7E00", 0.4, "#FF0000", 0.8, "#8B008B", 2, "#7E0023"];
const i312 = [0, "#00E400", 0.05, "#00E400", 0.1, "#FFFF00", 0.2, "#FF7E00", 0.4, "#FF0000", 0.8, "#8B008B", 1, "#7E0023"];
const i296 = [0, "#00E400", 5e-3, "#00E400", 0.01, "#FFFF00", 0.02, "#FF7E00", 0.04, "#FF0000", 0.08, "#8B008B", 0.1, "#7E0023"];
const i298 = [0, "#00E400", 0.0125, "#00E400", 0.025, "#FFFF00", 0.05, "#FF7E00", 0.1, "#FF0000", 0.2, "#8B008B", 0.25, "#7E0023"];
const i311 = [0, "#00E400", 0.05, "#00E400", 0.1, "#FFFF00", 0.2, "#FF7E00", 0.4, "#FF0000", 0.8, "#8B008B", 1, "#7E0023"];
const schemes2 = {
  iaqi,
  i371,
  i58,
  i59,
  i60,
  "m-p": [700, "#0000FF", 720, "#00BFFF", 740, "#00FF00", 760, "#FFFF00", 780, "#FFA500", 800, "#FF0000", 820, "#8B0000"],
  i1,
  "p-pm10": [0, "#00E400", 12, "#00E400", 35, "#FFFF00", 55, "#FF7E00", 150, "#FF0000", 250, "#8B008B", 350, "#7E0023", 500, "#202020"],
  "p-pm2": [0, "#00E400", 12, "#00E400", 35, "#FFFF00", 55, "#FF7E00", 150, "#FF0000", 250, "#8B008B", 350, "#7E0023", 500, "#202020"],
  "m-h": [0, "#FFA500", 20, "#FFD700", 40, "#FFFF00", 60, "#00FF00", 80, "#00BFFF", 100, "#0000FF"],
  "m-wd": [0, "#FF0000", 45, "#FFA500", 90, "#FFFF00", 135, "#00FF00", 180, "#00BFFF", 225, "#0000FF", 270, "#8B00FF", 315, "#FF00FF", 360, "#FF0000"],
  i64,
  i62,
  "m-wv": [0, "#00E400", 2, "#00E400", 4, "#FFFF00", 6, "#FFA500", 8, "#FF0000", 10, "#8B0000", 12, "#4B0082"],
  "m-t": [-40, "#0000FF", -30, "#1E90FF", -20, "#00BFFF", -10, "#87CEEB", 0, "#F0F0F0", 10, "#FFFF00", 20, "#FFA500", 30, "#FF4500", 40, "#FF0000"],
  i63,
  i312,
  i296,
  i298,
  i311
};
const colorer = new Colorer(schemes2);
function formateDate(d) {
  const date = new Date(d);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yy = date.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (yy < 10) yy = "0" + yy;
  return yy + "-" + mm + "-" + dd;
}
class SetDataService {
  URL;
  uid;
  constructor({ uid: uid2 }) {
    this.URL = `https://sensor.krasn.ru/hub/api/3.0/sets/`;
    this.uid = uid2;
  }
  setParams(options, url) {
    for (let option in options) {
      if (options[option])
        url.searchParams.set(option, options[option]);
    }
  }
  async getDataById({ begin, end, timeInterval, codeDta, id }) {
    const url = new URL(`${codeDta}/data/archive`, this.URL);
    const options = {
      "time_begin": `${formateDate(begin)} 00:00:00`,
      "time_end": `${formateDate(end)} 23:59:00`,
      "uid": this.uid,
      "time_interval": timeInterval,
      "sites": id
    };
    this.setParams(options, url);
    const promise = await fetch(url.toString()).then((res) => res.json());
    return promise.data;
  }
  async getDataByDta({ begin, end, timeInterval, codeDta, sites }) {
    const url = new URL(`${codeDta}/data/archive`, this.URL);
    const options = {
      "time_begin": `${formateDate(begin)} 00:00:00`,
      "time_end": `${formateDate(end)} 23:59:00`,
      "uid": this.uid,
      "time_interval": timeInterval,
      "sites": sites
    };
    this.setParams(options, url);
    const promise = await fetch(url.toString()).then((res) => res.json());
    return promise.data;
  }
  async getData({ dta: dta2, begin, end, timeInterval, sites }) {
    const promises = dta2.map((set) => {
      const url = new URL(`${set.code}/data/archive`, this.URL);
      const options = {
        "time_begin": `${formateDate(begin)} 00:00:00`,
        "time_end": `${formateDate(end)} 23:59:00`,
        "uid": this.uid,
        "time_interval": timeInterval,
        "sites": sites
      };
      this.setParams(options, url);
      const promise = fetch(url.toString()).then((res2) => res2.json());
      return promise;
    });
    const res = await Promise.all(promises).then((res2) => {
      const arrays = [];
      res2.forEach((r) => arrays.push(...r.data));
      return arrays;
    });
    return res;
  }
}
function createIndicators(dtas) {
  const indicators = dtas.flatMap((dta2) => dta2.indicators);
  const uniq = indicators.filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id));
  return uniq;
}
class SetService {
  dta;
  uid;
  constructor({ dta: dta2, uid: uid2 }) {
    this.dta = dta2;
    this.uid = uid2;
  }
  async getSets() {
    const promises = this.dta.map((d) => {
      const promise = fetch(`https://sensor.krasn.ru/hub/api/3.0/sets/${d}?uid=khlnn3o37xah7pj2`).then((res) => res.json());
      return promise;
    });
    const dta2 = await Promise.all(promises).then((res) => {
      return res.map((r) => r.data);
    });
    dta2.forEach((d) => {
      d.sites.forEach((site) => {
        site.codeDta = d.code;
      });
    });
    const indicators = createIndicators(dta2);
    return { dta: dta2, indicators };
  }
}
function getDiff(b, e) {
  const begin = b.toString();
  const end = e.toString();
  const diff = new Date(end).getTime() - new Date(begin).getTime();
  return Math.round(diff / (1e3 * 3600 * 24));
}
class DataService {
  setDataService;
  setService;
  constructor({ setService: setService2, setDataService: setDataService2 }) {
    this.setDataService = setDataService2;
    this.setService = setService2;
  }
  async getData(options) {
    const { begin, end, dta: dta2 } = options;
    const beginDate = begin.toString();
    const endDate = end.toString();
    const difference = getDiff(begin, end);
    const timeInterval = difference < 5 ? "hour" : "day";
    const data = await this.setDataService.getData({ begin: beginDate, end: endDate, timeInterval, dta: dta2 });
    return data;
  }
  async getDta() {
    const data = await this.setService.getSets();
    return data;
  }
}
const dta$1 = ["dta-air", "dta-gas"];
const uid$1 = "khlnn3o37xah7pj2";
const setService$1 = new SetService({ dta: dta$1, uid: uid$1 });
const setDataService$1 = new SetDataService({ uid: uid$1 });
const dataService = new DataService({ setService: setService$1, setDataService: setDataService$1 });
const dta = ["knc-mtp5"];
const uid = "nh0bmniqvqldilyq";
const setService = new SetService({ dta, uid });
const setDataService = new SetDataService({ uid });
const dataServiceProfiler = new DataService({ setService, setDataService });

export { SetDataService as S, _sfc_main$2 as _, dataServiceProfiler as a, _sfc_main$1 as b, colorer as c, dataService as d, _sfc_main as e, getDiff as g };
//# sourceMappingURL=registerProfiler-CNKjU182.mjs.map
