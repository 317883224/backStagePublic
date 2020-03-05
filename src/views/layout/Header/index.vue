<template>
	<div class="header">
		<div class="header_left" @click="emitMenuDisplay">
			<i class="header_left_icon header_icon" title="切换菜单">
				<svg-icon iconClass="menuSwitch3" :class="menuDisplay?'i--true':'i--false'" ></svg-icon>
			</i>
		</div>
		<div class="header_right">
			<div class="header_right_icons">
				<i class="header_icon refresh" title="刷新" :class="{'refresh--animation':foreUpdataStatus}" @click="foreUpdata">
					<svg-icon iconClass="shuaxin" ></svg-icon>
				</i>
				<i class="header_icon el-icon-lock" title="锁屏" @click="lockScreen"></i>
				<i class="header_icon el-icon-message announcement" :class="{'badge':emailStatus}" title="邮件信息"></i>
				<i class="header_icon el-icon-bell announcement" :class="{'badge':badgeStatus}" title="系统通告"></i>
				<i class="header_icon screen" title="全屏显示" @click="setScreen">
					<svg-icon :iconClass="!isFullScreen?'quanping':'zhengchangpingmudaxiao'" ></svg-icon>
				</i>
			</div>
			<lang-menu />
			<header-menu />
		</div>
		<lockScreen ref="lockScreen" />
	</div>
</template>

<script>
	import headerMenu from './components/Menu';
	import LangMenu from './components/LangMenu';

	export default {
		name: 'Header',
		data() {
			return {
				foreUpdataStatus:false,//更新状态
				emailStatus:true,
				badgeStatus:true,//通告状态
				isFullScreen:false,//全屏状态
			}
		},
		created() {},
		mounted() {
		},
		computed: {

		},
		methods: {
			//触发改变 menuDisplay
			emitMenuDisplay() {
				this.$emit('setMenuDisplay');
			},
			//控制显示全屏 退出全屏
			setScreen(){
				let isFullScreen = document.fullscreenElement || document.mozFullScreenElement||document.webkitFullscreenElement||false;
				isFullScreen?this.exitScreen():this.fullScreen();
			},
			//全屏
			fullScreen(){
				let el = document.documentElement;
				let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen|| false;
				if(rfs) rfs.call(el);
				this.isFullScreen = true;
			},
			//退出全屏
			exitScreen(){
				let rfs = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen|| false;
				if(rfs) rfs.call(document);
				this.isFullScreen = false;
			},
			//强制刷新
			foreUpdata(){
				if(this.foreUpdataStatus) return;
				this.foreUpdataStatus = true;
				this.$emit('foreUpdata');
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.foreUpdataStatus = false;
					},1000);
				})
			},
			//锁屏
			lockScreen(){
				this.$refs.lockScreen.setShow(true);
			},
		},
		props: ['menuDisplay'],
		components: {
			headerMenu,
			LangMenu,
			lockScreen: resolve => {
				require(['@/components/LockScreen'], resolve)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		height: 100%;
		text-align: left;
		position: relative;
		background: $basis--background;

		.header_icon {
			color: #000;
			cursor: pointer;
			line-height: $height !important;
			font-size: var(--fontSize--4);
			svg{
				animation: 0.3s;
				animation-fill-mode: forwards;
			}
			.i--true {
				animation-name: menuDisplay1;
			}
			.i--false {
				animation-name: menuDisplay2;
			}
		}
		.header_left{
			top: 0;
			left: -$margin;
			height: 100%;
			cursor: pointer;
			position: absolute;
			padding: 0 $margin;
		}
		.header_right {
			top: 0;
			right: 0;
			height: 100%;
			position: absolute;
			.header_right_icons{
				height: 100%;
				display: inline-block;
				vertical-align: top;
			}
			.header_icon{
				color: var(--fontColor--conventional);
				font-size: var(--fontSize--2);
				padding: 0 8px;
				&:hover{
					color: #000;
				}
			}
			
			.badge{
				position: relative;
				&::after{
				content: '';
				position: absolute;
				right: 0;
				top: 6px;
				width: 20px;
				height: 20px;
				transform: scale(.35);
				background: red;
				border-radius: 100%;
				animation: 2s badge infinite;
			}
			}
		}
	}

	@keyframes menuDisplay1 {
		0% {
			transform: rotateY(0deg);
		}

		100% {
			transform: rotateY(180deg);
		}
	}

	@keyframes menuDisplay2 {
		0% {
			transform: rotateY(180deg);
		}

		100% {
			transform: rotateY(0deg);
		}
	}
	
	@keyframes badge {
		0% {
			box-shadow: 0 0 0 0 rgba(67,74,84,0.7);
		}
		70% {
			box-shadow: 0 0 0 20px rgba(67,74,84,0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(67,74,84,0);
		}
	}
</style>

<style lang="scss">
	.el-header{
		.el-submenu__icon-arrow {
			color: #000000 !important;
		}
		.el-submenu__title{
			height: $height !important;
		}
	}
	.header_right_logout::before{
		width: 100%;
		height: 1px;
		content: '';
		background: #e6e6e6;
		display: block;
		margin: 10px 0;
	}
</style>
