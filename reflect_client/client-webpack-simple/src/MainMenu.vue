<template>
  <div id="main-menu">
    <topics v-bind:selection_data="selection_data"
            v-on:selection_change="selection_changed"></topics>
    <subtags v-bind:selection_data="selection_data"
             v-on:selection_change="selection_changed"></subtags>
    <!--<br>
    <br>
    <br>
    <br>
    <strong>Data:</strong> <pre>{{ selection_data }}</pre>-->
  </div>
</template>

<script>
import Topics from './Topics.vue'
import Subtags from './Subtags.vue'

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
          vm.selection_data = response.data;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    },
    selection_changed: function() {
      // update content acc. to new selection
      this.$emit('selection_update', this.selection_data);
    }
  },
  data () {
    return {
      selection_data: [],
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
  position: fixed;
  top: 43px;
  width: 210px;
  height: 100%;
  padding-top: 20px;
  background-color: @col-abox-bg;
  border-right: 1px solid @col-abox-sep-line;
  overflow-y: auto;
  h2 {
    text-align: center;
    margin: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    color: @col-abox-header-text;
  }
  a {
    text-decoration: none;
  }
  ul {
    margin-top: 0;
    padding: 0;
    list-style-type: none;
    li {
      a {
        height: 100%;
      }
    }
    li:hover {
      background-color: @col-abox-item-bg-hover;
      a {
        color: @col-abox-item-text-hover;
      }
    }
    li.selected {
      background-color: @col-abox-item-bg-selected;
      border-left: 2px solid @col-abox-item-border-selected;
      a {
        color: @col-abox-item-text-selected;
      }
    }
  }
}
</style>
