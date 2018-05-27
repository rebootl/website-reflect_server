const get_sel_data_url = "http://hplaptop:5010/api/get_selection_data";

Vue.component('selection', {
  template: `<div id="selection">
      <topics v-bind:topics="topics"
              @selection_change="update_selected_topics"></topics>
      <!-- display selected list here -->
      Selected topics: {{ selected_topics }}<br />
      Shown subtags: {{ shown_subtags }}
      <subtags v-bind:shown_subtags="shown_subtags"></subtags>
    </div>
  `,
  created: function() {
    this.get_selection_data();
  },
  methods: {
    get_selection_data: function() {
      var vm = this
      axios.get(get_sel_data_url)
        .then( function (response) {
          vm.topics = response.data.topics;
          vm.subtags = response.data.subtags;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    },
    update_selected_topics: function(selected_topics) {
      this.selected_topics = selected_topics;
      // --> update content (send to api)
      this.update_shown_subtags();
    },
    update_shown_subtags: function() {
      this.shown_subtags = [];
      for (let subtag in this.subtags) {
        if (this.selected_topics.includes(subtag)) {
          this.shown_subtags = this.shown_subtags.concat(this.subtags[subtag]);
        }
      }
    }
  },
  data() { return {
    topics: [],
    subtags: [],
    selected_topics: [],
    shown_subtags: []
  }}
})

Vue.component('topics', {
  props: [ "topics" ],
  template: `<nav id="topics">
      <h2>Topics</h2>
      <ul>
        <li v-for="topic in topics" :id="topic">
          <a href="#" v-on:click="toggle_select(topic)">{{ topic }}</a>
        </li>
      </ul>
    </nav>
  `,
  created: function () {
    //this.update_text();
    //this.text= "Now some other text :]";
    //this.get_topics();
  },
  methods: {
    toggle_select: function(topic) {
      var li_el = document.getElementById(topic);
      var sel_class = "selected";
      if (this.selected_topics.indexOf(topic) === -1) {
        this.selected_topics.push(topic);
        li_el.classList.add(sel_class)
      } else {
        let r = this.selected_topics.indexOf(topic);
        this.selected_topics.splice(r, 1);
        li_el.classList.remove(sel_class)
      }
      this.selected_topics.sort();
      this.$emit('selection_change', this.selected_topics);
      //alert(topic);
    }
  },
  data() { return {
    //topics: [],
    selected_topics: []
  } }
})
//v-if="subtag in selected_topics"
Vue.component('subtags', {
  props: [ "shown_subtags" ],
  template: `<nav id="subtags">
      <ul>
        <li v-for="subtag in shown_subtags"
            :id="subtag">
          <a href="#" v-on:click="toggle_select(subtag)">{{ subtag }}</a>
        </li>
      </ul>
    </nav>
  `,
  created: function () {
    //this.subtags.push("a");
  },
  data() { return {
    //subtags: [],
    //selected_subtags: []
  } }
})

new Vue({ el: '#selection' })
