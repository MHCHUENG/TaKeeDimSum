
const backData = require('../../config/shop_backup');

Page({
  data: {
    info: backData.info,
    shopImage: []
  },

  onLoad: function () {
    this.isFirstLoadingImage = true;
    this.getData();

    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShow: function () {
    if (this.data.shopImage.length === 0 && !this.isFirstLoadingImage) {
      this.getData();
    }
  },

  getData: function () {
    const app = getApp();
    const APIs = app.globalData.APIs;

    // 如果无网，兜底info信息
    // if (!app.globalData.isConnected) {
    //   this.setData({
    //     info: backData.info
    //   });
    //   this.fetchError();
    //   return;
    // }

    if (APIs) {
      this.getShopImageData(APIs['shop']);
      return;
    }

    app.getAPIsMap().then((res) => {
      this.isFirstLoadingImage = false;
      if (!res || !res.data) {
        return;
      }

      app.globalData.APIs = res.data;
      this.getShopImageData(res.data['shop']);
    }).catch(() => {
      this.fetchError();
    });
  },

  getShopImageData: function (url) {
    if (!url) {
      this.fetchError();
      return;
    }

    const app = getApp();
    app.wxRequire({
      url
    }, this.setShopImageData, this.fetchError);
  },

  setShopImageData: function (res) {
    this.isFirstLoadingImage = false;
    this.setData({
      shopImage: res.data.shopImage,
      // info: res.data.info
    });
  },

  fetchError: function () {
    this.isFirstLoadingImage = false;
  },

  makePhoneCall: function (e) {
    const { phoneNumber } = e.currentTarget.dataset;
    if (!phoneNumber) return;

    wx.makePhoneCall({
      phoneNumber
    });
  },

  checkLocation: function(e) {
    wx.openLocation({
      latitude: 23.380989,
      longitude: 110.515777,
      name: '德記大安點心',
      address: '广西贵港市平南县大安镇镇新南路(吉祥窗帘)',
    });
  },

  setPreviewImage: function (current, urls) {
    if (!current || !urls || urls.length === 0) return;
    wx.previewImage({
      current,
      urls
    });
  },

  tapImage: function (e) {
    const shopImage = this.data.shopImage
    if (shopImage.length === 0) return

    const target = e.currentTarget
    const { dataset } = target || {}
    const { src } = dataset || {}
    let srcArr = []

    shopImage.forEach((item) => {
      const { srcs } = item || {}
      if (!srcs) return;

      srcs.forEach((item) => {
        srcArr.push(item.src)
      });
    })

    this.setPreviewImage(src, srcArr)
  }
})
