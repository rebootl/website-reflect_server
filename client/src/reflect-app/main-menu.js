import { html, render } from 'lit-html';
import { topics_url } from './urls.js';
import './topic-menuentry.js';

const style = html`
  <style>
    :host {
      background-color: var(--bg-back);
      display: block;
      /* stub height */
      min-height: 100px;
    }
    #topics ul {
      padding-left: 0;
      list-style: none;
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
  toggle_topic(topic_el) {
    //slowelin Today at 3:49 AM
    const num_int = parseInt(topic_el.getAttribute('id-num'));
    this.topics.forEach(t => {
        t.active = (t.id === num_int) ? !t.active : false;
      });
    this.gen_subtags_listhtml();
    this.update();
  }
  gen_subtags_listhtml() {
    // make loop, could be multiple topics
    this.subtags_lihtml = [];
    this.topics.forEach(t => {
      if (t.active) {
        t.subtags.forEach(s => {
          this.subtags_lihtml.push(html`<li>${s.label}</li>`);
          console.log(s.label);
        });
      }
    });
  }
  update() {
    //gen_subtags_listhtml();
    render(html`${style}
        <nav id="topics">
          <ul>${this.topics.map( (topic) => html`
            <li>
              <topic-menuentry id="topic-${topic.id}"
                               class="${ topic.active ? 'active' : ''}"
                               id-num="${topic.id}"
                               label="${topic.label}"
                               @click=${(e)=>this.toggle_topic(e.target)}>
              </topic-menuentry>
            </li>
            `)}
          </ul>
        </nav>
        <nav id="subtags">
          <ul>
            ${this.subtags_lihtml}
          </ul>
        </nav>
      `
      , this.shadowRoot);
  }
}

customElements.define('main-menu', MainMenu);
