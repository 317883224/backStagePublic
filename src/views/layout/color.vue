<template>
	<div></div>
</template>

<script>
	const version = require('element-ui/package.json').version; // element-ui version from node_modules
	const ORIGINAL_THEME = '#409EFF'; // default color

	export default {
		name:'componentColor',
		data() {
			return {
				chalk: '', // content of theme-chalk css
			}
		},
		created(){
			this.setBodyStyle();
		},
		watch: {
			'$store.state.user.color'(val, oldVal) {
				if (typeof val !== 'string') return;
				this.setCss(val);
				const themeCluster = this.getThemeCluster(val.replace('#', ''))
				const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
				console.log(themeCluster, originalCluster)
				const getHandler = (variable, id) => {
					return () => {
						const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
						const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

						let styleTag = document.getElementById(id)
						if (!styleTag) {
							styleTag = document.createElement('style')
							styleTag.setAttribute('id', id)
							document.head.appendChild(styleTag)
						}
						styleTag.innerText = newStyle
					}
				}

				const chalkHandler = getHandler('chalk', 'chalk-style')

				if (!this.chalk) {
					const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
					this.getCSSString(url, chalkHandler, 'chalk')
				} else {
					chalkHandler()
				}

				const styles = [].slice.call(document.querySelectorAll('style'))
					.filter(style => {
						const text = style.innerText
						return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
					})
				styles.forEach(style => {
					const {
						innerText
					} = style
					if (typeof innerText !== 'string') return
					style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
				})
			},
		},
		methods: {
			updateStyle(style, oldCluster, newCluster) {
				let newStyle = style
				oldCluster.forEach((color, index) => {
					newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
				})
				return newStyle
			},
			getCSSString(url, callback, variable) {
				const xhr = new XMLHttpRequest()
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4 && xhr.status === 200) {
						this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
						callback()
					}
				}
				xhr.open('GET', url)
				xhr.send()
			},
			getThemeCluster(theme) {
				const tintColor = (color, tint) => {
					let red = parseInt(color.slice(0, 2), 16)
					let green = parseInt(color.slice(2, 4), 16)
					let blue = parseInt(color.slice(4, 6), 16)

					if (tint === 0) { // when primary color is in its rgb space
						return [red, green, blue].join(',')
					} else {
						red += Math.round(tint * (255 - red))
						green += Math.round(tint * (255 - green))
						blue += Math.round(tint * (255 - blue))

						red = red.toString(16)
						green = green.toString(16)
						blue = blue.toString(16)

						return `#${red}${green}${blue}`
					}
				}
				const shadeColor = (color, shade) => {
					let red = parseInt(color.slice(0, 2), 16)
					let green = parseInt(color.slice(2, 4), 16)
					let blue = parseInt(color.slice(4, 6), 16)

					red = Math.round((1 - shade) * red).toString(16);
					green = Math.round((1 - shade) * green).toString(16);
					blue = Math.round((1 - shade) * blue).toString(16);
					return `#${red}${green}${blue}`
				}
				const clusters = [theme]
				for (let i = 0; i <= 9; i++) {
					clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
				}
				clusters.push(shadeColor(theme, 0.1))
				return clusters
			},
			setCss(val){
				let red,green,blue,a;
				let style = document.body.style;
				if(/#(..)(..)(..)/g.test(val)){
					[red,green,blue]=[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16)];
				};
				style.setProperty('--red',red);
				style.setProperty('--green',green);
				style.setProperty('--blue',blue);
			},
			//设置body样式
			setBodyStyle(){
				let style = document.body.style;
				let menu = this.$store.state.menu;
				this.$store.commit('setMenuColor');
				style.setProperty('--menu_color',menu.color);
				style.setProperty('--menu_color--active',menu.colorActive);
				style.setProperty('--menu_background_color',menu.backgroundColor);
			}
		}
	}
</script>

<style lang="scss" scoped>
	div{
		display: none;
	}
</style>
