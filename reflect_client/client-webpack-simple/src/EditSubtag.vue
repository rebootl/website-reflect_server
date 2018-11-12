<template>
  <div id="edit-subtag-box" class="overlay-box">
    <h2>Edit Subtag</h2>
    <h3>id: {{ global_state.edit_subtag_item.id }}</h3>
    <p><em class="flash" v-if="flash">{{ flash_msg }}</em></p>
    Label: <input type="text"
           v-model="subtag.label"><br>
    <button id="edit-subtag-submit" class="overlay-submit"
            @click="submit">Store</button>
    <button id="edit-subtag-cancel" @click="cancel">Cancel</button>
  </div>
</template>

<script>
const subtags_url = "http://hplaptop:5010/api/subtags/"
import auth from "./auth.js";
import { global_state } from './main.js';
import { flash } from './flash_helper.js';
export default {
  name: 'edit-subtag',
  methods: {
    submit() {
      if (this.subtag.label === '') {
        this.flash_msg = "Label cannot be empty.";
        this.flash = true;
        return
      }
      let subtag_url = subtags_url + this.global_state.edit_subtag_item.id;
      let vm = this;
      axios.put(subtag_url, {
        label: this.subtag.label,
      },
      {
        headers: auth.get_auth_header()
      }
      ).then(function (response) {
        console.log(response);
        flash("succ", "Subtag edited. ID = " + response.data.id);
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
