const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');

describe('generator:add', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/add'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../generators/app/templates/base'), dir)
        })
        .withPrompts({
          name: 'my-component',
          description: 'A sweet component',
          attributes: 'foo,bar',
        })
    });

    it('app template was copied correctly', () => {
      assert.file([
        'components.js',
        'index.html',
        'templates.js',
      ]);
    });

    it('new component created', () => {
      assert.file([
        'my-component/my-component.js',
        'my-component/my-component.twig',
        'my-component/my-component.scss',
      ]);
    });

    it('fills new component with correct information', () => {
      assert.fileContent('my-component/my-component.js', 'MyComponent');
      assert.fileContent('my-component/my-component.twig', '{{ foo }} {{ bar }}');
    });

    it('fills exisiting files with correct information', () => {
      assert.fileContent('components.js', "import MyComponent from './my-component/my-component'");
      assert.fileContent('index.html', 'my-component');
      assert.fileContent('templates.js', "'my-component': require('./my-component/my-component.twig'),");
    });
  });
});
