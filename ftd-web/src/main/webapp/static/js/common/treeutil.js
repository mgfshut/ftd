var loadTree = function(ulId,url,zTreeOnClick){
	var treeClick = zTreeOnClick;
	//tree树
	var setting = {   
	        showLine : true,                  //是否显示节点间的连线   
	        checkable : true,                 //每个节点上是否显示 CheckBox   
	        data: {
	    		key: {
	    			children: "childid",
	    		},
	    		keep: {
					parent:false,
					leaf:false
				},
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "supid",
					rootPId: 0
				}
	    	},
			callback: {
				onClick: treeClick
			}
	};   
	
	var zTree;   
	var treeNodes;   
	var a = $.ajax({   
	        async : false,   
	        cache:false,   
	        type: 'GET',   
	        dataType : "json",   
	        url:  path + url,//请求的action路径   
	        error: function () {//请求失败处理函数   
	            alert('请求失败');   
	        },   
	        success:function(data){ //请求成功后处理函数。     
	            treeNodes = data.data;   //把后台封装好的简单Json格式赋给treeNodes 
	            treeNodes[0]["open"]=true;
	            $.fn.zTree.init($("#"+ulId), setting, treeNodes);
	            treeObj = $.fn.zTree.getZTreeObj("tree");
	        }   
	    });   
}
