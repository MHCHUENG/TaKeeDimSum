const app = getApp();

Page({
  data: {
    skeletonData: new Array(3),
    list: [],
    isLoading: true,
  },

  onLoad: function () {
    this.isFetchError = false;
    this.getListData();
  },

  onShow: function () {
    if (this.isFetchError) {
      this.isFetchError = false;
      this.getListData();
    }
  },

  setListData: function (res) {
    this.setData({
      list: res.data,
      isLoading: false,
    })
  },

  fetchError: function () {
    this.isFetchError = true;
  },

  getListData: function () {
    const APIs = app.globalData.APIs['articleList'] || '';
    app.wxRequire({
      url: APIs
    }, this.setListData, this.fetchError);
  }
})
