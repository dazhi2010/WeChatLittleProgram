const util = require('../../../utils/util.js');
const service = require('../../../utils/service.js');
const downLoadUrl = getApp().globalData.apiRootUrl+"api/files/download/";
var thisPage;
var notice;
Page({
	data:{
		downLoadUrl:downLoadUrl
	},
	loadData: function (pageNum) {
		thisPage.setData({notice:notice});
		initFiles();
		function initFiles(){
			util.easyRequest('api/files/find',
				{
					"info": {
						"businessId":notice.id,
						"businessType":'worknotice'
					},
					"page": null,
					"limit": null,
					"orderBy": null
				},
				function (data) {
					notice.$$files = data.data;
					thisPage.setData({notice:notice});
				});
		}
	},
	onLoad: function () {
		thisPage = this;
		notice = util.share.getAndRemove("selectedNoticeData");
		thisPage.loadData();
	},
	previewImg :function (event) {
		var url = downLoadUrl+event.currentTarget.dataset.data.id;
		var urls = [];
		for(var i in notice.$$files){
			urls.push(downLoadUrl+notice.$$files[i].id)
		}
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: urls // 需要预览的图片http链接列表
		})
	}
});

