<template>
  <nav id="topics">
    <h2>Topics</h2>
    <ul>
      <li v-for="item in global_state.selection_data" :id="item.ref"
          v-bind:class="{ 'selected': item.active }">
        <a href="#" v-on:click="toggle_select(item)">{{ item.label }}</a>
      </li>
      <li v-if="global_state.user.logged_in"
          @click="show_add_topic()"><a href="#">+</a></li>
    </ul>
  </nav>
</template>

<script>
import { global_state } from './main.js';
export default {
  name: 'topics',
  methods: {
    show_add_topic() {
      this.global_state.overlay.shown = true;
      this.global_state.overlay.add_topic = true;
    },
    toggle_select: function(item) {
      if (item.active) {
        item.active = false;
        // deselect subtags
        for (let subtag of item.subtags) {
          subtag.active = false;
        }
      } else {
        // first deselect everything
        for (let item of this.global_state.selection_data) {
          for (let subtag of item.subtags) {
            subtag.active = false;
          }
          item.active = false;
        }
        item.active = true;
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
@import (reference) "./globals.less";
#topics {
  ul {
    border-top: 1px solid @col-abox-item-border;
  }
  li {
    border-bottom: 1px solid @col-abox-item-border;
    a {
      padding: 10px 5px 10px 20px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  li.selected {
    border-left: 2px solid @col-abox-item-border-selected;
  }
}
</style>
