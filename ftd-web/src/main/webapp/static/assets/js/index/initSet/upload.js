//获取备案数据
function Uploads(code, recor, did, modalClass) {
	Utils.tooltip.hidePopover();
	//code编码 recor备案状态 did数据的id
	var type = UrlValue("v"), //不同模块
		Data = {
			"did": "备案数据id",
			"srvname": "服务名",
			"phase": "0:先去部平台获取统一编号再到省平台备案  1:直接省平台备案"
		},
		successMes = "备案成功",
		errorMes = "备案失败"
	Data.did = did;


	if (code == "Audit") {
		if (did == "null" || did == null) {
			modal_pop("该培训部分没有生成审核数据", "fail");
		}
		Data.srvname = "stagetrainningtime";
		Data.phase = 1;
		Utils.sendAjax({
			url: IP + "/rmwebapp/uploadrec",
			data: Data,
			type: "post",
			success: "备案成功",
			error: "备案失败",
			callbacktype: "call",
			timeout: 1000000,
			callback: function(data) {
				if (Utils.errorCode(data)) {
					$('#dt').bootstrapTable('refresh');
				} else {
					modal_pop("备案失败!" + (data.message == null ? "" : "," + data.message), "fail");
				}
			}
		});
		return true;
	}

	(code == "0" || code == undefined) ? Data.phase = 0: Data.phase = 1; //根据编码获取是备案方式
	Data.srvname = GetSrvname(type, recor, code);
	Data.srvname.split("_").length > 1 ? (successMes = "信息删除备案成功", errorMes = "信息删除备案失败") : "";
	if (modalClass != undefined) {
		var callbacks = function(data) {
			if (Utils.errorCode(data)) {
				$("." + modalClass).modal("hide");
				var options = $('#dt').bootstrapTable('getOptions');
				var totals = options.totalRows,
					current = options.pageNumber,
					selectnum = options.pageSize;
				if ((parseInt(current) - 1) * parseInt(selectnum) + 1 == parseInt(totals)) {
					Chooseurl(parseInt(current) - 1, selectnum);
				} else {
					Chooseurl(current, selectnum);
				}
				modal_pop("备案成功！", "fail");
			} else {
				modal_pop("备案失败!" + (data.message == null ? "" : "," + data.message), "fail");
			}
		}
		Utils.sendAjax({
			url: IP + "/rmwebapp/uploadrec",
			data: Data,
			type: "post",
			success: successMes,
			error: errorMes,
			callbacktype: "call",
			callback: callbacks,
			timeout: 1000000
		});
	} else {
		ajax_post_byUpload(IP + "/rmwebapp/uploadrec", successMes, errorMes, Data);
	}
}

//获取服务名
function GetSrvname(type, recor, code) {
	var srvname = '';
	code == "0" ? recor = "FAILED" : recor = recor; //根据code是都存在改变备案状态
	recor == "null" ? recor = "FAILED" : recor = recor;
	switch (type) {
		case "SubSchool":
			recor == "FAILED" ? srvname = "branch" : srvname = "branch_delete";
			return srvname;
			break;
		case "School":
			recor == "FAILED" ? srvname = "institution" : srvname = "institution_delete";
			return srvname;
			break;
		case "TeachSiteSel":
			recor == "FAILED" ? srvname = "region" : srvname = "region_delete";
			return srvname;
			break;
		case "Assessment":
			recor == "FAILED" ? srvname = "examiner" : srvname = "examiner_delete";
			return srvname;
			break;
		case "Safement":
			recor == "FAILED" ? srvname = "securityguard" : srvname = "securityguard_delete";
			return srvname;
			break;
		case "StudentManagement":
			recor == "FAILED" ? srvname = "student" : srvname = "student_delete";
			return srvname;
			break;
		case "Dr":
			recor == "FAILED" ? srvname = "coach" : srvname = "coach_delete";
			return srvname;
			break;
		case "CoachesManagement":
			recor == "FAILED" ? srvname = "trainingcar" : srvname = "trainingCar_delete";
			return srvname;
			break;
	}
}