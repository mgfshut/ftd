 var url=path+'/index/AreaCapacityMonitor/listAjax';
//初始化分页
 $(function(){
             var addHtml = function(json){
            	 var html = "";
            	 var datas = json.data.records;
                 for (var i in datas) {
                     var d = datas[i];
                     var index = parseInt(i) + 1;
                     //var redispng = datare.d.property
                     //alert(d.property);
                       html +="<div class='condition_lef2'><div class='condition_lef1_1'><a href='#' onclick='hrefdisurl()'><img src='"+path+"/static/img/home/emphasisareaicon/"+d.property+"';/></a></div><div class='condition_lef1_2'><div class='condition_lef1_up'>"+d.num+"</div><div >"+d.areaName+"</div></div></div>";
                       //html += "<div style='width: 33%; height: 50%; float: left; text-align: center';><div style='display: inline-block;width: 40%;height: 100%;  float: left;'><a href='#' onclick='hrefdisurl()'><img alt='' src='"+path+"/static/img/home/emphasisareaicon/"+d.property+"';></a></div><div style='width: 40%; height: 50%; float: left;'><span style='display: inline-block;text-align: center;'>"+d.num+"</span><br /><span style='color: #666666';>"+d.areaName+"</span></div></div>";
                 }
                     return html;
             }
             var pageUtil = $(document).PaginBar('demo7','list',"tableFrom",10,1,url,addHtml);
             queryPageCount();
      });
 //跳转到重点区域监控
function hrefdisurl(){
	 layer.open({
	        type: 2
	        ,title: "重点区域运力监控" //不显示标题栏
	        ,area: ['100%', '100%']
	        ,maxmin:true
	        ,content: path+'/ops/capacityMonitor/monitor'
	      });
	 //location.href = disurl;
}
$(function(){
	var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strDateStr =strDate.toString() - 1;
    var conds = date.getSeconds();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var Time_date = date.getFullYear() +"年"+ month +"月"+ strDate +"日" +" "+hour +":"+minutes;

	document.getElementById("timeB_showdate").innerHTML =Time_date;//重点场站车辆情况(空车数)时间
	document.getElementById("time_show_yunxing").innerHTML =Time_date;//实时车辆运行情况时间
	document.getElementById("timeB_paiming").innerHTML =Time_date;//日订单排名
	

});