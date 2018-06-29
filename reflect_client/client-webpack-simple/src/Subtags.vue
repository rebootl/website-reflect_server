<template>
  <nav id="subtags">
    <h2>Tags</h2>
    <ul v-for="item in selection_data"
        v-if="item.active">
      <li v-for="subtag in item.subtags"
          v-bind:class="{ 'selected': subtag.active }">
        <a href="#" v-on:click="toggle_select(subtag)">{{ subtag.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'subtags',
  props: [ "selection_data" ],
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
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
nav#subtags {
  margin-left: 15px;
  margin-right: 15px;
  li {
    display: inline-flex;
    border: 1px solid @col-abox-tag-border;
    border-radius: 9px;
    margin-right: 5px;
    margin-bottom: 5px;
    a {
      color: @col-abox-tag-text;
      padding: 9px 12px 9px 12px;
      display: inline-block;
    }
  }
  li:hover {
    // (unclear if needed)
    color: @col-abox-item-text-hover;
  }
  li.selected {
    border: 2px solid @col-abox-item-border-selected;
    a {
      color: @col-abox-item-text-selected;
    }
  }
}
</style>
