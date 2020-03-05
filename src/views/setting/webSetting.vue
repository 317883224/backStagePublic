<template>
	<div>
		<el-tooltip :content="theme" placement="top">
			<el-switch v-model="theme" :active-color="$store.state.menu.backgroundColor" :inactive-color="$store.state.menu.backgroundColor" active-value="白天" inactive-value="黑夜">
			</el-switch>
		</el-tooltip>
		<div class="componentColor">
			<el-color-picker @change="setColor" v-model="color" class="theme-picker" :predefine="colors" popper-class="theme-picker-dropdown"></el-color-picker>
			<el-color-picker @change="setMuneColor" v-model="muneColor" class="theme-picker" :predefine="colors" popper-class="theme-picker-dropdown"></el-color-picker>
			<el-color-picker @change="setMuneBackgroundColor" v-model="muneBackgroundColor" class="theme-picker" :predefine="colors" popper-class="theme-picker-dropdown"></el-color-picker>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'webSetting',
		data() {
			return {
				theme:'白天',
				color: this.$store.state.user.color,
				muneColor:this.$store.state.user.muneColor,
				muneBackgroundColor:this.$store.state.user.muneBackgroundColor,
				colors: [
				  '#ffffff',
				  '#000000',
				  '#ffd700',
				  '#90ee90',
				  '#00ced1',
				  '#1e90ff',
				  '#c71585',
				  '#c71557',
				],
			}
		},
		created() {
		},
		mounted() {
		},
		computed: {

		},
		methods: {
			setColor(val){//设置背景颜色
				this.$store.commit('setColor',val);
			},
			setMuneColor(val){
				let style = document.body.style;
				this.$store.commit('setMuneColor',val);
				style.setProperty('--menu_color',val);
			},
			setMuneBackgroundColor(val){
				let style = document.body.style;
				this.$store.commit('setMuneBackgroundColor',val);
				style.setProperty('--menu_background_color',val);
				style.setProperty('--body_background_color',val==='#FFFFFF'?'var(--fontColor--main)':val);
			},
		},
		props: [],
		components: {
		},
	}
</script>

<style lang="scss" scoped>
	
</style>
