export default {
	path: 'specialEffects',
	name: 'specialEffects',
	redirect: 'noredirect',
	meta: {
		title: '特效目录',
		icon: 'el-icon-tickets'
	},
	children: [{
			path: 'compassClock',
			name: 'specialEffectsCompassClock',
			component: () => import(/* webpackChunkName :'specialEffects' */ '@/views/specialEffects/compassClock'),
			meta: {
				title: '罗盘时钟',
				icon: ''
			},
		},
		{
			path: 'honeycombMenu',
			name: 'honeycombMenu',
			component: () => import(/* webpackChunkName :'specialEffects' */ '@/views/specialEffects/honeycombMenu'),
			meta: {
				title: '蜂窝状菜单',
				icon: ''
			}, 
		},
		{
			path: 'photoAlbum',
			name: 'photoAlbum',
			component: () => import(/* webpackChunkName :'specialEffects' */ '@/views/specialEffects/photoAlbum'),
			meta: {
				title: '相册',
				icon: ''
			}, 
		}
	]
}
