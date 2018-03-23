[![npm](https://img.shields.io/npm/v/generator-twig-components-webpack.svg)]() [![Build Status](https://travis-ci.org/mortenson/generator-twig-components-webpack.svg?branch=master)](https://travis-ci.org/mortenson/generator-twig-components-webpack)

# Twig Components: Webpack Generator

This project provides a Yeoman generator for new [Twig Component](https://github.com/mortenson/twig-components) libraries.

# Installation

```
npm install -g yo
npm install -g generator-twig-components-webpack
```

# Use

To generate a new component library, run `yo twig-components-webpack`.

If you prefer to use [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b), run `npx -p yo -p generator-twig-components-webpack yo twig-components-webpack`.

# Adding new components to a library

Adding new components can be done by running `yo twig-components-webpack:add`
from the component library directory. This process is fully interactive, adding
new documentation, includes, and files for a basic Twig Component.

# Removing components from the library

To remove a component from the library, delete the source folder
(ex: `./src/components/proper-name`), then any documentation from `index.html`.

If you wrote tests for this component, they will also need to be removed from
`test/base.html`.

# Test coverage included in library

Test coverage is provided by default in generated libraries, using [web-component-tester](https://github.com/Polymer/web-component-tester).

The default test for the `proper-name` element is located in `test/base.html`.
A default `.travis.yml` file is also provided and should work out of the box.

New coverage is not added automatically with `yo twig-components-webpack:add`,
so you'll have to add it yourself. Documentation for web-component-tester is
quite good, but if you have any questions feel free to file an issue.

# More about the build

Please read [the generated README.md](generators/app/templates/base/README.md)
for documentation for the generated component library.

# Running tests

You can run tests for this project with `npm run test`. Tests are located in
the `__tests__` directory, and written with the Yeoman test helper packages.
See the [Yeoman documentation](http://yeoman.io/authoring/testing.html) for
more information about writing tests.

# Todo

- [x] Create a sub-generator for adding new components
- [x] Write test coverage
- [x] Add test coverage to generated library
