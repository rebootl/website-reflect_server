import { html, render } from 'lit-html';
import { global_state } from './state.js';
import './user-dropdown-button.js';

const style = html`
  <style>
    :host {
      background-color: var(--bg-header);
      display: block;
      box-sizing: content-box;
      height: 48px;
      border-bottom: 1px solid var(--header-bottom-line);
    }
    #logo-box {
      width: 50px;
      float: left;
    }
    #logo {
      margin-left: auto;
      margin-right: auto;
      display: block;
      padding-top: 5px;
    }
    user-dropdown-button {
      float: right;
      /*min-width: 50px;*/
      height: 100%;
      /*border-left: 1px solid rgb(20,20,20); /*#222;*/
    }
    user-dropdown-button:hover {
      /*cursor: pointer;*/
      /*background-color: rgb(10,10,10);*/
    }
  </style>
`;

class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update();
  }
  update() {
    render(html`
      ${style}
      <div id="logo-box">
        <img id="logo" src="/layout/logo.png">
      </div>
      <user-dropdown-button
        @click=${this.user_menu_toggle}
        ?userstate=${global_state.user.logged_in}>
      </user-dropdown-button>
    `
    , this.shadowRoot);
  }
  user_menu_toggle() {
    if (global_state.user.logged_in) {
      global_state.user.logged_in = false;
    } else {
      global_state.user.logged_in = true;
    }
    console.log(global_state.user.logged_in);
    this.update();
  }
}

customElements.define('my-header', MyHeader);
