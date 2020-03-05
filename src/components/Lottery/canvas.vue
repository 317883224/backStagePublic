<template>
    <div>
        <canvas ref="lotteryCanvas" :style="{'transform': `rotate(${lotteryRoulette.transform}deg)`,transition: `${lotteryRoulette.tiems}s`}"
            :width="width" :height="width">
            你的浏览器不支持此功能，请升级你的浏览器
        </canvas>
        <canvas ref="lotteryCanvasPointer" :width="width*0.5" :height="width*0.5" @click="lotteryRotate">
            你的浏览器不支持此功能，请升级你的浏览器
        </canvas>
    </div>
</template>

<script>
    export default {
        name: 'lotteryCanvas',
        data() {
            return {
                width: 300,
                list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                lotteryRoulette: {
                    transform: 0,
                    tiems: 0,
                    status: false,
                },
            }
        },
        computed: {
            //弧度
            angle() {
                return Math.PI * 2 / this.list.length;
            },
        },
        mounted() {
            this.generateBackground();
            this.generatePointer();
        },
        methods: {
            //生成扇形
            generateSector(canvas,x,y,r,fillColor,strokColor,list) {
                canvas.beginPath();
                if(list.length>1) canvas.moveTo(x, y);
                for (let i in list) {
                    if (i % 2 === 0) {
                        canvas.arc(x, y, r, Math.PI * 2 * i / list.length, Math.PI * 2 * (i - 1 + 2) / list.length, false);
                        canvas.lineTo(x, y);
                    }
                }
                canvas.fillStyle = fillColor;
                canvas.fill();
                canvas.lineWidth = 0.5;
                canvas.strokeStyle = strokColor;
                canvas.stroke();
            },
            //生成奖品
            generateText() {},
            //生成背景
            generateBackground() {
                let lotteryCanvas = this.$refs.lotteryCanvas; //dom
                if (!lotteryCanvas.getContext) return;
                let canvas = lotteryCanvas.getContext('2d');
                let width = this.width/2;
                canvas.lineWidth = width * 0.02;
                this.generateSector(canvas,width,width,width*0.965,'#fff','#ffde7c',[{}]);
                this.generateSector(canvas,width,width,width*0.965,'rgb(255, 244, 214)','#ffde7c',this.list);
            },
            //生成指针
            generatePointer() {
                let lotteryCanvasPointer = this.$refs.lotteryCanvasPointer; //dom
                if (!lotteryCanvasPointer.getContext) return;
                let canvas = lotteryCanvasPointer.getContext('2d');
                let width = this.width * 0.5 / 2;
                canvas.beginPath();
                canvas.arc(width,width,width,0,Math.PI*2,false);
                canvas.fillStyle = 'aqua';
                canvas.fill();
            },
            //抽奖
            lotteryRotate() {
                if (this.lotteryRoulette.status) return;
                this.lotteryRoulette.status = true;
                this.lotteryRoulette.transform += Math.round(Math.random() * 360) + 3600;
                this.lotteryRoulette.tiems = 5;
                setTimeout(() => {
                    this.lotteryRoulette.transform = this.lotteryRoulette.transform % 360;
                    this.lotteryRoulette.tiems = 0;
                    setTimeout(() => {
                        this.lotteryRoulette.status = false;
                    }, 500);
                }, this.lotteryRoulette.tiems * 1000);
            },
        },
    }
</script>

<style lang="scss" scoped>
    div {
        position: relative;

        canvas {
            position: absolute;

            &:last-child {
                @include f-center;
                cursor: pointer;
                transform: translate(-50%, -50%) rotate(-90deg);
            }
        }
    }
</style>
