<template>
  <div id="selection">
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
</template>

<script>
import Topics from './Topics.vue'
import Subtags from './Subtags.vue'

const get_sel_data_url = "http://hplaptop:5010/api/get_selection_data";

export default {
  name: 'selection',
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
  data () {
    return {
      selection_data: [],
    }
  },
  components: {
    Topics,
    Subtags
  }
}
</script>

<style>

</style>
