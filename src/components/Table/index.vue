<!-- 
******************************** table表格组件说明 **********************************
* 
************属性 attr
*   参数						说明								类型					可选值					默认值
* 	data 					搜索数据							json 				--						--
* 	total 					数据总数						number,string 		-- 						--
* 	routerPush 				是否查询值改变时路由跳转			boolean 			--						true
* 	page-sizes 				同el-pagination 
* 
************事件 event
* 	事件名称					说明										回调参数
* 	change 					改变搜索的其中一个条件触发					searchValue
* 	changePage 				页数改变触发									value(页数)
* 	changeCurrent 			当前页改变触发								value(当前页)
* 
************方法 methods
* 	方法名				说明					参数			回调
* 
*  -->
<template>
	<div class="table" ref="table">
		<!-- 表格功能 -->
		<slot name="table"></slot>
		<!-- 分页功能 -->
		<el-pagination ref="pagination" class="pagination" @size-change="emitPage" @current-change="emitCurrent" :page-sizes="pageSizes"
		 :current-page.sync="baseData.current" :page-size.sync="baseData.page" :total="total" layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'Table',
		data() {
			return {
				baseData: {
					current: parseInt(this.$route.query.current)||1, //当前页
					page: parseInt(this.$route.query.page)||10, //页数
				},
				dataStatus:false,//数据状态，是否改变过
			}
		},
		methods: {
			//改变触发页数
			emitPage(value) {
				this.$emit('changePage', value);
			},
			//改变触发当前页
			emitCurrent(value) {
				this.$emit('changeCurrent', value);
			},
			//触发改变搜索数据
			emitChange(){
				let _data = Object.assign(JSON.parse(JSON.stringify(this.baseData)),this.data);
				if(this.routerPush&&this.dataStatus) {
					this.$router.push({
						nmae:this.$route.name,
						query: _data,
					})
				}
				this.dataStatus = true;
				this.$emit('change', _data);
			}
		},
		watch: {
			data: {
				handler(newValue, oldValue) {
					this.emitChange();
				},
				deep:true,
			},
			baseData:{
				handler(newValue, oldValue) {
					this.emitChange();
				},
				// immediate: true,// 代表在wacth里声明了方法之后立即先去执行handler方法
				deep:true,
			},
		},
		props: {
			data:{ //搜索栏数据,从父组件传入
				type:Object,
			},
			'page-sizes':{
				type:Array,
			},
			total: { //总数
				type:Number,
				default:()=>{
					return 0;
				}
			},
			routerPush:{
				type:Boolean,
				default:()=>{
					return true;
				},
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pagination {
		text-align: right;
		margin-top: 20px;
	}
</style>
<style lang="scss">
	.el-table th {
		background: #F5F7FA;
	}
</style>
