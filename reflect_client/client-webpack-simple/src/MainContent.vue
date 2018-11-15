<template>
  <div id="main-content-container">
    <main id="main-content">
      <mini-select-view :selection_data="global_state.selection_data">
      </mini-select-view>
      text, blablabla {{ this.content_data.query_str }}
      <ul>
        <!--<li v-for="entry in entries" :id="entry.ref">
          <div class="entry-info">{{ entry.ref }} {{ entry.datetime }}</div>
          <div class="entry-content">{{ entry.content.html }}</div>
        </li>-->
      </ul>
      <new-entry-quickinput :selection_data="selection_data" v-if="global_state.user.logged_in">
      </new-entry-quickinput>
    </main>
  </div>
</template>

<script>
import { global_state } from './main.js';
import MiniSelectView from './MiniSelectView.vue';
import NewEntryQuickinput from './NewEntryQuickinput.vue';
const get_content_data_url = "http://hplaptop:5010/api/get_content_data";
export default {
  name: 'MainContent',
  // (property needed for watcher here)
  // --> better way ?
  props: [ "selection_data" ],
  watch: {
    selection_data: {
      handler: function() {
        this.selection_changed();
      },
      deep: true
    }
  },
  methods: {
    submit_new_entry() {
    },
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
      // update content
      this.get_content();
    },
    get_content: function() {
      let vm = this
      axios.get(get_content_data_url, {
          params: vm.request_data
        })
        .then( function (response) {
          vm.content_data = response.data;
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        });
    },
  },
  data () {
    return {
      global_state: global_state,
      new_entry: {
        input: ""
      },
      request_data: {},
      content_data: {},
    }
  },
  components: {
    NewEntryQuickinput,
    MiniSelectView
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
#main-content-container {
  margin-left: 210px;
  margin-top: 43px;
  max-width: 550px;
}
main {
  min-height: calc(100vh - 94px);
  //padding-left: 30px;
  //padding-right: 30px;
  //padding-top: 20px;
  background-color: @col-main-content-bg;
}
</style>
