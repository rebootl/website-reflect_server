<template>
  <div id="add-topic-box" class="overlay-box">
    <h2>Add Topic</h2>
    <p><em class="flash" v-if="flash">Error: {{ err_msg }}</em></p>
    <input type="text"
           placeholder="Title"
           v-model="topic.title"><br>
    <input type="text"
           placeholder="Description"
           v-model="topic.description"><br>
    <button id="add-topic-submit" class="overlay-submit"
            @click="submit">Store</button>
    <button id="add-topic-cancel" @click="cancel">Cancel</button>
  </div>
</template>

<script>
import { global_state } from './main.js';
import auth from "./auth.js";
export default {
  name: 'add-topic',
  methods: {
    submit() {
      //auth.login(this);
    },
    cancel() {
      // reset form here
      /*this.login.username = '';
      this.login.password = '';
      this.err_login = false;
      this.$emit("cancel_login");*/
      this.global_state.overlay.shown = false;
      this.global_state.overlay.add_topic = false;
    }
  },
  data() {
    return {
      global_state: global_state,
      topic: {
        title: '',
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
