function post_ajax(url, postWay, async, callback) {
	$.ajax({
		type: postWay,
		url: url,
		async: async,
		success: function(data) {
			callback(data);
		},
		cache: false,
		timeout: 500000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				alert("登录过期,请重新登陆！", relogin);
			} else {
				alert("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}

function printPreview(type) {

	var setPrintPst = function(pst) {
		if (pst === 'center') {
			$('iframe[name="printIframe"]').contents().find('.print-body').css('margin', '0cm auto');
		}
	}
	setPrintPst(window.top.PRINTPST);

	var bdhtml = window.frames["printIframe"].document.body.innerHTML;
	sprnstr = "<!--startprint-->";
	eprnstr = "<!--endprint-->";
	prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
	prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
	window.frames["printIframe"].document.body.innerHTML = prnhtml;
	var temp = $(window.frames["printIframe"]);
	window.frames["printIframe"].focus();
	toHide(type);
	window.frames["printIframe"].print();
}

/*
 * 根据type判断是哪个科目的打印，隐藏不需要打印的内容
 */
function toHide(type) {
	var $currentDocument = $(window.frames["printIframe"].document);
	if (type == "course2" || type == "course3" || type == "course4") {
		$currentDocument.find("caption").addClass("noprint");
		$currentDocument.find("tr[name='personinfor']").addClass("noprint");
		$currentDocument.find("tr[name='applyCar']").addClass("noprint");
		$currentDocument.find("#cartype").hide();
		$currentDocument.find("#siginin").addClass("noprint");
		$currentDocument.find("tfoot").addClass("noprint");
		$currentDocument.find(".year").addClass("noprint");
		$currentDocument.find(".month").addClass("noprint");
		$currentDocument.find(".day").addClass("noprint");
		$currentDocument.find(".td_table td").addClass("no-border");
		$currentDocument.find(".stamp").addClass("noprint");
		$currentDocument.find(".signature").addClass("noprint");
		$currentDocument.find(".course-text").addClass("noprint");
	}
	switch (type) {
		case "course2":
			$currentDocument.find("#Cone").addClass("noprint");
			break;
		case "course3":
			$currentDocument.find("#Cone").addClass("noprint");
			$currentDocument.find("#Ctwo").addClass("noprint");
			break;
		case "course4":
			$currentDocument.find("#Cone").addClass("noprint");
			$currentDocument.find("#Ctwo").addClass("noprint");
			$currentDocument.find("#Cthree").addClass("noprint");
			break;
		case "EndPositive":
			$currentDocument.find(".no_print").addClass("noprint");
			$currentDocument.find(".dasheds").addClass("noprint");
			break;
	}
}

//用dataObj填充cid科目
function putCourse(cid, dataObj, traintype, newtype) {
	var tds = $("#" + cid + " td", window.frames["printIframe"].document);
	tds.find("span div[name=stdytime]").text(dataObj.studytime); //培训学时
	//tds.find("span div[name=stusiginname]").text(dataObj.stusiginname); //学员签名
	//tds.find("span div[name=stuyear]").text(dataObj.year);
	//tds.find("span div[name=stumonth]").text(dataObj.month);
	//tds.find("span div[name=studate]").text(dataObj.date);

	//tds.find("span div[name=coacheyear]").text(dataObj.year);
	//tds.find("span div[name=coachemonth]").text(dataObj.month);
	//tds.find("span div[name=coachedate]").text(dataObj.date);

	//tds.find("span div[name=orgsignname]").text(dataObj.orgsignname); //培训单位签名
	//tds.find("span div[name=orgyear]").text(dataObj.year);
	//tds.find("span div[name=orgmonth]").text(dataObj.month);
	//tds.find("span div[name=orgdate]").text(dataObj.date);
	//tds.find("span div img[name=orgstamp]").show();
	//tds.find("span div img[name=orgstamp]").attr("src", dataObj.orgstamp);
	getSign({
		tds: tds,
		dataObj: dataObj,
		traintype: traintype,
		newtype: newtype
	});
	tds.find("span div[name=stmsignname]").text("谢剑飞"); //道路运输管理机构审核签名
	tds.find("span div[name=stmyear]").text(dataObj.year);
	tds.find("span div[name=stmmonth]").text(dataObj.month);
	tds.find("span div[name=stmdate]").text(dataObj.date);
	tds.find("span div img[name=stmstamp]").show();
	tds.find("span div img[name=stmstamp]").attr("src", dataObj.stmstamp);
}

//设置学时
var SetHouer = {
	obj: {
		COURSE1: {},
		COURSE2: {},
		COURSE3: {},
		COURSE4: {}
	},
	SetObj: function(obj) {
		var data = obj.prints,isC4 = 0;
		for (var i = 0; i < data.length; i++) {
			this.obj[data[i].phase].year = (data[i].updatetime).split("-")[0];
			this.obj[data[i].phase].month = (data[i].updatetime).split("-")[1];
			this.obj[data[i].phase].date = (data[i].updatetime).split("-")[2];
			this.obj[data[i].phase].score = data[i].score;
			data[i].phase == "COURSE4" ? isC4 += 1 : "";
		}
		isC4 == 0 ? this.obj.COURSE4.score = "0" : "";
		var ct = obj.ct;
		for (var k = 1; k < 5; k++) {
			this.obj["COURSE" + k]["ct"] = ct["p" + k + "time"];
			this.obj["COURSE" + k]["print"] = ct["p" + k + "requiredtime"];
		}
	}
}
var printObj={
	newPrint:function(){
		Utils.showModel({
			message: '<div class="form-group">'+
			' <div class="col-sm-10">'+
			'<label class="radio-inline i-checks">'+
			'<input type="radio" name="modal" value="personinfo">第一部分'+
			'</label>'+
			'<label class="radio-inline i-checks">'+
			'<input type="radio" name="modal" value="course2">第二部分'+
			'</label>' +
			'<label class="radio-inline i-checks">'+
			'<input type="radio" name="modal" value="course3">第三部分'+
			'</label>'+
			'<label class="radio-inline i-checks">'+
			'<input type="radio" name="modal" value="course4">第四部分'+
			'</label>'+
			'</div>'+
			'</div>',
			title: "选择打印培训部分",
			className: "modal-darkorange handacc",
			buttons: [{
				keys: "打印",
				label: "",
				className: "btn-warning",
				callback: function() {
					printHtml("newPrint",$('input[name="modal"]:checked').val())
					$(".handacc").modal("hide");
				}
			}, {
				keys: "关闭",
				label: "",
				className: "btn-warning",
				callback: function() {

				}
			}]
		});
		$('.radio-inline.i-checks').iCheck({
		checkboxClass: "icheckbox_square-green",
		radioClass: "iradio_square-green",
		});
	}
}


//打印
function printHtml(type,temp) {
	var trarray = $("#dt").find("tbody tr"),
		ischeck = true,
		newtype;
	(type == "EndBack") ? ischeck = false: ischeck = true,
		indexs = {
			personinfo: 9,
			course2: 10,
			course3: 11,
			course4: 12,
			COURSE2: 10,
			COURSE3: 11,
			COURSE4: 12,
		};
	var check = trarray.find("td:first-child input").filter(":checked");
	if (ischeck && check.length > 1) {
		modal_pop("请逐个打印", "fail");
		return;
	}
	if (ischeck && check.length <= 0) {
		modal_pop("请选择学员", "fail");
		return;
	}
	var $td = $(check[0]).parent(),
		$tr = $td.parent();
	var val = $td.find("input[name=stucourseid]").val(),
		ass = $tr.find("td:eq(11)").html(), //获取审核状态
		$tdaInput = type!="newPrint"?$tr.find("td:eq(" + indexs[type] + ") input"):$tr.find("td:eq(" + indexs[temp] + ")  input"),
		courseid = $tdaInput.data("id"),
		yx = $tdaInput.data("yx");
	if (ass == "未审核") {
		modal_pop("请先审核！", "fail");
		return;
	}
	var stuId = "",
		course = "",
		graid = "",
		url = "";
	if (ischeck && val) {
		var valArr = val.split("_"),
			courseIndx = {
				personinfo: "COURSE1",
				course2: "COURSE2",
				course3: "COURSE3"
			};
		stuId = valArr[1];
		course = valArr[2] == "undefined" ? courseIndx[type] : valArr[2]; //学员当前科目
		graid = valArr[3] == "undefined" ? courseid : valArr[3]; //学员当前科目
	}
	if (course == "COURSE1" && (type == "course2" || type == "course3")) {
		modal_pop("您只能打印当前培训部分！", "fail");
		return;
	}
	if (course == "COURSE2" && (type == "course3")) {
		modal_pop("您只能打印当前部分与第一部分！", "fail");
		return;
	}
	var dateObj = new Date(),
		y = dateObj.getFullYear(),
		m = dateObj.getMonth() + 1,
		d = dateObj.getDate(),
		trarray = $("#dt").find("tbody tr"),
		check = trarray.find("td:first-child input").filter(":checked"),
		message = '';
	//根据不同类型调用不同打印页面
	switch (type) {
		case "EndPositive":
			message = '<iframe name="printIframe" src="print/print_EndPositive.html" style="width:100%;height:100%;border:none"></iframe>';
			break;
		case "EndBack":
			message = '<iframe name="printIframe" src="print/print_EndBack.html" style="width:100%;height:100%;border:none"></iframe>';
			break;
		case "Register":
			message = '<iframe name="printIframe" src="print/Register.html" style="width:100%;height:100%;border:none"></iframe>';
			break;
		case "newPrint":
			message = '<iframe name="printIframe" src="print/print_new.html" style="width:100%;height:100%;border:none"></iframe>';
			newtype = type;
			temp=="personinfo"?course="COURSE1":course=temp;
			type=temp;//course == "COURSE1" ? type = "personinfo" : type = course.toLowerCase();
			break;
		default:
			message = '<iframe name="printIframe" src="print/print.html" style="width:100%;height:100%;border:none"></iframe>';
			break;
	}
	var printcallback = function() {
			printPreview(type);
		}
		//url = "/rmwebapp/sch/brsch/student-" + stuId;
	url = "/rmwebapp/sch/brsch/assessment/clahours/stu-" + stuId;
	if (type == "personinfo" && (course == "COURSE1" || course == "COURSE2" || course == "COURSE3" || course == "COURSE4")) {
		preFramePop(message, "打印预览", printcallback);
		var ajaxcallback = function(data) {
			var per = data.data;
			var tds = $('.td_table tr[name=personinfor] td', window.frames["printIframe"].document);
			tds.find("div[name=stuname]").text(per.name);
			tds.find("div[name=sex]").text(per.sex == "MALE" ? "男" : "女");
			tds.find("div[name=cardnum]").text(per.cardnum);
			tds.find("div[name=signintime]").text(per.signuptime);
			tds.find("div[name=address]").text(per.address);
			tds.find("div[name=commuway]").text(per.mobile);
			if (getIsPhoto()) {
				tds.find("div img[name=stuhead]").show();
				tds.find("div img[name=stuhead]").attr("src", per.fileurl);
			}
			var cartype = per.traintype;
			var temp = $('#cartype', window.frames["printIframe"].document);
			temp.find("tr td div[id='" + cartype + "'] img").show();
			var tr = $(check[0]).parent().parent();
			var c2 = tr.find("td:eq(6)").html();
			var studytime = "30"; //tr.find("td:eq(7)").html(); //学时
			var stuname = ""; //tr.find("td:eq(3)").html(); //学员姓名
			var accesstor = "";
			var datas = SetHouer;
			datas.SetObj(per);
			var score = T0Back(tr.find("td:eq(10)").html()) || yx;
			//var score = (parseInt(datas.obj.COURSE1.score) + parseInt(datas.obj.COURSE4.score)) / 60;
			var ct = parseInt(datas.obj.COURSE1.ct);
			var print = parseInt(datas.obj.COURSE1.print);
			var dataTemp = {
				"studytime": print,
				"stusiginname": stuname,
				"coachename": accesstor,
				"orgsignname": "",
				"orgstamp": "../assets/img/stamp.png",
				"stmsignname": "",
				"stmstamp": "../assets/img/stamp.png",
				"year": datas.obj.COURSE1.year,
				"month": datas.obj.COURSE1.month,
				"date": datas.obj.COURSE1.date,
				"course": course,
				"type": type
			}
			if (score >= ct) {
				putCourse("Cone", dataTemp, cartype, newtype)
			} else {
				$(".Big-photo-model").modal("hide");
				modal_pop("第一部分有效学时未满不能打印！", "fail");
			}
			//score>=22?putCourse("Cone", dataTemp, cartype):modal_pop("学时！", "fail");
			//putCourse("Cone", dataTemp, cartype);
		}

		post_ajax(url, "get", true, ajaxcallback);
	} else if (type == "course2") {
		var tr = $(check[0]).parent().parent();
		var c2 = tr.find("td:eq(6)").html();
		var studytime = "24"; //tr.find("td:eq(7)").html();
		var stuname = ""; //tr.find("td:eq(3)").html();
		var accesstor = "";
		var dataTemp = {
			"studytime": studytime,
			"stusiginname": stuname,
			"coachename": accesstor,
			"orgsignname": "",
			"orgstamp": "../assets/img/stamp.png",
			"stmsignname": "",
			"stmstamp": "../assets/img/stamp.png",
			"year": y,
			"month": m,
			"date": d,
			"course": course,
			"type": type
		}
		var popcb = function(data) {
			var datas = SetHouer;
			datas.SetObj(data.data);
			dataTemp.year = datas.obj.COURSE2.year;
			dataTemp.month = datas.obj.COURSE2.month;
			dataTemp.date = datas.obj.COURSE2.date;
			var score = parseInt(datas.obj.COURSE2.score) / 60 || yx;
			var ct = parseInt(datas.obj.COURSE2.ct);
			var print = parseInt(datas.obj.COURSE2.print);
			dataTemp.studytime = print;
			if (score >= ct) {
				putCourse("Ctwo", dataTemp, data.data.traintype, newtype); //填充数据
			} else {
				$(".Big-photo-model").modal("hide");
				modal_pop("第二部分有效学时未满不能打印！", "fail");
			}
		}
		preFramePop(message, "打印预览", printcallback); //打印预览弹出窗，指定确定按钮回调函数
		post_ajax(url, "get", true, popcb); //请求数据，完成后执行popcb回调函数
	} else if (type == "course3") {
		var tr = $(check[0]).parent().parent();
		var c2 = tr.find("td:eq(6)").html();
		var studytime = "24"; // tr.find("td:eq(7)").html();
		var stuname = ""; //tr.find("td:eq(3)").html();
		var accesstor = "";
		var dataTemp = {
			"studytime": studytime,
			"stusiginname": stuname,
			"coachename": accesstor,
			"orgsignname": "",
			"orgstamp": "../assets/img/stamp.png",
			"stmsignname": "",
			"stmstamp": "../assets/img/stamp.png",
			"year": y,
			"month": m,
			"date": d,
			"course": course,
			"type": type
		}
		var popcb = function(data) {
			var datas = SetHouer;
			datas.SetObj(data.data);
			dataTemp.year = datas.obj.COURSE3.year;
			dataTemp.month = datas.obj.COURSE3.month;
			dataTemp.date = datas.obj.COURSE3.date;
			var score = parseInt(datas.obj.COURSE3.score) / 60||yx;
			var ct = parseInt(datas.obj.COURSE3.ct);
			var print = parseInt(datas.obj.COURSE3.print);
			dataTemp.studytime = print;
			if (score >= ct) {
				putCourse("Cthree", dataTemp, data.data.traintype, newtype);
			} else {
				$(".Big-photo-model").modal("hide");
				modal_pop("第三部分有效学时未满不能打印！", "fail");
			}
		}
		preFramePop(message, "打印预览", printcallback);
		post_ajax(url, "get", true, popcb);
	} else if (type == "course4") {
		var tr = $(check[0]).parent().parent();
		var c2 = tr.find("td:eq(6)").html();
		var studytime = "24"; // tr.find("td:eq(7)").html();
		var stuname = ""; //tr.find("td:eq(3)").html();
		var accesstor = "";
		var dataTemp = {
			studytime: studytime,
			stusiginname: stuname,
			coachename: accesstor,
			orgsignname: "",
			orgstamp: "../assets/img/stamp.png",
			stmsignname: "",
			stmstamp: "../assets/img/stamp.png",
			year: y,
			month: m,
			date: d,
			course: course,
			type: type
		}
		var popcb = function(data) {
			var datas = SetHouer;
			datas.SetObj(data.data);
			dataTemp.year = datas.obj.COURSE4.year;
			dataTemp.month = datas.obj.COURSE4.month;
			dataTemp.date = datas.obj.COURSE4.date;
			var score = parseInt(datas.obj.COURSE4.score) / 60||yx;
			var ct = parseInt(datas.obj.COURSE4.ct);
			var print = parseInt(datas.obj.COURSE4.print);
			dataTemp.studytime = print;
			if (score >= ct) {
				putCourse("Cfour", dataTemp, data.data.traintype, newtype);
			} else {
				$(".Big-photo-model").modal("hide");
				modal_pop("第四部分有效学时未满不能打印！", "fail");
			}
		}
		preFramePop(message, "打印预览", printcallback);
		post_ajax(url, "get", true, popcb);
	} else if (type == "courseAll") {
		preFramePop(message, "打印预览", printcallback);
		var ajaxcallback = function(data) {
			var per = data.data;
			var tds = $('.td_table tr[name=personinfor] td', window.frames["printIframe"].document);
			tds.find("div[name=stuname]").text(per.name);
			tds.find("div[name=sex]").text(per.sex == "MALE" ? "男" : "女");
			tds.find("div[name=cardnum]").text(per.cardnum);
			tds.find("div[name=signintime]").text(per.signuptime);
			tds.find("div[name=address]").text(per.address);
			tds.find("div[name=commuway]").text(per.mobile);
			if (getIsPhoto()) {
				tds.find("div img[name=stuhead]").show();
				tds.find("div img[name=stuhead]").attr("src", per.fileurl);
			}
			var cartype = data.data.traintype;
			var temp = $('#cartype', window.frames["printIframe"].document);
			temp.find("tr td div[id='" + cartype + "'] img").show();
			var tr = $(check[0]).parent().parent();
			var c2 = tr.find("td:eq(6)").html();
			var studytime1 = "30"; //tr.find("td:eq(7)").html(); //学时
			var studytime2 = "24",
				studytime3 = "24";
			var stuname1 = ""; //tr.find("td:eq(3)").html(); //学员姓名
			var accesstor1 = "";
			var datas = SetHouer;
			datas.SetObj(per);
			var dataTemp1 = {
				studytime: studytime1,
				stusiginname: stuname1,
				coachename: accesstor1,
				orgsignname: "",
				orgstamp: "../assets/img/stamp.png",
				stmsignname: "",
				stmstamp: "../assets/img/stamp.png",
				year: datas.obj.COURSE1.year,
				month: datas.obj.COURSE1.month,
				date: datas.obj.COURSE1.date,
				course: "COURSE1",
				type: "personinfo"
			}
			var dataTemp2 = {
				studytime: studytime2,
				stusiginname: stuname1,
				coachename: accesstor1,
				orgsignname: "",
				orgstamp: "../assets/img/stamp.png",
				stmsignname: "",
				stmstamp: "../assets/img/stamp.png",
				year: datas.obj.COURSE2.year,
				month: datas.obj.COURSE2.month,
				date: datas.obj.COURSE2.date,
				course: "COURSE2",
				type: "course2"
			}
			var dataTemp3 = {
				studytime: studytime3,
				stusiginname: stuname1,
				coachename: accesstor1,
				orgsignname: "",
				orgstamp: "../assets/img/stamp.png",
				stmsignname: "",
				stmstamp: "../assets/img/stamp.png",
				year: datas.obj.COURSE3.year,
				month: datas.obj.COURSE3.month,
				date: datas.obj.COURSE3.date,
				course: "COURSE3",
				type: "course3"
			}
			var score1 = parseInt(datas.obj.COURSE1.score) / 60;
			var ct1 = parseInt(datas.obj.COURSE1.ct);
			var score2 = parseInt(datas.obj.COURSE2.score) / 60;
			var ct2 = parseInt(datas.obj.COURSE2.ct);
			var score3 = parseInt(datas.obj.COURSE3.score) / 60;
			var ct3 = parseInt(datas.obj.COURSE3.ct);
			var print1 = parseInt(datas.obj.COURSE1.print);
			var print2 = parseInt(datas.obj.COURSE2.print);
			var print3 = parseInt(datas.obj.COURSE3.print);
			dataTemp1.studytime = print1;
			dataTemp2.studytime = print2;
			dataTemp3.studytime = print3;
			if (score1 >= ct1) {
				putCourse("Cone", dataTemp1, cartype, newtype)
			} else {
				$(".Big-photo-model").modal("hide");
				modal_pop("第一部分有效学时未满不能打印！", "fail");
			}
			if (score2 >= ct2) {
				putCourse("Ctwo", dataTemp2, data.data.traintype, newtype);
			} else {
				$(".Big-photo-model").modal("hide");
				modal_pop("第二部分有效学时未满不能打印！", "fail");
			}
			if (score3 >= ct3) {
				putCourse("Cthree", dataTemp3, data.data.traintype, newtype);
			} else {
				$(".Big-photo-model").modal("hide");
				modal_pop("第三部分有效学时未满不能打印！", "fail");
			}
		}
		post_ajax(url, "get", true, ajaxcallback);
	} else if (type == "EndPositive") {
		var tr = $(check[0]).parent().parent();
		var StartDate = (tr.find("td:eq(7)").html().split(" ")[0]).split("-");
		var ToData = new Date();
		var yeares = ToData.getFullYear();
		var month = ToData.getMonth() + 1;
		var day = ToData.getDate();
		var data = {
			cardnum: tr.find("td:eq(8)").html(),
			stuname: tr.find("td:eq(3)").html(),
			stusex: tr.find("td:eq(4)").html(),
			startyear: StartDate[0],
			startmonth: StartDate[1],
			startday: StartDate[2],
			endyear: yeares,
			endmonth: month,
			endday: day,
			cartype: tr.find("td:eq(6)").html(),
			school: _cookie.brschname,
			sendyear: yeares,
			sendmonth: month,
			sendday: day
		};
		var popcb = function() {
			putDataEndPositive(data); //填充数据
		}
		graid !== "null" ? function() {
			preFramePop_1(message, "打印预览", printcallback);
			post_ajax("/rmwebapp/sch/brsch/student/graduation-" + graid, "get", true, popcb)
		}() : modal_pop("学员还未结业！", "fail");
	} else
	if (type == "EndBack") {
		preFramePop_1(message, "打印预览", printcallback);
	} else if (type == "Register") {
		var tr = $(check[0]).parent().parent();
		var isPrint = tr.find("td:eq(8)").html();
		var popcb = function(data) {
			var per = data.data,
				tds = $('.td_table tr[name=personinfor] td', window.frames["printIframe"].document),
				caption = $('.td_table caption', window.frames["printIframe"].document),
				singObj = Utils.getSchoolSignObj();

			tds.find("div[name=stuname]").text(per.student.personinfo.name);
			tds.find("div[name=sex]").text(per.student.personinfo.sex == "MALE" ? "男" : "女");
			tds.find("div[name=cardnum]").text(per.student.personinfo.cardnum);
			tds.find("div[name=birthday]").text(per.student.personinfo.birthday);
			tds.find("div[name=signintime]").text(per.student.signuptime);
			tds.find("div[name=address]").text(per.student.personinfo.address);
			tds.find("div[name=commuway]").text(per.student.personinfo.mobile);
			tds.find("div[name=perdritype]").text(per.student.perdritype);
			tds.find("div[name=jy]").text(y + "-" + m + "-" + d);
			tds.find("span[name=qz]").text(y + "年" + m + "月" + d + "日");
			tds.find("div[name=grantdate]").text(per.grantdate);
			tds.find("div[name=no]").text(per.gracertnum);
			caption.find("span[name=no]").text(per.gracertnum);
			caption.find("span[name=school]").text(per.student.brsch.name);

			if (getIsPhoto()) {
				tds.find("div img[name=stuhead]").show();
				tds.find("div img[name=stuhead]").attr("src", per.student.personinfo.file.fileurl);
			}
			if (singObj.orgstamp != '') {
				tds.find("div img[name=orgstamp]").show();
				tds.find("div img[name=orgstamp]").attr("src", singObj.orgstamp);
			}
			var cartype = per.student.traintype;
			cartype != "" ? tds.find("div[id='ptys'] img").show() : tds.find("div[id='ptys'] img").hide();
			tds.find("div div[id='" + cartype + "'] img").show();
		}
		var princallbacks = function() {
			printPreview(type);
			$.ajax({
				url: "/rmwebapp/sch/brsch/student/graduation-" + graid,
				type: "put",
				async: false,
				contentType: "application/json",
				success: function(Data) {},
				cache: false,
				timeout: 20000,
				error: function(errObj, resu) {
					Ajax_Error(errObj);
				}
			});

		};
		if (isPrint == "") {
			tr.find("td:eq(11) a").trigger('click');
			return true;
		}
		preFramePop(message, "打印预览", princallbacks);
		post_ajax("/rmwebapp/sch/brsch/student/graduation-" + graid, "get", true, popcb);
	}
}

//打印预约列表
function printStuOrderList() {
	var message = '<iframe name="printIframe" src="print/printStuOrderList.html" style="width:100%;height:100%;border:none"></iframe>';
	var printcallback = function() {
		window.frames["printIframe"].print();
	}
	preFramePop(message, "打印预览", printcallback);
}

//打印约考列表
function printTrainingOrderList() {
	var message = '<iframe name="printIframe" src="print/printTrainingOrderList.html" style="width:100%;height:100%;border:none"></iframe>';
	var printcallback = function() {
		window.frames["printIframe"].print();
	}
	preFramePop(message, "打印预览", printcallback);
}

function preFramePop(message, title, printCallBack) {

	bootbox.dialog({
		message: message,
		title: title,
		className: "modal-darkorange Big-photo-model",
		buttons: {
			success: {
				label: "确认",
				className: "btn-primary",
				callback: function() {
					printCallBack();
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

function preFramePop_1(message, title, printCallBack) {

	bootbox.dialog({
		message: message,
		title: title,
		className: "modal-darkorange small-photo-model",
		buttons: {
			success: {
				label: "确认",
				className: "btn-primary",
				callback: function() {
					printCallBack();
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

function putDataEndPositive(data) {
	var div = $(".pagescontainer", window.frames["printIframe"].document);
	div.find("span[name=cardnum]").text(data.cardnum);
	div.find("span[name=stuname]").text(data.stuname);
	div.find("span[name=stusex]").text(data.stusex);
	div.find("span[name=startyear]").text(data.startyear);
	div.find("span[name=startmonth]").text(data.startmonth);
	div.find("span[name=startday]").text(data.startday);
	div.find("span[name=endyear]").text(data.endyear);
	div.find("span[name=endmonth]").text(data.endmonth);
	div.find("span[name=endday]").text(data.endday);
	div.find("span[name=cartype]").text(data.cartype);
	div.find("span[name=school]").text(data.school);
	div.find("span[name=sendyear]").text(data.sendyear);
	div.find("span[name=sendmonth]").text(data.sendmonth);
	div.find("span[name=sendday]").text(data.sendday);
}

//获取是否打印头像
function getIsPhoto() {
	var schoolid = _cookie.schoolid;
	switch (schoolid) {
		case "183":
			return true;
			break;
		default:
			return true;
			break
	}

}

//获取对象的章
function getSign(obj) {
	var schoolid = _cookie.schoolid,
		orgstamp = '',
		newPrint = (obj.newtype == "newPrint"),
		widths, heights, m_top, m_left;
	switch (schoolid.toString()) {
		case "183":
			orgstamp = '../assets/img/schoolsign/sdxtjx.png';
			obj.dataObj.orgsignname1 = "黄婉锋";
			obj.dataObj.orgsignname2 = "谢淑贞";
			obj.dataObj.orgsignname3 = "谢淑贞";
			obj.dataObj.orgsignname4 = "谢淑贞";
			GetName(obj);
			break;
		case "178":
			orgstamp = '../assets/img/schoolsign/sdyfjx.png';
			obj.dataObj.orgsignname1 = "何凤女";
			obj.dataObj.orgsignname2 = "何柱金";
			obj.dataObj.orgsignname3 = "何柱金";
			obj.dataObj.orgsignname4 = "何柱金";
			GetName(obj);
			break;
		case "12":
			orgstamp = '../assets/img/schoolsign/sdxxl.png';


			obj.dataObj.orgsignname1 = "刘惠娴";
			obj.dataObj.orgsignname2 = "赵文意";
			obj.dataObj.orgsignname3 = "肖楚慧";
			obj.dataObj.orgsignname4 = "肖楚慧";

			obj.dataObj.coachename2 = "孔宪权";
			obj.dataObj.coachename3 = "罗裕成";
			obj.dataObj.coachename4 = "罗裕成";
			GetName(obj);
			break;
		case "182":
			orgstamp = '../assets/img/schoolsign/sdqxyjx.png';
			obj.dataObj.orgsignname1 = "林新蕊";
			obj.dataObj.orgsignname2 = "凌梓健";
			obj.dataObj.orgsignname3 = "辛楚芬";
			obj.dataObj.orgsignname4 = "辛楚芬";

			obj.dataObj.coachename2 = "黄永生";
			obj.dataObj.coachename3 = "黄永生";
			obj.dataObj.coachename4 = "黄永生";
			GetName(obj);
			break;
		case "185":
			if (obj.traintype == "A1") {
				orgstamp = '../assets/img/schoolsign/sddljx.png';
				widths = '125px';
				heights = '125px';
				if (!newPrint) {
					m_left = '70px';
					m_top = '-29px';
				} else {
					widths = '118px';
					heights = '118px';
				}
			} else {
				orgstamp = '../assets/img/schoolsign/sdjgjx.png';
				widths = '220px';
				heights = '100px';
				if (!newPrint) {
					m_left = '45px';
					m_top = '-18px';
				} else {
					widths = '220px';
					heights = '100px';
					m_left = '-70px';
					m_top = '-83px';
				}
			}
			obj.dataObj.orgsignname1 = "李春华";
			obj.dataObj.orgsignname2 = "冯萍";
			obj.dataObj.orgsignname3 = "冯萍";
			obj.dataObj.orgsignname4 = "冯萍";
			obj.dataObj.coachename1 = "网上学习";
			obj.dataObj.coachename2 = "范耀辉";
			obj.dataObj.coachename3 = "李达明";
			obj.dataObj.coachename4 = "李达明";
			GetName(obj);
			break;
		case "176":
			orgstamp = '../assets/img/schoolsign/mht.png';
			obj.dataObj.orgsignname1 = "毛焕庭";
			obj.dataObj.orgsignname2 = "毛焕庭";
			obj.dataObj.orgsignname3 = "毛焕庭";
			obj.dataObj.orgsignname4 = "毛焕庭";
			GetName(obj);
			break;
		case "175":
			orgstamp = '../assets/img/schoolsign/sdxyjx.png';
			widths = '125px';
			heights = '125px';
			if (!newPrint) {
				m_left = '70px';
				m_top = '-29px';
			} else {
				widths = '118px';
				heights = '118px';
			}
			obj.dataObj.orgsignname1 = "王智兰";
			obj.dataObj.orgsignname2 = "王智兰";
			obj.dataObj.orgsignname3 = "王智兰";
			obj.dataObj.orgsignname4 = "王智兰";
			obj.dataObj.coachename2 = "王勇";
			obj.dataObj.coachename3 = "王勇";
			obj.dataObj.coachename4 = "王勇";
			GetName(obj);
			break;
		case "172":
			orgstamp = '../assets/img/schoolsign/sdbjjx.png';
			widths = '240px';
			heights = '100px';
			if (!newPrint) {
				m_left = '40px';
				m_top = '-20px';
			} else {
				m_left = '-90px';
				m_top = '-75px';
			}
			obj.dataObj.orgsignname1 = "刘春丽";
			obj.dataObj.orgsignname2 = "赵良坤";
			obj.dataObj.orgsignname3 = "赵良坤";
			obj.dataObj.orgsignname4 = "赵良坤";
			GetName(obj);
			break;
		case "171":
			orgstamp = '../assets/img/schoolsign/sdbcjx.png';
			widths = '240px';
			heights = '100px';
			if (!newPrint) {
				m_left = '40px';
				m_top = '-20px';
			} else {
				m_left = '-90px';
				m_top = '-75px';
			}
			obj.dataObj.orgsignname1 = "刘春丽";
			obj.dataObj.orgsignname2 = "赵良坤";
			obj.dataObj.orgsignname3 = "赵良坤";
			obj.dataObj.orgsignname4 = "赵良坤";
			GetName(obj);
			break;
		case "179":
			orgstamp = '../assets/img/schoolsign/sdjcfjx.png';
			widths = '240px';
			heights = '90px';
			if (!newPrint) {
				m_left = '40px';
				m_top = '-18px';
			} else {
				m_left = '-90px';
				m_top = '-72px';
			}
			obj.dataObj.orgsignname1 = "胡玉珊";
			obj.dataObj.orgsignname2 = "胡玉珊";
			obj.dataObj.orgsignname3 = "陈楚莹";
			obj.dataObj.orgsignname4 = "陈楚莹";
			GetName(obj);
			break;
		case "189":
			orgstamp = '../assets/img/schoolsign/sdjxjx.png';
			widths = '125px';
			heights = '125px';
			if (!newPrint) {
				m_left = '70px';
				m_top = '-29px';
			} else {
				widths = '120px';
				heights = '120px';
			}
			// obj.dataObj.orgsignname1 = "潘耀华";
			//obj.dataObj.orgsignname2 = "潘耀华";
			//obj.dataObj.orgsignname3 = "潘耀华";
			//GetName(obj);
			break;
		case "173":
			orgstamp = '../assets/img/schoolsign/sddljx.png';
			widths = '125px';
			heights = '125px';
			if (!newPrint) {
				m_left = '70px';
				m_top = '-29px';
			} else {
				widths = '118px';
				heights = '118px';
			}
			obj.dataObj.orgsignname1 = "潘耀华";
			obj.dataObj.orgsignname2 = "潘耀华";
			obj.dataObj.orgsignname3 = "潘耀华";
			obj.dataObj.orgsignname4 = "潘耀华";
			GetName(obj);
			break;
		case "188":
			orgstamp = '../assets/img/schoolsign/sdrgjx.png';
			widths = '125px';
			heights = '125px';
			if (!newPrint) {
				m_left = '70px';
				m_top = '-29px';
			} else {
				widths = '120px';
				heights = '120px';
			}
			obj.dataObj.orgsignname1 = "刘耀华";
			obj.dataObj.orgsignname2 = "高文杰";
			obj.dataObj.orgsignname3 = "何锦盛";
			obj.dataObj.orgsignname4 = "何锦盛";
			GetName(obj);
			break;
		case "184":
			orgstamp = '../assets/img/schoolsign/sdcfjx.png';
			widths = '140px';
			heights = '140px';
			if (!newPrint) {
				m_left = '70px';
				m_top = '-33px';
			} else {
				widths = '130px';
				heights = '130px';
			}
			obj.dataObj.coachename1 = "何冠民";
			obj.dataObj.coachename2 = "何冠民";
			obj.dataObj.coachename3 = "何冠民";
			obj.dataObj.coachename4 = "何冠民";
			GetName(obj);
			break;
		case "181":
			orgstamp = '../assets/img/schoolsign/sdrjjx.png';
			widths = '260px';
			heights = '140px';
			if (!newPrint) {
				m_left = '30px';
				m_top = '-35px';
			} else {
				m_left = '-95px';
				m_top = '-96px';
			}
			obj.dataObj.orgsignname1 = "罗丽芬";
			obj.dataObj.orgsignname2 = "罗丽芬";
			obj.dataObj.orgsignname3 = "罗丽芬";
			obj.dataObj.orgsignname4 = "罗丽芬";
			obj.dataObj.coachename2 = "陈礼元";
			obj.dataObj.coachename3 = "罗志标";
			obj.dataObj.coachename4 = "罗志标";
			GetName(obj);
			break;
		case "180":
			orgstamp = '../assets/img/schoolsign/sdjfjx.png';
			widths = '150px';
			heights = '150px';
			if (!newPrint) {
				m_left = '70px';
				m_top = '-70px';
			} else {
				widths = '145px';
				heights = '145px';
				m_left = '-70px';
				m_top = '-100px';
			}
			break;
		case "177":
			orgstamp = '../assets/img/schoolsign/sdyzjx.png';
			widths = '128px';
			heights = '128px';
			if (!newPrint) {
				m_left = '70px';
				m_top = '-30px';
			} else {
				widths = '120px';
				heights = '120px';
			}
			obj.dataObj.orgsignname1 = "廖婉玲";
			obj.dataObj.orgsignname2 = "潘叶帮";
			obj.dataObj.orgsignname3 = "潘叶帮";
			obj.dataObj.orgsignname4 = "潘叶帮";
			GetName(obj);
			break;
		case "174":
			orgstamp = '../assets/img/schoolsign/sdgjjx.png';
			widths = '200px';
			heights = '100px';
			if (!newPrint) {
				m_left = '60px';
				m_top = '-20px';
			} else {
				m_left = '-80px';
				m_top = '-80px';
			}
			obj.dataObj.orgsignname1 = "陈丽均";
			obj.dataObj.orgsignname2 = "黄瑞燕";
			obj.dataObj.orgsignname3 = "陈志玲";
			obj.dataObj.orgsignname4 = "陈志玲";
			GetName(obj);
			break;
	}
	widths != undefined ? obj.tds.find("span div img[name=orgstamp]").css('width', widths) : "";
	heights != undefined ? obj.tds.find("span div img[name=orgstamp]").css('height', heights) : "";
	m_top != undefined ? obj.tds.find("span div img[name=orgstamp]").css('margin-top', m_top) : "";
	m_left != undefined ? obj.tds.find("span div img[name=orgstamp]").css('margin-left', m_left) : "";

	if (orgstamp != '') {
		//obj.tds.find("span div[name=orgsignname]").text(obj.dataObj.orgsignname); //培训单位签名
		obj.tds.find("span div[name=orgyear]").text(obj.dataObj.year);
		obj.tds.find("span div[name=orgmonth]").text(obj.dataObj.month);
		obj.tds.find("span div[name=orgdate]").text(obj.dataObj.date);
		obj.tds.find("span div img[name=orgstamp]").show();
		obj.tds.find("span div img[name=orgstamp]").attr("src", orgstamp);
	}
}

function GetName(obj) {
	var orgsignname, coachename;
	var getname = function(type) {
		if (type == "personinfo") {
			orgsignname = obj.dataObj.orgsignname1;
			coachename = "网上学习"; //obj.dataObj.coachename1;
		} else if (type == "course2") {
			orgsignname = obj.dataObj.orgsignname2;
			coachename = obj.dataObj.coachename2;
		} else if (type == "course3") {
			orgsignname = obj.dataObj.orgsignname3;
			coachename = obj.dataObj.coachename3;
		} else if (type == "course4") {
			orgsignname = obj.dataObj.orgsignname4 || "";
			coachename = obj.dataObj.coachename4 || "";
		}
	}
	getname(obj.dataObj.type);

	obj.tds.find("span div[name=coachename]").text(coachename); //教员签名
	obj.tds.find("span div[name=orgsignname]").text(orgsignname); //培训单位签名
	obj.tds.find("span div[name=coacheyear]").text(obj.dataObj.year);
	obj.tds.find("span div[name=coachemonth]").text(obj.dataObj.month);
	obj.tds.find("span div[name=coachedate]").text(obj.dataObj.date);

}