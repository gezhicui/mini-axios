var defaults = require('./defaults')
var Axios = require('./core/Axios')
var utils = require('./utils')

function createInstance(defaultConfig) {
  console.log('gsd2', defaultConfig)
  var context = new Axios(defaultConfig);
  // TODO
  var instance = Axios.prototype.request.bind(context)
  //var instance = Axios.prototype.request
  //把axios原型上的东西全挂载到istance上面
  utils.extend(instance, Axios.prototype)
  utils.extend(instance, context);
  console.dir(instance);
  return instance
}

var axios = createInstance(defaults);
axios.CancelToken = require('./cancel/CancelToken');

module.exports = axios
