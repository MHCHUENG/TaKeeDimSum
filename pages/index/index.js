Page({
  data: {
    isAct: false,
    stopAct: false
  },

  onShareAppMessage: function() {
    return {
      title: "百年傳承，匠心打造，德心經營，始記初心"
    }
  },

  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShow: function() {
    if (this.timer || this.data.stopAct) {
      return;
    };

    this.timer = setTimeout(() => {
      this.setData({
        isAct: true
      });
    },100);
  },

  onHide: function () {
    clearTimeout(this.timer);
    this.setData({
      stopAct: true,
      isAct: true
    });
  },

  tapGoBtn: function() {
    wx.switchTab({
      url: '/pages/shop/shop'
    })
  },

  tapLogo: function() {
    wx.switchTab({
      url: '/pages/story/story'
    })
  },
})
