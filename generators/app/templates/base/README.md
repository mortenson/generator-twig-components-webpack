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

# Running the build

To execute the entire Webpack build, run `npm run build`.

This should generate these files:

- `dist/components.js` - The components transpiled to ES5, _without_ any
polyfills or the Twig.js library. This is useful if one page includes multiple
component libraries.
- `dist/components.bundled.js` - The components transpiled to ES5, _with_
Twig.js and the polyfills included. You should be able to include this on
any HTML page.
- `dist/templates.js` - A Node compatible module that exports an object mapping
tag names to Twig templates. This is useful for server side rendering in Node.
- `dist/templates.json` - A JSON file mapping tag names to Twig templates. This
is useful for server side rendering in PHP.
