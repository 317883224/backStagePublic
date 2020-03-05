const router = {
	path: 'table',
	name: 'table',
	redirect: 'noredirect',
	meta: {
		title: '数据报表',
		icon: 'el-icon-tickets'
	},
	children: [{
			path: 'index',
			name: 'tableIndex',
			component: () => import( /* webpackChunkName :'table' */ '@/views/table/index'),
			meta: {
				title: '列表示例1',
				icon: ''
			},
		},
		{
			path: 'tableTwo',
			name: 'tableTwo',
			component: () => import( /* webpackChunkName :'table' */ '@/views/table/index'),
			meta: {
				title: '列表示例2',
				icon: ''
			},
		},
	]
}

export default router
