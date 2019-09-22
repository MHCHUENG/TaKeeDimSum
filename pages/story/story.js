const app = getApp();

Page({
  data: {
    skeletonData: new Array(2),
    list: [],
    isLoading: true,
    isLoadError: false
  },

  onLoad: function () {
    this.getListData();
  },

  setListData: function (res) {
    this.setData({
      list: res.data,
      isLoading: false,
      isLoadError: false
    })
  },

  fetchError: function () {
    this.setData({
      isLoadError: true,
      isLoading: false,
    });
  },

  errorReload: function () {
    const app = getApp();
    console.log(app.globalData.isConnected)
    if (!app.globalData.isConnected) return;

    this.setData({
      isLoading: true,
      isLoadError: false
    });
    this.getListData();
  },

  getListData: function () {
    const APIs = app.globalData.APIs['articleList'] || '';
    if (!APIs) {
      this.fetchError();
      return;
    };

    app.wxRequire({
      url: APIs
    }, this.setListData, this.fetchError);
  }
})
