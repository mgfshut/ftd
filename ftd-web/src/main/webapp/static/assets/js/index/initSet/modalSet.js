function getModalObj(btntype, id, name) {
	var type = UrlValue("v");
	_modal.obj = {
		btntype: btntype,
		id: id,
		name: name
	};
	_modal[type]();
}

var ICTip = '<span style="color:red; font-size:8px;padding-left:8px;">*请在360浏览器8.0+或IE9+上使用IC卡写入功能!</span>';
var MsICOptor = window.top.MsICOptor;
var _Student = {};
var _modal = {
	obj: {},
	AreaManager: function() { //违规记录
		var $a = $(this.obj.name);
		var $tds = $a.closest('tr').find('td');
		var carnum = $tds.eq(4).text(); //车牌号码
		var brid = $tds.eq(1).find('>span').data('brid'); //分校
		parent.addWTabs('code' + this.obj.id, carnum + '-违规轨迹', 'schoolArea/AreaDetailde.html?id=' + this.obj.id + '&brid=' + brid);
	},
	TrainingOrder: function() { //预约考试
		_TrainingOrder.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add"), stuOrderHtml()),
				title: "确认预约",
				label: "添加"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_TrainingOrder)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_TrainingOrder);
	},
	CarArchival: function() { //教练车档案
		_CarArchival.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add")),
				title: "新增规定项目信息",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("add")),
				title: "修改规定项目信息",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_CarArchival)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_CarArchival);
	},
	PollingRecord: function() { //巡检记录
		_PollingRecord.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add"), MakePhotoList()),
				title: "新增巡检记录信息",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("update"), MakePhotoList()),
				title: "修改巡检记录信息",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_PollingRecord)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_PollingRecord);
	},
	RefuelRecord: function() { //加油记录
		_RefuelRecord.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add"), MakePhotoList()),
				title: "新增加油记录信息",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("update"), MakePhotoList()),
				title: "修改加油记录信息",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_RefuelRecord)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_RefuelRecord);
	},
	AccidentRecord: function() { //事故记录
		_AccidentRecord.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add"), MakePhotoList()),
				title: "新增事故记录信息",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("update"), MakePhotoList()),
				title: "修改事故记录信息",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_AccidentRecord)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_AccidentRecord);
	},
	TrafficUnlaw: function() { //交通违法
		_TrafficUnlaw.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add"), MakePhotoList()),
				title: "新增交通违法信息",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("update"), MakePhotoList()),
				title: "修改交通违法信息",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_TrafficUnlaw)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_TrafficUnlaw);
	},
	SafeCheck: function() { //安全检测
		_SafeCheck.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add"), MakePhotoList()),
				title: "新增安全检测信息",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("update"), MakePhotoList()),
				title: "修改安全检测信息",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_SafeCheck)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_SafeCheck);
	},
	MaintainUpkeep: function() { //维修保养
		_MaintainUpkeep.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add"), MakePhotoList()),
				title: "新增维修保养信息",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("update"), MakePhotoList()),
				title: "修改维修保养信息",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_MaintainUpkeep)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_MaintainUpkeep);
	},
	StipulateProject: function() { //规定项目
		_StipulateProject.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"add": {
				message: GetFrom(getModalconObj("add")),
				title: "新增规定项目",
				label: "添加"
			},
			"update": {
				message: GetFrom(getModalconObj("update")), //用add的框
				title: "修改规定项目",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange default-modal",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_StipulateProject)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_StipulateProject);
	},
	School: function() {
		_School.obj = _modal.obj;
		var message, title, label;
		var obj = {
			"update": {
				message: GetFrom(getModalconObj("update")),
				title: "修改驾校",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange  Big-model",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_School)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_School);
	},
	SubSchool: function() {
		_SubSchool.obj = {
			btntype: _modal.obj.btntype,
			id: _modal.obj.id,
			name: _modal.obj.name,
			subtimgid_paramObj: {
				async: false, //同步操作
				inputid: "subtimgid",
				dropZoneTitle: "分校相册"
			},
			defimg_paramObj: {
				async: false, //同步操作
				inputid: "defaultimg",
				dropZoneTitle: "网站默认图片"
			}
		}
		var obj = {
			"add": {
				title: "添加分校",
				label: "添加"
			},
			"update": {
				title: "修改分校",
				label: "修改",
				buttons: [{
					keys: "备案",
					label: "",
					className: "btn-success",
					callback: function() {
						Utils.buttonRecord(_SubSchool.obj.id, "Big-model");
						return false;
					}
				},{
					keys:"修改分校",
					label:"修改",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_SubSchool)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			},
			"detailde": {
				title: "分校详情",
				buttons: [{
					keys: "关闭",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype)),
			title: val.title,
			className: "modal-darkorange  Big-model",
			buttons: val.buttons == undefined ? [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_SubSchool)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}] : val.buttons
		});
		_Currency.init(_SubSchool);
	},
	TeachSiteSel: function() {
		_TeachSiteSel.obj = {
			btntype: _modal.obj.btntype,
			id: _modal.obj.id,
			name: _modal.obj.name,
			mapCenter: [_cookie.lng, _cookie.lat] //教学区地图中心点
		}
		var obj = {
			"add": {
				title: "添加教学区域",
				label: "添加",
				buttons: [{
					keys: "温馨提示：请选择多边形画出教学区域。",
					label: "",
					className: "pull-left disabled virtual",
					callback: function() {}
				}, {
					keys: "success",
					label: "添加",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_TeachSiteSel)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			},
			"update": {
				title: "修改教学区域",
				label: "修改",
				buttons: [{
					keys: "备案",
					label: "",
					className: "btn-success",
					callback: function() {
						Utils.buttonRecord(_TeachSiteSel.obj.id, "Big-photo-model");
						return false;
					}
				}, {
					keys: "修改",
					label: "修改",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_TeachSiteSel)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom_TeachSiteSel(getModalconObj(_modal.obj.btntype)),
			title: val.title,
			className: "modal-darkorange  TrachSiteSel-model",
			buttons: val.buttons
		});
		_Currency.init(_TeachSiteSel);
	},
	Dr: function() {
		_Dr.obj = {
			btntype: _modal.obj.btntype,
			id: _modal.obj.id,
			name: _modal.obj.name,
			paramObj: {
				async: false, //同步操作
				inputid: "cimg",
				dropZoneTitle: "教练员相册"
			},
			defaultimgid_paramObj: {
				async: false, //同步操作
				inputid: "defmg",
				dropZoneTitle: "网站默认图片"
			},
			licensefid_paramObj: {
				async: false, //同步操作
				inputid: "limg",
				dropZoneTitle: "驾驶证扫描件照"
			}
		}
		var obj = {
			"add": {
				message: GetFrom1(getModalconObj("add"), "add", IP + "/rmwebapp/file/", 'coachimg', 'with', '50') + init(),
				title: "添加教练员",
				label: "添加",
				buttons: [{
					keys: "该功能支持IE9以上！",
					label: "读身份证",
					className: "btn-success",
					callback: function() {
						read(IP + "/rmwebapp/file/coachimg-upload-with-thumbnail-50");
						return false;
					}
				}, {
					keys: "添加",
					label: "添加",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_Dr)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			},
			"update": {
				message: GetFrom1(getModalconObj("update"), "update", IP + "/rmwebapp/file/", 'coachimg', 'with', '50') + init(),
				title: "修改教练员",
				label: "修改",
				buttons: [{
					keys: "备案",
					label: "",
					className: "btn-success",
					callback: function() {
						Utils.buttonRecord(_Dr.obj.id, "Big-photo-model");
						return false;
					}
				}, {
					keys: "该功能支持360浏览器8.0或IE9以上,写卡完毕后请点击右侧“写卡验证”验证是否成功！",
					label: "写入IC卡",
					className: "btn-success",
					callback: function() {
						var data = {"coaid": "", "physicalnum": ""};
						data.coaid = _Dr.obj.id;
						
						doWriteCard('/rmwebapp/iccard/sendtocoa', data);

						return false;
					}
				}, {
					keys: "写卡验证",
					label: "",
					className: "btn-success",
					callback: doValidIcCard
				}, {
					keys: "修改",
					label: "修改",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_Dr)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			},
			"detailde": {
				message: GetFrom1(getModalconObj("detailde"), "detailde"),
				title: "教练员详情",
				buttons: [{
					keys: "关闭",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange  Big-photo-model",
			buttons: val.buttons
		});
		_Currency.init(_Dr);
	},
	CoachesManagement: function() {
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "cmimg";
		paramObj["dropZoneTitle"] = "教练车相册";
		var paramObjcar = {}; //相册上传参数
		paramObjcar["async"] = false; //同步操作
		paramObjcar["inputid"] = "carimg";
		paramObjcar["dropZoneTitle"] = "教练车正面照";

		_CoachesManagement.obj = {
			btntype: _modal.obj.btntype,
			id: _modal.obj.id,
			name: _modal.obj.name,
			paramObj: paramObj,
			paramObjcar: paramObjcar,
		}

		var obj = {
			"add": {
				title: "添加教练车",
				label: "添加"
			},
			"update": {
				title: "修改教练车",
				label: "修改",
				buttons: [{
					keys: "备案",
					label: "",
					className: "btn-success",
					callback: function() {
						Utils.buttonRecord(_CoachesManagement.obj.id, "Big-photo-model");
						return false;
					}
				}, {
					keys: "修改",
					label: "修改",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_CoachesManagement)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			},
			"detailde": {
				title: "教练车详情",
				buttons: [{
					keys: "关闭",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom1(getModalconObj(_modal.obj.btntype), _modal.obj.btntype, IP + "/rmwebapp/file/", 'vehimg', 'with', '50'),
			title: val.title,
			className: "modal-darkorange  Big-photo-model",
			buttons: val.buttons == undefined ? [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_CoachesManagement)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}] : val.buttons
		});
		_Currency.init(_CoachesManagement);
	},
	StudentManagement: function() {
		var stucharge = {};
		var stucharge_old = {};
		_StudentManagement.obj = {
			btntype: _modal.obj.btntype,
			id: _modal.obj.id,
			name: _modal.obj.name,
			stucharge: stucharge,
			stucharge_old: stucharge_old
		}
		var obj = {
			"add": {
				message: GetFrom1(getModalconObj("add"), "add", IP + "/rmwebapp/file/", 'stuimg', 'with', '50', AppenHtml_Stundent()) + init(),
				title: "添加学员",
				label: "添加",
				buttons: [{
					keys: "该功能支持IE9以上！",
					label: "读身份证",
					className: "btn-success",
					callback: function() {
						read(IP + "/rmwebapp/file/stuimg-upload-with-thumbnail-50");
						return false;
					}
				}, {
					keys: "添加",
					label: "添加",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_StudentManagement)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			},
			"update": {
				message: GetFrom1(getModalconObj("update"), "update", IP + "/rmwebapp/file/", 'stuimg', 'with', '50', AppenHtml_Stundent()) + init(),
				title: "修改学员",
				label: "修改",
				buttons: [{
					keys: "备案",
					label: "",
					className: "btn-success",
					callback: function() {
						var updateStuCb = function() {
							Utils.buttonRecord(_StudentManagement.obj.id, "Big-photo-model");
						}
						modal_prompt("请确认该学员证件号【" + $('#Sm_cardnum').val() + "】,备案后将无法修改！如信息不准确，将会造成学时无法正常统计。是否继续该操作？", updateStuCb);
						return false;
					}
				}, {
					keys: "该功能支持360浏览器8.0或IE9以上,写卡完毕后请点击右侧“写卡验证”验证是否成功！",
					label: "写入IC卡",
					className: "btn-success btn-iccard hidden",
					callback: function() {
						var data = {"stuid": "", "physicalnum": ""};
						data.stuid = _StudentManagement.obj.id;

						doWriteCard('/rmwebapp/iccard/sendtostu', data);

						return false;
					}
				}, 
				{
					keys: "使用该功能请确保标签打印机正常连接！",
					label: "生成电子卡",
					className: "btn-success btn-qrcode hidden",
					callback: function() {
						//获取电子卡内容
						var qrcodestr = $('.btn-qrcode').data('qrcodestr');

						CommModal({
							message: '<iframe id="printQrCode" name="printIframe" src="print/print_QrCode.html?qrcodestr=' + encodeURIComponent(qrcodestr || '') + '&stuid=' + _StudentManagement.obj.id + '" style="width:100%;height:100%;border:none"></iframe>',
							title: '生成电子卡二维码',
							className: "modal-darkorange small-photo-model",
							buttons: [{
								keys: '打印',
								label: '打印',
								className: "btn-primary btn-Ajax",
								callback: function() {
									var frames = window.document.getElementById("printQrCode");
									return frames.contentWindow.printBarCode(); //打印二维码
								}
							}, {
								keys: "取消",
								label: "",
								className: "btn-warning",
								callback: function() {}
							}]
						});
						return false;
					}
				}, 
				{
					keys: "写卡验证",
					label: "",
					className: "btn-success btn-iccard hidden",
					callback: doValidIcCard
				}, {
					keys: "修改",
					label: "修改",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_StudentManagement)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: val.message,
			title: val.title,
			className: "modal-darkorange  Big-photo-model",
			buttons: val.buttons
		});
		_Currency.init(_StudentManagement);
	},
	role: function() {
		_Role.obj = _modal.obj;
		var obj = {
			"add": {
				title: "添加角色",
				label: "添加"
			},
			"update": {
				title: "修改角色",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype)),
			title: val.title,
			className: "modal-darkorange roleModel",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_Role)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_Role);
	},
	user: function() {
		_User.obj = _modal.obj;
		var obj = {
			"add": {
				title: "添加账号",
				label: "添加"
			},
			"update": {
				title: "修改账号",
				label: "修改"
			},
			"updatepassword": {
				title: "修改密码",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype)),
			title: val.title,
			className: "modal-darkorange useModel",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_User)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_User);
	},
	Assessment: function() {
		var paramObj = {}; //相册上传参数
		var paramObj_occupnofile = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "stampimginput";
		paramObj["dropZoneTitle"] = "请选择印章";
		paramObj_occupnofile["async"] = false; //同步操作
		paramObj_occupnofile["inputid"] = "occupnofileidinput";
		paramObj_occupnofile["dropZoneTitle"] = "请选择职业资格证扫描件";
		_Assessment.obj = {
			btntype: _modal.obj.btntype,
			id: _modal.obj.id,
			name: _modal.obj.name,
			paramObj: paramObj,
			paramObj_occupnofile: paramObj_occupnofile
		}
		var obj = {
			"add": {
				title: "添加考核员",
				label: "添加"
			},
			"update": {
				title: "修改考核员",
				label: "修改",
				buttons: [{
					keys: "备案",
					label: "",
					className: "btn-success",
					callback: function() {
						Utils.buttonRecord(_Assessment.obj.id, "Big-photo-model");
						return false;
					}
				}, {
					keys: "修改",
					label: "修改",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_Assessment)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom1(getModalconObj(_modal.obj.btntype), "add", IP + "/rmwebapp/file/", 'accessment', 'with', '50'),
			title: val.title,
			className: "modal-darkorange Big-photo-model",
			buttons: val.buttons == undefined ? [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_Assessment)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}] : val.buttons
		});
		_Currency.init(_Assessment);
	},
	Safement: function() {
		var paramObj = {}; //相册上传参数
		paramObj["async"] = false; //同步操作
		paramObj["inputid"] = "stampimginput";
		_Safement.obj = {
			btntype: _modal.obj.btntype,
			id: _modal.obj.id,
			name: _modal.obj.name,
			paramObj: paramObj
		}
		var obj = {
			"add": {
				title: "添加安全员",
				label: "添加"
			},
			"update": {
				title: "修改安全员",
				label: "修改",
				buttons: [{
					keys: "备案",
					label: "",
					className: "btn-success",
					callback: function() {
						Utils.buttonRecord(_Safement.obj.id, "Big-photo-model");
						return false;
					}
				}, {
					keys: "修改",
					label: "修改",
					className: "btn-primary btn-Ajax",
					callback: _Currency.IsUserWhich(_Safement)
				}, {
					keys: "取消",
					label: "",
					className: "btn-warning",
					callback: function() {}
				}]
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom1(getModalconObj(_modal.obj.btntype), "add", IP + "/rmwebapp/file/", 'safeystaff', 'with', '50'),
			title: val.title,
			className: "modal-darkorange Big-photo-model",
			buttons: val.buttons == undefined ? [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_Safement)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}] : val.buttons
		});
		_Currency.init(_Safement);
	},
	TrainingEnd: function() {
		_TrainingEnd.obj = _modal.obj;
		var obj = {
			"graduation": {
				title: "结业确认",
				label: "确认"
			}
		}
		var val = obj[_modal.obj.btntype];
		// if (!Utils.isIeCore()) {
		// 	return true
		// }
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype)) + Utils.signHtml(),
			title: val.title,
			className: "modal-darkorange end",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_TrainingEnd)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_TrainingEnd);
	},
	OrderAccept: function() {
		_OrderAccept.obj = _modal.obj;
		var obj = {
			"setting": {
				title: "预约设置",
				label: "确定"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: DomStrDb.getOSTable(),
			title: val.title,
			className: "modal-darkorange",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_OrderAccept)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_OrderAccept);
	},
	ScheduleArray: function() {
		_ScheduleArray.obj = _modal.obj;
		var obj = {
			"add": {
				title: "添加教练分组",
				label: "添加"
			},
			"update": {
				title: "修改教练分组",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype)),
			title: val.title,
			className: "modal-darkorange ScheduleArray",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_ScheduleArray)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_ScheduleArray);
	},
	SchScheduleModel: function() {
		_SchScheduleModel.obj = _modal.obj;
		var obj = {
			"add": {
				title: "添加场地模板",
				label: "添加"
			},
			"update": {
				title: "修改场地模板",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype), AppenHtml_CoaScheduleModel()),
			title: val.title,
			className: "modal-darkorange CoaScheduleModel",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_SchScheduleModel)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_SchScheduleModel);
	},
	CoaScheduleModel: function() {
		_CoaScheduleModel.obj = _modal.obj;
		var obj = {
			"add": {
				title: "添加教练模板",
				label: "添加"
			},
			"update": {
				title: "修改教练模板",
				label: "修改"
			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype), AppenHtml_CoaScheduleModel()),
			title: val.title,
			className: "modal-darkorange CoaScheduleModel",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_CoaScheduleModel)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_CoaScheduleModel);
	},
	StudentChargeConfirm: function() {
		_StudentChargeConfirms.obj = _modal.obj;
		var obj = {
			"update": {
				title: "修改收费信息",
				label: "修改",

			}
		}
		var val = obj[_modal.obj.btntype];
		CommModal({
			message: GetFrom(getModalconObj(_modal.obj.btntype)),
			title: val.title,
			className: "modal-darkorange StudentChargeConfirm",
			buttons: [{
				keys: val.label,
				label: val.label,
				className: "btn-primary btn-Ajax",
				callback: _Currency.IsUserWhich(_StudentChargeConfirms)
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		_Currency.init(_StudentChargeConfirms);
	},
	StudentChargeConfirms: function() {
		var StudentChargeConfirms = function() {
			ajax_put_new(IP + "/rmwebapp/sch/brsch/student/pay-" + _modal.obj.id + "/assess-1", null, "审核成功", "审核失败");
		};
		modal_confirm("是否审核\"" + _modal.obj.name + "\"的收费信息", StudentChargeConfirms);
	},
	report: function() {
		CommModal({
			message: '<textarea id="feedback" style="width:100%;height:80px;"></textarea>',
			title: "反馈投诉",
			className: "modal-darkorange report",
			buttons: [{
				keys: "success",
				label: "反馈",
				className: "btn-primary btn-Ajax",
				callback: function() {
					var AjaxUpdateCallBack = function(bool) {
						if (bool) {
							$(".report").modal("hide");
						} else {
							return false;
						}
					}
					ajax_Currency_Call({
						ajaxurl: IP + "/rmwebapp/complaint-" + _modal.obj.id + "/feedback",
						type: "put",
						data: {
							"feedback": $("#feedback").val()
						},
						success: "反馈成功",
						fail: "反馈失败",
						callback: AjaxUpdateCallBack
					});
				}
			}, {
				keys: "取消",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
	}
}

//学员收费标准追加
function AppenHtml_Stundent() {
	var html = '';
	html += '<div id="hour_table" class="table-responsive" style="display:none ;padding-bottom: 10px;">';
	html += '<table class="table table-bordered brccharge-table">' +
		'<thead >' +
		'<tr>' +
		'<th>培训部分 </th>' +
		'<th> 可预约学时（分） </th>' +
		'<th> 培训前预收费用（元）</th> ' +
		'</tr>' +
		'</thead>' +
		'<tbody>' +
		'<tr>' +
		'<td> <code> 第一部分 </code></td >' +
		'<td id = "P1time" > - </td>' +
		'<td id = "P1fee" > - </td>' +
		'</tr>' +
		'<tr >' +
		'<td> <code> 第二部分</code></td >' +
		'<td id = "P2time"> - </td>' +
		'<td id = "P2fee" > - </td>' +
		'</tr>' +
		'<tr >' +
		'<td> <code> 第三部分 </code></td >' +
		'<td id = "P3time" > - </td>' +
		'<td id = "P3fee" > - </td>' +
		'</tr>' +
		'<tr >' +
		'<td > <code> 第四部分 </code></td >' +
		'<td id = "P4time" > - </td>' +
		'<td id = "P4fee" > - </td>' +
		'</tr>' +
		'</tbody>' +
		'</table><div style="clear:both;"></div>' +
		'</div>';
	return html;
}

//设置学时默认
function SetHourVal(obj) {
	$("#Sm_paytype").select2('val', obj.paytype);
	$("#Sm_tratype").select2('val', obj.tratype);
	$("#Sm_chargetype").select2('val', obj.chargetype);
	var i = 1;
	do {
		$("input[name=P" + i + "time]").val(obj["p" + i + "time"] || '0');
		$("input[name=P" + i + "fee]").val(obj["p" + i + "fee"] || '0');
		i++;
	} while (i < 5);
}

//设置table输入框
function SetTableInput(isInput) {
	if (isInput) {
		var i = 1;
		do {
			$("#P" + i + "time").html('<input  type="number" style="text-align:center" class="form-control input-sm" min="0"   name="P' + i + 'time" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" data-bv-field="spacePreciseTime">');
			$("#P" + i + "fee").html('<input  type="number" style="text-align:center" class="form-control input-sm" min="0"  name="P' + i + 'fee" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" data-bv-field="spacePreciseTime">');
			i++;
		} while (i < 5);
	} else {
		var i = 1;
		do {
			$("#P" + i + "time").html("-");
			$("#P" + i + "fee").html("-");
			i++;
		} while (i < 5);
	}
}



//是否隐藏某个div
function HideDiv_P(obj) {
	var DivId = obj.DivId;
	var isTure = obj.isTure;
	var ParentNum = obj.ParentNum;
	if (isTure) {
		switch (ParentNum) {
			case 1:
				$("#" + DivId).parent().hide();
				break;
			case 2:
				$("#" + DivId).parent().parent().hide();
				break;
			case 3:
				$("#" + DivId).parent().parent().parent().hide();
				break;
		}
	} else {
		switch (ParentNum) {
			case 1:
				$("#" + DivId).parent().show();
				break;
			case 2:
				$("#" + DivId).parent().parent().show();
				break;
			case 3:
				$("#" + DivId).parent().parent().parent().show();
				break;
		}

	}
}


//排版详细
function AppenHtml_CoaScheduleModel() {
	var html = '';
	html += '<div id="hour_table" class="table-responsive hidden" style="padding-bottom: 10px;">';
	html += '<div class="form-title"><h5 class="row-title">精细排班<span class="rfjx-container"><i class="fa fa-refresh fa-lg rfjx" title="重新生成精细模板" onclick=""></i></span></h5></div>' +
		'<table class = "table table-bordered">' +
		'<thead >' +
		'<tr>' +
		'<th>开始时间 </th>' +
		'<th>结束时间</th> ' +
		'<th>名额</th> ' +
		'<th>车型</th> ' +
		'<th>培训部分</th> ' +
		'<th>小科目</th> ' +
		'<th>训练场地</th> ' +
		'<th>预约范围</th> ' +
		'<th>班型</th> ' +
		'<th>价格(元)</th> ' +
		'<th>#</th> ' +
		'</tr>' +
		'</thead>' +
		'<tbody>' +
		'</tbody>' +
		'</table>' +
		'</div>';
	return html;
}

//通用的弹出框
function CommModal(obj) {
	//数据对象
	var dialog = {
		message: obj.message == undefined ? "" : obj.message, //弹出框内容
		title: obj.title == undefined ? "" : obj.title, //弹出框标题
		className: obj.className == undefined ? "" : obj.className, //弹出框样式
		buttons: {}
	};
	//按钮添加
	var addbuttons = function(buttons) {
		//根据按钮来添加
		for (var i = 0; i < buttons.length; i++) {
			dialog.buttons[buttons[i].keys] = {
				label: buttons[i].label,
				className: buttons[i].className,
				callback: buttons[i].callback
			}
		}
	}
	addbuttons(obj.buttons);
	//弹出框显示
	bootbox.dialog(dialog);
}

//控件初始化
var _ControlInit = {
	init: function(type) {
		var modalobj = getModalconObj(type);
		for (var j = 0; j < modalobj.data.length; j++) {
			if (modalobj.data[j].FormGroup.length >= 0) {
				for (var i = 0; i < modalobj.data[j].FormGroup.length; i++) {
					switch (modalobj.data[j].FormGroup[i].control) {
						case "Timeinput":
							$("#" + modalobj.data[j].FormGroup[i].id).timepicker({
								showMeridian: false,
								showSeconds: false
							});
							break;
						case "select":
						case "select_no":
							var iptid = "#" + modalobj.data[j].FormGroup[i].id;
							$(iptid).select2();
							break;
						case "dayinput":
							$("#" + modalobj.data[j].FormGroup[i].id).datepicker()
							break;
						case "dayinputhms":
							break;
						default:
							break;
					}
				}
			}
		}
	}
};

//刷新modal选项的Time初始化
function modal_ToTime(modalobj) {
	for (var j = 0; j < modalobj.data.length; j++) {
		if (modalobj.data[j].FormGroup.length >= 0) {
			for (var i = 0; i < modalobj.data[j].FormGroup.length; i++) {
				if (modalobj.data[j].FormGroup[i].control === "Timeinput") {
					$("#" + modalobj.data[j].FormGroup[i].id).timepicker({
						showMeridian: false,
						showSeconds: false
					});
				}
			}

		}
	}
}

//刷新modal选项的selct2初始化
function modal_ToSelect2(modalobj) {
	for (var j = 0; j < modalobj.data.length; j++) {
		var fglst = modalobj.data[j].FormGroup;
		if (fglst.length >= 0) {
			for (var i = 0; i < fglst.length; i++) {
				if (fglst[i].control === "select" || fglst[i].control === "select_no") {
					var iptid = "#" + fglst[i].id;
					$(iptid).select2();
				}
			}
		}
	}
}

//刷新modal选项中Data初始化
function modal_ToData(modalobj) {
	for (var j = 0; j < modalobj.data.length; j++) {
		if (modalobj.data[j].FormGroup.length >= 0) {
			for (var i = 0; i < modalobj.data[j].FormGroup.length; i++) {
				if (modalobj.data[j].FormGroup[i].control === "dayinput") {
					$("#" + modalobj.data[j].FormGroup[i].id).datepicker()
				}
			}
		}
	}
}

//弹出验证
function GetfromByname(label, id, name, label1, id1, name1) {
	var str = '';
	var rowstr = '';
	rowstr += '<div class="col-lg-4 col-md-4 col-xs-4 " style=" margin-top: 8%;">' +
		'<label class="col-md-4 col-xs-4 control-label">' + label + '</label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="' + id + '" type="text" class="form-control input-sm" name="' + name + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />' +
		'</div>' +
		'</div>';
	rowstr += '<div class="col-lg-4 col-md-4 col-xs-4 " style=" margin-top: 8%;">' +
		'<label class="col-md-4 col-xs-4 control-label">' + label1 + '</label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="' + id1 + '" type="text" class="form-control input-sm" name="' + name1 + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />' +
		'</div>' +
		'</div>';
	str = '<div style="height:200px;overflow: auto;overflow-x: hidden;text-align: center;">' +
		'<form id="" method="post" class="form-horizontal">' +
		rowstr +
		'</form>' +
		'</div>';
	return str;
}

//返回结果
function GetFromByResult() {
	var str = '';
	str = '<div style="height:200px;overflow: auto;overflow-x: hidden;text-align: center;line-height: 200px;">' +
		'<form id="" method="post" class="form-horizontal">' +
		"验证通过" +
		'</form>' +
		'</div>';
	return str;
}

//加载模态框
function Getfromsonstr(control, label, type, id, selectData, flag, rules) {
	//如果是文件类型，则不需要添加至form-control
	if (type == "file") {
		return "";
	}
	var str = ''; //返回字符串
	var controlStr = ''; //中间内容
	rules == undefined ? rules = "" : rules = 'data-rules="' + rules + '"';
	switch (control) {
		case "timeinput":
			controlStr = '<input id="' + id + '" type="' + type + '" class="form-control input-sm"  name="' + id.split("_")[1] + '" ' + rules + ' />';
			break;
		case "price":
			controlStr = '<div class="input-group"><span class="input-group-addon">￥</span><input  id="' + id + '"  type="number" name="' + id.split("_")[1] + '" ' + rules + ' class="form-control input-sm text-center fon" min="0" max="999999"></div>'
			break;
		case "number":
			controlStr = '<input id="' + id + '" type="' + type + '"  class="form-control input-sm" min="0" step="30" name="' + id.split("_")[1] + '" ' + rules + '/>';
			break;
		case "input":
			controlStr = '<input id="' + id + '" type="' + type + '" class="form-control input-sm" name="' + id.split("_")[1] + '" ' + rules + '/>';
			break;
		case "inputr":
			controlStr = '<input id="' + id + '" type="' + type + '" readonly="readonly"  class="form-control input-sm" name="' + id.split("_")[1] + '" ' + rules + '/>';
			break;
		case "select":
			controlStr += '<select id="' + id + '" name="' + id.split("_")[1] + '" ' + rules + '><option value="0">请选择</option>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "select_no":
			controlStr += '<select id="' + id + '" name="' + id.split("_")[1] + '" ' + rules + '>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "selectr":
			controlStr += '<select id="' + id + '" readonly="readonly" name="' + id.split("_")[1] + '" ' + rules + '><option value="0">请选择</option>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "selects":
			controlStr += '<select id="' + id + '" multiple="multiple" name="' + id.split("_")[1] + '" ' + rules + '>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "dayinput":
			controlStr = '<div class="input-group"><div class="special-input"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" name="' + id.split("_")[1] + '" type="text" data-date-format="yyyy-mm-dd" ' + rules + '></div></div>';
			break;
		case "dayinputhms":
			controlStr = '<div class="input-group"><div class="special-input"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" name="' + id.split("_")[1] + '" type="text" data-date-format="YYYY-MM-DD hh:mm:ss" ' + rules + '></div></div>';
			break;
		case "dayinputr":
			controlStr = '<div class="input-group"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" readonly="readonly" name="' + id.split("_")[1] + '" type="text" data-date-format="yyyy-mm-dd" ' + rules + '></div>';
			break;
		case "Timeinput":
			controlStr = '<div class="input-group"><input class="form-control" id="' + id + '" name="' + id.split("_")[1] + '" type="text" ' + rules + '><span class="input-group-addon" ><i class="fa fa-clock-o"></i></span></div>';
			break;
		case "Timeinputr":
			controlStr = '<div class="input-group"><input class="form-control" id="' + id + '" name="' + id.split("_")[1] + '"  readonly="readonly" type="text" ' + rules + '><span class="input-group-addon" ><i class="fa fa-clock-o"></i></span></div>';
			break;
	}

	controlStr = $(controlStr).css({
		"width": "82%",
		"float": "left"
	})[0].outerHTML;
	controlStr = controlStr + '<span style="width:18%;float:left;"></span><div style="clear:both;"></div>';

	//添加照片后调整布局
	if (flag) {
		str = '<div class="col-lg-6 col-md-6 col-xs-6 ">' +
			'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
			controlStr +
			'</div>' +
			'</div>';
	} else {
		str = '<div class="col-lg-4 col-md-4 col-xs-4  ">' +
			'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left  padding-right-5">' +
			controlStr +
			'</div>' +
			'</div>';
	}
	return str;
}

//教学区加载模态框
function Getfromsonstr_TeachSiteSel(control, label, type, id, selectData, flag) {
	//如果是文件类型，则不需要添加至form-control
	if (type == "file") {
		return "";
	}
	var str = ''; //返回字符串
	var controlStr = ''; //中间内容
	switch (control) {
		case "number":
			controlStr = '<input id="' + id + '" type="' + type + '" class="form-control input-sm" name="' + id.split("_")[1] + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
			break;
		case "input":
			controlStr = '<input id="' + id + '" type="' + type + '" class="form-control input-sm" name="' + id.split("_")[1] + '" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
			break;
		case "select":
			controlStr += '<select id="' + id + '" style="width:100%" name="' + id.split("_")[1] + '"><option value="0">请选择</option>';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "selects":
			controlStr += '<select id="' + id + '" multiple="multiple" style="width:100%" name="' + id.split("_")[1] + '">';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "select_no":
			controlStr += '<select id="' + id + '" style="width:100%" name="' + id.split("_")[1] + '" >';
			if (selectData.length > 0) {
				for (var i = 0; i < selectData.length; i++) {
					controlStr += '<option value="' + selectData[i].value + '">' + selectData[i].Text + '</option>';
				}
			}
			controlStr += '</select>';
			break;
		case "dayinput":
			controlStr = '<div class="input-group"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="' + id + '" class="form-control" name="' + id.split("_")[1] + '" type="text" data-date-format="yyyy-mm-dd"></div>';
			break;
		case "Timeinput":
			controlStr = '<div class="input-group"><input class="form-control" id="' + id + '" name="' + id.split("_")[1] + '" type="text"><span class="input-group-addon" ><i class="fa fa-clock-o"></i></span></div>';
			break;
	}
	//添加照片后调整布局
	if (flag) {
		str = '<div class="col-lg-6 col-md-6 col-xs-6 ">' +
			'<label class="col-md-4 col-xs-4 control-label ">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left no-padding-right">' +
			controlStr +
			'</div>' +
			'</div>';
	} else {
		str = '<div class="col-lg-12 col-md-12 col-xs-12 ">' +
			'<label class="col-md-4 col-xs-4 control-label  padding-right-5">' + label + '</label>' +
			'<div class="col-md-8 col-xs-8 no-padding-left no-padding-right">' +
			controlStr +
			'</div>' +
			'</div>';
	}
	return str;
}

//获取一行表单
function GetRowConStr(fromsonstr) {
	var str = '';
	str = '<div class="form-group has-feedback">' +
		fromsonstr +
		'</div>';
	return str;
}

function imgLayout(paramObj) {
	var fileId = "";
	if (paramObj["widthImg"]) {
		fileId = "img"
	} else if (paramObj["widthStamp"]) {
		fileId = "stamp"
	}
	var img = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-left">' +
		'<div id="' + fileId + '_preview" class="center-block file-preview">' +
		'<img src="" alt="" id="' + fileId + '_show">' +
		'</div><br />' +
		'<div class="center-block" style="width:120px;">' +
		'<a href="javascript:void(0);" class="file">' + paramObj["label"] +
		'<input type="file" name="file" id="' + fileId + '_input"  accept="image/*"  onchange="previewNew(this)" >' +
		'<button type="button" id="' + fileId + '_btn" class="btn btn-default btn-sm" onclick="ajax_imgNew(' + "'" + fileId + "'" + ",'" + paramObj["url"] + "'" + ')">上传</button>' +
		'<span id="' + fileId + '" class="hidden"></span>' +
		'</a>' +
		'</div></div>';
	return img;
}

//修改获取整个表单
function GetFrom1(obj, operation, ajaxurl, type, isthumb, scale, html) {
	var str = '';
	var body = '';
	var form = '';
	var num = 3; //每行的控件个数
	var label = "选择照片";
	for (var i = 0; i < obj.data.length; i++) {
		var hasPhoto = false;
		var photoNum = 0; //照片数量,拓展指纹照片用
		var fileRules;
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if (obj.data[i].FormGroup[j].type == "file") {
				num = 2; //有照片时候放两个form-control,否则放3个
				hasPhoto = true;
				fileRules = obj.data[i].FormGroup[j].rules;
				photoNum++;
			} else {
				num = 3;
			}
		}
		body += getTitleStr1(obj.data[i].Title, hasPhoto); //拼接title
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if ((j + 1) % num == 0) {
				form += GetForm_type(obj.data[i], obj.data[i].FormGroup[j], hasPhoto);
				body += GetRowConStr(form);
				form = '';
			} else {
				if (j + 1 == obj.data[i].FormGroup.length) {
					form += GetForm_type(obj.data[i], obj.data[i].FormGroup[j], hasPhoto);
					body += GetRowConStr(form);
					form = '';
				} else {
					form += GetForm_type(obj.data[i], obj.data[i].FormGroup[j], hasPhoto);
				}
			}
		}
		//如果有照片进行栅格布局
		if (hasPhoto) {
			//显示详情时候不需添加上传操作
			var width = 100,
				height = 140;
			if (type != "coachimg" && type != "stuimg") {
				width = 84;
			}
			if (operation && operation == "detailde") {
				body += '</div>' + /*<div class="col-lg-10 col-md-9 col-sm-12">结束*/
					'<div class="col-lg-4 col-md-4 col-sm-4">' + /*照片布局开始*/
					'<div id="file-preview" class="center-block">' +
					'<img src="" alt="" id="imagefile" style="width: ' + width + 'px; height: ' + height + 'px;">' +
					'<div style="width:' + width + 'px; margin-top: 10px; text-align:center;" id="photo-desc">照片</div>' +
					'</div>' +
					'</div>' + /*照片布局结束*/
					'</div>'; /*<div class='row'> 结束*/
			} else {
				body += '</div>' + /*<div class="col-lg-10 col-md-9 col-sm-12">结束*/
					'<div class="col-lg-4 col-md-4 col-sm-4">' + /*照片布局开始*/
					'<div id="file-preview" class="center-block" style="width: ' + width + 'px;">' +
					'<img src="" alt="" id="imagefile" style="width: 100%; height: ' + height + 'px;">' +
					'</div>' +
					'<div class="center-block" style="width:' + width + 'px; text-align: center; margin-top: 30px">' +
					'<button type="button" id="upload-btn" class="btn btn-default btn-sm" onclick="showImgFrame(' + "'" + ajaxurl + "'" + ',' + "'" + type + "'" + ',' + "'" + isthumb + "'" + ',' + "'" + scale + "'" +
					');">上传</button>' +
					'<div class="hidden form-group"><input id="imagefileid" name="imagefile" class="hidden"  data-rules="' + fileRules + '" data-img="yes" data-type="img" ></input></div>' +
					'</div>' +
					'</div>' + /*照片布局结束*/
					'</div>'; /*<div class='row'> 结束*/
			}
		}
	}
	html != undefined ? body += html : "";
	str = '<div class="container-fluid">' +
		'<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" class="form-horizontal">' +
		body +
		'</form>' + /*form 结束*/
		'</div>' +
		'</div>'; /*<div class="container-fluid">结束*/
	return str;
}

//根据不同类型获取不同表单html
function GetForm_type(obj, FormGroup, hasPhoto) {
	var form;
	if (obj.fingerPrint && obj.fingerPrint == "fingerPrint") {
		form = fingerInit();
	} else if (obj.personalimg && obj.personalimg == "personalimg") {
		form = uInitContainerByid(obj.image);
	} else if (obj.abstract) {
		form = addAbstract(obj.abstract, obj.rules);
	} else if (obj.personalimg) {
		if (obj.oneimg) {
			form = uInitContainerByid_one(obj.personalimg, obj.image);
		} else {
			form = uInitContainerByid(obj.personalimg, obj.image);
		}
	} else if (obj.image) {
		form = uInitContainerByid(obj.image, obj.inputid, obj.rules, obj.type);
	} else if (obj.featureser && obj.featureser == "featureser") {
		form = specSerInit("featuretb", obj.rules);
	} else if (obj.coachabstract && obj.coachabstract == "coachabstract") {
		form = addAbstract("cabstracteditor", obj.rules);
	} else if (obj.freestandal && obj.freestandal == "freestandal") {
		form = feeStandal("feetable", obj.rules);
	} else if (obj.fieldType) {
		form = addAdvertise(obj.fieldType, obj.rules);
	} else {
		form = Getfromsonstr(FormGroup.control, FormGroup.label, FormGroup.type, FormGroup.id, FormGroup.selectdata, hasPhoto, FormGroup.rules);
	}
	return form;
}

function showImgFrame(ajaxurl, type, isthumb, scale) {
	bootbox.dialog({
		title: "图片上传",
		message: '<iframe id="cropperId" src="cropper.html?ajaxurl=' + ajaxurl + '&type=' + type + '&isthumb=' + isthumb + '&scale=' + scale + '" width="100%" height="100%" frameborder="0"></iframe>',
		className: "modal-darkorange Big-photo-model "
	});

	setTimeout(function() {
		$('#cropperId').attr('src', $('#cropperId').attr('src'));
	}, 150);
}

//获取整个表单
function GetFrom(obj, html) {
	var str = '';
	var body = '';
	var form = '';
	var num = 3; //每行的控件个数
	for (var i = 0; i < obj.data.length; i++) {
		body += GetTitleStr(obj.data[i].Title);
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if ((j + 1) % num == 0) {
				form += GetForm_type(obj.data[i], obj.data[i].FormGroup[j]);
				body += GetRowConStr(form);
				form = '';
			} else {
				if (j + 1 == obj.data[i].FormGroup.length) {
					form += GetForm_type(obj.data[i], obj.data[i].FormGroup[j]);
					body += GetRowConStr(form);
					form = '';
				} else {
					form += GetForm_type(obj.data[i], obj.data[i].FormGroup[j]);
				}
			}
		}
	}
	html != undefined ? body += html : "";
	body += '<div id="TipMessage" class="tip-msg"><a style="color: #090;"></a></div>';
	str = '<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" onsubmit="return false;" class="form-horizontal">' +
		body +
		'</form>' +
		'</div>';
	return str;
}

function MakePhotoList() {
	var htmlstr = GetTitleStr("相册信息");
	htmlstr += '<div class="form-group" style="margin-left: 0px; margin-right: 0px;">';
	htmlstr += '<input id="albumUpload" type="file" name="file" multiple accept="image/*">';
	htmlstr += '<input type="hidden" id="albumInput" name="album" value="" />';
	htmlstr += '<input type="hidden" id="albumDelId" value="" />';
	htmlstr += '</div>';
	return htmlstr;
}

//by TeachSiteSel
function GetFrom_TeachSiteSel(obj) {
	var str = '';
	var body = '';
	var form = '';
	var num = 1; //每行的控件个数
	for (var i = 0; i < obj.data.length; i++) {
		body += GetTitleStr(obj.data[i].Title);
		for (var j = 0; j < obj.data[i].FormGroup.length; j++) {
			if ((j + 1) % num == 0) {
				form += Getfromsonstr_TeachSiteSel(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata);
				body += GetRowConStr(form);
				form = '';
			} else {
				if (j + 1 == obj.data[i].FormGroup.length) {
					form += Getfromsonstr_TeachSiteSel(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata);
					body += GetRowConStr(form);
					form = '';
				} else {
					form += Getfromsonstr_TeachSiteSel(obj.data[i].FormGroup[j].control, obj.data[i].FormGroup[j].label, obj.data[i].FormGroup[j].type, obj.data[i].FormGroup[j].id, obj.data[i].FormGroup[j].selectdata);
				}
			}
		}
	}
	str = '<div style="height:100%;overflow:hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' + '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' + earamap() + '</div>' + '<div id="schAreaInfoInput" class="pull-right" style="width:25%;"><div style="position:absolute;background: white!important;color:#444444;height:95%">' + '<div class="well bg-magenta" style="width: 100%; padding: 0.2em 0.2em 0.2em 0.5em;text-align:left;margin-bottom:1px;padding-left:2px;padding-right:8px;">' + '<i id="schAreaColla" class="collapse-icon fa fa-bars" style="color: white;font-size:1.2em;margin-right: 0px;top: 0.35em;opacity: 1;margin-right:1em;cursor:pointer"></i>' + '</div><div style="height: 100%;"><div class="well bg-magenta nohover" style="background:white!important;height:95%;color:#444444;overflow-y: auto;">' + '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' + body + '</div></div></div></div></div>' + '</form></div>';
	return str;
}

function GetTitleStr(title) {
	var str = '';
	str = '<div class="form-title">' +
		'<h5 class="row-title">' +
		title +
		'</h5>' +
		'</div>';
	return str;
}

function getTitleStr1(title, hasPhoto) {
	var str = '';
	str = '<div class="form-title">' +
		'<h5 class="row-title">' +
		title +
		'</h5>' +
		'</div>';
	/*增加照片栅格布局*/
	if (hasPhoto) {
		str += '<div class="row">' +
			'<div class="col-lg-8 col-md-8 col-sm-8">';
	}
	return str;
}
//加载模态框

var AddressOld = "";
//根据地址获取经纬度
function GetLngLat(Address) {
	if (Address == AddressOld) {
		return;
	}
	AddressOld = Address;
	geocoder.getLocation(Address, function(status, result) {
		var lng = "",
			lat = "";
		if (status === 'complete' && result.info === 'OK') {
			//TODO:获取经纬度
			lng = result.geocodes[0].location.lng;
			lat = result.geocodes[0].location.lat;
		} else {
			//获取经纬度失败
			modal_pop("输入地址有误，无法获取经纬度！", "fail"); //弹出对话框
		}
		$("#Md_lng").val(lng);
		$("#Md_lat").val(lat);
	});
}

//遮罩html
function ObstructHtml() {
	var html = '';
	html += '<div id="Obstruct" style="width:100%;height:100%;position:absolute;z-index:999999;text-align:center;"><img src="/rmwebapp/pages/assets/img/loading.gif" style="height:35px;width:35px;margin-top:20%;"/></div>'
	return html;
}

//隐藏的遮罩html
function ObstructHtml_none() {
	var html = '';
	html += '<div id="Obstruct" style="width:100%;height:100%;position:absolute;z-index:999999;text-align:center;display:none;"><img src="/rmwebapp/pages/assets/img/loading.gif" style="height:35px;width:35px;margin-top:20%;"/></div>'
	return html;
}

function removeHTMLTag(str) {
	str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML标签
	str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
	str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;     
	str = str.replace(/ /ig, ''); //去掉其它空格
	return str;
};

function sendFile(file, editor, $editable) {

	$("#loading").show();
	var filename = false;
	try {
		filename = file['name'];
	} catch (e) {
		filename = false;
	}
	//以上防止在图片在编辑器内拖拽引发第二次上传导致的提示错误  
	var ext = filename.substr(filename.lastIndexOf("."));
	ext = ext.toUpperCase();
	//name是文件名，自己随意定义，aid是我自己增加的属性用于区分文件用户  
	data = new FormData();
	data.append("file", file);

	$.ajax({
		data: data,
		type: "POST",
		url: IP + "/rmwebapp/file/product-filesupload-no-thumbnail-50", //图片上传出来的url，返回的是图片上传后的路径，http格式  
		processData: false,
		contentType: false,
		cache: false,
		success: function(data) {
			//data是返回的hash,key之类的值，key是定义的文件名  
			//把图片放到编辑框中。editor.insertImage 是参数，写死。后面的http是网上的图片资源路径。  
			//网上很多就是这一步出错。  
			if (data.errorcode == 0) {
				editor.insertImage($editable, data.data[0].fileurl);
			} else {
				modal_pop("上传失败！", "fail"); //弹出对话框
			}
			$("#loading").hide();
		},
		error: function() {
			modal_pop("上传失败！", "fail"); //弹出对话框
			$("#loading").hide();
		}
	});
}

//读卡查询方法
var searchByCard = function() {
	if(testMsICOptor(MsICOptor)){
		var cardNum = MsICOptor.findCard();
		if(cardNum === -2){
			modal_pop("未发现IC卡！", "fail");
		}else{
			$("#physicalnum").val(cardNum);
			query();
		}
	}
};

//按钮点击执行写卡
var doWriteCard = function (ajaxUrl, data) {
	if(!testMsICOptor(MsICOptor)){return false; }
						
	data.physicalnum = MsICOptor.findCard();

	if (data.physicalnum === -2) {
		modal_pop("未发现IC卡！(已操作的卡需要再次移入读卡器感应区才能被发现)", "fail");
		return false;
	}
	//发起写卡的数据请求
	writeCard(ajaxUrl, data)
	.done(function (Data) {
		if (Data.errorcode === 0) {
			MsICOptor.devDd();

			if (MsICOptor.writeCard(Data.data) === 0) {
				if (validIcCard(data.physicalnum)) {
					$('#Sm_physicalnum,#Md_physicalnum').val(data.physicalnum);
					MsICOptor.devHalt();
				}else{
					//卡写入过程异常：发送解绑消息
					sendIcCardErrMsg(data.physicalnum);
				}
			}else{
				//卡写入过程异常：发送解绑消息
				sendIcCardErrMsg(data.physicalnum);
				modal_pop("写入失败,请重试！", "fail");
			}
		}		
	});
}

function sendIcCardErrMsg(cardNum) {
	Utils.sendAjax({
		"url": '/rmwebapp/iccard/binding?physicalnum=' + cardNum,
		"type": 'put',
		"callbacktype": "call",
		"callback": function(Data) {
			console.info('写卡失败后解绑，卡号为：' + cardNum + '，返回码为：' + Data.errorcode);
		}
	});
}

//按钮点击执行验证写卡
var doValidIcCard = function () {
	if(!testMsICOptor(MsICOptor)){return false; }

	var iccardNum = MsICOptor.findCard();
	if (iccardNum === -2) {
		modal_pop("未发现IC卡！(已操作的卡需要再次移入读卡器感应区才能被发现)", "fail");
		return false;
	}

	MsICOptor.devDd();
	validIcCard(iccardNum);
	return false;
}

//验证写卡
var validIcCard = function(iccardNum) {
	var rz = MsICOptor.readCard(),
		msg = '卡号：'+ iccardNum;
	
	if (rz === -3) {
		modal_pop('状态：失败<br>'+ msg + ",读卡异常，请重试！", "fail");
		return false;
	} else if (rz.length == 0) {
		modal_pop('状态：失败<br>'+ msg + ",卡内无信息，请写卡！", "fail");
		return false;
	} else {
		if (rz[2] == "30") {
			modal_pop('状态：失败<br>'+ msg + ",持卡人信息未备案，卡片无法使用，请备案后重新写卡！", "fail");
			return false;
		}
		if (rz[5] == "30") {
			modal_pop('状态：失败<br>'+ msg + ",此卡所属驾校未备案，卡片无法使用，请备案后重新写卡！", "fail");
			return false;
		}
		modal_pop('状态：<span class="success">成功</span><br>'+ msg +",此卡为" + (rz[1] == 2 ? "学员卡" : "教练卡") + "，持卡人为：" + rz[3], "success");
		return true;
	}
}

//地图显示
var showLocation = function(id, lat, lng, address) {
	var obj = {
		message: "<iframe id='cardreader' src='Vehicle/MarkLocation.html?lat=" + lat + "&lng=" + lng + "&address=" + address + "' frameborder='no' height='500px' width='100%' scrolling='no' allowtransparency='yes'></iframe>",
		title: "",
		className: "",
		buttons: {}
	}
	CommModal(obj);
}

//约考管理的附加表
function stuOrderHtml() {
	var body = "";
	body += '<div class="form-title"><h5 class="row-title">约考记录</h5></div>';

	body += '<table id="studyorderTb" class="table table-bordered table-hover dataTable no-footer">';

	body += '<thead><tr>';
	body += '<th>序号</th>';
	body += '<th>部分</th>';
	body += '<th>约考时间</th>';
	/*body += '<th>学员</th>';
	body += '<th>身份证</th>';
	body += '<th>电话</th>';*/
	body += '<th>接送点</th>';
	body += '<th>接送时间</th>';
	body += '<th>接送教练</th>';
	body += '<th>考场</th>';
	body += '<tr/></thead>';

	body += '<tbody><tr>';
	body += '<td colspan="7" style="text-aligen:centen">暂无预约记录</td>';
	body += '<tr/></tbody>';

	body += '</table>';
	return body;
}

//生成排班
var makeSchedual = {
	showModal: function(mdname, updatecb) {
		CommModal({
			message: GetFrom(_modalCon[mdname](), AppenHtml_CoaScheduleModel()),
			title: "立即排班",
			className: "mymodal",
			buttons: [{
				keys: "发布排班",
				label: "发布排班",
				className: "btn-primary btn-Ajax",
				callback: updatecb
			}, {
				keys: "关闭",
				label: "",
				className: "btn-warning",
				callback: function() {}
			}]
		});
		joinDayContainer(); //加入日期容器
	},
	initInput: function() {
		$("#Sm_startPreciseTime,#Sm_endPreciseTime").attr("readonly", "readonly");
		SetOption("Sm_braid", window.top.SubSchoolData); //设置所属驾校下拉框
		$("#Sm_startPreciseTime").val("8:00");
		$("#Sm_endPreciseTime").val("20:00");
		$("#Sm_number").val("3");
		$("#Sm_price").val("200");
		$("#Sm_subcourse,#Sm_classtype").attr("disabled", true);

		$('#Sm_time,#Sm_paytype,#Sm_invalid,#Sm_usual,#model,#Sm_isOrdinalAppoint').fieldtip({}, TipDb)
	},
	bindEvent: function() { //事件绑定
		//班型绑定
		$("#Sm_classtype").on("link", function(e) {
			var myurl = "/rmwebapp/sch/brsch-" + $("#Sm_braid").val() + "/branchCharge/chargeAll";
			var opt = {
				"selectors": ["#Sm_classtype", "#hour_table select[name='classtype']"],
				"value": "course",
				"has0": false
			};
			PageUtils.getJson(myurl, PageUtils.makeSelectStr, opt).done(function () {
				$("#Sm_scopetype").trigger('change');
			});
		});
		//精细排班切换事件
		$("#Sm_detailstatus").change(function() {
			$("#hour_table").toggleClass("hidden")
			$("#hour_table tbody tr").addClass("hidden");
			if ($(this).val() != "0") {
				PageUtils.makeRows2();
			}
		});

		$(".rfjx").on("click", function(e) {
			$("#hour_table tbody tr").addClass("hidden");
			PageUtils.makeRows2();
		});

		//科目联动小科目
		$("#Sm_subject").on("change", function(e) {
			$("#Sm_subcourse").val("All").attr("disabled", ($(this).val() !== "2")).trigger("change");
		});

		//预约范围联动班型
		$("#Sm_scopetype").on("change", function(e) {
			var status = ($(this).val() !== "2");
			var $lb = $("#Sm_classtype").attr("disabled", status)
				.closest(".col-lg-4")
				.find("label");
			$("#Sm_classtype").valid();
			status ? $lb.find(">sup").addClass('hidden') : $lb.find('>sup').removeClass('hidden');
		})
	},
	btfIpt: function() { //美化输入框
		PageUtils.makeSelect2("#registrationForm>.form-group select");
		initTPicker($('input[type="timeinput"]'));
	}
}
