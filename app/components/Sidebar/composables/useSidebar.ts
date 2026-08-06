export default function useSidebar() {
    const openSidebar = ref<boolean>(false)

    provide('openSidebar', openSidebar)
}