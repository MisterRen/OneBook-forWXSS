//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    q:'',
    s:0,
    c:10,
    total:0,
    pages:0,
    books:[],
    socketMsg:[],
    message:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const _this = this;
    var msg = [];
    //url: 'wss://wspai.chexiangpre.com/socket/web/pm'
    //url: 'wss://api.renxiansen.com/websocket'
    var socketTask = wx.connectSocket({
      url: 'wss://api.renxiansen.com/ws/web/pm?appOrigin=pm&auctionId=231',
      header: {
        'content-type': 'application/json'
      },
      method: "GET"
    })

    wx.onSocketOpen(function(res){
      console.log("SOCKET已连接。。。。"+new Date());
      socketTask.send({
        data: '{"userId":1000000000000614,"auctionId":231,"pagId":"2600","message_type":"view","message_content":"addAuction","paaId":"1353"}'
      });
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function(res){
      msg.push(res.data);
      _this.setData({
        socketMsg: msg
      })
    })
    wx.onSocketClose(function(res){
      console.log('WebSocket断开连接。。。' + new Date());
    })
  },sendMsg:function(msg){
    const _this = this;
    wx.sendSocketMessage({
      data: '{"userId":1000000000000614,"auctionId":231,"pagId":"2600","message_type":"view","message_content":"addAuction","paaId":"1353"}'
    })
  }, showInput: function () {
    console.log('showInput');
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    console.log('hideInput');
    this.setData({
      q: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    console.log('clearInput');
    this.setData({
      q: "",
      inputShowed:true
    });
  },
  inputTyping: function (e) {
    console.log('inputTyping');
    
    this.setData({
      q: e.detail.value
    });
  }, scanCode:function(){
    const _this = this;
    wx.scanCode({
      scanType:['barCode'],
      success:res =>{
        console.log(res);
        if(res.scanType === 'QR_CODE'){
          wx.showModal({
            title: '错误提示',
            content: '暂不开放二维码扫描',
            showCancel:false,
            confirmText:'知道啦'
          })
        }else{
          wx.showLoading({
            title: '加载中...',
            success:function(){
              wx.request({
                url: "https://api.renxiansen.com/getBookInfo/" + res.result + ".json",
                success: res => {
                  _this.setData({
                    inputShowed: false
                  })
                  console.log(res);
                  if (res.data) {
                    const d = res.data;
                    if(d.code === 6000){
                      wx.showToast({
                        title: '别鸡巴乱扫条码...',
                        icon:'none',
                        mask:true,
                      });
                      return;
                    }
                    wx.navigateTo({
                      url: '../bookDetail/detail?isbn=' + d.isbn13 + '&id=' + d.id + '&bName=' + d.subtitle,
                      success:function(){
                        wx.hideLoading();
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },search:function(){
    const _this = this;
    if (_this.data.q.length <= 0){
      return;
    }
    wx.showLoading({
      title: '加载中...',
      mask:true,
      success:function(){
        wx.request({
          url: 'https://api.renxiansen.com/search.json',
          data: {
            q: _this.data.q,
            s: 0,
            c: 10
          }, success: res => {
            console.log(res);
            _this.setData({
              books: res.data.books,
              pages: res.data.total/10,
              total:res.data.total,
              s:10
            })
            wx.hideLoading();
          }
        })
      }
    })
  },onReachBottom:function(){
    const _this = this;
    if(_this.data.q.length <= 0){
      return;
    }
    wx.request({
      url: 'https://api.renxiansen.com/search.json',
      data: {
        q: _this.data.q,
        s: _this.data.s,
        c: _this.data.c
      }, success: res => {
        console.log(res);
        _this.setData({
          books: _this.data.books.concat(res.data.books),
          s:_this.data.s+10
        })
        console.log("当前页码："+_this.data.s+"当前总条数："+_this.data.total);
      }
    })
  }
})
