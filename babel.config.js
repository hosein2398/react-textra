module.exports = {
  presets: [['@babel/preset-env', {
    // Error in Async Example: ReferenceError: regeneratorRuntime is not defined
    targets: {
      node: '10'
    }
  }], '@babel/preset-typescript', '@babel/preset-react']
}
