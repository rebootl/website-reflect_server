import { html, render } from 'lit-html';

const style = html`
  <style>
    :host {
      background-color: var(--bg-back);
      display: block;
      box-sizing: content-box;
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
    this.update();
  }
  connectedCallback() {
    //console.log('Custom square element added to page.');
    //console.log(this.props);
  }
  update() {
    //console.log(this.props);
    render(html`${style}

      `
      , this.shadowRoot);
  }
}

customElements.define('topic-menuentry', TopicMenuentry);
