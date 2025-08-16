<script setup lang="ts">
import Canvas from './canvas.vue';


</script>


<template>
<div class="navbar">
  <button class="btn">Reset</button>
  <input type="color" class="color"></input>
  <input type="number" class="size"></input>
  </div>
<div class="container">
  <div class="grid">
    <Canvas :size="36" />
  </div>
  </div>
</template>