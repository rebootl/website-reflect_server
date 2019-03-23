import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {
      background-color: var(--bg-back);
      display: block;
      flex-shrink: 0;
      height: 200px;
    }
  </style>
`;

class MainMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.update();
  }
  update() {
    render(html`${style}

      `
      , this.shadowRoot);
  }
}

customElements.define('main-menu', MainMenu);
