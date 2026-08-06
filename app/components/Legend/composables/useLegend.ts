import colorer from "~/core/colorer"
import type Indicator from "~/types/indicator"

export default function useLegend() {
    const selectedIndicator = inject<Ref<Indicator>>('selectedIndicator')!

    const scheme = ref<Ref<[number, string]>>(colorer.getScheme(selectedIndicator?.value.code))

    watch(selectedIndicator,
        (indicator) => {
            scheme.value = colorer.getScheme(indicator.code)
        },
        { immediate: true }
    )

    return scheme
}