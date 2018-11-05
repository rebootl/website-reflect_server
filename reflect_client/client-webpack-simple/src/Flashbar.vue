<template>
      <div id="flash-bar">
        <!--<h2>Login</h2>
        <p><em class="flash" v-if="err_login">Error: {{ err_msg }}</em></p>
        <input type="text"
               placeholder="Username"
               v-model="login.username"><br>
        <input type="password"
               placeholder="Password"
               v-model="login.password"><br>
        <button id="login-submit" @click="submit">Login</button>
        <button id="login-cancel" @click="cancel">Cancel</button>
      -->
      </div>
</template>

<script>
//import auth from "./auth.js";
export default {
  name: 'flash-bar',
  props: [ "flash_msg" ],
  watch: {
    flash_msg: {
      flash_msg_changed() {
        this.flash();
      }
    }
  }
  methods: {
    flash() {
      // -> show flashbar
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
/*#login-box {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: @col-main-content-bg;
  padding: 10px 20px 20px 20px;
  #login-submit {
    margin-top: 20px;
  }
}
.flash {
  color: yellow;
}*/
</style>
