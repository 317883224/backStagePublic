<template>
	<div>
		<vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        lineLinked
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        hoverEffect
        hoverMode="grab"
        clickEffect
        clickMode="push"
      >
      </vue-particles>
		<div class="slide">
			<ul class="slide_list">
				<li class="slide_front"></li>
				<li class="slide_back">2</li>
				<li class="slide_top">3</li>
				<li class="slide_bottom">4</li>
				<li class="slide_left">5</li>
				<li class="slide_right">6</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'specialEffects',
		data() {
			return {}
		},
		created() {},
		mounted() {},
		computed: {

		},
		methods: {

		},
		props: [],
		components: {},
	}
</script>

<style lang="scss" scoped>
	.slide {
		$slide_width: 150px;
		$slide_width_x: $slide_width;
		$slide_width_y: $slide_width;
		$slide_width_z: $slide_width;

		width: $slide_width;
		height: $slide_width;
		perspective: 1000px;
		.slide_list {
			width: 100%;
			height: 100%;
			position: relative;
			transform: rotateX(-15deg) rotateY(15deg);
			transform-style: preserve-3d;
			animation: rotate 10s infinite linear;
			li {
				width: $slide_width;
				height: $slide_width;
				list-style: none;
				position: absolute;
			}
		}
		.slide_front {
			background-color: #f66;
			transform: translateZ($slide_width_z / 2);
		}
		.slide_back {
			background-color: #66f;
			transform: rotateY(180deg) translateZ($slide_width_z / 2);
		}
		.slide_top {
			background-color: #f90;
			transform: rotateX(90deg) translateZ($slide_width_y / 2);
		}
		.slide_bottom {
			background-color: #09f;
			transform: rotateX(-90deg) translateZ($slide_width_y / 2);
		}
		.slide_left {
			background-color: #9c3;
			transform: rotateY(-90deg) translateZ($slide_width_x / 2);
		}
		.slide_right {
			background-color: #3c9;
			transform: rotateY(90deg) translateZ($slide_width_x / 2);
		}
		@keyframes rotate {
			from {
				transform: rotateY(0) rotateX(0);
			}
			to {
				transform: rotateY(-1turn) rotateX(-1turn);
			}
		}
	}
</style>
