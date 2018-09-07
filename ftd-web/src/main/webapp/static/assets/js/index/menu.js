var initmenu = function() {
/*	if (_cookie.usertype == null) {
		location.href = "login.html";
	}
	var ajaxurl = IP + "/rmwebapp/sch/menu";
	$.ajax({
		url: ajaxurl,
		type: "get",
		async: false,
		contentType: "application/json",
		success: function(restree) {
			$(".sidebar-menu").html(formenu(restree)); //初始化菜单
		},
		cache: false,
		timeout: 5000,
		error: function(errObj, resu) {
			console.log(errObj);
		}
	});*/

    var ajaxurl = path + "/tSysRoleRes/getAllowedMenuByRole";
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
            console.log(errObj);
        }
    });
}();

/**
 * 拼接html
 */
function forMenu(data){
    var html = "<li id='0a' style='text-align:center;'>"+
        "<a href='javacript:void(0);' id='' icon='' title=''>"+
        "<div class='sidebar-collapse' id='sidebar-collapse'>"+
        "<i class='menu-icon fa fa-bars'></i>"+
        "</div></a></li>";
    for(var i=0;i<data.length;i++){
        var parent = data[i].menu;
        var supers = data[i].superMenus;
        if(parent.icon == undefined || parent.icon == null){
            parent.icon = "";
        }
        if(parent.url == undefined || parent.url == null){
            parent.url = "";
        }else{
            parent.url = path+parent.url;
        }
        if(i == 0){
            html += "<li id='"+parent.id+"' class='open'>";
        }else{
            html += "<li id='"+parent.id+"' class=''>";
        }
        html += "<a href='javaScript:void(0);' class='menu-dropdown' icon='"+parent.icon+"' title='"+parent.name+"'>"+
            "<i class='"+parent.style+"'></i>"+
            "<span class='menu-text'>"+parent.name+"</span>"+
            "<i class='menu-expand'></i></a>";
        if(supers != undefined && supers != null){
            html += "<ul class='submenu' style='display: block;'>";
            for(var t=0;t<supers.length;t++){
                var s = supers[t];
                if(s.icon == undefined || s.icon == null){
                    s.icon = "";
                }
                if(s.url == undefined || s.url == null){
                    s.url = "";
                }else{
                    s.url = path+s.url;
                }
                var sid = s.pId+"_"+s.id;
                html += "<li id='50'>"+
                    "<a href='javaScript:void(0);' id='"+sid+"' icon='"+s.icon+"' title='"+s.name+"' addtabs='"+sid+"' url='"+s.url+"'>"+
                    "<span class='menu-text'>"+s.name+"</span>"+
                    "</a></li>";
            }
            html += "</ul>";
        }else{
            html += "</li>"
        }
    }
    //html += "</ul></div></div></div>";
    return html;
}

//排序规则
/*
function sortNumber(a, b) {
    return a.seq - b.seq
}

//返回树字符串
function formenu(restree) {
	var strurl = ""; //接收所有字符串
	var Fistarray = []; //获取第一层数组
	var Searray = []; //第一层排序后的数组
	var Thrarray = []; //第二层数组排的
	var Fouarray = []; //第二层排序后的数组
	var Endarray = []; //完成的数组
	if (restree.errorcode === 0) {

		for (var i = 0; i < restree.data.subMenu.length; i++) {
			if (restree.data.subMenu[i].icon != null) {
				Fistarray.push(restree.data.subMenu[i]);
			}
		}
		Searray = Fistarray.sort(sortNumber); //排序
		//console.log(Searray);
		for (var j = 0; j < Searray.length; j++) {
			if (Searray[j].subMenu.length > 0) {
				for (var o = 0; o < Searray[j].subMenu.length; o++) {
					Thrarray.push(Searray[j].subMenu[o])
				}
				Fouarray = Thrarray.sort(sortNumber); //排序
				Thrarray = [];
				Searray[j].subMenu = Fouarray;
				Endarray.push(Searray[j]);
				Fouarray = [];
			} else {
				Endarray.push(Searray[j]);
			}
		}
		//	console.log(Endarray);
	}
//	<div class="sidebar-collapse" id="sidebar-collapse">
//						<i class="collapse-icon fa fa-bars"></i>
//					</div>
	strurl += '<li id="0a" style="text-align:center;"><a href="javacript:void(0);"  id="0a" icon="" title="" ><div class="sidebar-collapse" id="sidebar-collapse"><i class="menu-icon fa fa-bars"></i></div></a></li>';
	for (var l = 0; l < Endarray.length; l++) {
		strurl += listr(Endarray[l]);
	}
	return strurl;
}

function collectMenu() {
	$("#sidebar-collapse").onclick();
}

//获取子菜单字符串
function listr(o) {
	var listrs = '';
	var ulstr = '';
	//console.log(o.subMenu.length);
	if (o.subMenu.length > 0) {
		listrs += '<li id="' + o.id + '"><a href="#" class="menu-dropdown" icon="' + o.icon + '" title="' + o.name + '"><i class="menu-icon ' + o.icon + '"></i><span class="menu-text"> ' + o.name + '</span><i class="menu-expand"></i></a>';
		listrs += '<ul class="submenu">';
		for (var i = 0; i < o.subMenu.length; i++) {
			ulstr += '<li id="' + o.subMenu[i].id + '"><a href="#" id="a_' + o.subMenu[i].id + '" icon="undefined" title="' + o.subMenu[i].name + '" addtabs="a_' + o.subMenu[i].id + '" url="' + o.subMenu[i].url + '"><span class="menu-text"> ' + o.subMenu[i].name + '</span></a></li>';
		}
		listrs += ulstr;
		ulstr = '';
		listrs += '</ul>';
		listrs += '</li>';
	} else {
		listrs += '<li id="' + o.id + '"><a href="#" id="a_' + o.id + '" icon="' + o.icon + '" title="' + o.name + '" addtabs="a_' + o.id + '" url="' + o.url + '"><i class="menu-icon ' + o.icon + '"></i><span class="menu-text">' + o.name + '</span></a></li>';
	}
	//alert(listrs);
	return listrs;
}*/
