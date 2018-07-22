<template>
  <div id="edit-subtag-box" class="overlay-box">
    <h2>Edit Subtag</h2>
    <h3>ref: {{ global_state.edit_subtag_item.ref }}</h3>
    <p><em class="flash" v-if="flash">{{ flash_msg }}</em></p>
    Label: <input type="text"
           v-model="subtag.label"><br>
    Description: <input type="text"
           v-model="subtag.description"><br>
    <button id="edit-subtag-submit" class="overlay-submit"
            @click="submit">Store</button>
    <button id="edit-subtag-cancel" @click="cancel">Cancel</button>
  </div>
</template>

<script>
const subtags_url = "http://hplaptop:5010/api/subtags/"
import { global_state } from './main.js';
import auth from "./auth.js";
export default {
  name: 'edit-subtag',
  methods: {
    submit() {
      if (this.subtag.label === '') {
        this.flash_msg = "Label cannot be empty.";
        this.flash = true;
        return
      }
      let subtag_url = subtags_url + this.global_state.edit_subtag_item.ref;
      let vm = this;
      axios.put(subtag_url, {
        label: this.subtag.label,
        description: this.subtag.description
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
      this.global_state.edit_subtag_item = {};
      this.global_state.overlay.shown = false;
      this.global_state.overlay.edit_subtag = false;
    }
  },
  data() {
    return {
      global_state: global_state,
      subtag: {
        label: global_state.edit_subtag_item.label,
        description: global_state.edit_subtag_item.description
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
