<template>
      <div id="new-entry-quickinput">
        <mini-select-view :selection_data="global_state.selection_data">
        </mini-select-view>
        <input type="text"
               placeholder="Start a new Entry..."
               v-model="new_entry_text">
        <button @click="submit_new_entry">Create</button><br>
        <small class="type-detect">Entry Type:
          <span v-if="detect_result == 'detecting'">detecting...</span>
          <span v-else-if="detect_result == 'autodetect'">Autodetect</span>
          <span v-else-if="detect_result == 'link'" class="col-link">Link</span>
          <span v-else-if="detect_result == 'note'" class="col-note">Note</span>
          <span v-else>could not detect...:(</span>
        </small>
      </div>
</template>

<script>
const entry_url = "http://hplaptop:5010/api/entries"
import MiniSelectView from './MiniSelectView.vue';
import { global_state } from './main.js';
import auth from './auth.js';
import { flash } from './flash_helper.js';

export default {
  name: 'NewEntryQuickinput',
  components: { MiniSelectView },
  created: function () {
    // not sure why I have to use function() here, but it doesn't work orherwise...
    this.deb_detect_input = _.debounce(function() { this.detect_input(); }, 500);
  },
  watch: {
    new_entry_text: function() {
      this.detect_result = "detecting";
      // use debounce here
      // (tried to write my own debounce function but its kinda tricky...
      // so using lodash)
      this.deb_detect_input();
    },
  },
  methods: {
    detect_input() {
      if (this.new_entry_text.startsWith("http://") ||
          this.new_entry_text.startsWith("https://")) {
        this.detect_result = "link";
      } else if (this.new_entry_text == "") {
        this.detect_result = "autodetect";
      } else {
        this.detect_result = "note";
      }
    },
    check_selection() {
      let topics = [];
      for (let topic of this.global_state.selection_data) {
        if (topic.active) {
          topics.push(topic);
        }
      }
      if (topics.length == 0) {
        return false;
      } else {
        return true;
      }
    },
    submit_new_entry() {
      if (this.new_entry_text === '') {
        // (return silently)
        return
      }
      if (!this.check_selection()) {
        flash("warn",
              "You must select a topic and optionally tags, returning...")
        return
      }
      let vm = this;
      axios.post(entry_url, {
        det_type: this.detect_result,
        text: this.new_entry_text,
        author: this.global_state.user.name,
        sel_data: this.global_state.selection_data
      },
      {
        headers: auth.get_auth_header()
      }
      ).then(function (response) {
        console.log(response);
        flash("succ", "New entry created. ID = " + response.data.id);
        vm.$emit('refresh_menu');
        vm.new_entry_text = "";
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data.msg);
          flash("erro", error.response.data.msg);
        }
        else {
          flash("erro", "An unknown error occured...");
        }
      });
    }
  },
  data () {
    return {
      global_state: global_state,
      new_entry_text: "",
      detect_result: "autodetect",
    }
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
#new-entry-quickinput {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #3a3a3a;
  padding-left: 15px;
  padding-bottom: 10px;
  background-color: @col-main-content-bg;
  input {
    background-color: #2b2b2b;
    border: 1px solid #3a3a3a;
  }
  button {
    background-color: #2b2b2b;
    border: 0;
  }
  small.type-detect {
    color: #555;
    padding-left: 7px;
    .col-link {
      color: @col-types-hi-links;
    }
    .col-note {
      color: @col-types-hi-notes;
    }
  }
}
</style>
