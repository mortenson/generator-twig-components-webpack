const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const ejs = require('ejs');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument('name', { type: String, required: false });
    this.argument('description', { type: String, required: false });
    this.argument('attributes', { type: String, required: false });
  }

  prompting() {
    if (!fs.existsSync('templates.js')) {
      this.env.error(chalk.red('No templates.js file found, please change directory to a Twig Components library and try again.'));
    }
    this.log(yosay(`Let's add a new ${chalk.green('Twig Component')}!`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Tag name (ex: my-component):',
        default: this.options.name,
        validate: (input) => {
          if (!input.length) {
            return 'This value is required.';
          }
          if (!input.match(/^[a-z0-9]+-[a-z0-9]+$/)) {
            return 'Invalid tag name given. Expected two alphanumeric lowercase words separated by a dash.';
          }
          if (fs.existsSync(input)) {
            return `The component directory ${chalk.yellow(input)} already exists.`;
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description (optional):',
        default: this.options.description,
      },
      {
        type: 'input',
        name: 'attributes',
        message: 'Attributes (comma separated):',
        default: this.options.attributes,
        validate: (input) => {
          const globalAttributes = [
            'accesskey',
            'class',
            'contenteditable',
            'contextmenu',
            'dir',
            'draggable',
            'dropzone',
            'hidden',
            'id',
            'lang',
            'spellcheck',
            'style',
            'tabindex',
            'title',
          ];
          if (!input.length) {
            return 'This value is required.';
          }
          const attributes = input.split(',');
          const errors = [];
          attributes.forEach((attribute) => {
            if (!attribute.match(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/)) {
              errors.push(`Invalid attribute ${chalk.red(attribute)} given. Expected lowercase alphanumeric string with optional interior dashes.`);
            } else if (globalAttributes.indexOf(attribute) !== -1 || attribute.match(/^on/)) {
              errors.push(`The attribute ${chalk.red(attribute)} is reserved in the HTML specification.`);
            }
          });
          return errors.length ? errors.join('\n') : true;
        },
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
      this.props.attributes = props.attributes.split(',');
      this.props.className = props.name.replace(/\w[^-]*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()).replace('-', '');
    });
  }

  writing() {
    ['js', 'scss', 'twig'].forEach((extension) => {
      this.fs.copyTpl(
        this.templatePath(`component/component.${extension}`),
        this.destinationPath(`./${this.props.name}/${this.props.name}.${extension}`),
        this.props,
      );
    });
    ['index.html'].forEach((file) => {
      if (fs.existsSync(file)) {
        const template = this.fs.read(this.templatePath(file));
        const replacement = ejs.render(
          template,
          this.props,
        );
        const original = this.fs.read(file);
        if (original.match(/[^\n]+generator-placeholder[^\n]+/)) {
          const replaced = original.replace(/[^\n]+generator-placeholder[^\n]+/, replacement);
          this.fs.write(file, replaced);
        }
      }
    });
  }

  install() {
    this.log(`Finished adding the ${chalk.green(this.props.name)} component.`);
    this.log(`Run ${chalk.yellow('npm start')} to start development.`);
    this.log(chalk.green('Enjoy!'));
  }
};
