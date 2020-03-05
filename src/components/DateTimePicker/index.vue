<!-- 
* @name: 时间日期选择器
* @description: 用于选择时间
* @author: FYR
* @update: 2019-12-30
* 
* ******************************* 时间日期选择器说明 **********************************
* 参数参考 https://element.eleme.cn/2.11/#/zh-CN/component/datetime-picker
*  -->
<template>
	<el-date-picker ref="datePicker" :value="value" @input="input" @change="datePickerChange" @blur="datePickerBlur"
	 @focus="datePickerFocus" :default-value="defaultValue||new Date()" :type="type" :format="setFormat()" :default-time="defaultTime"
	 :value-format="valueFormat" :start-placeholder="typeof placeholder==='string'?'开始日期':placeholder[0]" :end-placeholder="typeof placeholder==='string'?'结束日期':placeholder[1]"
	 :placeholder="typeof placeholder==='string'?placeholder:''" :picker-options="setPickerOptions" :range-separator="rangeSeparator"
	 :readonly="readonly" :disabled="disabled" :editable="editable" :clearable="clearable" :size="size"
	 :time-arrow-control="timeArrowControl" :align="align">
	</el-date-picker>
</template>

<script>
	import {
		generateDateShortcuts,
	} from '@/utils/formatTimes';

	export default {
		name: 'DateTimePicker',
		data() {
			return {}
		},
		mounted() {
			this.setDefaultValue();
		},
		computed: {
			//判断快捷方式
			setPickerOptions() {
				const pickerOptions = { //默认快捷方式
					shortcuts: generateDateShortcuts([{
						text: this.$i18n.locale==='zh-CN'?'当天':'The Day',
						d: 0,
					}, {
						text: this.$t('date.last')+this.$t('date.one')+this.$t('date.week'),
						d: 7,
					}, {
						text: this.$t('date.last')+this.$t('date.one')+this.$t('date.month'),
						M: 1,
					}, {
						text: this.$t('date.last')+this.$t('date.three')+this.$t('date.month'),
						M: 3,
					}, ]),
					firstDayOfWeek: 7,
				}
				if (this.pickerOptions && this.pickerOptions.shortcuts === undefined && ['daterange','monthrange', 'datetimerange'].includes(this.type)) {
					return pickerOptions;
				} else {
					return this.pickerOptions;
				}
			},
		},
		methods: {
			//设置初始时间
			setDefaultValue() {
				if (this.defaultValue && typeof this.defaultValue !== 'number') return this.input(this.defaultValue);
				const _time = new Date();
				const endTime = this.value[1] || new Date(_time.getFullYear(),_time.getMonth(),_time.getDate(),23,59,59,999).getTime();
				const startTime = this.value[0] || endTime - (this.defaultValue*86400000 || 0) - 86399000;
				this.input(['datetimerange', 'daterange', 'monthrange', 'dates'].includes(this.type) ? 	[startTime, endTime] :
					endTime);
			},
			//设置显示格式
			setFormat() {
				let _type = {
					year: 'yyyy',
					month: 'yyyy-MM',
					date: 'yyyy-MM-dd',
					dates: 'yyyy-MM-dd',
					week: 'yyyy 第 WW 周',
					datetime: 'yyyy-MM-dd HH:mm:ss',
					datetimerange: 'yyyy-MM-dd HH:mm:ss',
					daterange: 'yyyy-MM-dd',
					monthrange: 'yyyy-MM',
				}
				return this.format || _type[this.type];
			},
			//聚焦
			focus() {
				this.$refs.datePicker.focus();
			},
			//失焦触发
			datePickerBlur(dom) {
				this.$emit('blur', dom);
			},
			//聚焦触发
			datePickerFocus(dom) {
				this.$emit('focus', dom);
			},
			//改变触发
			input(val) {
				this.$emit('input', val);
			},
			//改变触发
			datePickerChange(val) {
				this.$emit('change', val);
			},
		},
		props: {
			value: {
				type: [Date, Number, String, Array],
			},
			'default-value': {
				type: [Date, Number],
			},
			type: {
				type: String,
				default: () => {
					return 'datetimerange';
				}
			},
			'value-format': {
				type: String,
				default: () => {
					return 'timestamp';
				}
			},
			format: {
				type: String,
			},
			'default-time': {
				type: [String, Array],
				default: () => {
					return ['00:00:00', '23:59:59'];
				}
			},
			'picker-options': {
				type: [Object, Boolean],
				default: () => {
					return {};
				}
			},
			'range-separator': {
				type: String,
				default: () => {
					return '-';
				}
			},
			placeholder: {
				type: [String, Array],
				default:()=>{
					return '请选择日期';
				}
			},
			readonly: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			disabled: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			editable: {
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
			size: {
				type: String,
				default: () => {
					return 'mini';
				}
			},
			'time-arrow-control': {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			align: {
				type: String,
				default: () => {
					return 'left';
				}
			},
			prefixIcon: {
				type: String,
				default: () => {
					return 'el-icon-date';
				}
			},
			clearIcon: {
				type: String,
				default: () => {
					return 'el-icon-circle-close';
				}
			},
			name: {
				type: String,
				default: () => {
					return '';
				}
			},
			unlinkPanels: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
		},
	}
</script>

<style>
</style>
