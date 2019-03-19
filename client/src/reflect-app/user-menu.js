import { html, render } from 'lit-html';
import { global_state } from './state.js';
import './text-input.js';
import './password-input.js';
import './form-button.js';

const style = html`
  <style>
    :host {
      background-color: var(--bg-front);
      padding: 0 25px 20px 25px;
    }
    #buttonbox {
      margin-top: 5px;
      display: flex;
      justify-content: center;
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
    render(html`${style}
      <h3>Login:</h3>
      <text-input id="username"
                  placeholder="Username"></text-input><br>
      <password-input id="password"
                      placeholder="Password"></password-input><br>
      <div id="buttonbox">
        <form-button></form-button>
      </div>`
      , this.shadowRoot);
  }
}

customElements.define('user-menu', UserMenu);
