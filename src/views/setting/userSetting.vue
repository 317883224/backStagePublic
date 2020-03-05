<template>
	<div class="userSetting">
		<el-form ref="form" :model="form" :rules="rules" label-width="116px" size="small">
			<el-form-item label="用户名称" prop="name">
				<el-input v-model.trim="form.name" clearable></el-input>
			</el-form-item>
			<el-form-item label="用户账号" prop="username">
				<el-input v-model.trim="form.username" clearable></el-input>
			</el-form-item>
			<el-form-item label="用户账号" prop="username">
				<el-button @click="$router.push({name:'setPassword'})" type="success" icon="el-icon-edit" title="修改密码" circle></el-button>
			</el-form-item>
			<el-form-item label="账号角色" prop="role">
				<el-select v-model="form.role" placeholder="请选择账号角色" disabled>
					<el-option label="超管" value="shanghai"></el-option>
					<el-option label="管理员" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="用户性别" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio :label="0">男</el-radio>
					<el-radio :label="1">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="用户邮箱" prop="email">
				<el-input v-model.trim="form.email" type="email" clearable></el-input>
			</el-form-item>
			<el-form-item label="用户邮编" prop="postcode">
				<el-input v-model.trim="form.postcode" maxlength="6" clearable></el-input>
			</el-form-item>
			<el-form-item label="用户地址" prop="address">
				<el-cascader v-model="form.address" :options="addressList" :props="{ checkStrictly: true }" class="address" clearable></el-cascader>
			</el-form-item>
			<el-form-item label="用户爱好" prop="hobby">
				<el-checkbox-group v-model="form.hobby">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="账号创建时间">
				<span>{{form.creatTiem}}</span>
			</el-form-item>
			<el-form-item label="上次登录时间">
				<span>{{form.lastTime}}</span>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">保存</el-button>
				<el-button @click="resetForm">撤销</el-button>
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
			return {
				form: {
					name: '', //用户名称
					username: '666666666', //账号
					role: '', //角色
					sex: null, //性别
					email: '000000@qq.com', //邮箱
					postcode: '000000', //邮编
					address: '', //地址
					hobby: [], //爱好
					creatTiem: '2019-11-29 15:30:11', //账号创建时间
					lastTime: '2019-11-29 15:30:11', //上次登录时间
				},
				rules: {
					name: [{
						required: true,
						message: '用户名称不能为空'
					}],
					username: [{
						required: true,
						message: '用户账号不能为空'
					}, {
						min: 5,
						max: 11,
						message: '用户账号长度在 5 到 11 个字符',
						trigger: ['change', 'blur'],
					}],
					role: [{
						required: true,
						message: '角色不能为空'
					}],
					email: [{
						type: 'email',
						message: '用户邮箱类型有误',
						trigger: ['blur'],
					}, {
						min: 5,
						max: 30,
						message: '用户邮箱长度在 5 到 30 个字符',
						trigger: ['change', 'blur'],
					}],
					postcode: [{
						validator: (rule, value, callback)=>{this.form[rule.field] = positiveInteger(rule, value, callback)},
						trigger: 'blur',
					},{
						min: 4,
						max: 6,
						message: '邮编 4 ~ 6 位',
						trigger: ['change', 'blur'],
					},]
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
