/**
 * Created by zha on 2017/7/6.
 */
//自动切换地图加载地区
var mapaddres = path + "/config/map/mapaddress"
var mapurls = path + "/config/map/mapcenter"
var centerdata;
var centeraddress;
$(function(){
	   $.ajax({
	        async : false,
	        type : "post",
	        dataType : "json",
	        url : mapurls,
	        success : function(data) {
	          centerdata = data;
	        }
	    });
	   $.ajax({
	        async : false,
	        type : "post",
	        dataType : "json",
	        url : mapaddres,
	        success : function(data) {
	        	centeraddress = data;
	        }
	    });
})
	var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strDateStr =strDate.toString() - 1;
    var conds = date.getSeconds();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var Time_date = date.getFullYear() +"年"+ month +"月"+ strDate +"日" +" "+hour +":"+minutes;

$(function () {

    if (!isSupportCanvas()) {
        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
    }

    var url = path + "/index/heatMap/vehicle";
    var companyId = "all";
    showHeatMap(url, companyId);
    $("#showVehicle_color").addClass('btn-mini_hovercolor');
    document.getElementById("hotmap_timeTodaytime").innerHTML =Time_date;
	$("#hotmap_pep_3").show();
	//$("#imglction8").show();
});

/**
 * 订单起点
 */
function showDeparture() {
    var url = path + "/index/heatMap/departure";
    var companyId = $("#heatMap").val();
    showHeatMap(url, companyId); 

	$("#showDestination_color").removeClass('btn-mini_hovercolor');// 订单终点
	$("#showVehicle_color").removeClass('btn-mini_hovercolor');// 车辆位置

	$("#showDeparture_color").addClass('btn-mini_hovercolor');
	
	$("#hotmap_pep_1").show();
	
	$("#hotmap_pep_2").hide();
	$("#hotmap_pep_3").hide();
	document.getElementById("hotmap_timeTodaytime").innerHTML ="时间范围:"+""+"近三天";
}

/**
 * 订单终点
 */
function showDestination() {
    var url = path + "/index/heatMap/destination";
    var companyId = $("#heatMap").val();
    showHeatMap(url, companyId);

	$("#showDeparture_color").removeClass('btn-mini_hovercolor');// 订单起点
	$("#showVehicle_color").removeClass('btn-mini_hovercolor');// 车辆位置

	$("#showDestination_color").addClass('btn-mini_hovercolor');
	$("#hotmap_pep_2").show();
	$("#hotmap_pep_3").hide();
	$("#hotmap_pep_1").hide();
	document.getElementById("hotmap_timeTodaytime").innerHTML ="时间范围:"+""+"近三天";
}

/**
 * 车辆位置
 */
function showVehicle() {
    var url = path + "/index/heatMap/vehicle";
    var companyId = $("#heatMap").val();
    showHeatMap(url, companyId);
	
    $("#showDeparture_color").removeClass('btn-mini_hovercolor');// 订单起点
	$("#showDestination_color").removeClass('btn-mini_hovercolor');// 订单终点

	$("#showVehicle_color").addClass('btn-mini_hovercolor');
	$("#hotmap_pep_3").show();
	$("#hotmap_pep_1").hide();
	$("#hotmap_pep_2").hide();
	document.getElementById("hotmap_timeTodaytime").innerHTML =Time_date;
}

/**
 * 判断浏览区是否支持canvas
 * 
 * @returns {boolean}
 */
function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

/**
 * 重新加载热力图
 * @param url
 * @param companyId
 */
function showHeatMap(url, companyId) {
    document.getElementById("main_hotMap").innerHTML = "";
    $.post(url, {companyId: companyId}, function (result) {
        var points = [];
        var data = result.data;
        for (var i in data) {
            var split = i.split(",");
            points.push({"lng": split[0], "lat": split[1], "count": data[i]});
        }
        map = initMaps();
        heatmap = createHeatMap({points: points});
    });
}

/**
 * 地图初始化  (zoom[7.省级  11.市县级 12.县区级])
 * @returns {AMap.Map}
 */
 var zoomstr;
function initMaps() {
	if(centeraddress.toString().substring(2,6)=="0000"){
		zoomstr = 7
	}else if (centeraddress.toString().substring(4,6)=="00") {
		zoomstr = 11
	}else{
		zoomstr = 12
	}
    var map = new AMap.Map("main_hotMap", {
        resizeEnable: true,
        center: centerdata,
        zoom: zoomstr
    });

    AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'], function(){

            map.addControl(new AMap.ToolBar());//工具条

            map.addControl(new AMap.Scale());//比例尺

    });

    return map;
    
}



/**
 * 创建热力图
 * @param opt
 */
function createHeatMap(opt) {

    var heatmap;

    var defaultOpt = {
        radius: 25, //热力图中单个点的半径，默认：30，单位：pixel
        opacity: [0, 0.8], //热力图透明度数组，取值范围[0,1]，0表示完全透明，1表示不透明
        gradient: {
            '0.5': 'blue',
            '0.65': 'rgb(117,211,248)',
            '0.7': 'rgb(0, 255, 0)',
            '0.9': '#ffea00',
            '1.0': 'red'
        }//热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图,其中 key 表示间隔位置，取值范围： [0,1]，value 为颜色值。默认：heatmap.js标准配色方案
    };

    opt = $.extend({}, defaultOpt, opt);

    map.plugin(["AMap.Heatmap"], function () {
        //初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
            radius: opt.radius,
            opacity: opt.opacity,
            gradient: opt.gradient
        });
        //设置数据集
        heatmap.setDataSet({
            data: opt.points,
            max:15
        });

    });

    return heatmap;
}

var map;
var heatmap;
$(function () {
    $.post(path + "/inq/company/listCompany", {}, function (result) {
        $(".selectHome").empty();
        $(".selectHome").append("<option value='all' >--请选择--</option>");
        for (var i in result.data) {
            var $opt = $("<option value='" + i + "'>" + result.data[i] + "</option>");
            $(".selectHome").append($opt);
        }
    });
})