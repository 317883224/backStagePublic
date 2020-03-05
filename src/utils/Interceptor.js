import Vue from "vue";
import axios from 'axios'
import store from '@/store'
import cookie from 'js-cookie'
import {
	MessageBox,
} from 'element-ui'
import {
	message
} from '@/utils/function.js'
import {
	logout,
} from '@/assets/js/logout.js'


//MessageBox 弹窗
function fAlertMessageBox(msg) {
	MessageBox.confirm(msg, '重新登录', {
		confirmButtonText: '重新登录',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		logout(router.currentRoute.fullPath);
	})
}

//设置在store的请求头信息 describe
function setDescribe(msg) {
	if (store.state.axios.describe.length > 0) {
		store.commit('setDescribe', '');
	}
}

// 创建axios实例 ,具体参数参考 http://www.axios-js.com/zh-cn/docs/
const service = axios.create({
	baseURL: process.env.VUE_APP_SERVERURL,
	headers: {
		'Content-Type': 'application/json',
	},
	params: {},
	timeout: 30000, // 请求超时时间
	withCredentials: false, //表示跨域请求时是否需要使用凭证
	auth: {	// 表示应该使用 HTTP 基础验证，并提供凭据,这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
		username: 'janedoe',
		password: 's00pers3cret'
	},
})

// request拦截器
service.interceptors.request.use(
	config => {
		// 让每个请求携带自定义token 请根据实际情况自行修改
		if (!cookie.get('token') || cookie.get('token') === '') {
			fAlertMessageBox('未登录，请先登录！');
		}
		config.headers['token'] = cookie.get('token') || '';
		config.headers['describe'] = store.state.axios.describe;
		return config;
	},
	error => {
		// Do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
)

// response 拦截器
service.interceptors.response.use((res) => {
		/**
		 * code为非10000是抛错 可结合自己业务进行修改
		 */
		setDescribe();
		const res = response.data
		if (res.code !== 10000 && res.code !== 44000) {
			if (res.code == 43001) {
				fAlertMessageBox('您已登陆超时，请重新登录！');
			} else {
				message(res.msg, 'error', 5000);
			}
			return Promise.reject('error');
		} else {
			return response.data;
		}
	},
	(error, a, b) => {
		setDescribe();
		console.log('err' + error); // for debug
		message('网络繁忙，请稍后重试！', 'error', 5000);
		return Promise.reject(error);
	}
)

export default service;
