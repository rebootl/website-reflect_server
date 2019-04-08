import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {
      background-color: var(--bg-back);
      display: block;
      box-sizing: content-box;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      color: var(--text-menu-inactive);
    }
    :host(:hover) {
      cursor: pointer;
      background-color: var(--bg-menu-hover);
    }
    :host(.active) {
      color: var(--text);
      /*background-color: var(--bg-menu-active);*/
    }
  </style>
`;

class TopicMenuentry extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    //this.props = {};
    console.log(this);
    //console.log(this.props);
    //this.update();
  }
  connectedCallback() {
    //console.log('Custom square element added to page.');
    //console.log(this.props);
    console.log(this.getAttribute('label'));
    this.update();
  }
  update() {
    //console.log(this.props);
    render(html`${style}
      ${this.getAttribute('label')}
      `
      , this.shadowRoot);
  }
}

customElements.define('topic-menuentry', TopicMenuentry);
