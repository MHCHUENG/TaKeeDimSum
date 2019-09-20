const skeletonsConfig = require('../../config/skeletons.js');
const app = getApp();

Page({
  data: {
    skeletonData: skeletonsConfig.post,
    post: [],
    isLoading: true,
  },

  onLoad: function (query) {
    const { id } = query || {}
    this.isFetchError = false;
    this.id = id;
    this.getPostData(id);
  },

  onShow: function (query) {
    if (this.isFetchError) {
      this.isFetchError = false;
      this.getPostData();
    }
  },

  getDataPostSuccess: function (res) {
    this.setData({
      post: res.data,
      isLoading: false
    })
  },

  getPostDataError: function () {
    this.isFetchError = true;
  },

  getPostData: function (id) {
    id = id || this.id;
    if (!id) return;

    const postAPI = app.globalData.APIs[id];
    if (!postAPI) return;

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
