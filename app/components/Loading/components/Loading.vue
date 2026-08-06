<script setup lang="ts">
import useLoading from '../composables/useLoading';

const { open } = useLoading()

</script>

<template>
    <Transition name="fade">
        <div class="loading" v-if="open">
            <div class="loading-content">
                <UIcon name="i-lucide-loader-circle" class="size-10 spinner" />
                <span>Загрузка приложения...</span>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.loading {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: var(--ui-bg);
    z-index: 3;
}

.loading-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
}

.fade-leave-to {
    opacity: 0;
}

.spinner {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>