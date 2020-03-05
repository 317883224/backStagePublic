<template>
	<el-select v-model="lang" class="langMenu" :placeholder="$t('localization.selectlanguage')" @change="changeLang">
		<el-option v-for="item in langPack" :key="item.value" :label="item.label" :value="item.value" />
	</el-select>
</template>

<script>
	import cookie from 'js-cookie';

	export default {
		name: 'headerMenu',
		data() {
			return {
				lang: this.$i18n.locale,
				langPack: [{
						value: "en-US",
						label: "English"
					},
					{
						value: "zh-CN",
						label: "中文简体"
					},
					{
						value: "zh-FN",
						label: "中文繁體"
					},
				],
			}
		},
		mounted() {},
		methods: {
			//获取菜单点击项
			changeLang(value) {
				this.$i18n.locale = value;
				cookie.set('lang', value);
			},
		},
		components: {},
	}
</script>

<style lang="scss" scoped>
	.langMenu {
		width: 100px;
	}
</style>
<style lang="scss">
	.langMenu {
		.el-input__inner {
			border: none;
			text-align: right;
		}
	}
</style>
