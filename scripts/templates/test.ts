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

  // 属性测试
  describe('props', () => {
    // 添加属性测试
  })

  // 插槽测试
  describe('slots', () => {
    it('default slot works', () => {
      const wrapper = mount(${name}, {
        slots: {
          default: 'content'
        }
      })
      expect(wrapper.text()).toBe('content')
    })
  })

  // 事件测试
  describe('events', () => {
    // 添加事件测试
  })

  // 样式测试
  describe('style', () => {
    // 添加样式测试
  })
})
`
