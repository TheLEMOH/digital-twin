import type { Feature } from '~/types/featureCollection'
import type Indicator from '~/types/indicator'

export default function useGeneral() {
    const selectedIndicator = shallowRef<Indicator>({ code: "i58" })
    const selectedFeature = shallowRef<Feature | null>(null)

    const gfsData = shallowRef({})

    const isOpenDialog = ref<boolean>(false)
    const isOpenDialogGFS = ref<boolean>(false)
    const isOpenSidebar = ref<boolean>(false)

    const selectedHeight = ref<number>(125)
    const selectedSubstrate = ref<string>('satellite')

    return {
        selectedIndicator,
        isOpenDialog,
        isOpenDialogGFS,
        selectedFeature,
        isOpenSidebar,
        selectedHeight,
        gfsData,
        selectedSubstrate
    }
}