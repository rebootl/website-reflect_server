import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {

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

      `
      , this.shadowRoot);
  }
}

customElements.define('reflect-app', ReflectApp);
