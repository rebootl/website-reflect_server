<template>
  <div id="main-content-container">
    <nav id="content-tabs" class="abox-skin">
      <ul>
        <li class="selected">All <span class="types-num">10</span></li>
        <li>Notes <span class="types-num">3</span></li>
        <li>Links <span class="types-num">5</span></li>
        <li>Images <span class="types-num">2</span></li>
      </ul>
    </nav>
    <main id="main-content">
      text, blablabla {{ this.content_data.query_str }}
    </main>
  </div>
</template>

<script>
const get_content_data_url = "http://hplaptop:5010/api/get_content_data";

export default {
  name: 'MainContent',
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
    }
  },
  data () {
    return {
      request_data: {},
      content_data: {}
    }
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
#content-tabs {
  ul {
    margin: 0;
    padding: 0;
    height: 35px;
    //border: 2px dashed yellow;
    li {
      position: relative;
      padding-left: 10px;
      box-sizing: border-box;
      padding-top: 7px;
      width: calc(100% / 4);
      height: 35px;
      float: left;
      border-right: 1px solid @col-abox-sep-line;
      border-bottom: 1px solid @col-abox-sep-line;
      .types-num {
        position: absolute;
        right: 5px;
        top: 4px;
        font-weight: bold;
        font-size: 1.2em;
      }
    }
  }
}
main {
  min-height: 300px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  background-color: @col-main-content-bg;
}
</style>
