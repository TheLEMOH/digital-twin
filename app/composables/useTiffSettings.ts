export default function useTiffSettings() {
    const tiffOpacity = shallowRef<number>(0.8)
    const selectedTiffIndicator = shallowRef<string>('no2')
    const selectedBand = shallowRef<number>(0)
    const tiffFilterRange = shallowRef<Array<number>>([0.01, 0.5])

    return { tiffOpacity, selectedTiffIndicator, selectedBand, tiffFilterRange }
}