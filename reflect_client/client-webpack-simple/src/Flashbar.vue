<template>
      <div class="flash-bar">
        <strong class="flash-type">{{ global_state.flash.type_msg }}</strong>
        <span class="flash-msg">{{ global_state.flash.msg }}</span>
        <button id="flashbar-close"
                class="flashbar-close-btn"
                @click="close">Close</button>
      </div>
</template>

<script>
import { global_state } from './main.js';
export default {
  name: 'flashbar',
  props: [ "flash_msg" ],
  watch: {
    flash_msg: {
      flash_msg_changed() {
        this.flash();
      }
    }
  },
  methods: {
    flash() {
      global_state.flash.shown = true;
    },
    close() {
      global_state.flash.shown = false;
    }
  },
  data() {
    return {
      global_state: global_state
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
.flash-bar {
  position: fixed;
  top: 42px;
  background-color: #294ce1;
  color: #d7d7d7;
  z-index: 1000;
  width: 100%;
  height: 30px;
  padding-left: 20px;
  padding-top: 10px;
  padding-right: 10px;
  .flash-msg {
    margin-left: 10px;
  }
  button#flashbar-close {
    background-color: #4265fc;
    color: #c0c0c0;
    border: 0;
    position: absolute;
    top: 6px;
    right: 35px;
  }
  button#flashbar-close:hover {
    background-color: #4c6dfc;
    color: #ddd;
  }
}
</style>
