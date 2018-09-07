//var IP="http://120.27.151.140:8680"
//var IP="http://localhost:8080"
//var IP="http://192.168.100.95:8080"
//var IP="http://192.168.100.34:8080"
var IP = "";
//ajax全局设置
$(document).ajaxStart(function() {
	$("#TableLoading").show();
}).ajaxStop(function() {
	$("#TableLoading").hide();
	$("#TableLoading > img").show();
});

//全局变量
var color = "<SUP style=\"color:red\">*</SUP>"; //必填标志
var _tiphtml = "<span class='jx-tips pull-right'><i class='fa fa-warning'></i>生成排班时服务器将自动过滤已过期的时间段！</span>";

//cookie
if(window.top.cookie!=undefined){
	var _cookie=window.top.cookie;
}

