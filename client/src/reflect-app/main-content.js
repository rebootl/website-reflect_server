import { html, render } from 'lit-html';
import './listed-entries.js';

const style = html`
  <style>
    :host {
      background-color: var(--bg-front);
      display: block;
      box-sizing: content-box;
      height: 300px;
    }
  </style>
`;

const routes = {
  'entries': (params) => html`<listed-entries params=${params}></listed-entries>`,
  'add-entry': (a) => html`<add-entry></add-entry>`,
  'edit-entry': (a) => html`<edit-entry></edit-entry>`,
  'edit-topic': (a) => html`<edit-topic></edit-topic>`,
};

class MainContent extends HTMLElement {
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
      // -> extract params from params_str
      
    } else {
      ref = hash_str;
      params_str = "";
    }
    console.log(ref);
    if (!routes.hasOwnProperty(ref)) {
      console.log('route not found, using "entries"');
      ref = 'entries';
    }
    this.routed_content = routes[ref](params_str);
    this.update();
  }
  update() {
    render(html`${style}
        ${this.routed_content}
      `
      , this.shadowRoot);
  }
}

customElements.define('main-content', MainContent);
