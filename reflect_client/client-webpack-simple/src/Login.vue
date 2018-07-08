<template>
      <div id="login-box">
        <h2>Login</h2>
        <p v-if="err_login">Error at login... :(</p>
        <input type="text"
               placeholder="Username"
               v-model="login.username"><br>
        <input type="text"
               placeholder="Password"
               v-model="login.password"><br>
        <button id="login-submit" @click="submit">Login</button>
        <button id="login-cancel" @click="cancel">Cancel</button>
      </div>
</template>

<script>
import auth from "./auth.js";
export default {
  name: 'login',
  methods: {
    submit() {
      auth.login(this);
    },
    cancel() {
      // --> reset form here !!
      this.err_login = false;
      this.$emit("cancel_login");
    }
  },
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
      err_login: false
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
#login-box {
  max-width: 400px;
  //width: 50px; // tmp.
  //height: 50px; // tmp.
  margin-left: auto;
  margin-right: auto;
  background-color: @col-main-content-bg;
  padding: 10px 20px 20px 20px;
  h2 {
    //margin: 0;
  }
  #login-submit {
    margin-top: 20px;
//    margin-bottom: 10px;
  }
}
</style>
