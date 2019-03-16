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
      height: 100%;
    }
  </style>
`;

const eToggleUserMenu = new CustomEvent('toggleusermenu', {
  bubbles: true,
  composed: true
});

class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.user_menu_active = "";
    this.update();
  }
  update() {
    render(html`
      ${style}
      <div id="logo-box">
        <img id="logo" src="/layout/logo.png">
      </div>
      <user-dropdown-button @click=${this.user_menu_toggle}>
      </user-dropdown-button>
    `
    , this.shadowRoot);
  }
  user_menu_toggle() {
    if (global_state.user.show_menu) {
      global_state.user.show_menu = false;
    } else {
      global_state.user.show_menu = true;
    }
    console.log(global_state.user.show_menu);
    this.dispatchEvent(eToggleUserMenu);
  }
}

customElements.define('my-header', MyHeader);
