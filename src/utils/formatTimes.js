/******************************** 时间转换 **********************************
 * 
 ************属性 attr
 * 	参数			    说明						    类型				    可选值		            默认值
 * 	times 			时间							array date			--			            new date
 * 	format 			时间转换类型					string				具体写法看详情			'yyyy-MM-dd hh:mm:ss' 
 * 
 * 
 * ************format详情说明
 * 	参数			    说明				    范围
 * 	y 				年					1~4
 * 	M 				月					1~2
 * 	d 				日					1~2
 * 	h 				小时			    	1~2
 * 	m 				分					1~2
 * 	s 				秒					1~2
 * 	q 				季度			    	1~2
 * 	S 				毫秒				    1
 * 	t 				时间戳				1
 * 	w 				星期				    1
 *****************************/
const formatTimes = (times = new Date(), format = 'yyyy-MM-dd hh:mm:ss') => {
    let timesType = Array.isArray(times); //判断是否是数组
    (timesType ? times : [times]).forEach((item, index, array) => {
        let _item = format;
        const o = {
            "M+": item.getMonth() + 1, //月份
            "d+": item.getDate(), //日
            "h+": item.getHours(), //小时
            "m+": item.getMinutes(), //分
            "s+": item.getSeconds(), //秒
            "q+": Math.floor((item.getMonth() + 3) / 3), //季度
            "S": item.getMilliseconds(), //毫秒
            "t": item.getTime(), //时间戳
            "w": item.getDay(), //星期
        };

        if (/(y+)/.test(_item)) {
            _item = _item.replace(RegExp.$1, (item.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (let k in o) {
            if (new RegExp("(" + k + ")").test(_item)) {
                _item = _item.replace(
                    RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))
                );
            }
        }
        times[index] = _item;
    })
    return timesType ? times : times[0];
}


/******************************** 根据开始结束时间生成连续的时间数组 **********************************
 * 
 ************属性 attr
 * 	参数			        说明							类型				        可选值		        默认值
 * 	startTime 			开始时间						date			        --			        -
 * 	endTime 			结束时间						date			        --			        -
 * 	format 			    时间转换类型					string				    同时间转换方法		new Date()
 *****************************/
const generateDateTimes = (startTime, endTime, format) => {
    let dateTimes = [endTime];
    for (let i = 0; i < Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24)); i++) {
        dateTimes.push(new Date(new Date(endTime).setDate(endTime.getDate() - (i + 1))));
    }
    return format ? formatTimes(dateTimes.reverse(), format) : dateTimes.reverse();
}




/******************************** 根据传进的数组字符串或者字符串生成相应的时间 **********************************
 * 
 ************属性 attr
 * 	参数			            说明							类型				        可选值		        默认值
 * 	dateTimesArray 			需要转换的数据			date array			    --			        -
 * 	format 			        时间转换类型					string				    同时间转换方法		new Date()
 *****************************/
const formatStringDateTimes = (dateTimesArray, format) => {
    let _dateTimesArray = Array.isArray(dateTimesArray) ? dateTimesArray : [dateTimesArray].map((item) => {
        return new Date(...item.replace(/\D/g, ',').split(','));
    })
    dateTimesArray = Array.isArray(dateTimesArray) ? _dateTimesArray : _dateTimesArray[0];
    return format ? formatTimes(dateTimesArray, format) : dateTimesArray;
}

/******************************** 根据数据生成日期快捷 el-date Shortcuts用 **********************************
 * 
 ************属性 attr
 * 	参数			        说明							类型				        可选值		        默认值
 * 	dateArray 			根据数据生成日期快捷			array			        --			        -
 * 
 * ************dateArray item
 * 	参数			    说明							类型				        可选值		        默认值
 * 	text 			名称			                string  			    --			        -
 *  y 				距离当前年限					string number           --                  --
 * 	M 				距离当前月限					string number           --                  --
 * 	d 				距离当前日限					string number           --                  --
 *****************************/
const generateDateShortcuts = (dateArray) => {
    return dateArray.map((item) => {
        return {
            text: item.text,
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setYear(start.getFullYear() - (item.y || 0));
                start.setMonth(start.getMonth() - (item.M || 0));
                start.setDate(start.getDate() - (item.d || 0));
                picker.$emit('pick', [start, end]);
            }
        }
    })
}

export default formatTimes;
export {
    formatTimes,
    generateDateTimes,
    formatStringDateTimes,
    generateDateShortcuts,
}
