<script setup lang="ts">
import { ref } from 'vue';
import Canvas from './Canvas.vue';

const color = ref<string>('#000000')

function resetCanvas() {
  console.log("Reset canvas")
}

function handleColor(e: Event) {
  if (e.target) {
    // console.log((e.target as HTMLInputElement).value)
    color.value = (e.target as HTMLInputElement).value.toString()
    console.log(color.value)
  }
}

</script>

<template>
<div class="navbar">
  <button @click="resetCanvas">Reset</button>
  <input type="color" class="color" v-on:change="handleColor($event)"></input>
  </div>
<div class="container">
    <Canvas :size="24" :color="color"></Canvas>
  </div>
</template>