<template>
	<div class="usersActiveVolume" ref="usersActiveVolume"></div>
</template>

<script>
	export default {
		name: 'UsersActiveVolume',
		data() {
			return {}
		},
		mounted(){
			this.generateUsersActiveVolume();
		},
		watch: {
			value(newValue, oldValue) {
				this.generateUsersActiveVolume();
			}
		},
		methods: {
			generateUsersActiveVolume() {
				let myChart = this.$echarts.init(this.$refs.usersActiveVolume);
				const option = {
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					toolbox: {
						feature: {
							saveAsImage: {},
						}
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'bar',
						barWidth:'60%',
					}],
					color: ['#3398DB'],
				};
				myChart.setOption(option);
			},
		},
		props:['value'],
	}
</script>

<style lang="scss" scoped>
	.usersActiveVolume {
		width: 100%;
		height: 100%;
	}
</style>
