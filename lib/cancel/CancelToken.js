function CancelToken(executor) {
  var resolvePromise;
  this.promise = new Promise(function (resolve) {
    resolvePromise = resolve;
  });
  executor(function (message) {
    //相当于html中的cancle等于下面这行
    resolvePromise('gsd 测试失败')
  })
}

module.exports = CancelToken
