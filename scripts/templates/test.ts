export const generateTestContent = (name: string): string => `
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ${name} from '../src/${name}.vue'

describe('${name}.vue', () => {
  // 基础渲染测试
  it('renders correctly', () => {
    const wrapper = mount(${name})
    expect(wrapper.classes()).toContain('jy-${name.toLowerCase()}')
  })
})
`
