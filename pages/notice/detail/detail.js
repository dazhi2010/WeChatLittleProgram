const util = require('../../../utils/util.js');
const service = require('../../../utils/service.js');
var thisPage;
Page({
	loadData: function (pageNum) {
		var notice = util.share.getAndRemove("selectedNoticeData");
		thisPage.setData({notice:notice});
	},
	onLoad: function () {
		thisPage = this;
		thisPage.loadData();
	}
})
