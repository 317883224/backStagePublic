<template>
	<div class="honeycombMenu">
		<lottery></lottery>
		<lotteryCanvas></lotteryCanvas>
	</div>
</template>

<script>
	import lottery from '@/components/Lottery';
	import lotteryCanvas from '@/components/Lottery/canvas';

	export default {
		data() {
			return {
			}
		},
		mounted() {},
		methods: {
		},
		components: {
			lottery,
			lotteryCanvas,
		},
	}
</script>

<style lang="scss" scoped>
	.honeycombMenu {
		width: 100%;
		height: 100%;
		background: #000 url('/img/loginBG.png') !important;

		&>div {
			width: 300px;
			height: 300px;
			display: inline-block;
		}
	}
</style>
