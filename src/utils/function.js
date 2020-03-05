/*****************全局方法************************/
import {
    Message,
} from 'element-ui';

//弹窗信息 参数:msg(弹窗信息) type(类型) time(时间)
const message = (msg,type,time) => {
	Message.closeAll();
    return Message({
        message: msg || '',
        type: type || 'info',
        customClass:'message',
        showClose:true,
        duration: time || 5 * 1000,
    })
}

//数字格式化为金钱
const formatMoney = (money) => {
	let value = '';
	for (var i = 0; i < money.toString().length; i++) {
		if(money[i]==='.'){
			return value+=money.substr(i);
		}else{
			let _i = money.length - i - 1;
			value += _i>0&&_i%3===0?money[i]+',':money[i];
		}
	}
    return value;
}

export {
	message,
	formatMoney,
}