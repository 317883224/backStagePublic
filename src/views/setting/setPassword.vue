<template>
	<div class="userSetting">
		<el-form ref="form" :model="form" :rules="rules" label-width="116px" size="small">
			<el-form-item label="旧登录密码" prop="oldPassword">
				<el-input v-model.trim="form.oldPassword" maxlength="20" clearable></el-input>
			</el-form-item>
			<el-form-item label="新登录密码" prop="newPassword">
				<el-input v-model.trim="form.newPassword" maxlength="20" clearable></el-input>
			</el-form-item>
			<el-form-item label="确认新密码" prop="confirmPassword">
				<el-input v-model.trim="form.confirmPassword" maxlength="20" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">修改</el-button>
				<el-button @click="resetForm">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		positiveInteger,
	} from '@/utils/rules.js';

	export default {
		name: 'userSetting',
		data() {
			const oldPassword = (rule, value, callback) => {
				if (this.form.newPassword !== '') {
					this.$refs.form.validateField('newPassword');
				}
				callback();
			}
			const newPassword = (rule, value, callback) => {
				if(value === this.form.oldPassword){
					callback('新旧密码不能一致');
				}else if (this.form.confirmPassword !== '') {
					this.$refs.form.validateField('confirmPassword');
				}
				callback();
			}
			const confirmPassword = (rule, value, callback) => {
				if (value !== this.form.newPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			}
			return {
				form: {
					oldPassword: '', //旧登录密码
					newPassword: '', //新登录密码
					confirmPassword: '', //确认新密码
				},
				rules: {
					oldPassword: [{
						required: true,
						message: '旧登录密码不能为空'
					}, {
						min: 5,
						max: 20,
						message: '旧登录密码长度在 5 到 20 个字符',
						trigger: ['change', 'blur'],
					}, {
						validator: oldPassword,
						trigger: 'blur',
					}],
					newPassword: [{
						required: true,
						message: '新登录密码不能为空'
					}, {
						min: 5,
						max: 20,
						message: '新登录密码长度在 5 到 20 个字符',
						trigger: ['change', 'blur'],
					}, {
						validator: newPassword,
						trigger: 'blur',
					}],
					confirmPassword: [{
						required: true,
						message: '确认新密码不能为空'
					}, {
						min: 5,
						max: 20,
						message: '确认新密码长度在 5 到 20 个字符',
						trigger: ['change', 'blur'],
					}, {
						validator: confirmPassword,
						trigger: 'blur',
					}],
				},
				addressList: [], //地址
			}
		},
		created() {},
		mounted() {},
		computed: {

		},
		methods: {
			submitForm() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				this.$refs.form.resetFields();
				this.$router.back();
			}
		},
		props: [],
		components: {},
	}
</script>

<style lang="scss" scoped>
	.userSetting {
		form {
			width: 730px;

			span {
				color: var(--fontColor--conventional);
			}
		}
	}
</style>
