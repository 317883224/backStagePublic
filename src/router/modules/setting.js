const router = {
	path: 'setting',
	name: 'setting',
	redirect: 'noredirect',
	meta: {
		title: '设置',
		icon: 'el-icon-tickets',
		hidden: true,
	},
	children: [{
			path: "/webSetting",
			name: "webSetting",
			component: () => import(/*webpackChunkName :'setting' */ "@/views/setting/webSetting"),
			meta: {
				title: '页面设置',
			},
		},
		{
			path: "/userSetting",
			name: "userSetting",
			component: () => import(/*webpackChunkName :'setting' */ "@/views/setting/userSetting"),
			meta: {
				title: '个人设置',
			},
		},
		{
			path: "/setPassword",
			name: "setPassword",
			component: () => import(/*webpackChunkName :'setting' */ "@/views/setting/setPassword"),
			meta: {
				title: '安全设置',
			},
		},
	]
}

export default router
