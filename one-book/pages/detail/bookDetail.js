// pages/detail/bookDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      isbn: options.isbn
    });
    wx.setNavigationBarTitle({
      title: options.bName,
    })
    console.info("监听页面加载");
    var socketTask = wx.connectSocket({
      url: 'wss://api.renxiansen.com/ws/web/pm?appOrigin=pm&auctionId=231',
      header: {
        'content-type': 'application/json'
      },
      method: "GET"
    })
    socketTask.onOpen(function (res) {
      console.log("SOCKET已连接。。。。" + new Date());
      socketTask.send({
        data: '{"userId":1000000000000614,"auctionId":231,"pagId":"2600","message_type":"view","message_content":"addAuction","paaId":"1353"}'
      });
    })
    this.setData({
      socketTask: socketTask
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.info("监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.info("监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.info("监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // wx.closeSocket()
    // wx.onSocketClose(function(){
    //   console.info("socket关闭");
    // })
    this.data.socketTask.close();
    console.info("监听页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.info("监听用户下拉动作");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.info("页面上拉触底事件的处理函数");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.info("用户点击右上角分享");
  }
})