<script setup lang="ts">
import { ref } from 'vue';
import Canvas from './Canvas.vue';

const color = ref<string>('#000000')
let imgURL = "https://google.com"
let thingType = "pet"
let thingName
let createdBy = ""

function resetCanvas() {
  try {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const context = canvas.getContext('2d')
      context!.clearRect(0, 0, canvas.width, canvas.height)
    } else {
      console.log("Canvas not found!")
    }
  } catch (error : any) {
    console.log(error)
  }}

function handleColor(e: Event) {
  if (e.target) {
    color.value = (e.target as HTMLInputElement).value.toString()
    console.log(color.value)
  }
}

function handleSubmit() {
  try {
    thingName = prompt(`Name your ${thingType}:`)

    if (thingName) {
      const canvas = document.querySelector('canvas')
      if (canvas) {
        const date = new Date().toUTCString().replace(',', '').replace(/ /g,"-")
        const image = canvas.toDataURL('image/png')
        const fimg = document.querySelector('#finishedImg')
        fimg!.href = image;
        fimg!.download = `${thingType}-${thingName}-${date}`; // Or any desired filename
        console.log(image)
      } else {
        console.log("Canvas not found!")
      }
    } else {
      alert(`You must name your ${thingType}! Please try again.`)
    }
  } catch (error : any) {
    console.log(error)
  }
}

</script>

<template>
  <div class="navbar">
    <div>
      <button @click="resetCanvas">Reset</button>
      <button @click="handleSubmit">Finish</button>
    </div>
    <div>
      <a href="finishedImg" id="finishedImg" download>My Finished Image</a>
    </div>
    <div>
      <h3>Colors:</h3>
      <button class="black color" value="#000000" @click="handleColor($event)"></button>
      <button class="white color" value="#FFFFFF" @click="handleColor($event)"></button>
    </div>
  </div>
  <div class="container">
    <Canvas :size="24" :color="color"></Canvas>
  </div>
</template>