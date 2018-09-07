/**
 *通用模块 
 **/
var _Currency = {
	IsUserWhich: function(Modular) {
		return Modular[Modular.obj.btntype]; //判断使用模块
	},
	init: function(Modular) {
		this.vaidater();
		Modular["init_" + Modular.obj.btntype](); //总初始化
		_ControlInit.init(Modular.obj.btntype);
	},
	vaidater: function() {
		var type = UrlValue("v");
		if (VOPTION[type] != undefined) {
			validater = Validater.createNew('#registrationForm', VOPTION[type]); //调用验证
		}
		var $input = $("#Sm_cardtype").length > 0 ? $("#Sm_cardtype") : $("#Md_cardtype");
		$input.length > 0 ? $input.off("change.vaidater").on("change.vaidater", function() {
			var val = $(this).val();
			_CardValid(val);
		}).trigger("change.vaidater") : '';
	}
};

/**
教练车档案
**/
var _TrainingOrder = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		validater = $("#registrationForm").validate(VOPTION.TrainingOrder);
		$("#Sm_name,#Sm_cardnum,#Sm_mobile,#Sm_examtime,#Sm_puptime,#Sm_examtime").attr("readonly", "readonly");
		SetOption("Sm_id", window.top.CoachData);
		SetOption("Sm_pup", window.top.PickupPointData);
		// PageUtils.getJson(IP + "/rmwebapp/sch/brsch/exaroom-" + $.cookie("districtid"), PageUtils.makeSelectStr, {
		// 	"selectors": ["#Sm_exaroom"]
		// });
		laydate.skin("molv");
		$("#Sm_puptime").on("click", function(e) {
			laydate({
				elem: "#Sm_puptime",
				format: "YYYY-MM-DD hh:mm:ss",
				istime: true,
				istoday: true
			});
		})
		$("#Sm_examtime").on("click", function(e) {
			laydate({
				elem: "#Sm_examtime",
				format: "YYYY-MM-DD hh:mm:ss",
				istime: true,
				istoday: true
			});
		})
		ajax_get(IP + "/rmwebapp/sch/brsch/student-" + this.obj.id + "/apomExam");
		var $trow = $(this.obj.name); //name中保存的是当前点击的对象；
		var subject = getCourse2Code($trow.closest("tr").find(">td").eq(7).text().trim());
		$("#Sm_subject").val(subject).attr("disabled", true);
	},
	init_update: function() {}, //修改初始化
	add: function() { //添加
		if (!(validater.form())) {
			return false;
		}
		var temData = {
			"coach": {},
			"pup": {},
			"subject": "",
			"examtime": "",
			"puptime": ""
		};
		var _data = PageUtils.getFormData();
		temData["coach"]["id"] = _data["id"] === "0" ? (delete temData["coach"]) : _data["id"];
		temData["pup"]["id"] = _data["pup"] === "0" ? (delete temData["pup"]) : _data["pup"];
		temData["examplace"] = _data["examplace"];
		temData["subject"] = _data["subject"];
		temData["examtime"] = _data["examtime"];
		temData["puptime"] = _data["puptime"];
		console.info(temData);
		var myurl = IP + "/rmwebapp/sch/brsch/student-" + _TrainingOrder.obj.id + "/apomExam";
		ajax_add_Call(myurl, temData, PageUtils.modalCtr, {
			"success": "预约成功！",
			"fail": "预约失败！"
		});
	},
	update: function() {} //修改
};

/**
教练车档案
**/
var _CarArchival = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		modal_ToData(getModalconObj(this.obj.btntype));
		//$("#Md_stroinsprice").data("carid",this.obj.id);//用这个框来保存车Id
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
	},
	init_update: function() { //修改初始化
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		ajax_get(IP + "/rmwebapp/trc/regularpro-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		//var carid = $("#Md_stroinsprice").data("carid");
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = _CarArchival.obj.id; //获取的为车的Id
		var myurl = IP + "/rmwebapp/trc/regularpro";
		delete mydata["carid"];
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _CarArchival.obj.id; //获取的为规定项目的Id
		var myurl = IP + "/rmwebapp/trc/regularpro";
		delete mydata["carid"];
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
巡检记录
**/
var _PollingRecord = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.makeSelect2($fgls.find("select"));
		modal_ToData(getModalconObj(this.obj.btntype));
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "albumInput";
		paramObj["dropZoneTitle"] = "请选择巡检记录照片";
		uploadInit("albumUpload", IP + "/rmwebapp/file/product-filesupload-no-thumbnail-50", uploadSuccCB, deleteCB, paramObj);
	},
	init_update: function() { //修改初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		ajax_get(IP + "/rmwebapp/trc/pollrec-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		var carid = mydata["carid"];
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = carid;
		var myurl = IP + "/rmwebapp/trc/pollrec";
		delete mydata["carid"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _PollingRecord.obj.id;
		var myurl = IP + "/rmwebapp/trc/pollrec";
		delete mydata["carid"];
		delete mydata["file"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		mydata["phoDel"] = $("#albumDelId").val().split("|");
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
加油记录
**/
var _RefuelRecord = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.makeSelect2($fgls.find("select"));
		modal_ToData(getModalconObj(this.obj.btntype));
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "albumInput";
		paramObj["dropZoneTitle"] = "请选择加油记录照片";
		uploadInit("albumUpload", IP + "/rmwebapp/file/product-filesupload-no-thumbnail-50", uploadSuccCB, deleteCB, paramObj);
	},
	init_update: function() { //修改初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		ajax_get(IP + "/rmwebapp/trc/fuelrec-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		var carid = mydata["carid"];
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = carid;
		var myurl = IP + "/rmwebapp/trc/fuelrec";
		delete mydata["carid"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _RefuelRecord.obj.id;
		var myurl = IP + "/rmwebapp/trc/fuelrec";
		delete mydata["carid"];
		delete mydata["file"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		mydata["phoDel"] = $("#albumDelId").val().split("|");
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
事故记录
**/
var _AccidentRecord = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.makeSelect2($fgls.find("select"));
		modal_ToData(getModalconObj(this.obj.btntype));
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "albumInput";
		paramObj["dropZoneTitle"] = "请选择事故记录照片";
		uploadInit("albumUpload", IP + "/rmwebapp/file/product-filesupload-no-thumbnail-50", uploadSuccCB, deleteCB, paramObj);
	},
	init_update: function() { //修改初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		ajax_get(IP + "/rmwebapp/trc/accidentrec-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		var carid = mydata["carid"];
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = carid;
		var myurl = IP + "/rmwebapp/trc/accidentrec";
		delete mydata["carid"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _AccidentRecord.obj.id;
		var myurl = IP + "/rmwebapp/trc/accidentrec";
		delete mydata["carid"];
		delete mydata["file"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		mydata["phoDel"] = $("#albumDelId").val().split("|");
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
交通违法
**/
var _TrafficUnlaw = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.makeSelect2($fgls.find("select"));
		modal_ToData(getModalconObj(this.obj.btntype));
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "albumInput";
		paramObj["dropZoneTitle"] = "请选择交通违法的照片";
		uploadInit("albumUpload", IP + "/rmwebapp/file/product-filesupload-no-thumbnail-50", uploadSuccCB, deleteCB, paramObj);
	},
	init_update: function() { //修改初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_place"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		ajax_get(IP + "/rmwebapp/trc/trafficillegal-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		var carid = mydata["carid"];
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = carid;
		var myurl = IP + "/rmwebapp/trc/trafficillegal";
		delete mydata["carid"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _TrafficUnlaw.obj.id;
		var myurl = IP + "/rmwebapp/trc/trafficillegal";
		delete mydata["carid"];
		delete mydata["file"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		mydata["phoDel"] = $("#albumDelId").val().split("|");
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
安全检测
**/
var _SafeCheck = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_mtaddress"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.makeSelect2($fgls.find("select"));
		modal_ToData(getModalconObj(this.obj.btntype));
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "albumInput";
		paramObj["dropZoneTitle"] = "请选择您检测的照片";
		uploadInit("albumUpload", IP + "/rmwebapp/file/product-filesupload-no-thumbnail-50", uploadSuccCB, deleteCB, paramObj);
	},
	init_update: function() { //修改初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_mtaddress"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		ajax_get(IP + "/rmwebapp/trc/securedetect-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		var carid = mydata["carid"];
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = carid;
		var myurl = IP + "/rmwebapp/trc/securedetect";
		delete mydata["carid"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _SafeCheck.obj.id;
		var myurl = IP + "/rmwebapp/trc/securedetect";
		delete mydata["carid"];
		delete mydata["file"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		mydata["phoDel"] = $("#albumDelId").val().split("|");
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
维修保养
**/
var _MaintainUpkeep = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_mtaddress"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.makeSelect2($fgls.find("select"));
		modal_ToData(getModalconObj(this.obj.btntype));
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "albumInput";
		paramObj["dropZoneTitle"] = "请选择您维保的照片";
		uploadInit("albumUpload", IP + "/rmwebapp/file/product-filesupload-no-thumbnail-50", uploadSuccCB, deleteCB, paramObj);
	},
	init_update: function() { //修改初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		initAmap("Md_mtaddress"); //绑定地理位置解析
		validater = Validater.createNew('#registrationForm', VOPTION.MaintainUpkeep);
		ajax_get(IP + "/rmwebapp/trc/maintenance-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		AddressOld = ""; //清空临时地址
		var mydata = SelectFromCtr.getFormData();
		var carid = mydata["carid"];
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = carid;
		var myurl = IP + "/rmwebapp/trc/maintenance";
		delete mydata["carid"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _MaintainUpkeep.obj.id;
		var myurl = IP + "/rmwebapp/trc/maintenance";
		delete mydata["carid"];
		delete mydata["file"];
		var albvalue = $("#albumInput").val();
		mydata["album"] = (albvalue == "" ? null : JSON.parse(albvalue));
		mydata["phoDel"] = $("#albumDelId").val().split("|");
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
规定项目 
**/
var _StipulateProject = {
	obj: {},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_carid
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		validater = Validater.createNew('#registrationForm', VOPTION.StipulateProject);
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.makeSelect2($fgls.find("select"));
		modal_ToData(getModalconObj(this.obj.btntype));
	},
	init_update: function() { //修改初始化
		SetOption("Md_brid", window.top.SubSchoolData);
		PageUtils.getLinkTo("#Md_brid", { //Md_bird 联动 Md_id
			"selectors": ["#Md_carid"],
			"key": "id",
			"value": "licnum"
		});
		validater = Validater.createNew('#registrationForm', VOPTION.StipulateProject);
		ajax_get(IP + "/rmwebapp/trc/regularpro-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		var carid = mydata["carid"];
		mydata["carinfo"] = {};
		mydata["carinfo"]["id"] = carid;
		var myurl = IP + "/rmwebapp/trc/regularpro";
		delete mydata["carid"];
		ajax_add_Call(myurl, mydata, PageUtils.modalCtr);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var mydata = SelectFromCtr.getFormData();
		mydata["id"] = _StipulateProject.obj.id;
		var myurl = IP + "/rmwebapp/trc/regularpro";
		delete mydata["carid"];
		ajax_Update_Call(myurl, mydata, PageUtils.modalCtr);
	}
};

/**
 用户模块对象
 **/
var _User = {
	obj: {},
	currency: function() {
		$("#Sm_username").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/sch/school/user/","Sm_username")');
		ajax_select(IP + "/rmwebapp/sch/branchschool-" + _cookie.brschid+ "-roles/1/0", "id", "name", "roleid");
	},
	init_add: function() { //添加初始化
		this.currency();
	},
	init_update: function() { //修改初始化
		this.currency();
		ajax_get(IP + "/rmwebapp/sch/brsch/user-" + this.obj.id);
	},
	init_updatepassword: function() { //修改密码初始化
		$("#Sm_name").val(this.obj.name);
		$("#Sm_name").attr("disabled", true);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var Data = _From2Json.getData();
		Data.passwd = hex_sha1($("#Sm_passwd").val());
		var AjaxAddCallBack = function(bool) {
			if (bool) {
				$(".useModel").modal("hide");
			} else {
				return false;
			}
		};
		ajax_add_Call(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/user", Data, AjaxAddCallBack);
		return false;
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		var Data = _From2Json.getData();
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				$(".useModel").modal("hide");
			} else {
				return false;
			}
		}
		ajax_Update_Call(IP + "/rmwebapp/sch/brsch/user-" + _User.obj.id, Data, AjaxUpdateCallBack);
		return false;
	},
	updatepassword: function() { //修改用户密码
		var timestamp = new Date().getTime();
		var Data = _From2Json.getData();
		Data.timestamp = timestamp;
		Data.oldpasswd = hex_sha1(timestamp + "RunningManAdmin" + hex_sha1($("#Sm_oldpasswd").val()));
		Data.newpasswd = hex_sha1($("#Sm_newpasswd").val());
		ajax_Update(IP + "/rmwebapp/sch/brsch/user-" + _User.obj.id + "/passwd", Data);
	}
};

/**
角色模块对象
 **/
var _Role = {
	obj: {},
	init_add: function() {}, //添加初始化
	init_update: function() { //修改初始化
		ajax_get(IP + "/rmwebapp/sch/branchschool-role-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		var Data = _From2Json.getData();
		var AjaxAddCallBack = function(bool) {
			if (bool) {
				$(".roleModel").modal("hide");
			} else {
				return false;
			}
		};
		ajax_add_Call(IP + "/rmwebapp/sch/branchschool-" + SubSchId() + "-role", Data, AjaxAddCallBack);
		return false;
	},
	update: function() { //修改角色
		if (!(validater.isPass())) {
			return false
		}
		var Data = _From2Json.getData();
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				$(".roleModel").modal("hide");
			} else {
				return false;
			}
		}
		ajax_Update_Call(IP + "/rmwebapp/sch/branchschool-role-" + _Role.obj.id, Data, AjaxUpdateCallBack);
		return false;
	}
};

/**
 考核員模塊對象 
**/
var _Assessment = {
	obj: {},
	currency: function() {
		$("#Md_username").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/sch/school/user/","Md_username")');
		$("#Sm_cardnum").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/assessment/","Sm_cardnum")');
	},
	init_add: function() { //添加初始化
		this.currency();
		uploadInit("stampimg", IP + "/rmwebapp/file/accessment-upload-width-thumbnail-50", uploadSuccCB_oneflie, deleteCB, this.obj.paramObj);
		uploadInit("occupnofileid", IP + "/rmwebapp/file/accessment-upload-width-thumbnail-50", uploadSuccCB_oneflie, deleteCB, this.obj.paramObj_occupnofile);
	},
	init_update: function() { //修改初始化
		this.currency();
		ajax_get(IP + "/rmwebapp/sch/assessment-" + this.obj.id);
	},
	add: function() { //添加
		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#img_show").attr("src") == "") { //摄像头
			modal_pop("请选择头像文件")
			return false;
		}
		if ($("#stamp_show").attr("src") == "") { //印章
			modal_pop("请选择印章")
			return false;
		}
		if ($("#imagefileid").val() == "") { //判断是否存在图片id
			modal_pop("请上传头像！", "fail"); //弹出对话框
			return false;
		}
		if ($("#stampimginput").val() == "" || $("#stampimginput").val().replace('""', "") == "" || $("#stampimginput").val().replace('{}', "") == "") { //获取盖章
			modal_pop("请选择印章");
			return false;
		}
		var AddAssessment = function() {
			var Data = _From2Json.getData(); //获取表单数据
			Data["acc"]["teachpermitted"] == "0" ? Data["acc"]["teachpermitted"] = null : ""; //准教车型
			Data.user.passwd = hex_sha1($("#Md_passwd").val()); //密码加密
			var AjaxAddCallBack = function(bool) {
				if (bool) {
					// 待修复
					$(".Big-photo-model").modal("hide");
					$(".Big-photo-model").modal("hide");
				} else {
					return false;
				}
			};
			ajax_add_Call(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/assessment", Data, AjaxAddCallBack);
		};
		modal_prompt("该操作将向全国驾培平台申请全国统一编码并将考核员资料备案到" + _cookie.Pdistrictname + "监管服务平台。请核实考核员信息。是否继续该操作？", AddAssessment);
		return false;
	},
	update: function() {
		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#img_show").attr("src") == "") { //摄像头
			modal_pop("请选择头像文件")
			return false;
		}
		if ($("#stamp_show").attr("src") == "") { //印章
			modal_pop("请选择印章")
			return false;
		}
		if ($("#imagefileid").val() == "") { //判断是否存在图片id
			modal_pop("请上传头像！", "fail"); //弹出对话框
			return false;
		}
		if ($("#stampimginput").val() == "" || $("#stampimginput").val().replace('""', "") == "" || $("#stampimginput").val().replace('{}', "") == "") { //获取盖章
			modal_pop("请选择印章")
			return false;
		}
		var Data = _From2Json.getData(); //获取表单数据
		Data["teachpermitted"] == "0" ? Data["teachpermitted"] = null : ""; //准教车型
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				ajax_get(IP + "/rmwebapp/sch/assessment-" + _Assessment.obj.id);
				//$(".Big-photo-model").modal("hide");
			} else {
				return false;
			}
		}
		ajax_Update_Call(IP + "/rmwebapp/sch/assessment-" + _Assessment.obj.id, Data, AjaxUpdateCallBack, {
			"success": "修改成功,请点击右下方的备案按钮进行考核员数据备案！"
		});
		return false;
	}
};

/**
 安全模塊對象 
**/
var _Safement = {
	obj: {},
	currency: function() {
		$("#Sm_cardnum").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/safetystaff/","Sm_cardnum")');
	},
	init_add: function() { //添加初始化
		this.currency();
	},
	init_update: function() { //修改初始化
		this.currency();
		ajax_get(IP + "/rmwebapp/sch/safetystaff-" + this.obj.id);
	},
	add: function() {
		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#imagefileid").val() == "") { //判断相片是否存在
			modal_pop("请上传头像！", "fail"); //弹出对话框
			return false;
		}
		var AddSafement = function() {
			var Data = _From2Json.getData(); //获取表单数据
			Data["teachpermitted"] == "0" ? Data["teachpermitted"] = null : "";
			var AjaxAddCallBack = function(bool) {
				if (bool) {
					// 待修复
					$(".Big-photo-model").modal("hide");
					$(".Big-photo-model").modal("hide");
				} else {
					return false;
				}
			};
			ajax_add_Call(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/safetystaff", Data, AjaxAddCallBack);
		};
		modal_prompt("该操作将向全国驾培平台申请全国统一编码并将安全员资料备案到" + _cookie.Pdistrictname + "监管服务平台。请核实安全员信息。是否继续该操作？", AddSafement);
		return false;
	},
	update: function() {
		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#imagefileid").val() == "") { //判断相片是否存在
			modal_pop("请上传头像！", "fail"); //弹出对话框
			return false;
		}
		var Data = _From2Json.getData(); //获取表单数据
		Data["teachpermitted"] == "0" ? Data["teachpermitted"] = null : "";
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				_Safement.init_update();
				//$(".Big-photo-model").modal("hide");
			} else {
				return false;
			}
		}
		ajax_Update_Call(IP + "/rmwebapp/sch/safetystaff-" + _Safement.obj.id, Data, AjaxUpdateCallBack, {
			"success": "修改成功,请点击右下方的备案按钮进行安全员数据备案！"
		});
		return false;
	}
};

/**
 主校模塊對象 
**/
var _School = {
	obj: {},
	init_update: function() { //修改初始化


		AMap.service('AMap.Geocoder', function() { //根据地址找坐标插件
			geocoder = new AMap.Geocoder(); //实例化Geocoder
		})
		$("#Md_busiscope").select2();
		$('#schoolabstract').summernote({
			lang: 'zh-CN',
			height: "300px",
			onImageUpload: function(files, editor, $editable) {
				sendFile(files[0], editor, $editable);
			}
		});
		ajax_get(IP + "/rmwebapp/sch/school-" + this.obj.id);
		$("#Md_busilicense").attr("onblur", '_repetitions.Ajax("/rmwebapp/sch/busilicense-","Md_busilicense","registrationForm")'); //添加工商编号重复验证
		AddressOld = ""; //清空临时地址
		$("#Md_address").on("blur", function(e) {
			if ($("#Md_address").val().length >= 6) {
				GetLngLat($("#Md_address").val());
			}
		});
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		if ($("#Md_busiscope").val() == null) {
			modal_pop("请选择经营范围！", "fail"); //弹出对话框
			return false;
		}
		if ($("#schoolabstract").code() == "") {
			modal_pop("请编辑驾校简介！", "fail"); //弹出对话框
			return false;
		} else {
			var abstractlength = removeHTMLTag($("#schoolabstract").code());
			if (abstractlength.length <= 100) {
				modal_pop("驾校简介字数不少于100个！", "fail"); //弹出对话框
				return false;
			}
		}
		var AjaxUpdateCallBack = function(bool, callBack, did) {
			if (bool) {
				$(".Big-model").modal("hide");
			} else {
				return false;
			}
		}
		var Data = _From2Json.getData();
		var busiscopearray = []; //获取经营范围
		var busiscope = "";
		if ($("#Md_busiscope").val() != null) {
			var barray = $("#Md_busiscope").val();
			for (var i = 0; i < barray.length; i++) {
				busiscopearray.push({
					"scopeType": barray[i]
				});
				busiscope += barray[i] + ",";
			}
			Data["busiscope"] = busiscope.slice(0, busiscope.length - 1);
			Data["scopeList"] = busiscopearray;
		} else {
			Data["busiscope"] = "";
			Data["scopeList"] = null;
		}
		Data["district"] = {
			"id": $.cookie("district")
		};
		ajax_Update_Call(IP + "/rmwebapp/sch/school-" + _School.obj.id, Data, AjaxUpdateCallBack);
		return false;
	}
};

/**
 分校模塊對象 
**/
var _SubSchool = {
	obj: {},
	currency: function() {
		AMap.service('AMap.Geocoder', function() { //根据地址找坐标插件
			geocoder = new AMap.Geocoder(); //实例化Geocoder
		});
		$('#cabstracteditor').summernote({ //简介初始化
			lang: 'zh-CN',
			height: "300px",
			onImageUpload: function(files, editor, $editable) {
				sendFile(files[0], editor, $editable);
			}
		});
		$('#schoolabstract').summernote({
			lang: 'zh-CN',
			height: "300px",
			onImageUpload: function(files, editor, $editable) {
				sendFile(files[0], editor, $editable);
			}
		});
		AddressOld = ""; //清空临时地址
		$("#Md_address").on("blur", function(e) {
			if ($("#Md_address").val().length >= 6) {
				GetLngLat($("#Md_address").val());
			}
		});
	},
	init_detailde: function() { //详情初始化
		$('#schoolabstract').summernote({
			lang: 'zh-CN',
			height: "300px",
			onImageUpload: function(files, editor, $editable) {
				sendFile(files[0], editor, $editable);
			}
		});
		ajax_detailde(IP + "/rmwebapp/sch/branchschool-" + this.obj.id);
	},
	init_add: function() { //添加初始化
		uploadInit("defimg", IP + "/rmwebapp/file/branch-filesupload-with-thumbnail-50", uploadSuccCB_oneflie, deleteCB, this.obj.defimg_paramObj); //默认照片初始化
		uploadInit("subimg", IP + "/rmwebapp/file/branch-filesupload-with-thumbnail-50", uploadSuccCB, deleteCB, this.obj.subtimgid_paramObj); //相册初始化
		
		$("#Md_district").attr("disabled", true);
		$("#Md_2").attr("disabled", true);
		$("#Sm_0").empty(); //获取主校省份
		$("#Sm_0").append("<option value='" + _cookie.Pdistrictid + "'>" + _cookie.Pdistrictname + "</option>");
		$("#Sm_0").attr("disabled", true);
		SelectBySelect("Sm_0", "Md_1", IP + "/rmwebapp/admin/syllabus/disctrict/", "areaname", "Data", "id");
		$("#Sm_0").select2().on("change", function(e) {
			SelectBySelect("Sm_0", "Md_1", IP + "/rmwebapp/admin/syllabus/disctrict/", "areaname", "Data", "id");
		});
		$("#Md_1").select2().on("change", function(e) {
			SelectBySelect("Sm_0", "Md_district", IP + "/rmwebapp/admin/syllabus/disctrict/", "areaname", "Data", "id");
			SelectChangeSelect("Md_1", "Md_district");
			SelectBySelect("Md_1", "Md_2", IP + "/rmwebapp/admin/syllabus/disctrict/", "areaname", "Data", "id");
		});
		$("#Md_2").select2().on("change", function(e) {
			SelectBySelect("Md_1", "Md_district", IP + "/rmwebapp/admin/syllabus/disctrict/", "areaname", "Data", "id");
			SelectChangeSelect("Md_2", "Md_district");
		});
		$("#Md_district").select2().on("change", function(e) {
			SelectChangeSelect("Md_district", "Md_2");
		});
		$("#Md_username").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/sch/school/user/","Md_username")');
		this.currency();
	},
	init_update: function() {
		//特色服务模板确定按钮
		this.currency();
		ajax_get(IP + "/rmwebapp/sch/branchschool-" + this.obj.id); //获取详情
	},
	add: function() { //添加
		var chgeData = ChargesTpl.getChargeData(),
			serData = ServiceTpl.getServiceData(),
			msg = '',
			abstartctlength = '';

		if (!(validater.isPass())) {
			return false
		}
		if ($("#schoolabstract").code() == "") {
			modal_pop("请编辑分校简介！", "fail"); //弹出对话框
			return false;
		}
		abstartctlength = removeHTMLTag($("#schoolabstract").code());
		if (abstartctlength.length <= 100) {
			modal_pop("分校简介字数不少于100个！", "fail"); //弹出对话框
			return false;
		}
		//校验收费标准
		msg = ChargesTpl.validTSame(chgeData);
		if (msg !== '') {
			modal_pop(msg.substring(0, msg.length - 1) + '<br>以上收费标准名已存在', "fail")
			return false;
		}
		var AddSchool = function() {
			var Data = _From2Json.getData();
			Data.admin.passwd = hex_sha1($("#Md_passwd").val());
			Data.brsch.district.id = (Data.brsch.district.id).split("_")[0]
			Data["brsch"]["charges"] = chgeData.charges;
			debugger
			Data["brsch"]["services"] = serData.services;

			var AjaxAddCallBack = function(bool) {
				if (bool) {
					$("#" + _SubSchool.obj.subtimgid_paramObj["inputid"]).val(""); //clean
					$("#" + _SubSchool.obj.defimg_paramObj["inputid"]).val(""); //clean
					$(".Big-model").modal("hide");
					GetSubSchoolData(); //刷新分校缓存
				} else {
					$("#" + _SubSchool.obj.subtimgid_paramObj["inputid"]).val(""); //clean
					$("#" + _SubSchool.obj.defimg_paramObj["inputid"]).val(""); //clean
					return false;
				}
			};
			ajax_add_Call(IP + "/rmwebapp/sch-" + SchId() + "/branchschool", Data, AjaxAddCallBack);
		};
		modal_prompt("该操作将向全国驾培平台申请全国统一编码并将驾校资料备案到" + _cookie.Pdistrictname + "监管服务平台。如信息不准确会造成该驾校在计时平台添加的基本信息和学员产生的学时都不合法。请核实驾校资料是否正确。是否继续该操作？", AddSchool);
		return false;
	},
	update: function() { //修改
		var schid = _SubSchool.obj.id,
			chgeData = ChargesTpl.getChargeData(schid),
			serData = ServiceTpl.getServiceData(schid),
			Data = null,
			msg = '';

		if (!(validater.isPass())) {
			return false
		}
		if ($("#schoolabstract").code() == "") {
			modal_pop("请编辑分校简介！", "fail"); //弹出对话框
			return false;
		}
		var abstartctlength = removeHTMLTag($("#schoolabstract").code());
		if (abstartctlength.length <= 100) {
			modal_pop("分校简介字数不少于100个！", "fail"); //弹出对话框
			return false;
		}
		msg = ChargesTpl.validTSame(chgeData);
		if (msg !== '') {
			modal_pop(msg.substring(0, msg.length - 1) + '<br>以上收费标准名已存在', "fail")
			return false;
		}
		Data = _From2Json.getData();
		Data["school"] = {
			id: $.cookie("subSchoolup")
		};
		Data["district"] = {
			id: $.cookie("district")
		};
		Data["id"] = schid;
		
		var subSchoolupdate = {
			"branch": ""
		};
		subSchoolupdate["branch"] = Data;
		//服务特色
		subSchoolupdate["srvUpdate"] = serData.srvUpdate;
		subSchoolupdate["srvDel"] = serData.srvDel;
		subSchoolupdate["branch"]["services"] = serData.services;
		//收费标准
		subSchoolupdate["chgeUpdate"] = chgeData.chgeUpdate;
		subSchoolupdate["chgeDel"] = chgeData.chgeDel;
		subSchoolupdate["branch"]["charges"] = chgeData.charges;

		phoDelarray.length > 0 ? subSchoolupdate["phoDel"] = phoDelarray : delete subSchoolupdate["phoDel"]; //判断是否有需要删除的相册
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				//$(".Big-model").modal("hide");
				GetSubSchoolData(); //刷新分校缓存
				ajax_get(IP + "/rmwebapp/sch/branchschool-" + _SubSchool.obj.id); //获取详情
			} else {
				return false;
			}
		}
		ajax_Update_Call(IP + "/rmwebapp/sch/branchschool-" + _SubSchool.obj.id, subSchoolupdate, AjaxUpdateCallBack, {
			"success": "修改成功,请点击右下方的备案按钮进行分校数据备案！"
		});
		return false;
	}
};

/**
 教学区域模塊對象 
**/
var _TeachSiteSel = {
	obj: {},
	maps: function(status, result, operationType) { //地图函数  教学区地图初始化
		var editflag = true;
		var centerstr = [];
		var crenterstrs = [];
		var shapeType = ""; //形状类型
		editorTool = new AMap.Map("container", {
			resizeEnable: true,
			center: result.locations[0],
			zoom: 13 //地图显示的缩放级别
		});
		centerstr = editorTool.getCenter();
		crenterstrs.push([centerstr.lng - 0.005, centerstr.lat - 0.005]);
		crenterstrs.push([centerstr.lng + 0.005, centerstr.lat - 0.005]);
		crenterstrs.push([centerstr.lng + 0.005, centerstr.lat + 0.005]);
		crenterstrs.push([centerstr.lng - 0.005, centerstr.lat + 0.005]);
		editorTool.plugin('AMap.MouseTool', function() { //在地图中添加MouseTool插件
			mouseTool = new AMap.MouseTool(editorTool);
			editorTool.addControl(mouseTool);
			var clickListener = AMap.event.addListener(mouseTool, "draw", function(type) {
				mouseTool.close(false);
				if (shapeType == "circle") {
					console.info(type.obj.getCenter())
					var center = type.obj.getCenter();
					$("#Md_circle").val("(" + center.lng + "," + center.lat + "," + type.obj.getRadius() + ")");
					console.info(type.obj.getRadius())
				} else if (shapeType == "polygon") {
					console.info(type.obj.getPath())
					var path = type.obj.getPath();
					console.info(path.toString())
					$("#Md_polygon").val("(" + path.toString() + ")");
				}
			});
		});
		editorTool.plugin(["AMap.ToolBar"], function() {
			editorTool.addControl(new AMap.ToolBar());
		});
		AMap.service(['AMap.PlaceSearch'], function() { //地点搜索
			var typeStr = "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施";
			editorTool.getCity(function(data) {
				var ci = "";
				if (data['province'] && typeof data['province'] === 'string') {
					ci = data['city'] || data['province'];
				}
				placeSearch = new AMap.PlaceSearch({
					map: editorTool,
					city: ci,
					type: typeStr
				});
			});
		});
		editorTool.getCity(function() {});
		$("#searchBtn").unbind("click"); //点击搜索按钮
		$("#searchBtn").click(function() {
			var inputStr = $("#searchInput").val();
			if (inputStr == "") {
				return;
			}
			placeSearch.search(inputStr.replace(" ", "|"), function(status, result) {
				console.info(result);
			})
		});
		$("#circleIda").unbind("click"); //圆按钮点击事件
		$("#circleIda").click(function() {
			editorTool.clearMap();
			shapeType = "circle";
			$("#Md_type").select2("val", "Circle")
			mouseTool.circle();
		});
		$("#ploygenIda").unbind("click"); //多边开按钮点击事件
		$("#ploygenIda").click(function() {
			editorTool.clearMap();
			shapeType = "polygon";
			$("#Md_type").select2("val", "Polygon")
			mouseTool.polygon();

		});
		$("#mapClear").unbind("click"); //清除按钮
		$("#mapClear").click(function() {
			editorTool.clearMap();
		});
	},
	currency: function() {
		$("#schAreaColla").unbind("click"); //右则面板收起与打开
		$("#schAreaInputColl").unbind("click");
		$("#schAreaInputColl").click(function() {
			$("#schAreaInfoInput").animate({
				width: "show"
			}, 500);
			$("#schAreaInputColl").addClass("hide");
		});
		$("#schAreaColla").click(function() {
			$("#schAreaInfoInput").animate({
				width: "hide"
			}, 500, function() {
				$("#schAreaInputColl").removeClass("hide");
			});
		});
	},
	init_add: function() { //添加初始化
		$("#Md_vehicletype").select2({
			placeholder: "请点击添加",
			allowClear: true
		});
		$("#Md_circle").attr("readonly", "readonly")
		this.currency();
		lntLatConvert(this.obj.mapCenter, this.maps, "add");
	},
	init_update: function() { //修改初始化
		$("#Md_circle").attr("readonly", "readonly")
		lntLatConvert(this.obj.mapCenter, this.maps, "update");
		ajax_get(IP + "/rmwebapp/sch/brsch/region-" + this.obj.id);
		this.currency();
		$("#Md_vehicletype").select2();
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		if ($("#Md_vehicletype").val() == null) {
			modal_pop("请选择培训车型！", "fail"); //弹出对话框
			return false;
		}
		var AddTeachSiteSel = function() {
			var Data = _From2Json.getData();
			Data["district"] = {
				id: _cookie.districtid
			};
			Data["status"] = "Disable";
			Data["avltimestart"] = Data["avltimestart"] + ":00";
			Data["avltimeend"] = Data["avltimeend"] + ":00";
			var AjaxAddCallBack = function(bool) {
				if (bool) {
					$(".TrachSiteSel-model").modal("hide");
				} else {
					return false;
				}
			};
			ajax_add_Call(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/region", Data, AjaxAddCallBack);
		};
		modal_prompt("该操作将向全国驾培平台申请全国统一编码并将教学区域资料备案到" + _cookie.Pdistrictname + "监管服务平台。是否继续该操作？", AddTeachSiteSel);
		return false;
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		if ($("#Md_vehicletype").val() == null) {
			modal_pop("请选择培训车型！", "fail"); //弹出对话框
			return false;
		}
		var Data = _From2Json.getData();
		Data["district"] = {
			id:_cookie.districtid
		};
		Data["avltimestart"] = Data["avltimestart"] + ":00";
		Data["avltimeend"] = Data["avltimeend"] + ":00";
		delete Data["status"];
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				$(".TrachSiteSel-model").modal("hide");
			} else {
				return false;
			}
		}
		ajax_Update_Call(IP + "/rmwebapp/sch/brsch/region-" + _TeachSiteSel.obj.id, Data, AjaxUpdateCallBack);
		return false;
	}
};

/**
教练员模块对象 
**/
var _Dr = {
	obj: {},
	currency: function() {
		SetOption("Sm_id", window.top.SubSchoolData); //初始化驾校下拉列表
		SetOption("Md_car", window.top.CarData); //教练车的下拉
		$('#Sm_id').on('change', function(event) {
			event.preventDefault();
			if (this.value == '0') {
				PageUtils.clearSelect($('#Md_tra'), true);
				return;
			}
			$('#Md_tra').select2('val', '0');
			var ajaxurl = IP + '/rmwebapp/sch/brsch-' + this.value + '/branchCharge/trcarea';
			PageUtils.getJson(ajaxurl, PageUtils.makeSelectStr, {
				selectors: ['#Md_tra']
			});
		});
		$("#Md_dripermitted").on("change", function(e) { //准驾车型绑定准教车型
			$("#Md_teachpermitted").trigger('link');
		});
		$("#Md_teachpermitted").on('link', function(event) { //准教车型联动
			$(this).find('option:gt(0)').remove();
			$(this).trigger('change').append(getOptions($("#Md_dripermitted").val()))
		});
		$('#cabstracteditor').summernote({
			lang: 'zh-CN',
			height: "300px"
		});
		$("#takePhoto-btn").show(); //拍照
		$("#Md_mobile").attr("onblur", '_repetitions.Ajax("' + IP + '/rmwebapp/coach/mobile-","Md_mobile")'); //手机重复验证
		$("#Md_cardnum").attr("onblur", '_repetitions.Ajax("' + IP + '/rmwebapp/coach/","Md_cardnum")'); //证件号重复验证
		$("#Md_drilicence").rules("add", {
			card: /(^\d{18}$|^\d{17}(\d|X))$/
		});
	},
	init_detailde: function() { //详情初始化
		$('#cabstracteditor').summernote({
			lang: 'zh-CN',
			height: "300px"
		});
		ajax_detailde(IP + "/rmwebapp/sch/brsch/coach-" + this.obj.id);
	},
	init_add: function() { //添加初始化
		uploadInit("licensefid", IP + "/rmwebapp/file/coach-filesupload-with-thumbnail-50", uploadSuccCB_oneflie, deleteCB, this.obj.licensefid_paramObj); //初始化网站默认照片
		uploadInit("defaultimgid", IP + "/rmwebapp/file/coach-filesupload-with-thumbnail-50", uploadSuccCB_oneflie, deleteCB, this.obj.defaultimgid_paramObj); //初始化驾驶证扫描件
		uploadInit("cpersonalimg", IP + "/rmwebapp/file/coach-filesupload-with-thumbnail-50", uploadSuccCB, deleteCB, this.obj.paramObj); //初始化相册
		
		this.currency();
	},
	init_update: function() { //修改初始化
		$("#Md_physicalnum").attr("disabled", true); //物理卡号不可编辑
		this.currency();
		ajax_get(IP + "/rmwebapp/sch/brsch/coach-" + this.obj.id); //获取信息
	},
	add: function() {
		var chgeData = ChargesTpl.getChargeData(),
			serData = ServiceTpl.getServiceData(),
			msg = '';
		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#imagefileid").val() == "") { //照片
			modal_pop("请上传头像！", "fail"); //弹出对话框
			return false;
		}
		// msg = ChargesTpl.validTSame(chgeData);
		// if (msg !== '') {
		// 	modal_pop(msg.substring(0, msg.length - 1) + '<br>以上收费标准名已存在', "fail");
		// 	return false;
		// }
		var AddCoach = function() {
			var Data = _From2Json.getData(); //添加表单
			Data["faceimg"] = Data["personinfo"]["file"];
			delete Data["charges"];
			Data["charges"] = (chgeData).charges;
			Data["services"] = (serData).services;

			var AjaxAddCallBack = function(bool) {
				if (bool) {
					$(".Big-photo-model").modal("hide");
					GetCoachData(); //刷新下拉资源
				} else {
					return false;
				}
			};
			ajax_add_Call(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/coach", Data, AjaxAddCallBack);
		};
		modal_prompt("该操作将向全国驾培平台申请全国统一编码并将教练员资料备案到" + _cookie.Pdistrictname + "监管服务平台。如教练员信息不准确，将造成该教练的无法正常教学。请核实教练员信息。是否继续该操作？", AddCoach);
		return false;
	},
	update: function() {
		var coaid = _Dr.obj.id,
			chgeData = ChargesTpl.getChargeData(coaid),
			serData = ServiceTpl.getServiceData(coaid),
			Data = null,
			msg = '',
			coachupdate = null;

		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#imagefileid").val() == "") { //照片
			modal_pop("请上传头像！", "fail"); //弹出对话框
			return false;
		}
		// msg = ChargesTpl.validTSame(chgeData);
		// if (msg !== '') {
		// 	modal_pop(msg.substring(0, msg.length - 1) + '<br>以上收费标准名已存在', "fail")
		// 	return false;
		// }
		Data = _From2Json.getData();
		Data["faceimg"] = Data["personinfo"]["file"];
		Data["personinfo"]["fingerprint"] = "";
		Data["id"] = coaid;

		coachupdate = {
			"coach": ""
		};
		coachupdate["coach"] = Data;
		//服务特色
		coachupdate["srvUpdate"] = serData.srvUpdate;
		coachupdate["srvDel"] = serData.srvDel;
		coachupdate["coach"]["services"] = serData.services;

		//收费标准
		coachupdate["chgeUpdate"] = chgeData.chgeUpdate;
		coachupdate["chgeDel"] = chgeData.chgeDel;
		coachupdate["coach"]["charges"] = chgeData.charges;

		phoDelarray.length > 0 ? coachupdate["phoDel"] = phoDelarray : delete coachupdate["phoDel"];
		ajax_Update_Call(IP + "/rmwebapp/sch/brsch/coach-" + coaid, coachupdate, function(bool) {
			if (bool) {
				ajax_get(IP + "/rmwebapp/sch/brsch/coach-" + _Dr.obj.id); //获取信息
				GetCoachData(); //刷新下拉资源
			} else {
				return false;
			}
		}, {
			"success": "修改成功,请点击右下方的备案按钮进行教练员数据备案！"
		});
		return false;

	}
};

/**
教练车对象 
**/
var _CoachesManagement = {
	obj: {},
	currency: function() {
		SetOption("Sm_id", window.top.SubSchoolData); //初始化驾校下拉列表
		$("#Md_licnum").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/sch/brsch/trainingcar/","Md_licnum")');
		modal_ToSelect2(getModalconObj(_CoachesManagement.obj.btntype));
	},
	init_detailde: function() { //详情初始化
		ajax_detailde(IP + "/rmwebapp/sch/brsch/trainingcar-" + _CoachesManagement.obj.id);
	},
	init_add: function() { //添加初始化
		uploadInit("carimgc", IP + "/rmwebapp/file/carinfo-filesupload-with-thumbnail-50", uploadSuccCB_oneflie, deleteCB, _CoachesManagement.obj.paramObjcar); //正面照
		uploadInit("cmpersonalimg", IP + "/rmwebapp/file/carinfo-filesupload-with-thumbnail-50", uploadSuccCB, deleteCB, _CoachesManagement.obj.paramObj);
		$('#Md_platecolor').val('yellow');//车牌默认为黄色
		this.currency();
	},
	init_update: function() { //修改初始化
		ajax_get(IP + "/rmwebapp/sch/brsch/trainingcar-" + _CoachesManagement.obj.id);
		$("#Md_licnum").attr("readonly", "readonly"); //初始化驾校下拉列表
		$("#Md_issimulate").attr("disabled","disabled");
		this.currency();
	},
	add: function() {
		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#" + _CoachesManagement.obj.paramObjcar["inputid"]).val() == "" || $("#" + _CoachesManagement.obj.paramObjcar["inputid"]).val().replace('""', "") == "" || $("#" + _CoachesManagement.obj.paramObjcar["inputid"]).val().replace('{}', "") == "") {
			modal_pop("请上传正面照！", "fail"); //弹出对话框
			return false;
		}
		var AddCar = function() {
			var Data = _From2Json.getData();
			var AjaxAddCallBack = function(bool) {
				if (bool) {
					$(".Big-photo-model").modal("hide");
					$("#" + _CoachesManagement.obj.paramObjcar["inputid"]).val("");
					GetCarData(); //刷新车辆缓存
				} else {
					return false;
				}
			};
			ajax_add_Call(IP + "/rmwebapp/sch/brsch-" + $("#Sm_id").val() + "/trainingcar", Data, AjaxAddCallBack);
		};
		modal_prompt("该操作将向全国驾培平台申请全国统一编码并将教练车资料备案到" + _cookie.Pdistrictname + "监管服务平台。如教练车信息不准确，将会造成教练车无法正常使用设备。请核实教练车信息。是否继续该操作？", AddCar);
		return false;
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		if ($("#" + _CoachesManagement.obj.paramObjcar["inputid"]).val() == "" || $("#" + _CoachesManagement.obj.paramObjcar["inputid"]).val().replace('""', "") == "" || $("#" + _CoachesManagement.obj.paramObjcar["inputid"]).val().replace('{}', "") == "") {
			modal_pop("请上传正面照！", "fail"); //弹出对话框
			return false;
		}
		var Data = _From2Json.getData();
		if (phoDelarray.length > 0) { //判断是否有需要删除的相册
			Data["phoDel"] = phoDelarray;
		} else {
			delete Data["phoDel"];
		}
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				//$(".Big-photo-model").modal("hide");
				_CoachesManagement.init_update();
				GetCarData(); //刷新车辆缓存
			} else {
				return false;
			}
		}
		ajax_Update_Call(IP + "/rmwebapp/sch/brsch/trainingcar-" + _CoachesManagement.obj.id, Data, AjaxUpdateCallBack, {
			"success": "修改成功,请点击右下方的备案按钮进行教练车数据备案！"
		});
		return false;
	}
};

/**
学员对象模块
**/
var _StudentManagement = {
	obj: {},
	getStuCharge: function() {
		var stucharge = null;
		var $bcgIpt = $('#Sm_brccharge');
		var chargeid = $bcgIpt.val(); //班型

		if (chargeid !== '0') {
			tstucharge = {}
			var $htb = $('#hour_table');
			var $ipts = $htb.find('input:not(".hidden")');
			var $selopt = $bcgIpt.find('option:checked');
			var olditem = $selopt.data('listitem');

			$.each($ipts, function(index, val) {
				tstucharge[(this.name).toLowerCase()] = this.value;
			});

			olditem['chargeid'] = olditem['id'];
			olditem['paytype'] =$("#Sm_paytype").val();
			olditem['tratype'] = $("#Sm_tratype").val();
			olditem['chargetype'] = $("#Sm_chargetype").val();

			delete olditem['id'];

			stucharge = $.extend(true, {}, olditem, tstucharge);
		}

		return stucharge;
	},
	currency: function() {
		$("#takePhoto-btn").show();
		(PageUtils.isCtlArea(_cookie.districtid)? $('.btn-iccard'): $('.btn-qrcode')).removeClass('hidden');

		SetOption("Sm_id", window.top.CoachData); //获取教练员
		SetOption("Sm_brcrecruit", window.top.BrcrecruitData); //获取招生点
		SetOption("Sm_rc", window.top.PupDataOption); //招生渠道下拉列表
		$("#Sm_money").attr("disabled", true); //设置金额为非必填

		$("#Sm_mobile").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/student/mobile-","Sm_mobile")'); //手机重复验证
		$("#Sm_cardnum").attr("onblur", '_repetitions.Ajax(IP+"/rmwebapp/student/","Sm_cardnum")'); //身份证重复验证
		$("#Sm_cardnum").change(function() {
			var val = $(this).val();
			var dataTime = "";
			if (val.length == 15 || val.length == 18) {
				dataTime = val.substring(6, 14);
			}
			var birthday = dataTime.substring(0, 4) + "-" + dataTime.substring(4, 6) + "-" + dataTime.substring(6, 8);
			dataTime == "" ? birthday = "" : "";
			$("#Sm_birthday").val(birthday);
		});

		$("#Sm_traintype").change(function() { //选择车型出现收费标准
			var traintype = $(this).val();
			if (traintype === '0') {
				$("#Sm_brccharge").val('0').trigger('change')
			} else {
				var turl = IP + "/rmwebapp/sch/brsch/charge/" + _cookie.brschid + "/" + traintype;
				ajax_select_traintype(turl, "brccharge").done(
					function() {
						$("#Sm_brccharge").trigger('change');
					}
				);
			}

		});

		SetTableInput(true); //班型
		$("#Sm_brccharge").on('change', function(event) {
			var $htb = $("#hour_table");
			var $checkopt = $(this.options[this.options.selectedIndex]);
			var item = $checkopt.data('listitem');
			console.log(item)

			$(this).val() === "0" ? function() {
				$htb.css("display", "none").prev('div.form-group.has-feedback').addClass('hidden');
				$('#Sm_money').val('');
			}() : $htb.css("display", "block").prev('div.form-group.has-feedback').removeClass('hidden');

			if (item) {
				$("#Sm_money").val(item.price || "");
				SetHourVal(item);
			}
		});

		$("#Sm_busitype").on("change", function() {
			_modalEven.busitype(this);
		});
		laydate.skin("molv");
		$("#Sm_signuptime").attr("readonly", "readonly");
		$("#Sm_signuptime").on("click", function(e) {
			var val = $(this).val();
			laydate({
				elem: "#Sm_signuptime",
				format: "YYYY-MM-DD hh:mm:ss",
				istime: true,
				istoday: true
			});
			$(this).val(val);
		})
		_modalTool.setStudentRule();
	},
	init_detailde: function() {}, //详情初始化
	init_add: function() { //添加初始化
		this.currency();
		_CardValid($("#Sm_cardtype").val());
		$("#Sm_signuptime").val(DateUtils.getYMDHSM());
	},
	init_update: function() {
		this.currency();
		var stuid = _StudentManagement.obj.id;
		$("#Sm_brccharge_old,#Sm_physicalnum,#Sm_ecnumber,.btn-qrcode").attr("disabled", true);
		ajax_get(IP + "/rmwebapp/sch/brsch/student-" + stuid).done(function() {
			//获取电子卡号
			$.getJSON('/rmwebapp/electronics/card/student-' + stuid, function(Data, textStatus) {
				var $btnqr = $('.btn-qrcode');
				if (Data.data !== null) {
					$btnqr.data('qrcodestr', Data.data.qrcode).text('查看电子卡');
					$('#Sm_ecnumber').val(Data.data.number);
				}
				$btnqr.attr('disabled', false)
			});
		});
	},
	add: function() {
		if (!(validater.isPass())) { //表单验证
			return false
		}
		if ($("#imagefileid").val() == "") { //判断头像是否上传
			modal_pop("请上传头像！", "fail"); //弹出对话框
			return false;
		}
		var AddStudent = function() {
			var AjaxAddCallBack = function(bool) {
				if (bool) {
					$(".Big-photo-model").modal("hide");
				} else {
					return false;
				}
			};
			var Data = _From2Json.getData();
			var brcchargeObj = _StudentManagement.getStuCharge();

			Data["status"] = "SIGNUP";
			if (brcchargeObj) {
				Data["stucharge"] = brcchargeObj;
			}

			console.log(Data);
			ajax_add_Call(IP + "/rmwebapp/sch/brsch-" + SubSchId() + "/student", Data, AjaxAddCallBack);
		};
		modal_prompt("该操作将向全国驾培平台申请全国统一编码并将学员资料备案到" + _cookie.Pdistrictname + "监管服务平台。请再次确认该学员证件号【" + $('#Sm_cardnum').val() + "】,备案后将无法修改！如信息不准确，将会造成学时无法正常统计。是否继续该操作？", AddStudent);
		return false;
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		//var updateStuCb = function() {
		var Data = _From2Json.getData();
		var brcchargeObj = _StudentManagement.getStuCharge(); //获取班型参数
		if (brcchargeObj) {
			Data["stucharge"] = brcchargeObj;
		}
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				_StudentManagement.init_update();
				//$(".Big-photo-model").modal("hide");
			} else {
				return false;
			}
		}
		console.info(Data);
		ajax_Update_Call(IP + "/rmwebapp/sch/brsch/student-" + _StudentManagement.obj.id, Data, AjaxUpdateCallBack,{
			"success": "修改成功,请点击右下方的备案按钮进行学员数据备案！"
		});
		//}
		//modal_prompt("请再次确认该学员证件号【" + $('#Sm_cardnum').val() + "】,备案后将无法修改！如信息不准确，将会造成学时无法正常统计。是否继续该操作？", updateStuCb);
		return false;
	}
};

/**
收费管理对象 
**/
var _StudentChargeConfirms = {
	obj: {},
	init_update: function() { //修改初始化
		_Student = {};
		ajax_get(IP + "/rmwebapp/sch/brsch/student/pay-" + _StudentChargeConfirms.obj.id);
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		delete _Student.student.personinfo;
		_Student.money = $("#Sm_money").val();
		_Student.chargetype = $("#Sm_chargetype").val();
		_Student.paystatus = $("#Sm_paystatus").val();
		var AjaxAddCallBack = function(bool) {
			if (bool) {
				$(".StudentChargeConfirm").modal("hide");
			} else {
				return false;
			}
		};
		ajax_Update_Call(IP + "/rmwebapp/sch/brsch/student/pay", _Student, AjaxAddCallBack);
		return false;
	}
};

/**
预约受理模块对象 
**/
var _OrderAccept = {
	obj: {},
	init_setting: function() { //设置初始化
		ajaxGet('/rmwebapp/sch/brsch/stuappohour-' + this.obj.id, function(Data) {
			console.log(Data);
			var $c = $('#order-setting');
			for (var index in Data.data) {
				var o = $c.find('.' + index);
				if (o[0].nodeName == "SPAN") {
					o.text(Data.data[index]);
				} else {
					if (o.attr('type') == 'number') {
						o.val(Data.data[index]);
					} else {
						o.prop('checked', Data.data[index] === 'ENABLED').bootstrapSwitch()
					}
				}
			}
		})
	},
	setting: function() { //设置
		var $os = $('.order-setting');
		for (var k in OrderAccept_Update) {
			var o = $os.find('.' + k).eq(0);
			if (o[0].nodeName == "SPAN") {
				OrderAccept_Update[k] = o.text();
			} else {
				if (o.attr('type') == 'number') {
					OrderAccept_Update[k] = o.val();
				} else {
					o.is(':checked') == true ? (OrderAccept_Update[k] = 'ENABLED') : (OrderAccept_Update[k] = 'UNABLED');
				}
			}
		}
		ajax_Update('/rmwebapp/sch/brsch/stuappohour-' + _OrderAccept.obj.id, OrderAccept_Update);
	}
};

/**
学员结业对象
**/
var _TrainingEnd = {
	obj: {},
	init_graduation: function() {
		validater = Validater.createNew('#registrationForm', VOPTION.TrainingEnd);
		$('#Sm_grantdate').prop('readonly', 'readonly');
		var array = _TrainingEnd.obj.id.split("|");
		if (array[1] == "null") {
			PageUtils.getJson2(IP + "/rmwebapp/sch/brsch/student/graduation/num", function(Data) {
				$('#Sm_gracertnum').val(Data.num);
				$('#Sm_grantdate').val(Utils.getYMDHSM());
			});
		} else {
			$('#Sm_gracertnum').val(array[2]);
			$('#Sm_grantdate').val(array[3]);
		}
		laydate.skin("molv");
		$("#Sm_grantdate").attr("readonly", "readonly");
		$("#Sm_grantdate").on("click", function(e) {
			var val = $(this).val();
			laydate({
				elem: "#Sm_grantdate",
				format: "YYYY-MM-DD hh:mm:ss",
				istime: true,
				istoday: true
			});
			$(this).val(val);
		})
	},
	graduation: function() {
		if (!(validater.isPass())) {
			return false
		}
		var array = _TrainingEnd.obj.id.split("|");
		var $btn = $(_TrainingEnd.obj.name);
		var stuCode = $btn.parent().parent().find("td:eq(2) span").text();
		var Data = _From2Json.getData();
		Data["student"] = {};
		Data["student"]["id"] = array[0];
		Data["esignature"] = Utils.sign({
			"stunum": stuCode,
			"autinscode": _cookie.autinscode,
			"gracertnum": Data.gracertnum,
			"grantdate": (Data.grantdate.split(" ")[0]).replace(/-/g, "")
		});
		// if (Utils.getSignPhoto() == false) {
		// 	return false;
		// }
		// Data["sealText"] = Utils.getSignPhoto();
		array[1] != "null" ? Data["id"] = array[1] : "";
		var AjaxUpdateCallBack = function(bool) {
			if (bool) {
				$(".end").modal("hide");
			} else {
				return false;
			}
		}
		ajax_add_Call(IP + "/rmwebapp/sch/brsch/student/graduation", Data, AjaxUpdateCallBack);
		return false;
	}
};

/**
排班分组对象
**/
var _ScheduleArray = {
	obj: {},
	currency: function() {
		SetOption("Sm_trainareaid", window.top.TrainareData);
		SetOption("Sm_brid", window.top.SubSchoolData);
		modal_ToSelect2(getModalconObj(this.obj.btntype));
		$("#Sm_isOrdinalAppoint").on("change", function() {
			var val = $(this).val();
			var DivId = ["Sm_maxStuNum", "Sm_minStuNum"];
			var setDiv = function(arrays, bool) {
				for (var i in arrays) {
					HideDiv_P({
						DivId: arrays[i],
						isTure: bool,
						ParentNum: 2
					})
				}
			}
			val == "1" ? setDiv(DivId, false) : setDiv(DivId, true);
			PageUtils.tipTools($(this));
		});
	},
	init_add: function() { //添加初始化
		this.currency();
		HideDiv_P({
			DivId: "Sm_maxStuNum",
			isTure: true,
			ParentNum: 2
		});
		HideDiv_P({
			DivId: "Sm_minStuNum",
			isTure: true,
			ParentNum: 2
		});
	},
	init_update: function() { //修改初始化
		this.currency();
		var arrays = this.obj.id.split("|");
		$("#Sm_trainareaid").val(arrays[2]);
		$("#Sm_brid").val(arrays[1]);
		$("#Sm_name").val(arrays[3]);
		if (arrays[4] != "undefined") {
			$("#Sm_isOrdinalAppoint").val(arrays[4]);
			$("#Sm_maxStuNum").val(arrays[5]);
			$("#Sm_minStuNum").val(arrays[6]);
		} else {
			$("#Sm_isOrdinalAppoint").val("0");
			var arrys = ["Sm_maxStuNum", "Sm_minStuNum"];
			for (var i in arrys) {
				HideDiv_P({
					DivId: arrys[i],
					isTure: true,
					ParentNum: 2
				})
			}
		}
		modal_ToSelect2(getModalconObj(this.obj.btntype));
	},
	add: function() { //添加
		if (!(validater.isPass())) {
			return false
		}
		for (var k in _ScheduleArray_model) {
			_ScheduleArray_model[k] = $("#Sm_" + k).val();
		}
		var AjaxAddCallBack = function(bool) {
			if (bool) {
				$(".ScheduleArray").modal("hide");
				GetGroupData(); //获取模板分组
			} else {
				return false;
			}
		};
		ajax_add_Call(IP + "/rmwebapp/group/addgroup", _ScheduleArray_model, AjaxAddCallBack);
		return false;
	},
	update: function() { //修改
		if (!(validater.isPass())) {
			return false
		}
		for (var k in _ScheduleArray_model) {
			_ScheduleArray_model[k] = $("#Sm_" + k).val();
		}
		_ScheduleArray_model["id"] = _ScheduleArray.obj.id.split("|")[0];
		var AjaxupdateCallBack = function(bool) {
			if (bool) {
				$(".ScheduleArray").modal("hide");
				delete _ScheduleArray_model["id"];
				GetGroupData(); //获取模板分组
			} else {
				delete _ScheduleArray_model["id"];
				return false;
			}
		};
		ajax_Update_Call(IP + "/rmwebapp/group/update", _ScheduleArray_model, AjaxupdateCallBack);
		return false;
	}
};

/**
场地模板对象
**/
var _SchScheduleModel = {
	obj: {},
	currency: function() {
		makeSchedual.initInput();
		$("#Sm_braid").on("change", function(e) { //所属驾校绑定事件
			$("#Sm_trainareaid").trigger("link"); //触发教练场联动
			$("#Sm_classtype").trigger("link"); //触发班型联动
			if ($(this).val() != "0") {}
			$('#hour_table select[name="trainareaid"]').val("0").trigger("change");
		});
		$("#Sm_trainareaid").on("change", function(e) { //教练场绑定事件
			$("#Sm_groupid").trigger("link"); //触发分组联动
			$('#hour_table select[name="trainareaid"]').val($(this).val()).trigger("change");
		}).on("link", function(e) {
			var v = $("#Sm_braid").val();
			if (v === "0") {
				PageUtils.clearSelect($(this));
				return;
			}
			var myurl = "/rmwebapp/sch/brsch-" + v + "/branchCharge/trcarea";
			var selectors = ["#Sm_trainareaid", "#hour_table select[name='trainareaid']"];
			var opt = {
				"selectors": selectors
			};
			PageUtils.getJson(myurl, PageUtils.makeSelectStr, opt);
		});
		$("#Sm_groupid").on("link", function(e) { //分组绑定
			var v = $("#Sm_trainareaid").val();
			if (v === "0") {
				PageUtils.clearSelect($(this));
				return;
			}
			var myurl = "/rmwebapp/group/groupbytrain?trainid=" + v;
			var opt = {
				"selectors": ["#Sm_groupid"]
			};
			PageUtils.getJson(myurl, PageUtils.makeSelectStr, opt);
		});
		makeSchedual.bindEvent();
		validater = Validater.createNew('#registrationForm', VOPTION.SchScheduleModel); //创建校验规则
		makeSchedual.btfIpt();
	},
	init_add: function() { //添加初始化
		this.currency();
	},
	init_update: function() { //修改初始化
		this.currency();
		$("#Sm_trainareaid").one("done", function(e) { //ajax请求完会触发此事件 只触发一次
			$(this).val($(this).data("value")).trigger("change");
		})
		$("#Sm_groupid").one("done", function(e) {
			$(this).val($(this).data("value")).trigger("change");
		})
		$("#Sm_classtype").one("done", function(e) {
			$(this).val($(this).data("value")).trigger("change");
		})
		ajax_get(IP + "/rmwebapp/templet/querysingle?type=0&id=" + this.obj.id);
	},
	add: function() { //添加
		if (!validater.isPass()) {
			return false;
		}
		var detailtems = PageUtils.getJxData(); //获得精细排班行数据
		var AjaxData = {}; //精细排班数据构建
		AjaxData["tratem"] = PageUtils.getFormData();
		AjaxData["dettems"] = PageUtils.getJxData(); //获得精细排班行数据
		ajax_add_Call(IP + "/rmwebapp/templet/addgroup", AjaxData, PageUtils.modalCtr);
		return false;
	},
	update: function() { //修改
		if (!validater.isPass()) {
			return false;
		}
		var AjaxData = {};
		AjaxData["tratem"] = PageUtils.getFormData();
		AjaxData["tratem"]["id"] = _SchScheduleModel.obj.id;
		if(AjaxData["tratem"]['paytype'] == ""){
			AjaxData["tratem"]['paytype'] = 'WithoutPay';
		}
		AjaxData["dettems"] = PageUtils.getJxData();
		AjaxData["deletetems"] = PageUtils.getJxDelData();
		ajax_Update_Call(IP + "/rmwebapp/templet/updategourp", AjaxData, PageUtils.modalCtr);
		return false;
	}
};

/**
教练模板对象
**/
var _CoaScheduleModel = {
	obj: {},
	currency: function() {
		makeSchedual.initInput();
		$("#Sm_braid").on("change", function(e) { //所属驾校绑定事件
			var braid = $(this).val();
			if (braid != "0") {
				$("#Sm_trainareaid").trigger("link", braid); //触发教练场联动
				$("#Sm_coaid").trigger("link", braid); //触发分组联动
				$("#Sm_classtype").trigger("link", braid); //触发班型联动
			}
			$('#hour_table select[name="trainareaid"]').val("0").trigger("change");
		});
		$("#model").on("change", function(e) { //添加模式事件
			$(this).val() === "1" ? $("#coaTitle").html("教练") : $("#coaTitle").html("教练组");
			$("#Sm_coaid").trigger('link'); //触发教练/教练组的刷新
		});
		$("#Sm_trainareaid").on("change", function(e) { //教练场绑定事件
			$('#hour_table select[name="trainareaid"]').val($(this).val()).trigger("change");
		}).on("link", function(e, braid) {
			var myurl = "/rmwebapp/sch/brsch-" + braid + "/branchCharge/trcarea";
			var selectors = ["#Sm_trainareaid", "#hour_table select[name='trainareaid']"];
			var opt = {
				"selectors": selectors
			};
			PageUtils.getJson(myurl, PageUtils.makeSelectStr, opt);
		});
		$("#Sm_coaid").on("link", function(e, braid) { //分组绑定
			if (braid === "0") {
				return;
			}
			var myurl = "/rmwebapp/sch/brsch-" + braid + "/coach-names";
			if ($("#model").val() === "0") { //加载教练组，默认为教练
				myurl = "/rmwebapp/group/querygroup?brid=" + braid + "&page=1&size=0";
			}
			var opt = {
				"selectors": ["#Sm_coaid"]
			};
			PageUtils.getJson(myurl, PageUtils.makeSelectStr, opt);
		});
		makeSchedual.bindEvent();
		validater = Validater.createNew('#registrationForm', VOPTION.CoaScheduleModel); //创建校验规则
		makeSchedual.btfIpt();
	},
	init_add: function() { //添加初始化
		this.currency();
	},
	init_update: function() { //修改初始化
		this.currency();
		$("#Sm_trainareaid").one("done", function(e) {
			$(this).val($(this).data("value")).trigger("change");
		})
		$("#Sm_coaid").one("done", function(e) {
			$(this).val($(this).data("value")).trigger("change");
		})
		$("#Sm_classtype").one("done", function(e) {
			$(this).val($(this).data("value")).trigger("change");
		})
		
		ajax_get(IP + "/rmwebapp/templet/querysingle?type=1&id=" + this.obj.id);
	},
	add: function() { //添加
		if (!validater.isPass()) {
			return false;
		}
		var AjaxData = {};
		var Model = PageUtils.getFormData();
		$("#model").val() === "1" ? (AjaxData["id"] = Model["coaid"]) : (AjaxData["groupid"] = Model["coaid"]);
		delete Model.coaid;
		if ($("#Sm_detailstatus").val() == "1") { //是精细模板是需要传基础信息价格和名额传个默认值
			Model["price"] = 200;
			Model["number"] = 3;
		}
		AjaxData["json"] = JSON.stringify(Model);
		AjaxData["dettems"] = PageUtils.getJxData(); //获得精细排班行数据;
		console.info(AjaxData);
		ajax_add_Call(IP + "/rmwebapp/templet/addcoa", AjaxData, PageUtils.modalCtr);
		return false;
	},
	update: function() { //修改
		if (!validater.isPass()) {
			return false;
		}
		var AjaxData = {};
		AjaxData["coatem"] = PageUtils.getFormData(); //精细排班数据构建
		AjaxData["coatem"]["id"] = _CoaScheduleModel.obj.id;
		AjaxData["dettems"] = PageUtils.getJxData();
		AjaxData["deletetems"] = PageUtils.getJxDelData();
		if(AjaxData["coatem"]['paytype'] == ""){
			AjaxData["coatem"]['paytype'] = 'WithoutPay';
		}
		ajax_Update_Call(IP + "/rmwebapp/templet/updatecoa", AjaxData, PageUtils.modalCtr);
		return false;
	}
};

/**
模板 
**/
var _model = {
	obj: {},
	init_detailde: function() { //详情初始化
	},
	init_add: function() { //添加初始化
	},
	init_update: function() { //修改初始化
	},
	add: function() { //添加
	},
	update: function() { //修改
	}
};


var initAmap = function(selectorid) {
	$("#Md_lng,#Md_lat").attr("readonly", "readonly");
	AMap.service('AMap.Geocoder', function() { //回调函数
		//实例化Geocoder
		geocoder = new AMap.Geocoder();
	})
	$("#" + selectorid).on("blur", function(e) {
		var value = $(this).val();
		if ($(this).valid() && value.trim()) {
			GetLngLat(value);
		}
	});
}

function _CardValid(val) {
	var $input = $("#Sm_cardnum").length > 0 ? $("#Sm_cardnum") : $("#Md_cardnum");
	$input.rules("remove", "card");
	switch (val) {
		case "0":
			$input.val('');
			break;
		case "IDCARD":
			$input.rules("add", {
				card: /(^\d{18}$|^\d{17}(\d|X))$/
			});
			break;
		case "HKMIDCARD":
			$input.rules("add", {
				card: /^[a-zA-Z]{1,2}\d{6}\([0-9a-zAZ-Z]\)$|^[1|5|7][0-9]{6}\([0-9Aa]\)$|^[A-Z][0-9]{9}$/
			});
			break;
		case "OFFICERCERTIFICATE":
			$input.rules("add", {
				card: /^[a-zA-Z0-9]{7,21}$/
			});
			break;
		case "PASSPORT":
			$input.rules("add", {
				card: /^[a-zA-Z0-9]{3,21}$|^(P\d{7})|(G\d{8})$/
			});
			break;
		case "STUDENTIDCARD":
			$input.rules("add", {
				card: /^[\d]+$/
			});
			break;
		case "OTHER":
			$input.rules("add", {
				card: /^[a-zA-Z0-9]{3,21}$/
			});
			break;
		default:
			break;
	}
	$input.valid();
}