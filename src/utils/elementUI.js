import Vue from "vue";
import cookie from 'js-cookie';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'; //引用语言包
//elementUI配置语言包
import locale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zhfnLocale from 'element-ui/lib/locale/lang/zh-TW';

Vue.use(VueI18n);
Vue.use(ElementUI, {
	size: 'mini'
}, {
	zhLocale
});


const i18n = new VueI18n({
	locale: cookie.get('lang') || 'zh-CN', // 语言标识,默认汉语,先去cookie查找，如果存在并有效，cookie值即为默认语言类型；否则默认为中文简体
	messages: {
		'en-US': Object.assign(require("@/lang/en"), enLocale),
		'zh-CN': Object.assign(require("@/lang/zh-CN"), zhLocale),
		'zh-FN': Object.assign(require("@/lang/zh-FN"), zhfnLocale),
	}
});
locale.i18n((key, value) => i18n.t(key, value)); //为了之后将element-ui组件本地化

export default i18n;
