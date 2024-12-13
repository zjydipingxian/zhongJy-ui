import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Icon from '../src/icon.vue'

describe('Icon.vue', () => {
  // 属性测试
  describe('props', () => {
    it('size prop works with string value', () => {
      const wrapper = mount(Icon, {
        props: { size: '20px' },
      })
      expect(wrapper.element.style.fontSize).toBe('20px')
    })

    it('size prop works with number value', () => {
      const wrapper = mount(Icon, {
        props: { size: 20 },
      })
      expect(wrapper.element.style.fontSize).toBe('20px')
    })

    it('color prop works', () => {
      const wrapper = mount(Icon, {
        props: { color: 'red' },
      })
      expect(wrapper.element.style.getPropertyValue('--color')).toBe('red')
    })
  })

  // 插槽测试
  describe('slots', () => {
    it('default slot works', () => {
      const wrapper = mount(Icon, {
        slots: {
          default: 'icon content',
        },
      })
      expect(wrapper.text()).toBe('icon content')
    })

    it('renders empty content when no slot provided', () => {
      const wrapper = mount(Icon)
      expect(wrapper.text()).toBe('')
    })
  })

  // 样式测试
  describe('style', () => {
    it('combines size and color styles', () => {
      const wrapper = mount(Icon, {
        props: {
          size: '24px',
          color: 'blue',
        },
      })
      expect(wrapper.element.style.fontSize).toBe('24px')
      expect(wrapper.element.style.getPropertyValue('--color')).toBe('blue')
    })

    it('has no style when no props provided', () => {
      const wrapper = mount(Icon)
      expect(wrapper.element.style.fontSize).toBe('')
      expect(wrapper.element.style.getPropertyValue('--color')).toBe('')
    })
  })
})
