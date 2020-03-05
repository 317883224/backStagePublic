<template>
	<div class="login">
		<div class="login_logo">
			<img src="../../assets/img/logo.png" alt="后台模板">
		</div>
		<div class="login_box">
			<formLogin v-if="loginStatus" @setLoginStatus="setLoginStatus" @setData="setData"></formLogin>
			<formRegistered v-else @setLoginStatus="setLoginStatus" @setData="setData"></formRegistered>
		</div>
		<!-- 背景 -->
		<switchBg></switchBg>
	</div>
</template>

<script>
	import formLogin from './modules/formLogin';
	import formRegistered from './modules/formRegistered';
	import switchBg from './switchBg';

	export default {
		name: 'Login',
		data() {
			return {
				loginStatus: true, //true登录 false注册
			}
		},
		created() {
			if (this.$route.query.name && this.$route.query.name !== '') location.replace();
		},
		mounted() {},
		computed: {

		},
		methods: {
			generateQR(index, apiUrl) { //生成二维码
				this.QRList[index].status = true;
				new qrcodejs('qrcode_img' + index, {
					width: 200,
					height: 200,
					text: 'http://www.baidu.com',
					colorDark: "#000",
					colorLight: "#fff",
					correctLevel: 3
				});
				this.QRList[index].status = false;
			},
			//保存数据
			setData(val) {
				this.$store.commit('setUser', val.user);
				this.$store.commit('setMenu', val.menu);
				this.$router.replace({
					name: this.$route.query.name || 'home',
					query: this.$route.query.query || ''
				})
			},
			//设置登录状态 true登录 false注册
			setLoginStatus(val) {
				this.loginStatus = val;
			},
		},
		props: [],
		components: {
			switchBg,
			formLogin,
			formRegistered,
		},
	}
</script>

<style lang="scss" scoped>
	.login {
		width: 100vw;
		height: 100vh;
		user-select: none;
		position: relative;

		#{&}_logo {
			z-index: 1;
			max-width: 80px;
			max-height: 80px;
			top: 20px;
			left: 30px;
			position: absolute;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.login_box {
			z-index: 2;
			width: 320px;
			top: calc(50vh - 220px);
			left: 0;
			right: 0;
			box-shadow: 0px 0px 20px -3px #fff;
			background: rgba(0, 0, 0, 0.5);
			border-radius: 10px;
			box-sizing: border-box;
			position: absolute;
			margin: 0 auto;
			padding: 30px;
		}
	}
</style>
