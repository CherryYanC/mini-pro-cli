"use strict";
Page({
    data: {
        logs: [],
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function (log) {
                return {
                    date: new Date(log),
                    timeStamp: log
                };
            }),
        });
    },
});
