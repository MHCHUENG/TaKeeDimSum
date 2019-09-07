const articleList = require('../../articles/story-list')
Page({
  data: {
    list: []
  },

  onLoad: function () {
    this.setData({
      list: articleList
    })
  }
})
