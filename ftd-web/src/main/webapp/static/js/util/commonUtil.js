/**
 * Created by zha on 2017/6/6.
 * 一般公共方法
 */
/*获得url传递参数*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 将yyyyMMdd 或 yyyyMMddHHmmss 格式的日期格式化
 * @param dateString
 * @returns {*}
 */
var formatDate = function (dateString) {
    dateString = dateString + '';
    if (!dateString.length) {
        return '';
    } else if (dateString.length == 6){
        return dateString.substring(0, 4) + "-"
            + dateString.substring(4, 6);
    }
    else if (dateString.length == 8) {
        return dateString.substring(0, 4) + "-"
               + dateString.substring(4, 6) + "-"
               + dateString.substring(6.8);
    } else if (dateString.length == 14) {
        return  dateString.substring(0, 4) + "-"
                + dateString.substring(4, 6) + "-"
                + dateString.substring(6, 8) + " "
                + dateString.substring(8, 10) + ":"
                + dateString.substring(10, 12) + ":"
                + dateString.substring(12, 14);
    } else {
        return dateString;
    }
};

/**
 * 正则匹配 hh:mm:ss 的时间格式
 * @param str
 * @returns {boolean}
 * @constructor
 */
function FormateCheck(str) {
    var re = /^(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/;
    var result = re.test(str);
    return result;
}

/**
 * 是否为正整数
 * @param s
 * @returns {boolean}
 */
function isPositiveNum(s){
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    return re.test(s)
}

/**
 * 表单数据回填
 * @param jsonStr
 */
function loadData(data){

    var key,value,tagName,type,arr;
    for(x in data){
        key = x;
        value = data[x];

        $("[name='"+key+"'],[name='"+key+"[]']").each(function(){
            tagName = $(this)[0].tagName;
            type = $(this).attr('type');
            if(tagName=='INPUT'){
                if(type=='radio'){
                    $(this).attr('checked',$(this).val()==value);
                }else if(type=='checkbox'){
                    arr = value.split(',');
                    for(var i =0;i<arr.length;i++){
                        if($(this).val()==arr[i]){
                            $(this).attr('checked',true);
                            break;
                        }
                    }
                }else{
                    $(this).val(value);
                }
            }else if(tagName=='SELECT' || tagName=='TEXTAREA'){
                $(this).val(value);
            }

        });
    }
}

/**
 * 设置select选中
 * @param selectId select的id值
 * @param checkValue 选中option的值
 * @author lqy
 * @since 2015-08-21
 */
function setSelectChecked(selectId, checkValue){
    var select = document.getElementById(selectId);
    for(var i=0; i<select.options.length; i++){
        if(select.options[i].innerHTML == checkValue){
            select.options[i].selected = true;
            break;
        }
    }
};

/**
 * 格式化日期间隔
 * @param seconds
 * @returns {string}
 */
function fommatDiff(seconds) {
    var day=parseInt(seconds/1440/60);
    var hour=parseInt(seconds/60/60);
    var minute=parseInt(seconds/60%60);
    var second=parseInt(seconds%60);
    var string_description=day>0?day+"天":"";
    string_description+=hour>0?hour+"时":"";
    string_description+=minute>0?minute+"分":"";
    string_description+=second>0?second+"秒":"";
    return string_description;
}

/**
 * 判断 [numA1,nummA2] he [numB1,numB2]是否交叉
 * @param numA1
 * @param numA2
 * @param numB1
 * @param numB2
 */
function isCross(numA1,numA2,numB1,numB2) {
    numA1 = numA1 - 0;
    numA2 = numA2 - 0;
    numB1 = numB1 - 0;
    numB2 = numB2 - 0;
    if (numA2 <= numB1) {
        return false;
    }else if (numA1 >= numB2) {
        return false;
    }
    return true;
}
