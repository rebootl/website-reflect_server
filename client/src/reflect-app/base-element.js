import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {
      background-color: var(--bg-front);
      display: block;
      box-sizing: content-box;
    }
  </style>
`;

class BaseElement extends HTMLElement {
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

customElements.define('base-element', BaseElement);
