# Twig Component Webpack Generator

This project provides a Yeoman generator for new [Twig Component](https://github.com/mortenson/twig-components) libraries.

# Installation

```
npm install -g yo
npm install -g generator-twig-components-webpack
```

# Use

To generate a new component library, run `yo twig-components-webpack`.

# Adding new components to a library

Adding new components can be done by running `yo twig-components-webpack:add`
from the component library directory. This process is fully interactive, adding
new documentation, includes, and files for a basic Twig Component.

# Removing components from the library

To remove a component from the library, delete the source folder
(ex: `./proper-name`), then its imports and requires from `templates.js` and
`components.js`.

# More about the build 

Please read [the generated README.md](generators/app/templates/base/README.md)
for documentation for the generated component library.

# Todo

- [x] Create a sub-generator for adding new components
- [ ] Write test coverage
