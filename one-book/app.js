//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("CODE>>>>"+res.code);
        if(res.code){
          wx.request({
            url: 'https://api.renxiansen.com/getWxUserInfo/'+res.code+'.json'
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success:res =>{
              wx.getUserInfo({
                success:res=>{
                  this.globalData.userInfo = res.userInfo
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
		appid: 'wx981e9ef4bf061661',
    secret: '98d2c5afc728c7113946b8b44cc3b74b'
  }
})