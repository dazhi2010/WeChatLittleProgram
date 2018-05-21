const util = require('../../utils/util.js');
const service = require('../../utils/service.js');
var thisPage;
var pageSize = 10;
Page({
	loadData: function (pageNum) {
		thisPage.data.pageNum = pageNum ? pageNum : 1;
		util.easyRequest('api/notice/getList',
			{
				noticeVo: {titlee: null},
				sendMe: 1,
				pageNum: thisPage.data.pageNum,
				pageSize: pageSize,
				orderBy: "readed,+receive_type,-create_time ASC"
			},
			function (data) {
				var postList = data.data;
				service.getUserDatas(postList, ['sendUser'], ['$$sendUser'], function (dataWithUser) {
					if (thisPage.data.pageNum == 1) {
						thisPage.setData({list: postList, total: data.total});
					} else {
						thisPage.setData({list: thisPage.data.list.concat(postList), total: data.total})
					}
				});
			});
	},
	onLoad: function () {
		thisPage = this;
		thisPage.loadData();
	},
	onPullDownRefresh: function () {
		thisPage.loadData();
		wx.stopPullDownRefresh()
	},
	onReachBottom: function () {
		if (thisPage.data.pageNum * pageSize < thisPage.data.total) {//如果不是最后一页，则继续加载
			thisPage.data.pageNum++;
			thisPage.loadData(thisPage.data.pageNum);
		}
	},
	tapNotice: function (event) {
		util.share.put("selectedNoticeData",event.currentTarget.dataset.data);
		wx.navigateTo({
			url: 'detail/detail'
		})
	},
	addNotice:function (event) {
		wx.navigateTo({
			url: 'edit/edit'
		})
	}
})
