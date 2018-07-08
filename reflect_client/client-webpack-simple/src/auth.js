const login_url = "http://hplaptop:5010/api/login"
export default {

  user: {
    name: '',
    logged_in: false
  },

  login(context) {
    //let vm = context;
    axios.post(login_url, {
      username: context.username,
      password: context.password
    }).then(function (response) {
      console.log(response);
      // -> store JWT
      // -> set logged_it = true
    }).catch(function (error) {
      console.log("that was an error");
      context.err_login = true;
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
