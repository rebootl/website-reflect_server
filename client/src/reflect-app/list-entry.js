import { html, render } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
const md = window.markdownit();
//const result = md.render('# markdown-it rulezz!');
// -> also https://github.com/commonmark/commonmark.js looks kinda nice,
//    used by https://github.com/intcreator/markdown-element

const style = html`
  <style>
    :host {
    }
    .listentry-header {
      color: var(--text-menu-inactive);
    }
    .listentry-body {
      margin: 15px 15px 15px 15px;
      padding-left: 50px;
      padding-right: 50px;
      border-left: 1px solid var(--text-menu-inactive);
    }
  </style>
`;

class ListEntry extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    //this.get_entries();
  }
  get entry() {
    return this._entry;
  }
  set entry(entry) {
    this._entry = entry;
    this.state_update();
  }
  state_update() {
    this.update();
  }
  update() {
    console.log(this.entry);
    const html_text = md.render(this.entry.content.text);
    console.log(html_text);
    render(html`${style}
      <small class="listentry-header">${this.entry.timestamp} entry_${this.entry.id}</small>
      <div class="listentry-body">${unsafeHTML(html_text)}</div>
      `, this.shadowRoot);
  }
}

customElements.define('list-entry', ListEntry);
