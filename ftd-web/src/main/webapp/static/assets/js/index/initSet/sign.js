var singObjs = {};

//签章数据
singObjs.signData = {
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


//弹出签章审核页面
singObjs.showModal = function(argument, status, id, stuid, pdf) {
	Utils.tooltip.hidePopover();
	// if (status != "select") {
	// 	if (!Utils.isIeCore()) {
	// 		return false;
	// 	}
	// }

	var $tds, $input,
		idArray = [],
		id, stuId = [],
		canacc = [],
		status = status,
		title = "电子审核",
		phasearr = ["第一部分", "第二部分", "第三部分", "第四部分"];
	if (status != "select") {
		$tds = $(argument).parent().parent().find("td");
		$input = $(argument).parent().parent().find("td:first-child");
		if (status != undefined) {
			title = "电子审核(" + phasearr[status] + ")";
			idArray.push(parseInt(id));
			canacc.push($input.find("input[name=checkClass]").data("canacc"));
			stuId.push(parseInt(stuid));
			if (id == null || id == "null") {
				if (status == 1 || status == 2) {
					modal_pop("第一部分还未审核,请先审核", "success");
				} else {
					modal_pop("第二部分和第三部分还未审核,请先审核", "success");
				}
				return;
			}
		} else {
			idArray.push(parseInt($input.find("input[name=checkClass]").prop("value")));
			canacc.push($input.find("input[name=checkClass]").data("canacc"));
			stuId.push($input.find("input[name=stucourseid]").val().split("_")[1]);
			title = "电子审核(" + $tds.eq(8).text().trim() + ")";
		}
	}

	Utils.showModel({
		message: '<iframe name="printIframe" src="Sign/Sign.html" style="width:100%;height:100%;border:none"></iframe>' + Utils.signHtml() + '</object><a id="pdfurl" src="" style="dispaly:none"></a>',
		title: title,
		className: "modal-darkorange Big-model",
		buttons: [{
			keys: "下载pdf文件",
			label: "",
			className: "btn-warning pdf",
			callback: function() {
				$("#pdfurl").get(0).click();
				return false;
			}
		}, {
			keys: "审核",
			label: "",
			className: "btn-warning acc",
			callback: function() {
				// var sd = Utils.sign(singObjs.signData),
				// 	_student_Upload = [],
				// 	_student_Data = {};
				// _student_Upload.length = 0;
				// _student_Upload.push({
				// 	"id": idArray[0],
				// 	"sealText": sd,
				// 	"score": singObjs.signData.totaltime,
				// 	"mileage": parseFloat(singObjs.signData.mileage)
				// });
				// _student_Data.data = _student_Upload;
				// _student_Data.base64 = window.top.base64Src;

				$(".acc").text("审核中").attr('disabled', "true");
				// Utils.sendAjax({
				// 	type: "POST",
				// 	url: IP + "/rmwebapp/sch/brsch/assessment/student",
				// 	data: _student_Data,
				// 	success: "审核成功！",
				// 	error: "审核失败！",
				// 	callback: function(Data) {
				// 		$(".pdf").show();
				// 		for (var i in Data) {
				// 			$("#pdfurl").attr("href", Data[i]);
				// 		}
				// 		$(".acc").text("已审核").attr('disabled', "true");
				// 		singObjs.getSignData(idArray, stuId, true);
				// 		query();
				// 	},
				// 	ecallback: function() {
				// 		$(".acc").text("审核").attr('disabled', "false");
				// 	}
				// });
				Utils.sendAjax({
					type: "POST",
					url: IP + "/rmwebapp/sch/brsch/assessment/student/acc-" + idArray[0],
					success: "审核成功！",
					error: "审核失败！",
					callback: function(Data) {
						$(".pdf").show();
						for (var i in Data) {
							$("#pdfurl").attr("href", Data[i]);
						}
						$(".acc").text("已审核").attr('disabled', "true");
						singObjs.getSignData(idArray, stuId, true);
						query();
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
	if (status != 'select') {
		// if (window.top.base64Src == "") {
		// 	var obj = window.document.getElementById("ocx");
		// 	var seal, sealInfo = obj.ReadSeal(),
		// 		sealInfoList = sealInfo.toArray();
		// 	if (sealInfoList[0]) {
		// 		seal = sealInfoList[0];
		// 		var bytes = Hex2Bytes(sealInfoList[1]),
		// 			base64 = bytesToEncodedString(bytes);
		// 		window.top.base64Src = base64;
		// 	} else {
		// 		modal_pop("请插入usbKey！", "success");
		// 		return;
		// 	}
		// }

		status == undefined ? ($tds.eq(11).text().trim() != "未审核" ? $(".acc").text("该部分已审核").attr('disabled', "true") : "") : "";
		$(".pdf").hide();
		singObjs.getSignData(idArray, stuId);
	} else {
		$(".acc").hide();
		var arr = [],
			strarr = id.split(","),
			stuArr = [],
			strarrLen = strarr.length;
		for (var i = 0; i < strarrLen; i++) {
			var stmp = strarr[i];
			stmp != "null" ? arr.push(parseInt(stmp)) : "";
		}
		if (pdf != "null") {
			$("#pdfurl").attr("href", pdf);
		} else {
			$(".pdf").hide();
		}
		stuArr.push(parseInt(stuid));
		singObjs.getSignData(arr, stuArr);
	}
};

singObjs.showACCFAILModal = function(argument) {
	var $tds = $(argument).parent().parent().find("td"),
		$input = $(argument).parent().parent().find("td:first-child"),
		idArray = [],
		id, stuId = [],
		canacc = [],
		phase = {
			"第一部分": "COURSE1",
			"第二部分": "COURSE2",
			"第三部分": "COURSE3",
			"第四部分": "COURSE4"
		},
		messages;

	idArray.push(parseInt($input.find("input[name=checkClass]").prop("value")));
	canacc.push($input.find("input[name=checkClass]").data("canacc"));
	stuId.push($input.find("input[name=stucourseid]").val().split("_")[1]);
	messages = Utils.modalBody(Utils.getTitleStr("不通过的教学日志") + '<table id="Accfail" class="table table-bordered table-hover dataTable no-footer">' +
		'<thead>' +
		'<tr>' +
		'<th class="noExl">序号</th>' +
		'<th>课程名称</th>' +
		'<th>教练名称</th>' +
		'<th>开始时间</th>' +
		'<th>结束时间</th>' +
		'<th>不通过原因</th>' +
		'</tr>' +
		'</thead>' +
		'</table>' + Utils.getTitleStr("不通过的每分钟培训记录") +
		'<table id="Accfails" class="table table-bordered table-hover dataTable no-footer">' + '<thead>' +
		'<tr>' +
		'<th class="noExl">序号</th>' +
		'<th>课程名称</th>' +
		'<th>教练名称</th>' +
		'<th>记录上传时间</th>' +
		'<th>不通过原因</th>' +
		'</tr>' +
		'</thead>' +
		'</table>')

	Utils.showModel({
		message: messages,
		title: $tds.eq(8).text().trim() + "审核不通过数据分析",
		className: "modal-darkorange center-model",
		buttons: [{
			keys: "关闭",
			label: "",
			className: "btn-warning",
			callback: function() {

			}
		}]
	});
	Utils.sendAjax({
		type: "get",
		url: IP + "/rmwebapp/sch/brsch/assessment/stu-" + stuId[0] + "/phase-" + phase[$tds.eq(8).text().trim()] + "/AccFailRec",
		callbacktype: "call",
		error: "获取审核不通过的学时记录失败！",
		callback: function(Data) {
			if (Utils.errorCode(Data)) {
				//alert(JSON.stringify(Data));
				if (Data.data && Data.data.trainrecList.length > 0) {
					var html, list = Data.data.trainrecList,
						lists = Data.data.minrecList;
					$("#Accfail").append('<tbody></tbody>');
					for (var i = 0; i < list.length; i++) {
						html = '<tr>' +
							'<td>' + (i + 1) + '</td>' +
							'<td>' + list[i]["subject"] + '</td>' +
							'<td>' + list[i]["coaname"] + '</td>' +
							'<td>' + list[i]["timestart"] + '</td>' +
							'<td>' + list[i]["timeend"] + '</td>' +
							'<td>' + list[i]["AccFailReason"] + '</td>' +
							'</tr>';
						$("#Accfail").find('tbody').append(html);
					}
					html = '';
					$("#Accfails").append('<tbody></tbody>');
					for (var i = 0; i < lists.length; i++) {
						html = '<tr>' +
							'<td>' + (i + 1) + '</td>' +
							'<td>' + lists[i]["subject"] + '</td>' +
							'<td>' + lists[i]["coachnum"] + '</td>' +
							'<td>' + lists[i]["rectime"] + '</td>' +
							'<td>' + (lists[i]["AccFailReason"] == null ? "" : lists[i]["AccFailReason"]) + '</td>' +
							'</tr>';
						$("#Accfails").find('tbody').append(html);
					}
				} else {

				}
			}
		}
	});
};

//获取签章数据
singObjs.getSignData = function(idArray, stuId, isAppendix) {
	Utils.sendAjax({
		type: "POST",
		url: IP + "/rmwebapp/sch/brsch/assessment/abut/claAssess",
		data: {
			"id": idArray,
			"base64": window.top.base64Src
		},
		callbacktype: "call",
		error: "获取数据失败！",
		callback: function(Data) {
			if (Utils.errorCode(Data)) {
				var $currentDocument = $(window.frames["printIframe"].document),
					arr = ["Cone", "Ctwo", "Cthree", "Cfour"],
					$newDocument, phaseObj = {
						"COURSE1": 1,
						"COURSE2": 2,
						"COURSE3": 3,
						"COURSE4": 4
					},
					Datas = Data.data,
					DataLen = Datas.length;
				if (DataLen > 0) {
					for (var i = 0; i < DataLen; i++) {
						$currentDocument.find("#stuname").html(Datas[i].claAssess.student.personinfo.name);
						$currentDocument.find("#stusex").html(Datas[i].claAssess.student.personinfo.sex == "MALE" ? "男" : "女");
						$currentDocument.find("#stucardnumType").html(Datas[i].claAssess.student.personinfo.cardtype == "IDCARD" ? "身份证" : "其他");
						$currentDocument.find("#stusigintime").html(Datas[i].claAssess.student.signuptime);
						$currentDocument.find("#stucardnum").html(Datas[i].claAssess.student.personinfo.cardnum);
						$currentDocument.find("#stuaddress").html(Datas[i].claAssess.student.personinfo.address);
						$currentDocument.find("#cartype").html(Datas[i].claAssess.student.traintype);
						$currentDocument.find("#commuway").html(Datas[i].claAssess.student.personinfo.mobile);
						$currentDocument.find("#phead").show();
						if (Datas[i].claAssess.student.personinfo.file) {
							$currentDocument.find("#phead").attr("src", Datas[i].claAssess.student.personinfo.file.fileurl);
						}

					}
					singObjs.signData.stunum = Datas[0].claAssess.student.code;
					singObjs.signData.subject = phaseObj[Datas[0].claAssess.phase];
					singObjs.signData.duration = Datas[0].duration;
					singObjs.signData.examresult = 1;
					singObjs.signData.mileage = Datas[0].mileage;
					singObjs.signData.recarray = Datas[0].recarray;
					singObjs.signData.totaltime = Datas[0].totaltime;
					singObjs.signData.vehicletime = Datas[0].vehicletime;
					singObjs.signData.classtime = Datas[0].classtime;
					singObjs.signData.simulatortime = Datas[0].simulatortime;
					singObjs.signData.networktime = Datas[0].networktime;
					singObjs.signData.rectype = Datas[0].rectype;
					singObjs.signData.inscode = Datas[0].claAssess.student.brsch.school.code;


					$newDocument = $currentDocument.find("#" + arr[singObjs.signData.subject - 1]);
					$newDocument.find("div[name=stdytime]").html(Utils.m2H(singObjs.signData.totaltime));
					$newDocument.find("div[name=mileage]").html(singObjs.signData.mileage + "公里");

					if (Datas[0].claAssessList.length > 0) {
						singObjs.forPhace(Datas[0].claAssessList);
					}

					if (!isAppendix) {
						//$("#pdfurl").attr("href", Datas[0].pdf != null ? Datas[0].pdf.fileurl : "");
						Utils.sendAjax({
							type: "get",
							url: IP + "/rmwebapp/sch/brsch/student-" + stuId[0] + "/acc/trainrec",
							callbacktype: "call",
							error: "获取附录数据失败！",
							callback: function(Data) {
								if (Utils.errorCode(Data)) {
									singObjs.forAppendix(Data.data, stuId[0]);
								}
							}
						});
						$currentDocument.find("div[id=appendix]").on('click', '[data-tr]', function(event) {
							var obj = $(this).data('tr');
							StudenModel(obj.stuid,obj);
						});
					}
				} else {
					modal_pop("数据为空！", "success");
					$(".Big-model").modal("hide");
				}
			} else {
				modal_pop("获取数据失败！", "success");
				$(".Big-model").modal("hide");
			}
		},
		ecallback: function() {
			$(".Big-model").model("hide");
		}
	});
};

//写科目
singObjs.writePhace = function(receptacle, obj, $currentDocument) {
	var dates = obj.updatetime.split(" ")[0].split("-");
	var $newDocument = $currentDocument.find("#" + receptacle);
	$newDocument.find("div[name=stdytime]").html(Utils.m2H(obj.score));
	$newDocument.find("div[name=mileage]").html(obj.mileage + "公里");
	$newDocument.find("div[name=result]").html("合格");
	$newDocument.find("div[name=ass]").html(obj.assessor);
	$newDocument.find("img[name=stmstamp]").show();
	if (obj.schseal != null && obj.schseal != "null") {
		$newDocument.find("img[name=stmstamp]").attr("src", "data:image/png;base64," + obj.schseal);
	} else {
		$newDocument.find("img[name=stmstamp]").hide();
	}
	$newDocument.find("div[name=stmyear]").html(dates[0]);
	$newDocument.find("div[name=stmmonth]").html(dates[1]);
	$newDocument.find("div[name=stmdate]").html(dates[2]);
};

//遍历数据的科目
singObjs.forPhace = function(Data) {
	var arr = ["Cone", "Ctwo", "Cthree", "Cfour"],
		length,
		locations, phase, $currentDocument = $(window.frames["printIframe"].document),
		DataLen = Data.length;
	for (var i = 0; i < DataLen; i++) {
		phase = Data[i]["phase"];
		length = phase.length;
		locations = phase.substring(length - 1, length);
		singObjs.writePhace(arr[parseInt(locations) - 1], Data[i], $currentDocument);
	}
};

//写培训详情
singObjs.writeAppendix = function(receptacle, obj, $currentDocument, stuid, phase) {
	if (obj == null) {
		return true;
	}
	var $appendixSchool = $currentDocument.find(receptacle + ".appendixSchool"),
		$appendixHour = $currentDocument.find(receptacle + ".appendixHour"),
		html;
	$appendixSchool.find("div[name=Sname]").html(obj.brshname);
	$appendixSchool.find("div[name=dis]").html(obj.distname);
	$appendixSchool.find("div[name=hour]").html(Utils.h2M(obj.needClaHour));
	$appendixHour.find("div[name=studyhour]").html(Utils.m2H(obj.studyClaHour));
	if (obj.trList && obj.trList.length > 0) {
		var trListObj = obj.trList,
			trListLen = trListObj.length;
		for (var i = 0; i < trListLen; i++) {
			html = '<tr class="appendixCon" style="cursor: pointer;" title="点击查看学时详情" data-tr="" >' +
				'<td  class="tdNoW">' + (trListLen - i) + '</td>' +
				'<td  class="tdNoW">' + (trListObj[i].thjonlnum) + '</td>' +
				'<td  class="tdNoW">' + (trListObj[i].type) + '</td>' +
				'<td  class="tdNoW">' + (trListObj[i].subject) + '</td>' +
				'<td  class="tdNoW">' + (trListObj[i].coaname) + '</td>' +
				'<td  class="tdNoW">' + (trListObj[i].licnum) + '</td>' +
				'<td  class="tdNoW">' + (trListObj[i].timestart) + '</td>' +
				'<td  class="tdNoW">' + (trListObj[i].timeend) + '</td>' +
				'<td  class="tdNoW">' + Utils.m2H(trListObj[i].count) + '</td>' +
				'</tr>';
				trListObj[i].trid=trListObj[i].id;
				trListObj[i].phase=phase;
				trListObj[i].stuid=stuid;
			var $tr = $(html).data('tr',trListObj[i] );
			$appendixHour.after($tr);
			html = '';
		}
	} else {
		html = '<tr class="appendixCon"><td colspan="9" class="tdNoW">没有培训记录</td></tr>';
		$appendixHour.after(html);
	}
};

//遍历模块获取详情数据
singObjs.forAppendix = function(Data, stuid) {
	var arr = [".appendixTh_One", ".appendixTh_Two", ".appendixTh_Three", ".appendixTh_Four"],
		length, locations, phase, $currentDocument = $(window.frames["printIframe"].document);
	for (var i in Data) {
		phase = i;
		length = phase.length;
		locations = phase.substring(length - 1, length);
		singObjs.writeAppendix(arr[parseInt(locations) - 1], Data[i], $currentDocument, stuid, phase);
	}
};



window.top.base64Src = '';