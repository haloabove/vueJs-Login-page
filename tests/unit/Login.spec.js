import { mount } from '@vue/test-utils'
import Login from '@/components/views/Login.vue'

describe('Login.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Login)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has a created hook', () => {
    expect(typeof Login.created).toBe('function')
  })

  it('has a beforeDestroy hook', () => {
    expect(typeof Login.beforeDestroy).toBe('function')
  })

  it('sets the correct default data', () => {
    expect(typeof Login.data).toBe('function')
    const defaultData = Login.data()
    expect(defaultData.email).toBe('')
    expect(defaultData.password).toBe('')
    expect(defaultData.resetPassView).toBeTruthy()
    expect(defaultData.errors.length).toBe(0)
    expect(defaultData.success.length).toBe(0)
    expect(defaultData.response).toBeNull()
  })

  it('requires email', async () => {
    const wrapper = mount(Login)

    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.errors li').text()).toBe('Email field is required')
  })

  it('requires password', async () => {
    const wrapper = mount(Login)

    wrapper.find('#email').setValue('test@example.com')
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.errors li').text()).toBe('Password field is required')
  })

  it('requires valid email', async () => {
    const wrapper = mount(Login)

    wrapper.find('#email').setValue('example.com')
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.errors li').text()).toBe('Please enter valid email!')
  })
})
