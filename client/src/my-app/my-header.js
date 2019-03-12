import {html, render} from 'lit-html';

const style = html`
  <style>
    :host {
      background-color: var(--bg-header);
      display: block;
      box-sizing: content-box;
      height: 48px;
      border-bottom: 1px solid var(--header-bottom-line);
    }
    #logo-box {
      width: 50px;
    }
    #logo {
      margin-left: auto;
      margin-right: auto;
      display: block;
      padding-top: 5px;
    }
  </style>
`;

class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const templ = html`${style}
      <div id="logo-box">
        <img id="logo" src="/layout/logo.png">
      </div>
    `;

    render(templ, this.shadowRoot);
  }
}

customElements.define('my-header', MyHeader);
