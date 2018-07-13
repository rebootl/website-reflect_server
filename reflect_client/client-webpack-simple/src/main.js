import Vue from 'vue'
import App from './App.vue'

export const global_state = {

    selection_data: []

}

new Vue({
  el: '#app',
  render: h => h(App)
})
