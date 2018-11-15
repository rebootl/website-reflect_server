<template>
    <!--<nav id="content-tabs" class="abox-skin">
      <ul>
        <li v-for="tab in tabs" :id="tab.ref"
            v-bind:class="{ 'selected': tab.active }">
            <a href="#" v-on:click="select_tab(tab)">
              {{ tab.label }}
              <span class="types-num">{{ tab.count }}</span>
            </a>
        </li>
      </ul>
    </nav>-->
</template>

<script>
import { global_state } from './main.js';
iexport default {
  name: '',
  methods: {
    // (deactivate atm.)
    /*select_tab: function(tab) {
      for (let t of this.tabs) {
        if (tab === t) {
          t.active = true;
        }
        else {
          t.active = false;
        }
      }
    }*/
  },
  data () {
    return {
      global_state: global_state,
      /*tabs: [
        {
            label: "All",
            ref: "tab-all",
            active: true,
            count: 0
        },
        {
            label: "Notes",
            ref: "tab-notes",
            active: false,
            count: 0
        },
        {
            label: "Links",
            ref: "tab-links",
            active: false,
            count: 0
        },
        {
            label: "Images",
            ref: "tab-images",
            active: false,
            count: 0
        }
      ]*/
    }
  },
  components: {
  }
}
</script>

<style lang="less">
@import (reference) "./globals.less";
#content-tabs {
  ul {
    margin: 0;
    padding: 0;
    height: 35px;
    //border: 2px dashed yellow;
    li {
      position: relative;
      box-sizing: border-box;
      width: calc(100% / 4);
      height: 100%;
      float: left;
      border-left: 1px solid @col-abox-sep-line;
      border-bottom: 1px solid @col-abox-sep-line;
      .types-num {
        position: absolute;
        right: 5px;
        top: 7px;
        font-weight: bold;
        font-size: 1.2em;
      }
      a {
        padding-left: 10px;
        padding-top: 10px;
        height: 25px;
      }
    }
    li.selected {
      border-top: 2px solid green;
      border-bottom: 1px solid @col-abox-item-border;
      .types-num {
        top: 5px;
      }
      a {
        padding-top: 8px;
      }
    }
    #tab-all.selected {
      border-top: 1px solid @col-types-hi-all;
    }
    #tab-notes.selected {
      border-top: 1px solid @col-types-hi-notes;
    }
    #tab-links.selected {
      border-top: 1px solid @col-types-hi-links;
    }
    #tab-images.selected {
      border-top: 1px solid @col-types-hi-images;
    }
  }
}
</style>
