class p2 {
	constructor(pageContext){
		this.page = pageContext;
		//需要绑定到页面中的方法（事件响应方法等）需要如下方式添加
		this.page.p2tap = this.tap;
	}
	loaded(e) {
		console.debug(e);
		this.page.setData({p2name:e});
	}
	tap(e){
		console.debug(e);
		this.setData({p2name:"p2名称"});
	}
	onRefresh(){
		this.page.setData({p2name:""});
	}
}
module.exports = p2;