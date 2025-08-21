<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  size: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasBoundingRect = ref<any | null>(null)

const draw = (ctx: CanvasRenderingContext2D, e: any) => {
    ctx.fillStyle = '#000000'
    console.log(ctx)
    console.log(e)
    const x = (e.pageX - canvasRef.value!.offsetLeft)
    const y = (e.pageY - canvasRef.value!.offsetTop)
    console.log(
        'x: ' + x + '\n' + 
        'e.pageX: ' + e.pageX + '\n' + 
        'canvasRef.value!.offsetLeft: ' + canvasRef.value!.offsetLeft + '\n' +
        'canvasRef.value!.width: ' + canvasRef.value!.width + '\n' +
        'canvasRef.value!.offsetWidth: ' + canvasRef.value!.offsetWidth + '\n'
    )
    console.log(
        'y: ' + y + '\n' + 
        'e.pageY: ' + e.pageY + '\n' + 
        'canvasRef.value!.offsetTop: ' + canvasRef.value!.offsetTop + '\n' + 
        'canvasRef.value!.height: ' + canvasRef.value!.height + '\n' +
        'canvasRef.value!.offsetHeight: ' + canvasRef.value!.offsetHeight + '\n' 
    )


    
    ctx.fillRect(x, y, 10, 10)
}

function fillPixel(e: any) {
    const context = canvasRef.value!.getContext('2d')
    draw(context!, e)
}

onMounted(() => {
    canvasRef.value!.width = canvasRef.value!.offsetWidth
    canvasRef.value!.height = canvasRef.value!.offsetWidth
    const context = canvasRef.value!.getContext('2d')
    canvasBoundingRect.value = canvasRef!.value?.getBoundingClientRect()

})

</script>

<template>
    <canvas @click="fillPixel" ref="canvasRef"></canvas>
</template>