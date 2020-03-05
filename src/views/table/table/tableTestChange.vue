<template>
	<com-dialog ref="dialog" title="修改" >
		<el-form @keyup.enter.native="submitForm" ref="form" :model="form" label-width="70px">
			<el-form-item label="名称" prop="name">
				<el-input v-model.trim="form.name" maxlength="20" clearable></el-input>
			</el-form-item>
			<el-form-item label="地址" prop="address">
				<el-input v-model.trim="form.address" maxlength="20" clearable></el-input>
			</el-form-item>
			<el-form-item label="日期" prop="date">
				<el-input v-model.trim="form.date" maxlength="20" clearable></el-input>
			</el-form-item>
		</el-form>
		<template slot="footer">
			<el-button @click="backForm">取消</el-button>
			<el-button type="primary" @click="submitForm">修改</el-button>
		</template>
	</com-dialog>
</template>

<script>
	import comDialog from '@/components/Dialog';

	export default {
		name: 'tableTextAdd',
		data() {
			return {
				form: {},//修改数据
				row:{},//父组件传来的一列数据
			}
		},
		methods: {
			//显示对话框
			displayDailog(row) {
				this.row = row;
				this.$refs.dialog.visible = true;
				this.$nextTick(()=>{
					this.form = JSON.parse(JSON.stringify(row));
				})
			},
			//修改
			submitForm() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						Object.assign(this.row,this.form);
						this.$refs.dialog.visible = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//取消
			backForm() {
				this.$refs.form.resetFields();
				this.$refs.dialog.visible = false;
			}
		},
		components: {
			comDialog,
		},
	}
</script>

<style lang="scss">

</style>
