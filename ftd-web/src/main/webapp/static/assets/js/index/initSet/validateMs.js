var validater = null; //全局变量 ：校验对象
var DEFAULT_OP = { //默认配置
	errorPlacement: function(error, element) {
		var $div = $(element).closest("div:not(.special-input)");
		$div.find('small').remove();
		$div.append(error);
	},
	errorElement: "small",
	rules: {
		name: "required",
		braid: "mchose",
		coaid: "mchose",
		carType: "mchose",
		subject: "mchose",
		classtype: "mchoose2",
		number: {
			required: true,
			min: 1,
			step:1
		},
		price: {
			required: true,
			step: 0.01
		},
		startPreciseTime: {
			timerange: true,
			setime: ['#Sm_startPreciseTime', '#Sm_endPreciseTime']
		},
		endPreciseTime: {
			timerange: true,
			setime: ['#Sm_startPreciseTime', '#Sm_endPreciseTime']
		},
		spacePreciseTime: "mchose",
		paytype: "mchose",
		starttime: {
			timerange: true,
			setime: [],
			prevtime: true
		},
		endtime: {
			timerange: true,
			setime: []
		}
	}
};

//错误提示位置--默认
var _DEFAULT = {
	errorPlacement: function(error, element) {
		var $div = $(element).closest("div:not(.special-input)");
		$div.find('small').remove();
		$div.append(error);
	},
	errorElement: "small"
};

//错误提示位置--默认 人
var _DEFAULT_PERSION = {
	errorPlacement: function(error, element) {
		var $div = $(element).closest("div:not(.special-input)");
		$div.find('small').remove();
		$div.append(error);
	},
	errorElement: "small",
	rules: {
		name: "required",
		sex: "mchose",
		cardtype: {
			mchose: true
		},
		mobile: {
			phone: true,
			required: true
		},
		cardnum: {
			required: true,
		},
		passwd: 'required',
		passwd1: {
			equalTo: '#Md_passwd',
			required: true
		},
		address: 'required',
		birthday: "dateISO",
		expirydate: "dateISO",
		fstdrilicdate: {
			dateISO: true,
			required: true
		},
		leavedate: "dateISO",
		hiredate: {
			dateISO: true,
			required: true
		},
		drilicence: "required",
		dripermitted: "mchose",
		teachpermitted: "mchose",
		assessStage: "mchose",
		employstatus: "mchose",
		perdritype: "mchose",
		cardvaliddate: "dateISO"
	}
};

//错误提示位置--默认 驾校
var _DEFAULT_SCHOOL = {
	errorPlacement: function(error, element) {
		var $div = $(element).closest("div:not(.special-input)");
		$div.find('small').remove();
		$div.append(error);
	},
	errorElement: "small",
	rules: {
		name: "required",
		intro: "required",
		legal: "required",
		address: "required",
		lng: {
			required: true,
			lng: true
		},
		lat: {
			required: true,
			lat: true
		},
		contact: {
			required: true,
		},
		phone: {
			TPhone: true,
			required: true
		},
		mobilephone: {
			phone: true,
			required: true
		},
		postcode: {
			required: true
		},
		founddate: {
			dateISO: true,
			required: true
		},
		level: "mchose",
		busistatus: {
			required: true,
			mchose: true
		},
		busilicense: {
			required: true
		},
		creditcode: {
			rangelength: [18, 18]
		},
		busipermit: {
			required: true
		},
		busipermittime: {
			dateISO: true,
			required: true
		},
		ability: "digits",
		coachnum: "digits",
		thcoachnum: "digits",
		pracoachnum: "digits",
		grasupvnum: "digits",
		safmngnum: "digits",
		tracarnum: "digits",
		classroom: "digits",
		thclassroom: "digits",
		praticefield: "digits",
		passwd: 'required',
		passwd1: {
			equalTo: '#Md_passwd',
			required: true
		},
	}
};

var VOPTION = {
	TrainingEnd: $.extend(true, {}, _DEFAULT, { //结业证
		rules: {
			gracertnum: {
				required: true
			},
			grantdate: {
				required: true
			},
		}
	}),
	TrainingOrder: $.extend(true, {}, _DEFAULT, { //维修保养
		rules: {
			examtime: {
				required: true
			},
		}
	}),
	Product: { //班型产品
		errorPlacement: function(error, element) {
			$(element).after(error);
		},
		ignore: "tr.hidden input[name], tbody.ignore input[name]", //不忽略隐藏的
		errorElement: "small",
		rules: {
			course: {
				required: true,
				maxlength: 45
			},
			description: {
				maxlength: 100
			},
			starttime: {
				//timerange: true,
				setime: [],
				prevtime: true
			},
			endtime: {
				//timerange: true,
				setime: []
			}
		},
		messages: {
			course: {
				required: "班型名称不能为空",
				maxlength: "班型名称至多45位"
			},
			description: {
				maxlength: "长度至多100位"
			},
			slogan: {
				maxlength: "宣称口号至多50位"
			},
			tags: {
				maxlength: "班型标签至多32位"
			}
		},
		onkeyup: false
	},
	SchScheduleModel: $.extend(true, {}, DEFAULT_OP, { //场地模板
		rules: {
			groupid: "mchose"
		}
	}),
	MaintainUpkeep: $.extend(true, {}, DEFAULT_OP, { //维修保养
		rules: {
			carid: "mchose",
			driver: "required",
			mileage: {
				min: 0
			},
			mtaddress: {
				minlength: 6
			},
			mtdate: {
				dateISO: true
			},
			price: {
				min: 0
			},
			nextmtdate: {
				dateISO: true
			},
		}
	}),
	StipulateProject: $.extend(true, {}, DEFAULT_OP, { //规定项目
		rules: {
			carid: "mchose",
			yearexp: "dateISO",
			techexp: "dateISO",
			stroinsexp: "dateISO",
			cominsexp: "dateISO",
			vehvesexp: "dateISO"
		}
	}),
	CoaScheduleModel: $.extend(true, {}, DEFAULT_OP),
	YCoaduleModel: $.extend(true, {}, DEFAULT_OP, {
		rules: {
			trainareaid: "required", //此字段不校验
			coachs: "mchose",
			startPreciseTime: {
				timerange: true,
				setime: ['#Md_startPreciseTime', '#Md_endPreciseTime']
			},
			endPreciseTime: {
				timerange: true,
				setime: ['#Md_startPreciseTime', '#Md_endPreciseTime']
			}
		}
	}),
	OrderSetting: { //预约排班
		errorPlacement: function(error, element) {
			var $op = $(element).closest("div:not(.input-group)").find('.operation');
			$op.html(error);
		},
		errorElement: "small",
		rules: {
			number: "required"
		}
	},
	role: DEFAULT_OP,
	user: $.extend(true, {}, _DEFAULT, {
		rules: {
			roleid: "mchose",
			username: {
				required: true
			},
			email: {
				email: true,
				required: true
			},
			mobile: {
				phone: true,
				required: true
			},
			passwd: 'required',
			passwd1: {
				equalTo: '#Sm_passwd',
				required: true
			}
		}
	}),
	Assessment: $.extend(true, {}, _DEFAULT_PERSION, {
		rules: {
			username: {
				required: true
			},
			email: {
				email: true,
				required: true
			}
		}
	}),
	Safement: $.extend(true, {}, _DEFAULT_PERSION, {
		rules: {
			fstdrilicdate: {
				required: false
			}
		}
	}),
	StudentManagement: $.extend(true, {}, _DEFAULT_PERSION, {
		rules: {
			traintype: "mchose",
			signuptime: {
				required: true
			},
			realprice: "digits",
			busitype: "mchose",
			//brccharge: "digits",
			perdritype: {
				required: false
			},
			fstdrilicdate: "dateISO",
		}
	}),
	School: _DEFAULT_SCHOOL,
	CoachesManagement: $.extend(true, {}, _DEFAULT, {
		rules: {
			id: 'mchose',
			licnum: {
				licnum: true,
				required: true,
			},
			brand: 'required',
			manufacture: 'required',
			model: 'required',
			platecolor: 'mchose',
			perdritype: 'mchose',
			buydate: {
				dateISO: true,
				required: true
			},
			transportfrom: "dateISO",
			transportto: "dateISO",
			crewnum: "digits",
			fstdrilicdate: "dateISO",
			scrapedate: "dateISO",
			insurancedate: "dateISO",
			validdate: "dateISO"
		}
	}),
	Dr: $.extend(true, {}, _DEFAULT_PERSION, {
		rules: {
			id: 'mchose',
			employstatus: {
				required: false
			}
		}
	}),
	SubSchool: $.extend(true, {}, _DEFAULT_SCHOOL, {
		rules: {
			1: 'mchose',
			0: 'mchose',
			2: 'mchose',
			district: 'mchose',
			shortname: 'required',
			type: 'mchose',
			manager: 'required',
			mobile: {
				required: true,
				phone: true
			},
			telephone: {
				required: true,
				TPhone: true
			},
			email: {
				email: true,
				required: true
			},
			username: {
				required: true
			}
		}
	}),
	StudentChargeConfirm: $.extend(true, {}, _DEFAULT, {
		rules: {
			name: 'required',
			chargetype: 'mchose',
			paystatus: 'mchose',
			money: {
				digits: true,
				required: true
			}
		}
	}),
	TeachSiteSel: $.extend(true, {}, _DEFAULT, {
		rules: {
			name: 'required',
			type: 'mchose',
			paystatus: 'mchose',
			area: {
				digits: true,
				required: true
			},
			curvehnum: 'digits',
			totalvehnum: 'digits',
			address: 'required'
		}
	}),
	ScheduleArray: $.extend(true, {}, _DEFAULT, {
		rules: {
			brid: 'mchose',
			name: 'required',
			trainareaid: 'mchose',
			isOrdinalAppoint: 'required',
			MaxStuNum: 'digits',
			MinStuNum: 'digits'
		}
	}),
	StudentPay: $.extend(true, {}, _DEFAULT, {
		rules: {
			name: 'required',
			chargetype: 'mchose',
			paystatus: 'mchose',
			money: {
				digits: true,
				required: true
			}
		}
	})
}

var Validater = {
	createNew: function(selector, opt) {
		var validater = {};
		var setVld = function(opt) {
			return $(selector).validate(opt);
		}
		$form = setVld(opt);
		//是否通过校验
		validater.isPass = function() {
			return $form.form();
		}
		validater.resetValidater = function() {
			return $form.resetForm();
		}
		validater.getValidater = function() {
			return $form;
		}
		return validater;
	}
}

var initTPicker = function($obj) {
	$obj.timepicker({
		showMeridian: false,
		showSeconds: false,
		minuteStep: 30
	}).on("change", function(e) {
		checkJxTime(e);
	});
}

var checkeTimeMs = function(StartTime, EndTime, iseq) {
	if (!StartTime || !EndTime) {
		return false;
	} //没有数据不需比较
	var eq = iseq || false; //开始时间与结束时间是否可用等于，默认不能。
	var status = true;
	if (window.ActiveXObject || "ActiveXObject" in window) { //8:00  9:00 修复ie时间校验问题
		var starry = StartTime.split(":"),
			etarry = EndTime.split(":");
		var sth = parseInt(starry[0], 10),
			eth = parseInt(etarry[0], 10);
		if (sth == eth) {
			var stm = parseInt(starry[1], 10),
				etm = parseInt(etarry[1], 10);
			if (eq) {
				status = (stm > etm ? false : true);
			} else {
				status = (stm >= etm ? false : true);
			}
		} else if (sth > eth) {
			status = false;
		}
	} else {
		var a = new Date("2010-1-9 " + StartTime + ":00");
		var b = new Date("2010-1-9 " + EndTime + ":00");
		status = eq ? (a <= b) : (a < b);
	}
	return status;
}

//精细模板时间校验
function checkJxTime(e) {
	var $tg = $(e.currentTarget); //jq对象
	$tg ? $tg.valid() : '';
}

//校验必选
$.validator.addMethod("mchose", function(value) {
	return value != "0";
}, '必选值');

//校验时间范围
$.validator.addMethod("timerange", function(value) {
	var timearry = value.split(":");
	var h = parseInt(timearry[0]);
	return (h > 5 && h < 24);
}, '时间必须在6:00到23:00之间');

//校验起始时间
$.validator.addMethod("setime", function(value, element, param) {
	var StartTime = '';
	var EndTime = '';
	if (param.length > 0) {
		StartTime = $(param[0]).val();
		EndTime = $(param[1]).val();
	} else {
		var $ele = $(element);
		var $ptr = $ele.closest('tr');
		if ($ele.hasClass('starttime')) {
			StartTime = $ele.val();
			EndTime = $ptr.find('.endtime').eq(0).val();
		} else {
			EndTime = $ele.val();
			StartTime = $ptr.find('.starttime').eq(0).val();
		}
	}
	return checkeTimeMs(StartTime, EndTime);
}, '开始时间必须小于结束时间');

//校验上一个时间
$.validator.addMethod("prevtime", function(value, element, param) {
	var StartTime = '',
		EndTime = '';
	var $ele = $(element);
	var $ptr = $ele.closest('tr').prev().filter(":not('.hidden')");
	if ($ptr.length) {
		EndTime = $ele.val();
		StartTime = $ptr.find('.endtime').eq(0).val(); //用上一个的结束时间作为下一个的起始时间
		return checkeTimeMs(StartTime, EndTime, true);
	} else {
		return true;
	}
}, '不得小于上一个结束时间');

//手机号校验
$.validator.addMethod("phone", function(value,element, param) {
	if (value.trim() == "") {
		return true;
	}
	var $ele = $(element);
	 $ele.rules("remove", "repetition");
	return (/^1[3|4|5|7|8]\d{9}$/.test(value) ? true : false);
}, '手机号码不正确');

//重复验证
var _repetitions = {
	Ajax: function(urls, id) {
		var $input = $("#" + id); //jq对象
		var val = $input.val(); //取值
		var isAjax = true; //是否执行ajax
		var addRules = function(inputid, re) { //添加规则
			$("#" + inputid).rules("remove", "repetition");
			$("#" + inputid).rules("add", {
				repetition: re
			});
			$("#" + inputid).valid();
		}
		if (val == "") { //为空不做处理
			return false;
		}
		if ($input.data("OldVal") == val) { //有旧值需要做判断
			addRules(id, "true");
			return true;
		}
		if ($input.data("IsAjax") != undefined) { //决定是否执行
			$input.data("repVal") == val ? isAjax = false : isAjax = true;
		}
		$input.data("repVal", val);
		if (isAjax) {
			$.ajax({
				type: "get",
				url: urls + val,
				async: true,
				success: function(data) {
					if (data.errorcode == 0) {
						addRules(id, (data.data).toString());
						$("#" + id).data("IsAjax", true);
					} else if (Data.errorcode == 200 || Data.errorcode == undefined) {
						modal_confirm_log("登录过期,请重新登陆！", relogin);
					} else {
						addRules(id, "false");
						$("#" + id).data("IsAjax", false);
					}
				},
				error: function(errObj, resu) {
					addRules(id, "false");
				}
			});
		}
	},
	SetVal: function(obj) {
		$("#" + obj.id).data("OldVal", obj.OldVal);
		$("#" + obj.id).data("repVal", obj.OldVal);
		$("#" + obj.id).data("IsAjax", true);
	},
	addRules:function(inputid, re) { //添加规则
			$("#" + inputid).rules("remove", "repetition");
			$("#" + inputid).rules("add", {
				repetition: re
			});
			$("#" + inputid).valid();
	}
}

//重复验证
$.validator.addMethod("repetition", function(value, element, param) {
	return param == "true" ? true : false;
}, '已存在');

//身份证验证
$.validator.addMethod("card", function(value, element, param) {
	return param.test(value);
}, '证件格式不正确');

//车牌号验证
$.validator.addMethod("licnum", function(value, element, param) {
	return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{4}([A-Z_0-9]|[\u5b66]|[\u8BFE])$/.test(value);
}, '车牌号不正确');

//纬度
$.validator.addMethod("lat", function(value, element, param) {
	return /^-?(?:90(?:\.0{1,5})?|(?:[1-8]?\d(?:\.\d{1,6})?))$/.test(value);
}, '纬度为 -90 ~ 90,小数点为6位以内');

//经度
$.validator.addMethod("lng", function(value, element, param) {
	return /^-?(?:(?:180(?:\.0{1,5})?)|(?:(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d{1,6})?))$/.test(value);
}, '经度度为 -180 ~ 180,小数点为6位以内');

//电话和固话
$.validator.addMethod("TPhone", function(value, element, param) {
	return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|^1[3|4|5|7|8]\d{9}$/.test(value);
}, '电话号码错误');

//多选框
$.validator.addMethod("mchoose2", function(value, element, param) {
	if ($(element).prop("disabled")) {
		return true;
	} else {
		return $(element).val() ? true : false;
	}
}, '必选一个或多个');

//班型名重复
$.validator.addMethod("courseSame", function(value, element, param) {
	return param === 'false' ? false : true;
}, '班型名重复');