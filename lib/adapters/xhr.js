var settle = require('../core/settle')
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // resolve('gsd xhrAdapter')
    var requestData = config.data;
    var request = new XMLHttpRequest();
    function onloadend() {
      if (!request) {
        return;
      }
      var response = {
        data: request.response,
        status: request.status,
        statusText: request.statusText,
        headers: null,
        config: config,
        request: request
      };
      settle(resolve, reject, response);
      request = null;
    }
    request.open(config.method.toUpperCase(), config.url, true);
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      setTimeout(onloadend);
    }
    //取消请求
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }
        request.abort();
        reject(cancel);
        request = null;
      })
    }
    request.send(requestData);
  })
}
