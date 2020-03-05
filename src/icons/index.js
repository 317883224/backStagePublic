import Vue from 'vue'
import SvgIcon from '@/components/Iconfont';
Vue.component('svg-icon',SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);