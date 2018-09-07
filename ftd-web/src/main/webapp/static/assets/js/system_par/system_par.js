//单击显示与隐藏功能而引用jquery-1.11.2.min.js插件
$(".custom-box").click(function(){
			if($(".custom-on").css("display")=="none"){
			$(".custom-on").show();
			}else{
			$(".custom-on").hide();
			}
			});
			
//列表全选或全不选功能，也引用jquery-1.11.2.min.js插件
$("#all").click(function(){   
	if(this.checked){   
		$("#list :checkbox").prop("checked", true);  
	}else{   
		$("#list :checkbox").prop("checked", false);
	}   
});