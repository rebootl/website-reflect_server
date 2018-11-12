<template>
  <div id="add-topic-box" class="overlay-box">
    <h2>Add Topic</h2>
    <p><em class="flash" v-if="flash">{{ flash_msg }}</em></p>
    <input type="text"
           placeholder="Label"
           v-model="topic.label"><br>
    <input type="text"
           placeholder="Description"
           v-model="topic.description"><br>
    <button id="add-topic-submit" class="overlay-submit"
            @click="submit">Store</button>
    <button id="add-topic-cancel" @click="cancel">Cancel</button>
  </div>
</template>

<script>
const topics_url = "http://hplaptop:5010/api/topics"
import auth from "./auth.js";
import { global_state } from './main.js';
import { flash } from './flash_helper.js';
export default {
  name: 'add-topic',
  methods: {
    submit() {
      if (this.topic.label === '') {
        this.flash_msg = "Label cannot be empty.";
        this.flash = true;
        return
      }
      let vm = this;
      axios.post(topics_url, {
        label: this.topic.label,
        description: this.topic.description
      },
      {
        headers: auth.get_auth_header()
      }
      ).then(function (response) {
        console.log(response);
        flash("succ", "New subtag created. ID = " + response.data.id);
        vm.$emit('refresh_menu');
        vm.cancel();
      }).catch(function (error) {
        console.log(error);
        if (error.response) {
          flash("erro", error.response.data.msg);
        }
        else {
          flash("erro", "An unknown error occured...");
        }
      });
    },
    cancel() {
      // (reset form here)
      this.global_state.overlay.shown = false;
      this.global_state.overlay.add_topic = false;
    }
  },
  data() {
    return {
      global_state: global_state,
      topic: {
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
