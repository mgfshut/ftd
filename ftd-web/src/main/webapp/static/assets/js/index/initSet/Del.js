function Del(str, id) {
	var type = UrlValue("v");
	switch (type) {
		case "SubSchool":
			var SubSchool = function() {
				ajax_del(IP + "/rmwebapp/sch/branchschool-" + id);
			};
			modal_confirm("是否删除\"" + str + "\"?", SubSchool);
			break;
		case "TeachSiteSel":
			var TeachSiteSel = function() {
				ajax_del(IP + "/rmwebapp/sch/brsch/region-" + id);
			};
			modal_confirm("是否删除\"" + str + "\"?", TeachSiteSel);
			break;
			break;
		case "Dr":
			var Safement = function() {
				ajax_del_new(IP + "/rmwebapp/sch/brsch/coach-" + id + "/resign", "离职成功", "离职失败");
				GetCoachData();
			};
			modal_confirm("是否离职?", Safement);
			break;
		case "DrTeachingSelect":
			break;
		case "IllegelTeachSelect":
			break;
		case "Blacklist":
			break;
		case "CoachesManagement":
			var CoachesManagement = function() {
				ajax_del(IP + "/rmwebapp/sch/brsch/trainingcar-" + id);
			};
			modal_confirm("是否删除\"" + str + "\"?", CoachesManagement);
			break;
		case "TeachingStatus":
			break;
		case "CoachesStatus":
			break;
		case "StudentManagement":
			var StudentManagement = function() {
				ajax_put(IP + "/rmwebapp/sch/brsch/dropout-" + id, {
					"remark": "退学"
				});
			};
			modal_confirm("是否删除\"" + str + "\"?", StudentManagement);
			break;
		case "StudentSelect":
			break;
		case "product":
			var product = function() {
				$.ajax({
					url: "/rmwebapp/sch/brsch/product-" + id,
					method: "DELETE",
					dataType: "json",
					success: function(Data) {
						//debugger
						console.info(Data);
						if (Data.errorcode == undefined || Data.errorcode == 200) {
							modal_confirm_log("登录过期,请重新登陆！", relogin);
						} else if (Data.errorcode == 0) {
							var options = $('#dt').bootstrapTable('getOptions');
							var totals = options.totalRows,
								current = options.pageNumber,
								selectnum = options.pageSize;
							modal_pop("删除成功！", "success");
							if ((parseInt(current) - 1) * parseInt(selectnum) + 1 == parseInt(totals)) {
								Chooseurl((parseInt(current) - 1) || 1, selectnum);
							} else {
								Chooseurl(current, selectnum);
							}
						} else if (Data.errorcode == 100) {
							modal_pop("仍有学员绑定该班型，请解除绑定后再删除！", "fail");
						} else {
							modal_pop("删除失败！", "fail");
						}
					},
					error: function() {
						modal_pop("删除失败！", "fail");
					}
				});
			};
			modal_confirm("是否删除\"" + str + "\"?", product);
			break;
		case "ComTraining":
			break;
		case "TheoryTraining":
			break;
		case "SimulatedTraining":
			break;
		case "PracticalTraining":
			break;
		case "Permissions":
			break;
		case "role":
			var role = function() {
				ajax_del(IP + "/rmwebapp/sch/branchschool-role-" + id);
			};
			modal_confirm("是否删除\"" + str + "\"?", role);
			break;
		case "user":
			var user = function() {
				ajax_del(IP + "/rmwebapp/sch/brsch/user-" + id);
			};
			modal_confirm("是否删除\"" + str + "\"?", user);
			break;
		case "DrStatistica":
			break;
		case "CoachesStatistical":
			break;
		case "StudentStatistical":
			break;
		case "ComplaintStatistical":
			break;
		case "paymentStatistical":
			break;
		case "Assessment":
			var Assessment = function() {
				ajax_del_new(IP + "/rmwebapp/sch/assessment-" + id, "离职成功", "离职失败");
			};
			modal_confirm("是否离职?", Assessment);
			break;
		case "Safement":
			var Safement = function() {
				ajax_del_new(IP + "/rmwebapp/sch/safetystaff-" + id, "离职成功", "离职失败");
			};
			modal_confirm("是否离职?", Safement);
			break;
		case "ScheduleArray":
			var ScheduleArray = function() {
				ajax_del_new(IP + "/rmwebapp/group/deletegroup?id=" + id, "删除成功", "删除失败");
			};
			modal_confirm("是否删除?", ScheduleArray);
			break;
		case "SchScheduleModel":
			var ScheduleArray = function() {
				ajax_del_new(IP + "/rmwebapp/templet/delete?type=0&id=" + id, "删除成功", "删除失败");
			};
			modal_confirm("是否删除?", ScheduleArray);
			break;
		case "CoaScheduleModel":
			var ScheduleArray = function() {
				ajax_del_new(IP + "/rmwebapp/templet/delete?type=1&id=" + id, "删除成功", "删除失败");
			};
			modal_confirm("是否删除?", ScheduleArray);
			break;
		case "StudentChargeConfirm":
			var StudentChargeConfirm = function() {
				ajax_put(IP + "/rmwebapp/sch/brsch/student/pay-" + id, null);
			};
			modal_confirm("是否删除\"" + str + "\"的收费信息", StudentChargeConfirm);
			break;
	}
}

//取消预约排班的记录
function takeAppointBack(appointid, appointtype) {
	modal_confirm("是否删除该预约记录", function() {
		$.ajax({
			url: "/rmwebapp/appoint/back?appointid=" + appointid + "&appointtype=" + appointtype,
			method: "DELETE",
			dataType: "json",
			success: function(Data) {
				if (Data.code == 0) {
					var options = $('#dt').bootstrapTable('getOptions');
					var totals = options.totalRows,
						current = options.pageNumber,
						selectnum = options.pageSize;
					modal_pop("删除预约记录成功！", "success");
					if ((parseInt(current) - 1) * parseInt(selectnum) + 1 == parseInt(totals)) {
						Chooseurl((parseInt(current) - 1) || 1, selectnum);
					} else {
						Chooseurl(current, selectnum);
					}
				} else {
					modal_pop(Data.message + "<p>删除预约记录失败！</p>", "fail");
				}
			},
			error: function() {
				modal_pop("服务器请求超时<p>删除预约记录失败！</p>", "fail");
			}
		});
	});
}

//教练车挂靠操作函数
function IsAttach(str, id, whichStatu) {
	var url = IP + "/rmwebapp/sch/brsch/trainingcar-" + id + "-attach";
	var tips = "是否挂靠?";
	if (whichStatu === "unattach") {
		url = IP + "/rmwebapp/sch/brsch/trainingcar-" + id + "-leave";
		tips = "是否不挂靠"
	}
	var attach = function() {
		ajax_attach(url, whichStatu);
	};
	modal_confirm(tips, attach);
}

//图片上传
function stampUpload(imgFileid) {
	var type = UrlValue("v");
	switch (type) {
		case "Assessment":
			function asureFunction() {
				if (imgFileid != null && imgFileid != "" && /^\d+$/.test(imgFileid)) {
					modal_pop("上传成功", "success");
					return;
				}
				bootbox.dialog({
					message: stamp("印章上传", IP + "/rmwebapp/file/", 'accessment', 'width', '50'),
					title: "印章上传",
					className: "modal-darkorange tphoto",
					size: "14em",
					buttons: {
						success: {
							label: "发送",
							className: "btn-primary",
							callback: function() {
								alert("发送成功");
							}
						},
						"取消": {
							className: "btn-warning",
							callback: function() {

							}
						}
					}
				});
			}
			modal_confirm("确定上传印章?", asureFunction);
			break;
		case "School":
			function ssureFunction() {
				if (imgFileid != null && imgFileid != "" && /^\d+$/.test(imgFileid)) {
					modal_pop("上传成功", "success");
					return;
				}
				bootbox.dialog({
					message: stamp("印章上传", IP + "/rmwebapp/file/", 'accessment', 'width', '50'),
					title: "印章上传",
					className: "modal-darkorange tphoto",
					size: "14em",
					buttons: {
						success: {
							label: "发送",
							className: "btn-primary",
							callback: function() {
								alert("发送成功");
							}
						},
						"取消": {
							className: "btn-warning",
							callback: function() {

							}
						}
					}
				});
				return false;
			}
			modal_confirm("确定上传印章?", ssureFunction)
			break;
	}
}
window.top.base64Src = "";

var _student_Upload = [];
var _student_Data = {};
var _student_pdf = {
	"id": "pdf文件id"
};

function SignModel(idArray) {
	var src = '';
	bootbox.dialog({
		message: SignModel_html(),
		title: "学时阶段上报",
		className: "modal-darkorange center-modal",
		buttons: {
			"盖章": {
				className: "btn-warning",
				callback: function() {
					$("#sign").stamper({
						image: "data:image/png;base64," + window.top.base64Src
					});
					return false;
				}
			},
			"上报": {
				className: "btn-warning",
				callback: function() {
					var sd = sign();
					var data = {
						"id": idArray[0],
						"sealText": sd
					};
					_student_Upload.length = 0;
					_student_Upload.push(data);
					_student_Data.data = _student_Upload;
					_student_Data.base64 = window.top.base64Src;
					Utils.sendAjax({
						type: "POST",
						url: IP + IP + "/rmwebapp/sch/brsch/assessment/student",
						data: _student_Data,
						success: "上报成功",
						error: "上报失败",
						callback: function(data) {
							$(".center-modal").modal("hide");
						},
						ecallback: function(data) {

						}
					});
					//ajax_add(IP + "/rmwebapp/sch/brsch/assessment/student", _student_Data);
					return false;
				}
			},
			"关闭": {
				className: "btn-warning",
				callback: function() {
					$('img[id*="jquery_stamper_img"]').remove();
				}
			}
		}
	});
	if (window.top.base64Src == "") {
		var obj = window.document.getElementById("ocx");
		var isIE = true;
		if (!("ActiveXObject" in window)) {
			modal_pop("只能在ie浏览器上审核", "fail");
			isIE = false;
		}
		if (isIE) {
			var seal, sealInfo = obj.ReadSeal(),
				sealInfoList = sealInfo.toArray();
			if (sealInfoList[0]) {
				seal = sealInfoList[0];
				var bytes = Hex2Bytes(sealInfoList[1]),
					base64 = bytesToEncodedString(bytes);
				window.top.base64Src = base64;
			} else {
				modal_pop("请插入usbKey！", "success");
			}
		}
	}
	GetSignData(idArray, window.top.base64Src);
	$(".bootbox-close-button.close").on("click", function() {
		$('img[id*="jquery_stamper_img"]').remove();
		$(".bootbox-close-button.close").unbind("click");
	});
}

function GetSignData(idArray, Base64) {
	$.ajax({
		url: IP + "/rmwebapp/sch/brsch/assessment/abut/claAssess",
		type: "post",
		async: true,
		contentType: "application/json", //内容的类型
		data: JSON.stringify({
			"id": idArray,
			"base64": Base64
		}),
		success: function(Data) {
			//$("#stuimg").attr("src", Data.data.trc.student.personinfo.file.fileurl)
			if (Data.errorcode == 0) {
				if (Data.data == null) {
					$(".center-modal").modal("hide");
					modal_pop("没有培训数据！", "success");
				} else if (Data.data.length > 0) {
					for (var i = 0; i < Data.data.length; i++) {
						$("span[name=schname]").html(Data.data[i].claAssess.student.brsch.school.name);
						$("span[name=schcode]").html(Data.data[i].claAssess.student.brsch.school.code);
						$("span[name=stuname]").html(Data.data[i].claAssess.student.personinfo.name);
						$("span[name=stucode]").html(Data.data[i].claAssess.student.code);
						$("span[name=mileage]").html(Data.data[i].mileage);
						$("span[name=phase]").html(returnPhase(Data.data[i].claAssess.phase));
						$("span[name=duration]").html(Data.data[i].duration);
						$("#stuimg").attr("src", Data.data[i].claAssess.student.personinfo.file.fileurl);
					}
					//				if (Data.data[i].recarray.length > 0) {
					//
					//				}
					signData.inscode = Data.data[0].claAssess.student.brsch.school.code;
					signData.stunum = Data.data[0].claAssess.student.code;
					signData.subject = Data.data[0].claAssess.phase == "COURSE1" ? 1 : (Data.data[0].claAssess.phase == "COURSE2" ? 2 : 3);
					signData.duration = Data.data[0].duration;
					signData.examresult = 1;
					signData.mileage = Data.data[0].mileage;
					signData.recarray = Data.data[0].recarray;
					signData.totaltime = Data.data[0].totaltime;
					signData.vehicletime = Data.data[0].vehicletime;
					signData.classtime = Data.data[0].classtime;
					signData.simulatortime = Data.data[0].simulatortime;
					signData.networktime = Data.data[0].networktime;
					signData.rectype = Data.data[0].rectype;
					_student_pdf.id = Data.data[0].pdf.id;
				}
			} else {
				$(".center-modal").modal("hide");
				modal_pop("获取数据失败！", "success");
			}

		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			Ajax_Error(errObj);
			HideDiv("Obstruct");
		}
	});
}

function returnPhase(phase) {
	//var rePhase;
	var arr = ["第一部分", "第二部分", "第三部分", "第四部分"],
		length = phase.length,
		locations = phase.substring(length - 1, length);
	//phase == "COURSE1" ? rePhase = "第一部分" : (phase == "COURSE2" ? rePhase = "第二部分" : (phase == "COURSE3" ? rePhase = "第三部分" : (phase == "COURSE4" ? rePhase = "第四部分" : rePhase = "")));
	return arr[parseInt(locations) - 1];
}

var signData = {
	"inscode": "3095321052292512",
	"stunum": "3652989665313296",
	"subject": 3,
	"totaltime": 1,
	"vehicletime": 1,
	"classtime": 1,
	"simulatortime": 1,
	"networktime": 1,
	"duration": 1037,
	"examresult": 1,
	"mileage": 442.1,
	"rectype": 1,
	"recarray": []
};

function sign() {
	var obj = window.document.getElementById("ocx");

	//var arr=["inscode","stunum","subject",];
	var signInfo = obj.sign(JSON.stringify(signData));
	//var signInfo = obj.sign('{"inscode":"5616643374520613","stunum":"1141713779671537","subject":2,"duration":2047,"examresult":1,"mileage":"0.0","recarray":[{"rnum":"26953463068651621607260055"}]}');

	var signInfoList = signInfo.toArray();
	var signature, signerCert;
	signature = signInfoList[0];
	signerCert = signInfoList[1];
	return signature;
}

function SignModel_html() {
	var body = "";

	body += '<table style="margin-bottom: 4px;" class="table table-bordered table-hover dataTable no-footer">';
	body += '<colgroup>';
	body += '<col width="20%"/>';
	body += '<col width="30%"/>';
	body += '<col width="20%"/>';
	body += '<col width="30%"/>';
	body += '</colgroup>';
	body += '<tr>';
	body += '<td style="text-align: right;font-weight: bold;">培训机构</td><td colspan="2" style="width: 300px;"><span name="schname"></span></td>';
	body += '<td id="sign" rowspan="4"><img id="stuimg" src="/rmwebapp/pages/assets/img/model.jpg" style="height: 120px;"/></td>';
	body += '</tr>';
	body += '<tr>';
	body += '<td style="text-align: right;font-weight: bold;">培训机构编码</td><td colspan="2" style="color: #024BB5;"><span name="schcode"></span></td>';
	body += '</tr>';
	body += '<tr>';
	body += '<td style="text-align: right;font-weight: bold;">学员</td><td colspan="2"><span name="stuname"></span></td>';
	body += '</tr>';
	body += '<tr>';
	body += '<td style="text-align: right;font-weight: bold;">学员编码</td><td colspan="2" style="color: #024BB5;"><span name="stucode"></span></td>';
	body += '</tr>';
	body += '<tr>';
	body += '<td style="text-align: right;font-weight: bold;">培训部分</td><td><span name="phase"></span></td>';
	body += '<td style="text-align: right;font-weight: bold;">培训学时</td><td><span name="duration"></span></td>';
	body += '</tr>';
	body += '<tr>';
	body += '<td style="text-align: right;font-weight: bold;">培训里程</td><td ><span name="mileage"></span></td>';
	body += '<td style="text-align: right;font-weight: bold;" colspan="3"></td>';
	body += '</tr>';
	body += '<tr>';
	body += '</tr>';
	body += '</table>';

	body += '<table id="studyTimeTb" style="margin-bottom: 8px;" class="table table-bordered table-hover dataTable no-footer">';

	body += '<tr>';
	body += '<th>序号</th>';
	body += '<th>记录时间</th>';
	body += '<th>学员名字</th>';
	body += '<th>教练名字</th>';
	body += '<th>课程名字</th>';
	body += '<tr/>';

	body += '<body id="signBody">';

	body += '<body/>';

	body += '</table>';
	body += '<object id="ocx" classid="CLSID:4E194A99-7F41-453E-914C-544BB186A59C" codebase="signocx.cab#version=1.0.0.2" width="100" height="50" style="display:none;">';

	var str = '<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' +
		body +
		'</form>' +
		'</div>';
	return str;
}

//批量审核
function Allaudit() {

	//	if(!("ActiveXObject" in window)) {
	//		modal_pop("只能在ie浏览器上审核", "fail");
	//		return false;
	//	}
	//debugger
	var $tdArray = $("#dt").find("tbody tr td:first-child input:checked");
	if ($tdArray.length === 0) {
		modal_pop("请选择需要审核的学员", "fail");
		return false;
	}

	var idArray = [],
		idArrayInt = [],
		keepName = [],
		hasMan = false, //标识是否有待审核的人
		sendName = [];
	var id, state, tname, $tds

	$tdArray.each(function(index) {
		$tds = $(this).closest("tr").find(">td");
		state = $tds.eq(11).text().trim();
		if (state === "未审核") {
			hasMan = true;
			tname = $tds.eq(3).text().trim(); //名字

			$(this).data("canacc") === 1 ? function() { //是否满足审核条件
				sendName.push(tname);
				id = $tds.first().find("input").prop("value"); //id
				idArray.push(id);
				idArrayInt.push(parseInt(id));
			}() : keepName.push(tname);
		}
	})

	if (!hasMan) {
		modal_pop("所选学员准已通过审核，请勿重复审核！", "fail");
		return false;
	}

	var message = '';
	tname = keepName.join("、") + "暂不满足审核要求，无法进行审核。";
	message += (keepName.length === 0 ? "" : tname);

	if (sendName.length === 0) { //没有需要审核的学员
		modal_pop(message, "fail");
		return false;
	}

	tname = sendName.join("、");
	message += (sendName.length === 0 ? "" : "是否确认审核以下学员：" + tname);

	modal_confirm(message, function() {
		ajax_post(IP + "/rmwebapp/sch/brsch/assessment/student1", tname + "审核成功", tname + "审核失败", idArray);
		//ajax_post(IP + "/rmwebapp/sch/brsch/assessment/student", "审核成功", "审核失败", idArray);
	});
}

//批量撤销审核
function EXAllaudit() {
	//tr数组
	var trarray = $("#dt").find("tbody tr");
	var id = [];
	var num = 0;
	var num1 = 0;
	var name = '';
	for (var i = 0; i < trarray.length; i++) {
		if ($(trarray[i]).find("td:first-child input").is(":checked") && $(trarray[i]).find("td:first-child input").prop("value") != "" && $(trarray[i]).find("td:first-child input").prop("value") != null && $(trarray[i]).find("td:eq(11)").html() != "未审核") {
			id.push($(trarray[i]).find("td:first-child input").prop("value"));
			name += $(trarray[i]).find("td:eq(3)").html() + "、";
			num++;
		} else {
			num1++
		}

	}

	var Allaudits = function() {
		ajax_post(IP + "/rmwebapp/sch/brsch/unassessment/student", "撤销成功", "撤销失败", id);
	};
	console.info(JSON.stringify(id));
	if (num == 0 && num1 == Number($(".page-size:first").text())) {
		modal_pop("请选择学员", "fail");
	} else if (num == 0 && num1 > 0) {
		modal_pop("没有符合要求的学员", "fail");
	} else {
		name = name.substring(0, name.length - 1);
		modal_confirm("是否撤销以下学员：" + name + " 的审核?", Allaudits);
	}

	num = 0;
	console.info(id);
}

//批量培训成绩确认操作
function isConfirm(_this) {
	var sta = $("input.traiConCheck").filter(":checked");
	var branchDe = $("#dt").find("tr td:first-child input").filter(":checked");
	if (sta.length <= 0) {
		modal_pop("请勾选合格标示", "fail");
		return;
	}
	if (branchDe.length <= 0) {
		modal_pop("请勾选学员记录", "fail");
		return;
	}
	//tr数组
	var trarray = $("#dt").find("tbody tr");
	var id = [];
	var hconf = [];
	var num = 0;
	for (var i = 0; i < branchDe.length; i++) {
		var inp = $(branchDe[i]);
		var lasttd = $(branchDe[i]).parent().parent().find("td:last-child");
		if (inp.prop("value") != "" && inp.prop("value") != null && lasttd.html() == "未确认") {
			id.push(inp.prop("value"));
			num++;
		}
	}
	var ispa = $("input.traiConCheck").filter(":checked")[0].value;
	var Allaudits = function() {
		//ajax_post(IP+"/rmwebapp/sch/brsch/assessment/student", "确认成功", "确认失败",id);
		ajax_post(IP + "/rmwebapp/sch/brsch/courseinfo/" + ispa, "确认成功", "确认失败", id);
	};
	if (id.length == 0) {
		modal_pop("已确认", "fail");
		return;
	}
	modal_confirm("操作确认(" + id.length + " 记录)?", Allaudits);
	num = 0;
	console.info(id);
}

function isCancle(_this) {
	var sta = $("input.traiConCheck").filter(":checked");
	var branchDe = $("#dt").find("tr td:first-child input").filter(":checked");
	/*if(sta.length<=0)
	{
		modal_pop("请勾选合格标示","fail");
		return ;
	}*/
	if (branchDe.length <= 0) {
		modal_pop("请勾选学员记录", "fail");
		return;
	}
	//tr数组
	var trarray = $("#dt").find("tbody tr");
	var id = [];
	var num = 0;
	for (var i = 0; i < branchDe.length; i++) {
		var inp = $(branchDe[i]);
		var lasttd = $(branchDe[i]).parent().parent().find("td:last-child");
		if (inp.prop("value") != "" && inp.prop("value") != null && (lasttd.html() != "未确认")) {
			id.push(inp.prop("value"));
			num++;
		}
	}
	var Allaudits = function() {
		//ajax_post(IP+"/rmwebapp/sch/brsch/assessment/student", "确认成功", "确认失败",id);
		ajax_post(IP + "/rmwebapp/sch/brsch/courseinfo", "撤销成功", "撤销失败", id);
	};
	modal_confirm("确认撤销?", Allaudits);

}

function coa_group_html() {
	var body = "";

	//body += '<div class="form-title"><h5 class="row-title">教练员</h5></div>';
	body += '<div class="row">'
	body += '<label class="checkbox-inline i-checks" style="margin-top: 6px; padding-left: 0px;">' +
		'<div class="icheckbox_square-green" style="position: relative;">' +
		'<input type="checkbox" name="coaname" value="all" style="position: absolute; opacity: 0;">' +
		'<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>' +
		'</div>全选' +
		'</label>';
	body += '</div>';

	body += '<div class="row" style="padding-left:35px">'

	for (var i = 0; i < window.top.CoachData_IN.length; i++) {
		var obj = window.top.CoachData_IN[i];
		body += '<div style="float:left;width: 10%;"><label class="checkbox-inline i-checks" style="margin-top: 6px; padding-left: 0px;">' +
			'<div class="icheckbox_square-green" style="position: relative;">' +
			'<input type="checkbox" name="coaname" value="G_' + obj.id + '" style="position: absolute; opacity: 0;">' +
			'<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>' +
			'</div>' + obj.name +
			'</label></div>';
	}

	body += '</div>';

	var str = '<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' +
		body +
		'</form>' +
		'</div>';
	return str;
}
var BindCoaArray = [];
var DelArray = [];

function coa_group(id, name) {
	BindCoaArray = [];
	DelArray = [];
	bootbox.dialog({
		message: ObstructHtml() + coa_group_html(),
		title: "教练员分配到\"" + name + "\"",
		className: "modal-darkorange",
		buttons: {
			"分配": {
				className: "btn-warning",
				callback: function() {
					var arrays = [];
					var postArray = [];

					$("input[name=coaname]:checked").each(function(index) {
						arrays.push($(this).val());
					});
					$.inArray("all", arrays) != -1 ? arrays.splice($.inArray("all", arrays), 1) : "";

					for (var i = 0; i < arrays.length; i++) {
						postArray.push(parseInt(arrays[i].split("_")[1]));
					}

					for (var i = 0; i < BindCoaArray.length; i++) {
						$.inArray(BindCoaArray[i], postArray) != -1 ? postArray.splice($.inArray(BindCoaArray[i], postArray), 1) : "";
					}
					postArray.length > 0 ? BindCoa(id, postArray) : "";
					DelArray.length > 0 ? DelBindCoa(id, DelArray) : "";
				}
			},
			"关闭": {
				className: "btn-warning",
				callback: function() {

				}
			}
		}
	});
	//初始化样式
	$(".i-checks").iCheck({
		checkboxClass: "icheckbox_square-green",
		radioClass: "iradio_square-green",
	});
	$('input[value="all"]').on('ifChecked', function(event) {
		var tgname = $(event.target).attr('name')
		$('input[name="' + tgname + '"]').iCheck('check');
	});
	$('input[value="all"]').on('ifUnchecked', function(event) {
		var tgname = $(event.target).attr('name')
		$('input[name="' + tgname + '"]').iCheck('uncheck');
	});
	showBindCoa(id);
	HideDiv("Obstruct");
}

//绑定教练
function BindCoa(id, Arrays) {
	var obj = {
		"groupid": id,
		"coaids": JSON.stringify(Arrays)
	};
	$.ajax({
		url: "/rmwebapp/group/addgroupcoa",
		type: "post",
		async: true,
		contentType: "application/json", //内容的类型
		data: JSON.stringify(
			obj
		),
		success: function(Data) {
			$("#TableLoading").hide();
			if (Data.errorcode === 0) {
				modal_pop("分配成功！", "success"); //对话框
			} else if (Data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else if (Data.errorcode == undefined) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("分配失败！", "fail"); //对话框
			}
		},
		cache: false,
		timeout: 20000,
		error: function(errObj, resu) {
			$("#TableLoading").hide();
			modal_pop("分配失败！", "fail"); //对话框
		}
	});
}
//删除教练绑定
function DelBindCoa(id, Arrays) {
	var obj = {
		"groupid": id,
		"coaids": JSON.stringify(Arrays)
	};
	$.ajax({
		url: "/rmwebapp/group/deletegroupcoa",
		type: "post",
		async: true,
		contentType: "application/json", //内容的类型
		data: JSON.stringify(
			obj
		),
		success: function(Data) {
			$("#TableLoading").hide();
			if (Data.errorcode === 0) {
				modal_pop("分配成功！", "success"); //对话框
			} else if (Data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else if (Data.errorcode == undefined) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("分配失败！", "fail"); //对话框
			}
		},
		cache: false,
		timeout: 20000,
		error: function(errObj, resu) {
			$("#TableLoading").hide();
			modal_pop("分配失败！", "fail"); //对话框
		}
	});
}

//回显绑定的教练
function showBindCoa(id) {
	//$('input[type="checkbox"]').iCheck('uncheck');
	//$('input[name="openages"]').iCheck('check');
	$.ajax({
		type: "get",
		url: "/rmwebapp/group/querygroupcoas?groupid=" + id,
		async: true,
		success: function(Data) {
			$("#TableLoading").hide();
			if (Data.errorcode == 0) {
				BindCoaArray.length = 0;
				for (var i = 0; i < Data.data.length; i++) {
					var obj = Data.data[i];
					BindCoaArray.push(obj.coaid);
					$('input[value="G_' + obj.coaid + '"]').iCheck('check');
					$('input[value="G_' + obj.coaid + '"]').on('ifChecked', function() {
						SetDel($(this), 'ifChecked');
					})
					$('input[value="G_' + obj.coaid + '"]').on('ifUnchecked', function() {
						SetDel($(this), 'ifUnchecked');
					})
				}
			} else if (Data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else if (Data.errorcode == undefined) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			is = true;
			$("#TableLoading").hide();
		}
	});
}

function SetDel(e, type) {
	var val = (e[0].value).split("_")[1];
	type == "ifChecked" ? ($.inArray(val, DelArray) != -1 ? DelArray.splice($.inArray(parseInt(val), DelArray), 1) : "") : DelArray.push(parseInt(val));
}