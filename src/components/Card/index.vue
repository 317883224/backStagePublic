<template>
	<el-card class="card" :style="{width:typeof width==='string'?width:width+'px'}">
		<div slot="header" class="card_header" >
			<b class="card_title">{{title}}</b>
			<date-time-picker class="card_date" v-if="date" :value="value" @input="input" :type="date.type" :clearable="date.clearable"/>
			<slot class="card_date" name="date"/>
		</div>
		<div class="card_content" :style="{height:typeof height==='string'?height:height+'px'}">
			<slot name="default"/>
		</div>
	</el-card>
</template>

<script>
	import dateTimePicker from '@/components/DateTimePicker';

	export default{
		name:'Card',
		data() {
			return {
			}
		},
		methods: {
			input(value) {
				this.$emit('input',value);
			}
		},
		components: {
			dateTimePicker,
		},
		props: {
			value:{
				type: [Date, Number, String, Array],
			},
			width:{
				type:[String,Number],
				default:()=>{
					return '100%';
				}
			},
			height:{
				type:[String,Number],
				default:()=>{
					return '100%';
				}
			},
			title: {
				type: String,
				default: ()=>{
					return '';
				}
			},
			date:{
				type:Object,
			}
		},
	}
</script>

<style lang="scss" scoped>
	.card_header{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
<style lang="scss">
	.card{
		.el-card__header,
		.el-card__body{
			padding: 10px 14px;
		}
	}
</style>
