<template>
  <div id="add-subtag-box" class="overlay-box">
    <h2>Add Subtag</h2>
    <small>Topic id: {{ selected_topics }}</small>
    <p><em class="flash" v-if="flash">{{ flash_msg }}</em></p>
    <input type="text"
           placeholder="Label"
           v-model="subtag.label"><br>
    <input type="text"
           placeholder="Description"
           v-model="subtag.description"><br>
    <button id="add-subtag-submit" class="overlay-submit"
            @click="submit">Store</button>
    <button id="add-subtag-cancel" @click="cancel">Cancel</button>
  </div>
</template>

<script>
const subtags_url = "http://hplaptop:5010/api/subtags"
import { global_state } from './main.js';
import auth from "./auth.js";
export default {
  name: 'add-subtag',
  created: function() {
    // -> maybe use a filter here ?
    for (let topic of global_state.selection_data) {
      if (topic.active) {
        this.selected_topics.push(topic.id);
        break;
      }
    }
  },
  methods: {
    submit() {
      if (this.subtag.label === '') {
        this.flash_msg = "Label cannot be empty.";
        this.flash = true;
        return
      }
      let vm = this;
      axios.post(subtags_url, {
        label: this.subtag.label,
        description: this.subtag.description,
        topic_id: this.selected_topics[0]
      },
      {
        headers: auth.get_auth_header()
      }
      ).then(function (response) {
        console.log(response);
        // -> output success
        vm.flash_msg = "Success! :)";
        vm.flash = true;
        vm.$emit('refresh_menu');
        vm.cancel();
      }).catch(function (error) {
        console.log(error);
        if (error.response) {
          vm.flash_msg = error.response.data.msg;
          vm.flash = true;
        }
        else {
          vm.flash_msg = "An unknown error occured... :(";
          vm.flash = true;
        }
      });
    },
    cancel() {
      // (reset form here)
      this.global_state.overlay.shown = false;
      this.global_state.overlay.add_subtag = false;
    }
  },
  data() {
    return {
      global_state: global_state,
      selected_topics: [],
      subtag: {
        label: '',
        description: ''
      },
      flash: false,
      flash_msg: ''
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
</style>
