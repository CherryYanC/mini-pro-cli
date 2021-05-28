"use strict";App({globalData:{},onLaunch:function(){var o=wx.getStorageSync("logs")||[];o.unshift(Date.now()),wx.setStorageSync("logs",o),wx.login({success:function(o){console.log(o.code)}})}});
//# sourceMappingURL=app.js.map
