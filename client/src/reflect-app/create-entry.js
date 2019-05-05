import { html, render } from 'lit-html';
import './gen-elements/text-input.js';

const style = html`
  <style>
    :host {
      display: block;
      box-sizing: content-box;
      padding: 5px 15px 25px 25px;
      border-bottom: 1px solid var(--border-back);
    }
    a {
      color: var(--link-text);
    }
    .inline {
      display: inline-block;
    }
  </style>
`;

class CreateEntry extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    //this.get_entries();
    this.update();
    const textinput_el = this.shadowRoot.querySelector('#new-entry');
    //console.log(textinput_el);
    textinput_el.onkeydown = this.inputchange;
  }
  submit() {
    console.log("submiiiiiiiiiit :P");
  }
  inputchange() {
    console.log("inputchaaaaaange :D");
    // -> debounce!!
    
  }
  update() {
    //<div >
    //</div>
    render(html`${style}
      <text-input id="new-entry" size="30" class="inline"
                  placeholder="New Entry...">></text-input>
      <labelled-button class="inline"
                       @click=${()=>this.submit()} label="Create"></labelled-button>
      `, this.shadowRoot);
  }
}

customElements.define('create-entry', CreateEntry);
