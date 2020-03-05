import cookie from 'js-cookie';
import router from "@/router";

const store = {
	state:{
	},
	mutations:{
        //登出 参数:val(从哪个页面登出)
		LOGOUT:(state,val)=>{
			cookie.remove('token');
			sessionStorage.clear();
			router.replace({
				path: '/login',
				query: val //登录成功后跳入浏览的当前页面
			})
		}
	},
	actions:{
		logoutAsync({state,commit,rootState}) {
			commit('LOGOUT');
		}
	},
	getters:{
	},
}

export default store