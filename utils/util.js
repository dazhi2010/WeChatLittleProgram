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

function easyRequest(url, data, onSuccessFunc, onFailFunc, onCompleteFunc) {
	wx.showNavigationBarLoading();
	wx.request({
		dataType: 'json',
		data: data,
		method: 'POST',
		url: apiRootUrl + url,
		header: {
			'content-type': 'application/json;charset=UTF-8',
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
		fail: onFailFunc ? onFailFunc : function (res) {
			wx.hideNavigationBarLoading();
			wx.hideLoading();
		},
		complete: onCompleteFunc ? onCompleteFunc : null
	})
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
	uniqueArray: uniqueArray,
	share:{
		put:putShare,
		get:getShare,
		getAndRemove:getAndRemoveShare,
		remove:removeShare
	}
}
