Page({
  data: {
    skeletonData: new Array(2),
    list: [],
    isLoading: true,
    isLoadError: false
  },

  onShareAppMessage: function() {
    return {
      title: "百年傳承，匠心打造，德心經營，始記初心"
    }
  },

  onLoad: function () {
    this.getData();

    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onUnload: function () {
    this.setData({
      list: []
    })
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
