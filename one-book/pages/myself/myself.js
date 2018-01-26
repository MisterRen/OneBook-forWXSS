// myself/myself.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    iconPath:{
      book: "/pages/images/book.png",
      setting:"/pages/images/settings.png",
      like:"/pages/images/like1.png",
      collection:"/pages/images/collection1.png",
      dropIn:"/pages/images/dropIn2.png",
      dropOut:"/pages/images/dropOut2.png"
    }
  },
  onLaunch:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //this.data.userInfo = app.globalData.userInfo;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    wx.setNavigationBarTitle({
      title: "我的"
    })
    console.log("生命周期函数--监听页面加载")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    console.log("生命周期函数--监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success:res=>{
        if (!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success: res => {
              console.log(res.errMsg);
              // wx.getUserInfo({
              //   success: res => {
              //     this.globalData.userInfo = res.userInfo
              //   }
              // })
            },fail:function(){
              console.log("1212");
            }
          })
        }
      }
    })
    console.log("生命周期函数--监听页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("生命周期函数--监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期函数--监听页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("生命周期函数--监听用户下拉动作")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("用户点击右上角分享")
  },showSetting:function(){
    wx.openSetting({
      
    })
  },naviTo:function(){
    /*wx.showToast({
      title: '敬请期待...',
      mask:true,
      icon:'none'
    })*/
    wx.showActionSheet({
      itemList: ['sheet1', 'sheet2','sheet3'],
      success:res=>{
        wx.showToast({
          title: res.tapIndex+'',
          mask: true,
          icon: 'none'
        })
      }
    })
  }
})