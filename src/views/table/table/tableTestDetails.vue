<template>
	<com-dialog ref="dialog" title="详情" width="30%">
		<p v-for="(item,index) in data" :key="index">{{item}}</p>
		<template slot="footer">
			<el-button @click="$refs.dialog.visible = false">返回</el-button>
		</template>
	</com-dialog>
</template>

<script>
	import comDialog from '@/components/Dialog';
	
	export default{
		name:'tableTestDetails',
		data() {
			return {
				data:{},
			}
		},
		methods: {
			//显示对话框
			displayDailog(row){
				this.data = row;
				this.$refs.dialog.visible = true;
			},
		},
		components: {
			comDialog,
		},
	}
</script>

<style lang="scss">
	
</style>
