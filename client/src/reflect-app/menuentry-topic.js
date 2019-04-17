import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {
      display: block;
      box-sizing: content-box;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      color: var(--text-menu-inactive);
      font-size: 18px;
    }
    :host(:hover) {
      cursor: pointer;
      background-color: var(--bg-menu-hover);
    }
    :host(.active) {
      color: var(--text);
      background-color: var(--bg-menu-hover);
    }
  </style>
`;

class MenuentryTopic extends HTMLElement {
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

customElements.define('menuentry-topic', MenuentryTopic);
