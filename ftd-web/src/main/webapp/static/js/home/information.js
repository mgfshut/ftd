/**
 * 报警信息
 */
$(function () {
	$(document).ready(function (){
       //超比例停运
        $.ajax({
            type: "post",
            dataType: "json",
            url: path+"/index/AreaCapacityMonitor/gotowarnlist",
            success: function (json) {
                var datas = json.data;
                for (i in datas) {
                	 var d = datas[i];
                   }
                if(d!=null || d!=undefined){
                    var dateTime = (new Date(d.createTime)).pattern("yyyy-MM-dd HH:mm")
                    if(dateTime!=null||dateTime!=undefined){
                        document.getElementById("police_right_Time_chaoyun").innerHTML = dateTime;
                    }else{
                    	document.getElementById("police_right_Time_chaoyun").innerHTML = "正常";
                    }
                }else{
                	document.getElementById("police_right_Time_chaoyun").innerHTML = "正常";
                }
              if(d!=null || d!=undefined){
                  if(datas!=null||datas!=undefined){
              		$("#imglction").show();
               		}
               		else{
               			$("#imglction2").show();
               		}
              }else{
            	  $("#imglction2").show();
              }

            }
        });
	});
	
	$(document).ready(function (){
	       //异常聚集预警
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/AreaCapacityMonitor/gtocountWarning",
	            success: function (json) {
	                var datas = json.data;
	                for (i in datas) {
	                	 var d = datas[i];
	                   }
	                if(d!=null || d!=undefined){
	                var dateTime = (new Date(d.createTime)).pattern("yyyy-MM-dd HH:mm")
	                if(dateTime!=null&&dateTime!=undefined){
	                    document.getElementById("police_right_Time_juji").innerHTML = dateTime;
	                }else{
	                	document.getElementById("police_right_Time_juji").innerHTML = "正常";
	                }
	                }else{
	                	document.getElementById("police_right_Time_juji").innerHTML = "正常";
	                }
	                
	                if(d!=null || d!=undefined){
		                if(datas!=null||datas!=undefined){
		            		$("#imglction3").show();
		             		}
		             		else{
		             			$("#imglction4").show();
		             		}
	                }else{
	                	$("#imglction4").show();
	                }

	            }
	        });
		});
	
	$(document).ready(function (){
	      //无证营运
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/AreaCapacityMonitor/gotoUnlicensedoperation",
	            success: function (json) {
	                var datas = json.data;
		     		   for (var i in datas) {
		                   var d = datas[i];
			               var count = d.count;
		               }
		                //alert(d.createTime);
		     		  if(d.createTime!=null||d.createTime!=undefined){
		                var dateTime = (new Date(d.createTime)).pattern("yyyy-MM-dd HH:mm")
		                if(dateTime!=null&&dateTime!=undefined){
		                    document.getElementById("police_right_Time_zhuzheng").innerHTML = dateTime;
		                }else{
		                	document.getElementById("police_right_Time_zhuzheng").innerHTML = "正常";
		                }
		     		  }else{
		                	document.getElementById("police_right_Time_zhuzheng").innerHTML = "正常";
		                }
//		                console.log(datas);
//		                alert(count);
	                if(count > 0 && count!=undefined){
	            		$("#imglction5").show();
	             		}
	             		else{
	             			$("#imglction6").show();
	             		}
	            }
	        });
		});
	$(document).ready(function (){
	       //超范围营运
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/AreaCapacityMonitor/getcountWarning",
	            success: function (json) {
	                var datas = json.data;
	     		   for (var i in datas) {
	                   var d = datas[i];
		               var count = d.count;
	               }
	     		  if(d.createTime!=null||d.createTime!=undefined){
	                var dateTime = (new Date(d.createTime)).pattern("yyyy-MM-dd HH:mm")
	                if(dateTime!=null&&dateTime!=undefined){
	                    document.getElementById("police_right_Time_fanwei").innerHTML = dateTime;
	                }else{
	                	document.getElementById("police_right_Time_fanwei").innerHTML = "正常";
	                }
	     		  }else{
	                	document.getElementById("police_right_Time_fanwei").innerHTML = "正常";
	                }
	                if(count>0 && count!=undefined){
	            		$("#imglction7").show();
	             		}
	             		else{
	             			$("#imglction8").show();
	             		}
	            }
	        });
		});
	
	$(document).ready(function (){
		//网约车企业总数
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/AreaCapacityMonitor/companylist",
	            success: function (json) {
	                var datas = json.data;
		     		   for (var i in datas) {
		                   var d = datas[i];
			               var total = d.companyCount;
			               var addmonthCount = d.addmonthCount;
			               var deledmonthCount = d.deledmonthCount;
		               }
	                document.getElementById("rent_2_companyCount").innerHTML = total+" "+"个";
	                document.getElementById("rent_2_companyCount_add").innerHTML = addmonthCount;
	                document.getElementById("rent_2_companyCount_dele").innerHTML = deledmonthCount;
	            }
	        });
	     //驾驶员总数   
	        var pageIndex;
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            data:{pageIndex:1},
	            url: path+"/index/AreaCapacityMonitor/getdriverTotal",
	            success: function (json) {
	                var datas = json.data;
		     		   for (var i in datas) {
		                   var d = datas[i];
			               var total = d.total;
			               var addmonthCount = d.addmonthCount;
			               var deledmonthCount = d.deledmonthCount;
		               }
	                document.getElementById("rent_2_driverCount").innerHTML = total+" "+"人";
	                document.getElementById("rent_2_driverCount_add").innerHTML = addmonthCount;
	                document.getElementById("rent_2_driverCount_dele").innerHTML = deledmonthCount;
	            }
	        }); 
	        //车辆总数
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            data:{pageIndex:1},
	            url: path+"/index/AreaCapacityMonitor/getvehicleTotal",
	            success: function (json) {
	                var datas = json.data;
		     		   for (var i in datas) {
		                   var d = datas[i];
			               var total = d.total;
			               var addmonthCount = d.addmonthCount;
			               var deledmonthCount = d.deledmonthCount;
		               }
	                //车辆总数，驾驶员总数  /index/AreaCapacityMonitor/companylist
	                document.getElementById("rent_2_vehicleCount").innerHTML = total+" "+"辆";
	                document.getElementById("rent_2_vehicleCount_add").innerHTML = addmonthCount;
	                document.getElementById("rent_2_vehicleCount_dele").innerHTML = deledmonthCount;
	            }
	        });
		});
	
});