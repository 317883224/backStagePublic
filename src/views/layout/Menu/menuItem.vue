<template>
	<div>
		<el-menu-item v-if="!item.children||item.children.length<=0" :index="item.name||item.path">
			<menuItemTitile :icon="item.meta.icon" :title="item.meta.title"></menuItemTitile>
		</el-menu-item>
		<el-menu-item v-else-if="item.children.length===1&&(!item.children[0].children||item.children[0].children===0)" :index="item.children[0].name||item.children[0].path" >
			<menuItemTitile :icon="item.meta.icon" :title="item.children[0].meta.title"></menuItemTitile>
		</el-menu-item>
		<el-submenu v-else :index="item.name||item.path">
			<template slot="title">
				<menuItemTitile :icon="item.meta.icon" :title="item.meta.title"></menuItemTitile>
			</template>
			<menuItem v-for="itemchildren in item.children" :key="itemchildren.path" :item="itemchildren" ></menuItem>
		</el-submenu>
	</div>
</template>

<script>
	import menuItemTitile from './menuItemTitile';
	
	export default {
		name: 'menuItem',
		data() {
			return {
			}
		},
		created() {
		},
		mounted() {
			
		},
		computed: {

		},
		methods: {
			
		},
		props: ['item'],
		components: {
			menuItemTitile,
		},
	}
</script>

<style lang="scss" scoped>
	
</style>
