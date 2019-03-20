import { html, render } from 'lit-html';
import { global_state } from './state.js';
import './user-menu.js';

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
    user-menu {
      float: right;
      /*height: 100%;*/
    }
  </style>
`;

class MainHeader extends HTMLElement {
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
      <user-menu></user-menu>
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

customElements.define('main-header', MainHeader);
