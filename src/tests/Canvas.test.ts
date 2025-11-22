import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import Canvas from '@/components/Canvas.vue'
import { ref } from 'vue';

let wrapper: any
const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null


describe('Canvas', () => {
  beforeAll(() => {
    wrapper = mount(Canvas, { props: { size: 24, color: "black" } })
    canvasRef.value = wrapper.find('canvas').wrapperElement
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
    expect(wrapper.props("color")).toBe("black")
    console.log(wrapper.props("color"))
  })


  describe('Canvas methods', async () => {

    it('should return click.value true on click'), async () => {
      // set click value to false
      wrapper.vm.click.value = false
      console.log("wrapper.vm.click.value: ", wrapper.vm.click.value)
      // Trigger a mousedown event
      const t = await wrapper.trigger('mousedown')
        .then(() => {
          console.log("complete")
        })
      
      expect(wrapper.vm.click.value).toBe(true)
      console.log("wrapper.vm.click.value: ", wrapper.vm.click.value)
    }
  })


})