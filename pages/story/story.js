Page({
  data: {
    skeletonData: new Array(2),
    list: [],
    isLoading: true,
    isLoadError: false
  },

  onLoad: function () {
    this.getData();

    wx.showShareMenu({
      withShareTicket: true
    });
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

    this.getData();
  },

  getListData: function (url) {
    if (!url) {
      this.fetchError();
      return;
    }

    this.setData({
      isLoading: true,
      isLoadError: false
    });

    const app = getApp();
    app.wxRequire({
      url
    }, this.setListData, this.fetchError);
  },

  getData: function () {
    const app = getApp();
    const APIs = app.globalData.APIs

    if (APIs) {
      this.getListData(APIs['articleList']);
      return;
    }

    app.getAPIsMap().then((res) => {
      if (!res || !res.data) {
        this.fetchError();
        return;
      }

      app.globalData.APIs = res.data;
      this.getListData(res.data['articleList']);
    }).catch(() => {
      this.fetchError()
    });
  }
})
