<template>
	<el-menu class="el-menu-demo header_menu" :default-active="$route.name" mode="horizontal" @select="selectItem">
	  <el-submenu index="setting">
		<template slot="title">
			<img class="header_right_menu_logo" src="@/assets/img/thor.jpg"/>
			<span>选项</span>
		</template>
		<menuItem v-for="item in $store.state.routerList.setting.children" :key="item.name" :item="item" ></menuItem>
		<div class="header_right_logout"><el-menu-item index="logout">退出登录</el-menu-item></div>
	  </el-submenu>
	</el-menu>
</template>

<script>
	import menuItem from '../../Menu/menuItem';
	
	export default{
		name:'headerMenu',
		data() {
			return {
			}
		},
		methods: {
			//获取菜单点击项
			selectItem(key, keyPath) {
				if (key==='logout') {
					this.$store.commit('LOGOUT',{name:this.$route.name,query:this.$route.query});
				} else if(this.$route.name!==key) {
					this.$router.push({name:key});
				}
			},
		},
		components: {
			menuItem,
		},
	}
</script>

<style lang="scss" scoped>
	.el-menu{
		height: 100%;
		display: inline-block;
		vertical-align: top;
	}
	.header_right_menu_logo{
		width: $height*0.6;
		height: 60%;
		object-fit: cover;
		border-radius: 100%;
		margin-right: 10px;
	}
</style>
