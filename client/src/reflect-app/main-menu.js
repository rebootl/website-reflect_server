import { html, render } from 'lit-html';
import { topics_url } from './urls.js';
import './topic-menuentry.js';

const style = html`
  <style>
    :host {
      background-color: var(--bg-back);
      display: block;
      /* stub height */
      height: 100px;
    }
  </style>
`;

class MainMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.topics = {};

    this.get_menuentries();
    //this.update();
  }
  get_menuentries() {
    fetch(topics_url)
      .then( (response) => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      })
      .then( (data) => {
        console.log(data);
        this.topics = data;
        this.update();
      })
      .catch( (error) => {
        console.log(error);
      });
  }
  toggle_topic() {
    console.log("click");
  }
  update() {
    render(html`${style}
        <nav id="topics">
          <ul>${this.topics.map( (topic) => html`
            <li>
              <topic-menuentry id="topic-${topic.id}"
                .props=${topic.label}
                               @click=${(e)=>this.toggle_topic(e.topic_id)}>
              </topic-menuentry>
            </li>
            `)}
          </ul>
        </nav>
        <nav id="subtags">
        </nav>
      `
      , this.shadowRoot);
  }
}

customElements.define('main-menu', MainMenu);
