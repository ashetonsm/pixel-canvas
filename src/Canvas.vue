<script setup lang="ts">
import Pixel from './Pixel.vue';

defineProps<{
  size: number
}>()

</script>

<template>
    <template v-if="!size">
        <h1>Loading!</h1>
    </template>
    <template v-else-if="size < 1 ">
        <h1>Canvas is blank.</h1>
    </template>
    <template v-else>
        <Pixel class="pixel" v-for="pixel in size * size" :key="'pixel' + pixel"></Pixel>
    </template>
</template>