export default function useSiteSettings() {
    const selectedSiteGroup = shallowRef<string[]>(['m'])

    return { selectedSiteGroup }
}