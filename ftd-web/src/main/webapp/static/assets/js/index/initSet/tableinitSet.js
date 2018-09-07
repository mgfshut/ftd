function Tableinit() {
	var type = UrlValue("v");
	_tableInit[type] != undefined ? _tableInit[type]() : console.info("tableinitSet.js is not find object-->" + type);
}

var _tableInit = {
	SysLogs: function() {
		ajaxs(IP + "/rmwebapp/pages/assets/data/SysLogs.json");
	},
	AreaManager: function() { //违规记录
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/invalidGps/1/10?brid=&stuname=&stucardnum=&coaname=&coacardnum=&licnum=&timestart=&timeend=");
		//ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/invalidGps/1/10");
		//ajaxs(IP + "/rmwebapp/pages/assets/data/areamanager.json");
	},
	ShortMsg: function() { //短信管理
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/smslog/1/10");
	},
	CarArchival: function() {
		//SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/trainingcar/record/1/10");
	},
	StipulateProject: function() { //规定项目
		var type = UrlValue("type"); //首页统计跳入的连接
		var ajaxUrl = IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/regularpro/1/10";
		type ? ajaxs(ajaxUrl + '?type=' + type) : ajaxs(ajaxUrl);

	},
	MaintainUpkeep: function() { //维修保养
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/maintenance/1/10");
	},
	SafeCheck: function() { //安全检测
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/securedetect/1/10");
	},
	TrafficUnlaw: function() { //交通违法
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/trafficillegal/1/10");
	},
	AccidentRecord: function() { //事故记录
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/accidentrec/1/10");
	},
	RefuelRecord: function() { //加油记录
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/fuelrec/1/10");
	},
	PollingRecord: function() { //巡检记录
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/pollrec/1/10");
	},
	RemoteEduGrade: function() {
		//ajaxs("assets/data/subschool.json");
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/examresult/1/10");
	},
	School: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch/school-" + SubSchId());
	},
	SubSchool: function() {
		ajaxs(IP + "/rmwebapp/sch-" + SchId() + "/branchschools/1/10");
	},
	TeachSiteSel: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/regions/1/10");
	},
	Dr: function() {
		SetOption("traid", window.top.TrainareData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/coaches?name=&teachtype=&employstatus=INJOB&isblacklist=&mobile=&cardnum=");
	},
	CoachesManagement: function() {
		SetOption("brcrecruit", window.top.BrcrecruitData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/trainingcars/1/10");
	},
	StudentManagement: function() {
		SetOption("brcrecruit", window.top.BrcrecruitData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/students/1/10");
	},
	studentArchival: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/students?name=&cardtype=&cardnum=&timestart=&timeend=");
	},
	stuContract: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/students?name=&cardtype=&cardnum=&timestart=&timeend=");
	},
	TrainingRecords: function() {
		ajaxs_d(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student/dailyRec/1/10");
	},
	coachArchival: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/coaches?name=&teachtype=&employstatus=&isblacklist=");
	},
	role: function() {
		ajaxs(IP + "/rmwebapp/sch/branchschool-" + SubSchId() + "-roles/1/10");
	},
	user: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/users/1/10");
	},
	DrStatistica: function() {
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/stat/1/10/coach?brid=" + SubSchId() + "&timestart=&timeend=");
	},
	CoachesStatistical: function() {
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/stat/1/10/coachcar?brid=" + SubSchId() + "&timestart=&timeend=");
	},
	StudentStatistical: function() {
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/stat/1/10/student?brid=" + SubSchId() + "&trainStatus=&timestart=&timeend=");
	},
	ComplaintStatistical: function() {
		ajaxs("assets/data/ComplaintStatistical.json");
	},
	paymentStatistical: function() {
		ajaxs("assets/data/paymentStatistical.json");
	},
	Assessment: function() {
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/assessment/1/10");
	},
	Safement: function() {
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/safetystaff/1/10");
	},
	TrainingAudit: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		$("#reachStandard").val("true").trigger("change.select2");
		ajaxs_checkbox(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/assessment/students/1/10?schname=&cardnum=&stuname=&timesfrom&timeto=&course=&accstatus=&reachStandard=true");
	},
	TrainingSign: function() {
		SetOption("brid", window.top.SubSchoolData);
		ajaxs_checkbox(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/claAssess/students/1/10?brid=&cardnum=&stuname=", 1, 10, function() {
			Utils.tooltip.initPopover();
		});
		if ($("#lcacc").length <= 0) {
			$(".bootstrap-table .fixed-table-toolbar .columns").append('<span id=\"lcacc\" style=\"margin-left: 5px;\">流程审核：</span>' +
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="">学时学满</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="">---</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68);color:rgb(255, 255, 255);padding:2px;background-color:#1ab394;" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="学时学满后请点击【驾校审核】按钮查看学员培训记录，确认无误后点击【审核】按钮完成驾校审核" data-original-title="">驾校审核</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="">---</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68);color:rgb(255, 255, 255);padding:2px;background-color:#6196f5;" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="上传学员培训记录到监管平台" data-original-title="">监管备案</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="">---</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="">待监管复核</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="">---</a>'+
				'<a class="" title="" style="text-decoration:none;cursor:pointer;color:rgb(68, 68, 68)" data-container="body" data-html="true" data-trigger="hover focus" data-toggle="popover" data-placement="bottom" data-content="若显示【监管审核通过】，则表示审核完成，若显示【监管审核不通过】，该学员需继续培训" data-original-title="">审核结果反馈</a>'
			);
		}
	},
	TrainingConfirm: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);;
		ajaxs_checkbox(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/apom/course", 1, 10, function(data) {
			$("select.gradeStatu").select2({});
		});
		$("input.traiConCheck").change(function() {
			var chks = $("input.traiConCheck");
			for (var i = 0; i < chks.length; i++) {
				if ($(this).prop("checked") && chks[i].name != $(this).prop("name")) {
					$(chks[i]).prop("checked", false);
				}
			}
		});
	},
	TrainingStatistical: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/stat/brsch-" + SubSchId() + "/1/10/trcinfo? brschname&coaname=&stuname=&stucardnum=&timefrom=&timeto=");
	},
	StudentChargeConfirm: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student/payhistory/1/10?stuCode=&stuName=&cardNum=&traintype=&brid=&totalMoneyfrom=&totalMoneyto=&moneyfrom=&moneyto=&timefrom=&timeto=&assessstatus=");
	},
	StudentChargeConfirms: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student/payhistory/1/10?stuCode=&stuName=&cardNum=&traintype=&brid=&totalMoneyfrom=&totalMoneyto=&moneyfrom=&moneyto=&timefrom=&timeto=&assessstatus=");
	},
	StudentSigninWill: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajax_selectN(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/branchCharge/chargeAll", "course", "course", "course");
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student/enroll/fuzzy/1/10");
	},
	StudentExpireIdcard: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student/expire-idcard/1/10?name=&certificateNum=&timestart=&timeend=");
	},
	coachExpireIdcard: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/coach/expire-idcard/1/10?name=&certificateNum=&timestart=&timeend=");
	},
	coachExpireDrilicence: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/coach/expire-drilicence/1/10?name=&certificateNum=&timestart=&timeend=");
	},
	coachExpireQualnum: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/coach/expire-qualnum/1/10?name=&certificateNum=&timestart=&timeend=");
	},
	coachExpireTransportno: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);;
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/car/expire-transportno/1/10?name=&certificateNum=&timestart=&timeend=");
	},
	StudentExamStatistical: function() {
		SetOption("recruitid", window.top.BrcrecruitData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/grade/student/num/1/10?year=&month=&recruitid=");
	},
	StudentSendStatistical: function() {
		SetOption("recruitid", window.top.BrcrecruitData);
		var date = new Date();
		var yeares = date.getFullYear();
		var month = date.getMonth() + 1;
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/exam/student/num/1/10?year=" + yeares + "&month=" + month + "&recruitid=");
	},
	EnrolStudentStatistical: function() {
		//获取招生点or教练员下拉框
		if ($("#zstype").val() == "dot" || $("#zstype").val() == "0") {
			SetOption("reOrco", window.top.BrcrecruitData);
		}
		//绑定下拉事件
		$("#zstype").select2().on("change", function() {
			$("#zstype").val() == "dot" ? ($("#title_reOrco").html("招生点:"), SetOption("reOrco", window.top.BrcrecruitData)) : $("#zstype").val() == "0" ? ($("#title_reOrco").html("招生点:"), SetOption("reOrco", window.top.BrcrecruitData)) : ($("#title_reOrco").html("教练员:"), SetOption("reOrco", window.top.CoachData));
		});
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/signup/student/num/1/10?year=&month=&recruitid=");
	},
	StudentOrderList: function() {
		SetOption("brid", window.top.SubSchoolData);;
		SetOption("trainareid", window.top.TrainareData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/appointments?coaname=&trainareid=&stuname=&stumobile=&atstarttime=&atendtime=&orderstarttime=&orderendtime=");
	},
	StudentPay: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/students/gathering?name=&cardnum=");
	},
	StudentPayStatistical: function() {
		ajaxs(IP + "/rmwebapp/stat/brsch-" + SubSchId() + "/student/gathering/1/10?branch_name=&cardnum=&student_name=&traintype=");
	},
	TrainingOrder: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/apomExam/assessment/students/1/10?name=&cardnum=&timestart=&timeend=&subject=&apomExamType=");
	},
	TrainingOrderselect: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		//筛选条件中的分校列表下拉框填充
		//请求数据
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student/apomExam/1/10?brid=&cardnum=&studentname=&apomExamType=&subject=");
	},
	CoachMoney: function() {
		var date = new Date();
		var yeares = date.getFullYear();
		var month = date.getMonth() + 1;
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/salary/coach/1/10?year=" + yeares + "&month=" + month + "&cardnum=&coachname=");
	},
	coachPhoto: function() {
		ajaxs(IP + "/rmwebapp/brsch-" + SubSchId() + "/coach/gj/photoshow/1/10?coachname=");
	},
	TrainingEnd: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs_checkbox(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student/graduation/1/10/fuzzy?brid=&cardnum=&stuname=");
	},
	OrderAccept: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/stuappohour/1/10", 1, 10, OAcallback);
	},
	product: function() {
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/product/1/10");
	},
	listOfOrders: function() {
//		var today = getDateStr(new Date(), '-');
		SetOption("brschid", window.top.SubSchoolData);
		//		$("#starttime").val(today + " 00:00:00").data("options").max = today + " 23:59:59";
		//		$("#endtime").val(today + " 23:59:59").data("options").min = today + " 00:00:00";
		//		ajaxs(IP + "/rmwebapp/brsch-" + SubSchId() + "/1/10/orders-2?stuname=&paystatus=&paycanal=&ordercode=&starttime=" + today + " 00:00:00&endtime=" + today + " 23:59:59");
		ajaxs(IP + "/rmwebapp/brsch-" + SubSchId() + "/1/10/orders-2?stuname=&paystatus=&paycanal=&ordercode=&starttime=&endtime=");
	},
	coaAppointrecords: function() {
		SetOption("brid", window.top.SubSchoolData);
		ajax_select_id("/rmwebapp/sch/brsch-" + SubSchId() + "/coach-names", "id", "name", "coaid");
		ajaxs(IP + "/rmwebapp/schedule/brsch-" + SubSchId() + "/1/10/appoint/records?coaortra=0", 1, 10, function(Data) {
			if (Data.errorcode == 0 && Data.data && Data.data.stat) {
				var stat = Data.data.stat;
				var $span = $("#totalSituation");
				var html = "有效学时总学时: " + (stat.totalhour || 0) + "（小时） ";
				html += "预约总人数: " + (stat.totalapponum || 0) + "（人次） ";
				html += "费用总计:" + (stat.totalprice || 0) + "（元） ";
				if ($span.length == 1) {
					$span.html(html);
				} else {
					$(".bootstrap-table .fixed-table-toolbar .columns").append('<span id=\"totalSituation\" style=\"margin-left: 5px;\">' + html + '</span>');
				}
			}
		}, function() {
			$("#totalSituation").remove();
		});
	},
	traAppointrecords: function() {
		ajaxs(IP + "/rmwebapp/schedule/brsch-" + SubSchId() + "/1/10/appoint/records?coaortra=1");
	},
	stuTraAndAppo: function() {
		var dateObj = new Date();
		var today = getDateStr(dateObj, '-');
		var theSameDayINLastMonth = getDateStr((dateObj.setMonth(dateObj.getMonth() - 1), dateObj), '-');
		SetOption("brid", window.top.SubSchoolData);
		$("#starttime").val(theSameDayINLastMonth).trigger("select2.change");
		$("#starttime").data("options").max = today;
		$("#endtime").val(today).trigger("select2.change");
		$("#endtime").data("options").min = theSameDayINLastMonth;
		ajaxs(IP + "/rmwebapp/brsch-" + SubSchId() + "/student/trainandapporec/1/10?stuname=&cardnum=&starttime=" + theSameDayINLastMonth + "&endtime=" + today, 1, 10, initForTraAndAppo);
	},
	coaTraAndAppo: function() {
		var dateObj = new Date();
		var today = getDateStr(dateObj, '-');
		var theSameDayINLastMonth = getDateStr((dateObj.setMonth(dateObj.getMonth() - 1), dateObj), '-');
		SetOption("brid", window.top.SubSchoolData);
		$("#starttime").val(theSameDayINLastMonth).trigger("select2.change");
		$("#starttime").data("options").max = today;
		$("#endtime").val(today).trigger("select2.change");
		$("#endtime").data("options").min = theSameDayINLastMonth;
		ajaxs(IP + "/rmwebapp/brsch-" + SubSchId() + "/coach/trainandapporec/1/10?coaname=&cardnum=&starttime=" + theSameDayINLastMonth + "&endtime=" + today, 1, 10, initForTraAndAppo);
	},
	ScheduleArray: function() {
		ajaxs(IP + "/rmwebapp/group/querygroup?brid=" + SubSchId() + "&page=1&size=10");
	},
	SchScheduleModel: function() {
		SetOption_NO("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/templet/braquery?brid=" + SubSchId() + "&type=0&page=1&size=10");
	},
	CoaScheduleModel: function() {
		SetOption_NO("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/templet/braquery?brid=" + SubSchId() + "&type=1&page=1&size=10");
	},
	comment: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/coaches-comment?coaname=&stuname=");
	},
	report: function() {
		//初始化驾校下拉列表
		SetOption("brid", window.top.SubSchoolData);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/1/10/coaches-complaint?coaname=&stuname=");
	},
	CoachDaillyrec: function() {
		SetOption("brid", window.top.SubSchoolData);
		var date = new Date();
		var yeares = date.getFullYear();
		var month = date.getMonth() + 1;
		parseInt(month) < 10 ? month = "0" + month : "";
		$("#month").select2("val", month);
		ajaxs(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/coach-dailyrec/1/10?time=" + yeares + "-" + month + "&name=&cardnum=");
	}
};

//预约受理 回调函数
var OAcallback = function() {
	//alert('回调成功！');
	var group = [
		[5, 6],
		[7, 8],
		[9, 10],
		[11, 12]
	];
	$trlist = $('#dt tr');
	for (var i = 0; i < group.length; i++) {
		for (var j = 0; j < group[i].length; j++) {
			$('#dt tr th').eq(group[i][j]).addClass('dt-part' + i);
			$trlist.each(function(index) {
				$(this).find('td').eq(group[i][j]).addClass('dt-part' + i);
			});
		}
	}
}