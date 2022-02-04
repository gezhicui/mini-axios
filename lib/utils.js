var toString = Object.prototype.toString;

function extend(a, b, thisArg) {
  Object.keys(b).forEach(item => {
    a[item] = b[item]
  })
}

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i]);
    }
  }
}


function isUndefined(val) {
  return typeof val === 'undefined';
}

module.exports = {
  extend: extend,
  forEach: forEach,
  isUndefined: isUndefined
}
