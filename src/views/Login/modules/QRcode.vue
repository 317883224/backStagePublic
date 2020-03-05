<template>
	<div v-show="QRcodeStatus" id="QRcodeBox" class="QRcodeBox"></div>
</template>

<script>
	import qrcodejs from 'qrcodejs2';

	export default{
		name:'QRcode',
		data() {
			return {
				QRcode: undefined, //二维码生成器
				QRcodeString:'',//二维码
				QRcodeStatus:false,//二维码状态
			}
		},
		mounted(){
			this.QRcode = new qrcodejs("QRcodeBox", {
				text: this.QRcodeString,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: qrcodejs.CorrectLevel.H
			})
		},
		methods: {
			//生成二维码
			setQRcode() {
				this.QRcode.clear(); // clear the code.
				this.QRcode.makeCode(this.QRcodeString); // make another code.
			},
		},
		watch: {
			QRcodeString(newValue, oldValue) {
				this.QRcodeStatus = true;
				this.setQRcode();
			}
		},
	}
</script>

<style>
</style>
