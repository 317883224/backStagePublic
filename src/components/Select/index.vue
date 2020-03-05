<!-- 
******************************** 选择器组件说明 **********************************
* 
************属性 attr
*   参数						说明																类型					可选值					默认值
*   options 				数据 															array 				--						[]
*   labelName 				label数据别名 													string 				--						label
*   valueName 				value数据别名 													string 				-- 						label
*   size 					大小 															string 				medium small mini 		mini
* 	disabled 				是否禁用															boolean				true false				false
* 	clearable 				是否可以清空选项													boolean				true false				false
*	filterable				是否可搜索														boolean	—			false
*   multiple 				多选 															boolean 			true false 				false
* 	collapseTags			多选时是否将选中值按文字的形式展示									boolean				true false				false
* 	multipleLimit			多选时用户最多可以选择的项目数，为 0 则不限制							number				—						0
* 	placeholder				占位符															string				—						请选择
* 	defaultFirstOption		在输入框按下回车，选择第一个匹配项。需配合 filterable 使用				boolean				true false				false
* 	noMatchText				搜索条件无匹配时显示的文字，也可以使用slot="empty"设置				string				—						无匹配数据
* 	noDataText				选项为空时显示的文字，也可以使用slot="empty"设置						string				—						无数据
* 
*************options分组
* 参数			说明	类							类型					可选值		默认值
* label			分组的组名						string				—			—
* disabled		是否将该分组下所有选项置为禁用		boolean				—			false
* 
************事件 function
* 	事件名称					说明										回调参数
* 	change					选中值发生变化时触发						目前的选中值
* 	visibleChange			下拉框出现/隐藏时触发						出现则为 true，隐藏则为 false
* 	removeTag				多选模式下移除tag时触发					移除的tag值
* 	clear					可清空的单选模式下用户点击清空按钮时触发		—
* 	blur					当 input 失去焦点时触发					(event: Event)
* 	focus					当 input 获得焦点时触发					(event: Event)
* 
************方法 methods
* 	方法名		说明								参数
* 	focus		使 input 获取焦点					-
* 	blur		使 input 失去焦点，并隐藏下拉框		-
* 
*  -->
<template>
	<el-select :value="value" ref="select" :size="size" :disabled="disabled" :clearable="clearable" :filterable="filterable"
	 :multiple="multiple" :collapse-tags="collapseTags" :multiple-limit="multipleLimit" class="select" :placeholder="placeholder"
	 :default-first-option="defaultFirstOption" :no-match-text="noMatchText" :no-data-text="noDataText" @change="change"
	 @visible-change="visibleChange" @removeTag="removeTag" @clear="clear" @blur="blurEmit" @focus="focusEmit" @input="inputEmit">
		<el-option-group v-for="item in options" :key="item.label" v-if="item.options" :label="item.label" :disabled="item.disabled">
			<el-option v-for="groupItem in group.options" :key="groupItem.value" :label="groupItem.label" :value="groupItem.value" :disabled="groupItem.disabled"></el-option>
		</el-option-group>
		<el-option :key="item.value" v-else :label="item[labelName]" :value="item[valueName]" :disabled="item.disabled"></el-option>
	</el-select>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
			}
		},
		mounted(){
		},
		methods: {
			//选中值发生变化时触发
			change(value) {
				this.$emit('change', value);
			},
			//下拉框出现/隐藏时触发
			visibleChange(status) {
				this.$emit('visibleChange', status);
			},
			//多选模式下移除tag时触发
			removeTag(tag) {
				this.$emit('removeTag', tag);
			},
			//可清空的单选模式下用户点击清空按钮时触发
			clear() {
				this.$emit('clear');
			},
			//当 input 失去焦点时触发
			blurEmit(event) {
				this.$emit('blur', event);
			},
			//当 input 获得焦点时触发
			focusEmit(event) {
				this.$emit('focus', event);
			},
			//使 input 获取焦点
			focus() {
				this.$refs.select.focus();
			},
			//使 input 失去焦点，并隐藏下拉框
			blur() {
				this.$refs.select.blur();
			},
			//双向绑定
			inputEmit(value){
				this.$emit('input',value)
			},
		},
		watch: {
		},
		props: {
			value:{
				type:[String,Number,Array],
			},
			options: {
				type: Array,
				default: () => {
					return [];
				}
			},
			labelName: {
				type: String,
				default: () => {
					return 'label';
				}
			},
			valueName: {
				type: String,
				default: () => {
					return 'value';
				}
			},
			size: {
				type: String,
				default: () => {
					return 'mini';
				}
			},
			disabled: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			clearable: {
				type: Boolean,
				default: () => {
					return true;
				}
			},
			filterable: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			multiple: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			collapseTags: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			multipleLimit: {
				type: Number,
				default: () => {
					return 0;
				}
			},
			placeholder: {
				type: String,
				default: () => {
					return '请选择';
				}
			},
			defaultFirstOption: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			noMatchText: {
				type: String,
				default: () => {
					return '无匹配数据';
				}
			},
			noDataText: {
				type: String,
				default: () => {
					return '无数据';
				}
			},
		},
	}
</script>

<style>
</style>
