<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  size: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasBoundingRect = ref<any | null>(null)

const draw = (ctx: CanvasRenderingContext2D, e: any) => {
    if (canvasRef.value) {
        var pixelSize = (canvasRef.value.width / props.size)
        ctx.fillStyle = '#000000'

        const x = (e.pageX - canvasRef.value.offsetLeft)
        const y = (e.pageY - canvasRef.value.offsetTop)
        ctx.fillRect(
            Math.floor(x / pixelSize) * pixelSize, 
            Math.floor(y / pixelSize) * pixelSize, 
            pixelSize, 
            pixelSize)
    }
}

function fillPixel(e: any) {
    const context = canvasRef.value!.getContext('2d')
    draw(context!, e)
}

function adjustCanvasSize() {
    console.log('adjustCanvasSize')
    if (canvasRef.value) {
        // Make the width and height equal so it's a square
        canvasRef.value!.width = canvasRef.value!.offsetWidth
        canvasRef.value!.height = canvasRef.value!.offsetWidth
    }
}

onMounted(() => {
    // Adjust the canvas size when the window is resized so the pixels aren't placed incorrectly
    window.addEventListener("resize", adjustCanvasSize)

    if (canvasRef.value) {
        // Make the width and height equal so it's a square
        canvasRef.value.width = canvasRef.value.offsetWidth
        canvasRef.value.height = canvasRef.value.offsetWidth
        canvasBoundingRect.value = canvasRef.value.getBoundingClientRect()
    }
})

</script>

<template>
    <canvas @click="fillPixel" ref="canvasRef"></canvas>
</template>