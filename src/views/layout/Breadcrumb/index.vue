<template>
	<el-breadcrumb class="breadcrumb" separator="/">
		<el-breadcrumb-item :to="{ name: 'home' }"><i class="el-icon-s-home"></i></el-breadcrumb-item>
		<el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="item.name" v-if="!item.redirect && index !== breadcrumb.length - 1" :to="{ name: item.name }">{{item.meta.title}}</el-breadcrumb-item>
		<el-breadcrumb-item :class="index === breadcrumb.length - 1?'breadcrumb_item--current':'breadcrumb_item--noredirect'" :key="item.name" v-else>{{item.meta.title}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default {
		name: 'Breadcrumb',
		data() {
			return {
				breadcrumb: [],
			}
		},
		created() {
		},
		mounted() {
		},
		watch:{
			$route:{
				handler(to,from){
					this.breadcrumb = [...this.$store.state.routerList[this.$route.name].meta.matched,this.$route];
				},
				immediate: true,// 代表在wacth里声明了方法之后立即先去执行handler方法
			},
		},
		computed: {

		},
		methods: {
		},
		props: [],
		components: {

		},
	}
</script>

<style lang="scss" >
	.breadcrumb {
		@include f-shadow('bottom');
		z-index: 10;
		width: auto;
		height: auto;
		background: $basis--background;
		box-shadow: 0px 3px 10px -5px rgba(0, 0, 0, 0.1);
		margin: 0;
		padding: $margin;
		.breadcrumb_item--noredirect{
			.el-breadcrumb__inner{
				color: #D1D1D1;
			}
		}
	}
</style>
