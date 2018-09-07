$(function() {
	// 收展培训日志事件
	$('#dt').off('click.rowDetails').on('click.rowDetails', '.row-details', function(event) {
		var $this = $(this),
			$ptd = $this.closest('td'),
			$ptr = $ptd.closest('tr'),
			$ntr = $ptr.next('tr'),
			$unexportTr = null,
			$innerTbody = null,
			listStrArray = [],
			stuid = $this.data('stuid');
		reqUrl = '/rmwebapp/sch/brsch/student-' + stuid + '/trcRec?id=' + $this.data('recid');

		$ptd.find('.row-details').toggleClass('hidden');
		$ptr.next('tr').hasClass('unexport') ? '' : $ptr.after(DomStrDb.getStudyTimeTpl());
		$unexportTr = $ptr.next('tr');
		$innerTbody = $unexportTr.find('table tbody');

		$unexportTr.is(":hidden") ? PageUtils.getJson2(reqUrl, function(list) {
			if (list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					listStrArray.push(getRecTrTpl(list[i]).data('stuid', stuid));
				}
				$innerTbody.empty().append(listStrArray);
			}
			$unexportTr.show(0, function() {
				typeof(resetView) == "function" && resetView();
			});

		}) : $unexportTr.hide(0, function() {
			typeof(resetView) == "function" && resetView(3);
		});

	});

	//培训日志列表操作事件
	$('#dt').on('click', 'td[name="opt"]', function(event) {
		var $tg = $(event.target),
			$closetTr = $tg.closest('tr'),
			recItem = $closetTr.data('listItem'),
			stuid = $closetTr.data('stuid');

		if ($tg.hasClass('fa-retweet active')) { //备案
			doBa(recItem, $tg);
		}
		event.stopPropagation();
	});
	//培训日志列表行点击事件
	$('#dt').on('click', 'tr.unexport table>tbody>tr', function(event) {
		var recItem = $(this).data('listItem'),
			stuid = $(this).data('stuid');

		stuid ? StudenModel(stuid, recItem) : '';
	});
	//大图事件
	$(document).on('click', '#photo ul li>img', function(event) {
		showBigImg(event.target);
		event.preventDefault();
	});

});


/**
 * 备案 
 * by Mark
 * @param  {Obj} recItem 日志行数据
 * @param  {Jquery} $btn    点击的操作按钮
 */
function doBa(recItem, $btn) {
	Utils.sendAjax({
		url: IP + "/rmwebapp/uploadrec",
		type: "post",
		data: {
			"did": recItem.trid,
			"srvname": "extclassrecord",
			"phase": 1
		},
		callbacktype: "call",
		callback: function(data) {
			if (Utils.errorCode(data)) {
				$btn.removeClass('active').closest('tr').find('td[name="record"]').html('<span class="success-info-ms">已备案</span>');
			} else {
				modal_pop("备案失败!" + (data.message == null ? "" : "," + data.message), "fail");
			}
		}
	});
}
/**
 * 科目一四模态框内违规学时行 
 * by Mark
 * @param  {Object} listItem json行数据
 * @return {String}          Html行字符串
 */
function getInvalideTimeTpl(listItem) {
	return trStr = PageUtils.makeRow({
		"short": "",
		"type": (listItem['type'] == "stuMultyLoginStudy" ? "重复登陆" : "超过每日限制学时"),
		"count": TM(listItem['count']),
		"timestart": listItem['timestart'],
		"timeend": listItem['timeend']
	});
}
/**
 * 培训记录行
 * by Mark
 * @param  {Object} listItem json行数据
 * @return {Jquery}          jquery元素
 */
function getRecTrTpl(listItem) {
	var optStr = '',
		record = listItem['record'],
		recordStr = '',
		trStr = '';

	if (record == 'FAILED') {
		optStr += '<i class="fa fa-retweet active" title="重新备案"></i>';
		recordStr = '<span class="fail-info-ms">未备案</span>'
	} else {
		optStr += '<i class="fa fa-retweet"></i>';
		recordStr = '<span class="success-info-ms">已备案</span>';
	}

	trStr = PageUtils.makeRow({
		"stuname": listItem['stuname'],
		"coaname": listItem['coaname'],
		"subject": listItem['subject'],
		"totalcount": TM(listItem['totalcount']),
		"count": TM(listItem['count']),
		"maxspeed": listItem['maxspeed'].toString(),
		"mileage": listItem['mileage'].toString(),
		"phase": getCourse(listItem['phase']),
		"timestart": listItem['timestart'],
		"timeend": listItem['timeend'],
		"record": recordStr,
		"opt": optStr,
	});
	return $(trStr).attr('title', '点击查看详情').data('listItem', listItem);
};
/**
 * 模态框每分钟培训列表行
 * by Mark
 * @param  {Object} listItem json行数据
 * @return {String}          Html行字符串
 */
function get1MinuteTpl(listItem) {
	var isAccUpload = ["未审核", "已审核", "审核失败"];
	return PageUtils.makeRow({
		"checkbox": '<input type="checkbox" name="checkClass" class="checkClass" style="margin-top: -3px !important;"' + ' value="' + listItem['id'] + '"  />',
		"short": "",
		"rectime": listItem['rectime'],
		"stuname": listItem['stuname'],
		"coaname": listItem['coaname'],
		"subject": listItem['subject'],
		"mileage1": listItem['enginespeed'] + "", //过检
		"mileage2": listItem['maxspeed'] + "", //过检
		"mileage3": listItem['state'] == 0 ? "正常" : "异常", //过检
		"mileage": listItem['mileage'] + "", //过检
		"maxspeed": listItem['maxspeed'] + "", //过检
		"invalidtype": getOk(listItem['invalidtype']),
		//"invalidtype1": getOk_1(listItem['invalidtype']), //过检
		//"stuMultyLoginStudy": getOk(listItem['stuMultyLoginStudy']),
		//"exceedTime": getOk(listItem['exceedTime']),
		//"invalidTimePeriod": getOk(listItem['invalidTimePeriod']),
		//"enginespeedEq0": getOk(listItem['enginespeedEq0']),
		//"serialspeedEq0": getOk(listItem['serialspeedEq0']),
		//"serialMileageEq0": getOk(listItem['serialMileageEq0']),
		//"photoMiss": getOk(listItem['photoMiss']),
		//"totalMileagelt100": getOk(listItem['totalMileagelt100']),
		"isAccUpload": isAccUpload[listItem['isAccUpload']],
		"invalidtype1": getOk_1(listItem['invalidtype']), //过检
		"accFailReason": "<span class='editacc' style='cursor:pointer;' title='修改审核原因'>" + (listItem['failReason'] || "") + "</span>",
		"id": "<i class='fa  fa-picture-o hidden' data-img=''  style='cursor:pointer;color:#5a87ca' title='点击查看图片'></i>" +
			"<i class='fa fa-ban' data-acc='" + listItem['id'] + "' data-rectime='" + listItem['rectime'] + "' style='color:#F00;cursor:pointer;' title='学时审核'></i>",
	});
}

function StudenModel(stuid, recItem) {
	var is2Or3 = (recItem.phase == 'COURSE2' || recItem.phase == 'COURSE3'),
		innerHtml = studenModelHtm(is2Or3);

	bootbox.dialog({
		message: innerHtml,
		title: "电子教学日志",
		className: "modal-darkorange Big-model",
		buttons: {
			"关闭": {
				className: "btn-warning",
				callback: function() {

				}
			}
		}
	});

	$("#studyTimeTb").on("click", "[data-acc]", function() {
		hourObj.setNoacc(this);
	});
	$("#studyTimeTb").on("click", "[data-img]", function() {
		hourObj.bigImg(this);
	});

	$("#studyTimeDiv").on("click", ".allCheck", function() {
		$("input[name='checkAll']").click();
	});
	$("#studyTimeDiv").on("click", ".unCheck", function() {
		var $inputArr = $("#studyTimeTb").find("input[name=checkClass]");
		$inputArr.each(function(index, el) {
			$(el).prop("checked", !$(el).is(":checked"));
		});
	});
	$("#studyTimeDiv").on("click", ".pass", function() {
		hourObj.setNoacc(undefined, "pass");
	});
	$("#studyTimeDiv").on("click", ".unpass", function() {
		hourObj.setNoacc(undefined, "unpass");
	});

	$("#studyTimeTb").on("click", ".editacc", function() {
		hourObj.editacc(this);
	});

	showDetaile(stuid, recItem.trid).done(function(Data) {
		if (is2Or3) { //科目二三
			show1MinuteList(stuid, recItem.classid).done(function() {
				hourObj.showImg(Data);
			});
		} else { //科目一四
			if (recItem["totalcount"] == recItem["count"]) {
				return
			};
			showInvalideTimeList(stuid, recItem.thjonlnum); //违规记录
		}
	});


}

function showInvalideTimeList(stuid, thjonlnum) {
	var reqUrl = '/rmwebapp/sch/brsch/student-' + stuid + '/invalidrec/' + thjonlnum,
		$tmpTr = null,
		tmpArray = [];

	PageUtils.getJson(reqUrl, function(list) {
		for (var i = 0; i < list.length; i++) {
			$tmpTr = $(getInvalideTimeTpl(list[i]));
			$tmpTr.find('td[name="short"]').html(i + 1);
			tmpArray.push($tmpTr);
		}
		$('#studyTimeTb tbody').empty().append(tmpArray);
	});
}

function showPhotoList(fileList) {
	var htmlStr = '',
		$photoContainer = $('#photo'),
		innerWidth = $photoContainer.width(),
		containerWidth = 0;
	photoNum = 0,
		length1 = fileList.length,
		Max = 100, //大于此数目的照片量，不处理！
		reason = {
			"17": "学员登陆",
			"18": "学员退出",
			"0": "过程抓拍",
			"19": "立即拍照",
			"5": "定时拍照",
			"20": "学员头像"
		}; //过检
	if (length1 === 0 || length1 > Max) {
		return $photoContainer;
	}
	//htmlStr += '<i class="fa fa-angle-double-left fa-3x prev"></i>';
	htmlStr += '<div class="warp-inner"><div class="photo-container"><ul >';
	for (var i = 0; i < length1; i++) {
		htmlStr += '<li ><img src="' + fileList[i]['path'] + '" title="点击查看大图" width="145px" height="153px">';
		htmlStr += fileList[i]["reason"] ==undefined ?"":'<p class="gundiv_li_p">' + reason[fileList[i]["reason"]] + '</p>'; //过检
		htmlStr += '<p class="gundiv_li_p">' + (fileList[i]["time"] || fileList[i]["gps"]["time"]) + '</p>';
		htmlStr += '<p class="gundiv_li_p">' + (typeof fileList[i]["score"] === "number" ? fileList[i]["score"] : '') + '</p></li>';
	}
	htmlStr += '</ul></div></div>';
	//htmlStr += '<i class="fa fa-angle-double-right fa-3x next"></i>';
	$photoContainer.html(htmlStr);
	photoNum = parseInt(innerWidth / 145, 10);

	containerWidth = $photoContainer.find('.photo-container').jCarouselLite({
		btnNext: ".next",
		btnPrev: ".prev",
		visible: photoNum,
		mouseWheel: true,
		circular: false,
		scroll: 3
	}).width();

	$photoContainer.find('.warp-inner').width(containerWidth + 'px');
	return $photoContainer.addClass('hs-border-ms');
}

function show1MinuteList(stuid, classid) {
	var reqUrl = '/rmwebapp/sch/brsch/student-' + stuid + '/trcRec-' + classid + '/1/0',
		$tmpTr = null,
		tmpArray = [];
	$('#studyTimeTb tbody').data("id", {
		stuid: stuid,
		classid: classid
	});
	return PageUtils.getJson(reqUrl, function(list) {
		var length = list.length;
		if (length === 0) {
			return;
		}
		for (var i = 0; i < length; i++) {
			$tmpTr = $(get1MinuteTpl(list[i]));
			$tmpTr.find('td[name="short"]').html(i + 1);
			tmpArray.push($tmpTr);
		}
		$('#studyTimeTb tbody').empty().append(tmpArray);
	});
}

function showDetaile(stuid, trcRecSta) {
	var reqUrl = '/rmwebapp/sch/brsch/student-' + stuid + '/trcRecSta-' + trcRecSta;
	return PageUtils.getJson2(reqUrl, function(data) {
		try {
			$("#stuimg").attr("src", data.trc.student.personinfo.file.fileurl)
			$("span[name=schname]").html(data.trc.student.brsch.name);
			$("span[name=traintype]").html(data.trc.student.traintype);
			$("span[name=stuname]").html(data.trc.student.personinfo.name);
			$("span[name=code]").html(data.trc.student.code);
			$("span[name=timestart]").html((data.trc.timestart).split(" ")[0]);
			$("span[name=times]").html((data.trc.timestart).split(" ")[1] + " 至 " + (data.trc.timeend).split(" ")[1]);

			if (data.trc.coach) {
				$("span[name=coachname]").html(data.trc.coach.personinfo.name);
			}
			if (data.trc.device) {
				$("span[name=licnum]").html(data.trc.device.devdis.carinfo.licnum);
			}

			$("span[name=pcname]").html(data.pc.name);
			$("span[name=count]").html(TM(data.trc.totalcount));
			$("span[name=coursetotalch]").html(TM(data.coursetotalch));
			$("span[name=coursetotalMileage]").html(data.coursetotalMileage + " 千米");
			$("span[name=course2totalMileage]").html(data.course2totalMileage + " 千米");
			$("span[name=course3totalMileage]").html(data.course3totalMileage + " 千米");
			$("span[name=course1ch]").html(TM(data.course1ch));
			$("span[name=course2ch]").html(TM(data.course2ch));
			$("span[name=course3ch]").html(TM(data.course3ch));
			$("span[name=course4ch]").html(TM(data.course4ch));
			$("span[name=mileage]").html(data.trc.mileage + " 千米");
			$("span[name=avgspeed]").html(data.avgspeed + " 千米/小时");
			$("span[name=carnum]").html(data.trc.student.personinfo.cardnum);
			$("span[name=speedeq0]").html(data.speedeq0 + " 条");
			$("span[name=speedgt5]").html(data.speedgt5 + " 条");
			$("span[name=speedin0to5]").html(data.speedin0to5 + " 条");
			$("span[name=thjonlnum]").html(data.trc.thjonlnum);
			$("span[name=passtime]").html(TM(data.trc.count)); //合格学时
			$("span[name=unpasstime]").html(TM(data.trc.totalcount - data.trc.count)); //不合格学时
			var totalcount = data.trc.totalcount,
				count = data.trc.count,
				scount = data.trc.count * 4 / 3;
			$("span[name=oktime]").html(TM(count / totalcount >= 0.75 ? totalcount : scount)); //认可学时
			
			$("span[name=acccount]").html(TM(data.trc.acccount)); 

			data.fileList.unshift({
				"gps": {
					"time": ""
				},
				"path": data.trc.student.personinfo.file.fileurl,
				"reason": 20
			}); //过检
			data.imgList ?
				showPhotoList($.merge(data.fileList, data.imgList)) :
				showPhotoList(data.fileList); //显示照片
		} catch (e) {
			console.error('studyTime.js --> showDetaile():' + e);
		}
	});
}
//遮罩html
function ObstructHtml() {
	var html = '';
	html = '<div id="Obstruct" style="width:100%;height:100%;position:absolute;z-index:999999;text-align:center;"><img src="/rmwebapp/pages/assets/img/loading.gif" style="height:35px;width:35px;margin-top:20%;"/></div>';
	return html;
}

var createMask = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	};
}(function() {
	var div = document.createElement('div');
	var img = document.createElement('img');
	div.onclick = function() {
		div.style.display = 'none';
	};
	img.onclick = function() {
		div.style.display = 'none';
		this.setAttribute('class', '');
	};
	div.appendChild(img);
	div.setAttribute('class', 'BigImgMask');
	div.setAttribute('title', '点击图片或空白处关闭');
	return document.body.appendChild(div);
});

//大图
function showBigImg(t) {
	var $bimg = $(createMask());
	$bimg.html('<img src=""/>');
	$bimg.show().find('img').attr('src', t.src).addClass('visited');
}

function studenModelHtm(is2Or3) {
	var topBody = '',
		foosBody = '';
	topBody = '<div class="form-title"><h5 class="row-title">学员培训信息</h5></div>' +
		'<table style="margin-bottom: 8px;" class="table table-bordered table-hover dataTable no-footer">' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">培训机构</td><td colspan="3" style="width: 300px;"><span name="schname">培训机构</span></td>' +
		'<td rowspan="4" ><img id="stuimg" src="" style="height: 120px;"/></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">学员姓名</td><td  style="color: #024BB5;"><span name="stuname">学员姓名</span></td>' +
		'<td style="text-align: right;font-weight: bold;">身份证号</td><td ><span name="carnum">身份证号</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">全国统一编号</td><td style="color: #024BB5;"><span name="code">全国统一编号</span></td>' +
		'<td style="text-align: right;font-weight: bold;">带教教练员</td><td style="color: #024BB5;"><span name="coachname">带教教练员</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">培训时间</td><td><span name="timestart">培训时间</span></td>' +
		'<td style="text-align: right;font-weight: bold;">培训时段</td><td><span name="times">培训时段</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">教练车牌</td><td style="color: #024BB5;"><span name="licnum">教练车牌</span></td>' +
		'<td style="text-align: right;font-weight: bold;">车型</td><td colspan="2"><span name="traintype">车型</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">总里程</td><td style="color: #024BB5;"><span name="coursetotalMileage">总里程</span></td>' +
		'<td  colspan="" style="text-align: right;font-weight: bold;">总累计学时</td><td colspan="2"><span name="coursetotalch">总累计学时</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">本次培训内容</td><td><span name="pcname">本次培训内容</span></td>' +
		'<td style="text-align: right;font-weight: bold;">法律法规和相关知识累计学时</td><td colspan="2"><span name="course1ch">法律法规和相关知识累计学时</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">本次培训学时</td><td><span name="count">本次培训学时</span></td>' +
		'<td style="text-align: right;font-weight: bold;">基础和项目驾驶累计学时</td><td colspan="2"><span name="course2ch">基础和项目驾驶累计学时</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">本次培训行驶里程</td><td><span name="mileage">本次培训行驶里程</span></td>' +
		'<td style="text-align: right;font-weight: bold;">道路驾驶累计学时</td><td colspan="2"><span name="course3ch">道路驾驶累计学时</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">本次培训平均速度</td><td><span name="avgspeed">本次培训平均速度</span></td>' +
		'<td style="text-align: right;font-weight: bold;">安全文明驾驶常识累计学时</td><td colspan="2"><span name="course4ch">安全文明驾驶常识累计学时</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">基础和项目驾驶总里程</td><td><span name="course2totalMileage">基础和项目驾驶总里程</span></td>' +
		'<td style="text-align: right;font-weight: bold;">道路驾驶总里程</td><td colspan="2"><span name="course3totalMileage">道路驾驶总里程</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">时速等于0km/h的数量</td><td><span name="speedeq0">时速等于0km/h的数量</span></td>' +
		'<td style="text-align: right;font-weight: bold;">时速大于5km/h的数量</td><td colspan="2"><span name="speedgt5">时速大于5km/h的数量</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">时速在0~5km/h的数量</td><td><span name="speedin0to5">时速在0~5km/h的数量</span></td>' +
		'<td style="text-align: right;font-weight: bold;">日志编号</td><td colspan="2"><span name="thjonlnum">日志编号</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">合格学时</td><td><span name="passtime">合格学时</span></td>' +
		'<td style="text-align: right;font-weight: bold;">不合格学时</td><td colspan="2"><span name="unpasstime">不合格学时</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td style="text-align: right;font-weight: bold;">认可学时</td><td><span name="oktime">认可学时</span></td>' +
		'<td style="text-align: right;font-weight: bold;">审核后学时</td><td colspan="2"><span name="acccount">审核后学时</span></td>' +
		'</tr>' +
		'<tr>' +
		'<td colspan="5" style="background-color: #FFF;">' +
		'<button type="button" class="btn btn-default ng-binding " style="margin: 5px 5px;float:right" onclick="hourObj.allImg()"  >查看全部图片</button>' +
		'<div id="photo" style="padding-top: 5px;"><div class="" style="text-align:center;margin-bottom:5px">无培训图片</div></div>' +
		'</td>' +
		'</tr>' +
		'</table>';

	if (is2Or3) {
		foosBody = '<div id="studyTimeDiv" class="form-title"><h5 class="row-title">每分钟培训</h5>' +
			'<button type="button" class="btn btn-default ng-binding allCheck" style="margin-right: 5px;"  >全选/全不选</button>' +
			'<button type="button" class="btn btn-default ng-binding unCheck" style="margin-right: 5px;"  >反选</button>' +
			'<button type="button" class="btn btn-default ng-binding pass" style="margin-right: 5px;"  >合格</button>' +
			'<button type="button" class="btn btn-default ng-binding unpass" style="margin-right: 5px;"  >不合格</button></div>' +
			//'<div style="height:350px;width:100%;overflow:auto">' +
			//'<table id="studyTimeTb" style="margin-bottom: 8px;width:2500px" class="table table-bordered table-hover dataTable no-footer">' +
			'<table id="studyTimeTb" style="margin-bottom: 8px;" class="table table-bordered table-hover dataTable no-footer">' +
			'<thead>' +
			'<tr><th><input type="checkbox" name="checkAll" class="checkClass" style="margin-top: -3px !important;" onchange="setAllCheckbox(\'#studyTimeTb\')" /></th>' +
			'<th>序号</th>' +
			'<th>记录时间</th>' +
			'<th>学员名字</th>' +
			'<th>教练名字</th>' +
			'<th>课程名字</th>' +
			'<th>发动机转速(转/分)</th>' + //过检
			'<th>行驶记录速度(车辆)</th>' + //过检
			'<th>记录状态</th>' + //过检
			'<th>行驶里程(千米)</th>' + //过检
			'<th>最大速度(千米/小时)</th>' + //过检
			'<th>是否违规</th>' +
			//'<th>审核结果</th>' +
			//'<th>是否多设备培训</th>' +
		//	'<th>是否超出每日限制学时</th>' +
			//'<th>是否在无效时段培训</th>' +
			// body += '<th>上传审核状态</th>';
			//body += '<th>审核失败原因</th></tr>';
			//'<th>发动机速度为0</th>' +
			//'<th>连续最大速度为0</th>' +
			//'<th>连续里程为0</th>' +
			//'<th>照片缺失</th>' +
			//'<th>培训总里程小于100米</th>' +
			'<th>审核状态</th>' +
			'<th>审核结果</th>' +
			'<th>备注</th>' +
			'<th>操作</th></tr>' + //过检
			'</thead>' +
			'<tbody>' +
			'<tr>' +
			'<td colspan="24" style="text-aligen:center;">暂无培训记录</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>';
			//'</div>';
	} else {
		foosBody = '<div class="form-title"><h5 class="row-title">违规记录</h5></div>' +
			'<table id="studyTimeTb" style="margin-bottom: 8px;" class="table table-bordered table-hover dataTable no-footer">' +
			'<thead>' +
			'<tr><th>序号</th>' +
			'<th>违规类型</th>' +
			'<th>总计违规时长</th>' +
			'<th>违规开始时间</th>' +
			'<th>违规结束时间</th>' +
			'</thead>' +
			'<tbody>' +
			'<tr>' +
			'<td colspan="5" style="text-aligen:center;">暂无违规记录</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>';
	}

	var str = '<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' +
		topBody +
		foosBody +
		'</form>' +
		'</div>';
	return str;
}


var hourObj = {};
hourObj.setNoacc = function(t, status) {
	var title, trArray, check, Datas = [],
		$td,
		$tr,
		$divObj = $("#studyTimeTb"),
		idObj = $divObj.find("tbody").data("id"),
		spanIndex = 'td:eq(13)',
		accIndex = 'td:eq(14)',
		isPass = false;
	if (t == undefined) {
		trArray = $divObj.find("tbody tr");
		check = trArray.find("td:first-child input").filter(":checked");
		if (check.length > 0) {
			check.each(function(index, el) {
				var $ctr = $(this).parent().parent(),
					cstatus = $ctr.find(spanIndex).text();
				if (status == "pass") {
					if (cstatus == "合格") {
						modal_pop("当前记录审核结果为【合格】，请选择审核结果为【不合格】的记录", "fail");
						isPass = true;
						return false;
					}
				} else {
					if (cstatus == "不合格") {
						modal_pop("当前记录审核结果为【不合格】，请选择审核结果为【合格】的记录", "fail");
						isPass = true;
						return false;
					}
				}
				Datas.push(this.value);
			});
			if (isPass) {
				return false;
			}
		} else {
			modal_pop("请选择分钟学时记录", "fail");
			return;
		}
		title = "批量学时审核";
	} else {
		$td = $(t).parent();
		$tr = $td.parent();
		Datas.push($(t).data("acc"));
		title = $(t).data("rectime") + "--记录的学时审核";
	}

	function susseccCall(passStatus) {
		var title, span, acc;
		if (passStatus == true) {
			title = "合格"
			span = '<span style="color:#38AD08;font-weight: bold;">' + title + '</span>';
		} else {
			title = "不合格"
			span = '<span style="color:#F00;font-weight: bold;">' + title + '</span>';
		}
		acc = "<span class='editacc' style='cursor:pointer;' title='修改审核原因'>" + $("#acc").val() + "</span>";
		if (t == undefined) {
			check.each(function(index, el) {
				var $tr = $(el).parent().parent();
				$tr.find(spanIndex).html(span);
				$tr.find(accIndex).html(acc);
				// $(el).find('td:eq(20) i.fa.fa-ban').remove();
				// $(el).find('td:eq(20)').append("<i class='fa fa-ban'  style='cursor:pointer;' title=''></i>");
			});
		} else {
			$tr.find(spanIndex).html(span);
			$tr.find(accIndex).html(acc);
			// $td.html("<i class='fa fa-ban'  style='cursor:pointer;' title=''></i>");
		}
		$(".handacc").modal("hide");
	}

	function getFun(status) {
		return function() {
			Utils.sendAjax({
				type: "POST",
				url: IP + "/rmwebapp/sch/brsch/student/trainrec/acc",
				data: {
					ids: Datas,
					stuid: idObj.stuid,
					classid: idObj.classid,
					isvalid: status,
					reason: $("#acc").val()
				},
				callbacktype: "call",
				callback: function(Data) {
					susseccCall(status)
				},
				ecallback: function() {
					modal_pop("审核失败")
				}
			});
			return false;
		}
	}

	Utils.showModel({
		message: '<textarea id="acc" style="width:100%;height:50px"></textarea>',
		title: title,
		className: "modal-darkorange handacc",
		buttons: [{
			keys: "合格",
			label: "",
			className: "btn-warning bpass",
			callback: getFun(true)
		}, {
			keys: "不合格",
			label: "",
			className: "btn-warning unbpass",
			callback: getFun(false)
		}, {
			keys: "关闭",
			label: "",
			className: "btn-warning",
			callback: function() {

			}
		}]
	});
	if (status == "pass") {
		$(".unbpass").addClass('hidden')
			//$("#acc").attr("readonly","readonly")
	} else if (status == "unpass") {
		$(".bpass").addClass('hidden')
	} else {
		var str = $tr.find('td:eq(13) span').text()
		if (str == "合格") {
			$(".bpass").addClass('hidden')
		} else {
			$(".unbpass").addClass('hidden')
				//	$("#acc").attr("readonly","readonly")
		}
	}
}

hourObj.editacc = function(t) {
	var $span = $(t),
		$tr = $(t).parent().parent(),
		$divObj = $("#studyTimeTb"),
		idObj = $divObj.find("tbody").data("id"),
		status, Datas = [],
		acc;
	if ($tr.find('td:eq(13) span').text() == "合格") {
		status = true;
	} else {
		status = false;
	}
	Datas.push($tr.find('td:eq(0) input').val());
	Utils.showModel({
		message: '<textarea id="acc" style="width:100%;height:50px">' + $span.text() + '</textarea>',
		title: "修改备注",
		className: "modal-darkorange handacc",
		buttons: [{
			keys: "修改",
			label: "",
			className: "btn-warning",
			callback: function() {
				Utils.sendAjax({
					type: "POST",
					url: IP + "/rmwebapp/sch/brsch/student/trainrec/acc",
					data: {
						ids: Datas,
						stuid: idObj.stuid,
						classid: idObj.classid,
						isvalid: status,
						reason: $("#acc").val()
					},
					callbacktype: "call",
					callback: function(Data) {
						acc = "<span class='editacc' style='cursor:pointer;' title='修改审核原因'>" + $("#acc").val() + "</span>";
						$tr.find('td:eq(14)').html(acc);
						$(".handacc").modal("hide");
					},
					ecallback: function() {
						modal_pop("修改失败", "fail")
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
}

hourObj.setButton = function() {

}


hourObj.showImg = function(Data) {
	var $tr = $('#studyTimeTb tbody').find('tr'),
		trLen = $tr.length,
		$td,
		fileList = Data.data.fileList,
		listLen = fileList.length,
		temp, tempIndex = 0,
		path, sum = [],
		regDate = hourObj.regDate;

	function setImg(tr, path) {
		var $img = $(tr).find('td:eq(15) [data-img]');
		$img.removeClass('hidden');
		$img.data("img", path);
	}

	if (fileList != undefined) {
		for (var i = tempIndex; i < listLen; i++) {
			temp = fileList[i].gps.time;
			path = fileList[i].path;
			if (regDate(temp)) {
				for (var j = 0; j < trLen; j++) {
					var leadTime = Utils.dateCompare({
						date1: $($tr[j]).find('td:eq(2)').text(),
						date2: temp,
						type: "-"
					});
					if (leadTime <= 0) {
						setImg($tr[j], path);
						tempIndex = j;
						break;
					}
					if (i == listLen - 1 && j == trLen - 1) {
						setImg($tr[j], path);
						tempIndex = j;
						break;
					}
				}
			}
		}
	}
}

hourObj.bigImg = function(t) {
	var $bimg = $(createMask());
	$bimg.show().find('img').attr('src', $(t).data("img")).addClass('visited');
}

hourObj.allImg=function(){
	var $ul=$("#photo").find("ul").clone().removeAttr("style").css({
		"margin":'10px'
	});;
	var $bimg = $(createMask());
	$ul.find('li').removeAttr("style").css({
		float: 'left',
		"margin":'8px'
	});
	$bimg.show().html($ul);
}

hourObj.regDate = function(date) {
	return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(date);
}


function fss() {
	Utils.showModel({
		message: '<div class="form-group"> <div class="col-sm-10"> <label class="radio-inline i-checks"> <input type="radio" name="acc" value="0">自动审核</label> <label class="radio-inline i-checks"> <input type="radio" name="acc" value="1">手动审核</label> <label class="radio-inline i-checks"> <input type="radio" name="acc" value="2">自动+手动审核</label> </div> </div>',
		title: "设置审核模式",
		className: "modal-darkorange handacc",
		buttons: [{
			keys: "设置",
			label: "",
			className: "btn-warning",
			callback: function() {
				Utils.sendAjax({
					type: "put",
					url: IP + "/rmwebapp/sch/checkMode-" + _cookie.schoolid,
					data: {
						id: $('input[name="acc').data("ids"),
						school: {
							id: _cookie.schoolid
						},
						checkMode: parseInt($('input[name="acc"]:checked').val())
					},
					callbacktype: "call",
					callback: function(Data) {
						if (Data.errorcode == 0) {
							modal_pop("设置成功", "fail")
						} else {
							modal_pop("设置失败" + "," + Data.message, "fail")
						}
					},
					ecallback: function() {
						modal_pop("设置失败", "fail")
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
	$('.radio-inline.i-checks').iCheck({
		checkboxClass: "icheckbox_square-green",
		radioClass: "iradio_square-green",
	});
	//$('input[value="2"]').iCheck('check');
	Utils.sendAjax({
		type: "get",
		url: IP + "/rmwebapp/sch/checkMode-" + _cookie.schoolid,
		callbacktype: "call",
		callback: function(Data) {
			if (Data.errorcode == 0) {
				if(Data.data==null){
					$('input[value="2"]').iCheck('check');
					return false;
				}
				$('input[value="' + Data.data.checkMode + '"]').iCheck('check');
				$('input[name="acc"]').data("ids", Data.data.id);
			} else {
				modal_pop("获取失败", "fail")
			}
		},
		ecallback: function() {
			modal_pop("审核失败", "fail")
		}
	});
}



//加载详情的
function ajaxs_d(ajaxurl, pageNumber, pageSize) {
	forTable({
		request: {
			url: ajaxurl,
			success: function(data) {
				if (data.errorcode == 0) {
					$('#dt').bootstrapTable('load', data).bootstrapTable('hideLoading');
				} else if (data.errorcode == 200 || data.errorcode == undefined) {
					modal_confirm_log("登录过期,请重新登陆！", relogin);
				} else {
					setWrongResponse();
				}
			},
			error: function(errObj, resu) {
				Ajax_Table_Error(errObj, Ajax_TimeOut);
			}
		},
		initialData: {
			pageSize: pageSize || 10,
			pageNumber: pageNumber || 1
		}
	});
}

function initForTraAndAppo() {
	var $table = $('#dt');
	var starttime = $("#select-form input[name=starttime]").val();
	var endtime = $("#select-form input[name=endtime]").val();
	$.cookie(UrlValue("v").substring(0, 3) + "TrainrecCons", "starttime=" + starttime + "&endtime=" + endtime);
	$table.find('.trainedhour, .notrainhour').on('click', function() {
		var $this = $(this);
		if (!$this.hasClass("open")) {
			$table.find(".trainedhour.open, .notrainhour.open").each(function(index, elem) {
				$(elem).removeClass("open").parents("tr").removeClass("open").next().remove();
				typeof(resetView) == "function" && resetView(3);
			});
			getTraAndAppoData($this);
		} else {
			$this.removeClass("open").parents("tr").removeClass("open").next().remove();
			typeof(resetView) == "function" && resetView(3);
		}
	});
}

function getTraAndAppoData($el) {
	var formTitle = "已训学时详情",
		urlNodePrefix = "";
	var urlPrefix, typePrefix = UrlValue("v").substring(0, 3);
	var str = '<tr class="unexport"><td colspan="' + $("#dt thead th").length + '"><div>';
	if (!$el.hasClass("trainedhour")) {
		formTitle = "未训学时详情";
		urlNodePrefix = "no";
	}
	urlPrefix = "/rmwebapp/brsch/" + (typePrefix == "coa" ? "coach-" + $el.attr("data-coaid") : "student-" + $el.attr("data-stuid"));
	str += '<div class="form-title" style="text-align:left;"><h5 class="row-title">' + formTitle + '</h5></div>';
	$el.addClass("open");
	$.ajax({
		url: IP + urlPrefix + "/" + urlNodePrefix + "trainrec?" + $.cookie(typePrefix + "TrainrecCons"),
		type: "get",
		cache: false,
		timeout: 10000,
		success: function(Data) {
			if (Data.errorcode == 0) {
				var $tr = $el.parents("tr");
				var stuname = typePrefix == "coa" ? "" : $tr.find("td:eq(1)").text();
				str += getHTMLOfTraAndAppo($el.hasClass("trainedhour"), stuname, Data.data || []);
				str += '</div></td></tr>';
				$tr.addClass("open").after(str);
			} else {
				$el.parents("tr").addClass("open").after(str + '<div style="color: red;text-align:center;margin-bottom:20px;">数据请求异常</div></div></td></tr>');
			}
			typeof(resetView) == "function" && resetView();
		},
		error: function(errObj, resu) {
			$el.parents("tr").addClass("open").after(str + '<div style="color: red;text-align:center;margin-bottom:20px;">数据请求异常</div></div></td></tr>');
			typeof(resetView) == "function" && resetView();
		}
	});
}

function getHTMLOfTraAndAppo(isTrained, stuname, data) {
	if (data && data.length > 0) {
		var str = '<table class="table table-bordered table-hover dataTable no-footer" style="margin-bottom:30px">';
		str += '<thead class="theadWithPadding"><tr><th>序号</th><th>学员</th><th>预约状态 </th><th>预约部分</th><th>';
		str += isTrained ? '已训学时（时）' : '未训学时（时）';
		str += '</th><th>学习时间</th>' + (stuname ? '<th>付款方式</th><th>成交价格</th>' : "") + '</tr></thead>';
		str += '<tbody>';
		var contents = ["status", "course", "vperiod", "learntime"];
		stuname && contents.push("paytype", "price");
		for (var i = 0; i < data.length; i++) {
			data[i].paytype = data[i].paytype ? getPaytypeName(data[i].paytype) : "";
			data[i].status = data[i].status ? getStatusName(data[i].status) : "";
			data[i].course = data[i].course ? getCourseName(data[i].course) : "";
			str += "<tr class=\"unexport\"><td>" + (i + 1) + "</td>";
			str += "<td>" + (stuname || data[i].stuname) + "</td>";
			for (var j = 0; j < contents.length; j++) {
				str += "<td>";
				str += data[i][contents[j]] || "";
				str += "</td>";
			}
			str += "</tr>";
		}
		str += '</tbody></table>';
		return str;
	}
	return '<div style="text-align:center;margin-bottom:20px;">暂无记录</div>';
}
