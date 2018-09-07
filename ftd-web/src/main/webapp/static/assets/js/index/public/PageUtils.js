var PageUtils = {
	isCtlArea:function (areaId) {
		//445200揭阳 440606顺德 445300云浮市 441800清远市 610000陕西省 440300 深圳市
		var rgx = /445\d{3}|4406\d{2}|445\d{3}|441\d{3}|61\d{4}|440\d{3}/;
		if (rgx.test(areaId)) {
			return true;
		}
		return false;	
	},
	makeRow: function(dataArray, changeCb) {
		var htmlstr = '<tr>';
		var _value;
		for (var key in dataArray) {
			_value = dataArray[key] || "";
			if (changeCb) {
				_value = changeCb(_value);
			}
			htmlstr += '<td name=' + key + '>' + _value + '</td>';
		}
		return htmlstr += '</tr>'
	},
	"makeJxRows": function(detailstatus, dettems) {
		$("#Sm_detailstatus").val(detailstatus).select2();
		if (detailstatus) {
			var rowArry = [];
			btntype = "plus";
			$("#hour_table").removeClass("hidden");
			for (var index in dettems) {
				$r = PageUtils.makeRow2(dettems[index], btntype);
				$r.find(".classtype").one("done", function() {
					$(this).val($(this).data("value")).trigger("change");
				});
				$r.find(".trainareaid").one("done", function() {
					$(this).val($(this).data("value")).trigger("change");
				});
				rowArry.push($r);
				btntype = "minus";
			}
			var $tb = $("#hour_table tbody").html(rowArry);
			$tb.find('input[type="timeinput"]').on("change", function(e) {
				PageUtils.changeNextT(e);
			});
			$tb.find(".subcourse").on("init", function(e) {
				$(this).val("All").trigger("change");
			});
			$tb.find(".classtype").on("init", function(e) {
				$(this).val([]).trigger("change");
			});
		} else {
			$("#hour_table").addClass("hidden");
		}
	},
	"getFormData": function(formid) {
		var _formid = formid || "#registrationForm";
		var $ipts = $(_formid).find(".form-group").find("select[name],input[name]");
		var obj = {},
			value;
		$.each($ipts, function(index) {
			if (this.name === "undefined") {
				return true
			} //过滤掉没有name的值
			value = $(this).val() || "";
			if ($(this).attr("type") == "timeinput") {
				value += ":00";
			}
			if (this.name === "classtype" && $(this).val()) {
				value = "|" + value.join("|") + "|";
			}
			obj[this.name] = value;
		});
		return obj
	},
	"data2Form": function($selector, data, callback) {
		var $iptls = $selector.find(".form-group").find("select[name],input[name]");
		for (var tkey in data) {
			var $ipt = $iptls.filter("select[name=" + tkey + "],input[name=" + tkey + "]"); //根据name获取对应的input
			$.each($ipt, function(index) {
				var v = (data[tkey] == null ? "" : data[tkey]).toString(),
					type = $(this).attr("type") || this.tagName;
				if (tkey === "classtype" && v) { //班型
					v = v.split("|");
				}
				switch (type) {
					case "timeinput":
						$(this).timepicker("setTime", v);
						break;
					default:
						$(this).val(v).data("value", v).trigger("change");
						break;
				}
			})
		}
	},
	"data2Page": function($selector, data, callback) { //将获取的数据写入页面，用于回显
		//debugger
		var $iptls = $selector.find("select[name],input[name]");
		for (var tkey in data) {
			var $tipts = $iptls.filter("select[name=" + tkey + "],input[name=" + tkey + "]"); //根据name获取对应的input
			$.each($tipts, function(index) {
				if (data[tkey] == null) {
					data[tkey] = "";
				}
				$(this).val((data[tkey]).toString());
				var tgname = this.tagName;
				if (tgname == "SELECT") {
					$(this).select2();
				} else if (tgname == "INPUT" && $(this).data("date-format")) {
					$(this).datepicker();
				}
			})
		}
	},
	"getJxData": function(type) { //获取精细排班列表新增、修改数据
		var detailtems = [];
		var isJx = $("#Sm_time").val();
		if (isJx == "0") { //不是精细下面都不用获取了
			return detailtems;
		}
		var $trls = $("#hour_table tbody > tr:not(.hidden)"); //所有未隐藏的行
		$trls.each(function(index, item) {
			var dataItem = {}; //数据单元
			$rs = $(item).find("input[name],select[name]"); //一行中所有的输入项
			$.each($rs, function(index) { //遍历一行中的输入项
				var key = this.name;
				var value = $(this).val();
				if ($(this).data("type") == "detailde") { //时间处理
					value = value + ":00";
				} else if (key == "classtype") { //班型特殊处理
					if (value) { //有值
						value = "|" + value.join("|") + "|";
					} else {
						value = "";
					}
				}
				dataItem[key] = value;
			});
			if ($(item).data("id")) { //适应修改时新增操作
				dataItem["id"] = $(item).data("id");
			}
			detailtems.push(dataItem);
		});
		return detailtems;
	},
	"getJxDelData": function() { //获取精细排班列表删除的数据
		var deletetems = [];
		var $trls = $("#hour_table tbody > tr:hidden"); //所有不可见的行
		$trls.each(function(index, item) {
			if ($(item).data("id")) { //对有id的进行获取
				deletetems.push($(item).data("id"));
			}
		});
		return deletetems;
	},
	"modalCtr": function(bool) { //控制模态框隐藏
		if (bool) {
			$(".CoaScheduleModel").modal("hide");
			$(".default-modal").modal("hide");
		} else {
			return false;
		}
	},
	"toDoPlus": function() {
		var _DataItem = {};
		var $tb = $("#hour_table table>tbody");
		var $lasttr = $tb.find(">tr:not(:hidden)").last();
		var _st = $lasttr.find('.endtime').eq(0).val();
		var isdisab = $lasttr.find('select.trainareaid').attr("disabled");

		_DataItem["starttime"] = _st;
		_DataItem["endtime"] = plusMinutes(_st, $("#Sm_spacePreciseTime").val() || $("#Md_spacePreciseTime").val());
		_DataItem["number"] = $("#Sm_number").val() || $("#Md_number").val();
		_DataItem["price"] = $("#Sm_price").val() || $("#Md_price").val();
		_DataItem["subject"] = $("#Sm_subject").val() || $("#Md_subject").val();
		_DataItem["carType"] = $("#Md_carType").val() || $("#Sm_carType").val();
		_DataItem["subcourse"] = $("#Md_subcourse").val() || $("#Sm_subcourse").val();
		_DataItem["scopetype"] = $("#Md_scopetype").val() || $("#Sm_scopetype").val();
		_DataItem["classtype"] = $("#Md_classtype").val() || $("#Sm_classtype").val();
		_DataItem["trainareaid"] = $("#Md_trainareaid").val() || $("#Sm_trainareaid").val();

		var $r = PageUtils.makeRow2(_DataItem, "minus");
		$r.find(".trainareaid").attr("disabled", (isdisab === "disabled"));
		$r.find('input[type="timeinput"]').on("change", function(e) {
			PageUtils.changeNextT(e);
		});
		$r.find(".subcourse").on("init", function(e) {
			$(this).val("All").trigger("change");
		});
		$r.find(".classtype").on("init", function(e) {
			$(this).val([]).trigger("change");
		});
		$tb.append($r);
	},
	"makeRows2": function() {
		var _DataItem = {};
		_DataItem["number"] = $("#Sm_number").val() || $("#Md_number").val();
		_DataItem["price"] = $("#Sm_price").val() || $("#Md_price").val();
		_DataItem["subject"] = $("#Sm_subject").val() || $("#Md_subject").val();
		_DataItem["carType"] = $("#Md_carType").val() || $("#Sm_carType").val();
		_DataItem["subcourse"] = $("#Md_subcourse").val() || $("#Sm_subcourse").val();
		_DataItem["scopetype"] = $("#Md_scopetype").val() || $("#Sm_scopetype").val();
		_DataItem["classtype"] = $("#Md_classtype").val() || $("#Sm_classtype").val();
		_DataItem["trainareaid"] = $("#Md_trainareaid").val() || $("#Sm_trainareaid").val();

		var st = $("#Sm_startPreciseTime").val() || $("#Md_startPreciseTime").val();
		var rmb = st; //记住起始值
		var et = $("#Sm_endPreciseTime").val() || $("#Md_endPreciseTime").val();
		var skype = $("#Sm_spacePreciseTime").val() || $("#Md_spacePreciseTime").val();
		var temptime = st;
		var btntype = "plus",
			rowArry = [];
		while (checkeTimeMs(temptime, et)) {
			st = temptime;
			temptime = plusMinutes(st, skype);
			if (checkeTimeMs(temptime, rmb)) { //防止跨天，死循环
				break;
			}
			_DataItem["starttime"] = st;
			_DataItem["endtime"] = temptime;
			rowArry.push(PageUtils.makeRow2(_DataItem, btntype));
			btntype = "minus";
		}
		var $c = $("#hour_table table>tbody").append(rowArry);
		$c.find('input[type="timeinput"]').on("change", function(e) {
			PageUtils.changeNextT(e);
		});
		$c.find(".subcourse").on("init", function(e) {
			$(this).val("All").trigger("change");
		});
		$c.find(".classtype").on("init", function(e) {
			$(this).val([]).trigger("change");
		});
	},
	"makeRow2": function(_DataItem, btntype) {
		var ctypeopts = $("#Sm_classtype").html();
		var traidopts = $("#Sm_trainareaid").html();
		var $htmlstr = DomStrDb.getHTbtr();
		$htmlstr.find(".classtype").html(ctypeopts); //班型选项跟上面保持一致
		$htmlstr.find(".trainareaid").html(traidopts); //驾校选项跟上面保持一致

		//更新时班型不是数组，并且有值
		if (!($.isArray(_DataItem["classtype"])) && _DataItem["classtype"]) {
			_DataItem["classtype"] = _DataItem["classtype"].split("|");
		}
		$htmlstr.data("id", _DataItem["id"] || ""); //修改时的id，没id时为空
		for (var index in _DataItem) {
			$htmlstr.find('.' + index).val(_DataItem[index]).data("value", _DataItem[index]);
		}
		if (btntype == "minus") {
			$htmlstr.find('.operation')
				.attr('onclick', '$(this).closest("tr").addClass("hidden");')
				.removeClass('fa-plus')
				.addClass('fa-minus').attr('title', '删除');
		}

		$htmlstr.find("select[name]").select2({
			"width": "100px"
		});
		//更新日期控件
		$htmlstr.find('input[type="timeinput"]').timepicker({
			showMeridian: false,
			showSeconds: false,
			minuteStep: 30
		});

		//小科目联动
		$htmlstr.find('.subject').on("change", function(e) {
			var _st = ($(this).val() !== "2");
			var $sbcipt = $(this).closest('td').next().find('select[name="subcourse"]');
			$sbcipt.attr("disabled", _st).trigger("change");
			_st ? $sbcipt.trigger("init") : ""; //触发小科目初始化方法
		}).trigger("change");

		//班型联动
		$htmlstr.find('.scopetype').on("change", function(e) {
			var _st = ($(this).val() !== "2");
			var $ctypeipt = $(this).closest('td').next().find('select[name="classtype"]');
			$ctypeipt.attr("disabled", _st).trigger("change");
			_st ? $ctypeipt.trigger("init") : ""; //触发班型初始化方法
		}).trigger("change");

		return $htmlstr;
	},
	"changeNextT": function(e) {
		//改变生成后面日期
		var $inputs = $("#hour_table table>tbody").find("input[type='timeinput']");
		var tgindex = $inputs.index($(e.target));
		if (tgindex == -1) {
			return
		};
		var $el = $inputs.eq(tgindex + 1);
		var ttime = $(e.target).val();
		if ($el.hasClass('endtime')) {
			ttime = plusMinutes(ttime, ($("#Sm_spacePreciseTime").val() || $("#Md_spacePreciseTime").val()));
		}
		$el.timepicker('setTime', ttime);
	},
	//初始化select为select2样式
	"makeSelect2": function(selector, cb) {
		$(selector).select2().on("change", function(e) {
			$(e.target).valid();
		});
	},
	//获取json数据List
	"getJson": function(myurl, callback, opt) {
		var $sel = null;
		if(opt && opt.selectors) {
			$sel = $(opt.selectors.join(","));
			$sel.select2().attr("disabled", "disabled")
				.prev().find(".select2-chosen")
				.html("<i class='fa fa-spinner fa-spin'></i>数据加载中");	
		}
		return $.ajax({
			url: myurl,
			type: "get",
			async: true,
			success: function(Data) {
				if (Data.errorcode === 0 && typeof(callback) == "function") {
					if (Data.data === null) {
						callback([], opt);
					} else {
						var dataArr = $.isArray(Data.data) ? Data.data : Data.data.list;
						$.isArray(dataArr)? callback(dataArr, opt) : callback([], opt);
					}
				} else if (data.errorcode == 200 || Data.errorcode == undefined) {
					modal_confirm_log("登录过期,请重新登陆！", relogin);
				} else {
					$sel && $sel.prev().find(".select2-chosen").html("<i class='fa fa-times-circle'></i>获取数据失败");
				}
			},
			cache: false,
			timeout: 20000,
			error: function(errObj, resu) {
				$sel && $sel.prev().find(".select2-chosen").html("<i class='fa fa-times-circle'></i>" 
					+ errObj.statusText == "timeout"? "请求超时，请重新尝试！" : "数据请求失败，请重新尝试！");
			}
		});
	},
	//获取json数据
	"getJson2": function(myurl, callback, opt) {
		return $.getJSON(myurl, "", function(Data, status, xhr) {
			if (Data.errorcode === 0) {
				if (callback && Data.data) {
					callback(Data.data, opt)
				}
			} else if (Data.errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else if (Data.errorcode == undefined) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("获取失败！", "fail");
			}
		});
	},
	"getLinkTo": function(s, topt) { //s都为选择器
		var t = topt.selectors[0];
		$(t).on("link", function() {
			var myurl = '/rmwebapp/sch/brsch-' + $(s).val() + '/car/licnum';
			var cb = PageUtils.makeSelectStr;
			PageUtils.getJson(myurl, cb, topt);
		});
		$(s).on("change", function(e) {
			$(t).trigger("link");
		})
	},
	//制作下拉框
	"makeSelectStr": function(datalst, _opt) {
		var opt = $.extend({
			"key": "id",
			"value": "name",
			"has0": true
		}, _opt);
		//debugger
		var htmlstr = (opt.has0 ? '<option value="0">请选择</option>' : '');
		for(var index in datalst) {
			htmlstr += '<option value="' + datalst[index][opt.key] + '">' + datalst[index][opt.value] + '</option>'
		}
		for(var index in opt.selectors) {
			var selector = opt.selectors[index];
			$(selector).each(function(index) {
				if(selector.indexOf("#hour_table") == -1) { //针对进行排班的特殊操作
					$(this).html(htmlstr).removeAttr("disabled").select2().trigger("done");
				} else {
					$(this).html(htmlstr).removeAttr("disabled").select2({"width":"100px"}).trigger("done");
				}
			});
		}
	},
	"clearSelect": function($t, has0) {
		var _has0 = typeof(has0) != "undefined" ? has0 : true;
		$t.find("option").remove();
		_has0 ? $t.append('<option value="0">请选择</option>').select2("val", "0") : "";
	}
}

/*提示数据容器*/
var TipDb = {
	"Sm_time": "精细排班：<br>&nbsp;&nbsp;“否”则根据模板设定的参数对各个时间段进行统一排班。<br>&nbsp;&nbsp;“是”则可以个性化精细设置每一个预约时段的排班信息。",
	"Sm_paytype": "支付方式：<br>&nbsp;&nbsp;“无需支付”：学员在预约该模板的排班时，无需支付任何费用即可预约；<br>&nbsp;&nbsp;“余额支付”：学员在预约该模板的排班时，需要该学员的可预约学时有余额的情况下才可预约；<br>&nbsp;&nbsp;“现金支付”：学员在预约该模板的排班时，需要在线支付该模板设定的标准价格才能预约；<br>&nbsp;&nbsp;“余额优先支付”：学员在预约该模板的排班时，优先扣除可预约学时进行预约，如果可预约学时余额不足：需要在线支付该模板的标准价格进行预约。",
	"Sm_invalid": "是否发布：<br>&nbsp;&nbsp;“否”则第二天凌晨才自动生成排班，然后手动发布。<br>&nbsp;&nbsp;“是”则添加后立即根据可预约天数自动生成并发布排班，每天凌晨再自动生成并发布最新一天的排班。<br>&nbsp;&nbsp;以上操作对已生成排班的日期不会覆盖。",
	"Sm_usual": "是否默认：<br>&nbsp;&nbsp;每个教练可有多个模板，设置为默认模板后每天自动会生成排班",
	"model": "添加模式：<br>&nbsp;&nbsp;教练模式：添加单个选定教练的模板，该模板只对所选的教练有效；<br>&nbsp;&nbsp;教练组模式：所选教练组的所有教练添加同一个模板，该模板对所选教练组内的所有教练有效。",
	"Sm_isOrdinalAppoint": "顺序预约：开启顺序预约模式，则按单车上限取整分车，最后一车未达到单车下限的，自动取消预约。如3~6人一车，共预约26人，则4辆车分配6人，最后1辆车2人，少于3人，则提前一天截止预约后，自动取消。"
}

/*字符串容器*/
var DomStrDb = {
	"StOpt": "<option value='0'>总校任意学员</option><option value='1'>分校任意学员</option><option value='2'>分校指定班型学员</option><option value='3' >指定带教学员</option>",
	"SubCourseOpt": "<option value='All'>所有</option><option value='BackOff'>倒车入库</option><option value='Parking'>侧方停车</option><option value='Uphill'>坡道定点停车和起步</option><option value='StraightTurn'>直角转弯</option><option value='CurveTurn'>曲线行驶</option>",
	"getHTbtr": function() {
		var htmlstr = '<tr>' +
			'<td><input readonly="readonly" name="starttime" type="timeinput" data-type="detailde" class="form-control text-center input-sm starttime" value="8:00"></td >' +
			'<td><input readonly="readonly" name="endtime" type="timeinput" data-type="detailde" class="form-control text-center input-sm endtime" value="8:30"></td>' +
			'<td><input name="number" type="number" class="form-control input-sm text-center number" min="0" value="3">' +
			'<td><select name="carType" class="carType"><option value="C1">C1</option><option value="C2">C2</option><option value="C3">C3</option><option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option></select></td>' +
			'<td><select name="subject" class="subject"><option value="1">第一部分</option><option value="2">第二部分</option><option value="3">第三部分</option><option value="4">第四部分</option></select></td>' +
			'<td><select name="subcourse" class="subcourse">' + DomStrDb.SubCourseOpt + '</select></td>' +
			'<td><select name="trainareaid" class="trainareaid"><option value="0">请选择</option></select></td>' +
			'<td><select name="scopetype" class="scopetype">' + DomStrDb.StOpt + '</select></td>' +
			'<td><select multiple="multiple" name="classtype" class="classtype"></select></td>' +
			'<td><input name="price" max="250" step="30" type="number" class="form-control input-sm text-center price" min="0" value="200"></td>' +
			'<td><i title="添加" onclick="PageUtils.toDoPlus()" class="fa fa-plus operation"></i></td>' +
			'</tr>';
		return $(htmlstr);
	},
	"getCFtr": function() { //新增班型时间范围生成
		var htmlstr = '<tr>' +
			'<td><input readonly="readonly" name="starttime" type="timeinput" data-type="detailde" class="form-control text-center input-sm starttime" value="8:00"></td >' +
			'<td><input readonly="readonly" name="endtime" type="timeinput" data-type="detailde" class="form-control text-center input-sm endtime" value="8:30"></td>' +
			'<td><i class="fa operation"></i></td>' +
			'</tr>';
		return $(htmlstr);
	},
	"getOSTable": function() { //预约设置生成
		var htmlstr = '<div id="order-setting" class="order-setting"><table class="table table-hover">' +
			'<thead><tr><th>#</th><th>培训部分</th><th>已预约学时</th><th>可预约学时</th><th class="hidden">是否可预约</th></tr></thead><tbody>';
		for (var i = 1; i < 5; i++) {
			htmlstr += '<tr>' +
				'<td>' + i + '</td><td>' + getCourseName(i) + '</td><td><span class="p' + i + 'appoedhour">--</span></td>' +
				'<td><input min="0" type="number" class="p' + i + 'time number-input input-sm text-center fon"></td>' +
				'<td class="hidden"><span><input data-handle-width="28px" data-off-text="否" data-on-text="是" data-size="small" type="checkbox" class="p' + i + 'appostatus" value=""/></span></td>' +
				'</tr>';
		}
		htmlstr += '</tbody></table></div>';
		return htmlstr;
	},
	carTypeOpt: function() {
		return this.selectMaker([["A1"], ["A2"], ["A3"], ["B2"], ["C1"], ["C2"], ["C3"], ["C4"], ["C5"], ["D"], ["E"], ["F"], ["M"], ["N"] ]) 
	},
	selectMaker: function(dataArray) {
		var htmlstr = '';
		for (var i = 0; i < dataArray.length; i++) {
			htmlstr += '<option value="' + dataArray[i][0] + '">' + (dataArray[i][1] || dataArray[i][0]) + '</option>'
		}
		return htmlstr;
	},
	getStudyTimeTpl: function () {
		var htmlStr = '<tr class="unexport" style="display:none;">';
			htmlStr += '<td colspan="12">';
			htmlStr += '<div style="background:#FFF;border: 1px solid rgba(90, 135, 202, 0.5);">';
			htmlStr += '<div class="form-title" style="text-align:left;margin-left:5px;padding:5px 0;">';
			htmlStr += '<h5 class="row-title">培训日志</h5>';
			htmlStr += '</div>';

			htmlStr += '<table class="table table-bordered table-hover dataTable no-footer">';
			htmlStr += '<thead>';
			htmlStr += '<tr class="unexport"><th>学员</th><th>教练</th><th>课程</th><th>已学学时</th><th>有效学时</th><th>最大时速</th><th>里程数</th><th>培训部分</th><th>开始时间</th><th>结束时间</th><th>培训日志备案</th><th>操作</th></tr>';
			htmlStr += '</thead>';
			htmlStr += '<tbody>';
			htmlStr += '<tr>';
			htmlStr += '<td colspan="12" style="text-aligen:center;">暂无培训日志</td>';
			htmlStr += '</tr>';
			htmlStr += '</tbody>';
			htmlStr += '</table></div></td></tr>';
		return htmlStr;
	}
}