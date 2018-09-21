class p1 {
	constructor(pageContext){
		this.page = pageContext;
		//需要绑定到页面中的方法（事件响应方法等）需要如下方式添加
		this.page.p1tap = this.tap;
		// this.page.p1loaded = this.loaded;
	}
	loaded(e) {
		console.debug(e);
		this.page.setData({p1name:e});
	}
	tap(e){
		console.debug(e);
		this.setData({p1name:"p1名称"});
	}
	onRefresh(){
		this.page.setData({p1name:""});
	}
}
module.exports = p1;