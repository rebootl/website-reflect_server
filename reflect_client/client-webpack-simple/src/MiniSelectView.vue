<template>
  <div class="mini-select-view">
    <ul class="mini-select-view-topics">
      <li v-for="topic in topics" class="mini-select-view-topic">
        <small>{{ topic.label }}</small>
      </li>
    </ul>
    <ul class="mini-select-view-tags">
      <li v-for="tag in tags" class="mini-select-view-tag">
        <small>{{ tag.label }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MiniSelectView',
  props: [ "selection_data", "edit" ],
  watch: {
    selection_data: {
      handler: function() {
        this.selection_changed();
      },
      deep: true
    }
  },
  methods: {
    selection_changed() {
      this.topics = [], this.tags = [];
      for (let topic of this.selection_data) {
        if (topic.active) {
          this.topics.push(topic);
        }
        for (let subtag of topic.subtags) {
          if (subtag.active) {
            this.tags.push(subtag);
          }
        }
      }
      if (this.topics.length == 0 && this.edit == true) {
        this.topics.push({ label: "Select a Topic and opt. Tags..." });
      }
    }
  },
  data() {
    return {
      topics: [],
      tags: []
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
.mini-select-view {
  height: 23px;
  padding-top: 1px;
  color: #777;
  ul {
    margin: 0;
    padding: 1px 0 0 0;
    list-style-type: none;
    li {
      margin-left: 5px;
      float: left;
    }
    li.mini-select-view-topic {
      padding-top: 2px;
    }
    li.mini-select-view-tag {
      padding: 0 5px 0 5px;
      border: 1px solid @col-abox-item-border-selected;
      border-radius: 5px;
      background-color: @col-abox-item-bg-selected;
    }
  }
}
</style>
