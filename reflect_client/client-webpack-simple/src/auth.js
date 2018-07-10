const login_url = "http://hplaptop:5010/api/login"
export default {

  user: {
    name: '',
    logged_in: false
  },

  login(context) {
    let vm = this;
    axios.post(login_url, {
      username: context.login.username,
      password: context.login.password
    }).then(function (response) {
      console.log(response);
      // -> store JWT
      localStorage.setItem('access_token', response.data.access_token);
      // -> set logged_in = true
      vm.user.name = context.login.username;
      vm.user.logged_in = true;
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
    // -> remove JWT
    // -> set logged_in = false
    // -> clear user.name
  },

  get_auth_header() {
    return {
      'Authorization':  'Bearer ' + localStorage.getItem(access_token)
    }
  }

}
