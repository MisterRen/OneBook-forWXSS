var base64 = require("../images/base64");

var app = getApp();
Page({
  data:{
    openId:null,
    index:10,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    loading:false
  },
  onLoad: function () {
    const _this = this;
    wx.showLoading({
      title: '正在加载...',
      success:function(){
        wx.request({
          url: 'https://api.renxiansen.com/search.json',
          data: {
            q: 'spring',
            s: 0,
            c: 10
          },
          success: res => {
            console.log(res);
            _this.setData({
              list: res.data.books,
              index: 10
            })
            wx.hideLoading();
          }
        })
      }
    })
    
  }, onPullDownRefresh:function(){//下拉刷新
    console.log("触发下拉事件");
    //wx.startPullDownRefresh();
    //wx.showNavigationBarLoading();
    //wx.hideNavigationBarLoading() //完成停止加载
    wx.request({
      url: 'https://api.renxiansen.com/search.json',
      data:{
        q:'spring',
        s:0,
        c:10
      },
      success:res=>{
        console.log(res);
        this.setData({
          list: res.data.books,
          index:10
        })
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  }
});