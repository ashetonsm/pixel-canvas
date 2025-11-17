import { saveDrawing } from '@/tools/saveDrawing'
import { expectTypeOf, it, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'

it('saveDrawing.ts exists', ({ expect }) => {
  Object.defineProperty(document.body, 'classList', {
    value: {
      remove: vi.fn()
    },
    writable: true
  })

  const wrapper = mount(saveDrawing)
  
  
  expect(saveDrawing("TestArt"))
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