<script setup lang="ts">

const items = [
    { title: "Обзор", to: '/' },
    { title: "Геопространственные данные", to: '/geo' },
    { title: "Метеоусловия" },
    { title: "Загрязнения атмосферы" },
    { title: "Статистический анализ" }
]

</script>

<template>
    <nav class="menu">
        <ul>
            <li v-for="item in items">
                <NuxtLink :to="item.to">{{ item.title }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
ul {
    display: flex;
    justify-content: space-around;
}

li {
    display: inline-block;
    padding-right: 1rem;
}

.menu {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 0.5rem;
}
</style>