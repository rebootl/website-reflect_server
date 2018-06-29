<template>
  <nav id="topics">
    <h2>Topics</h2>
    <ul>
      <li v-for="item in selection_data" :id="item.ref"
          v-bind:class="{ 'selected': item.active }">
        <a href="#" v-on:click="toggle_select(item)">{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'topics',
  props: [ "selection_data" ],
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
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
#topics {
  ul {
    border-top: 1px solid @col-abox-item-border;
  }
  li {
    border-bottom: 1px solid @col-abox-item-border;
    a {
      padding: 10px 5px 10px 20px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  li.selected {
    border-left: 2px solid @col-abox-item-border-selected;
  }
}
</style>
