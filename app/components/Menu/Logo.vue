<script setup lang="ts">
import Links from './Links.vue';
</script>

<template>
    <div class="logo bg-gray-100 dark:bg-gray-800 shadow-md">
        <div class="logo-body">
            <div class="logo-content">
                <div class="logo-part-one">
                    <img width="80px" src="/logo.png">
                    <div class="flex flex-col font-medium dark:text-white">
                        <span class="text-3xl">Сценариум</span>
                        <span class="text-2xl">данные и модели</span>
                    </div>
                </div>
                <!--   <div class="logo-part-two">
                Вычислительное моделирование состояния
                приземного слоя атмосферы г. Красноярска
            </div> -->
                <Links></Links>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo {
    padding: 1rem;
}

.logo-body {
    display: flex;
    justify-content: center;
}

.logo-content {
    width: 1200px;
    padding-left: 1rem;
    display: flex;
}

span {
    line-height: 1;
}

.logo-part-one {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.logo-part-two {
    text-align: justify;
}
</style>