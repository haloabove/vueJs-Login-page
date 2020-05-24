import { mount } from '@vue/test-utils'
import Home from '@/components/pages/Home.vue'

describe('Home.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Home)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has a created hook', () => {
    expect(typeof Home.created).toBe('function')
  })

  it('has a beforeDestroy hook', () => {
    expect(typeof Home.beforeDestroy).toBe('function')
  })

  it('sets the correct default data', () => {
    expect(typeof Home.data).toBe('function')
    const defaultData = Home.data()
    expect(defaultData.newEmail).toBe('')
    expect(defaultData.logInView).toBeFalsy()
  })

  it('displays login view', async () => {
    const wrapper = mount(Home)
    expect(wrapper.find('#signin').exists()).toBeTruthy()
  })

  it('displays reset view', async () => {
    const wrapper = mount(Home)
    wrapper.vm.setResetView(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#reset').exists()).toBeTruthy()
  })
})
