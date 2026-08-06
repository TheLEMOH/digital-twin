<script setup lang="ts">

const items = [
    { title: "Карта", to: '/' },
    { title: 'Моделирование', to: 'https://gis.krasn.ru/agro/demo/' }
]

</script>

<template>
    <nav class="menu">
        <ul class="text-xl">
            <li v-for="item in items">
                <NuxtLink :to="item.to">{{ item.title }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
li {
    display: inline-block;
    padding-right: 2rem;
}

.menu {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    justify-content: center;
    padding: 0.5rem;
}
</style>