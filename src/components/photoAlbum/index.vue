<!-- 
* @name: 相册
* @description: 用于制作相册
* @author: FYR
* @update: 2019-12-25
* 
* ******************************* 相册组件说明 **********************************
* 
* ***********属性 attr
* 	参数			说明							类型				可选值		默认值
* 	list 			列表数据							array				--			[]
* 
* ***********事件 function
* 	事件名称				说明						回调参数
* 	getItem  			点击子菜单触发回调 		item:子菜单数据  index:下标
* 	getMenu 			点击主菜单触发回调 		list:完整菜单数据
* 
* ************插槽 slot
* 	插槽名称		说明
* 	item 		子菜单内容
* 
* 	*** *** *** *** list数据说明
*	 参数				说明				类型				可选值		默认值
*	 cover 				封面图片				string 				--			null
*	 name 				相册标题				string 				--			'相册'
*	 photoList 			相册数据				array 				--			[]
*  -->
<template>
    <div class="photoAlbum">
        <div class="photoAlbum_boxs">
            <div class="photoAlbum_transform">
                <div v-for="(item,index) in list" :key="index" @click="setSlide(item.photoList||item)" class="photoAlbum_box">
                    <img :src="item.photoList?item.cover||item.photoList[0]:item[0]" alt="相册">
                    <p>{{item.name||'相册'}}</p>
                </div>
            </div>
        </div>
        <el-image style="width: 0; height: 0" ref="image" :preview-src-list="slide"></el-image>
    </div>
</template>

<script>
    export default {
        name: 'photoAlbum',
        data() {
            return {
                slide: [],
                dialogStatus: false,
            }
        },
        methods: {
            setSlide(list) {
                this.slide = list;
                this.dialogStatus = true;
                this.$refs.image.showViewer = true;
            },
        },
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .photoAlbum {
        width: 100%;
        height: 100%;
        user-select: none;
        margin: 0 auto;

        .photoAlbum_boxs {
            width: 100%;
            height: 100%;
            text-align: center;
            perspective: 1000px;

            .photoAlbum_transform {
                width: 100%;
                height: 100%;
                transform: rotateX(60deg);
                transform-style: preserve-3d;
                transform-origin: bottom;

                .photoAlbum_box {
                    width: 300px;
                    height: 200px;
                    cursor: pointer;
                    position: relative;
                    display: inline-block;
                    margin: 10px;

                    &:before,
                    &:after {
                        content: '';
                        width: 100%;
                        height: 100%;
                        left: 0;
                        position: absolute;
                    }

                    &:before {
                        z-index: -1;
                        background: rgba(255, 255, 255, 0.3);
                    }

                    &:after {
                        z-index: -2;
                        background: rgba(255, 255, 255, 0.2);
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        background: #fff;
                        filter: contrast(150%);
                    }

                    p {
                        z-index: 99;
                        top: 0;
                        left: 0;
                        font-size: 300%;
                        text-align: center;
                        color: hsla(0, 0%, 100%, 0.5);
                        right: 0;
                        position: absolute;
                    }

                    &:before,
                    &:after,
                    img,
                    p {
                        transition: 3s;
                    }

                    &:hover {

                        img,
                        p {
                            transform: translateZ(30px);
                        }

                        &:before {
                            transform: translateZ(15px);
                        }

                        &:after {}

                        &:before,
                        &:after,
                        img,
                        p {
                            transition: .8s cubic-bezier(0, 0, 0, 1);
                        }

                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .photoAlbum {
        .el-dialog__wrapper {
            .el-dialog {
                background: transparent;

                .el-carousel__container {
                    height: 50vh;
                }

                .el-carousel__item {
                    img {
                        width: 100%;
                    }
                }

                .el-dialog__close {
                    color: #fff;
                }
            }
        }
    }
</style>
