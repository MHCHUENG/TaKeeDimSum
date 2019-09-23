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
    clearTimeout(this.getListDataErrorTimer);
    this.getListDataErrorTimer = setTimeout(() => {
      this.setData({
        isLoadError: true,
        isLoading: false,
      });
    }, 2000);
  },

  errorReload: function () {
    const app = getApp();
    if (!app.globalData.isConnected) return;

    this.getListData();
  },

  getListData: function () {
    const app = getApp();
    const APIs = app.globalData.APIs['articleList'];
    if (!APIs) {
      this.fetchError();
      return;
    };

    this.setData({
      isLoading: true,
      isLoadError: false
    });

    app.wxRequire({
      url: APIs
    }, this.setListData, this.fetchError);
  }
})
