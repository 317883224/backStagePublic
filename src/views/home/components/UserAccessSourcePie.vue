<template>
	<div class="userAccessSourcePie" ref="userAccessSourcePie"></div>
</template>

<script>
	import {
		color,
	} from '@/assets/js/publickData';

	export default {
		name: 'UserAccessSourcePie',
		data() {
			return {}
		},
		mounted() {
			this.generateUserAccessSourcePie();
		},
		watch: {
			value(newValue, oldValue) {
				this.generateUserAccessSourcePie();
			}
		},
		methods: {
			generateUserAccessSourcePie() {
				let myChart = this.$echarts.init(this.$refs.userAccessSourcePie);
				const option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 10,
						data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
					},
					toolbox: {
						feature: {
							saveAsImage: {},
						}
					},
					series: [{
							name: '访问来源',
							type: 'pie',
							selectedMode: 'single',
							radius: [0, '30%'],
							label: {
								fontSize:10,
								position: 'inner'
							},
							labelLine: {
								show: false
							},
							data: [{
									value: 335,
									name: '直达',
									selected: true
								},
								{
									value: 679,
									name: '营销广告'
								},
								{
									value: 1548,
									name: '搜索引擎'
								}
							]
						},
						{
							name: '访问来源',
							type: 'pie',
							label: {
								fontSize:10,
							},
							radius: ['38%', '55%'],
							data: [{
									value: 335,
									name: '直达'
								},
								{
									value: 310,
									name: '邮件营销'
								},
								{
									value: 234,
									name: '联盟广告'
								},
								{
									value: 135,
									name: '视频广告'
								},
								{
									value: 1048,
									name: '百度'
								},
								{
									value: 251,
									name: '谷歌'
								},
								{
									value: 147,
									name: '必应'
								},
								{
									value: 102,
									name: '其他'
								}
							]
						}
					],
					color:color,
				};
				myChart.setOption(option);
			},
		},
		props:['value'],
	}
</script>

<style lang="scss" scoped>
	.userAccessSourcePie {
		width: 100%;
		height: 100%;
	}
</style>
