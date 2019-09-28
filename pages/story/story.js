Page({
  data: {
    skeletonData: new Array(3),
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

  fetchError: function () {
    this.setData({
      isLoadError: true,
      isLoading: false,
    });
  },

  errorReload: function () {
    this.getData();
  },

  setListData: function (res) {
    let nextList = [];
    res.data.forEach((item) => {
      const { isHide } = item || {};
      if (isHide) return;
      nextList.push(item);
    });

    this.setData({
      list: nextList,
      isLoading: false,
      isLoadError: false
    })
  },

  getData: function () {
    const app = getApp();
    if (!app.isConnected) {
      this.fetchError();
      return;
    }

    this.setData({
      isLoading: true,
      isLoadError: false
    });

    const db = wx.cloud.database();
    db.collection('story').limit(10).get().then((res) => {
      this.setListData(res)
    }).catch(() => {
      this.fetchError();
    });
  }
})
