const app = getApp();

Page({
  data: {
    list: []
  },

  onLoad: function () {
    this.getListData();
  },

  getListData: function () {
    const _this = this;
    const APIs = app.globalData.APIs['articleList'];
    app.wxRequire({
      url: APIs
    }, function (res) {
      _this.setData({
        list: res.data
      })
    });
  }
})
