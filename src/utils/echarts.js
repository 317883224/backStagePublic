import Vue from "vue";

//必须按需引入
// var echarts = require('echarts/lib/echarts');// 引入 ECharts 主模块
// require('echarts/lib/chart/bar');// 引入柱状图
// require('echarts/lib/chart/line');// 引入折线图状图
// require('echarts/lib/component/tooltip');// 引入提示框
// require('echarts/lib/component/title');// 引入标题组件
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;