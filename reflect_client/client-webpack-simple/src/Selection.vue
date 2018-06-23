<template>
  <div id="selection">
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
  name: 'selection',
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
#selection {
  position: absolute;
  padding-top: 15px;
  background-color: @sidebar-box-bg;
  border-right: 1px solid @sidebar-vert-line;
  width: 210px;
  height: 100%;
  h2 {
    text-align: center;
    margin: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    color: @sidebar-headers-color;
  }
  ul {
    list-style-type: none;
    margin-top: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }
  .selected {
    background-color: item-selected-bg;
    border-left: 1px solid #4fab8c;
  }
}
</style>
