<!-- 
******************************** 锁屏轮播动画说明 **********************************
* 
************方法 Methods
* 	方法名				说明					参数
* 	mousewheel 			上下切换轮播图			{deltaY:value(value>=0 next,value<0 prev)}
* 	setActiveItem 		手动切换幻灯片			切换的图片索引
* 	setShow 			设置显隐			--
* 
* -->
<template>
	<div v-show="show" class="lockScreen" @mousewheel="mousewheel">
		<!-- 轮播图 -->
		<el-carousel ref="carousel" height="100vh" direction="vertical" :interval="10000" indicator-position="none" @change="changeCarousel">
			<el-carousel-item v-for="item in list" :key="item">
				<el-image :src="item">
					<div slot="placeholder" class="image-slot">
						加载中<span class="dot">...</span>
					</div>
				</el-image>
			</el-carousel-item>
		</el-carousel>
		<!-- 指示器 -->
		<ul class="lockScreen_indicator">
			<li v-for="(item,index) in list" :key="index" :class="{'is-active':index===currentIndex}" @click="setActiveItem(index)"
			 class="lockScreen_indicator_item"></li>
		</ul>
		<!-- 按钮 -->
		<el-button class="lockScreen_button_next" icon="el-icon-arrow-down" circle @click="mousewheel({deltaY:1})"></el-button>
		<!-- 解锁模块 -->
		<el-form :model="form" ref="form" class="lockScreen_unlock" :class="{'lockScreen_unlock--notNullValue':form.password!==''}">
			<el-form-item style="background: #F8F8F8;">
				已解定，输入密码可解锁(默认密码123456)
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model.number="form.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">解锁</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		message,
	} from '@/utils/function';
	
	export default {
		name: 'LockScreen',
		data() {
			return {
				show: false,
				currentIndex: 0, //当前展示图片索引
				switchStatus: false, //切换状态
				list: [], //图片列表
				form: {
					password: '', //解锁密码
				},
			}
		},
		mounted(){
			setTimeout(()=>{
			this.list = ['https://jsdaima.hu-cheng.net/js/2019/11/3401/images/1.jpg',
					'https://jsdaima.hu-cheng.net/js/2019/11/3401/images/2.jpg',
					'https://jsdaima.hu-cheng.net/js/2019/11/3401/images/3.jpg'
				]
			},0)
		},
		methods: {
			//鼠标滚动触发
			mousewheel(e) {
				if (this.switchStatus) return;
				this.switchStatus = true;
				setTimeout(() => {
					this.switchStatus = false;
				}, 500);
				e.deltaY >= 0 ? this.$refs.carousel.next() : this.$refs.carousel.prev();
			},
			//轮播图切换触发
			changeCarousel(index) {
				this.currentIndex = index;
			},
			//手动切换幻灯片
			setActiveItem(index) {
				this.$refs.carousel.setActiveItem(index);
			},
			//设置显隐
			setShow(value) {
				this.show = value;
			},
			submitForm() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.form.password == '123456'?this.show=false:message('解锁密码错误','error');
						this.$refs.form.resetFields();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.lockScreen {
		z-index: 999;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: #fff;
		position: fixed;

		.lockScreen_indicator {
			z-index: 1000;
			right: 1%;
			top: 50%;
			position: fixed;
			transform: translateY(-50%);
			list-style: none;

			.lockScreen_indicator_item {
				width: 10px;
				height: 10px;
				background: #fdbe07;
				border-radius: 100%;
				cursor: pointer;
				margin: 10px 0;

				&.is-active {
					background: #fff;
				}
			}
		}

		.lockScreen_button_next {
			z-index: 1000;
			top: 5%;
			left: 50%;
			color: #fff;
			font-size: 38px;
			border: 2px solid #fff;
			background: transparent;
			transform: translateX(-50%);
			position: fixed;
			animation: 3s cubic-bezier(.5, 0, .1, 1) buttonNext infinite;

			&:hover {
				animation-play-state: paused;
			}
		}

		.lockScreen_unlock {
			@include f-center;
			z-index: 1000;
			opacity: .2;
			background: #fff;
			border-radius: 8px;
			overflow: hidden;
			transition: 1s;

			&:hover,
			&:active,
			&:focus-within,
			&.lockScreen_unlock--notNullValue{
				opacity: 1;
				transition: 0.2s;
			}

			.el-form-item {
				color: #333;
				padding: 0 20px;

				&:first-child {
					padding: 8px 20px;
				}
			}
		}
	}

	@keyframes buttonNext {

		from,
		to {
			opacity: 1;
		}

		50% {
			top: 10%;
			opacity: .5;
		}
	}
</style>
