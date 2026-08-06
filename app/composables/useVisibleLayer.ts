export default function useVisibleLayers() {
    const visibleFill = ref<boolean>(false)
    const visibleFillExtrusion = ref<boolean>(false)
    const visibleVoronoi = ref<boolean>(false)
    const visibleDeckGL = ref<boolean>(false)
    const visbileHill = ref<boolean>(false)

    return { visibleFill, visibleFillExtrusion, visibleVoronoi, visibleDeckGL, visbileHill }
}