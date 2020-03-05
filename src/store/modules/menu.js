const store = {
	state:{
		menuList:['dataReportTransaction','dataReportTransactionDetails'],
		color:'#fff',
		colorActive:'#ffd04b',
		backgroundColor:'#545c64',
		colorList:{
			light:{
				color:'#303133',
				colorActive:'#409EFF',
				backgroundColor:'#fff',
			},
			night:{
				color:'#fff',
				colorActive:'#ffd04b',
				backgroundColor:'#545c64',
			}
		},
		mode:'night',
	},
	mutations:{
		setMenuLlit:(state,val) => state.menuList = val,
		setMenuColor:(state,val)=> {
			state.color = state.colorList[state.mode].color;
			state.colorActive = state.colorList[state.mode].colorActive;
			state.backgroundColor = state.colorList[state.mode].backgroundColor;
		},
		setMenu:(state,val)=>{
			let menu = JSON.parse(sessionStorage.getItem('menu'));
			state.menuList = menu.menuList;
		}
	},
	actions:{
	},
	getters:{
	},
}

export default store