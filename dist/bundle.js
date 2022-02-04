var axios = (function () {
  'use strict';

  var enhanceError = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = {};
    return error;
  };

  var createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  var settle = function settle(resolve, reject, response) {
    console.log('response status', response.status);
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };

  var xhr = function xhrAdapter(config) {
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
      };
      //取消请求
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }
          request.abort();
          reject(cancel);
          request = null;
        });
      }
      request.send(requestData);
    })
  };

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      adapter = xhr;
    }
    return adapter;
  }
  var defaults = {
    gsd2: 'gsd2',
    adapter: getDefaultAdapter(),
  };
  var defaults_1 = defaults;

  var dispatchRequest = function dispatchRequest(config) {
    console.log('dispatchRequest', config);
    var adapter = defaults_1.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      return response + ' gsdadapter'
    }, function onAdapterRejection(reason) {
      throw reason
    })

  };

  function InterceptorManager() {
    this.handlers = [];
  }

  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1,
      response: new InterceptorManager_1,
    };
  }
  Axios.prototype.request = function request(config) {
    console.log('gsd1', config);
    var promise;
    promise = Promise.resolve(config);
    var requestInterceptorChain = [];
    this.interceptors.request.handlers.forEach(interceptor => {
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    console.log('requestInterceptorChain', requestInterceptorChain);
    var responseInterceptorChain = [];
    this.interceptors.response.handlers.forEach(interceptor => {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    console.log('responseInterceptorChain', responseInterceptorChain);
    var chain = [dispatchRequest, undefined];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    Array.prototype.push.apply(chain, responseInterceptorChain);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise
  };

  Axios.prototype.get = function request(config) {
    console.log('gsd1get', config);
  };
  Axios.prototype.getUri = function getUri(config) {
    console.log('gsd1getUri', config);
  };


  var Axios_1 = Axios;

  function extend(a, b, thisArg) {
    Object.keys(b).forEach(item => {
      a[item] = b[item];
    });
  }

  var utils = {
    extend: extend
  };

  function CancelToken(executor) {
    var resolvePromise;
    this.promise = new Promise(function (resolve) {
      resolvePromise = resolve;
    });
    executor(function (message) {
      //相当于html中的cancle等于下面这行
      resolvePromise('gsd 测试失败');
    });
  }

  var CancelToken_1 = CancelToken;

  function createInstance(defaultConfig) {
    console.log('gsd2', defaultConfig);
    var context = new Axios_1(defaultConfig);
    // TODO
    var instance = Axios_1.prototype.request.bind(context);
    //var instance = Axios.prototype.request
    //把axios原型上的东西全挂载到istance上面
    utils.extend(instance, Axios_1.prototype);
    utils.extend(instance, context);
    console.dir(instance);
    return instance
  }

  var axios = createInstance(defaults_1);
  axios.CancelToken = CancelToken_1;

  var axios_1 = axios;

  return axios_1;

})();
