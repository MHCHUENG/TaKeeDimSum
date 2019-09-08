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
  }
})