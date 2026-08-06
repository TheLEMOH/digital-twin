<script setup lang="ts">

const router = useRouter()

const goList = () => {
    router.push('/list')
}

</script>

<template>
    <div class="back-button">
        <UButton icon="i-lucide-arrow-left" label="Назад" @click="goList()"></UButton>
    </div>
</template>

<style>
.back-button {
    position: absolute;
    z-index: 1;
    margin: 0.5rem;
}
</style>