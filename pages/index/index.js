//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    animationLogo: {},
    animationTakee: {},
    animationDimSum: {},
    animationSlogan: {},
    animationSloganB: {},
    animationGo: {}
  },

  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShow: function() {
    this.createGroupAnimation();
  },

  onHide: function() {
    // this.clearAnimation();
  },

  onUnload: function () {
    this.clearAnimation();
  },

  clearAnimation: function () {
    clearTimeout(this.animationStepBTimer);
    clearTimeout(this.animationStepCTimer);

    this.animation.opacity(0).translateX('-200rpx').step({
      duration: 0
    });
    const animationLogo = this.animation.export();

    this.animation.opacity(0).translateY('-150rpx').step({
      duration: 0
    });
    const animationTakee = this.animation.export();

    this.animation.opacity(0).translateY('-300rpx').step({
      duration: 0
    });
    const animationDimSum = this.animation.export();

    this.animation.opacity(0).translateY('100rpx').step({
      duration: 0
    });
    const animationSlogan = this.animation.export();

    this.animation.opacity(0).translateY('150rpx').step({
      duration: 0
    });
    const animationSloganB = this.animation.export();

    this.animation.opacity(0).step({
      duration: 0
    });
    const animationGo = this.animation.export();

    this.setData({
      animationLogo,
      animationTakee,
      animationDimSum,
      animationSlogan,
      animationSloganB,
      animationGo
    })
  },

  createGroupAnimation: function() {
    var animation = this.animation ? this.animation : wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    this.animation = animation

    animation.opacity(1).translateX(0).translateY(0).step();
    const animationStepA = animation.export();

    this.setData({
      animationLogo: animationStepA,
      animationTakee: animationStepA,
      animationDimSum: animationStepA,
    })

    this.animationStepBTimer = setTimeout(function() {
      this.animation.translateY(0).opacity(0.8).step();
      const animationStepB = this.animation.export();
      this.setData({
        animationSlogan: animationStepB,
        animationSloganB: animationStepB
      })
    }.bind(this), 1000);

    this.animationStepCTimer = setTimeout(function() {
      this.animation.opacity(1).step();
      const animationStepC = this.animation.export();
      this.setData({
        animationGo: animationStepC
      })
    }.bind(this), 2000);
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
