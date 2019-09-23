
Page({
  data: {
    info: [
      {
        type: 'contact',
        title: '餐厅电话：135-5835-3489',
        phoneNumeber: '13558353489',
        iconSrc: '/images/shop/call.png',
        bindName: 'makePhoneCall'
      },
      {
        type: 'address',
        title: '地址：平南县大安镇镇新南路(吉祥窗帘)',
        iconSrc: '/images/shop/location.png',
        bindName: 'checkLocation',
        phoneNumeber: '',
      },
      {
        type: 'openTime',
        title: '营业时间：08:00 - 16:30',
        iconSrc: '/images/shop/clock.png',
        bindName: '',
        phoneNumeber: '',
      }
    ],
    shopImage: []
  },

  onLoad: function () {
    this.isFirstLoadingImage = true;
    this.getShopImageData();
  },

  onShow: function () {
    if (this.data.shopImage.length === 0 && !this.isFirstLoadingImage) {
      this.getShopImageData();
    }
  },

  getShopImageData: function () {
    const app = getApp();
    const APIs = app.globalData.APIs['shop'];
    if (!APIs) return;

    app.wxRequire({
      url: APIs
    }, this.setShopImageData, this.setShopImageDataError);
  },

  setShopImageData: function (res) {
    this.isFirstLoadingImage = false
    this.setData({
      shopImage: res.data.shopImage
    });
  },

  setShopImageDataError: function () {
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
