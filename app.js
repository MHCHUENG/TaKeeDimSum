App({
  onLaunch: function () {
    this.getAPIsMap();
  },

  getAPIsMap: function () {
    const _this = this
    wx.request({
      url: 'https://demo.missoy.me/TaKeeDimSum/json/api.json',
      success: function (res) {
        _this.globalData = {
          APIs: res.data
        }
      }
    });
  },

  globalData: {
    APIs: []
  },

  wxRequire: function (opt, success, fail) {
    if (!opt) return [];
    let ret = [];

    wx.request({
      ...opt,
      success: function (res) {
        if (typeof success !== 'function') return;
        success(res)
      },
      fail: function () {
        if (typeof fail !== 'function') return;
        fail()
      }
    });
  }
})