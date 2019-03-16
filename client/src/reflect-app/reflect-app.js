import {html, render} from 'lit-html';
import { global_state } from './state.js';
import './main-header.js';

const style = html`
  <style>
    :host {
      --bg-floor: rgb(16,16,16);
      --bg-header: rgb(0,0,0);
      --header-bottom-line: rgb(20,20,20);
      --text: rgb(200,200,200);
      --bg-front: rgb(41,41,41);
      --bg-back: rgb(31,31,31);
      --border-back: rgb(24,24,24);

      background-color: var(--bg-floor);
      display: block;
      height: 100vh;
      color: var(--text);
      font-family: Helvetica, sans-serif;
    }
    #user-menu {
      background-color: var(--bg-front);
      float: right;
      padding: 0 25px 20px 25px;
    }
    input {
      background-color: var(--bg-back);
      border: 1px solid var(--border-back);
      padding-left: 10px;
      height: 2em;
      color: var(--text);
      margin-bottom: 15px;
    }
    #buttonbox {
      margin-top: 5px;
      display: flex;
      justify-content: center;
    }
    button {
      background-color: var(--bg-back);
      color: var(--text);
      border: 1px solid var(--border-back);
      padding: 5px 15px 5px 15px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
`;

class ReflectApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update();
  }
  update() {
    render(html`${style}
        <main-header @toggleusermenu=${(e) => this.update()}>
        </main-header>
        ${ global_state.user.show_menu ?
          html`<div id="user-menu">
            <h3>Login:</h3>
            <input id="username" type="text" size="10"
                   placeholder="Username"><br>
            <input id="password" type="password" size="10"
                   placeholder="Password"><br>
            <div id="buttonbox">
              <button>Login</button>
              <!--<button>Cancel</button>-->
            </div>
          </div>` :
          html``}
      `
      , this.shadowRoot);
  }
}

customElements.define('reflect-app', ReflectApp);
