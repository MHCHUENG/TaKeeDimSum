const app = getApp();

Page({
  data: {
    post: []
  },

  onLoad: function (query) {
    const { id } = query || {}
    this.setPostData(id)
  },

  setPostData: function (id) {
    const _this = this;
    const postAPI = app.globalData.APIs[id];
    if (!postAPI) return;

    wx.request({
      url: postAPI,
      success: function (res) {
        _this.setData({
          post: res.data
        })
      }
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
