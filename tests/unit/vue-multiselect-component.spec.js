import { shallowMount } from '@vue/test-utils'
import VueMultiselectComponent from '../../src/vue-multiselect-component'

const mockOptions = [{ id: 'ru', label: 'Russia' }, { id: 'fr', label: 'France' }]

describe('vue-multiselect-component.vue', () => {
  describe(':value', () => {
    test('must be an array', () => {
      const wrapper = shallowMount(VueMultiselectComponent, {
        propsData: {
          value: [],
          options: mockOptions
        }
      })
      expect(wrapper.vm.value).toEqual([])
    })
  })
  describe('events emitting', () => {
    describe('@input', () => {
      test('should be called whenever a value changes, passing the new value', () => {
        const wrapper = shallowMount(VueMultiselectComponent, {
          propsData: {
            value: ['ru'],
            options: mockOptions
          }
        })
        wrapper.vm.selectItem(wrapper.vm.options[1].id)
        expect(wrapper.emitted().input).toEqual([[['ru', 'fr']]])
        expect(wrapper.emitted().input.length).toBe(1)
      })
      test('should do nothing when the item is not in the option list', () => {
        const wrapper = shallowMount(VueMultiselectComponent, {
          propsData: {
            value: ['ru'],
            options: mockOptions
          }
        })
        wrapper.vm.select('non-existing item')
        expect(wrapper.emitted().input).toEqual(undefined)
        expect(wrapper.emitted().selected).toEqual(undefined)
        expect(wrapper.emitted().removed).toEqual(undefined)
      })
    })
    describe('@removed', () => {
      test('should be called whenever an element is removed ', () => {
        const wrapper = shallowMount(VueMultiselectComponent, {
          propsData: {
            value: ['ru', 'fr'],
            options: mockOptions
          }
        })
        wrapper.vm.select('ru')
        expect(wrapper.emitted().removed).toEqual([['ru']])
        expect(wrapper.emitted().removed.length).toBe(1)
        expect(wrapper.emitted().selected).toEqual(undefined)
        expect(wrapper.emitted().input).toEqual([[['fr']]])
        expect(wrapper.emitted().input.length).toBe(1)
      })
    })
    describe('@selected', () => {
      test('should be called whenever an element is selected', () => {
        const wrapper = shallowMount(VueMultiselectComponent, {
          propsData: {
            value: ['ru'],
            options: mockOptions
          }
        })
        wrapper.vm.select('fr')
        expect(wrapper.emitted().selected).toEqual([['fr']])
        expect(wrapper.emitted().selected.length).toBe(1)
        expect(wrapper.emitted().removed).toBe(undefined)
        expect(wrapper.emitted().input).toEqual([[['ru', 'fr']]])
        expect(wrapper.emitted().input.length).toBe(1)
      })
    })
    describe('@search-change', () => {
      test('should be called whenever the search field has changed', () => {
        const wrapper = shallowMount(VueMultiselectComponent, {
          propsData: {
            value: ['ru', 'fr'],
            options: mockOptions
          }
        })
        wrapper.vm.searchChange('test')
        expect(wrapper.emitted()['search-change']).toEqual([['test']])
        expect(wrapper.emitted()['search-change'].length).toBe(1)
      })
    })
  })
})
