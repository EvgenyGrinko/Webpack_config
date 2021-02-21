**npx webpack** - to run Webpack manually<br/>

`webpack-cli`- enables to use Webpack commands from the terminal

# Plugins

**plugin** - is an additional functionality, represented with class, which we can add to Webpack.

`html-webpack-plugin` - for automatic import of the index.html file with scripts.</br>
`clean-webpack-plugin` - to clean up automatically the 'dist' folder after builds.<br/>
`copy-webpack-plugin` - to copy static files (like favicon) or entire folders to the build directory.<br/>
`mini-css-extract-plugin` - to create a separate file for all css (without "style" section in the head)

# Loaders

__loader__ - allows Webpack to work with different file types (besides `.js` and `.json`), e.g. `.css`

`css-loader` - allows Webpack to understand import of `.css` files.<br/>
`style-loader` - allows Webpack to import styles to the header section of the `import.html`<br/>
`file-loader` - DEPRECATED since v5 - allows to use in the app files with different extensions 