<template>
	<div class="login_form" @keyup.enter="onFormLogin">
		<p class="login_form_title">登录</p>
		<el-form :model="form" ref="form" class="form" label-width="30px" label-position="left" :rules="formRules" size="small"
		 :hide-required-asterisk="true">
			<el-form-item prop="username">
				<svg-icon iconClass="zhanghao" slot="label"></svg-icon>
				<el-input v-model="form.username" maxlength="20"
				 placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<svg-icon iconClass="mima" slot="label"></svg-icon>
				<el-input type="password" v-model="form.password"
				 maxlength="20" placeholder="密码" show-password autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="checkCode">
				<svg-icon iconClass="yanzhengmamima" slot="label"></svg-icon>
				<el-input v-model="form.checkCode" maxlength="5"
				 placeholder="验证码">
					<el-button size="mini" slot="append" @click="setCheckCOde" class="login_form_checkCode">{{checkCode}}</el-button>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox-group class="login_form_checkboxGroup" size="mini" v-model="form.loginCheckbox">
					<el-checkbox :label="0">记住密码</el-checkbox>
					<el-checkbox :label="1">自动登陆</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-button type="primary" :loading="formSubmitLoading" ref="formSubmit" class="login_form_formSubmit" size="medium"
			 @click="onFormLogin">登录</el-button>
		</el-form>
		<div class="login_form_registered">
			<el-button @click="$emit('setLoginStatus',false)" type="text" size="mini">注册用户？</el-button>
		</div>
		<div class="thirdPartyLogin">
			<p>第三方登录</p>
			<el-button v-for="item in QRList" :title="item.label" :key="item.icon" @click="$refs.QRcode.QRcodeString = item.url" size="mini" circle>
				<svg-icon :iconClass="item.icon" />
			</el-button>
		</div>
		<QRcode ref="QRcode" class="QRcodeBox"></QRcode>
	</div>
</template>

<script>
	import QRcode from './QRcode';

	export default {
		name: 'formLogin',
		data() {
			var chinese = (rule, value, callback) => {
				let reg = /[\u4e00-\u9fa5]/;
				if (reg.test(value)) {
					function checkAdult(val) {
						return !reg.test(val);
					}
					return this.form[rule.field] = value.split('').filter(checkAdult).join('');
				}
				return callback();
			}
			const checkCode = (rule, value, callback) => {
				if (this.checkCode === value) {
					callback();
				} else {
					this.setCheckCOde();
					callback('验证码不正确,请重新输入');
				}
			}
			return {
				form: {
					username: '',
					password: '',
					checkCode: '',
					loginCheckbox: [],
				},
				formRules: {
					username: [{
						required: true,
						message: '账号不能为空',
					}, {
						validator: chinese,
						trigger: 'change',
					}],
					password: [{
						required: true,
						message: '密码不能为空',
					}, {
						validator: chinese,
						trigger: 'change',
					}],
					checkCode: [{
						required: true,
						message: '验证码不能为空',
					}, {
						validator: checkCode,
						trigger: 'blur',
					}],
				},
				formSubmitLoading: false, //登录状态
				checkCode: '', //验证码
				QRList: [{ //第三方信息
					label: '支付宝',
					url: 'http://www.baidu.com',
					apiUrl: '',
					icon: "zhifubao",
					status: false,
				}, {
					label: '百度',
					url: 'http://www.baidu.com',
					apiUrl: '',
					icon: "weixin",
					status: false,
				}],
			}
		},
		created() {
			this.form.loginCheckbox = JSON.parse(localStorage.getItem('loginCheckbox') || '[]');
			this.form.username = localStorage.getItem('username') || '';
			this.form.password = localStorage.getItem('password') || '';
			if (this.form.loginCheckbox.includes(1)) {
				this.login();
			}
		},
		mounted() {
			this.setCheckCOde();
		},
		methods: {
			login() { //登录接口
				this.formSubmitLoading = true;
				setTimeout(() => {
					this.formSubmitLoading = false;
					let data = {};
					localStorage.setItem('username', this.form.loginCheckbox.includes(0) ? this.form.username : '');
					localStorage.setItem('password', this.form.loginCheckbox.includes(0) ? this.form.password : '');
					localStorage.setItem('loginCheckbox', JSON.stringify(this.form.loginCheckbox));
					this.$emit('setData', data);
				}, 1000)
			},
			onFormLogin() { //登录
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.login();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//设置验证码
			setCheckCOde() {
				let codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
					'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
					'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
				let random = '';
				for (let i = 0; i < 5; i++) {
					random += codeChars[Math.floor(Math.random() * codeChars.length)];
				}
				this.checkCode = random;
			},
		},
		components: {
			QRcode,
		},
	}
</script>

<style lang="scss">
	.login_form {
		width: 100%;
		height: 100%;
		color: #606266;
		font-size: var(--fontSize);
		text-align: left;
		position:relative;

		.login_form_title {
			color: #D3D7F7;
			font-size: var(--fontSize--4);
			margin: 30px 0;
		}

		.form {

			.el-input__inner,
			.el-input-group__append {
				border-width: 0;
				border-radius: 0;
			}

			.el-input__inner,
			.el-input-group__append,
			.el-checkbox__inner {
				background: transparent;
			}
			
			.el-form-item:focus-within{
				color: #fff;
				.el-form-item__label {
					color: inherit;
					.svg-icon {
						transition: .1s;
					}
				}
			}

			.el-input__inner {
				color: #61BFFF;
				padding-left: 0;
			}

			.login_form_checkCode {
				color: transparent !important;
				font-size: 20px;
				letter-spacing: 3px;
				font-style: italic;
				background: linear-gradient(to right, red, blue);
				-webkit-background-clip: text;
			}

			.login_form_checkboxGroup {
				.is-checked {
					.el-checkbox__inner {
						border-color: #409EFF;
					}
				}

				.el-checkbox__label {
					font-size: var(--fontSize);
				}

				.el-checkbox__inner {
					background: transparent;
					border-color: #606266;
				}
			}

			.login_form_formSubmit {
				width: 100%;
				background: linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
				background-size: 300%;
				background-position: 50%;
				transition: .5s;
				border: none;
				margin: 20px 0 10px;

				&:hover {
					background-position: 0%;
				}
			}
		}

		.login_form_registered {
			text-align: right;
			margin-bottom: 30px;
		}

		.thirdPartyLogin {
			text-align: center;

			.el-button {
				background: transparent;
				border: none;
			}
		}
		
		.QRcodeBox{
			z-index: 10;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			text-align: center;
			position: absolute;
			margin: 0 auto;
		}
	}
</style>
