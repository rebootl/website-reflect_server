<template>
  <div id="app-container">
    <header>
      <div id="logo-box">
        <img id="logo" src="">
      </div>
      <em id="logged-in-tag"
          v-if="global_state.user.logged_in">{{ global_state.user.name }}</em>
      <button id="login-toggle-button"
              v-if="!global_state.user.logged_in"
              @click="show_login()">Login</button>
      <button id="login-toggle-button" v-else
              @click="logout()">Logout</button>
    </header>
    <div id="overlay" v-bind:class="{ 'shown' : global_state.overlay.shown }">
      <login v-if="global_state.overlay.login"
             @cancel_login="hide_login"></login>
      <add-topic v-else-if="global_state.overlay.add_topic"
                 @refresh_menu="refresh_menu"></add-topic>
      <edit-topic v-else-if="global_state.overlay.edit_topic"
                 @refresh_menu="refresh_menu"></edit-topic>
      <add-subtag v-else-if="global_state.overlay.add_subtag"
                 @refresh_menu="refresh_menu"></add-subtag>
    </div>
    <main-menu ref="main_menu"></main-menu>
    <main-content v-bind:selection_data="global_state.selection_data">text</main-content>
  </div>
</template>

<script>
import Login from './Login.vue';
import MainMenu from './MainMenu.vue';
import MainContent from './MainContent.vue';
import AddTopic from './AddTopic.vue';
import EditTopic from './EditTopic.vue';
import AddSubtag from './AddSubtag.vue';
import { global_state } from './main.js';
import auth from "./auth.js";
export default {
  name: 'app',
  created() {
    auth.update_login_status();
  },
  methods: {
    show_login() {
      this.global_state.overlay.shown = true;
      this.global_state.overlay.login = true;
    },
    hide_login() {
      this.global_state.overlay.shown = false;
      this.global_state.overlay.login = false;
    },
    logout() {
      auth.logout();
    },
    refresh_menu() {
      // -> store selection
      this.$refs.main_menu.get_selection_data();
      // -> restore selection
    }
  },
  data () {
    return {
      global_state: global_state,
      login_shown: false,
    }
  },
  components: {
    Login,
    MainMenu,
    MainContent,
    AddTopic,
    EditTopic,
    AddSubtag
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
#login-toggle-button {
  float: right;
  margin-top: 5px;
  margin-right: 5px;
  height: 32px;
  border: 3px solid @col-abox-item-border;
  border: 1px solid #000;
}
#logged-in-tag {
  position: absolute;
  right: 80px;
  top: 11px;
  color: @col-abox-header-text;
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
  overflow: auto;
}
#overlay.shown {
  display: block;
}
.overlay-box {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: @col-main-content-bg;
  padding: 10px 20px 20px 20px;
  .overlay-submit {
    margin-top: 20px;
  }
}
.flash {
  color: yellow;
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
