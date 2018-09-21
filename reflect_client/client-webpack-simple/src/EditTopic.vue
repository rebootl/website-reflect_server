<template>
  <div id="edit-topic-box" class="overlay-box">
    <h2>Edit Topic</h2>
    <h3>id: {{ global_state.edit_topic_item.id }}</h3>
    <p><em class="flash" v-if="flash">{{ flash_msg }}</em></p>
    Label: <input type="text"
           v-model="topic.label"><br>
    Description: <input type="text"
           v-model="topic.description"><br>
    <button id="add-topic-submit" class="overlay-submit"
            @click="submit">Store</button>
    <button id="add-topic-cancel" @click="cancel">Cancel</button>
  </div>
</template>

<script>
const topics_url = "http://hplaptop:5010/api/topics/"
import { global_state } from './main.js';
import auth from "./auth.js";
export default {
  name: 'edit-topic',
  methods: {
    submit() {
      if (this.topic.label === '') {
        this.flash_msg = "Label cannot be empty.";
        this.flash = true;
        return
      }
      let topic_url = topics_url + this.global_state.edit_topic_item.id;
      let vm = this;
      axios.put(topic_url, {
        label: this.topic.label,
        description: this.topic.description
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
      this.global_state.edit_topic_item = {};
      this.global_state.overlay.shown = false;
      this.global_state.overlay.edit_topic = false;
    }
  },
  data() {
    return {
      global_state: global_state,
      topic: {
        label: global_state.edit_topic_item.label,
        description: global_state.edit_topic_item.description
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
