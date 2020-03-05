<!-- 
******************************** Dialog 对话框组件说明 **********************************
* 
************属性 attr
*   参数						说明										类型				可选值			默认值
* 	title 					Dialog 的标题，也可通过具名 slot 传入		string 			--				--
* 	width 					Dialog 的宽度							string 			--				50%
* 	fullscreen 				是否为全屏 Dialog 						boolean 		--				false
* 	top 					Dialog CSS 中的 margin-top 值			string 			--				--
* 	modal 					是否需要遮罩层							boolean 		--				false
* 	closeOnClickModal 		是否可以通过点击 modal 关闭 Dialog 		boolean 		--				true
* 	closeOnPressEscape 		是否可以通过按下 ESC 关闭 Dialog 			boolean 		--				true
* 	showClose 				是否显示关闭按钮							boolean 		--				true
* 	center 					是否对头部和底部采用居中布局				boolean 		--				false
* 	before-close 			关闭前的回调，会暂停 Dialog 的关闭			function 		--				defaultBeforeClose
* 
************事件 event
* 	事件名称					说明										回调参数
* 	open					Dialog 打开的回调							--
* 	opened					Dialog 打开动画结束时的回调				--
* 	close					Dialog 关闭的回调							--
* 	closed					Dialog 关闭动画结束时的回调				--
* 
************方法 methods
* 	方法名				说明					参数			回调
* 
************插槽 slot
* 	name			说明
* 	--				Dialog内容
* 	title 			Dialog 标题区的内容
* 	footer 			Dialog 按钮操作区的内容
* 
*  -->

<template>
	<el-dialog @keyup.enter="emitConfirm" :title="title" :visible.sync="visible" :width="width" :fullscreen="fullscreen" :top="top" :modal="modal"
	 :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" :show-close="showClose" :center="center"
	 :before-close="beforeClose" @open="$emit('open')" @close="$emit('close')" @opened="$emit('opened')"
	 @closed="$emit('closed')">
		<template slot="title" class="dialog_header">
			<slot name="title"></slot>
		</template>
		<slot name="default" class="dialog_default dialog_content"></slot>
		<template slot="footer" class="dialog_footer">
			<slot name="footer">
				<el-button @click="emitCancel">取 消</el-button>
				<el-button type="primary" @click="emitConfirm">确 定</el-button>
			</slot>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		name: 'Dialog',
		data() {
			return {
				visible: this.defaultVisible, //显示隐藏
			}
		},
		methods: {
			//确认
			emitConfirm() {
				this.$emit('confirm');
			},
			//取消
			emitCancel() {
				this.visible = false;
				this.$emit('cancel');
			},
		},
		props: {
			title: {
				type: String,
			},
			defaultVisible: {
				type: Boolean,
				default: false,
			},
			width: {
				type: String,
				default: '50%',
			},
			fullscreen: {
				type: Boolean,
			},
			top: {
				type: String,
			},
			modal: {
				type: Boolean,
			},
			'close-on-click-modal': {
				type: Boolean,
				default: true,
			},
			'close-on-press-escape': {
				type: Boolean,
				default: true,
			},
			'show-close': {
				type: Boolean,
				default: true,
			},
			center: {
				type: Boolean,
			},
			'before-close': {
				type: Function,
			}
		},
	}
</script>

<style lang="scss">
	.el-dialog{
		.el-dialog__header{
			background: var(--borderColor--2);
			padding:$margin $margin $margin*.8;
			.el-dialog__title{
				font-size: var(--fontSize--3);
			}
		}
		.el-dialog__body{
			padding:$margin $margin;
		}
	}
</style>
