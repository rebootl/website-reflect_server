<template>
  <!--<div id="main-content-container">-->
    <main id="main-content">
      <mini-select-view :selection_data="selection_data">
      </mini-select-view>
      <!--<small><pre>Request str:{{ this.content_data.query_str }}</pre></small>-->
      <ul class="entries-list">
        <li class="entry" :id="'entry-' + entry.id"
            v-for="entry in content_data.entries">
          <div class="entry-info"><small>{{ entry.timestamp }}</small></div>
          <div class="entry-content" v-html="entry.content.text_html"></div>
        </li>
      </ul>
      <new-entry-quickinput v-if="global_state.user.logged_in"
                            :selection_data="selection_data">
      </new-entry-quickinput>
    </main>
  <!--</div>-->
</template>

<script>
import { global_state } from './main.js';
import MiniSelectView from './MiniSelectView.vue';
import NewEntryQuickinput from './NewEntryQuickinput.vue';
const get_entries_url = "http://hplaptop:5010/api/entries";
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
          topics.push(topic.id);
        }
        for (let subtag of topic.subtags) {
          if (subtag.active) {
            tags.push(subtag.id)
          }
        }
      }
      this.request_data = {
        'topics': topics,
        'tags': tags
      }
      // update content
      this.get_entries();
    },
    get_entries: function() {
      let vm = this;
      axios.get(get_entries_url, {
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
@import (reference) "./style.less";
@import (reference) "./globals.less";
main {
  //min-height: calc(100vh - 94px);
  //padding-left: 30px;
  //padding-right: 30px;
  //padding-top: 20px;
  background-color: @col-main-content-bg;
  .entries-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    .entry {
      border-left: 5px solid grey;
      padding-left: 15px;
      padding-bottom: 1px;
      border-top: 1px solid #303030;
      //height: 100%;
      .entry-info {
        padding-top: 5px;
        font-size: 0.8em;
        color: #5c5c5c;
      }
      .entry-content {
        padding-left: 0px;
      }
    }
  }
}
</style>
