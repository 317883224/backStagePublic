<!-- 
******************************** 选择器组件说明 **********************************
* 
************属性 attr
*   参数						说明				类型					可选值					默认值
*   list 					数据 			array 				--						[]
* 	size 					大小				string 				medium small mini 		mini
* 
*************list item(具体参数查询对应 type 的 说明)
* 	参数				说明								类型					可选值		默认值
* 	type			需要生成的组件的类型				string				—			—
* 	name 			key名称							string 				-			index
* 	label			名称								string				—			-
* 	labelColor 		名称颜色							string 				-			'#000'
* 	slot 			slot名称							string 				-			-
* 
*************type说明
* 	type 			说明	
* 	select 			选择器(select组件说明)
* 	cascader 		级联选择器(element-u 官方说明)
* 	timeSelect 		时间选择(element-u 官方说明)
* 	year 			DateTimePicker组件说明
* 	month 			DateTimePicker组件说明
* 	date 			DateTimePicker组件说明
* 	week 			DateTimePicker组件说明
* 	datetime 		DateTimePicker组件说明
* 	datetimerange 	DateTimePickerDateTimePicker组件说明
* 	daterange 		DateTimePicker组件说明
* 	dates 			DateTimePicker组件说明
* 	monthrange 		DateTimePicker组件说明
* 
************事件 function
* 	事件名称					说明										回调参数
* 	change 					改变搜索的其中一个条件触发					searchValue
* 	init 					初始化数据触发							value
* 
************方法 methods
* 	方法名				说明								参数
* 	setSearchValue 		设置 searchValue 				(name,value) name:对应的name或index value:值
* 
*  -->

<template>
	<div class="search">
		<div class="search_item" v-for="(item,index) in list" :key="index">
			<label class="search_item_label" :class="size==='medium'?'el-input--medium':size==='small'?'el-input--small':'el-input--mini'"
			 :style="{color:item.labelColor||'var(--fontColor--secondary)','padding-right':size==='medium'?'12px':size==='small'?'10px':'8px'}">{{item.label}}</label>
			<select-component v-if="item.type==='select'" v-model="item.value" :options="item.options" :labelName="item.labelName"
			 :valueName="item.valueName" :size="size||item.size" :disabled="item.disabled" :clearable="item.clearable"
			 :filterable="item.filterable" :multiple="item.multiple" :collapseTags="item.collapseTags" :multipleLimit="item.multipleLimit"
			 :placeholder="item.placeholder" :defaultFirstOption="item.defaultFirstOption" :noMatchText="item.noMatchText"
			 :noDataText="item.noDataText" @change="(value)=>{setSearchValue(item.name,value);}"></select-component>
			<el-cascader v-else-if="item.type==='cascader'" v-model="item.value" :options="item.options" :props="item.props"
			 :size="size||item.size" :placeholder="item.placeholder" :disabled="item.disabled" :clearable="item.clearable===undefined?true:item.clearable"
			 :show-all-levels="item['show-all-levels']" :collapse-tags="item['collapse-tags']" :separator="item.separator"
			 :filterable="item.filterable" @change="(value)=>{setSearchValue(item.name,value)}"></el-cascader>
			<el-time-select v-else-if="item.type==='timeSelect'" v-model="item.value" :picker-options="item['picker-options']"
			 :disabled="item.disabled" :clearable="item.clearable===undefined?true:item.clearable" :size="size||item.size"
			 :start-placeholder="item['start-placeholder']" :end-placeholder="item['end-placeholder']" :is-range="item['is-range']"
			 :range-separator="item['range-separator']" :value-format="item['value-format']" :placeholder="item.placeholder||'选择时间'"
			 @change="(value)=>{setSearchValue(item.name,value)}">
			</el-time-select>
			<date-time-picker v-else-if="['year','month','date','week','datetime','datetimerange','daterange','dates','monthrange'].includes(item.type)" v-model="item.value" @change="(value)=>{setSearchValue(item.name,value)}" :type="item.type"
			 :format="item.format" :start-placeholder="typeof item.placeholder==='object'?item.placeholder[0]:'开始日期'" :value-format="item.valueFormat"
			 :end-placeholder="typeof item.placeholder==='object'?item.placeholder[1]:'结束日期'" :placeholder="typeof item.placeholder==='string'?item.placeholder:'请选择时间'"
			 :picker-options="item.pickeroptions" :range-separator="item.rangeSeparator" :disabled="item.disabled" :clearable="item.clearable"
			 :size="size||item.size">
			</date-time-picker>
			<slot v-else-if="item.type==='slot'&&item.slot" :name="item.slot"></slot>
			<slot v-else></slot>
		</div>
		<!-- 按钮 -->
		<slot class="search_item search_button" name="button">
			 <el-button type="primary" :size="size" @click="filterSearch">搜索</el-button>
		</slot>
		<!-- 附加按钮 -->
		<slot class="search_item search_button" name="appendButton"></slot>
	</div>
</template>

<script>
	import selectComponent from '@/components/Select';
	import dateTimePicker from '@/components/DateTimePicker';

	export default {
		name: 'Search',
		data() {
			return {
				searchValue: {},//搜索参数
			}
		},
		mounted() {
			this.initSearch();
		},
		methods: {
			//改变触发
			change(name,value) {
				this.$emit('change', this.searchValue,name,value);
			},
			//设置 searchValue
			setSearchValue(name, value) {
				this.searchValue[name] = value;
				this.change(name,value);
			},
			//初始化搜索参数
			initSearch(){
				this.list.forEach((item, index, array) => {
					item.name = item.name || index;
					this.searchValue[item.name] = this.$route.query[item.name] || item.value;
				})
				this.$emit('init',this.searchValue);
			},
			//过滤搜索参数
			filterSearch(){
				let searchValue = {};
				for (let i in this.searchValue) {
					let item = this.searchValue[i];
					if(item !== undefined&&item!=='' && item !== null&&item.length>0) searchValue[i] = item;
				}
				this.$emit('click',searchValue);
			},
		},
		components: {
			selectComponent,
			dateTimePicker,
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return [];
				}
			},
			size: {
				type: String,
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search {
		display: flex;
		align-items: center;
		.search_item,
		.search_button button{
			display: inline-block;
			padding-right: 10px;

			.search_item_label {}
		}
	}
</style>
