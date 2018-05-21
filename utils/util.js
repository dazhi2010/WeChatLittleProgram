const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
const thisApp = getApp();
const apiRootUrl = thisApp.globalData.apiRootUrl;
const requestTypeMap = {'json':'application/json;charset=UTF-8','form':'application/x-www-form-urlencoded;charset=UTF-8'};
//普通请求发送
function easyRequest(url, data, onSuccessFunc, onFailFunc, onCompleteFunc,requestType) {
	requestType = requestType?requestType:'json';
	wx.showNavigationBarLoading();
	wx.request({
		dataType: 'json',
		data: requestType=='json'?data:{'JSON_REQUEST_BODY': JSON.stringify(data)},
		method: 'POST',
		url: apiRootUrl + url,
		header: {
			'content-type': requestTypeMap[requestType],
			'Accept': 'application/json, text/plain, */*',
			'x-skywares-safety-token': '!skywares-safety--#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlck5hbWUiOiJhZG1pbiIsInJvbGVzIjpbXSwiZXhwaXJlIjoxNTI5MDMzMzMxMTMyLCJhZGRpdGlvbmFsIjoie1wiZXh0ZW5kMlwiOlwiODMwRkUzREZEQUYxODVBMzk4MTBGMkM2MkVFOUIzMURcIixcImV4dGVuZDFcIjpcIkE1OTYwNTJDMUQxQUMzNUFDOUZCRjIzMDdGOUVEMkYwMjJcIixcInVzZXJUeXBlXCI6XCIzXCJ9In0.hXwMDTMorAkAm_727Rvac19WqAdk1guAOd1pM6sUsZA'
		},
		success: function (res) {
			wx.hideNavigationBarLoading();
			if (res.data.code == 200) {
				if (onSuccessFunc) {
					onSuccessFunc(res.data);
				}
			} else {
				if (onFailFunc) {
					onFailFunc();
				}
			}
		},
		fail: onFailFunc ? onFailFunc : null,
		complete: onCompleteFunc ? onCompleteFunc : function (res) {
			wx.hideNavigationBarLoading();
			wx.hideLoading();
		}
	})
}
//带文件form表单上传
function easyUpload(url, data,fileField,filePath, onSuccessFunc, onFailFunc, onCompleteFunc) {
	wx.showNavigationBarLoading();
	const uploadTask = wx.uploadFile({
		url: apiRootUrl + url,
		filePath: filePath,
		name: fileField,
		method: 'POST',
		header: {
			'content-type': 'multipart/form-data;charset=UTF-8',
			'Accept': 'application/json, text/plain, */*',
			'x-skywares-safety-token': '!skywares-safety--#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlck5hbWUiOiJhZG1pbiIsInJvbGVzIjpbXSwiZXhwaXJlIjoxNTI5MDMzMzMxMTMyLCJhZGRpdGlvbmFsIjoie1wiZXh0ZW5kMlwiOlwiODMwRkUzREZEQUYxODVBMzk4MTBGMkM2MkVFOUIzMURcIixcImV4dGVuZDFcIjpcIkE1OTYwNTJDMUQxQUMzNUFDOUZCRjIzMDdGOUVEMkYwMjJcIixcInVzZXJUeXBlXCI6XCIzXCJ9In0.hXwMDTMorAkAm_727Rvac19WqAdk1guAOd1pM6sUsZA'
		},
		formData:{
			'JSON_REQUEST_BODY': JSON.stringify(data)
		},
		success: function (res) {
			res.data = JSON.parse(res.data);
			if (res.data.code == 200) {
				if (onSuccessFunc) {
					onSuccessFunc(res.data);
				}
			} else {
				if (onFailFunc) {
					onFailFunc();
				}
			}
		},
		fail: onFailFunc ? onFailFunc : null,
		complete: onCompleteFunc ? onCompleteFunc : function (res) {
			wx.hideNavigationBarLoading();
			wx.hideLoading();
		}
	});
	return uploadTask;
}
function uniqueArray(arr) {//数组去重
	var result = [], hash = {};
	for (var i = 0, elem; (elem = arr[i]) != null; i++) {
		if (!hash[elem]) {
			result.push(elem);
			hash[elem] = true;
		}
	}
	return result;
}
function putShare(key,value){
	thisApp.globalData.shareData[key] = value;
}
function getShare(key){
	return thisApp.globalData.shareData[key];
}
function getAndRemoveShare(key){
	var result = getShare(key);
	removeShare(key);
	return result;
}
function removeShare(key){
	delete thisApp.globalData.shareData[key];
}
module.exports = {
	formatTime: formatTime,
	easyRequest: easyRequest,
	easyUpload:easyUpload,
	uniqueArray: uniqueArray,
	share:{
		put:putShare,
		get:getShare,
		getAndRemove:getAndRemoveShare,
		remove:removeShare
	}
}
