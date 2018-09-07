var Utils = {};

Utils.formGetData = function(custom) {
	var data = {},
		id = custom.id,
		container = custom.container;
	custom.container == undefined ? container = 'select[name],input[name]' : "";
	var $list = $("#" + id).find(container);
	$list.each(function(index, el) {
		var vType = $(this).data("vtype");
		switch (vType) {
			case "number":
				data[this.name] = parseInt($(this).val());
				break;
			case "bool":
				data[this.name] = ($(this).val() == "false" ? false : true);
				break;
			default:
				data[this.name] = $(this).val();
				break;
		}
	});
	return data;
}

Utils.writeHint = function(custom) {
	var $div = $("#" + custom.id);
	var style = custom.style;
	style == undefined ? style = 'style="color: #090;"' : style = 'style="' + style + '"';
	if ($div.is(":hidden")) {
		$div.show();
	}
	$div.animate({
		scrollTop: 0
	}, 200);
	$div.prepend('<span id="message" ' + style + ' >' + custom.content + "   当前时间：" + Utils.getYMDHSM() + '</span><br/>');
}

Utils.setHint = function(custom) {
	var html = '';
	var style = custom.style;
	style == undefined ? style = 'style="border:1px solid #C7DDB9;padding-top:5px;padding-bottom:5px;margin-bottom:5px;margin-left:5px;margin-right:10px;background-color: #F2FFEA;width:99%;display:none;height:120px;text-align:center;overflow-y: auto;"' : style = 'style="' + style + '"';
	html += '<div id="' + custom.id + '" ' + style + '>';
	html += '</div>';
	return html;
}

Utils.sendAjax = function(custom) {
	var ajaxData = {
		url: custom.url,
		global: custom.global == undefined ? true : custom.global,
		type: custom.type == undefined ? "get" : custom.type,
		async: custom.async == undefined ? true : custom.async,
		contentType: custom.dataType == undefined ? "application/json" : custom.dataType,
		data: custom.data == undefined ? custom.data : JSON.stringify(custom.data),
		success: function(data) {
			switch (custom.callbacktype) {
				case "call":
					custom.callback(data);
					break;
				default:
					if (Utils.errorCode(data)) {
						custom.callback != undefined ? custom.callback(data.data) : "";
						custom.success != undefined ? modal_pop(custom.success + "!", "fail") : modal_pop("发送成功!", "fail"); //对话框
					} else {
						custom.ecallback != undefined ? custom.ecallback(data) : "";
						custom.error != undefined ? modal_pop(custom.error + "!", "fail") : modal_pop("发送失败!", "fail"); //对话框
					}
					break;
			}
		},
		cache: custom.cache == undefined ? false : custom.cache,
		timeout: custom.timeout == undefined ? 100000 : custom.timeout,
		error: function(errObj, resu) {
			HideDiv("TableLoading");
			custom.ecallback != undefined ? custom.ecallback(errObj, resu) : "";
			custom.error != undefined ? modal_pop(custom.error + "!", "fail") : modal_pop("发送失败!", "fail"); //对话框
		}
	};
	ajaxData.data == undefined ? delete ajaxData.data : "";
	$.ajax(ajaxData);
}

Utils.errorCode = function(Data) {
	switch (Data.errorcode) {
		case 0:
			return true;
		case 200:
			modal_confirm_log("登录过期,请重新登陆！", relogin);
			return false;
		default:
			//modal_pop("请求失败！", "fail"); //对话框
			return false;
			break;
	}
}

Utils.initInput = function(custom) {
	var obj = {
		Vessel: "#registrationForm",
		Element: "select[name],input[name]"
	};
	custom != undefined ? $.extend(true, obj, {}, custom) : "";
	var $fgls = $(obj.Vessel); //组对象
	var $iptls = $fgls.find(obj.Element); //获取select 和 input 对象
	$.each($iptls, function(index) {
		var initType = $(this).data("init");
		switch (initType) {
			case "dayinputhms":
				//$("#" + this.id).datepicker();
				$("#" + this.id).on("click", function(e) {
					laydate({
						elem: "#" + this.id,
						format: "YYYY-MM-DD hh:mm:ss",
						istime: true,
						istoday: true
					});
				})
				break;
			case "select":
			case "select_no":
				$("#" + this.id).select2();
				break;
			case "selects":
				$("#" + this.id).select2({
					placeholder: "请点击添加",
					allowClear: true
				});
				break;
		}
	});
}

Utils.setButton = function(obj) {
	var label = obj.label,
		style = obj.style,
		onclick = obj.onclick,
		style = obj.style,
		isStop = obj.isStop;
	style == undefined ? style = 'style="float:right"' : style = 'style="' + style + '"';
	isStop == undefined ? isStop = '<div style="clear:both;height:1px"></div>' : isStop = "";
	return '<button type="submit" class="btn btn-primary ng-binding" onclick="' + onclick + '" ' + style + '  >' + label + '</button>' + isStop;
}

Utils.setMessage = function(body) {
	var html = '';
	html += '<form id="registrationForm" method="post" class="form-horizontal bv-form" novalidate="novalidate" onsubmit="return false">';
	html += body;
	html += '</form>';
	return html;
}

Utils.getRowHtml = function(title) {
	return '<div class="form-title"><h5 class="row-title">' + title + '</h5></div>';
}

Utils.getInputByType = function(obj) {
	var id = obj.id,
		type = obj.type,
		name = obj.name,
		rules = obj.rules,
		selectData = obj.selectData,
		style = obj.style,
		title = obj.title,
		classs = obj.classs,
		isStop = obj.isStop,
		step = obj.step,
		min = obj.min,
		max = obj.max,
		vType = obj.vType;
	isStop == undefined ? isStop = '<div style="clear:both;height:1px"></div>' : isStop = "";
	rules == undefined ? rules = "" : rules = 'data-rules="' + rules + '"';
	style == undefined ? style = 'style="width:100%"' : style = 'style="' + style + '"';
	switch (type) {
		case "timeinput":
			return '<input id="' + id + '" type="' + type + '" style="width:100%" class="form-control input-sm" data-vtype="' + vType + '" data-init="timeinput"  name="' + name + '" ' + rules + ' />';
		case "price":
			return '<div class="input-group"><span class="input-group-addon">￥</span><input  id="' + id + '"  type="number" data-vtype="' + vType + '" data-init="price" name="' + name + '" ' + rules + ' class="form-control input-sm text-center fon" min="0" max="999999"></div>'
		case "number":
			return '<input id="' + id + '" type="' + type + '" ' + style + '  class="form-control input-sm" min="0" data-vtype="' + vType + '"  data-init="number" name="' + name + '" ' + rules + '/>' + (obj.isStop || '');
		case "input":
			return '<input id="' + id + '" type="' + type + '" ' + style + ' class="form-control input-sm" data-vtype="' + vType + '" name="' + name + '" ' + rules + '/>' + (obj.isStop || '');
		case "inputr":
			return '<input id="' + id + '" type="' + type + '" readonly="readonly" data-vtype="' + vType + '"  class="form-control input-sm" name="' + name + '" ' + rules + '/>';
		case "select":
			var controlStr = '<select id="' + id + '" ' + style + ' data-init="select" data-vtype="' + vType + '" name="' + name + '" ' + rules + '><option value="0">请选择</option>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>' + (obj.isStop || '');
			return controlStr;
		case "select_no":
			var controlStr = '<select id="' + id + '" ' + style + ' data-init="select_no" data-vtype="' + vType + '" name="' + name + '" ' + rules + '>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>' + (obj.isStop || '');
			return controlStr;
		case "selectr":
			var controlStr = '<select id="' + id + '" readonly="readonly" data-init="select_no" data-vtype="' + vType + '" style="width:100%" name="' + name + '" ' + rules + '><option value="0">请选择</option>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			return controlStr;
		case "selects":
			var controlStr = '<select id="' + id + '" multiple="multiple" data-init="selects" data-vtype="' + vType + '"  ' + style + ' name="' + name + '" ' + rules + '>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			return controlStr;
		case "dayinput":
			return '<div class="input-group"><div class="special-input"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" data-init="dayinput" data-vtype="' + vType + '" name="' + name + '" type="text" data-date-format="yyyy-mm-dd" ' + rules + '></div></div>';
		case "dayinputhms":
			return '<div class="input-group" ' + (obj.style == undefined ? '' : 'style="' + obj.style + '"') + '><div class="special-input"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" data-vtype="' + vType + '" data-init="dayinputhms" name="' + name + '" type="text" data-date-format="YYYY-MM-DD hh:mm:ss" ' + rules + '></div></div>' + isStop;
		case "dayinputr":
			return '<div class="input-group"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" readonly="readonly"  data-vtype="' + vType + '" data-init="dayinput" name="' + name + '" type="text" data-date-format="yyyy-mm-dd" ' + rules + '></div>';
		case "Timeinput":
			return '<div class="input-group"><input class="form-control" id="' + id + '" data-vtype="' + vType + '" data-init="Timeinput" name="' + name + '" type="text" ' + rules + '><span class="input-group-addon" ><i class="fa fa-clock-o"></i></span></div>';
		case "Timeinputr":
			return '<div class="input-group"><input class="form-control" id="' + id + '" data-vtype="' + vType + '" data-init="Timeinput" name="' + name + '"  readonly="readonly" type="text" ' + rules + '><span class="input-group-addon" ><i class="fa fa-clock-o"></i></span></div>';
		case "label":
			return '<label ' + (obj.classs == undefined ? '' : 'class="' + obj.classs + '"') + '  ' + (obj.style == undefined ? '' : 'style="' + obj.style + '"') + ' >' + title + '</label>';
		case "AddTable":
			var tbId = obj.tbId;
			var add = '<a class="btn btn-success" href="javascript:void(0);" id="' + obj.buttonsId + '" onclick="Utils.AddTableTr(\'' + tbId + '\',this)"  style="margin-bottom:2px"><i class="fa fa-plus"></i>' + obj.buttonLebel + '</a>';
			obj.style == undefined ? style = 'style="width:100%;padding-left:5px;padding-right:5px;margin-left:auto;margin-right:auto"' : style = 'style="' + style + '"';
			var th = obj.th,
				thStr = '';
			var html = '<div ' + style + '>' + add + '<table class="table table-bordered" id="' + tbId + '" style="margin-bottom: 5px;">';
			for (var i = 0; i < th.length; i++) {
				thStr += '<th width="' + th[i].width + '">' + th[i].title + '</th>';
			}
			thStr += '<th width="8%">操作</th>';
			html += '<thead><tr>' + thStr + '</thead>';
			html += '<tbody></tbody></table><input type="hidden" id="i_' + tbId + '" name="' + tbId + '" data-rules="' + rules + '" data-type="specSer" /></div>';
			return html;
		default:
			console.info("The type-->" + type + "is not define");
			break;
	}
}

Utils.hideTableTr = function(t) {
	$(t).closest('tr').addClass('hidden');
}

Utils.AddTableTr = function(tableId, t) {
	var td = $(t).data('datas');
	var str = '<tr class="feature-type">';
	for (var i = 0; i < td.length; i++) {
		str += '<td>';
		switch (td[i].type) {
			case "select":
				str += '<select style="width:100%" data-init="select_no" name="' + td[i].name + '" >';
				if (td[i].selectData.length > 0) {
					for (var j = 0; j < td[i].selectData.length; j++) {
						str += '<option value="' + td[i].selectData[j].value + '">' + td[i].selectData[j].Text + '</option>';
					}
				}
				str += '</select>';
				break;
			case "input":
				str += '<input style="width:100%" class="form-control input-sm" name="' + td[i].name + '" />';
				break;
		}
		str += '</td>';
	}
	str += '<td><a onclick="Utils.hideTableTr(this);" style="margin-right:4px" title="删除" class="delete"  href="javascript:void(0)"><i class="menu-icon fa fa-trash-o"></i></a></td>';
	str += '</tr>';
	var $tr = $(str);
	$tr.find('select').select2();
	$("#" + tableId).find("tbody").append($tr);
}

Utils.showModel = function(obj) {
	//数据对象
	var dialog = {
		message: obj.message == undefined ? "" : obj.message, //弹出框内容
		title: obj.title == undefined ? "" : obj.title, //弹出框标题
		className: obj.className == undefined ? "" : obj.className, //弹出框样式
		buttons: {}
	};
	//按钮添加
	var addbuttons = function(buttons) {
		//根据按钮来添加
		for (var i = 0; i < buttons.length; i++) {
			dialog.buttons[buttons[i].keys] = {
				label: buttons[i].label,
				className: buttons[i].className,
				callback: buttons[i].callback
			}
		}
	}
	addbuttons(obj.buttons);
	//弹出框显示
	bootbox.dialog(dialog);
}

Utils.getYMDHSM = function() {
	var d = new Date();
	return d.Format("yyyy-MM-dd hh:mm:ss");
}

Utils.dateCompare = function(custom) {
	var date1, date2, Arrays;
	if (typeof(custom.date1) == "object") {
		date1 = custom.date1;
	} else {
		Arrays = custom.date1.replace(/-|:| /g, ",").split(",");
		Arrays[1] = Arrays[1] - 1;
		date1 = Utils.dateArrChangDO.getTimeStamp(Arrays);
	}
	if (typeof(custom.date2) == "object") {
		date2 = custom.date2;
	} else {
		Arrays = custom.date2.replace(/-|:| /g, ",").split(",");
		Arrays[1] = Arrays[1] - 1;
		date2 = Utils.dateArrChangDO.getTimeStamp(Arrays);
	}
	switch (custom.type) {
		case "-":
			return Date.parse(date2) - Date.parse(date1);
		case "+":
			return Date.parse(date2) + Date.parse(date1);
		case "*":
			return Date.parse(date2) * Date.parse(date1);
		case "/":
			return Date.parse(date2) / Date.parse(date1);
	}
}

Utils.dateArrChangDO = {
	ArrChangeDate: function(y, m, d, h, _m, s) {
		return new Date(y, m, d, h, _m, s)
	},
	getTimeStamp: function() {
		return this.ArrChangeDate.apply(null, (Array.prototype.slice.apply(arguments))[0]);
	}
}

Utils.isIeCore = function() {
	if (!("ActiveXObject" in window)) {
		modal_pop("只能在ie内核的浏览器上使用此功能", "fail");
		return false;
	} else {
		return true;
	}
}

Utils.signHtml = function() {
	return '<object id="ocx" classid="CLSID:4E194A99-7F41-453E-914C-544BB186A59C" codebase="signocx.cab#version=1.0.0.3" width="100" height="50" style="display:none;">';
}

Utils.sign = function(Data) {
	try {
		var obj = window.document.getElementById("ocx"),
			signInfo = obj.sign(JSON.stringify(Data)),
			signInfoList = signInfo.toArray(),
			signature, signerCert;
		signature = signInfoList[0];
		signerCert = signInfoList[1];
		return signature;
	} catch (e) {
		modal_pop("请插入usbKey后在ie上使用此功能", "fail");
		console.log(e);
		return false;
	}
}

Utils.getSignPhoto = function() {
	var obj = window.document.getElementById("ocx"),
		seal, sealInfo = obj.ReadSeal(),
		sealInfoList = sealInfo.toArray();
	if (sealInfoList[0]) {
		seal = sealInfoList[0];
		var bytes = Hex2Bytes(sealInfoList[1]),
			base64 = bytesToEncodedString(bytes);
		return base64;
	} else {
		modal_pop("请插入usbKey！", "success");
		return false;
	}
}

Utils.icCardHtml = function() {
	return '<object id="CVR_IDCard" classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7"   name="CVR_IDCard"  width="0" height="0" style="display:none;"></object>';
}

Utils.readIDCard = function(custom) {

}

Utils.rPhase = function(phase) {
	var arr = ["第一部分", "第二部分", "第三部分", "第四部分"],
		length = phase.length,
		locations = phase.substring(length - 1, length);
	return arr[parseInt(locations) - 1];
}

Utils.m2H = function(str) {
	var H = parseInt(Number(str) / 60),
		M = Number(str) % 60,
		timestr = '';
	return timestr = H + "小时" + M + "分钟";
}

Utils.h2M = function(time) {
	if (typeof time == 'string') {
		time = parseFloat(time);
	}
	var timestr = '0小时0分钟',
		H, M, _time;
	if (time !== 0) {
		H = parseInt(time, 10);
		M = (time - H) * 60;
		timestr = H + '小时' + parseInt(M, 10) + '分钟';
	}
	return timestr;
}

Utils.modalBody = function(body) {
	return '<div class="container-fluid">' +
		'<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" class="form-horizontal">' +
		body +
		'</form>' + /*form 结束*/
		'</div>' +
		'</div>'; /*<div class="container-fluid">结束*/
}

Utils.getTitleStr = function(title) {
	return '<div class="form-title">' +
		'<h5 class="row-title">' +
		title +
		'</h5>' +
		'</div>';
}

Utils.appendTr_end = function(custom) {
	$(custom.id).after(custom.html);
}

Utils.getSchoolSignObj = function() {
	var schoolid = _cookie.schoolid,
		orgstamp = '',
		obj = {},
		orgsignname = [],
		coachename = [];
	switch (schoolid) {
		case "75":
			orgstamp = '../assets/img/schoolsign/sdxtjx.png';
			orgsignname = ["黄婉锋", "谢淑贞", "谢淑贞"];
			break;
		case "183":
			orgstamp = '../assets/img/schoolsign/sdxtjx.png';
			orgsignname = ["黄婉锋", "谢淑贞", "谢淑贞"];
			break;
		case "178":
			orgstamp = '../assets/img/schoolsign/sdyfjx.png';
			orgsignname = ["何凤女", "何柱金", "何柱金"];
			break;
		case "12":
			orgstamp = '../assets/img/schoolsign/sdxxl.png';
			orgsignname = ["刘惠娴", "赵文意", "肖楚慧"];
			coachename = ["孔宪权", "罗裕成"];
			break;
		case "182":
			orgstamp = '../assets/img/schoolsign/sdqxyjx.png';
			orgsignname = ["林新蕊", "凌梓健", "辛楚芬"];
			coachename = ["黄永生", "黄永生"];
			break;
		case "185":
			if (obj.traintype == "A1") {
				orgstamp = '../assets/img/schoolsign/sddljx.png';
			} else {
				orgstamp = '../assets/img/schoolsign/sdjgjx.png';
			}
			orgsignname = ["李春华", "冯萍", "冯萍"];
			coachename = ["范耀辉", "李达明"];
			break;
		case "176":
			orgstamp = '../assets/img/schoolsign/mht.png';
			orgsignname = ["毛焕庭", "毛焕庭", "毛焕庭"];
			break;
		case "175":
			orgstamp = '../assets/img/schoolsign/sdxyjx.png';
			orgsignname = ["王智兰", "王智兰", "王智兰"];
			coachename = ["王勇", "王勇"];
			break;
		case "172":
			orgstamp = '../assets/img/schoolsign/sdbjjx.png';
			orgsignname = ["刘春丽", "刘春丽", "刘春丽"];
			break;
		case "171":
			orgstamp = '../assets/img/schoolsign/sdbcjx.png';
			orgsignname = ["刘春丽", "赵良坤", "赵良坤"];
			break;
		case "179":
			orgstamp = '../assets/img/schoolsign/sdjcfjx.png';
			orgsignname = ["胡玉珊", "胡玉珊", "陈楚莹"];
			break;
		case "189":
			orgstamp = '../assets/img/schoolsign/sdjxjx.png';
			break;
		case "173":
			orgstamp = '../assets/img/schoolsign/sddljx.png';
			orgsignname = ["潘耀华", "潘耀华", "潘耀华"];
			break;
		case "188":
			orgstamp = '../assets/img/schoolsign/sdrgjx.png';
			orgsignname = ["刘耀华", "高文杰", "何锦盛"];
			break;
		case "184":
			orgstamp = '../assets/img/schoolsign/sdcfjx.png';
			coachename = ["何冠民", "何冠民"];
			break;
		case "181":
			orgstamp = '../assets/img/schoolsign/sdrjjx.png';
			orgsignname = ["罗丽芬", "罗丽芬", "罗丽芬"];
			coachename = ["陈礼元", "罗志标"];
			break;
		case "180":
			orgstamp = '../assets/img/schoolsign/sdjfjx.png';
			break;
		case "177":
			orgstamp = '../assets/img/schoolsign/sdyzjx.png';
			orgsignname = ["廖婉玲", "潘叶帮", "潘叶帮"];
			break;
		case "174":
			orgstamp = '../assets/img/schoolsign/sdgjjx.png';
			orgsignname = ["陈丽均", "黄瑞燕", "陈志玲"];
			break;
	}
	obj.orgstamp = orgstamp;
	for (var i = 0; i < 4; i++) {
		obj["orgsignname" + (i + 1)] = orgsignname[i] || "";
		obj["coachename" + (i + 1)] = coachename[i - 1] || "";
	}
	obj.coachename1 = "网上教学";
	return obj;
}

Utils.buttonRecord = function(did, modalID) {
	var code = $("span[name='_code']").data('code'),
		record = $("span[name='_record']").data('record');
	record == "SUCCESS" ? record = "FAILED" : "";
	Uploads(code, record, did, modalID);
}

Utils.hourRecord = function(event, t, did, srvname) {
	var Data = {
			"did": did,
			"srvname": srvname,
			"phase": 1
		},
		successMes = "备案成功",
		errorMes = "备案失败";
	ajax_post_byUpload(IP + "/rmwebapp/uploadrec", successMes, errorMes, Data, function(t) {
		var tr = $(t).closest('table').closest('tr').prev();
		tr.find('.row-details').trigger("click");
		tr.find('.row-details').trigger("click");
	}, function(t) {

	}, t);
	event.stopPropagation();
}

Utils.showHandAcc = function(event, t, trid) {
	Utils.showModel({
		message: '<textarea id="acc" style="width:100%;height:50px"></textarea>',
		title: "手动审核",
		className: "modal-darkorange handacc",
		buttons: [{
			keys: "审核",
			label: "",
			className: "btn-warning acc",
			callback: function() {
				$(".acc").text("审核中").attr('disabled', "true");
				Utils.sendAjax({
					type: "POST",
					url: IP + "/rmwebapp/sch/brsch/student/trainrec-" + trid + "/acc",
					data: {
						reason: $("#acc").val()
					},
					success: "审核成功！",
					error: "审核失败！",
					callback: function(Data) {
						var tr = $(t).closest('table').closest('tr').prev();
						tr.find('.row-details').trigger("click");
						tr.find('.row-details').trigger("click");
						$(".handacc").modal("hide");
					},
					ecallback: function() {
						$(".acc").text("审核").attr('disabled', "false");
					}
				});
				return false;
			}
		}, {
			keys: "关闭",
			label: "",
			className: "btn-warning",
			callback: function() {

			}
		}]
	});
	event.stopPropagation();
}

Utils.showSInstitution = function(code) {
	Utils.showModel({
		message: '<div style="height:100%;overflow: auto;overflow-x: hidden;"> <form id="registrationForm" onsubmit="return false;" class="form-horizontal" novalidate="novalidate"> <div class="form-group has-feedback"> <div class="col-lg-4 col-md-4 col-xs-4  "> <label class="col-md-4 col-xs-4 control-label ">驾校编号</label> <div class="col-md-8 col-xs-8 no-padding-left  padding-right-5"> <input id="schoolCode" type="text" class="form-control input-sm" name="name" data-rules="name" style="width: 100%; float: left;"> <span style="width:18%;float:left;"> </span> <div style="clear:both;"> </div> </div> </div> <div class="col-lg-4 col-md-4 col-xs-4  "> <label class="col-md-4 col-xs-4 control-label ">学员编码</label> <div class="col-md-8 col-xs-8 no-padding-left  padding-right-5"> <input id="studentCode" type="text" class="form-control input-sm" name="name" data-rules="name" style="width: 100%; float: left;"> <span style="width:18%;float:left;"> </span> <div style="clear:both;"> </div> </div> </div> </div> </form> </div>',
		title: "跨机构备案",
		className: "modal-darkorange handacc",
		buttons: [{
			keys: "备案",
			label: "",
			className: "btn-warning acc",
			callback: function() {
				Utils.sendAjax({
					type: "POST",
					url: IP + "/rmwebapp/uploadrec",
					data: {
						schcode: $("#schoolCode").val(),
						stucode: $("#studentCode").val(),
						srvname: 'transfer',
						phase: 1
					},
					success: "备案成功！",
					error: "备案失败！",
					callback: function(Data) {
						$(".handacc").modal("hide");
					}
				});
				return false;
			}
		}, {
			keys: "关闭",
			label: "",
			className: "btn-warning",
			callback: function() {

			}
		}]
	});
	$("#studentCode").val(code);
}

Utils.getModelObj = function() {
	var obj = {};
	switch (UrlValue("v")) {
		case "SubSchool":
			obj.name = "branch";
			break;
		case "School":
			obj.name = "branch";
			break;
		case "Dr":
			obj.name = "coach";
			break;
		case "CoachesManagement":
			obj.name = "carinfo";
			break;
		case "Assessment":
			obj.name = "accessment";
			break;
	}
	return obj;
}

//输出错误信息
Utils.Error = function(message) {
	console.error(message);
}

//弹出框提示
Utils.tooltip = {
	init: function(custom) {
		if (custom == undefined) {
			Utils.Error("tooltip init 方法必须带参数 格式为{title:'',content:'',html:'',trigger:'',class:'',style:'',onclick:'',,modal:''} 或 []");
			return;
		}
		this.title = custom.title || custom[0] || "";
		this.content = custom.content || custom[1] || "";
		this.placement = custom.placement || custom[2] || "bottom";
		this.html = custom.html || custom[3] || "true";
		this.trigger = custom.trigger || custom[4] || "hover focus"; //click
		this.onclick = custom.onclick || custom[5] || "alert('没有点击事件')";
		this.class = custom.class || custom[6] || "btn btn-success";
		this.style = custom.style || custom[7] || 'width: 80px;height: 24px;line-height: 12px;';
		return this[custom.modal || custom[8] || "setHtml_a"]();
	},
	setHtml_a: function() {
		return '<a  class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" ' +
			'data-container="body" data-html="' + this.html + '" data-trigger="' + this.trigger +
			'" data-toggle="popover" data-placement="' + this.placement + '"' +
			'data-content=\'' + this.content + '\'>' +
			this.title +
			'</a>';
	},
	setHtml_b: function() {
		return '<button  class="' + this.class + '" title="" style="' + this.style + '" ' +
			'data-container="body" data-html="' + this.html + '" data-trigger="' + this.trigger +
			'" data-toggle="popover" data-placement="' + this.placement + '"  onclick="' + this.onclick + '" ' +
			'data-content=\'' + this.content + '\'>' +
			this.title +
			'</button>';
	},
	initPopover: function() {
		$("[data-toggle='popover']").popover();
	},
	hidePopover: function() {
		if ($("[data-toggle='popover']").length > 0) {
			$("[data-toggle='popover']").popover('hide');
		}
	}
}

//进度条
Utils.progressBar = {
	init: function(custom) {
		if (custom == undefined) {
			Utils.Error("progressBar init 方法必须带参数 格式为{hint:'',percentage:'',style:''} 或 []");
			return;
		}
		this.hint = custom.hint || custom[0] || "没进度信息";
		this.percentage = custom.percentage || custom[1] || "0";
		this.class = custom.class || custom[2] || "progress-bar-warning";
		this.style = custom.style || custom[3] || "width:210px;margin-bottom:0px;background-color: #a7a7a7;";
		return this.setHtml();
	},
	setHtml: function() {
		//progress-bar-warning progress-bar-success
		return '<div class="progress progress-striped" style="' + this.style + '">' +
			'<div class="progress-bar ' + this.class + '" role="progressbar"' +
			'aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"' +
			'style="width: ' + this.percentage + '%;">' +
			'<span style="display:block;width: 180px;margin-left: auto;margin-right: auto;">' + this.hint + '</span>' +
			'</div>' +
			'</div>';
	}
}

//按钮
Utils.buttons = {
	init: function(custom) {
		if (custom == undefined) {
			Utils.Error("buttons init 方法必须带参数 格式为{text:'',title:'',onclick:'',class:'',style:''} 或 []");
			return;
		}
		this.text = custom.text || custom[0] || "没text";
		this.onclick = custom.onclick || custom[1] || "alert('没有点击事件')";
		this.title = custom.title || custom[2] || this.text;
		this.class = custom.class || custom[3] || "btn btn-success";
		this.style = custom.style || custom[4] || 'width: 80px;height: 24px;line-height: 12px;';
		return this.setHtml();
	},
	setHtml: function() {
		return '<button class="' + this.class + '" title="' + this.title + '" onclick="' + this.onclick + '"  style="' + this.style + '" >' +
			this.text +
			'</button>';
	}
}

//电子审核
Utils.TrainingSign = {
	changPhane: function(keys, str, list) {
		var classs = "progress-bar-success",
			phase = keys.substring(1, 2),
			yx = (list["c" + phase + "score"] / 60).toFixed(2),
			bx = (list["p" + phase + "requiredtime"]).toFixed(2),
			jd = (yx / bx * 100 > 100 ? 100 : yx / bx * 100),
			minMessage = yx + "学时",
			maxMessage = "学时已满",
			did = list["c" + phase + "id"],
			record = list["c" + phase + "record"],
			stuid = list["stuid"],
			hourhtml,starttime=list["c" + phase + "starttime"],endtime=list["c" + phase + "endtime"],
			$input='<input class="hidden" data-id="'+did+'" data-yx="'+yx+'"></input>';

		if (parseFloat(yx) < parseFloat(bx)) {
			hourhtml = Utils.progressBar.init([yx + "/" + bx + "学时", jd]);
		} else {
			hourhtml = Utils.progressBar.init([yx + "/" + bx + "学时", jd, classs]);
		}

		switch (str) {
			case "ACC":
				minMessage = "监管审核通过";
				maxMessage = "监管审核通过";
				break;
			case "ACCFAIL":
				minMessage = "监管审核不通过";
				maxMessage = "监管审核不通过";
				break;
			case "UPLOADED":
				minMessage = "已上传到监管平台";
				maxMessage = "已上传到监管平台";
				break
			case "SCHACC":
				return Utils.tooltip.init(["监管备案"+$input,
					Utils.progressBar.init([yx + "/" + bx + "学时", jd, hourhtml]),
					undefined, undefined, undefined, 'Uploads(\'Audit\',\'' + record + '\',\'' + did + '\');',
					"btn btn-bules",
					undefined, "setHtml_b"
				]);
				//return Utils.buttons.init(["备案", 'Uploads(\'Audit\',\'' + record + '\',\'' + did + '\');', undefined, "btn btn-bules"]);
				break;
		}

		if (parseFloat(yx) < parseFloat(bx)) {
			return Utils.tooltip.init([minMessage+$input, hourhtml]);
		} else {
			if (str == "null" || str == null || str == "UNACC") {
				//return Utils.buttons.init(["审核", 'singObjs.showModal(this,'+(phase-1)+',\''+did+'\',\''+stuid+'\');']);
				return Utils.tooltip.init(["驾校审核"+$input,
					Utils.progressBar.init([yx + "/" + bx + "学时", jd, classs])+"<div style=\"margin:5px 0 \">开始培训时间:"+starttime+"</div>"+
					"<div style=\"margin:5px 0 \">结束培训时间:"+endtime+"</div>",
					undefined, undefined, undefined, 'singObjs.showModal(this,' + (phase - 1) + ',\'' + did + '\',\'' + stuid + '\');',
					undefined,
					undefined, "setHtml_b"
				]);
			} else {
				return Utils.tooltip.init([maxMessage+$input, Utils.progressBar.init([yx + "/" + bx + "学时", jd, classs])]);
			}
		}
	}
}

Utils.refershIframe = function(id) {
	document.getElementById(id).contentWindow.location.reload(true);
}

//获取上一个月
Utils.getPreMonth = function(date) {
	var arr = date.split('-');
	var year = arr[0]; //获取当前日期的年份
	var month = arr[1]; //获取当前日期的月份
	var day = arr[2]; //获取当前日期的日
	var days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中月的天数
	var year2 = year;
	var month2 = parseInt(month) - 1;
	if (month2 == 0) {
		year2 = parseInt(year2) - 1;
		month2 = 12;
	}
	var day2 = day;
	var days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if (day2 > days2) {
		day2 = days2;
	}
	if (month2 < 10) {
		month2 = '0' + month2;
	}
	var t2 = year2 + '-' + month2 + '-' + day2;
	return t2;
}


//返回字段的值
Utils.getDateValue = function(Data, obj) {
	var temp = {},
		arr, len, val;
	for (var i in obj) {
		arr = obj[i].split(".");
		len = arr.length;
		val = Data[arr[0]];
		for (var j = 1; j < len; j++) {
			if (val != null) {
				val = val[arr[j]];
			} else {
				val = '';
				break;
			}
		}
		temp[i] = val;
	}
	return temp;
}


//轨迹审核
Utils.gpslist=function(t,stuid){
	var $tr=$(t).parent().parent(),
		name=$tr.find("td:eq(3)").text(),
		phase=$tr.find("td:eq(8)").text(),
		phaseobj={
			"第一部分":"COURSE1",
			"第二部分":"COURSE2",
			"第三部分":"COURSE3",
			"第四部分":"COURSE4",
		};
		Utils.showModel({
		message: '<iframe id="gpsList" style="width:100%;height:100%;border: none;" src="gspList/gpsList.html"  json="'+stuid+'|'+phaseobj[phase]+"|"+phase+'" class="iframes"></iframe>',
		title: "轨迹审核"+"("+name+"-"+phase+")",
		className: "modal-darkorange Big-model",
		buttons: [{
			keys: "关闭",
			label: "",
			className: "btn-warning",
			callback: function() {

			}
		}]
	});
}