<script setup lang="ts">
import { ref } from "vue";
import Canvas from "@/components/Canvas.vue";
import { saveDrawing } from "../tools/saveDrawing";

const color = ref<string>("rgb(0, 0, 0)");
let drawingName: string | null;
var lastColor = ref<string>("rgb(0, 0, 0)");

function resetCanvas() {
  try {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const context = canvas.getContext("2d");
      context!.fillStyle = "rgb(255, 255, 255)";
      context!.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      console.log("Canvas not found!");
    }
  } catch (error: any) {
    console.log(error);
  }
}

function handleColor(e: Event) {
  if (e.target) {
    lastColor.value = color.value;
    color.value = (e.target as HTMLInputElement).value.toString();
  }
}

async function handleSubmit() {
  drawingName = prompt(`Name your drawing:`);
  if (drawingName) {
    saveDrawing(drawingName, document.querySelector("canvas"));
  } else {
    alert(`You must name your drawing! Please try again.`);
  }
}
</script>

<template>
  <div class="navbar">
    <div>
      <button @click="resetCanvas">Reset</button>
      <button @click="handleSubmit()">Finish</button>
    </div>
    <div class="container-block">
      <div class="row">
        <h3>Colors:</h3>
      </div>
      <div class="row">
        <div class="column">
          <button
            class="black color"
            value="rgb(0, 0, 0)"
            @click="handleColor($event)"
            style="background-color: rgb(0, 0, 0)"
          ></button>
          Black
        </div>
        <div class="column">
          <button
            class="white color"
            value="rgb(255, 255, 255)"
            @click="handleColor($event)"
            style="background-color: rgb(255, 255, 255)"
          ></button>
          White
        </div>
        <div class="column">
          <button
            id="lastColor"
            class="last color"
            :value="`${lastColor}`"
            @click="handleColor($event)"
            :style="`background-color: ${lastColor}`"
          ></button>
          Last
        </div>
      </div>
      <div class="container-flex" id="gallery"></div>
    </div>
  </div>

  <div class="container-flex">
    <Canvas :size="24" :color="color"></Canvas>
  </div>
</template>
