import type { DialogContentProps } from 'reka-ui'
import type { CSSProperties } from 'vue'

export default function useSiteDialogResize() {
    const resizedHeight = shallowRef<number | null>(null)
    const previousHeight = shallowRef<number | null>(null)
    const isExpanded = shallowRef(false)

    const contentStyle = computed(() => {
        const position = 'absolute' as const

        if (isExpanded.value) {
            return { position, height: '100dvh' }
        }

        return resizedHeight.value == null ? { position } : { position, height: `${resizedHeight.value}px` }
    })

    const contentProps = computed<DialogContentProps & { style: CSSProperties }>(() => ({
        style: contentStyle.value
    }))

    let stopResizing: (() => void) | null = null

    const cleanupResize = () => {
        stopResizing?.()
        stopResizing = null
    }

    const toggleExpanded = () => {
        if (isExpanded.value) {
            isExpanded.value = false
            resizedHeight.value = previousHeight.value
            previousHeight.value = null
            return
        }

        previousHeight.value = resizedHeight.value
        isExpanded.value = true
    }

    const startResize = (event: PointerEvent) => {
        const handle = event.currentTarget as HTMLElement | null
        const content = handle?.closest<HTMLElement>('[data-slot="content"]')

        if (!content) return

        event.preventDefault()
        cleanupResize()

        const startY = event.clientY
        const startHeight = content.getBoundingClientRect().height
        const minHeight = 180
        const maxHeight = window.innerHeight
        const wasExpanded = isExpanded.value
        const previousSize = resizedHeight.value

        if (wasExpanded) {
            resizedHeight.value = startHeight
            isExpanded.value = false
        }

        document.body.style.cursor = 'row-resize'
        document.body.style.userSelect = 'none'

        const onPointerMove = (moveEvent: PointerEvent) => {
            const nextHeight = startHeight + (startY - moveEvent.clientY)
            resizedHeight.value = Math.max(minHeight, Math.min(maxHeight, nextHeight))
        }

        const onPointerUp = () => {
            cleanupResize()

            if ((resizedHeight.value ?? 0) >= maxHeight - 1) {
                if (!wasExpanded) {
                    previousHeight.value = previousSize
                }
                isExpanded.value = true
            } else {
                previousHeight.value = null
            }
        }

        stopResizing = () => {
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
            window.removeEventListener('pointercancel', onPointerUp)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
        }

        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)
        window.addEventListener('pointercancel', onPointerUp)
    }

    const resetHeight = () => {
        isExpanded.value = false
        resizedHeight.value = null
        previousHeight.value = null
    }

    onScopeDispose(cleanupResize)

    return { isExpanded, contentProps, toggleExpanded, startResize, resetHeight }
}
