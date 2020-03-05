<template>
	<div class="HexagonButton" :class="{'is-active':isActive}">
		<div v-for="(item,index) in ['HexagonButton_boder--inner','HexagonButton_boder--outer']" :key="index" :class="item">
			<div v-for="item2 in 3" :key="item2"></div>
		</div>
		<div class="HexagonButton--inner">
			<div>
				<p>
					<svg-icon iconClass="denglu" />
				</p>
				<p>123123</p>
			</div>
			<svg viewBox="0 0 173.20508075688772 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
			</svg>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HexagonButton',
		data() {
			return {
				isActive:false,
			}
		},
		mounted() {

		},
		methods: {
		},
	}
</script>

<style lang="scss" scoped>
	.HexagonButton {
		$width: 100px;
		z-index: 0;
		width: $width;
		height: $width;
		position: relative;
		cursor: pointer;
		display: inline-block;
		color: #ff0037;

		.HexagonButton_boder--inner {
			width: 90%;
			height: 90% * 0.58;
			left: 5%;
			top: 26%;
		}

		.HexagonButton_boder--outer {
			width: 100%;
			height: 100% * 0.58;
			top: 23%;
		}

		.HexagonButton_boder--inner,
		.HexagonButton_boder--outer {
			z-index: 10;
			position: absolute;

			div {
				width: 100%;
				height: 100%;
				position: absolute;

				&:nth-child(2) {
					transform: rotate(60deg);
				}

				&:nth-child(3) {
					transform: rotate(120deg);
				}

				&:before {
					content: '';
					width: 100%;
					border: solid #1e2530;
					display: block;
					border-width: 0 $width*0.02;
					height: 100%;
					box-sizing: border-box;
				}
			}
		}

		.HexagonButton_boder--inner {
			div:before {
				transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
			}
		}

		.HexagonButton--inner {
			width: 90%;
			height: 90% * 0.58;
			left: 5%;
			position: absolute;

			div {
				z-index: 999;
				width: 100%;
				height: 100%;
				top: 50%;
				left: 0;
				right: 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: absolute;

				p {
					color: #fff;
					margin: 5px 0;
					&:nth-child(1) {
						font-size: 20px;
						transition: 0.6s;
					}
					
					&:nth-child(2) {
						font-size: 14px;
					}
				}
			}

			&>svg {
				transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
			}
		}

		&.is-active,&:hover {
			z-index: 1;
			.HexagonButton--inner {
				div:first-child{
					p:first-child{
						color: inherit;
						transition: 0.6s;
					}
					p:nth-child(2){
						animation: HexagonButtonSpan 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
					}
				}

				&>svg {
					transform: scale(1.111);
				}
			}

			.HexagonButton_boder--inner {
				div:before {
					border-width: 0 $width * 0.02666666666666667;
					transform: scale(1.35);
				}
			}

			div::before {
				border-color: inherit;
			}
		}
	}

	@keyframes HexagonButtonSpan {
		0% {
			letter-spacing: 1em;
			filter: blur(12px);
			opacity: 0;
		}

		100% {
			filter: blur(0px);
			opacity: 1;
		}
	}
</style>
