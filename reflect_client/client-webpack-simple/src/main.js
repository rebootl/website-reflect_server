import Vue from 'vue'
import App from './App.vue'

export const global_state = {

    selection_data: [],
    user: {
      logged_in: false,
      name: ''
    }

}

new Vue({
  el: '#app',
  render: h => h(App)
})
