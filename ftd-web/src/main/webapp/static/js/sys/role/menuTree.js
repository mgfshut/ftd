//tree树
var setting = {
	check: {
		enable: true,
		nocheckInherit: true,
		open:true
	},
	showLine : true,//是否显示节点间的连线
	checkable : true,//每个节点上是否显示 CheckBox
	// 是否能点击
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
			pIdKey: "parentId",
			rootPId: 0
		}
	}
};
var treeNodes;
var a = $.ajax({
	async : false,
	cache:false,
	type: 'POST',
	dataType : "json",
	url:  path + '/menu/getMenuTree',//请求的action路径
	error: function () {//请求失败处理函数
		alert('请求失败');
	},
	success:function(data){ //请求成功后处理函数。
		treeNodes = data.data;   //把后台封装好的简单Json格式赋给treeNodes
		$.fn.zTree.init($("#treeDemo"), setting, treeNodes);
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = zTree.getCheckedNodes(false);
		$.each(nodes, function(i, node){
			if(menuIdArray.indexOf(node.id+"") >= 0){
				zTree.checkNode(node, true, false);
			}
		});
	}
});

//禁止授权  开放授权判断
function nocheckNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	nocheck = e.data.nocheck,
	nodes = zTree.getSelectedNodes();
	//引用layui模块
	layui.use('layer', function(){
		var $ = layui.jquery, layer = layui.layer;
		if (nodes.length == 0) {
			layer.msg("请选择一条记录进行权限设置!!", {
				 title: '提示信息',
				 time: 2000,
				 btn: ['确认']
			})
			return;
		}
	})
	for (var i=0, l=nodes.length; i<l; i++) {
		nodes[i].nocheck = nocheck;
		zTree.updateNode(nodes[i]);
	}
}

$(document).ready(function(){
	$("#openAuthorization").click(function(e){
		layui.use('layer', function(){
		  var layer = layui.layer;
		  layer.confirm('确定要授权？', {icon: 3, title:'提示'}, function(index){
			  openAuthorization(layer);
			  layer.close(index);
		  });
		});
	});
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	treeObj.expandAll(true);
});
function openAuthorization(layer){
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = zTree.getCheckedNodes(true);
	var nodeStr = JSON.stringify(nodes);//对象转成字符串
	var array = new Array();
	$.each(nodes, function(i, node){
		array[i] = "menuIds="+node.id;
	});
	var result = $("form.layui-form").serialize()+"&"+array.join("&");
	if(nodeStr.length>2){
		$.ajax({
			async : false,
			cache:false,
			type: 'POST',
			dataType : "json",
			data:result,
			url:  path + '/role/setAuthAjax',
			error: function () {//请求失败处理函数
				alert('请求失败');
			},
			success:function(data){ //请求成功后处理函数。
				layer.msg('操作成功！', {time:1000}, function(){
					var index1 = parent.layer.getFrameIndex(window.name); //获取窗口索引
					parent.layer.close(index1);
					layer.close(index); //如果设定了yes回调，需进行手工关闭
					parent.queryPageCount();
				});
			}
		});
	}else{
		layer.msg('至少勾选一项进行授权',{
			icon:2,
			time:2000
		 });
	}
}





