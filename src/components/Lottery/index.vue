<template>
	<div class="lottery" :style="{width:width+'px',height:height+'px'}">
		<div ref="lotteryRoulette" :style="{'transform': `rotate(${lotteryRoulette.transform}deg)`,transition: `${lotteryRoulette.tiems}s`}" class="lottery_roulette">
			<div v-for="(item,index) in list" :key="index" :style="{width:lotteryRouletteWidth+'px',transform:`rotate(${360*index/list.length}deg)`,'border-color': index % 2===0?'#fff4d6':'#fff'}"
			 class="lottery_roulette_div">
				<div :style="{'border-width': `${width/2 + 1}px ${lotteryRouletteWidth/2}px 0px`}"></div>
                <div :style="{'border-width': `${width/2 + 1}px ${lotteryRouletteWidth/2}px 0px`}"></div>
                <p>{{item.title}}</p>
			</div>
		</div>
		<div class="lottery_pointer" :style="{'box-shadow': `0 0 0px ${width/30}px #e60012`}" @click="lotteryRotate">
            <div :style="{'border-width': `0 ${width*0.026}px ${width*0.13}px`,}"></div>
        </div>
	</div>
</template>

<script>
	export default {
		name: 'Lottery',
		data() {
			return {
				list: [{
                    title:'1',
                    value:'1',
                    chance:0.1,
                },{
                    title:'2',
                    value:'2',
                    chance:0.1,
                },{
                    title:'3',
                    value:'3',
                    chance:0.1,
                },{
                    title:'4',
                    value:'4',
                    chance:0.1,
                },{
                    title:'5',
                    value:'5',
                    chance:0.1,
                },{
                    title:'6',
                    value:'6',
                    chance:0.1,
                },{
                    title:'7',
                    value:'7',
                    chance:0.1,
                }],
				width: 300,
				height: 300,
				lotteryRoulette: {
					transform: 0,
					tiems: 0,
				},
			}
		},
        computed:{
            //lottery_roulette_div的宽度   公式: Math.tan(2*Math.PI/(value*2))*width/2*2 可得
            lotteryRouletteWidth(){
                return Math.ceil(Math.tan(Math.PI/this.list.length)*this.width);
            },
        },
		methods: {
            //轮盘转动
			lotteryRotate(){
				this.lotteryRoulette.transform += Math.round(Math.random()*360)+3600;
				this.lotteryRoulette.tiems = 5;
                setTimeout(()=>{
                    this.lotteryRoulette.transform = this.lotteryRoulette.transform%360;
                    this.lotteryRoulette.tiems = 0;
                },this.lotteryRoulette.tiems*1000);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.lottery {
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;

		.lottery_roulette {
			width: 100%;
			height: 100%;
			box-sizing: inherit;
			border-radius: 100%;
			overflow: hidden;
			position: absolute;
            background: #fff;

			.lottery_roulette_div {
				height: 50%;
				left: 0;
				right: 0;
				border-color: #fcc;
				position: absolute;
				transform-origin: bottom center;
				margin: 0 auto;

				div {
					position: absolute;
					border: solid transparent;
					border-top-color: inherit;
					box-sizing: border-box;
                    &:first-child{
                        top: 1px;
                        border-top-color: #ffde7c;
                    }
				}
                p{
                    z-index: 10;
                    left: 0;
                    right: 0;
                    color: #e9534d;
                    text-align: center;
                    position: absolute
                }
			}
            
            &:before{
                content: '';
                z-index: 3;
                width: 100%;
                height: 100%;
                left: 0;
                border-radius: 100%;
                border: 3px solid #ffde7c;
                box-sizing: inherit;
                position: absolute;
            }
		}

		.lottery_pointer {
            @include f-center;
            z-index: 9;
			width: 20%;
			height: 20%;
            cursor: pointer;
			background: radial-gradient(#fff,#f3ce92);
			border-radius: 100%;
            
            &:after{
                @include f-center;
                content: '开始';
                font-size: 12px;
            }
			div {
				left: 50%;
                bottom: 105%;
				position: absolute;
				border: solid transparent;
				border-bottom-color: #e60012;
				transform: translate(-50%, 0);
			}
		}
	}
</style>
