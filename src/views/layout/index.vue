<template>
	<el-container>
		<el-aside width="auto">
			<component-menu :menuDisplay="menuDisplay" />
		</el-aside>
		<el-container>
			<el-header>
				<component-header :menuDisplay="menuDisplay" @setMenuDisplay="setMenuDisplay" @foreUpdata="foreUpdata"></component-header>
			</el-header>
			<component-breadcrumb />
			<el-main>
				<transition :name="transitionName">
					<router-view ref="routerView" :key="routerViewKey" class="routerView" />
				</transition>
				<el-backtop target=".el-main"></el-backtop>
				<!-- <view-switch class="viewSwitch" v-show="true"></view-switch> -->
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import componentHeader from './Header';
	import componentMenu from './Menu';
	import componentBreadcrumb from './Breadcrumb';
	import viewSwitch from './ViewSwitch';
	import componentColor from './color';

	export default {
		name: 'layout',
		data() {
			return {
				menuDisplay: false, //菜单显示切换
				transitionName: 'routerView--switchCenter', //子路由的过滤动画名称
				routerViewKey: 0, //routerview视图 key 值，用于刷新
			}
		},
		created() {},
		mounted() {},
		watch: {
			$route(to, from) {
				if (this.$store.state.routerList[from.name].children && this.$store.state.routerList[from.name].children.findIndex(
						(item) => {
							return item.name === to.name;
						}) >= 0) {
					this.transitionName = 'routerView--switchLeft';
				} else if (this.$store.state.routerList[to.name].children && this.$store.state.routerList[to.name].children.findIndex(
						(item) => {
							return item.name === from.name;
						}) >= 0) {
					this.transitionName = 'routerView--switchRight';
				} else {
					this.transitionName = 'routerView--switchCenter';
				}
			}
		},
		computed: {

		},
		methods: {
			//设置显示或半显示菜单
			setMenuDisplay() {
				this.menuDisplay = !this.menuDisplay;
			},
			//强制刷新
			foreUpdata() {
				this.transitionName = '';
				this.routerViewKey += 1;
			},
		},
		props: [],
		components: {
			componentHeader,
			componentMenu,
			componentBreadcrumb,
			viewSwitch,
		},
		mixins: [componentColor],
	}
</script>

<style lang="scss" scoped>
	.el-container {
		height: 100vh;
	}

	.el-header {
		height: $height !important;
		line-height: $height !important;
		border-bottom: 1px solid var(--borderColor--1);
		padding: 0 $margin !important;
	}

	.el-main {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		position: relative;
		padding: $margin;


		.routerView {
			min-height: 100%;
			text-align: left;
			box-sizing: border-box;
			position: relative;
		}

		.viewSwitch {
			z-index: 10;
			top: 0;
			left: 0;
			right: 0;
			position: absolute;
		}
	}

	.routerView--switchLeft-enter-active {
		transform-origin: 0 100% 0;
		animation: .3s routerViewSwitch;
	}

	.routerView--switchRight-enter-active {
		transform-origin: 100% 100% 0;
		animation: .3s routerViewSwitch;
	}

	.routerView--switchCenter-enter-active {
		transform-origin: 50% 100% 0;
		animation: .3s routerViewSwitchOpacity;
	}

	@keyframes routerViewSwitch {
		0% {
			transform: scaleX(0.6);
			opacity: 0;
		}

		100% {
			transform: scaleX(1);
			opacity: 1;
		}
	}

	@keyframes routerViewSwitchOpacity {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>
<style lang="scss">
	.routerView {
		.search {
			@include f-shadow('bottom');
		}
	}
</style>
