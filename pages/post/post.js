const skeletonsConfig = require('../../config/skeletons.js');
const app = getApp();

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

    this.setData({
      isLoading: true,
      isLoadError: false
    });
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
    this.setData({
      isLoadError: true,
      isLoading: false,
    });
  },

  getPostData: function (id) {
    id = id || this.id;
    if (!id) {
      this.getPostDataError();
      return;
    };

    const postAPI = app.globalData.APIs[id];
    if (!postAPI) {
      this.getPostDataError();
      return;
    };

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
