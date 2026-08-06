export default function useLoading() {
    const open = ref<boolean>(true)

    setTimeout(() => {
        open.value = false
    }, 2000);

    return { open }
}