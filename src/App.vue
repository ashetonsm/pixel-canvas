<script setup lang="ts">
import Canvas from './Canvas.vue';

function resetPixels() {
  const pixels = document.getElementsByClassName("pixel")
  for (let i = 0; i < pixels.length; i++) {
    (pixels[i] as HTMLElement).style.removeProperty("background-color")
  }
}
</script>

<template>
<div class="navbar">
  <button @click="resetPixels">Reset</button>
  <input type="color" class="color"></input>
  </div>
<div class="container">
    <Canvas :size="16"></Canvas>
  </div>
</template>