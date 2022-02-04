var defaults = require('../defaults')

module.exports = function dispatchRequest(config) {
  console.log('dispatchRequest', config)
  var adapter = defaults.adapter
  return adapter(config).then(function onAdapterResolution(response) {
    return response + ' gsdadapter'
  }, function onAdapterRejection(reason) {
    throw reason
  })

}