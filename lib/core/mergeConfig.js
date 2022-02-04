var utils = require('../utils')
module.exports = function mergeConfig(config1, config2) {
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];
  function getMergedValue(target, source) {
    return source;
  }
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }
  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys;
  // 筛选出不在 valueFromConfig2Keys 中的key
  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });
  utils.forEach(otherKeys, mergeDeepProperties);
  console.log('gsdaaa', config)
  return config;
}
