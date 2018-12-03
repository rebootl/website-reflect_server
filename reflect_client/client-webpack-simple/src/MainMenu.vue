<template>
  <div id="main-menu" class="sec-skin">
    <topics></topics>
    <subtags></subtags>
  </div>
</template>

<script>
import Topics from './Topics.vue';
import Subtags from './Subtags.vue';
import { global_state } from './main.js';

const get_sel_data_url = "http://hplaptop:5010/api/topics";

export default {
  name: 'main-menu',
  created: function() {
    this.get_selection_data();
  },
  methods: {
    get_selection_data: function() {
      let vm = this
      axios.get(get_sel_data_url)
        .then( function (response) {
          vm.global_state.selection_data = response.data;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    }
  },
  data () {
    return {
      global_state: global_state
    }
  },
  components: {
    Topics,
    Subtags
  }
}
</script>

<style lang="less">
@import (reference) "./style.less";
@import (reference) "./globals.less";
#main-menu {
  ul {
    margin-top: 0;
    margin-bottom: 0;
    list-style-type: none;
    padding: 0;
    li:hover {
      background-color: @col_sec_bg_hover;
      color: @col_sec_text_hover;
    }
    li.selected {
      background-color: @col_sec_bg_selected;
      color: @col_sec_text_selected;
    }
  }
  a {
    display: block;
    text-decoration: none;
    color: @col_sec_text;
  }
}
</style>
