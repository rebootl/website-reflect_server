import { html, render } from 'lit-html';
import './gen-elements/text-input.js';

const style = html`
  <style>
    :host {
      display: block;
      box-sizing: border-box;
      padding: 5px 15px 5px 25px;
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
/*
let timeout = 0;
function debounce(f, t) {
 window.clearTimeout(timeout);
 timeout  = window.setTimeout(f, t);
}
*/
//let timeout;
function debounce(f, t) {
  let timeout = 0;
  return function (f, t) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(f, t);
  }
}
// from: https://stackoverflow.com/questions/27078285/simple-throttle-in-js
function throttle(func, delay=500) {
  //console.log("throttle :D:D:D");
  let timeout = null;
  return function() {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call();
        timeout = null;
      }, delay);
    }
  }
}
const inputchange_deb = () => console.log("debounced :D");
class CreateEntry extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.det_type_str = "";
    this.update();
    // setup type detection
    const detect_type_throttled = throttle(() => this.detect_type(), 1000);
    const textinput_el = this.shadowRoot.querySelector('#new-entry');
    textinput_el.onkeydown = () => {
      this.detect_type_pending();
      detect_type_throttled();
    }
  }
  submit() {
    console.log("submiiiiiiiiiit :P");
  }
  detect_type_pending() {
    // (call throttled!!)
    console.log("inputchaaaaaange :D")
    //throttle(() => this.inputchange_throttled(), 1000);
    // -> detect inputtype
    // -> submit request
  }
  detect_type() {
    console.log("throttled :D");
  }
  update() {
    //<div >
    //</div>
    render(html`${style}
      <text-input id="new-entry" size="30" class="inline"
                  placeholder="New Entry...">></text-input>
      <labelled-button class="inline"
                       @click=${()=>this.submit()} label="Create"></labelled-button><br>
      <small class="typedetect">Type: ...</small>
      `, this.shadowRoot);
  }
}

customElements.define('create-entry', CreateEntry);
