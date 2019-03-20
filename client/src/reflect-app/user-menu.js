import { html, render } from 'lit-html';
import { global_state } from './global_state.js';
import './user-dropdown-button.js';
import './user-dropdown-menu.js';

const style = html`
  <style>
    :host {
      height: 100%;
      postition: relative;
    }
    user-dropdown-menu {
      position: absolute;
      right: 0;
      display: none;
    }
    .show_menu {
      display: block;
    }
  </style>
`;

class UserMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update();
  }
  update() {
    render(html`
      ${style}
      <user-dropdown-button @click=${(e)=>this.toggle_menu()}></user-dropdown-button>
      <user-dropdown-menu @close=${(e)=>this.toggle_menu()}></user-dropdown-menu>
    `
    , this.shadowRoot);
  }
  toggle_menu() {
    this.shadowRoot.querySelector('user-dropdown-button')
      .classList.toggle('active');
    this.shadowRoot.querySelector('user-dropdown-menu')
      .classList.toggle('show_menu');
  }
}

customElements.define('user-menu', UserMenu);
