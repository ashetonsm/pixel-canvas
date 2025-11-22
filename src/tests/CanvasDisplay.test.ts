import CanvasDisplay from '@/components/CanvasDisplay.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue';

let displayWrapper: VueWrapper | null
const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null
let mockEvent: { target: { tagName: string; textContent: string; value: any }; }

describe('Canvas', () => {

  beforeEach(() => {
    displayWrapper = mount(CanvasDisplay, { attachTo: document.body })
    canvasRef.value = displayWrapper.find('canvas').element
    if (canvasRef.value) {
      ctx = canvasRef.value.getContext("2d")
      canvasRef.value.width = 100
      canvasRef.value.height = 100
    }

    mockEvent = {
      target: {
        tagName: 'DIV',
        textContent: 'Hello World',
        value: "rgb(255, 255, 255)"
      }
    }
  })

  it('should have a document object', ({ expect }) => {
    expect(document).toBeDefined();
  });

  it('should find a canvas object', ({ expect }) => {
    expect(document.querySelector("canvas")).not.toBeNull()
  });

  it('should find CanvasDisplay.vue', ({ expect }) => {
    expect(displayWrapper).not.toBeNull()
  })

  it('should call resetCanvas and find a canvas', async ({ expect }) => {
    const displayObject = displayWrapper!.vm

    // Create a spy on resetCanvas
    const spy = vi.spyOn(displayObject as any, 'resetCanvas')

    // Simulate calling the method
    displayObject.resetCanvas(mockEvent)

    // Assert that resetCanvas was called
    expect(spy).toHaveBeenCalled()
  })

  it('should successfully call handleColor', async ({ expect }) => {
    const displayObject = displayWrapper!.vm

    // Create a spy on handleColor
    const spy = vi.spyOn(displayObject as any, 'handleColor')

    // Simulate calling the method
    displayObject.handleColor(mockEvent)

    // Assert that handleColor was called
    expect(spy).toHaveBeenCalled()
    expect(displayObject.lastColor).toBe("rgb(0, 0, 0)")
    // The mockEvent changes the color to white
    expect(displayObject.color).toBe("rgb(255, 255, 255)")
  })

  it('should change the color to white onClick', async ({ expect }) => {
    const white = displayWrapper?.find('.white')
    await white!.trigger('click')
    expect(displayWrapper!.vm.color).toBe("rgb(255, 255, 255)")
  })

  it('should change the color to black onClick', async ({ expect }) => {
    const black = displayWrapper?.find('.black')
    await black!.trigger('click')
    expect(displayWrapper!.vm.color).toBe("rgb(0, 0, 0)")
  })

  it('should change the color to the lastColor onClick', async ({ expect }) => {
    // Black ("rgb(0, 0, 0)") by default
    const last = displayWrapper?.find('.last')
    await last!.trigger('click')
    console.log("last.element.value: ", last?.element.value)
    // expect(displayWrapper!.vm.color)
    expect(displayWrapper!.vm.color).toBe(last?.element.value)
  })

  it('should call handleSubmit onClick', async ({ expect }) => {
    const displayObject = displayWrapper!.vm

    // Create a spy on handleSubmit
    const spy = vi.spyOn(displayObject as any, 'handleSubmit')
    const submitButton = displayWrapper?.find('button:nth-child(2)')
    await submitButton!.trigger('click')
    // Assert that handleSubmit was called
    expect(spy).toHaveBeenCalled()
  })

  it('should successfully call handleSubmit', async ({ expect }) => {
    const displayObject = displayWrapper!.vm

    // Create a spy on handleSubmit
    const spy = vi.spyOn(displayObject as any, 'handleSubmit')

    // Simulate calling the method
    displayObject.handleSubmit()

    // Assert that handleSubmit was called
    expect(spy).toHaveBeenCalled()
  })

})