var p1 = require("./subpages/p1.js");
var p2 = require("./subpages/p2.js");
//获取应用实例
var app = getApp()
Page({
	data: {
// tabbar
		winWidth: 0,
		winHeight: 0,
// tab切换
		currentTab: 0,
		scrollLeft: 0,
	},
	onLoad: function () {
		var that = this;
		that.p1 = new p1(that);
		// that.p1.tap(11111);
		that.p2 = new p2(that);
		// that.p2.tap(22222);
		/**
		 * 获取系统信息
		 */
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight
				});
			}
		});
	},
	/**
	 * 滑动切换tab
	 */
	bindChange: function (e) {
		var that = this;
		that.setData({ currentTab: e.detail.current });
		if(e.detail.current == 0){
			this.p1.loaded("11111load");
		}else if(e.detail.current==1){
			this.p2.loaded("22222load");
		}
// 内容与tabbar的联动
//这里的 2 75 是根据顶部tabbar的个数来决定的，我定义的是5个，2是索引，也就是说超过三页才会改变
		if (e.detail.current > 2) {
			var a = e.detail.current
			var query = wx.createSelectorQuery()
			query.select('.scrollBox').boundingClientRect(function (res) {
				var b = res.width
				that.setData({
					scrollLeft: (a - 2) * 75
				})
			})
			query.selectViewport().scrollOffset()
			query.exec(function (res) {
			})
		} else {
			var a = e.detail.current
			this.setData({
				scrollLeft: 0
			})
		}

	},
	/**
	 * 点击tab切换
	 */
	swichNav: function (e) {
		var that = this;
		console.log(e.target);
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
		}
	},
	onPullDownRefresh: function () {
		if(this.data.currentTab == 0){
			this.p1.onRefresh();
		}else if(this.data.currentTab==1){
			this.p2.onRefresh();
		}
		wx.stopPullDownRefresh();
	},
	onReachBottom: function () {
		console.log(this.data.i);

	},
})

