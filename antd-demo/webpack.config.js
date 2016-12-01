
module.exports = function(webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);
  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.test = /\.dont\.exist\.file/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.test = /\.less$/;
    }
  });
  return webpackConfig;
};
