import { html, render } from 'lit-html';

const style = html`
  <style>
    button {
      background-color: var(--bg-back);
      color: var(--text);
      border: 1px solid var(--border-back);
      padding: 5px 15px 5px 15px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
`;

class FormButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.update();
  }
  update() {
    render(html`${style}
        <button>Login</button>`
      , this.shadowRoot);
  }
}

customElements.define('form-button', FormButton);
