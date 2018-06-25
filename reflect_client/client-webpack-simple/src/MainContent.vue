<template>
  <main id="main-content">
    text, blablabla {{ this.content_data.query_str }}
  </main>
</template>

<script>
const get_content_data_url = "http://hplaptop:5010/api/get_content_data";

export default {
  name: 'MainContents',
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
main {
  margin-left: 210px;
  margin-top: 43px;
  max-width: 670px;
  min-height: 300px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 3px;
  background-color: @main-content-bg;
}
</style>
