const util = require('../../../utils/util.js');
const service = require('../../../utils/service.js');
const downLoadUrl = getApp().globalData.apiRootUrl+"api/files/download/";
var thisPage;
var notice = {};
Page({
	data:{
		downLoadUrl:downLoadUrl
	},
	onLoad: function () {
		thisPage = this;
		thisPage.setData({notice:notice,files:[]});
	},
	chooseImage: function (e) {
		wx.chooseImage({
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				thisPage.setData({
					files: thisPage.data.files.concat(res.tempFilePaths)
				});
			}
		})
	},
	previewImg : function(e){
		wx.previewImage({
			current: e.currentTarget.id, // 当前显示图片的http链接
			urls: this.data.files // 需要预览的图片http链接列表
		})
	},
	inputChange :function (event) {
		notice[event.target.id] = event.detail.value;
		thisPage.setData({notice:notice});
	},
	submit:function () {
		notice.needReply = notice.needReply?1:0;
		var fileCount = thisPage.data.files.length;
		var uploadedFileCount = 0;
		//先上传业务信息，后上传文件
		util.easyRequest('api/notice/create',
			{
				noticeVo:notice,
				approvalId:5
			},
			function (data) {
				notice.id = data.data;
				var fileInfo = {
					businessId : notice.id,
					businessType:"worknotice"
				};
				for(var i in thisPage.data.files){//上传文件
					var file = thisPage.data.files[i];
					var uploadTask = util.easyUpload('api/files/upload',{info:fileInfo},'files',file,function (e) {
						uploadedFileCount++;
						if(fileCount==uploadedFileCount){
							wx.showToast({
								title: '成功',
								icon: 'success',
								duration: 2000,
								mask:true,
								success:function () {
									setTimeout(function () {//延迟1秒,关闭当前窗口
										wx.navigateBack({
											delta: 1
										});
									}, 1000)
								}
							});
						}
					});
					// uploadTask.onProgressUpdate((res) => {
					// 	console.log('上传进度', res.progress)
					// 	console.log('已经上传的数据长度', res.totalBytesSent)
					// 	console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
					// });
				}
				// uploadTask.abort(); // 取消上传任务
			},null,null,'form');
	}
});

