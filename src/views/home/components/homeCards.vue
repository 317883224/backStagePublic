<template>
	<div class="home_cards">
		<div v-for="(item,index) in cards" :key="index" class="home_cards_item">
			<div ref="home_cards_item" class="home_cards_item_echarts"></div>
			<div class="home_cards_item_msg">
				<div class="home_cards_item_msg_left">
					<p>{{item.title}}</p>
					<p>{{formatMoney(item.value)}}</p>
				</div>
				<i class="home_cards_item_msg_right" :class="item.icon" :style="{color:item.color[1]}"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		formatMoney,
	} from '@/utils/function';
	
	export default {
		name: 'homeCardsItem',
		data() {
			return {
				cards: [{
					title: '收入',
					value: '1966',
					icon: 'el-icon-money',
					data: [
						["2000-06-05", 0],
						["2000-06-06", 86],
						["2000-06-07", 73],
						["2000-06-08", 130],
						["2000-06-09", 92],
						["2000-06-10", 130],
						["2000-06-11", 130],
						["2000-06-12", 85],
					],
					color: ['#FFB7DD', '#FF0088'],
				}, {
					title: '商品',
					value: '520',
					icon: 'el-icon-shopping-cart-1',
					data: [
						["2000-06-05", 20],
						["2000-06-06", 86],
						["2000-06-07", 73],
						["2000-06-08", 68],
						["2000-06-09", 92],
						["2000-06-10", 130],
						["2000-06-11", 128],
						["2000-06-12", 85],
					],
					color: ['#FFEE99', '#FFBB00'],
				}, {
					title: '博客',
					value: '863',
					icon: 'el-icon-reading',
					data: [
						["2000-06-05", 116],
						["2000-06-06", 86],
						["2000-06-07", 73],
						["2000-06-08", 68],
						["2000-06-09", 92],
						["2000-06-10", 130],
						["2000-06-11", 128],
						["2000-06-12", 85],
					],
					color: ['#F0FFFF', '#ADD8E6'],
				}, {
					title: '用户',
					value: '1222',
					icon: 'el-icon-user',
					data: [
						["2000-06-05", 85],
						["2000-06-06", 86],
						["2000-06-07", 73],
						["2000-06-08", 68],
						["2000-06-09", 92],
						["2000-06-10", 130],
						["2000-06-11", 128],
						["2000-06-12", 130],
					],
					color: ['#FFB3FF', '#FF00FF'],
				}],
				formatMoney:formatMoney,
			}
		},
		mounted() {
			this.cards.forEach((item, index, array) => {
				this.generateCardEcharts(item, index);
			})
		},
		methods: {
			//生成card的图表
			generateCardEcharts(item, index) {
				let myChart = this.$echarts.init(this.$refs.home_cards_item[index]);
				const option = {
					visualMap: {
						show: false,
						type: 'continuous',
						min: 0,
						max: 400,
						inRange: {
							color: item.color,
						},
					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						top: '50%',
						right: 0,
						bottom: 0,
						left: 0,
					},
					xAxis: {
						data: item.data.map(function(item) {
							return item[0];
						}),
						show: false,
						boundaryGap: false,
					},
					yAxis: {
						show: false,
					},
					series: [{
						type: 'line',
						showSymbol: false,
						data: item.data.map(function(item) {
							return item[1];
						}),
						smooth: true,
						areaStyle: {},
					}],
				};
				myChart.setOption(option);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.home_cards {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;

		.home_cards_item {
			@include f-shadow('');
			width: 24.5%;
			height: 140px;
			position: relative;
			box-sizing: border-box;

			.home_cards_item_echarts {
				width: 100%;
				height: 100%;
			}

			.home_cards_item_msg {
				top: 0;
				left: 0;
				right: 0;
				color: #333;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				padding: 20px;

				p {
					margin: 0;

					&:first-child {
						font-size: 16px;
					}

					&:last-child {
						font-size: 24px;
					}
				}

				i {
					font-size: 38px;
				}
			}
		}
	}
</style>
