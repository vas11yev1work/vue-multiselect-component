<script>
import Vue from 'vue';
import VueMultiselectComponent from '../src/vue-multiselect-component.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueMultiselectComponent
  },
  data() {
    return {
      countries: [
        { id: 'ru', country: 'Russia' },
        { id: 'nl', country: 'Netherlands' },
        { id: 'fr', country: 'France' }
      ],
      selected: []
    }
  },
  methods: {
    test(text, v) {
      console.log(text, v)
    }
  }
});
</script>

<template>
  <div id="app">
    <vue-multiselect-component
      v-model="selected"
      searchable
      writable
      placeholder="Select countries"
      :options="countries"
      @open="test('open', 1)"
      @close="test('close', 2)"
      :label-text="'country'"
      placeholder-as-label
    />
  </div>
</template>

<style>
#app {
  max-width: 500px;
  padding: 30px;
}
</style>
