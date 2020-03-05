const store = {
	state:{
		id:0,//用户lid
        roleId:0,//角色id
		username:'',//用户名
		password:'',//密码
		name:'',//名称
		role:'',//角色
		color:'#409EFF',//颜色
		muneColor:'var(--fontColor--2)',//菜单颜色
		muneBackgroundColor:'#fff',//菜单背景色
	},
	mutations:{
        //设置字体色
		setColor:(state,val) => state.color = val,
        //设置菜单字体色
		setMuneColor:(state,val) => state.muneColor = val,
        //设置菜单背景色
		setMuneBackgroundColor:(state,val) => state.muneBackgroundColor = val,
        //设置用户信息
		setUser:(state,val)=>{
			let user = JSON.parse(sessionStorage.getItem('user'));
			state.id = user.id;
            state.roleId = user.roleId;
			state.username = user.username;
			state.password = user.password;
			state.name = user.name;
			state.role = user.role;
		}
	},
	actions:{
	},
	getters:{
	},
}

export default store