
var dispatchRequest = require('./dispatchRequest')
var InterceptorManager = require('./InterceptorManager')
var mergeConfig = require('../core/mergeConfig')
var utils = require('../utils')
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager,
    response: new InterceptorManager,
  }
}
Axios.prototype.request = function request(config) {
  console.log('gsd1', config)
  var promise;
  promise = Promise.resolve(config);
  var requestInterceptorChain = [];
  this.interceptors.request.handlers.forEach(interceptor => {
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  })
  console.log('requestInterceptorChain', requestInterceptorChain)
  var responseInterceptorChain = [];
  this.interceptors.response.handlers.forEach(interceptor => {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  })
  console.log('responseInterceptorChain', responseInterceptorChain)
  var chain = [dispatchRequest, undefined];
  Array.prototype.unshift.apply(chain, requestInterceptorChain);
  Array.prototype.push.apply(chain, responseInterceptorChain);
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise
}

// Axios.prototype.get = function request(config) {
//   console.log('gsd1get', config)
// }
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
})


Axios.prototype.getUri = function getUri(config) {
  console.log('gsd1getUri', config)
}


module.exports = Axios
