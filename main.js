const get_sel_data_url = "http://hplaptop:5010/api/get_selection_data";

Vue.component('site-container', {
  template: `<div id="site-container">
    <selection @selection_update="update_selection"></selection>
    <main-content v-bind:selection_data="selection_data">text</main-content>
  </div>`,
  methods: {
    update_selection: function(selection_data) {
      this.selection_data = selection_data;
      //alert(this.selection_data);
    }
  },
  data() { return {
    selection_data: [],
  }}
})

Vue.component('main-content', {
  props: [ "selection_data" ],
  template: `<main id="main-content">
    text, blablabla
  </main>`,
  watch: {
    selection_data: {
      handler: function() {
        this.selection_changed();
      },
      deep: true
    }
  },
  methods: {
    selection_changed: function() {
      // construct variables for GET request
      let topics = [];
      let tags = [];
      for (let topic of this.selection_data) {
        if (topic.active) {
          topics.push(topic.ref);
        }
        for (let subtag of topic.subtags) {
          if (subtag.active) {
            tags.push(subtag.ref)
          }
        }
      }
      this.request_data = {
        'topics': topics,
        'tags': tags
      }
      //alert(this.request_data.tags);
    }
  },
  data() { return {
    request_data: {}
  }}
})

Vue.component('selection', {
  template: `<div id="selection">
      <topics v-bind:selection_data="selection_data"
              v-on:selection_change="selection_changed"></topics>
      <subtags v-bind:selection_data="selection_data"
               v-on:selection_change="selection_changed"></subtags>
      <br>
      <br>
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
      let vm = this
      axios.get(get_sel_data_url)
        .then( function (response) {
          vm.selection_data = response.data;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    },
    selection_changed: function() {
      // update content acc. to new selection
      this.$emit('selection_update', this.selection_data);
    }
  },
  data() { return {
    selection_data: []
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
        // deselect subtags
        for (let subtag of item.subtags) {
          subtag.active = false;
        }
      } else {
        // first deselect everything
        for (let item of this.selection_data) {
          for (let subtag of item.subtags) {
            subtag.active = false;
          }
          item.active = false;
        }
        item.active = true;
      }
      this.$emit('selection_change');
    }
  },
  data() { return {
    //selected_topics: []
  } }
})

Vue.component('subtags', {
  props: [ "selection_data" ],
  template: `<nav id="subtags">
      <h2>Tags</h2>
      <ul v-for="item in selection_data"
          v-if="item.active">
        <li v-for="subtag in item.subtags"
            v-bind:class="{ 'selected': subtag.active }">
          <a href="#" v-on:click="toggle_select(subtag)">{{ subtag.label }}</a>
        </li>
      </ul>
    </nav>
  `,
  methods: {
    toggle_select: function(subtag) {
      if (subtag.active) {
        subtag.active = false;
      } else {
      subtag.active = true;
      }
      this.$emit('selection_change');
    }
  },
  data() { return {
    //selected_subtags: [],
  } }
})

new Vue({ el: '#site-container' })
