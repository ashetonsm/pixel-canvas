import CanvasDisplay from '@/components/CanvasDisplay.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeAll, describe, it, vi } from 'vitest'
import { ref } from 'vue';

let displayWrapper: VueWrapper | null
const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null

describe('Canvas', () => {

  beforeAll(() => {
    displayWrapper = mount(CanvasDisplay)
    canvasRef.value = displayWrapper.find('canvas').element
    if (canvasRef.value) {
      ctx = canvasRef.value.getContext("2d")
      canvasRef.value.width = 100
      canvasRef.value.height = 100
    }
  })

  it('should find CanvasDisplay.vue', ({ expect }) => {
    expect(displayWrapper).not.toBeNull()
  })

  it('should successfully call resetCanvas', async ({ expect }) => {
    console.log('canvasRef.value: ', canvasRef.value)
    const displayObject = displayWrapper!.vm

    // Create a spy on resetCanvas
    const spy = vi.spyOn(displayObject as any, 'resetCanvas')

    // Simulate calling the method
    displayObject.resetCanvas(Event)

    // Assert that resetCanvas was called
    expect(spy).toHaveBeenCalled()
  })

  it('should successfully call handleColor', async ({ expect }) => {
    const displayObject = displayWrapper!.vm

    // Create a spy on handleColor
    const spy = vi.spyOn(displayObject as any, 'handleColor')

    const e = new Event('click')
    const et = new EventTarget()

    // Simulate calling the method
    displayObject.handleColor(et)

    // Assert that handleColor was called
    expect(spy).toHaveBeenCalled()
    expect(displayObject.lastColor).toBe("rgb(0, 0, 0)")
    expect(displayObject.color).toBe("rgb(0, 0, 0)")
  })

  it('should successfully call handleSubmit', async ({ expect }) => {
    const displayObject = displayWrapper!.vm

    // Create a spy on pixelPreview
    const spy = vi.spyOn(displayObject as any, 'handleSubmit')

    // Simulate calling the method
    displayObject.handleSubmit()

    // Assert that previewPixel was called
    expect(spy).toHaveBeenCalled()
  })

})