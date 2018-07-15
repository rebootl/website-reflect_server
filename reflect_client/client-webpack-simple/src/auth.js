import { global_state } from './main.js';

const login_url = "http://hplaptop:5010/api/login"

export default {

  login(context) {
    axios.post(login_url, {
      username: context.login.username,
      password: context.login.password
    }).then(function (response) {
      console.log(response);
      // store JWT
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('username', context.login.username);
      // set logged_in = true
      global_state.user.name = context.login.username;
      global_state.user.logged_in = true;
      context.cancel();
    }).catch(function (error) {
      console.log(error);
      if (error.response) {
        context.err_msg = error.response.data.msg;
        context.err_login = true;
      }
      else {
        context.err_msg = "An unknown error occured...";
        context.err_login = true;
      }
    });
  },

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    global_state.user.name = '';
    global_state.user.logged_in = false;
  },

  update_login_status() {
    var username = localStorage.getItem('username');
    if (username) {
      global_state.user.name = username;
      global_state.user.logged_in = true;
    }
    else {
      global_state.user.logged_in = false;
    }
  },

  get_auth_header() {
    return {
      'Authorization':  'Bearer ' + localStorage.getItem('access_token')
    }
  }

}
