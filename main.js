const get_sel_data_url = "http://hplaptop:5010/api/get_selection_data";

Vue.component('selection', {
  template: `<div id="selection">
      <topics v-bind:selection_data="selection_data"></topics>
      <subtags></subtags>
      <br>
      <br>
      <strong>Data:</strong> <pre>{{ selection_data }}</pre>
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
          vm.selection_data = response.data;
          //vm.topics = response.data.topics;
          //vm.subtags = response.data.subtags;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    },
    /*update_selected_topics: function(selected_topics) {
      this.selected_topics = selected_topics;
      this.update_shown_subtags();
      // --> update subtag selection
      // --> update content (send to api)
    },
    update_shown_subtags: function() {
      this.shown_subtags = [];
      for (let subtag in this.subtags) {
        if (this.selected_topics.includes(subtag)) {
          this.shown_subtags = this.shown_subtags.concat(this.subtags[subtag]);
        }
      }
    },
    update_selected_subtags: function(selected_subtags) {
      this.selected_subtags = selected_subtags;
      // --> update content (send to api)
    }*/
  },
  data() { return {
    selection_data: []
    /*topics: [],
    subtags: [],
    selected_topics: [],
    shown_subtags: [],
    selected_subtags: []*/
  }}
})

Vue.component('topics', {
  props: [ "selection_data" ],
  template: `<nav id="topics">
      <h2>Topics</h2>
      <ul>
        <li v-for="item in selection_data" :id="item.ref"
            v-bind:class="{ 'selected': item.active }">
          <a href="#" v-on:click="toggle_select(item)">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  `,
  created: function () {
  },
  methods: {
    toggle_select: function(item) {
      if (item.active) {
        item.active = false;
      } else {
      item.active = true;
      }
    }
    /*toggle_select: function(topic) {
      var li_el = document.getElementById(topic);
      var sel_class = "selected";
      if (this.selected_topics.indexOf(topic) === -1) {
        this.selected_topics.push(topic);
        li_el.classList.add(sel_class);
      } else {
        let r = this.selected_topics.indexOf(topic);
        this.selected_topics.splice(r, 1);
        li_el.classList.remove(sel_class);
      }
      this.selected_topics.sort();
      //this.$emit('selection_change', this.selected_topics);
    }*/
  },
  data() { return {
    //selected_topics: []
  } }
})

Vue.component('subtags', {
  props: [ "selection_data" ],
  template: `<nav id="subtags">
      <ul>
        <li v-for="topic in selection_data"
            :id="subtag">
          <a href="#" v-on:click="toggle_select(subtag)">{{ subtag }}</a>
        </li>
      </ul>
    </nav>
  `,
  methods: {
    toggle_select: function(subtag) {}
  },
  data() { return {
    //selected_subtags: [],
  } }
})

new Vue({ el: '#selection' })
