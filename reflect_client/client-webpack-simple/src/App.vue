<template>
  <div id="app-container">
    <header>
      <div id="logo-box">
        <img id="logo" src="reflect-lotos_110.png">
      </div>
      <!--<p class="logged-in" v-if="">logged in</p>-->
      <button id="login-toggle" @click="show_login()">Login</button>
    </header>
    <div id="overlay" v-bind:class="{ 'shown' : login_shown }">
      <login @cancel_login="hide_login"></login>
    </div>
    <main-menu @selection_update="update_selection"></main-menu>
    <main-content v-bind:selection_data="selection_data">text</main-content>
  </div>
</template>

<script>
import Login from './Login.vue'
import MainMenu from './MainMenu.vue'
import MainContent from './MainContent.vue'
import auth from "./auth.js";
export default {
  name: 'app',
  methods: {
    show_login() {
      this.login_shown = true;
    },
    hide_login() {
      this.login_shown = false;
    },
    update_selection(selection_data) {
      this.selection_data = selection_data;
      //alert(this.selection_data);
    }
  },
  data () {
    return {
      selection_data: [],
      login_shown: false,
      logged_in: false,
    }
  },
  components: {
    Login,
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
  background-color: @col-body-bg;
  color: @col-base-text;
}
header {
  position: fixed;
  top: 0;
  height: 42px;
  width: 100%;
  background-color: @col-header-bg;
  border-bottom: 1px solid @col-header-line;
  h1 {
    margin: 0;
    padding: 2px 0 0 17px;
    color: @col-header-text;
    letter-spacing: 2px;
    font-weight: normal;
    #header-title-special {
      font-size: 0.7em;
    }
  }
  #logo-box {
    /*position: fixed;
    top: 0;
    left: 0;*/
    float: left;
    width: 210px;
    height: 100%;
  }
  #logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    //z-index: 1000;
    height: 65px;
  }
}
h1, h2, h3, h4, h5, h6 {
  font-family: serif;
}
button {
  background-color: @col-abox-bg;
  border: 1px solid @col-abox-tag-border;
  color: @col-abox-tag-text;
  padding: 5px 8px;
  font-size: 14px;
  cursor: pointer;
}
button:hover {
  background-color: @col-abox-item-bg-hover;
  color: @col-abox-item-text-hover;
}
input {
  background-color: @col-abox-bg;
  color: @col-base-text;
  border: 2px solid #3a3a4a;
  margin: 5px;
  padding: 5px;
}
#login-toggle {
  float: right;
  margin-top: 5px;
  margin-right: 5px;
  height: 32px;
  border: 3px solid @col-abox-item-border;
  border: 1px solid #000;
}
#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  display: none;
  left: 0;
  top: 42px;
  right: 0;
  bottom: 0;
  background-color: #000b;
  z-index: 100;
}
#overlay.shown {
  display: block;
}
.abox-skin {
  list-style-type: none;
  background-color: @col-abox-bg;
  color: @col-abox-item-text;
  a {
    text-decoration: none;
  }
  li {
    display: block;
    a {
      display: block;
      height: 100%;
      color: @col-abox-item-text;
    }
  }
  li:hover {
    background-color: @col-abox-item-bg-hover;
    color: @col-abox-item-text-hover;
    a {
      color: @col-abox-item-text-hover;
    }
  }
  li.selected {
    background-color: @col-abox-item-bg-selected;
    color: @col-abox-item-text-selected;
    a {
      color: @col-abox-item-text-selected;
    }
  }
}
</style>
