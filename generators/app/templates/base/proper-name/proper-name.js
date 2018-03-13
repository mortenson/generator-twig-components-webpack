import TwigBase from 'twig-components/twig-base';

export default class ProperName extends TwigBase {
  static get observedAttributes() {
    return ['first', 'middle', 'last', 'suffix'];
  }

  renderTemplate(variables) {
    return require('./proper-name.twig')(variables);
  }
}

if (!window.customElements.get('proper-name')) {
  window.customElements.define('proper-name', ProperName);
}
