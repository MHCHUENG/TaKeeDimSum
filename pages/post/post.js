const articleMap = require('../../articles/index');

Page({
  data: {
    post: []
  },

  onLoad: function (query) {
    const { id } = query || {}
    if (!id || !articleMap[id]) return
    
    this.setData({
      post: articleMap[id]
    })
  }
})
