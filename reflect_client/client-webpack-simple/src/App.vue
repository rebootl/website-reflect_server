<template>
  <div id="site-container">
    <main-menu @selection_update="update_selection"></main-menu>
    <main-content v-bind:selection_data="selection_data">text</main-content>
  </div>
</template>

<script>
import MainMenu from './MainMenu.vue'
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
    MainMenu,
    MainContent
  }
}
</script>

<style lang="less">
@import "./globals.less";
/* general stuff, also from index.html */
body {
  margin: 0;
  background-color: @floor-color;
  color: @base-text-color;
  position: relative;
}
header {
  background-color: @header-bg;
  border-bottom: 1px solid @header-line;
  height: 42px;
  h1 {
    margin: 0;
    padding: 2px 0 0 17px;
    color: @header-text-color;
    letter-spacing: 2px;
    font-weight: normal;
    #header-title-special {
      font-size: 0.7em;
    }
  }
  #logo-box {
    width: 210px;
    height: 100%;
    //border-right: 1px solid #000;
  }
  #logo {
    display: block;
    position: absolute;
    left: 63px;
    z-index: 1000;
    height: 65px;
  }
}
h1, h2, h3, h4, h5, h6 {
  font-family: serif;
}
</style>
