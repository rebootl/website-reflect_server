import {html, render} from 'lit-html';
import './my-header.js';

const style = html`
  <style>
    :host {
      --bg-floor: #101010;
      --bg-header: #000;
      --header-bottom-line: #101010;

      background-color: var(--bg-floor);
      display: block;
      height: 100vh;
      /*width: 100vw;*/
    }
  </style>
`;

class MyApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const mytempl = (name) => html`${style}
      <my-header><my-header>
    `;

    render(mytempl('nomnomoootl'), this.shadowRoot);
  }
}

customElements.define('my-app', MyApp);
