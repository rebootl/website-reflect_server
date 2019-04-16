import { html, render } from 'lit-html';
import { Router } from './router.js';
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
  'entries': (params) => html`<listed-entries .params=${params}></listed-entries>`,
  //'add-entry': (a) => html`<add-entry></add-entry>`,
  //'edit-entry': (a) => html`<edit-entry></edit-entry>`,
  //'edit-topic': (a) => html`<edit-topic></edit-topic>`,
};

class MainContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    Router.register(this);
  }
  router_load(url_state_obj) {
    this.router_update(url_state_obj);
  }
  router_update(url_state_obj) {
    if (routes.hasOwnProperty(url_state_obj.route)) {
      this.routed_content = routes[url_state_obj.route](url_state_obj.params);
    } else {
      this.routed_content = html`route not found :(`;
    }
    this.update();
  }
  update() {
    render(html`${style}
        ${this.routed_content}
      `, this.shadowRoot);
  }
}

customElements.define('main-content', MainContent);
