const skeletonsConfig = require('../../config/skeletons.js');

Page({
  data: {
    skeletonData: skeletonsConfig.post,
    post: [],
    isLoading: true,
    isLoadError: false,
  },

  onLoad: function (query) {
    const { id } = query || {}
    this.id = id;
    this.getData(id);

    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onUnload: function () {
    this.setData({
      post: []
    })
  },

  errorReload: function () {
    const app = getApp();
    if (!app.globalData.isConnected) return;

    this.getData();
  },

  setPostData: function (res) {
    this.setData({
      post: res.data,
      isLoading: false,
      isLoadError: false,
    })
  },

  fetchError: function () {
    clearTimeout(this.getPostDataErrorTimer);
    this.getPostDataErrorTimer = setTimeout(() => {
      this.setData({
        isLoadError: true,
        isLoading: false,
      });
    }, 2000);
  },

  getPostData: function(url) {
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
    }, this.setPostData, this.fetchError);
  },

  getData: function (id) {
    id = id || this.id;
    if (!id) {
      this.fetchError();
      return;
    };

    const app = getApp();
    const APIs = app.globalData.APIs;

    if (APIs) {
      this.getPostData(APIs[id]);
      return;
    }

    app.getAPIsMap().then((res) => {
      if (!res || !res.data) {
        this.fetchError();
        return;
      }

      app.globalData.APIs = res.data;
      this.getPostData(res.data[id]);
    }).catch(() => {
      this.fetchError()
    });
  },

  setPreviewImage: function (current, urls) {
    if (!current || !urls || urls.length === 0) return

    wx.previewImage({
      current,
      urls
    })
  },

  tapImage: function (e) {
    const postList = this.data.post
    if (postList.length === 0) return

    const target = e.currentTarget
    const { dataset } = target || {}
    const { src } = dataset || {}
    let srcArr = []

    postList.forEach((item) => {
      if (item.type === 'image') {
        srcArr.push(item.src)
      }
    })

    this.setPreviewImage(src, srcArr)
  }
})
