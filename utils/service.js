const util = require('util.js');
const thisApp = getApp();
const USER_DATA_KEY = "localUserData";
function getUserDatas(sourceDatas,userIdFields,userDataFields,onCompleteFunc) {//源数据，存放用户ID的属性数组（支持多属性转换）,准备存放用户数据的属性数组（与ID属性数组顺序一致）
  // thisApp.userDatas;
  if (!userIdFields || !userDataFields || userIdFields.length == 0 || userDataFields.length == 0 || userIdFields.length != userDataFields.length){
    throw new Error("userIdFields存放用户ID的属性数组（支持多属性转换）,userDataFields准备存放用户数据的属性数组,都不能为空,且长度必须相等");
  }
  //从本地查找用户信息，找到则使用，找不到的收集起来ID再次查询
  var localUserData = wx.getStorageSync(USER_DATA_KEY);
  if(!localUserData){
    localUserData = {};
  }
  var userIds = [];
  setUserDatasByLocalData();
  if (userIds.length == 0) {//如果无需加载网络，则直接回调
    onCompleteFunc(sourceDatas);
    return;
  }
  userIds = util.uniqueArray(userIds);
  util.easyRequest('api/user/list',
    { user: { ids: userIds }, offset: 0, limit: 100000, orderBy: "" },
    function (data) {
      //查询到的数据先放入本地存储
      for (var i in data.data){
        var user = data.data[i];
        localUserData[user.id] = user;
      }
      wx.setStorageSync(USER_DATA_KEY, localUserData);
      setUserDatasByLocalData();
      onCompleteFunc(sourceDatas);
    },
	  function () {
		  onCompleteFunc(sourceDatas);
	  });

  function setUserDatasByLocalData(){//获取本地数据给用户数据赋值
    for (var i in sourceDatas) {
      var sd = sourceDatas[i];
      for (var j in userIdFields) {
        var localU = localUserData[sd[userIdFields[j]]];
        if (localU) {
          sd[userDataFields[j]] = localU;
        } else {
          userIds.push(sd[userIdFields[j]]);
        }
      }
    }
  }
}
module.exports = {
  getUserDatas: getUserDatas
}
