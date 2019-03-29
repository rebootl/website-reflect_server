import { html, render } from 'lit-html';
import { global_state } from './global_state.js';
//import './router.js';
import './main-header.js';
import './main-menu.js';
import './main-content.js';

const style = html`
  <style>
    :host {
      /* "theme" colors, fonts, etc.
         -> evtl. move to base.css later    */
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
    #wrapper-container {
      display: grid;
      grid-template-columns: 100%;
      grid-template-areas:
        "main-menu"
        "add-box"
        "main-content";
    }
    main-menu {
      grid-area: main-menu;
      /*border: 1px solid red;*/
    }
    #add-box {
      grid-area: add-box;
      height: 50px;
      border: 1px solid blue;
    }
    main-content {
      grid-area: main-content;
    }
    @media all and (min-width: 650px) {
      #wrapper-container {
        grid-template-columns: 200px auto;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
          "main-menu  main-content"
          "add-box    main-content"
          ".          main-content";
      }
      main-content {
        max-width: 650px;
      }
    }
    @media all and (min-width: 870px) {
      #wrapper-container {
        grid-gap: 10px;
      }
    }
    @media all and (min-width: 1082px) {
      /* 1070px + 12px scrollbar */
      #wrapper-container {
        grid-template-columns: 200px auto 200px;
        grid-template-areas:
          "main-menu  main-content  add-box";
      }
      main-content {
        width: 650px;
        justify-self: center;
      }
    }
  </style>
`;

/* handle params in subcomp.
const params = new URLSearchParams(params_str);
for (let p of params) {
  console.log(p);
}
console.log(params.getAll('foo'));
*/

class ReflectApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.update();
  }
  update() {
    render(html`${style}
        <main-header></main-header>
        <div id="wrapper-container">
          <main-menu></main-menu>
          <div id="add-box"></div>
          <main-content></main-content>
        </div>
      `
      , this.shadowRoot);
  }
}

customElements.define('reflect-app', ReflectApp);
