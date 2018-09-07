
function loadTree(url,myCallback){
	layer.open({
		 type: 1
		 ,title: "请选择" //不显示标题栏
		 ,closeBtn: "1"
		 ,area: ['300px', '400px']
		 ,shade: 0.2
		 ,maxmin:true
		 ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
		 ,moveType: 1 //拖拽模式，0或者1
		 ,content: "<ul id='zTree' class='ztree'></ul>"
		 ,success: function(layero, index){
			 var setting = {
				async: {
					enable: true,
					url:url,
					autoParam:["id"]
				},
				callback: {
					onClick: function(event, treeId, treeNode){
						myCallback(treeNode);
						layer.close(index);
					}
				}
			};
			$.fn.zTree.init($("#zTree"), setting);
		 }
	});
}