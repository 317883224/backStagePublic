<template>
	<div class="userAccessSourceLine" ref="userAccessSourceLine"></div>
</template>

<script>
	import {
		color,
	} from '@/assets/js/publickData';
	
	export default {
		name: 'UserAccessSourceLine',
		data() {
			return {}
		},
		mounted() {
			this.generateUserAccessSourceLine();
		},
		watch: {
			value(newValue, oldValue) {
				this.generateUserAccessSourceLine();
			}
		},
		methods: {
			generateUserAccessSourceLine() {
				let myChart = this.$echarts.init(this.$refs.userAccessSourceLine);
				const option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					},
					toolbox: {
						feature: {
							dataZoom: {},
							dataView: {
								optionToContent: function(opt) {
									var axisData = opt.xAxis[0].data;
									var series = opt.series;
									console.log(series.map((item) => {
										return '<td>' + item.name + '</td>'
									}).reduce((total, item) => {
										return total + item
									}))
									var table = '<table style="width:60%;text-align:center;font-size:12px;"><tbody><tr>' +
										'<td>时间</td>' + series.map((item) => {
											return '<td>' + item.name + '</td>'
										}).reduce((total, item) => {
											return total + item
										}) +
										'</tr>';
									for (var i = 0, l = axisData.length; i < l; i++) {
										table += '<tr>' +
											'<td>' + axisData[i] + '</td>' + series.map((item) => {
												return '<td>' + item.data[i] + '</td>'
											}).reduce((total, item) => {
												return total + item
											}) +
											'</tr>';
									}
									table += '</tbody></table>';
									return table;
								},
							},
							magicType: {
								type: ['line', 'bar', 'stack', 'tiled']
							},
							restore: {},
							saveAsImage: {},
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '邮件营销',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '联盟广告',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '视频广告',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: '直接访问',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '搜索引擎',
							type: 'line',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {},
							data: [820, 932, 901, 934, 1290, 1330, 1320]
						}
					],
					color:color,
				};
				myChart.setOption(option);
			},
		},
		props: ['value'],
	}
</script>

<style lang="scss" scoped>
	.userAccessSourceLine {
		width: 100%;
		height: 100%;
	}
</style>
