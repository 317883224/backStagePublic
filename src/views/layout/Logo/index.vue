<template>
	<div class="logo" :class="{'logo--collapse ':menuDisplay}">
		<p class="siteName" :class="{'siteName--collapse':menuDisplay}">
			<span>后台管理系统</span>
		</p>
		<div>
			<div class="logo_img"></div>
		</div>
		<p class="logo_p" v-show="!menuDisplay">{{$t('localization.hello')+'! admin, '+$t('localization.welcome')}}</p>
		<audio :src="music" ref="audio" @canplay="playMusic()" controls style="display: none;"></audio>
	</div>
</template>

<script>
	import thorm4a from '@/assets/img/thorm4a.mp3';
	import thorm4a2 from '@/assets/img/thorm4a2.mp3';
	export default {
		name: 'Logo',
		data() {
			return {
				music: '',
			}
		},
		created() {},
		mounted() {},
		computed: {

		},
		methods: {
			setMusic() {
				let oldMusic = this.music;
				let newMusic = Math.random() >= 0.5 ? thorm4a2 : thorm4a;
				if (oldMusic === newMusic) {
					this.$refs.audio.load();
				} else {
					this.music = newMusic;
				}
			},
			playMusic() {
				this.$refs.audio.play();
			},
		},
		props: ['menuDisplay'],
		components: {

		},
	}
</script>

<style lang="scss" scoped>
	.logo {
		text-align: center;
		user-select: none;

		&>div {
			max-width: 80px;
			margin: 16px auto;

			.logo_img {
				width: 84%;
				background: url('~@/assets/img/thor.jpg') no-repeat center/cover;
				border-radius: 100%;
				position: relative;
				margin: 0 auto;
				padding: 42% 0;

				&::before,
				&::after {
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					content: "";
					position: absolute;
					border-radius: 100%;
					background: inherit;
				}

				&::before {
					top: 10px;
					left: 0;
					filter: blur(10px) brightness(80%) opacity(.8);
					transform: scale(.95);
				}
			}
		}

		.siteName {
			height: $height;
			color: var(--menu_color);
			text-align: center;
			border-bottom: 1px solid;
			box-sizing: border-box;
			margin: 0;

			span {
				font-size: var(--fontSize--3);
				font-weight: 300;
				line-height: $height;
				white-space: nowrap;
			}

			&.siteName--collapse {
				span {
					font-size: 12px;
					white-space: normal;
					line-height: normal;
					transform: scale(0.8);
					display: block;
				}
			}
		}

		.logo_p {
			font-size: 12px;
			white-space: nowrap;
			color: var(--menu_color);
			margin: 20px 0 16px;
		}
	}

	.logo--collapse {}
</style>
