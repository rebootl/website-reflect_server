import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {
      display: block;
      box-sizing: content-box;
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      color: var(--text-menu-inactive);
      font-size: 18px;
      font-weight: lighter;
    }
    :host(:hover) {
      cursor: pointer;
      background-color: var(--bg-menu-hover);
    }
    :host(.active) {
      color: var(--text-menu);
      background-color: var(--bg-menu-active);
      font-weight: normal;
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
