import TwigBase from 'twig-components/twig-base';

export default class <%= className %> extends TwigBase {
  static get observedAttributes() {
    return <%- JSON.stringify(attributes).replace(/"/g, "'").replace(/,/g, ', ') %>;
  }

  getTemplate() {
    return require('./<%= name %>.twig');
  }
}
