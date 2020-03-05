import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/layout/index';
import store from "@/store";

Vue.use(VueRouter);

//设置路由
function setRoutes(route, prev) {
	let routesChildren = [];
	if (prev === 0) {
		store.commit('setRoutes', JSON.parse(JSON.stringify(route)));
		prev = {
			path: '',
			meta: {}
		};
	}
	for (let item of route) {
		if (item.path.indexOf('/') < 0) item.path = prev.path + '/' + item.path;
		item.meta.matched = prev.path !== '' ? [...(prev.meta.matched || []), JSON.parse(JSON.stringify(prev))] : prev.meta.matched ||
			[];
		store.commit('setRouterList', JSON.parse(JSON.stringify(item)));
		routesChildren.push(...setRoutes(item.children || [], item));
	}
	let array = route.concat(routesChildren);
	route.length = 0;
	return array;
}

const routes = [{
		path: '/',
		component: Layout,
		redirect: '/home',
		meta: {},
		children: setRoutes((r => {
			return r.keys().map(key => r(key).default);
		})(require.context('./modules', true, /\.js$/)), 0),
	},
	{
		path: '*',
		redirect: '/404',
		meta: {
			hidden: true,
		},
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/Login"),
		meta: {
			hidden: true,
		},
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/404.vue"),
		meta: {
			hidden: true,
		},
	},
]
const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		if (document.getElementsByClassName('el-main')[0]) document.getElementsByClassName('el-main')[0].scrollTop = 0;
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
	routes
});

export default router;
