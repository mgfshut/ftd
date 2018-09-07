var _Excel_Option;
var _Excel_Option_Data;
var _Excel_file;
var _Excel_Array = {};

function ShowExcelImport() {
	var validator = null;
	bootbox.dialog({
		message: _ForExcelForm(),
		title: "导入文件",
		className: "modal-darkorange center-modal",
		buttons: {
			success: {
				label: "导入",
				className: "btn-primary btn-Ajax",
				callback: function() {
					if(!_Excel_file || !_Excel_file.id || !_Excel_file.fileurl){
						modal_pop("请先上传Excel！", "fail");
						return false;
					}
					if(validator.form()){
						_Post_Array();
						_Excel_Post.file = _Excel_file;
						_Excel_Post.excelHead = _Excel_Array;
						console.info(JSON.stringify(_Excel_Post));
	
						ajax_add(IP + "/rmwebapp/excel/" + _ReturnExcelType() + "/import-" + SubSchId(), _Excel_Post, function(){
							$(".bootbox").trigger("escape.close.bb");
							_Excel_file = null;
						});
					}
					return false;
				}
			},
			"取消": {
				className: "btn-warning",
				callback: function() {
					_Excel_file = null;
				}
			}
		},
		onEscape: function(){
			_Excel_file = null;
		}
	}).init(function(){
		var UplodUrl = IP + "/rmwebapp/excel/" + _ReturnExcelType() + "-upload";
		var $imgUpload = $("#imgUpload"), $form = $("#registrationForm");
		$imgUpload.fileinput({
			language: "zh",
			uploadUrl: UplodUrl,
			uploadAsync: false,
			maxFileCount: 1,
			autoReplace: true,
			allowedFileExtensions: ["xlsx", "xls"],
			minImageWidth: 50,
			minImageHeight: 50,
			showUploadedThumbs: false,
			initialCaption: '请选择Excel文件',
			dropZoneTitle: "请选择Excel文件",
			fileActionSettings: {
				showZoom: false
			},
			ajaxSettings: {
				dataFilter: function(data, type){
					var jsonData = JSON.parse(data);
					if(jsonData.errorcode == 0){
						if(jsonData.data.headList.length > 0){
							return data;
						}
						jsonData.message = "Excel文件无表头标题(需位于Excel文件的第一行)";
					} 
					return JSON.stringify({
						error: jsonData.message || "Excel不符合要求！"
					});
				}
			}
		});
		$imgUpload.on("change", function(event){
			_Excel_file = null;
		});
		$imgUpload.on('filebatchuploadsuccess', function(event, data) {
			var obj = data.response;
			_Excel_Option_Data = obj.data.headList;
			_Excel_file = {
				"id": obj.data.file.id,
				"fileurl": obj.data.file.fileurl
			}
			_Select_append();
		});
		$imgUpload.on('filebatchuploaderror', function(event, data, msg) {
			var obj = data.response;
			if(JSON.stringify(obj) != "{}"){
				modal_pop(obj.error || "Excel不符合要求！", "fail");
			} else {
				modal_pop("Excel上传失败！", "fail");
			}
		});
		jQuery.validator.addMethod("noZeroForVal", function(value, element, param) {
		    return value != 0;
		}, $.validator.format("必须选择一个选项"));
		var options = {
			rules: {},
			messages: {},
			errorPlacement: function(error, element) {  
			    error.appendTo(element.prev());  
			}
		};
		$form.find("select[name]").change(function(){
			validator.form();
		}).each(function(){
			var $this = $(this);
			var labelText = $this.prev().text().replace(/:$/, "");
			options.rules[this.name] = {
				noZeroForVal: true
			};
			options.messages[this.name] = {
				noZeroForVal: "请选择" + labelText
			};
			$this.prev().html(labelText + color + ":");
			$this.select2();
		});
		validator = $form.validate(options);
	});
}

//获取当前模块返回对应的类型
function _GetType() {
	var type = UrlValue("v");
	switch(type) {
		case "Dr":
			return "coach";
			break;
		case "StudentManagement":
			return "student";
			break;
		case "CoachesManagement":
			return "car";
			break;
		case "dev":
			return "device";
			break;
	}
}

//获取提交数组
function _Post_Array() {
	var selectobj = _GetFromData();
	_Excel_Array = {};
	if(selectobj.data.length >= 0) {
		for(var i = 0; i < selectobj.data.length; i++) {
			if(selectobj.data[i].type === "select") {
				_Excel_Array[selectobj.data[i].id] = $("#E_" + selectobj.data[i].id).val();
			}
		}
	}
}

//下拉框追加数据
function _Select_append() {
	var selectobj = _GetFromData();
	var OptionStr = '<option value="0">请选择</option>';
	for(var j = 0; j < _Excel_Option_Data.length; j++) {
		OptionStr += '<option value="' + _Excel_Option_Data[j] + '">' + _Excel_Option_Data[j] + '</option>';
	}
	for(var i = 0; i < selectobj.data.length; i++) {
		if(selectobj.data[i].type === "select") {
			var $el = $("#E_" + selectobj.data[i].id);
			$el.html(OptionStr).select2();
			if(jQuery.inArray(selectobj.data[i].title, _Excel_Option_Data) != -1) {
				$el.val(selectobj.data[i].title).trigger("change");
			}
		}
	}
}

//获取下拉数据
function _GetFromData() {
	var type = UrlValue("v");
	switch(type) {
		case "Dr":
			return _Excel_Dr;
		case "StudentManagement":
			return _Excel_Student;
		case "CoachesManagement":
			return _Excel_Car;
		case "TrainingOrder":
			return _Excel_TrainingOrder;
		case "dev":
			return _Excel_Device;
	}
}

//返回上传类型
function _ReturnExcelType() {
	var type = UrlValue("v");
	switch(type) {
		case "Dr":
			return "coach";
		case "StudentManagement":
			return "student";
		case "CoachesManagement":
			return "car";
		case "TrainingOrder":
			return "stuapomexam";
		case "dev":
			return "device";
	}
}

function _ForExcelForm() {
	var html = '';
	var body = '';

	body += '<div id="Excel" style="display: block;" >' + _GetForm_Execl() + '</div>';
	body += '<div class="form-group has-feedback" style="margin-left: 0px; margin-right: 0px;">';
	body += '<input id="imgUpload" type="file" name="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">';
	body += '</div>';
	var html = '<div style="height:100%;overflow-y: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" style="padding: 0 1px;" method="post" class="form-horizontal">' +
		'<div id="ExcelMessage" style="border:1px solid #C7DDB9;    margin: 10px 0 5px;background-color: #f9fafc;padding: 11px 12px;display: block;">' +
		'<a style="color: #090;">请先上传Excel,再把Excel的表头对应到以下显示的信息中！</a>' +
		'</div>' +
		body +
		'</form>' +
		'</div>';
	return html;
}

function _GetForm_Execl() {
	var row = ''; //临时存放的行
	var body = ''; //整个html
	var Data = _GetFromData();
	for(var j = 0; j < Data.data.length; j++) {
		var FromObj = $.extend(true, {class: "col-lg-4 col-md-4 col-xs-4"}, Data.data[j]);
		row += _FormInputHtml(FromObj);
		if((j + 1) % 3 == 0 || j + 1 == Data.data.length) {
			body += _GetForm_Execl_row(row);
			row = '';
		} 
	}
	return body;
}

function _GetForm_Execl_row(body) {
	var html = '';
	html += '<div class="form-group has-feedback">';
	html += body;
	html += '</div>';
	return html;
}

//获取单个输入框的html
function _FormInputHtml(Data) {
	//title, id, type, sqlname, inputtext, onchange, selectData,class
	var html = '';
	switch(Data.type) {
		case "select":
			html += '<div class="' + Data.class + '">';
			html += '<div  style="margin-top:4px;text-align:left;">';
			html += '<div style="float: left;height: 30px;line-height: 30px;margin-right: 3px;width:88px;text-align: right;">' + Data.title + ':</div>';
			html += '<select style="float: left;width: 70%;" id="E_' + Data.id + '" name="E_' + Data.id + '" style="width:100%"  onchange="' + Data.onchange + ';">';
			html += '<option value="0">请选择</option>';
			if(Data.selectData.length > 0) {
				for(var i = 0; i < Data.selectData.length; i++) {
					html += '<option value="' + Data.selectData[i].value + '">' + Data.selectData[i].Text + '</option>';
				}
			}
			html += '</select>';
			html += '</div>';
			html += '</div>';
			break;
		case "input":
			html += '<div class="' + Data.class + '">';
			html += '<div  style="margin-top:4px;text-align:left;" >';
			html += '<div style="float: left;height: 30px;line-height: 30px;margin-right: 3px;width:58px;text-align:right;">' + Data.title + ':</div>';
			html += '<input style="float: left;width: 70%;" id="' + Data.id + '" name="' + Data.id + '" onchange="' + Data.onchange + ';" placeholder="' + Data.inputtext + '" class="form-control input-sm text-center fon" type="text">';
			html += '</div>';
			html += '</div>';
			break;
		case "dayinput":
			html += '<div class="' + Data.class + '">';
			html += '<div  style="margin-top:4px;text-align:left;" >';
			html += '<div style="float: left;height: 30px;line-height: 30px;margin-right: 3px;width:58px;text-align:right;">' + Data.title + ':</div>';
			html += '<div  class="input-group" style="float: left;width: 70%;"><span class="input-group-addon"> <i class="fa fa-calendar"></i></span><input id="' + Data.id + '" name="' + Data.id + '" onchange="' + Data.onchange + ';" class="form-control date-picker" type="text" data-date-format="yyyy-mm-dd"></div>';
			html += '</div>';
			html += '</div>';
			break;
	}
	return html;
}

function _Excel_Select_Change() {
	//alert();
}

var _Excel_Dr = {
	"data": [{
		"title": "姓名",
		"id": "name",
		"type": "select",
		"sqlname": "name",
		"inputtext": "姓名",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "性别",
		"id": "sex",
		"type": "select",
		"sqlname": "sex",
		"inputtext": "性别",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "证件类型",
		"id": "cardtype",
		"type": "select",
		"sqlname": "cardtype",
		"inputtext": "证件类型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "证件号",
		"id": "cardnum",
		"type": "select",
		"sqlname": "cardnum",
		"inputtext": "证件号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "手机号码",
		"id": "mobile",
		"type": "select",
		"sqlname": "mobile",
		"inputtext": "手机号码",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "联系地址",
		"id": "address",
		"type": "select",
		"sqlname": "address",
		"inputtext": "联系地址",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "入职时间",
		"id": "hiredate",
		"type": "select",
		"sqlname": "hiredate",
		"inputtext": "入职时间",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "驾驶证号",
		"id": "drilicence",
		"type": "select",
		"sqlname": "drilicence",
		"inputtext": "驾驶证号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "驾驶证初领日期",
		"id": "fstdrilicdate",
		"type": "select",
		"sqlname": "fstdrilicdate",
		"inputtext": "初领日期",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "准驾车型",
		"id": "dripermitted",
		"type": "select",
		"sqlname": "dripermitted",
		"inputtext": "准驾车型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "准教车型",
		"id": "teachpermitted",
		"type": "select",
		"sqlname": "teachpermitted",
		"inputtext": "准教车型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "身份证有效期",
		"id": "cardvaliddate",
		"type": "select",
		"sqlname": "cardvaliddate",
		"inputtext": "准教车型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "驾驶证有效期",
		"id": "drilicvaliddate",
		"type": "select",
		"sqlname": "drilicvaliddate",
		"inputtext": "准教车型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "教练证号",
		"id": "qualnum",
		"type": "select",
		"sqlname": "qualnum",
		"inputtext": "教练证号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}]
};

var _Excel_Student = {
	"data": [{
		"title": "学员姓名",
		"id": "name",
		"type": "select",
		"sqlname": "name",
		"inputtext": "学员姓名",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "性别",
		"id": "sex",
		"type": "select",
		"sqlname": "sex",
		"inputtext": "性别",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "国籍",
		"id": "nationality",
		"type": "select",
		"sqlname": "nationality",
		"inputtext": "国籍",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "证件类型",
		"id": "cardtype",
		"type": "select",
		"sqlname": "cardtype",
		"inputtext": "证件类型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "证件号",
		"id": "cardnum",
		"type": "select",
		"sqlname": "cardnum",
		"inputtext": "证件号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "户籍所在地",
		"id": "censusregister",
		"type": "select",
		"sqlname": "censusregister",
		"inputtext": "户籍所在地",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "手机号码",
		"id": "mobile",
		"type": "select",
		"sqlname": "mobile",
		"inputtext": "手机号码",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "联系地址",
		"id": "address",
		"type": "select",
		"sqlname": "address",
		"inputtext": "联系地址",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "报名时间",
		"id": "signuptime",
		"type": "select",
		"sqlname": "signuptime",
		"inputtext": "报名时间",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "业务类型",
		"id": "busitype",
		"type": "select",
		"sqlname": "busitype",
		"inputtext": "业务类型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "培训车型",
		"id": "traintype",
		"type": "select",
		"sqlname": "traintype",
		"inputtext": "培训车型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "科目一(小时)",
		"id": "course1class",
		"type": "select",
		"sqlname": "course1class",
		"inputtext": "科目一(小时)",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "科目二(小时)",
		"id": "course2class",
		"type": "select",
		"sqlname": "course2class",
		"inputtext": "科目二(小时)",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "科目三(小时)",
		"id": "course3class",
		"type": "select",
		"sqlname": "course3class",
		"inputtext": "科目三(小时)",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "科目四(小时)",
		"id": "course4class",
		"type": "select",
		"sqlname": "course4class",
		"inputtext": "科目四(小时)",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}]
};

var _Excel_Car = {
	"data": [{
		"title": "车辆号牌",
		"id": "licnum",
		"type": "select",
		"sqlname": "licnum",
		"inputtext": "车辆号牌",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "生产厂牌",
		"id": "brand",
		"type": "select",
		"sqlname": "brand",
		"inputtext": "生产厂牌",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "生产厂家",
		"id": "manufacture",
		"type": "select",
		"sqlname": "manufacture",
		"inputtext": "生产厂家",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "型号",
		"id": "model",
		"type": "select",
		"sqlname": "model",
		"inputtext": "型号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "车牌颜色",
		"id": "platecolor",
		"type": "select",
		"sqlname": "platecolor",
		"inputtext": "车牌颜色",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "车辆代码",
		"id": "perdritype",
		"type": "select",
		"sqlname": "perdritype",
		"inputtext": "车辆代码",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "购买日期",
		"id": "buydate",
		"type": "select",
		"sqlname": "buydate",
		"inputtext": "购买日期",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "核定乘员数",
		"id": "crewnum",
		"type": "select",
		"sqlname": "crewnum",
		"inputtext": "核定乘员数",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "道路运输证号",
		"id": "transportno",
		"type": "select",
		"sqlname": "transportno",
		"inputtext": "道路运输证号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "机动车登记证号",
		"id": "certificateno",
		"type": "select",
		"sqlname": "certificateno",
		"inputtext": "机动车登记证号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "运输证有效期开始",
		"id": "transportdatefrom",
		"type": "select",
		"sqlname": "transportdatefrom",
		"inputtext": "运输证有效期开始",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "运输证有效期结束",
		"id": "transportdateto",
		"type": "select",
		"sqlname": "transportdateto",
		"inputtext": "运输证有效期结束",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}]
};

var _Excel_TrainingOrder = {
	"data": [{
		"title": "学员姓名",
		"id": "stuname",
		"type": "select",
		"sqlname": "stuname",
		"inputtext": "学员姓名",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "准考证明编号" ,
		"id": "examnum",
		"type": "select",
		"sqlname": "examnum",
		"inputtext": "准考证明编号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "身份证明号码" ,
		"id": "cardnum",
		"type": "select",
		"sqlname": "cardnum",
		"inputtext": "身份证明号码",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "考试科目" ,
		"id": "subject",
		"type": "select",
		"sqlname": "subject",
		"inputtext": "考试科目",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "考试车型" ,
		"id": "cardtype",
		"type": "select",
		"sqlname": "cardtype",
		"inputtext": "考试车型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "预约日期" ,
		"id": "apomtime",
		"type": "select",
		"sqlname": "apomtime",
		"inputtext": "预约日期",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "约考日期" ,
		"id": "examtime",
		"type": "select",
		"sqlname": "examtime",
		"inputtext": "约考日期",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "考试场地" ,
		"id": "examplace",
		"type": "select",
		"sqlname": "examplace",
		"inputtext": "考试场地",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "考试场次" ,
		"id": "examseason",
		"type": "select",
		"sqlname": "examseason",
		"inputtext": "考试场次",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}]
};

var _Excel_Device = {
	"data": [{
		"title": "设备型号",
		"id": "devtype",
		"type": "select",
		"sqlname": "devtype",
		"inputtext": "设备型号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "SIM号",
		"id": "sim",
		"type": "select",
		"sqlname": "sim",
		"inputtext": "SIM号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "IMEI号",
		"id": "imei",
		"type": "select",
		"sqlname": "imei",
		"inputtext": "IMEI号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "终端类型",
		"id": "termtype",
		"type": "select",
		"sqlname": "termtype",
		"inputtext": "终端类型",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}, {
		"title": "出厂序列号",
		"id": "sn",
		"type": "select",
		"sqlname": "sn",
		"inputtext": "出厂序列号",
		"selectData": [],
		"onchange": "_Excel_Select_Change()"
	}]
};

//{"propertyName":"excelColumnName"}
var _Excel_Post = {
	"file": {
		"id": "文件id",
		"fileurl": "文件路径"
	},
	"excelHead": {}
}