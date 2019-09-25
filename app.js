App({
  onLaunch: function () {
    wx.onNetworkStatusChange(function(res) {
      this.globalData.isConnected = res.isConnected
    }.bind(this));
  },

  getAPIsMap: function () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://demo.missoy.me/TaKeeDimSum/json/api.json',
        success: function (res) {
          resolve(res);
        },
        fail: function () {
          reject();
        }
      });
    })
  },

  globalData: {
    APIs: null,
    isConnected: true
  },

  wxRequire: function (opt, success, fail) {
    if (!opt) return [];
    let ret = [];

    wx.request({
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (typeof success !== 'function') return;
        success(res);
      },
      fail: function () {
        if (typeof fail !== 'function') return;
        fail();
      },
      ...opt,
    });
  }
})