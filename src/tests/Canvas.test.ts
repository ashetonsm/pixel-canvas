import { mount, VueWrapper } from '@vue/test-utils'
import { beforeAll, describe, it, vi } from 'vitest'
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

  it('should return click.value, touch.value false via mouseUp', async ({ expect }) => {
    const wvm = wrapper?.vm as any
    wvm.mouseUp()
    expect(wvm.click).false
    expect(wvm.touch).false
  })

  it('should return touch.value true via mouseUp with touch event', async ({ expect }) => {
    // Mock the touch event data
    const touchEventOptions = {
      touches: [{ clientX: 10, clientY: 10, pageX: 0, pageY: 0 }],
      changedTouches: [{ clientX: 10, clientY: 10 }],
    };

    const wvm = wrapper?.vm as any
    wvm.mouseDown(touchEventOptions)
    expect(wvm.click).true
  })

  it('should successfully call contextLoader', async ({ expect }) => {
    const canvasObject = wrapper!.vm as any

    // Create a spy on contextLoader
    const spy = vi.spyOn(canvasObject as any, 'contextLoader')

    // Simulate calling the method
    canvasObject.contextLoader(Event)

    // Assert that contextLoader was called
    expect(spy).toHaveBeenCalled()
  })

  it('should successfully call touchContextLoader', async ({ expect }) => {
    const canvasObject = wrapper!.vm as any

    // Mock the touch event data
    const touchEventOptions = {
      touches: [{ clientX: 10, clientY: 10, pageX: 0, pageY: 0 }],
      changedTouches: [{ clientX: 10, clientY: 10 }],
    };

    // Create a spy on contextLoader
    const spy = vi.spyOn(canvasObject as any, 'touchContextLoader')

    // Simulate calling the method
    canvasObject.touchContextLoader(touchEventOptions)

    // Assert that touchContextLoader was called
    expect(spy).toHaveBeenCalled()

    // Assert that touch.value was changed to true
    expect(canvasObject.touch).true

  })

  it('should successfully call draw', async ({ expect }) => {
    const canvasObject = wrapper!.vm as any

    // Mock the touch event data
    const touchEventOptions = {
      touches: [{ clientX: 10, clientY: 10, pageX: 0, pageY: 0 }],
      changedTouches: [{ clientX: 10, clientY: 10 }],
    };    
    // Create a spy on draw
    const spy = vi.spyOn(canvasObject as any, 'draw')

    // Simulate calling the method
    canvasObject.draw(ctx, touchEventOptions)

    // Assert that draw was called
    expect(spy).toHaveBeenCalled()
  })
})