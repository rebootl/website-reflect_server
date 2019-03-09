import {html, render} from 'lit-html';

console.log('Hello rollup');

class MyApp extends HTMLElement {
  constructor() {
    super();

    //const shadow = this.attachShadow({mode: 'open'});
    this.attachShadow({mode: 'open'});

    //const title = document.createElement('h1');
    //title.textContent =  "Hello Webcomponent! minchePog";

    //shadow.appendChild(title);

    const mytempl = (name) => html`<h2>Hi ${name}</h2>`;

    render(mytempl('FOOOT'), this.shadowRoot);

  }
}

customElements.define('my-app', MyApp);
