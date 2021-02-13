**npx webpack** - to run webpack manually<br/>

`webpack-cli`- enables to use webpack commands from the terminal

# Plugins

**plugin** - is an additional functionality, represented with class, which we can add to Webpack.

`html-webpack-plugin` - for automatic import of the index.html file with scripts.</br>
`clean-webpack-plugin` - to clean up automatically the 'dist' folder after builds

# Loaders

__loader__ - allows webpack to work with different file types (besides `.js` and `.json`), e.g. `.css`

`css-loader` - allows webpack to understand import of `.css` files.<br/>
`style-loader` - allows webpack to import styles to the header section of the `import.html`