<template>
	<div class="switchBg">
		<vue-particles v-if="randomBG===0" class="particles" color="#dedede" :particleOpacity="0.7" :particlesNumber="30" shapeType="circle" :particleSize="4"
		 linesColor="#dedede" :linesWidth="1" lineLinked :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" hoverEffect
		 hoverMode="grab" clickEffect clickMode="push">
		</vue-particles>
		<div v-else>
			<img :src="imgList[randomBG-1]" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		name:'switchBg',
		data() {
			return {
				imgList:['/img/loginBG2.jpg','/img/loginBG3.jpg'],
				randomBG:0,//Math.floor(Math.random()*3)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.switchBg{
		z-index: 0;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		right: 0;
		position: fixed;
		background-image: linear-gradient(to bottom right, #9a79e0, #6d9ed6, #2adacd);
		.particles{
			background: url('/img/loginBG.png') no-repeat 100% 100%;
		}
	}
</style>
