'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: false });
  }

  prompting() {
    this.log(yosay(
      `Let's generate a ${chalk.green('Twig Component')} library!`
    ));

    const required = (input) => {
      if (!input.length) {
        return 'This value is required.';
      }
      return true;
    };

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Library name:',
        default: this.options.name,
        validate: required
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description (optional):'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Your full name:',
        validate: required
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    if (fs.existsSync(this.props.name)) {
      this.env.error(chalk.red(`The directory ${this.props.name} already exists`));
    }
    fs.mkdirSync(this.props.name);
    this.destinationRoot(this.destinationPath(this.props.name));

    this.fs.copyTpl(
      this.templatePath('base/'),
      this.destinationPath('./'),
      this.props
    );
  }

  install() {
    this.installDependencies({
      bower: false
    }).then(() => {
      this.log(chalk.green('Finished installing dependencies.'));
      this.log('Run ' + chalk.yellow(`cd ${this.props.name} && npm start`) + ' to see your library in action.');
    });
  }
};
