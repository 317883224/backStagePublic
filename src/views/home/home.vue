<template>
	<div class="index home">
		<home-cards class="home_cards" />
		<div class="home_content">
			<com-card v-for="item in homeContentList" :key="item.class" v-model="item.dateTimePicker.date" :width="item.width"
			 :height="item.height" :title="item.title" :date="item.dateTimePicker" :class="'home_content_'+item.component">
				<components :is="item.component" :value="item.dateTimePicker.date" />
			</com-card>
		</div>
	</div>
</template>

<script>
	import homeCards from './components/HomeCards';
	import comCard from '@/components/Card';
	import UsersActiveVolume from './components/UsersActiveVolume';
	import UserAccessSourcePie from './components/UserAccessSourcePie';
	import UserAccessSourceLine from './components/UserAccessSourceLine';
	import dateTimePicker from '@/components/DateTimePicker';

	export default {
		data() {
			return {
				homeContentList: [{
					title: '用户活跃量',
					width: '66%',
					height: 350,
					component: 'UsersActiveVolume',
					dateTimePicker: {
						date: new Date(),
						type: 'date',
						clearable: false,
					},
				}, {
					title: '用户访问来源',
					width: '33.2%',
					height: 350,
					component: 'UserAccessSourcePie',
					dateTimePicker: {
						date: new Date(),
						type: 'date',
						clearable: false,
					}
				}, {
					title: '用户访问来源',
					width: '100%',
					height: 350,
					component: 'UserAccessSourceLine',
					dateTimePicker: {
						date: [],
						type: 'daterange',
						clearable: false,
					}
				}],
			}
		},
		created() {},
		mounted() {

		},
		computed: {},
		methods: {},
		props: [],
		components: {
			homeCards,
			dateTimePicker,
			UsersActiveVolume,
			UserAccessSourcePie,
			UserAccessSourceLine,
			comCard,
		},
	}
</script>

<style lang="scss" scoped>
	.home {
		.home_content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.home_content_UserAccessSourceLine {
				margin-top: 15px;

				.home_content_item_content {
					height: 400px;
				}
			}
		}
	}
</style>
<style lang="scss">
	.home {

		.home_cards .home_cards_item,
		.home_content>div {
			border-radius: 5px;
			background: #fff;
		}
	}
</style>
