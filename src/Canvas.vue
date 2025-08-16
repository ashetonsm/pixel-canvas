<script setup lang="ts">

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
        <div class="pixel" v-for="pixel in size" :key="'pixel' + pixel"></div>
    </template>
</template>