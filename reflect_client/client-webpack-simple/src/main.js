import Vue from 'vue'
import App from './App.vue'

export const global_state = {

    selection_data: [],
    user: {
      logged_in: false,
      name: ''
    },
    overlay: {
      shown: false,
      login: false,
      add_topic: false,
    },
    edit_topic_item: {}

}

new Vue({
  el: '#app',
  render: h => h(App)
})
