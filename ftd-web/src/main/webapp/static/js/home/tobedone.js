var pathsad =path+'/license/company/list';
/**
 * 待办事项
 */
$(function () {
	$(document).ready(function (){
		//网约车企业待办数量
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/Tobedone/gotoTobedonelist",
	            success: function (json) {
	                var datas = json.data;
	                document.getElementById("daiban_left2_company").innerHTML = datas+"笔";
	            }
	        });
		});
	
	$(document).ready(function (){
		//网约车车辆待办数量
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/Tobedone/gotoVehiclelist",
	            success: function (json) {
	                var datas = json.data;
	                document.getElementById("daiban_left3_vehicle").innerHTML = datas+"笔";
	            }
	        });
		});
	
	$(document).ready(function (){
		//网约车驾驶员待办数量
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/Tobedone/getPersonList",
	            success: function (json) {
	                var datas = json.data;
	                document.getElementById("daiban_left4_person").innerHTML = datas+"笔";
	            }
	        });
		});
	$(document).ready(function (){
		//网约车投诉待办数量
	        $.ajax({
	            type: "post",
	            dataType: "json",
	            url: path+"/index/Tobedone/getComplaintslist",
	            success: function (json) {
	                var datas = json.data;
	                document.getElementById("daiban_left5_complaints").innerHTML = datas+"笔";
	            }
	        });
		});
});

$("#bjdsbhjdh").on('click', function () {
		location.herf=pathsad;
})