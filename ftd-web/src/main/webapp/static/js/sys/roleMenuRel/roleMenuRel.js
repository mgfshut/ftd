 var addurl=path+"/roleMenuRel/addAjax";
//插入ajax
function add(data){
	  var p = $.post(addurl,data,function(json){
		  if(json.errorcode == 0){
			  layer.alert("保存成功!", {
	                title: '提交结果',
	                cancel: function(index, layero){ 
	                	 var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	                     parent.layer.close(index);
	                     parent.queryPageCount();
	                	 return true; 
	                	},
	                yes: function(index, layero){
	                	 var index1 = parent.layer.getFrameIndex(window.name); //获取窗口索引
	                     parent.layer.close(index1);
	                	 layer.close(index); //如果设定了yes回调，需进行手工关闭
	                	 parent.queryPageCount();
	              }
          })
		  }else{
			  layer.alert(json.message, {
	                title: '提交结果'
	          })
		  }
	  },"json").error(function(){
		  layer.alert("请求失败请稍后重试!!");
	  },"json");
}

//设置表单
function setDefFromValue(fromid,data){
	 if(data != undefined && data != null && data!=""){
		 for(key in data){
			 $("#"+fromid+" input[name='"+key+"']").val(data[key]);
			 $("#"+fromid+" select[name='"+key+"']").val(data[key].toString());
			 $("#"+fromid+" textarea[name='"+key+"']").val(data[key]);
		 }
	 }else{
		 layer.alert("未查询到相应数据！请刷新列表再试！", {
			 title: '查询结果',
			 cancel: function(index, layero){
				 var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
				 parent.layer.close(index);
				 parent.queryPageCount();
				 return true;
			 },
			 yes: function(index, layero){
				 var index1 = parent.layer.getFrameIndex(window.name); //获取窗口索引
				 parent.layer.close(index1);
				 layer.close(index); //如果设定了yes回调，需进行手工关闭
				 parent.queryPageCount();
			 }
		 })
		 console.error("defFrom is not undefined!!");
	 }
}