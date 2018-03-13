import TwigBase from 'twig-components/twig-base';

export default class <%= className %> extends TwigBase {
  static get observedAttributes() {
    return <%- JSON.stringify(attributes).replace(/"/g, "'").replace(/,/g, ', ') %>;
  }

  renderTemplate(variables) {
    return require('./<%= name %>.twig')(variables);
  }
}

if (!window.customElements.get('<%= name %>')) {
  window.customElements.define('<%= name %>', <%= className %>);
}
