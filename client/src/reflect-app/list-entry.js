import { html, render } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
const md = window.markdownit().use(window.markdownitEmoji);
// add twemojis
// (attribution req.)
md.renderer.rules.emoji = (token, idx) => {
  return twemoji.parse(token[idx].content);
};
// -> also https://github.com/commonmark/commonmark.js looks kinda nice,
//    used by https://github.com/intcreator/markdown-element

const style = html`
  <style>
    :host {
    }
    .listentry-header {
      font-size: 0.8em;
      color: var(--text-inactive);
    }
    .listentry-body {
      margin: 15px 15px 15px 15px;
      padding-left: 50px;
      padding-right: 50px;
      border-left: 1px solid var(--text-inactive);
      /*font-size: 18px;*/
      line-height: 1.5em;
    }
    .emoji {
      height: 1.5em;
      vertical-align: middle;
    }
    a {
      color: var(--link-text);
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
    render(html`${style}
      <small class="listentry-header">${this.entry.timestamp}
        <a href="#entry?id=${this.entry.id}">#entry?id=${this.entry.id}</a>
      </small>
      <div class="listentry-body">${unsafeHTML(md.render(this.entry.content.text))}</div>
      `, this.shadowRoot);
  }
}

customElements.define('list-entry', ListEntry);
