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
                angle: 0, //弧度
            }
        },
        mounted() {
            let lotteryCanvas = this.$refs.lotteryCanvas; //dom
            if (!lotteryCanvas.getContext) return;
            let canvas = lotteryCanvas.getContext('2d');
            canvas.moveTo(this.width / 2, this.width / 2);
            this.generateBackground(canvas);
            this.generatePointer(canvas);
        },
        methods: {
            //生成扇形 canvas:dom  arc:扇形参数  border:扇形框参数
            generateSector(canvas, arc, border, font) {
                canvas.beginPath();
                canvas.moveTo(arc.x, arc.y);
                canvas.arc(arc.x, arc.y, arc.r, arc.startAngle, arc.endAngle, arc.anticlockwise || false);
                canvas.fillStyle = arc.color;
                canvas.fill();
                if (border) this.generateSectorBorder(canvas, {
                    x: arc.x,
                    y: arc.y,
                    startAngle: arc.startAngle,
                    endAngle: arc.endAngle,
                    r: arc.r,
                    lineWidth: border.width,
                    color: border.color,
                    anticlockwise: arc.anticlockwise
                });
                if (font) this.generateText(canvas, {
                    style: font.style,
                    text: font.text,
                    type: font.type || 'fill',
                    color: font.color
                });
            },
            //生成扇形框
            generateSectorBorder(canvas, border) {
                canvas.beginPath();
                if (border.endAngle !== Math.PI * 2) canvas.moveTo(border.x, border.y);
                canvas.arc(border.x, border.y, border.r, border.startAngle, border.endAngle, border.anticlockwise ||
                    false);
                canvas.closePath();
                canvas.lineWidth = border.lineWidth;
                canvas.strokeStyle = border.color;
                canvas.stroke();
            },
            generateText(canvas, font) {
                canvas.beginPath();
                canvas.fillStyle = font.style||'12px';
                canvas.color = font.color;
                font.type === 'stroke' ? canvas.strokeText(font.text, this.width / 2, this.width / 2) : canvas.fillText(font.text, this.width / 2, this.width / 2);
            },
            //生成背景
            generateBackground(canvas) {
                this.angle = Math.PI * 2 / this.list.length; //弧度
                let canvasOffset = -this.angle / 2 - Math.PI / 2;
                this.generateSector(canvas, {
                    x: this.width / 2,
                    y: this.width / 2,
                    startAngle: 0,
                    endAngle: Math.PI * 2,
                    r: this.width * 0.49,
                    color: '#fff'
                }, {
                    width: this.width * 0.01,
                    color: '#ffde7c'
                }); //生成圆形背景
                for (let i in this.list) {
                    if (i % 2 === 0) {
                        this.generateSector(canvas, {
                            x: this.width / 2,
                            y: this.width / 2,
                            startAngle: this.angle * i + canvasOffset,
                            endAngle: this.angle * (parseInt(i) + 1) + canvasOffset,
                            r: this.width * 0.49,
                            color: 'rgb(255, 244, 214)'
                        }, {
                            width: 1,
                            color: 'ffde7c'
                        },{style:'12px sans-serif',text:i,color:'#000'}); //生成扇形背景
                    }
                }
            },
            //生成指针
            generatePointer() {
                let lotteryCanvasPointer = this.$refs.lotteryCanvasPointer; //dom
                let width = this.width * 0.5 / 2;
                if (!lotteryCanvasPointer.getContext) return;
                let canvas = lotteryCanvasPointer.getContext('2d');
                let grd = canvas.createRadialGradient(width / 2, width / 2, 0, width / 2, width / 2, width * 0.1);
                grd.addColorStop(0, '#fff');
                grd.addColorStop(1, '#fff4d6');

                canvas.beginPath();
                canvas.moveTo(width * 1.9, width);
                canvas.arc(width, width, width * 0.5, width * 0.0025, Math.PI * 2 - width * 0.0025, false);
                canvas.fillStyle = 'aqua';
                canvas.fill();

                this.generateSector(canvas, {
                    x: width,
                    y: width,
                    startAngle: 0,
                    endAngle: Math.PI * 2,
                    r: width * 0.4,
                    color: grd
                });
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
