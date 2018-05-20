
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

var topics_url = "http://localhost:5010/api/topics";
var topics_list = new Vue({
  el: "#topics-list",
  data: {
    topics: [
      { title: 't1' },
      { title: 't2' },
      { title: 't3' },
    ]
  },
  created: function () {
    //this.update_text();
    //this.text= "Now some other text :]";
    this.get_topics();
  },
  methods: {
    get_topics: function() {
      var vm = this
      axios.get(topics_url)
        .then( function (response) {
          vm.topics = response.data.topics;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    }
  }
})

var hello_url = "http://localhost:5010/api/hello";

var vm = new Vue({
  el: "#babone-data",
  data: { text: "This is some textBB. :D" },
  created: function () {
    //this.update_text();
    //this.text= "Now some other text :]";
    this.get_hello_data();
  },
  methods: {
	  update_text: function () {
      this.text = "Here some updated text. :OOO";
    },
    get_hello_data: function () {
      var vm = this
      axios.get(hello_url)
        .then( function (response) {
          vm.text = response.data.text;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    }
  }
})
