<template>
  <div id="site-container">
    <selection @selection_update="update_selection"></selection>
    <main-content v-bind:selection_data="selection_data">text</main-content>
  </div>
</template>

<script>
import Selection from './Selection.vue'
import MainContent from './MainContent.vue'

export default {
  name: 'app',
  methods: {
    update_selection: function(selection_data) {
      this.selection_data = selection_data;
      //alert(this.selection_data);
    }
  },
  data () {
    return {
      selection_data: [],
    }
  },
  components: {
    Selection,
    MainContent
  }
}
</script>

<style lang="less">
@base-color-bg: #060606;
@base-color-box: #1b1b1b;
@border-line-color: #464646;

body {
  margin: 0;
  background-color: @base-color-bg;
  color: #aaa;
}
header {
  border-bottom: 1px solid @border-line-color;
  padding-left: 10px;
}
</style>
