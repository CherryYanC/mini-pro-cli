"use strict";Page({data:{logs:[]},onLoad:function(){this.setData({logs:(wx.getStorageSync("logs")||[]).map(function(t){return{date:new Date(t),timeStamp:t}})})}});
//# sourceMappingURL=logs.js.map
