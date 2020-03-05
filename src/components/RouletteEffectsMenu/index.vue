<!-- 
******************************** 转盘特效菜单组件说明 **********************************
* 
************属性 attr
* 	参数			说明							类型				可选值		默认值
* 	name 	轮盘菜单名称						Array,number	--			[]
* 	list 	列表数据，每个小菜单的数据			String			--			''
* 
************事件 function
* 	事件名称				说明						回调参数
* 	getItem  			点击子菜单触发回调 		item:子菜单数据  index:下标
* 	getMenu 			点击主菜单触发回调 		list:完整菜单数据
* 
* ************插槽 slot
* 	插槽名称		说明
* 	item 		子菜单内容
*  -->

<template>
	<div class="RouletteEffectsMenu" @click="$emit('getMenu',list)" @mouseenter="status=true" @mouseleave="status = false" :RouletteEffectsMenuTitle="name">
		<div v-for="(item,index) in list" :key="index" :class="status?'RouletteEffectsMenu_div-active':'RouletteEffectsMenu_div'"
		 :style="{transform: `rotate(${status?360*index/listLength - 90:-90}deg) scale(${status?1:.7})`}">
			<div @click="$emit('getItem',item,index)" :style="{transform:`rotate(${status?360*(listLength - index)/listLength + 90:+90}deg)`}">
				<slot :row="item"></slot>
				<slot name="item" :row="item"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RouletteEffectsMenu',
		data() {
			return {
				status: false, //显示状态
				listLength:Array.isArray(this.list.length)?this.list.length:this.list,
			}
		},
		methods: {
		},
		props: {
			list: {
				type: [Array,Number],
				default: ()=>{return []},
			},
			name:{
				type:String,
				default:()=>{return ''}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.RouletteEffectsMenu {
		width: 150px;
		height: 150px;
		position: relative;
		margin: 0 auto;
		padding: 20px;

		&:hover {
			>div>div {
				right: 25%;
				opacity: 1;
				transition: .1s;
			}
		}

		&,
		&::after,
		&>div>div {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&::after {
			content: attr(RouletteEffectsMenuTitle);
			z-index: 1;
			width: 100%;
			height: 100%;
			font-size: 20px;
			font-weight: bold;
			background: #fff;
			cursor: pointer;
			border-radius: 100%;
		}

		>div {
			width: 100%;
			height: 25%;
			left: 50%;
			transform-origin: left center;
			position: absolute;
			transition: all .6s;

			>div {
				z-index: 0;
				width: 25%;
				height: 100%;
				right: 50%;
				background: #fff;
				border-radius: 100%;
				position: absolute;
				cursor: pointer;
				opacity: 0;
				transition: .6s cubic-bezier(0.4, 0, 1, 1);
			}
		}
	}

	@keyframes RouletteEffectsMenu_div-active {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>
