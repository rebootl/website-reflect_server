<template>
  <div id="main-menu" class="abox-skin">
    <topics></topics>
    <subtags></subtags>
  </div>
</template>

<script>
import Topics from './Topics.vue';
import Subtags from './Subtags.vue';
import { global_state } from './main.js';

const get_sel_data_url = "http://hplaptop:5010/api/get_selection_data";

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
@import (reference) "./globals.less";
#main-menu {
  //position: fixed;
  position: absolute;
  top: 43px;
  width: 210px;
  //height: 100%;
  padding-top: 20px;
  //background-color: @col-abox-bg;
  border-right: 1px solid @col-abox-sep-line;
  //overflow-y: auto;
  h2 {
    text-align: center;
    margin: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    color: @col-abox-header-text;
  }
  ul {
    margin-top: 0;
    padding: 0;
  }
}
</style>
