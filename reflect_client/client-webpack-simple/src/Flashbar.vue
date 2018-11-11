<template>
      <div class="flash-bar" :class="'type-' + global_state.flash.type">
        <strong v-if="global_state.flash.type == 'succ'">Success! :)</strong>
        <strong v-else-if="global_state.flash.type == 'warn'">Warning!</strong>
        <strong v-else-if="global_state.flash.type == 'info'">Info:</strong>
        <strong v-else-if="global_state.flash.type == 'erro'">Error! :(</strong>
        <strong v-else>unknown type</strong>
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
  methods: {
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
  padding-left: 20px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  .flash-msg {
    margin-left: 10px;
    padding-right: 85px;
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
.type-succ, .type-info {
  background-color: #294ce1;
  button#flashbar-close {
    background-color: #4265fc;
  }
  button#flashbar-close:hover {
    background-color: #4c6dfc;
  }
}
.type-warn {
  background-color: #c07a00;
  color: #f2f2f2;
  button#flashbar-close {
    background-color: #995100;
  }
  button#flashbar-close:hover {
    background-color: #9e5e17;
  }
}
.type-erro {
  background-color: #961f11;
  color: #f2f2f2;
  button#flashbar-close {
    background-color: #7a150d;
  }
  button#flashbar-close:hover {
    background-color: #902b21;
  }
}
</style>
