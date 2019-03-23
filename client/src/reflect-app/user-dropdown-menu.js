import { html, render } from 'lit-html';
import { global_state } from './global_state.js';
import './gen-elements/text-input.js';
import './gen-elements/password-input.js';
import './gen-elements/labelled-button.js';
import './gen-elements/close-button.js';

const style = html`
  <style>
    :host {
      background-color: var(--bg-front);
      border: 1px solid var(--border-back);
      padding: 0 25px 20px 25px;
      position: relative;
    }
    close-button {
      position: absolute;
      right: 20px;
      top: 12px;
    }
    #buttonbox {
      margin-top: 5px;
      display: flex;
      justify-content: center;
    }
  </style>
`;

const eClose = new CustomEvent('close', {
  bubbles: true,
});

class UserDropdownMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update();
  }
  update() {
    render(html`${style}
      <h3>Login:</h3>
      <close-button @click=${(e)=>this.close()}></close-button>
      <text-input id="username"
                  placeholder="Username"></text-input><br>
      <password-input id="password"
                      placeholder="Password"></password-input><br>
      <div id="buttonbox">
        <labelled-button label="Login"></labelled-button>
      </div>`
      , this.shadowRoot);
  }
  close() {
    this.dispatchEvent(eClose);
  }
}

customElements.define('user-dropdown-menu', UserDropdownMenu);
