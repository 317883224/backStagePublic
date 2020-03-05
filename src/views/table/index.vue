<template>
	<div class="tableTest routerView--table">
		<search :list="list" ref="search" @change="change" @click="searchClick" @init="searchInit">
			<com-select v-model="list[2].value" size="small" :options="options" @change="(value)=>{$refs.search.setSearchValue(2,value)}" />
		</search>
		<Table class="main_content" ref="dataTable" :data="search" :total="total" @change="changeTable">
			<template slot="table" >
				<el-table :data="data" ref="table" border>
					<el-table-column type="selection" align="center" />
					<el-table-column type="index" align="center" label="序号" />
					<el-table-column prop="name" align="center" label="名称" />
					<el-table-column prop="address" align="center" label="地址" />
					<el-table-column prop="date" align="center" label="日期" width="180" />
					<el-table-column label="操作" align="center" width="180" >
						<template slot-scope="scope">
							<el-button type="success" @click="$refs.tableTestChange.displayDailog(scope.row)">修改</el-button>
							<el-button type="infor" @click="$refs.tableTestDetails.displayDailog(scope.row)">详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</Table>
		<!-- 添加 -->
		<tableTest-change ref="tableTestChange"/>
		<!-- 详情 -->
		<tableTest-details ref="tableTestDetails"/>
	</div>
</template>

<script>
	import Search from '@/components/Search';
	import comSelect from '@/components/Select';
	import Table from '@/components/Table';
	import tableTestChange from './table/tableTestChange';
	import tableTestDetails from './table/tableTestDetails';

	export default {
		name: 'tableIndex',
		data() {
			return {
				list: [{
					name:'times',
					type: 'datetimerange',
					label: '时间选择器',
					value: this.$route.query.times ||[],
				}, {
					type: 'cascader',
					name: 'a',
					value: this.$route.query.a,
					options: [{
						value: 'zhinan',
						label: '指南',
						children: [{
							value: 'shejiyuanze',
							label: '设计原则',
							children: [{
								value: 'yizhi',
								label: '一致'
							}, {
								value: 'fankui',
								label: '反馈'
							}, {
								value: 'xiaolv',
								label: '效率'
							}, {
								value: 'kekong',
								label: '可控'
							}]
						}, {
							value: 'daohang',
							label: '导航',
							children: [{
								value: 'cexiangdaohang',
								label: '侧向导航'
							}, {
								value: 'dingbudaohang',
								label: '顶部导航'
							}]
						}]
					}]
				}, {
					type: 'slot',
					value: this.$route.query['2']||'Guangzhou',
				}],
				options: [{
					value: 'Chengdu',
					label: '成都'
				}, {
					value: 'Shenzhen',
					label: '深圳'
				}, {
					value: 'Guangzhou',
					label: '广州'
				}, {
					value: 'Dalian',
					label: '大连'
				}],
				data: [],
				search:{},
				total:0,
			}
		},
		created() {

		},
		mounted() {
		},
		computed: {

		},
		methods: {
			//搜索条件改变触发
			change(searchValue,name,value) {
				console.log(searchValue,name,value);
			},
			//搜索条件确定触发
			searchClick(value){
				this.search = value;
			},
			//搜索条件初始化值
			searchInit(value){
				this.search = value;
			},
			//表格搜索数据改变
			changeTable(value){
				this.getTableData(value);
			},
			//获取表格数据
			getTableData(value){
				this.data = [{
					date: '2016-05-02',
					name: JSON.stringify(value),
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}]
				this.$refs.table.toggleAllSelection();
				this.total = this.data.length+10;
			},
		},
		props: [],
		components: {
			Search,
			comSelect,
			Table,
			tableTestChange,
			tableTestDetails,
		},
	}
</script>

<style lang="scss" scoped>
	.tableTest {
		padding: 0;
	}
</style>
