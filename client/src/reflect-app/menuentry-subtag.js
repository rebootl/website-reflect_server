import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {
      display: block;
      box-sizing: content-box;
      /*height: 30px; --> 25px maybe
      line-height: 30px;*/
      padding: 10px 7px 10px 7px;
      border: 1px solid var(--menu-line);
      border-radius: 9px;
      margin: 7px 5px 7px 5px;
      color: var(--text-menu-inactive);
      font-weight: lighter;
    }
    :host(:hover) {
      cursor: pointer;
      background-color: var(--bg-menu-hover);
    }
    :host(.active) {
      background-color: var(--bg-menu-hover);
      color: var(--text-menu);
      font-weight: normal;
    }
  </style>
`;

class MenuentrySubtag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.update();
  }
  update() {
    render(html`${style}
      <slot></slot>`,
      this.shadowRoot);
  }
}

customElements.define('menuentry-subtag', MenuentrySubtag);
