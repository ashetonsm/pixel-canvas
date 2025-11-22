import { mount, VueWrapper } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import Canvas from '@/components/Canvas.vue'
import { ref } from 'vue';

let wrapper: VueWrapper | null
const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null


describe('Canvas', () => {
  beforeAll(() => {
    wrapper = mount(Canvas, { props: { size: 24, color: "black" } })
    canvasRef.value = wrapper.find('canvas').element
    if (canvasRef.value) {
      ctx = canvasRef.value.getContext("2d")
      canvasRef.value.width = 100
      canvasRef.value.height = 100
    }
  })

  it('should return the canvas value', ({ expect }) => {
    expect(canvasRef.value).not.toBeNull()
    console.log("canvasRef.value: ", canvasRef.value)
  })

  it('should return the canvas context', ({ expect }) => {
    expect(ctx).not.toBeNull()
    console.log("ctx: ", ctx)
  })

  it('should show the prop color is black', ({ expect }) => {
    expect(wrapper?.props()).contains({ color: "black" })
    console.log(wrapper?.props())
  })

  it('should return click.value true via mouseDown', async ({ expect }) => {
    wrapper?.vm.mouseDown()
    expect(wrapper?.vm.click).true
  })

  it('should return click.value false via mouseUp', async ({ expect }) => {
    wrapper?.vm.mouseUp()
    expect(wrapper!.vm.click).false
  })

  it('should successfully call previewPixel', async ({ expect }) => {
    const canvasObject = wrapper!.vm

    // Create a spy on pixelPreview
    const spy = vi.spyOn(canvasObject as any, 'previewPixel')

    // Simulate calling the method
    canvasObject.previewPixel(Event)

    // Assert that previewPixel was called
    expect(spy).toHaveBeenCalled()
  })

  it('should successfully call draw', async ({ expect }) => {
    const canvasObject = wrapper!.vm

    // Create a spy on draw
    const spy = vi.spyOn(canvasObject as any, 'draw')

    // Simulate calling the method
    canvasObject.draw(ctx, Event)

    // Assert that draw was called
    expect(spy).toHaveBeenCalled()
  })
})