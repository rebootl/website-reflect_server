import {html, render} from 'lit-html';
import './my-header.js';

const style = html`
  <style>
    :host {
      --bg-floor: rgb(16,16,16);
      --bg-header: #000;
      --header-bottom-line: rgb(20,20,20);
      --text-color: rgb(200,200,200);

      background-color: var(--bg-floor);
      display: block;
      height: 100vh;
      /*width: 100vw;*/
      color: var(--text-color);
      font-family: Helvetica, sans-serif;
    }
  </style>
`;

class MyApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const mytempl = html`${style}
      <my-header><my-header>
    `;

    render(mytempl, this.shadowRoot);
  }
}

customElements.define('my-app', MyApp);
