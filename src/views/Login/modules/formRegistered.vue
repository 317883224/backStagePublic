<template>
	<div class="registered_form" @keyup.enter="onFormregistered">
		<p class="registered_form_title">注册</p>
		<el-form :model="form" ref="form" class="form" label-width="30px" label-position="left" :rules="formRules" size="small"
		 :hide-required-asterisk="true">
			<el-form-item prop="username">
				<svg-icon iconClass="zhanghao" slot="label"></svg-icon>
				<el-input v-model="form.username" maxlength="20" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<svg-icon iconClass="mima" slot="label"></svg-icon>
				<el-input type="password" v-model="form.password" maxlength="20" placeholder="登录密码" show-password autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="checkPassword">
				<svg-icon iconClass="quanrenmima" slot="label"></svg-icon>
				<el-input type="password" v-model="form.checkPassword" maxlength="20" placeholder="确认密码" show-password autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="checkCode">
				<svg-icon iconClass="yanzhengmamima" slot="label"></svg-icon>
				<el-input v-model="form.checkCode" maxlength="5" placeholder="验证码">
					<el-button size="mini" slot="append" @click="setCheckCOde" class="login_form_checkCode">{{checkCode}}</el-button>
				</el-input>
			</el-form-item>
			<el-button type="primary" :loading="formSubmitLoading" ref="formSubmit" class="registered_form_formSubmit" size="medium"
			 @click="onFormregistered">登录</el-button>
		</el-form>
		<div class="registered_form_registered">
			<el-checkbox v-model="form.registrationStatement" class="registrationStatement">注册声明</el-checkbox>
			<el-button @click="$emit('setLoginStatus',true)" type="text" size="mini">已有账号？</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'formregistered',
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
			};
			const password = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('密码不得少6位'));
				} else if (this.form.checkPassword !== '') {
					this.$refs.form.validateField('checkPassword');
				}
				callback();
			};
			const checkPassword = (rule, value, callback) => {
				if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				form: {
					username: '',
					password: '',
					checkPassword: '',
					checkCode: '',
					registrationStatement: false, //注册声明
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
						message: '登录密码不能为空',
					}, {
						validator: chinese,
						trigger: 'change',
					}, {
						validator: password,
						trigger: ['change', 'blur'],
					}],
					checkPassword: [{
						required: true,
						message: '确认密码不能为空',
					}, {
						validator: chinese,
						trigger: 'change',
					}, {
						validator: checkPassword,
						trigger: ['change', 'blur'],
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
			}
		},
		created() {},
		mounted() {
			this.setCheckCOde();
		},
		methods: {
			registered() { //登录接口
				this.formSubmitLoading = true;
				setTimeout(() => {
					this.formSubmitLoading = false;
					let data = {};
					this.$emit('setData', data);
				}, 1000)
			},
			onFormregistered() { //登录
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.registered();
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
	}
</script>

<style lang="scss">
	.registered_form {
		width: 100%;
		height: 100%;
		color: #606266;
		font-size: var(--fontSize);
		text-align: left;

		.registered_form_title {
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

			.el-form-item:focus-within {
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

			.registered_form_formSubmit {
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

		.registered_form_registered {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30px;

			.registrationStatement {
				&.is-checked {
					.el-checkbox__inner {
						border-color: #409EFF;
					}
				}

				.el-checkbox__inner {
					background: transparent;
					border-color: #606266;
				}

				.el-checkbox__label {
					font-size: var(--fontSize);
				}
			}
		}
	}
</style>
