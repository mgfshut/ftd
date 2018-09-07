/**
 * 日订单排名
 */
$(function () {
	$(document).ready(function (){
		//网约车企业待办数量
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/Dailyorderquantity/getStaBusinessList",
	            success: function (json) {
	            	 var datas = json.data;
	                 for (var i in datas) {
	                     var d = datas[i];
	                     var index = parseInt(i) + 1;
	                     var CompanyId = d.companyId;
	                     //alert(CompanyId);
	                     var CompanyName = {'1200DDCX3307':'滴滴出行','3301YXKJ223E':'曹操专车','shenzhou':'神州专车','shouyue':'首汽约车','1100YDYC423D':'易到'};
	         			function getFuelType(CompanyId) {
	        			    if (CompanyId != null && CompanyId != '') {
	        			        return CompanyName[CompanyId];
	        			    }else {
	        			        return '';
	        			    }
	        			}
	            		if (CompanyId != null) {
	            			CompanyId = getFuelType(CompanyId);
	            		}
	            		 var $area = $("<span class='order-right-span1' style=''>"+CompanyId+'  '+d.orderTotal+' '+'单'+"</span>");

	 	                    $("#listtoday").append($area);
	                     //html += "<span class='order-right-span1' style=''>"+CompanyId+"</span>";
	                 }
	               
	               // document.getElementById("daiban_left2_company").innerHTML = datas+"笔";
	            }
	        });
		});

});