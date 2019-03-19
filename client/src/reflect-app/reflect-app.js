import { html, render } from 'lit-html';
import { global_state } from './state.js';
import './main-header.js';
import './user-menu.js';

const style = html`
  <style>
    :host {
      /* "theme" colors, fonts, etc.
         -> move to base.css later    */
      --bg-floor: rgb(16,16,16);
      --bg-header: rgb(0,0,0);
      --header-bottom-line: rgb(20,20,20);
      --text: rgb(200,200,200);
      --bg-front: rgb(41,41,41);
      --bg-back: rgb(31,31,31);
      --border-back: rgb(24,24,24);
      font-family: Helvetica, sans-serif;

      background-color: var(--bg-floor);
      display: block;
      height: 100vh;
      overflow: auto;
      color: var(--text);
    }
    user-menu {
      float: right;
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
        <main-header @toggleusermenu=${(e) => this.update()}></main-header>
        ${ global_state.user.show_menu ?
          html`<user-menu></user-menu>` :
          html``}
      `
      , this.shadowRoot);
  }
}

customElements.define('reflect-app', ReflectApp);
