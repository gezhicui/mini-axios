function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    adapter = require('./adapters/xhr');
  } else {
    //浏览器不支持xhr
  }
  return adapter;
}
var defaults = {
  gsd2: 'gsd2',
  adapter: getDefaultAdapter(),
}
module.exports = defaults;
