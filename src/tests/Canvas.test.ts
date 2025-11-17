import { mount } from '@vue/test-utils'
import { beforeAll, describe, it } from 'vitest'
import Canvas from '@/components/Canvas.vue'

let wrapper: any

describe('Canvas', () => {
  beforeAll(() => {
    wrapper = mount(Canvas, { props: { size: 24, color: "black" } })
  })

  it('Canvas exists', ({ expect }) => {
    expect(wrapper.exists()).toBe(true)
  })

})