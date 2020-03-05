/* ******************************** 规则方法使用说明 **********************************
* 
* 	传入element-ui rule的参数,根据message判断是否报错,返回修改后的值,例:number(rule, value, callback),
* 
* ***********************************************************************************/


const inputRule = (reg,rule, value, callback) => {
	if (value && reg.test(value)) {
		rule.message?callback(rule.message):value = value.replace(reg,'');
	}
	return value;
}
const number = (rule, value, callback) => { //数字
	let reg = /-?\D*\.?\D/g;
	return inputRule(reg,rule, value, callback);
}
const integer = (rule, value, callback) => { //整数
	let reg = /-?\D/g;
	return inputRule(reg,rule, value, callback);
}
const positiveInteger = (rule, value, callback) => { //正整数
	let reg = /\D/g;
	return inputRule(reg,rule, value, callback);
}
const negativeInteger = (rule, value, callback) => { //负整数
	let reg = /((-\D+)|(0+))/g;
	return inputRule(reg,rule, value, callback);
}
const float = (rule, value, callback) => { //浮点
	let reg = /(-?\D+)(\.\D+)?/g;
	return inputRule(reg,rule, value, callback);
}
const positiveFloat = (rule, value, callback) => { //正浮点
	let reg = /\D+(\.\D+)?/g;
	return inputRule(reg,rule, value, callback);
}
const negativeFloat = (rule, value, callback) => { //负浮点
	let reg = /((-\D+(\.\D+)?)|(0+(\.0+)?))/g;
	return inputRule(reg,rule, value, callback);
}
const chinese = (rule, value, callback) => { //中文
	let reg = /[\u4e00-\u9fa5]/g;
	return inputRule(reg,rule, value, callback);
}
const english = (rule, value, callback) => { //英文
	let reg = /[A-Za-z]/g;
	return inputRule(reg,rule, value, callback);
}
const email = (rule, value, callback) => { //邮箱
	let reg = /([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/g;
	return inputRule(reg,rule, value, callback);
}
const phone = (rule, value, callback) => { //手机或电话
	let reg = /(\(\D{3,4}\)|\D{3,4}-)?\D{7,8}|1\D{10}/g;
	return inputRule(reg,rule, value, callback);
}
const idcard = (rule, value, callback) => { //身份证
	let reg = /[1-9]\D{5}(18|19|([23]\D))\D{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\D{3}[0-9Xx]/g;
	return inputRule(reg,rule, value, callback);
}
const InternetURL = (rule, value, callback) => { //网址
	let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g;
	return inputRule(reg,rule, value, callback);
}

export {
	number,
	integer,
	positiveInteger,
	negativeInteger,
	float,
	positiveFloat,
	negativeFloat,
	chinese,
	english,
	email,
	phone,
	idcard,
	InternetURL,
}
