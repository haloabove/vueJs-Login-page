import { mount } from '@vue/test-utils'
import Reset from '@/components/views/Reset.vue'

describe('Reset.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Reset)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('sets the correct default data', () => {
    expect(typeof Reset.data).toBe('function')
    const defaultData = Reset.data()
    expect(defaultData.newPassword).toBe('')
    expect(defaultData.confirmPassword).toBe('')
    expect(defaultData.resetPassView).toBeFalsy()
    expect(defaultData.errors.length).toBe(0)
    expect(defaultData.success.length).toBe(0)
  })

  it('newPassword and confirmPassword must match', async () => {
    const wrapper = mount(Reset)

    wrapper.find('#newPassword').setValue('1')
    wrapper.find('#confirmPassword').setValue('2')
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.errors li').text()).toBe('Password and confirm password do not match')
  })
})
