export default function useLoading() {
    const loading = shallowRef<boolean>(false)

    return { loading }
}