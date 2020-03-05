import router from '@/router'
import {
	Message
} from 'element-ui'
import store from "@/store";
import cookie from 'js-cookie'

const whitelist = ['login', '404','webSetting','userSetting'];

function routerSwitch(to, from, next){//判断菜单权限
	const storeMenuList = store.state.menu.menuList;
	const menuList = [...whitelist,...storeMenuList];
	if (menuList.includes(to.name)) {
		next();
	} else {
		Message({
		  message: '抱歉，您没有权限访问该页面',
		  type: 'error'
		})
		next(false);
	}
}

router.beforeEach((to, from, next) => {
	// if(to.name=='login'){
	// 	next();
	// }else if (cookie.get('token')) {
	// 	if(sessionStorage.getItem('menuList')===[] || sessionStorage.getItem('user')){
	// 		routerSwitch(to, from, next);
	// 	}else{
	// 		routerSwitch(to, from, next);
	// 	}
	// } else {
		// this.$alert('未登录，请先登录', '登录提示', {
  //         confirmButtonText: '确定',
  //         callback: action => {
		// 	next('/login');
  //         }
  //       });
	// }
	next();
})

router.afterEach(() => {})
