# <%= name %>

<%= description %>

# Getting started

To run a local webserver that shows how these components can be used, run
`npm install && npm start`.
 
# Including components on your site

To use these components on your site, include `dist/components.bundled.js` on
the page and any of the included component tags. For example:

```html
<html>
  <head>
    <script src="./<%= name %>/components.bundled.js"></script>
  </head>
  <body>
    <proper-name first="Bill" middle="Stanley" last="Preston" suffix="Esquire"></proper-name>
  </body>
</html>
```

Should render the `proper-name` tag.

If you prefer to manage polyfills and the Twig.js library yourself, you can
include `components.js`.

# Running the build

To execute the entire production Webpack build, run `npm run build`.

# Running tests

Tests are written with the [web-component-tester](https://github.com/Polymer/web-component-tester)
package.

Before running tests, you'll need to setup your local environment:

1. Ensure Java is available in your `PATH`
1. Run `npm install -g bower rollup web-component-tester`

After all dependencies have been installed, run `npm test`.
