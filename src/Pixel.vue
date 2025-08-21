<script setup lang="ts">
import { onMounted } from 'vue';

import { ref } from 'vue'

const pixelRef = ref<HTMLDivElement | null>(null)
let draw = false

// Previews in gray where you'll place a pixel on mouseover.
// Places a black pixel on click.
onMounted(() => {
    window.addEventListener("mousedown", function() {
        draw = true
    })
    window.addEventListener("mouseup", function() {
        draw = false
    })

    if (pixelRef.value) {
        pixelRef.value.addEventListener('click', function() {
            let initialColor = pixelRef.value!.style.backgroundColor
            if (initialColor == 'black') {
                pixelRef.value!.style.removeProperty("background-color")
            } else {
                pixelRef.value!.style.backgroundColor = 'black'
            }
        })
        pixelRef.value.addEventListener('mouseover', function() {
            let initialColor = pixelRef.value!.style.backgroundColor

            if (draw) {
                pixelRef.value!.style.backgroundColor = 'black'
            } else {
                if (initialColor == "") {
                    pixelRef.value!.style.backgroundColor = 'gray'
                }
            }
        })
        pixelRef.value.addEventListener('mouseout', function() {
            let initialColor = pixelRef.value!.style.backgroundColor

            if (!draw && initialColor == "gray") {
                pixelRef.value!.style.removeProperty("background-color")
            }
        })
    }
})
</script>

<template>
    <div ref="pixelRef"></div>
</template>