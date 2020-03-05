<template>
	<div>
		<i :class="icon"></i>
		<span slot="title">{{title}}</span>
	</div>
</template>

<script>
	export default {
		name: 'menuItemTitile',
		data() {
			return {
			}
		},
		created() {
		},
		mounted() {
			
		},
		computed: {

		},
		methods: {
			
		},
		props: ['icon','title'],
		components: {

		},
	}
</script>

<style lang="scss" scoped>
	
</style>
