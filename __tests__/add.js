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
        'index.html',
      ]);
    });

    it('new component created', () => {
      assert.file([
        'src/components/my-component/my-component.js',
        'src/components/my-component/my-component.twig',
        'src/components/my-component/my-component.scss',
      ]);
    });

    it('fills new component with correct information', () => {
      assert.fileContent('src/components/my-component/my-component.js', 'MyComponent');
      assert.fileContent('src/components/my-component/my-component.twig', '{{ foo }} {{ bar }}');
    });

    it('fills exisiting files with correct information', () => {
      assert.fileContent('index.html', 'my-component');
    });
  });
});
