/*------------------初始化函数------------------*/
var InitCueerncy = function() {
	GetPupData(); //获取渠道表头数据
	GetPupOptionData(); //获取招生渠道
	GetBrcrecruitData(); //获取招生点
	GetCoachData(); //获取教练员
	GetTrainareData(); //获取教练场
	GetCarData(); //获取教练车
	GetSubSchoolData(); //获取分校
	GetGroupData(); //获取模板分组
	GetPickupPointData(); //获取接送点
	Getclasshourtem(); //获取学时模板
	GetClassTypeData(); //获取学时模板
};



/*------------------获取数据方法------------------*/
//获取渠道表头数据
function GetPupData() {
	$.ajax({
		url: IP + "/rmwebapp/sch/brsch-" + _cookie.brschid + "/recruitChannel",
		type: "get",
		async: true,
		success: function(data) {
			if (data.errorcode == 0) {
				for (var i = 0; i < data.data.length; i++) {
					window.top.PupData.push({
						"th": data.data[i]["name"],
						"jsonKey": {
							"keys": "recList",
							"subkey": {
								"keys": i,
								"subkey": {
									"keys": "stuNum",
									"subkey": "",
									"data": []
								},
								"data": []
							},
							"data": []
						}
					});
				}
			} else if (data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			console.log(errObj);
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}

//获取学时模板
function Getclasshourtem() {
	//获取学时模板列表
	$.ajax({
		url: IP + "/rmwebapp/sch/brsch-" + _cookie.brschid + "/classhourtem",
		type: "get",
		async: true,
		success: function(data) {
			//debugger
			if (data.errorcode == 0) {
				window.top.classhourtem = data.data;
			} else if (data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else if (data.errorcode == undefined) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 20000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
			}
		}
	});
}

//班型
function GetClassTypeData() {
	OptionAjax("/rmwebapp/sch/brsch-" +_cookie.brschid + "/branchCharge/chargeAll", window.top.ClassTypeData, "id", "course");
}

//获取模板分组
function GetGroupData() {
	OptionAjax("/rmwebapp/group/querygroup?brid=" +_cookie.brschid + "&page=1&size=9999", window.top.GroupData, "id", "name");
}

//获取接送点
function GetPickupPointData() {
	OptionAjax("/rmwebapp/sch/brsch-" + _cookie.brschid+ "/pickupPoint", window.top.PickupPointData, "id", "name");
}

//获取招生渠道
function GetPupOptionData() {
	OptionAjax("/rmwebapp/sch/brsch-" + _cookie.brschid+ "/recruitChannel", window.top.PupDataOption, "id", "name");
}

//获取分校
function GetSubSchoolData() {
	if (_cookie.type== "Main") {
		OptionAjax("/rmwebapp/sch-" +_cookie.schoolid + "/brsch-names", window.top.SubSchoolData, "id", "name");
	} else {
		window.top.SubSchoolData.length = 0;
		window.top.SubSchoolData.push('<option value="' +_cookie.brschid + '">' + _cookie.brschname + '</option>');
		window.top.RegionJurData.length = 0;
		OptionAjaxs("/rmwebapp/sch-" + _cookie.schoolid+ "/brsch-names", window.top.RegionJurData, "id", "railprv");
	}
}

//获取招生点
function GetBrcrecruitData() {
	OptionAjax("/rmwebapp/sch/brsch-" +_cookie.brschid + "/branchRecruit/name", window.top.BrcrecruitData, "id", "name");
}

//获取教练员
function GetCoachData() {
	OptionAjax("/rmwebapp/sch/brsch-" + _cookie.brschid + "/coach-names", window.top.CoachData, "id", "name");
	OptionAjax_n("/rmwebapp/sch/brsch-" + _cookie.brschid + "/coach-names", window.top.CoachData_IN, "id", "name");
}

//获取教练车
function GetCarData() {
	OptionAjax("/rmwebapp/sch/brsch-" + _cookie.brschid + "/car/licnum", window.top.CarData, "id", "licnum");
}

//获取教练场
function GetTrainareData() {
	OptionAjax_post("/rmwebapp/appoint/schedule/trainareas", window.top.TrainareData, "id", "name");
}

//获取下拉列表
function OptionAjax_Group(AjaxUrl, optionData) {
	var dataObj; //接收ajax回调的data
	optionData.length = 0; //清空数组
	$.ajax({
		url: IP + "/rmwebapp/group/querygroup?brid=" +_cookie.brschid + "&page=1&size=999999",
		type: "get",
		async: true,
		success: function(data) {
			if (data.data.list) {
				dataObj = data.data.list;
			} else {
				dataObj = data.data;
			}
			if (data.errorcode == 0) {
				for (var i = 0; i < dataObj.length; i++) {
					optionData.push("<option value='" + dataObj[i]["id"] + "'> " + dataObj[i]["name"] + " </option>");
				}
			} else if (data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
			}
		}
	});
}

//获取下拉列表通用ajax 
function OptionAjax(AjaxUrl, optionData, id, name) {
	var dataObj; //接收ajax回调的data
	optionData.length = 0; //清空数组
	$.ajax({
		url: IP + AjaxUrl,
		type: "get",
		async: true,
		success: function(data) {
			if (data.data.list) {
				dataObj = data.data.list;
			} else {
				dataObj = data.data;
			}
			if (data.errorcode == 0) {
				for (var i = 0; i < dataObj.length; i++) {
					optionData.push("<option value='" + dataObj[i][id] + "'> " + dataObj[i][name] + " </option>");
				}
				optionData.push(dataObj);
			} else if (data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}

//获取下拉列表通用ajax 
function OptionAjaxs(AjaxUrl, optionData, id, name) {
	var dataObj; //接收ajax回调的data
	optionData.length = 0; //清空数组
	$.ajax({
		url: IP + AjaxUrl,
		type: "get",
		async: true,
		success: function(data) {
			if (data.data.list) {
				dataObj = data.data.list;
			} else {
				dataObj = data.data;
			}
			if (data.errorcode == 0) {
				for (var i = 0; i < dataObj.length; i++) {
					optionData.push([dataObj[i][id], dataObj[i][name]]);
				}
				optionData.push(dataObj);
			} else if (data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}

function OptionAjax_n(AjaxUrl, optionData, id, name) {
	var dataObj; //接收ajax回调的data
	optionData.length = 0; //清空数组
	$.ajax({
		url: IP + AjaxUrl,
		type: "get",
		async: true,
		success: function(data) {
			if (data.data.list) {
				dataObj = data.data.list;
			} else {
				dataObj = data.data;
			}
			if (data.errorcode == 0) {
				for (var i = 0; i < dataObj.length; i++) {
					optionData.push({
						"id": dataObj[i][id],
						"name": dataObj[i][name]
					})
				}
			} else if (data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}

//获取下拉列表通用ajax 
function OptionAjax_post(AjaxUrl, optionData, id, name) {
	var dataObj; //接收ajax回调的data
	optionData.length = 0; //清空数组
	$.ajax({
		url: IP + AjaxUrl,
		type: "post",
		async: true,
		success: function(data) {
			if (data.data.list) {
				dataObj = data.data.list;
			} else {
				dataObj = data.data;
			}
			if (data.errorcode == 0) {
				for (var i = 0; i < dataObj.length; i++) {
					optionData.push("<option value='" + dataObj[i][id] + "'> " + dataObj[i][name] + " </option>");
				}
			} else if (data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}

//写入option
function SetOption(id, OptionData) {
	$("#" + id).find("option").remove(); //移除option
	$("#" + id).append("<option value=\"0\">请选择</option>"); //添加option
	for (var i = 0; i < OptionData.length; i++) {
		$("#" + id).append(OptionData[i]);
	}
	$("#" + id).select2(); //渲染
}

//写入option
function SetOption_NO(id, OptionData) {
	$("#" + id).find("option").remove(); //移除option
	for (var i = 0; i < OptionData.length; i++) {
		$("#" + id).append(OptionData[i]);
	}
	$("#" + id).select2(); //渲染
}



