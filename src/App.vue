<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		created() {
			this.checkCssVar();
		},
		methods: {
			//判断是否可用 css var
			checkCssVar() { 
				const isSupported = window.CSS && window.CSS.supports && window.CSS.supports('--test', 0);
				if (!isSupported) {
					this.$confirm('为了更好的显示，请升级你的浏览器，或更换浏览器浏览?', '提示', {
						confirmButtonText: '更新浏览器',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
					}).catch(() => {
					});
				}
			}
		},
	}
</script>

<style lang="scss">
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: var(--font--3);
	}
</style>
