<template>
  <nav id="subtags">
    <!--<h2>Tags</h2>-->
    <ul v-for="item in global_state.selection_data"
        v-if="item.active">
      <li v-for="subtag in item.subtags"
          :id="'subtag-id-' + subtag.id"
          :class="{ 'selected': subtag.active }">
        <a href="#" v-on:click="toggle_select(subtag)"
           :class="{ 'edit': global_state.user.logged_in }">{{ subtag.label }}</a>
        <button v-if="global_state.user.logged_in"
                class="edit-item-button edit-subtag-button"
                @click="show_edit_subtag(subtag)">
          <img class="edit-img" src="edit_128.png">
        </button>
      </li>
      <li v-if="global_state.user.logged_in"
          @click="show_add_subtag()"><a href="#">+</a></li>
    </ul>
  </nav>
</template>

<script>
import { global_state } from './main.js';
export default {
  name: 'subtags',
  methods: {
    show_add_subtag() {
      this.global_state.overlay.shown = true;
      this.global_state.overlay.add_subtag = true;
    },
    show_edit_subtag(item) {
      this.global_state.edit_subtag_item = item;
      this.global_state.overlay.shown = true;
      this.global_state.overlay.edit_subtag = true;
    },
    toggle_select: function(subtag) {
      if (subtag.active) {
        subtag.active = false;
      } else {
      subtag.active = true;
      }
    }
  },
  data () {
    return {
      global_state: global_state
    }
  }
}
</script>

<style lang="less">
@import (reference) "./style.less";
@import (reference) "./globals.less";
#subtags {
  //margin: 15px;
  padding: 20px 15px 15px 15px;
  li {
    display: inline-flex;
    border: 1px solid #333;
    border-radius: 9px;
    margin-right: 5px;
    margin-bottom: 5px;
    position: relative;
    a {
      color: @col_sec_text;
      font-weight: lighter;
      font-size: 1em;
      padding: 9px 12px 9px 12px;
      display: inline-block;
    }
    .edit-subtag-button {
      position: absolute;
      right: 0px;
      top: 7px;
    }
  }
  li.selected {
    border: 1px solid @col-abox-item-border-selected;
    a {
      color: @col-abox-item-text-selected;
    }
  }
}
</style>
