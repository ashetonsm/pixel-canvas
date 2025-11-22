import { beforeAll, describe, it } from 'vitest'
import { saveDrawing } from '@/tools/saveDrawing'
import { mount } from '@vue/test-utils'
import Canvas from '@/components/Canvas.vue'
import { ref } from 'vue'

let wrapper: any
const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null
let gallery: HTMLElement | null
describe('Canvas', () => {

  beforeAll(() => {
    gallery = document.createElement("div");

    wrapper = mount(Canvas, { props: { size: 24, color: "black" } })
    canvasRef.value = wrapper.find('canvas').wrapperElement
    if (canvasRef.value) {
      canvasRef.value.width = 100
      canvasRef.value.height = 100
      ctx = canvasRef.value.getContext("2d")
    }
  })

  it('should find saveDrawing.ts', ({ expect }) => {
    expect(saveDrawing("TestDrawing", canvasRef.value))
  })

  it('should return an HTMLCanvasElement', ({ expect }) => {
    console.log("canvasRef: ", canvasRef.value)
    expect(canvasRef.value).not.toBeNull()
  })

  it('should return HTMLCanvasElement context', async ({ expect }) => {
    expect(ctx).not.toBeNull()
  })

  it('should return gallery HTMLElement', async ({ expect }) => {
    console.log("gallery: ", gallery)
    expect(gallery).not.toBeNull()
  })

  describe('canvas.toBlob()', function () {
    it('should return a img/png blob', async ({ expect }) => {
      if (canvasRef.value && ctx) {
        console.log("canvas w/h: ", canvasRef.value.width, canvasRef.value.height)
        ctx.fillStyle = "rgb(0, 0, 255)"
        ctx.fillRect(0, 0, 100, 100)

        // ERROR: "the surface type is not appropriate for the operation"
        expect(canvasRef.value.toBlob(async (blob) => {
          if (blob) {
            console.log("Canvas ref was not null")
            console.log("gallery: ", gallery)
            expect(blob).to.be.an.instanceOf(Blob);
            expect(blob.type).to.equal('image/png');
          }
        }, 'image/png')).not.toBeNull()
      } else {
        console.log("Canvas ref was null")

        expect(canvasRef.value).toBeNull()

      }
    })

  })

})