import { html, render } from 'lit-html';

const style = html`
  <style>
    input {
      background-color: var(--bg-back);
      border: 1px solid var(--border-back);
      padding-left: 10px;
      height: 2em;
      color: var(--text);
      margin-bottom: 15px;
    }
  </style>
`;

class TextInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update();
  }
  update() {
    render(html`${style}
      <input id="${this.getAttribute('id')}" type="text" size="10"
             placeholder="${this.getAttribute('placeholder')}">`
      , this.shadowRoot);
  }
}

customElements.define('text-input', TextInput);
