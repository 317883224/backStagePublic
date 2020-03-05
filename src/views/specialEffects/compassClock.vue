<template>
	<div class="compassClock">
		<div class="compassClock_box">
			<div class="compassClock_div compassClock_hand" :style="{top:`calc((${compassClock.seconds.width})/2)`}">
				<div style="top:-3px"></div>
			</div>
			<div v-for="(item,index) in compassClock" :key="index" :style="{width:item.width,height:item.width,top:`calc((${compassClock.seconds.width} - ${item.width})/2)`}"
			 :class="`compassClock_${index}`" class="compassClock_div">
				<div v-for="(item2,index2) in item.value" :style="{transform:'rotate('+ (item.rotate?index2:-index2)*360 /item.value.length +'deg)',top:`calc((${item.width} - 20px)/2)`}"
				 :key="index2">{{item.name!=='星期'?item2+item.name:item.name+item2}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'compassClock',
		data() {
			return {
				compassClock: {
					months: {
						name: '月',
						width: '7em',
						rotate:true,//旋转方向
						value: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
					},
					days: {
						name: '日',
						width: '17em',
						rotate:true,//旋转方向
						value: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九',
							'二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一',
						],
					},
					weeks: {
						name: '星期',
						width: '24em',
						rotate:false,//旋转方向
						value: ['一', '二', '三', '四', '五', '六', '日'],
					},
					hours: {
						name: '时',
						width: '33em',
						rotate:true,//旋转方向
						value: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九',
							'二十', '二十一', '二十二', '二十三', '二十四'
						],
					},
					minutes: {
						name: '分',
						width: '45em',
						rotate:false,//旋转方向
						value: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九',
							'二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一', '三十二', '三十三', '三十四', '三十五',
							'三十六', '三十七', '三十八', '三十九', '四十', '四十一', '四十二', '四十三', '四十四', '四十五', '四十六', '四十七', '四十八', '四十九',
							'五十', '五十一', '五十二', '五十三', '五十四', '五十五', '五十六', '五十七', '五十八', '五十九', '六十'
						],
					},
					seconds: {
						name: '秒',
						width: '60em',
						rotate:true,
						value: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九',
							'二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一', '三十二', '三十三', '三十四', '三十五',
							'三十六', '三十七', '三十八', '三十九', '四十', '四十一', '四十二', '四十三', '四十四', '四十五', '四十六', '四十七', '四十八', '四十九',
							'五十', '五十一', '五十二', '五十三', '五十四', '五十五', '五十六', '五十七', '五十八', '五十九', '六十'
						],
					},
				},
			}
		},
		mounted() {},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.compassClock {
		background: #000 !important;
		user-select: none;

		.compassClock_box {
			width: 50%;
			min-height: 100%;
			color: gold;
			font-size: 10px;
			position: relative;

			.compassClock_div {
				left: 0;
				right: 0;
				text-align: right;
				position: absolute;
				margin: 0 auto;

				div {
					width: 100%;
					height: 20px;
					line-height: 20px;
					position: absolute;
					transform-origin: center center;
				}

				&.compassClock_hand {
					top: calc(50% - 30em);
					width: 30em;

					div {
						height: 0;
						border: 3px solid transparent;
						border-left-color: rgba(255, 255, 255, .4);
						border-left-width: 316px;
						margin-left: 50%;
					}
				}

				&.compassClock_minutes{
					animation: 3600s compassClockSeconds infinite linear reverse;
				}
				&.compassClock_seconds {
					box-shadow: 0 0 20px gold;
					border-radius: 100%;
					animation: 60s compassClockSeconds infinite linear;
				}
			}
		}
	}

	@keyframes compassClockSeconds {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(-360deg);
		}
	}
</style>
