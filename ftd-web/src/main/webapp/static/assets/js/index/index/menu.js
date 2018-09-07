var initmenu = function() {
	var ajaxurl =path+"/menu/getAllowedMenu";
	$.ajax({
		url: ajaxurl,
		type: "post",
		async: false,
		contentType: "application/json",
		success: function(restree) {
			if(restree.errorcode == 0){
				$("#menuHome").html("");
				var html = forMenu(restree.data);
				$("#menuHome").html(html); //初始化菜单
			}else{
				alert("未查询到用户菜单!!请联系管理员配置菜单!!")
			}
			
		},
		cache: false,
		timeout: 5000,
		error: function(errObj, resu) {
		}
	});
}();

function forMenu(data){
	var html = "<li id='0a' style='text-align:center;'>"+
			   "<a href='javacript:void(0);' id='' icon='' title=''>"+
			   "<div class='sidebar-collapse' id='sidebar-collapse'>"+
			   "<i class='menu-icon fa fa-bars'></i>"+
	           "</div></a></li>";
	for(var i=0;i<data.length;i++){
		var parent = data[i];
		var childrens = data[i].childrens;
		if(parent.menuIcon == undefined || parent.menuIcon == null){
			parent.menuIcon = "";
		}
		if(parent.menuUrl == undefined || parent.menuUrl == null){
			parent.menuUrl = "";
		}else{
			parent.menuUrl = path+parent.menuUrl;
		}
		if(i == 0){
			html += "<li id='"+parent.id+"' class=''>";
		}else{
			html += "<li id='"+parent.id+"' class=''>";
		}
		html += "<a href='javaScript:void(0);' class='menu-dropdown' icon='"+parent.menuIcon+"'>"+
			     "<i class='menu-icon "+parent.menuIcon+"'></i>"+
			     "<span class='menu-text'>"+parent.menuName+"</span>"+
			     "<i class='menu-expand'></i></a>";
	   if(childrens != undefined && childrens != null){
		   html += "<ul class='submenu' style='display: none;'>";
		   for(var t=0;t<childrens.length;t++){
			   var s = childrens[t];
			   if(s.menuIcon == undefined || s.menuIcon == null){
				    s.menuIcon = "";
				}
				if(s.menuUrl == undefined || s.menuUrl == null){
					s.menuUrl = "";
				}else{
					s.menuUrl = path+s.menuUrl;
				}
			   var sid = s.parentId+"_"+s.id;
			   html += "<li id='50'>"+
				       "<a href='javaScript:void(0);' id='"+sid+"' icon='"+s.menuIcon+"' addtabs='"+sid+"' url='"+s.menuUrl+"'>"+
					   "<span class='menu-text'>"+s.menuName+"</span>"+
				       "</a></li>";
		   }
		   html += "</ul>";
	   }else{
		   html += "</li>"
	   }
	}
	return html;
}