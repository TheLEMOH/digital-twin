export default defineAppConfig({
    ui: {
        colors: {
            primary: 'blue'
        },
        card: {
            slots: {
                root: 'flex flex-col',

            },
        },
        accordion: {
            slots: {
                root: 'w-full space-y-4',
                item: 'bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden',
                header: 'flex',
                trigger: 'group flex-1 flex items-center gap-1.5 font-medium py-3.5 px-4 w-full outline-primary/25 focus-visible:outline-3 min-w-0 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors cursor-pointer',
                content: 'data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=closed]:overflow-hidden focus:outline-none',
                body: 'text-md pb-4 px-4',
                leadingIcon: 'shrink-0 size-5',
                trailingIcon: 'ms-0',
                label: 'text-start break-words w-full'
            },
            variants: {
                disabled: {
                    true: {
                        trigger: 'cursor-not-allowed opacity-75'
                    }
                }
            }
        }
    }
})