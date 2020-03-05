import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import menu from "./modules/menu.js";
import logout from "./modules/logout.js";
import axios from "./modules/axios.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
	  routes:[],//获取路由各个模块
	  routerList:{},//获取全部路由，key 为路由的 name
  },
  mutations: {
      //设置 routes
	  setRoutes:(state,val) => {
		  state.routes = val;
	  },
      //设置 setRouterList
	  setRouterList:(state,val) => {
		  state.routerList[val.name] = val;
	  },
  },
  actions: {},
  modules: {
		user,//用户模块
		menu,//菜单模块
		logout,//登出模块
		axios,//axios 参数模块
	}
});
