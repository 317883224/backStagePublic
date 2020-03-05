const router = {
		path: 'home',
		name: 'home',
		component: () => import('@/views/home/home'),
		meta: {
			title: '首页',
			icon: 'el-icon-tickets',
		},
}

export default router
