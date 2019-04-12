import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { topics_url } from './urls.js';
import './menuentry-topic.js';
import './menuentry-subtag.js';

const style = html`
  <style>
    :host {
      background-color: var(--bg-back);
      display: block;
      /* stub height */
      min-height: 100px;
    }
    ul {
      padding-left: 0;
      list-style: none;
    }
    #subtags {
    }
    #subtags ul {
      border-top: 1px solid var(--menu-line);
      padding-top: 16px;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    #subtags li {
      /*display: inline-block;*/
    }
  </style>
`;

class MainMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.topics = {};

    this.get_menuentries();
  }
  get_menuentries() {
    return fetch(topics_url).then(response => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      }).then(data => {
        //console.log(data);
        this.topics = data;
        this.update();
      }).catch(error => {
        console.log(error);
      });
  }
  toggle_topic(topic) {
    if (topic.active) {
      topic.active = false;
      topic.subtags.forEach(s => {
        s.active = false;
      });
    } else {
      this.topics.forEach(t => {
        t.active = false;
        t.subtags.forEach(s => s.active = false);
      });
      topic.active = true;
    }
    /*this.topics.forEach(t => {
      const selected = t === topic ? !t.active : false;
      t.active = selected;
      t.subtags.forEach(s => s.active = !selected);
    });*/
    /*this.topics.forEach(t => {
      //t.active = t.id === topic.id;
      //t.active = (t.id === topic.id) ? !t.active : false;
      //t.active = (t.id === topic.id && !t.active);
      if (t.id === topic.id) {
        if (t.active) {
          t.active = false;
          t.subtags.forEach(s => {
            s.active = false;
          })
        }
        else {
          t.active = true;
        }
      } else {
        t.active = false;
      }
    });*/
    this.update_url();
    this.update();
  }
  toggle_subtag(subtag) {
    subtag.active = !subtag.active;
    this.update_url();
    this.update();
  }
  update_url() {
    // generate url
    // format e.g. #entries?select=true&topic_id[]=3&tag_id[]=2&tag_id[]=3
    // elements:
    // #entries?select=true &topic_id[]=3 &tag_id[]=2 &tag_id[]=3
    let hash_url = "";
    if (this.topics.some(t => t.active)) {
      hash_url = "#entries?select=true";
      this.topics.filter(t => t.active).forEach(t => {
        console.log(t);
        hash_url += '&topic_id[]=' + t.id;
        t.subtags.filter(t => t.active).forEach(s => {
          hash_url += '&tag_id[]=' + s.id;
        });
      });
    } else {
      hash_url = "#entries";
    }
    // update it
    window.location.hash = hash_url;
  }
  gen_subtags_torender() {
    // make loop, could be multiple topics
    //const subtags_to_render = [];
    //this.topics.forEach(t => {
    //  if (t.active) {
    //    console.log(t);
    //    t.subtags.forEach(s => {
    //      subtags_torender.push(s);
    //    });
    //  }
    //});

    // improved version
    //const subtags_to_render = this.topics
    //  .filter(t => t.active)
    //  .map(t => t.subtags)
    //  .reduce((prev, next) => [...prev, ...next], []);
    // use flat instead
    //  .flat();
    const subtags_to_render = this.topics
      .filter(t => t.active)
      .flatMap(t => t.subtags);
    return subtags_to_render;
  }
  update() {
    const subtags_to_render = this.gen_subtags_torender();
    //  console.log(subtags_to_render);
    render(html`${style}
      <nav id="topics">
        <ul>${this.topics.map(topic => html`
          <li>
            <menuentry-topic id="topic-${topic.id}"
                             class="${ topic.active ? 'active' : ''}"
                             @click="${()=>this.toggle_topic(topic)}">
              ${topic.label}
            </menuentry-topic>
          </li>`)}
        </ul>
      </nav>
      <nav id="subtags">
        <ul>${repeat(subtags_to_render, subtag => subtag.id, subtag => html`
          <li>
            <menuentry-subtag id="subtag-${subtag.id}"
                              class="${ subtag.active ? 'active' : ''}"
                              @click=${() => this.toggle_subtag(subtag)}>
              ${subtag.label}
            </menuentry-subtag>
          </li>`)}
        </ul>
      </nav>`,
      this.shadowRoot);
  }
  //${subtags_to_render.length > 0 ? html`
  //` : ``}
}

customElements.define('main-menu', MainMenu);
