import { beforeAll, describe, it, test, vi } from 'vitest'
import { saveDrawing } from '@/tools/saveDrawing'
import { mount } from '@vue/test-utils'
import Canvas from '@/components/Canvas.vue'

let wrapper: any
let createMockBlob: (type?: string) => Blob

describe('Canvas', () => {

  beforeAll(() => {
    wrapper = mount(Canvas, { props: { size: 24, color: "black" } })

    createMockBlob = (type = 'image/png') => {
      // A simple representation of an image blob for testing
      const binaryData = new Uint8Array([8, 16, 24, 32]);
      return new Blob([binaryData], { type });
    };
  })

  it('saveDrawing.ts exists', ({ expect }) => {
    expect(saveDrawing("TestDrawing"))
  })

  it('Canvas exists', ({ expect }) => {
    let canvas = wrapper.find('canvas')
    console.log("canvas: ", canvas)
    expect(canvas).not.toBeNull()
  })

  it('Canvas to blob', async ({ expect }) => {
    let canvas = wrapper.find('canvas').wrapperElement
    console.log("canvas: ", canvas)

    let blob: any
    await canvas.toBlob(async (b: any) => {
      blob = b
      console.log("blob: ", blob)
    }, 'image/png')
  })


  test('async callback', async () => {

    // This is the mock function
    const myMockFn = vi.fn(() => 'original')

    await myMockFn.withImplementation(
      () => 'temp',
      async () => {
        myMockFn()  // 'temp'
      },
    )

    myMockFn()
  })
})
