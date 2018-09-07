function Tree(name, id) {
	bootbox.dialog({
		message: '<div style="height:350px;overflow: auto;overflow-x: hidden;">' +
			'<form id="registrationForm" method="post" class="form-horizontal">' +
			'<div id="MyTree" class="tree">' +
			'</div>' +
			'</form>' +
			'</div>',
		title: "\"" + name + "\"--树授权",
		className: "modal-darkorange",
		buttons: {
			"全选": {
				className: "btn-primary",
				callback: function() {
					$("#MyTree").find("input[type=checkbox]").prop("checked", true);
					return false;
				}
			},
			success: {
				label: "提交",
				className: "btn-primary",
				callback: function() {
					var checkboxs = $("#MyTree").find("input[type=checkbox]");
					var data = [];
					data.push({
						"menu": {
							"id": "1"
						},
						"visitType": "True"
					});
					for(var i = 0; i < checkboxs.length; i++) {
						if(checkboxs[i]["checked"] == true) {
							data.push({
								"menu": {
									"id": checkboxs[i]["value"]
								},
								"visitType": "True"
							});
						}
					}
					
					ajax_Update(IP + "/rmwebapp/sch/privs-" + id, data);
				}
			},
			"取消": {
				className: "btn-warning",
				callback: function() {

				}
			}
		}
	});
	//获取菜单
	var ajaxurl = IP + "/rmwebapp/sch/menu";
	$.ajax({
		url: ajaxurl,
		type: "get",
		async: false,
		contentType: "application/json",
		success: function(restree) {

			$("#MyTree").html(fortree(restree));
		},
		cache: false,
		timeout: 5000,
		error: function(errObj, resu) {
			console.log(errObj);
		}
	});
	//获取权限
	var ajaxurl = IP + "/rmwebapp/sch/privs-" + id;
	$.ajax({
		url: ajaxurl,
		type: "get",
		async: true,
		contentType: "application/json",
		success: function(privs) {
			var privsbox = new Array(70);
			if(privs.errorcode === 0) {
				for(var i = 0; i < privs.data.length; i++) {
					privsbox[privs.data[i].menu.id] = privs.data[i].visitType;
				}
				for(var k = 1; k < privsbox.length; k++) {
					if(privsbox[k] === "True") {
						$("#i" + k).prop("checked", true);
					}
				}
			}
		},
		cache: false,
		timeout: 5000,
		error: function(errObj, resu) {
			console.log(errObj);
		}
	});

}

function sortNumber(a, b) {
	return a.seq - b.seq
}

function fortree(restree) {
	var strurl = ""; //接收所有字符串
	var Fistarray = []; //获取第一层数组
	var Searray = []; //第一层排序后的数组
	var Thrarray = []; //第二层数组排的
	var Fouarray = []; //第二层排序后的数组
	var Endarray = []; //完成的数组
	if(restree.errorcode === 0) {

		for(var i = 0; i < restree.data.subMenu.length; i++) {

			Fistarray.push(restree.data.subMenu[i]);
		}
		Searray = Fistarray.sort(sortNumber); //排序
		//console.log(Searray);
		for(var j = 0; j < Searray.length; j++) {
			if(Searray[j].subMenu.length > 0) {
				for(var o = 0; o < Searray[j].subMenu.length; o++) {
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
	for(var l = 0; l < Endarray.length; l++) {
		strurl += fortreestr(Endarray[l]);
	}
	//alert(strurl);
	//console.log(strurl);
	return strurl;
}

function ChooseChildren(is) {
	var checks = $(is).is(':checked');
	var num = $(is).data("chidern");
	var id = $(is).data("id");
	if(checks) {
		for(var i = 0; i < num; i++) {
			$("input[name='" + id + "_" + i + "']").prop("checked", true);
		}
	} else {
		for(var i = 0; i < num; i++) {
			$("input[name='" + id + "_" + i + "']").prop("checked", false);
		}
	}
}

function ChooseParent(is) {
	var id = $(is).data("parent");
	var num = $("#i" + id).data("chidern");
	for(var i = 0; i < num; i++) {
		if(!$("input[name='" + id + "_" + i + "']").is(':checked')) {
			return false;
		}
	}
	$("#i" + id).prop("checked", true);
}

function fortreestr(o) {
	var treestr = '';
	var subtreestr = '';
	if(o.subMenu.length > 0) {
		treestr += '<div id="' + o.id + '" class="tree-folder" style="display: block;">';
		treestr += '<div class="tree-folder-header row">';
		treestr += '<div style="float:left;" class="tree-folder-click" onclick="displayCom(2,0)"><i class="' + o.icon + '"></i>';
		treestr += '<div class="tree-folder-name">' + o.name + '</div>';
		treestr += '</div>';
		treestr += '<div style="float:right;">';
		treestr += '<input id="i' + o.id + '" value="' + o.id + '" name="' + o.id + '" data-id="' + o.id + '"  data-chidern="' + o.subMenu.length + '" onclick="ChooseChildren(this)" type="checkbox" />';
		treestr += '</div>';
		treestr += '</div>';
		treestr += '<div id="" style="display: block;" class="tree-folder-content">';
		for(var i = 0; i < o.subMenu.length; i++) {
			subtreestr += '<div id="" class="tree-folder" style="display: block;">';
			subtreestr += '<div class="tree-folder-header row">'
			subtreestr += '<div style="float:left;" class="tree-folder-click" onclick="displayCom()">';
			subtreestr += '<div class="tree-folder-name">' + o.subMenu[i].name + '</div>';
			subtreestr += '</div>';
			subtreestr += '<div style="float:right;">';
			subtreestr += '<input id="i' + o.subMenu[i].id + '" value="' + o.subMenu[i].id + '" name="' + o.id + '_' + i + '" data-parent="' + o.id + '" onclick="ChooseParent(this)" type="checkbox" >';
			subtreestr += '</div>';
			subtreestr += '</div>';
			subtreestr += '</div>';
		}
		subtreestr += '</div>';
		treestr += subtreestr;
		subtreestr = '';
		treestr += '</div>';
	} else {
		treestr += '<div id="' + o.id + '" class="tree-folder" style="display: block;">';
		treestr += '<div class="tree-folder-header row">';
		treestr += '<div style="float:left;" class="tree-folder-click" onclick="displayCom(2,0)"><i class="' + o.icon + '"></i>';
		treestr += '<div class="tree-folder-name">' + o.name + '</div>';
		treestr += '</div>';
		treestr += '<div style="float:right;">';
		treestr += '<input id="i' + o.id + '" value="' + o.id + '" name="' + o.id + '" onclick="" type="checkbox" />';
		treestr += '</div>';
		treestr += '</div>';
		treestr += '</div>';
	}
	return treestr;
}

function getData() {
	var data = [];
	var display = $('#id').css('display');
	return data;
}

function setprie(ajaxurl, data) {

	$.ajax({
		url: ajaxurl,
		type: "post",
		async: true,
		contentType: "application/json",
		data: JSON.stringify(
			data
		),
		success: function(Data) {
			if(Data.errorcode === 0) {
				modal_pop("设置成功！", "success");
				Chooseurl("1", $(".page-size:first").text());
			} else {
				modal_pop("设置失败！", "fail");
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			modal_pop("网络出错！", "fail");
		}
	});
}