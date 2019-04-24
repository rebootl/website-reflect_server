import { html, render } from 'lit-html';
import { global_state } from './global_state.js';
import './gen-elements/text-input.js';
import './gen-elements/password-input.js';
import './gen-elements/labelled-button.js';
import './gen-elements/close-button.js';
import auth from './auth.js';

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
    #logout-button {
      margin-top: 15px;
    }
  </style>
`;

const event_close = new CustomEvent('close', {
  bubbles: true,
});

class UserDropdownMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update();
  }
  async submit() {
    const username = this.shadowRoot.getElementById('username').value;
    const pw = this.shadowRoot.getElementById('password').value;
    //console.log(username);
    //console.log(pw);
    // -> make some checks !!!
    const res = await auth.login(username, pw);
    //console.log(res);
    if (res) {
      // login successful
      //console.log(global_state);
      // -> flash message -> do in menu
      // -> update dropdown-menu, clear form
      // -> update content
      //console.log('login successful');
      this.close();
      this.update();
    }
    //else {
      // login unsuccessful
      // -> flash message -> do in menu
      // -> evtl. clear form -> do in menu
      //console.log('login unsuccessful');
    //}
  }
  close() {
    this.dispatchEvent(event_close);
  }
  logout() {
    auth.logout();
    this.close();
    this.update();
  }
  get_login_content() {
    if (global_state.user.logged_in) {
      return html`<labelled-button id="logout-button"
                                   @click=${()=>this.logout()}
                                   label="Logout"></labelled-button>`;
    } else {
      return html`<h3>Login:</h3>
      <close-button @click=${()=>this.close()}></close-button>
      <form>
        <text-input id="username"
                    placeholder="Username"></text-input><br>
        <password-input id="password"
                        placeholder="Password"></password-input><br>
        <div id="buttonbox">
          <labelled-button @click=${()=>this.submit()} label="Login"></labelled-button>
        </div>
      </form>`;
    }
  }
  update() {
    render(html`${style}
      ${this.get_login_content()}
      `, this.shadowRoot);
  }
}

customElements.define('user-dropdown-menu', UserDropdownMenu);
