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

<style>

</style>
