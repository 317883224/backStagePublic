<template>
	<div class="honeycombMenu">
		<div class="honeycombMenu_box">
			<hexagon-button ref="HexagonButton" class="HexagonButton" v-for="item in keyupList.length" :key="item" :style="{color:colorList[item]}" />
		</div>
	</div>
</template>

<script>
	import HexagonButton from '@/components/HexagonButton';

	export default {
		name: 'honeycombMenu',
		data() {
			return {
				colorList: ['#F0F8FF', '#FAEBD7', '#00FFFF', '#7FFFD4', '#F0FFFF', '#ADD8E6', '#F08080', '#E0FFFF', '#FAFAD2',
					'#D3D3D3', '#90EE90', '#FFB6C1', '#FFA07A', '#20B2AA', '#87CEFA', '#8470FF', '#778899'
				],
				keyupList: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x',
					'c', 'v', 'b', 'n', 'm'
				],
				timeoutArray: [],
			}
		},
		mounted() {
			this.timeoutArray = new Array(this.$refs.HexagonButton.length);
			document.addEventListener('keydown', this.getKeyup, true)
		},
		beforeDestroy() {
			document.removeEventListener('keydown', this.getKeyup, true);
		},
		methods: {
			getKeyup(e) {
				let _index = this.keyupList.indexOf(e.key);
				let _thisRef = this.$refs.HexagonButton[_index];
				if (_thisRef) {
					clearTimeout(this.timeoutArray[_index]);
					_thisRef.isActive = true;
					this.timeoutArray[_index] = setTimeout(() => {
						_thisRef.isActive = false;
					}, 500);
				}
			},
		},
		components: {
			HexagonButton,
		},
	}
</script>

<style lang="scss" scoped>
	.honeycombMenu {
		width: 100%;
		height: 100%;
		background: rgba(14, 17, 24, 0.97) !important;

		.honeycombMenu_box {
			width: 75%;
			margin: 0 auto;

			.HexagonButton {
				@for $i from 1 through 26 {
					&:nth-child(#{$i}) {
						@if $i <=10 {}

						@else if $i<=19 {
							transform: translate(50%, -18%);
						}

						@else if $i<=26 {
							transform: translate(0, -36%);
						}
					}
				}

				&:nth-child(19) {
					margin-right: 100px;
				}

			}
		}
	}
</style>
