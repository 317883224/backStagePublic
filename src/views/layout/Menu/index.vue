<template>
	<div class="aside">
		<Logo :menuDisplay="menuDisplay" />
		<el-menu ref="nav" class="nav el-menu-vertical-demo" :class="menuDisplay?'nav--collapse':''" :default-active="$route.name||$route.path"
		 :collapse="menuDisplay" @select="selectItem" unique-opened :background-color="$store.state.menu.backgroundColor"
		 :text-color="$store.state.menu.color" :active-text-color="$store.state.menu.colorActive">
			<menuItem v-for="item in menuList" :key="item.path" :item="item">
			</menuItem>
		</el-menu>
	</div>
</template>

<script>
	import Logo from '../Logo';
	import menuItem from './menuItem';

	export default {
		name: 'Menu',
		data() {
			return {
				menuList: [], //菜单列表
				activeItem: {}, //真正展示的菜单
			}
		},
		created() {},
		mounted() {
			this.menuList = this.filterMenu(JSON.parse(JSON.stringify(this.$store.state.routes)));
		},
		computed: {

		},
		methods: {
			selectItem(key, keyPath) { //获取菜单点击项
				if (this.$route.name !== key) this.$router.push({
					name: key
				});
				this.activeItem = keyPath[0];
			},
			filterMenu(list) { //过滤菜单
				let menu = [];
				for (let item of list) {
					if (item.children && item.children.length > 0) {
						item.children = this.filterMenu(item.children);
					}
					if (!item.meta.hidden) menu.push(item);
				}
				return menu;
			},
		},
		watch: {
			activeItem(newValue, oldValue) {
				if (oldValue != {}) this.$refs.nav.close(oldValue);
			},
		},
		props: ['menuDisplay'],
		components: {
			Logo,
			menuItem,
		},
	}
</script>

<style lang="scss">
	.aside {
		z-index: 999;
		height: 100%;
		color: var(--menu_color);
		user-select: none;
		overflow: hidden !important;
		background: var(--menu_background_color);
		position: relative;

		.logo {
			top: 0;
			left: 0;
			right: 0;
			position: absolute;
			margin: 0 auto;
		}

		.nav {
			text-align: left;
			border: none;
			margin-top: 190px;

			&.el-menu-vertical-demo:not(.el-menu--collapse) {
				width: 240px;
			}
		}

		.el-menu {
			.el-menu-item:focus {
				background: var(--basis--tran);
			}

			.el-menu-item,
			.el-submenu__title {

				&,
				.el-icon-location,
				.el-icon-tickets,
				.el-icon-menu,
				.el-submenu__icon-arrow {
					color: var(--menu_color);
				}
			}

			.el-menu--inline>li>div {
				padding-left: 2ch;
			}

			.is-active {

				&>div,
				&>.el-submenu__title {

					&,
					.el-icon-location,
					.el-icon-tickets,
					.el-icon-menu,
					.el-submenu__icon-arrow {
						color: var(--menu_color--active) !important;
					}
				}
			}

			.el-menu-item:hover,
			.el-submenu__title:hover {

				&,
				.el-icon-location,
				.el-icon-tickets,
				.el-icon-menu,
				.el-submenu__icon-arrow {
					background: var(--basis--tran);
				}
			}
		}

		.nav--collapse {
			width: 35px !important;
			text-align: center;
			margin-top: 112px;

			.el-submenu__title,
			.el-menu-item {
				padding: 0 !important;
			}

			.el-submenu__icon-arrow,
			span {
				display: none;
			}

			.el-icon-tickets {
				margin: 0 !important;
			}
		}
	}
</style>
