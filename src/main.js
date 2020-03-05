import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueParticles from 'vue-particles'; //粒子背景特效
import '@/assets/css/basis.scss';//全局css变量定义
import '@/utils/permission.js';//权限
import '@/icons';//图标
import '@/utils/echarts.js';//按需引入echarts
import i18n from '@/utils/elementUI.js';//按需引入elementUI 和 语言包

Vue.use(VueParticles);
Vue.config.productionTip = false;

new Vue({
    router,
	i18n,
    store,
    render: h => h(App)
}).$mount("#app");
