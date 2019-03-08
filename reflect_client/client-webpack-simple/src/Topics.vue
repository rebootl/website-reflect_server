<template>
  <nav id="topics">
    <!--<h2>Topics</h2>-->
    <ul>
      <li v-for="item in global_state.selection_data"
          :id="'topic-id-' + item.id"
          :class="{ 'selected': item.active }">
        <a href="#" v-on:click="toggle_select(item)">{{ item.label }}</a>
        <button v-if="global_state.user.logged_in"
                class="edit-item-button edit-topic-button"
                @click="show_edit_topic(item)">
          <img class="edit-img" src="edit_128.png">
        </button>
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
    show_edit_topic(topic) {
      this.global_state.edit_topic_item = topic;
      this.global_state.overlay.shown = true;
      this.global_state.overlay.edit_topic = true;
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
@import (reference) "./style.less";
@import (reference) "./globals.less";
#topics {
  border-bottom: 1px solid @col_header_line;
  ul {
    //border-top: 1px solid #151515;
  }
  li {
    //border: 1px dashed red;
    //height: 45px;
    a {
      padding: 12px 5px 12px 18px;
      //font-size: 1.05em;
      //font-weight: lighter;
    }
    //position: relative;
    //border-bottom: 1px solid @col-abox-item-border;
    /*a {
      padding: 10px 5px 10px 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .edit-topic-button {
      position: absolute;
      top: 11px;
      right: 0;
    }*/
  }
  /*li.selected {
    a {
      color: #c8c8c8;
    }
  }*/
}
</style>
