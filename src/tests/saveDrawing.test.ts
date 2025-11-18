import { beforeAll, beforeEach, describe, it, test, vi } from 'vitest'
import { saveDrawing } from '@/tools/saveDrawing'
import { mount } from '@vue/test-utils'
import Canvas from '@/components/Canvas.vue'
import { ref } from 'vue'

let wrapper: any
let createMockBlob: (type?: string) => Blob
const canvasRef = ref<HTMLCanvasElement | null>(null);

describe('Canvas', () => {

  beforeAll(() => {
    wrapper = mount(Canvas, { props: { size: 24, color: "black" } })
    canvasRef.value = wrapper.find('canvas').wrapperElement
  })

  it('expects saveDrawing.ts to exist', ({ expect }) => {
    expect(saveDrawing("TestDrawing"))
  })

  it('expects HTMLCanvasElement to exist', ({ expect }) => {
    console.log("canvasRef: ", canvasRef.value)
    expect(canvasRef.value).not.toBeNull()
  })

  it('expects HTMLCanvasElement context to exist', async ({ expect }) => {
    const ctx = canvasRef?.value?.getContext("2d")
    console.log("ctx: ", ctx)
    expect(ctx).not.toBeNull()
  })

  it('expects a blob to be formed from the context', async ({ expect }) => {
    const ctx = canvasRef?.value?.getContext("2d")
    ctx!.fillStyle = "rgb(0, 0, 255)"
    ctx!.fillRect(0, 0, 100, 100)

    // ERROR: "the surface type is not appropriate for the operation"
    canvasRef?.value?.toBlob(async (b) => {
      console.log("blob: ", b)
    }, 'image/png')
  })

})
