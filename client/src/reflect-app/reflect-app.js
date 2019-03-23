import { html, render } from 'lit-html';
import { global_state } from './global_state.js';
//import './router.js';
import './main-header.js';
import './main-menu.js';

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
    @media all and (min-width: 650px){
      #wrapper-container {
        display: flex;
        flex-wrap: wrap;
      }
      main-menu {
        width: 200px;
        margin-right: 10px;
      }
      #main-content-container {
        min-width: 425px;
        max-width: 650px;
        flex: 1;
      }
    }
    @media all and (min-width: 800px) {
      /* prevent lower box from moving up and
         squishing main-content to 450px */
      #main-content-container {
        min-width: 575px;
      }
    }
    @media all and (min-width: 880px) {
      #main-content-container {
        min-width: 650px;
      }
    }
    @media all and (min-width: 1090px) {
        #wrapper-container {
          justify-content: space-between;
        }
    }
    #main-content-container {
      background-color: var(--bg-front);
      height: 500px;
    }
    #spacer-right {
      height: 80px;
      min-width: 210px;
      /*flex: 1;*/
      border: 1px solid red;
    }
  </style>
`;

const routes = {
  'entries': (params) => html`<listed-entries params=${params}></listed-entries>`,
  'add-entry': () => html`<add-entry></add-entry>`,
  'edit-entry': () => html`<edit-entry></edit-entry>`,
  'edit-topic': () => html`<edit-topic></edit-topic>`,
};

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

    // listen for url changes
    window.addEventListener('hashchange', ()=>this.urlChange());
    window.addEventListener('load', ()=>this.urlChange());

    //this.update();
  }
  urlChange() {
    const hash_str = location.hash.slice(1) || '';
    let ref, params_str;
    if (hash_str.includes('?')) {
      [ ref, params_str ] = hash_str.split('?');
    } else {
      ref = hash_str;
      params_str = "";
    }
    if (!routes.ref) { ref = 'entries'; }
    this.routed_content = routes[ref](params_str);
    this.update();
  }
  update() {
    render(html`${style}
        <main-header></main-header>
        <div id="wrapper-container">
          <main-menu></main-menu>
          <div id="main-content-container">
            ${this.routed_content}
          </div>
          <div id="spacer-right"></div>
        </div>
      `
      , this.shadowRoot);
  }
}

customElements.define('reflect-app', ReflectApp);
