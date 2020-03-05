<template>
	<div class="dome">
		<div v-for="(item,index) in list" :key="index" draggable="true" @dragstart="dragstart($event,item,index)" @dragenter="dragenter($event,item,index)"
		 @dragend="dragend($event,item,index)" @drop="drop($event,item,index)" @dragover="dragover($event,item,index)">{{item}}</div>
	</div>
</template>

<script>
	export default{
		name:'drag',
		data() {
			return {
				list:{
					a:0,
					b:1,
					c:2,
					d:3,
					e:4,
					f:5,
				},
				dragDom:{
					index:undefined,
					dom:'',
					item:undefined,
				},
				enterDom:{
					index:undefined,
					dom:'',
					item:undefined,
				}
			}
		},
		methods: {
			//拖放开始
			dragstart(e, item, index) {
				this.dragDom = {item:item,index:index,dom:e.targe};
				console.log('拖放开始');
			},
			//拖放结束
			dragend(e, item,index) {
				// let list = JSON.parse(JSON.stringify(this.list));
				// list[this.enterDom.index] = this.dragDom.item;
				// list[this.dragDom.index] = this.enterDom.item;
				// this.list = list;
				this.dragDom = undefined;
				// this.enterDom = undefined;
			},
			//拖放到目标
			drop(e, item,index) {
				this.dragover(e, item,index);
				// this.enterDom = {item:item,index:index,dom:e.targe};
				console.log('拖放到目标',index);
			},
			//拖放过程
			dragover(e, item,index) {
				e.preventDefault();
			},
			//拖放进入
			dragenter(e, item,index) {
				let list = JSON.parse(JSON.stringify(this.list));
				list[index] = this.dragDom.item;
				list[this.dragDom.index] = item;
				this.dragDom.index = index;
				this.list = list;
				console.log('拖放进入',index);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.dome {
		div {
			width: 100px;
			height: 50px;
			background: #fff;
			display: inline-block;
			margin-right: 10px;
			&:hover{
				background: aqua;
			}
		}
	}
</style>
