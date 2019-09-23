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
    this.getPostData(id);
  },

  errorReload: function () {
    const app = getApp();
    if (!app.globalData.isConnected) return;

    this.getPostData();
  },

  getDataPostSuccess: function (res) {
    this.setData({
      post: res.data,
      isLoading: false,
      isLoadError: false,
    })
  },

  getPostDataError: function () {
    clearTimeout(this.getPostDataErrorTimer);
    this.getPostDataErrorTimer = setTimeout(() => {
      this.setData({
        isLoadError: true,
        isLoading: false,
      });
    }, 2000);
  },

  getPostData: function (id) {
    id = id || this.id;
    if (!id) {
      this.getPostDataError();
      return;
    };

    const app = getApp();
    const postAPI = app.globalData.APIs[id];
    if (!postAPI) {
      this.getPostDataError();
      return;
    };
    
    this.setData({
      isLoading: true,
      isLoadError: false
    });

    app.wxRequire({
      url: postAPI
    }, this.getDataPostSuccess, this.getPostDataError);
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
