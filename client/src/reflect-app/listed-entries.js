import { html, render } from 'lit-html';
import { entries_url } from './urls.js';

const style = html`
  <style>
    :host {

    }
  </style>
`;

class ListedEntries extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.get_entries();
  }
  get_entries() {
    //let entries;
    return fetch(entries_url).then(response => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      }).then(data => {
        //console.log(data);
        this.entries = data;
        this.update();
      }).catch( (error) => {
        console.log(error);
      });
  }
  update() {
    render(html`${style}

      `
      , this.shadowRoot);
  }
}

customElements.define('listed-entries', ListedEntries);
