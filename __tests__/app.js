const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator:app', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'my-library',
          description: 'A great Twig library',
          author: 'Lorem Ipsumstein',
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'my-library');
    });

    it('creates files', () => {
      const expected = [
        '.gitignore',
        '.travis.yml',
        'wct.conf.json',
        '_settings.scss',
        'components.js',
        'index.html',
        'package.json',
        'README.md',
        'templates.js',
        'webpack.config.js',
        'proper-name/proper-name.js',
        'proper-name/proper-name.scss',
        'proper-name/proper-name.twig',
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      assert.JSONFileContent('package.json', {
        name: 'my-library',
        description: 'A great Twig library'
      });
    });

    it('fills README.md with correct information', () => {
      assert.fileContent('README.md', '# my-library');
      assert.fileContent('README.md', 'A great Twig library');
    });

    it('fills index.html with correct information', () => {
      assert.fileContent('index.html', '<h1>my-library</h1>');
      assert.fileContent('index.html', '<p>A great Twig library</p>');
    });
  });
});
