import { html, render } from 'lit-html';
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

    const templ = html`${style}
      <div id="logo-box">
        <img id="logo" src="/layout/logo.png">
      </div>
      <user-dropdown-button></user-dropdown-button>
    `;

    render(templ, this.shadowRoot);
  }
}

customElements.define('my-header', MyHeader);
