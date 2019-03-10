import {html, render} from 'lit-html';

const style = html`
  <style>
    :host {
      --bg-floor: #343434;

      background-color: var(--bg-floor);
      display: block;
      height: 100vh;
      width: 100vw;
    }
  </style>
`;

class MyApp extends HTMLElement {
  constructor() {
    super();

    //const shadow = this.attachShadow({mode: 'open'});
    this.attachShadow({mode: 'open'});

    //const title = document.createElement('h1');
    //title.textContent =  "Hello Webcomponent! minchePog";
    //shadow.appendChild(title);

    const mytempl = (name) => html`${style}
      <h2>Hi ${name}</h2>
    `;

    render(mytempl('nomnomoootl'), this.shadowRoot);

  }
}

customElements.define('my-app', MyApp);
