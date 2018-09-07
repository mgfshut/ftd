function Change(str, keys, tlist) {
	var type = UrlValue("v");
	var sameArry = ["RefuelRecord", "AccidentRecord", "TrafficUnlaw"];
	_Change.obj = {
		str: str,
		keys: keys,
		tlist: tlist
	};
	if ($.inArray(type, sameArry) != -1) {
		type = "PollingRecord"; //这几个模块的统统用这个就行了
	}
	if (_Change[type] != undefined) {
		str = _Change[type]();
		(str == null || str == "null" || str == undefined) && (str = "");
	}
	return str;
}

var imgModel = '<img class="img-circle img-border" width="60" height="60" src="{src}" ' +
	'onerror="this.src=\'assets/img/errorImg.jpg\'; this.removeAttribute(\'onerror\');"/>'; 

var _Change = {
	CoachDaillyrec: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "sum2":
			case "sum3":
			case "valid2":
			case "valid3":
				return TM(str);
			default:
				return str
		}
	},
	AreaManager: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "brshname":
				return '<span data-brid="' + tlist['brid'] + '">' + str + "</span>";
			default:
				return str
		}
	},
	ShortMsg: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "status":
				return getSMsgStatus(str);
			default:
				return str
		}
	},
	PollingRecord: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "place":
				return (str ? ('<a href="javascript:void(0);" onclick="showLocation(' + tlist.id + ',' + tlist.lat + ',' + tlist.lng + ',\'' + tlist.place + '\');" title="显示位置" >' + str + '</a>') : "");
			default:
				return str
		}
	},
	MaintainUpkeep: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "mttype":
				return getMtType(str);
			case "mtaddress":
				return (str ? ('<a href="javascript:void(0);" onclick="showLocation(' + tlist.id + ',' + tlist.lat + ',' + tlist.lng + ',\'' + tlist.mtaddress + '\');" title="显示位置" >' + str + '</a>') : "");
			default:
				return str
		}
	},
	CarArchival: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "platecolor":
				return getCarColor(str);
			case "record":
				return str_change_status_color(str);
			default:
				return str;
		}
	},
	comment: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "evtype":
				if (str == '') {
					return str;
				}
				var arry = str.split('|');
				var cgstr = '';
				var shownum = 5; //显示出几个标签
				if (arry.length > shownum) {
					for (var i = 0; i < shownum; i++) {
						cgstr += getEvtype(arry[i]) + '、';
					}
					cgstr = cgstr.substring(0, cgstr.length - 1);
					cgstr += '...';

				} else {
					for (var i = 0; i < arry.length; i++) {
						cgstr += getEvtype(arry[i]) + '、';
					}
					cgstr = cgstr.substring(0, cgstr.length - 1);
				}
				return cgstr;
			case "classlesson":

				return getCourseName(str);

			default:
				return str;
		}
	},
	RemoteEduGrade: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "phase":
				return getCourse(str);
			case "sex":
				return getSex(str);
			case "score":
				var score = parseInt(str);
				if (score >= 90) {
					tlist["ispass"] = "<span style='color:#5cb85c'>是<span>";
				} else {
					tlist["ispass"] = "<span style='color:rgb(237, 85, 101)'>否<span>";
				}
				return str;
			default:
				return str
		}
	},
	OrderAccept: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "p1time":
				return (tlist["p1appoedhour"] == null ? "" : tlist["p1appoedhour"]) + "/" + (str == null ? "" : str);
			case "p2time":
				return (tlist["p2appoedhour"] == null ? "" : tlist["p2appoedhour"]) + "/" + (str == null ? "" : str);
			case "p3time":
				return (tlist["p3appoedhour"] == null ? "" : tlist["p3appoedhour"]) + "/" + (str == null ? "" : str);
			case "p4time":
				return (tlist["p4appoedhour"] == null ? "" : tlist["p4appoedhour"]) + "/" + (str == null ? "" : str);
			case "appotimes":
				return (str == null ? "" : str) + "/" + (tlist["breaktimes"] == null ? "" : tlist["breaktimes"]);
			case "personinfo":
				return tlist["stu"]["personinfo"]["name"] + '<span class="stuid" data-stuid="' + tlist["stu"]["id"] + '"><span>';
			default:
				return str
		}
	},
	School: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			default: return str
		}
	},
	SubSchool: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "address":
				return Substring(str);
			case "type":
				return getSchoolType(str);
			default:
				return getSchoolType(str);
		}
	},
	TeachSiteSel: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "status":
				switch (str) {
					case "Disable":
						return "停用";
					case "Enable":
						return "启用";
				}
			case "accstatus":
				switch (str) {
					case "UNACC":
						return "未审核";
					case "ACCING":
						return "审核中";
					case "ACCSUCCESS":
						return "审核通过";
					case "ACCFAIL":
						return "审核失败";
				}
			default:
				return str
		}
	},
	Dr: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "record":
				return str_change_status_color(str);
			case "sex":
				return getSex(str);
			case "teachtype":
				return getCurrencyType(str);
			case "employstatus":
				return getCurrencyType(str);
			case "thumbnailurl":
				if(/.png$/.test(str)){
					str += "@.jpg";
				}
				return imgModel.replace("{src}", str ||"/rmwebapp/pages/assets/img/noImg.jpg");
			default:
				return getCurrencyType(str);
		}
	},
	CoachesManagement: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist,
			issimulate =tlist.issimulate;
		switch (keys) {
			case "code":
				return issimulate==1?"-":str_change_color(str);
			case "record":
				return issimulate==1?"-":str_change_status_color(str);
			default:
				return str
		}
	},
	StudentManagement: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "record":
				return str_change_status_color(str);
			case "sex":
				return getSex(str);
			case "chargetype":
			    switch(str) {
			    	case "ONETIME": return "一次性";
			    	case "TIMING": return "计时"
			    	case "OHTER": return "其他";
			    	default: return "";
			    }
			case "paytype":
			    switch(str) {
			    	case "STUDYFIRST": return "先学后付";
			    	case "PAYFIRST": return "先付后学"
			    	case "OHTER": return "其他";
			    	default: return "";
			    }
			case "thumbnailurl":
				if(/.png$/.test(str)){
					str += "@.jpg";
				}
				return imgModel.replace("{src}", str ||"/rmwebapp/pages/assets/img/noImg.jpg");
			default:
				return str
		}
	},
	studentArchival: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "status":
				return getCourse(str);
			case "sex":
				return getSex(str);
			case "thumbnailurl":
				if(/.png$/.test(str)){
					str += "@.jpg";
				}
				return imgModel.replace("{src}", str ||"/rmwebapp/pages/assets/img/noImg.jpg");
			default:
				return str
		}
	},
	stuContract: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "sex":
				return getSex(str);
			case "thumbnailurl":
				if(/.png$/.test(str)){
					str += "@.jpg";
				}
				return imgModel.replace("{src}", str ||"/rmwebapp/pages/assets/img/noImg.jpg");
			default:
				return str
		}
	},
	TrainingRecords: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "phase":
				return getCourse(str);
			case "classes":
				return getCourse(str);
			case "score":
				return TM(str);
			case "totalcount":
				return TM(str);
			default:
				return str
		}
	},
	coachArchival: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "teachtype":
				return getCurrencyType(str);
			case "thumbnailurl":
				if(/.png$/.test(str)){
					str += "@.jpg";
				}
				return imgModel.replace("{src}", str ||"/rmwebapp/pages/assets/img/noImg.jpg");
			default:
				return str
		}
	},
	role: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	user: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	DrStatistica: function() {
		switch (this.obj.keys) {
			default: return this.obj.str
		}
	},
	CoachesStatistical: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	StudentStatistical: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	ComplaintStatistical: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	paymentStatistical: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	Assessment: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "record":
				return str_change_status_color(str);
			case "sex":
				return getSex(str);
			case "assessStage":
				return getCurrencyType(str);
			case "employstatus":
				return getCurrencyType(str);
			default:
				return str
		}
	},
	Safement: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "record":
				return str_change_status_color(str);
			case "sex":
				return getSex(str);
			case "employstatus":
				return getCurrencyType(str);
			default:
				return str
		}
	},
	TrainingAudit: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "sex":
				return getSex(str);
			case "status":
				switch (str) {
					case "UNACC":
						tlist["updatetime"] = "";
						return "未审核";
					case "SCHACC":
						return "<span style='color:#5FC56E;'>驾校审核通过</span>";
					case "ACCFAIL":
						return "<span style='color:#981B48;'>监管平台审核不通过</span>";
					case "UPLOADED":
						return "<span style='color:#18a689;'>已上传到监管平台</span>";
					case "ACC":
						return "<span style='color:#024BB5;'>监管平台审核通过</span>";
				}
			case "yaoqiu":
			case "yixue":
				return T0((parseInt(str) / 60).toFixed(2));
			case "phase":
				return getCourse(str);
			default:
				return str
		}
	},
	TrainingSign: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "sex":
				return getSex(str);
			case "c1status":
			case "c2status":
			case "c3status":
			case "c4status":
				return Utils.TrainingSign.changPhane(keys,str,tlist);
			default:
				return str;
		}
	},
	TrainingConfirm: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "sex":
				return getSex(str);
			case "phase":
				return getCourse(str);
			case "ispassed":
				return getTrain(str);
			default:
				return str
		}
	},
	TrainingStatistical: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	StudentChargeConfirm: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "chargetype":
			case "paymode":
			case "assessstatus":
			case "paystatus":
				switch (str) {
					case "TUITION":
						return '学费';
					case "MAKEUP":
						return '补考费';
					case "Cash":
						return '现金';
					case "Card":
						return '刷卡';
					case "Transfer":
						return '转账';
					case "Paid":
						return '<span style="color:#38AD08;font-weight: bold;">已收费</span>';
					case "NotPay":
						return '<span style="color:#F00;font-weight: bold;">未收费</span>';
					case "UNASSESS":
						return '<span style="color:#F00;font-weight: bold;">未审核</span>';
					case "ASSESS":
						return '<span style="color:#38AD08;font-weight: bold;">已审核</span>';
				}
			default:
				return str
		}
	},
	StudentChargeConfirms: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "chargetype":
			case "paymode":
			case "assessstatus":
			case "paystatus":
				switch (str) {
					case "TUITION":
						return '学费';
					case "MAKEUP":
						return '补考费';
					case "Cash":
						return '现金';
					case "Card":
						return '刷卡';
					case "Transfer":
						return '转账';
					case "Paid":
						return '<span style="color:#38AD08;font-weight: bold;">已收费</span>';
					case "NotPay":
						return '<span style="color:#F00;font-weight: bold;">未收费</span>';
					case "UNASSESS":
						return '<span style="color:#F00;font-weight: bold;">未审核</span>';
					case "ASSESS":
						return '<span style="color:#38AD08;font-weight: bold;">已审核</span>';
				}
			default:
				return str
		}
	},
	StudentSigninWill: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	StudentExpireIdcard: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "isExpire":
				return getCardStats(str);
			default:
				return str
		}
	},
	coachExpireIdcard: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "isExpire":
				return getCardStats(str);
			default:
				return str
		}
	},
	coachExpireDrilicence: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "isExpire":
				return getCardStats(str);
			default:
				return str
		}
	},
	coachExpireQualnum: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "isExpire":
				return getCardStats(str);
			default:
				return str
		}
	},
	coachExpireTransportno: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "isExpire":
				return getCardStats(str);
			case "code":
				return str_change_color(str);
			default:
				return str
		}
	},
	StudentOrderList: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	TrainingOrder: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "sex":
				return getSex(str);
			case "coaname":
				if (str) {//接送教练有值时用接送教练
					return str;
				}
				var coa = tlist.ca.student.coach; //报名时的教练员
				return coa? coa.personinfo.name: '';
				
			case "phase":
				return getCourse(str);
			case "apomExamType":
				switch (str) {
					case "Apomed":
						return "已约考";
					case "CanApom":
						return "可约考";
				}
			default:
				return str
		}
	},
	TrainingOrderselect: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	StudentExamStatistical: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "subject":
				return getCourse(str);
			default:
				return str
		}
	},
	StudentPay: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "sex":
				return getSex(str);
			default:
				return str
		}
	},
	StudentPayStatistical: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "sex":
				return getSex(str);
			default:
				return str
		}
	},
	coachPhoto: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "reason":
				switch (str) {
					case 20: return "登录";
					case 21: return "登出";
					default: return "未定义";
				}
			case "path": 
				if(/.png$/.test(str)){
					str += "@.jpg";
				}
				return imgModel.replace("{src}", str ||"/rmwebapp/pages/assets/img/noImg.jpg");
			default: return str
		}
	},
	TrainingEnd: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "sex":
				return getSex(str);
			case "printstatus":
				switch (str) {
					case "TRUE":
						return '已打印';
					case "FALSE":
					case null:
						return '未打印';
				}
			default:
				return str
		}
	},
	product: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "owner":
				switch (str) {
					case "SCHOOL":
						return "驾校";
					case "COACH":
						return "教练";
				}
			case "status":
				switch (str) {
					case "UNISSUED":
						return "<span style='color:#024BB5;'>待发布</span>";
					case "ISSUED":
						return "<span style='color:#38AD08;'>已发布</span>";
					case "OFFLINE":
						return "<span style='color:#F00;'>已下线</span>";
				}
			default:
				return str
		}
	},
	listOfOrders: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "appointtype":
				switch (str) {
					case 0:
						return "预约教练";
					case 1:
						return "预约训练场";
					default:
						return "未知预约类型";
				}
			case "paycanal":
				return str || "微信扫码";
			case "paystatus":
				if (typeof(str) != "number" || str < -2 || str > 8) {

					return "未知状态";
				}
				return ["预约回退", "退款失败", "未知状态", "生成订单", "开始支付", "支付完成", "支付成功", "开始退款", "退款完成", "退款成功", "支付失败 "][parseInt(str) + 2];
			default:
				return str
		}
	},
	coaAppointrecords: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "paytype":
				return getPaytypeName(str);
			case "course":
				return getCourseName(str);
			case "subcourse":
				switch (str) {
					case "All":
						return "所有小科目";
					case "BackOff":
						return "倒车入库";
					case "Parking":
						return "侧方停车";
					case "Uphill":
						return "坡道定点停车和起步";
					case "StraightTurn":
						return "直角转弯";
					case "CurveTurn":
						return "曲线行驶";
					default:
						return "未知子科目";
				}
			case "status":
				if (str < -2 || str > 5) {
					return "未知状态";
				}
				return ["分校回退", "回退预约", "教练取消", "未知状态", "预约成功", "未知状态", "正在学车", "学车完成"][parseInt(str) + 2];
			default:
				return str
		}
	},
	traAppointrecords: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "code":
				return str_change_color(str);
			case "paytype":
				return getPaytypeName(str);
			case "course":
				return getCourseName(str);

			case "subcourse":
				switch (str) {
					case "All":
						return "所有小科目";
					case "BackOff":
						return "倒车入库";
					case "Parking":
						return "侧方停车";
					case "Uphill":
						return "坡道定点停车和起步";
					case "StraightTurn":
						return "直角转弯";
					case "CurveTurn":
						return "曲线行驶";
					default:
						return "未知子科目";
				}
			case "status":
				if (str < -2 || str > 5) {
					return "未知状态";
				}
				return ["分校回退", "回退预约", "教练取消", "未知状态", "预约成功", "未知状态", "正在学车", "学车完成"][parseInt(str) + 2];
			default:
				return str
		}
	},

	stuTraAndAppo: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "trainedhour":
				return str == 0 ? 0 : '<span title="查询已训学时详情" class="trainedhour" data-stuid="' + tlist.stuid + '">' + str + '</span>';
			case "notrainhour":
				return str == 0 ? 0 : '<span title="查询未训学时详情" class="notrainhour" data-stuid="' + tlist.stuid + '">' + str + '</span>';
			default:
				return str;
		}
	},
	coaTraAndAppo: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "trainedhour":
				return str == 0 ? 0 : '<span title="查询已训学时详情" class="trainedhour" data-coaid="' + tlist.coaid + '">' + str + '</span>';
			case "notrainhour":
				return str == 0 ? 0 : '<span title="查询未训学时详情" class="notrainhour" data-coaid="' + tlist.coaid + '">' + str + '</span>';
			default:
				return str;
		}
	},

	ScheduleArray: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return str
		}
	},
	SchScheduleModel: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "startPreciseTime":
			case "endPreciseTime":
				return SubTime(str);
			case "subject":
				return getCourse(str);
			default:
				return str
		}
	},
	CoaScheduleModel: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			case "startPreciseTime":
			case "endPreciseTime":
				return SubTime(str);
			case "subject":
				return getCourse(str);
			default:
				return str
		}
	},
	gpsDetail: function() {
		var keys = this.obj.keys,
			str = this.obj.str,
			tlist = this.obj.tlist;
		switch (keys) {
			default: return change_key(str, keys)
		}
	}
}




function change_key(str, keys) {
	switch (keys) {
		case "sacc":
			str == "1" ? str = "ACC开" : str = "ACC关";
			return str;
		case "srun":
			str == "1" ? str = "在线" : str = "离线";
			return str;
		case "sdlk":
			str == "1" ? str = "车门加锁 " : str = "车门解锁";
			return str;
		case "dir":
			str = dirConvert(str);
			return str;
		default:
			return str;
	}
}

function str_change_color(str) {
	var strs = "";
	if (str == "0") {
		strs = '<span style="color:#F00;font-weight: bold;">暂无</span>';
	} else {
		strs = '<span style="color: #024BB5;font-weight: bold;">' + str + '</span>';
	}
	return strs;
}

function str_change_status_color(str) {
	var strs = "";
	if (str == "SUCCESS") {
		strs = '<span style="color: #38AD08;font-weight: bold;">已备案</span>';
	} else {
		strs = '<span style="color:#F00;font-weight: bold;">未备案</span>';
	}
	return strs;
}

//7.5小时-->7小时30分钟
function T0(time) {
	if (typeof time == 'string') {
		time = parseFloat(time);
	}
	var timestr = '0小时0分钟',
		H, M, _time;
	if (time !== 0) {
		H = parseInt(time, 10);
		M = (time - H) * 60;
		timestr = H + '小时' + parseInt(M, 10) + '分钟';
	}
	return timestr;
}

//7小时30分钟-->7.5小时
function T0Back(timestr) {
	var time = 0;
	if (timestr) {
		var tArray = timestr.split('小时');
		var H = parseInt(tArray[0], 10);
		var M = parseInt(tArray[1], 10);
		time = H + M / 60;

	}
	return time;
}

//字符串截取
function Substring(String) {
	var str = '';
	if (String.length > 17) {
		str += String.substring(0, 17) + "...";
		str = '<div style="cursor: pointer" title="' + String + '">' + str + '</div>';
		return str;
	} else {
		return String;
	}

}

//时间00:00:00 转00:00
function SubTime(Time) {
	if (Time) {
		var str;
		var arrays = Time.split(":");
		str = arrays[0] + ":" + arrays[1];
	}
	return str;
}

//时间00:00 转00:00:00
function SubTimes(Time) {
	str = Time + ":00";
	return str;
}

//常用转换

function getCardStats(str) {
	switch (str) {
		case "EXPIRE":
			return '已过期';
		case "NOEXPIRE":
			return '未过期';
		case "THREEMONTH":
			return '三个月内过期';
		default:
			return str;
	}
};

//培训成绩
function getTrain(str) {
	switch (str) {
		case "STUDING":
			return "进行中";
		case "FINISH":
			return "已完成";
		case "Passed":
			return '合格';
		case "FAIL":
			return '不合格';
		case "Repassed":
			return '补考合格';
		case "NOCONFIRM":
			return '未确认';
		default:
			return str;
	}
};

//教练常用的类型
function getCurrencyType(str) {
	switch (str) {
		case "UNKNOWED":
			return "未知的性别";
		case "MALE":
			return "男";
		case "FEMALE":
			return "女";
		case "UNEXPLLAIN":
			return "未说明的性别";
		case "OUTJOB":
			return "离职";
		case "INJOB":
			return "在职";
		case "FALSE":
			return "不在黑名单";
		case "TRUE":
			return "在黑名单";
		case "ACCEPTBRIBES":
			return "受贿";
		case "CHEATING ":
			return "作弊";
		case "THEORY":
			return "理论教练员";
		case "PRACTICE":
			return "实操教练员";
		case "THEORYADNPRACTICE":
			return "理论、实操教练员";
		case "IDCARD":
			return "身份证";
		case "OFFICERCERTIFICATE":
			return "军官证";
		case "PASSPORT":
			return "护照";
		case "OTHER":
			return "户口本";
		case "ONE":
			return "一级";
		case "TWO":
			return "二级";
		case "THREE":
			return "三级";
		case "FOUR":
			return "四级";
		case "STAGEONE":
			return "阶段一";
		case "STAGETWO":
			return "阶段二";
		case "STAGETHREE":
			return "阶段三";
		case "STAGEFORE":
			return "阶段四";
		case "ALL":
			return "全阶段";
		default:
			return str;
	}
}

//驾校类型
function getSchoolType(str) {
	switch (str) {
		case "Main":
			return "主分校";
		case "Ordinary":
			return "普通分校";
		case "Independent":
			return "独立分校";
		default:
			return str;
	}
}
//转换科目文字为代码
function getCourse2Code(str) {
	switch (str) {
		case "第一部分":
			return 'COURSE1';
		case "第二部分":
			return 'COURSE2';
		case "第三部分":
			return 'COURSE3';
		case "第四部分":
			return 'COURSE4';
		default:
			return str;
	}
}
//转换科目
function getCourse(str) {
	switch (str) {
		case "SIGNUP":
			return '<span style="color:#2D90E8">报名</span>';
		case "COURSE1":
			return '<span style="color:#981B48">第一部分</span>';
		case "COURSE2":
			return '<span style="color:#981B48">第二部分</span>';
		case "COURSE3":
			return '<span style="color:#981B48">第三部分</span>';
		case "COURSE4":
			return '<span style="color:#981B48">第四部分</span>';
		case "GRADUATE":
			return '<span style="color:#53a93f">结业</span>';
		case "DROPOUT":
			return '<span style="color:red">退学</span>';
		case 1:
			return '<span style="color:#981B48">第一部分</span>';
		case 2:
			return '<span style="color:#981B48">第二部分</span>';
		case 3:
			return '<span style="color:#981B48">第三部分</span>';
		case 4:
			return '<span style="color:#981B48">第四部分</span>';
		case "COURSE1NETTHEORY":
			return "网络教学";
		case "COURSE1CLSTHEORY":
			return "课堂教学";
		case "COURSE2NETTHEORY":
			return "网络教学";
		case "COURSE2CLSTHEORY":
			return "集中科室学习";
		case "COURSE2SIMULATOR":
			return "模拟教学";
		case "COURSE2PRACTICE":
			return "实操教学";
		case "COURSE3NETTHEORY":
			return "网络教学";
		case "COURSE3CLSTHEORY":
			return "集中科室学习";
		case "COURSE3SIMULATOR":
			return "模拟教学";
		case "COURSE3PRACTICE":
			return "实操教学";
		case "COURSE4NETTHEORY":
			return "网络教学";
		case "COURSE4CLSTHEORY":
			return "课堂教学";
		case "COURSE4SIMULATOR":
			return "模拟教学";
		case "COURSE4PRACTICE":
			return "实操教学";
		default:
			return str;
	}
}

function getPaytypeName(paytype) {
	switch (paytype) {
		case "LearnFirst":
			return "先学后付";
		case "WithoutPay":
			return "无需支付";
		case "BalancePay":
			return "余额支付";
		case "CashPay":
			return "现金支付";
		case "BalancePriorPay":
			return "余额优先支付";
		default:
			return "未知支付类型";
	}
}

function getStatusName(status) {
	if (typeof(status) != "number" || status < -2 || status > 9) {
		return "未知状态";
	}
	return ["分校回退", "回退预约", "教练取消", "未知状态", "预约成功", "未知状态", "进行中：正在学车", "待评价：学完车未评价", "已完成：学完车已评价", "过期未培训自动取消", "未知状态", "免预约"][parseInt(status) + 2];
}

function getCourseName(c) {
	var course = parseInt(c)
	if (course < 1 || course > 4) {
		return "未知培训部分";
	}
	return ["", "第一部分", "第二部分", "第三部分", "第四部分"][course];
}

//转换性别
function getSex(str) {
	switch (str) {
		case "UNKNOWED":
			return "未知的性别";
		case "MALE":
			return "男";
		case "FEMALE":
			return "女";
		case "UNEXPLLAIN":
			return "未说明的性别";
		default:
			return str;
	}
}

//转换学员类型
function getStutype(str) {
	switch (str) {
		case "BUSINESS":
			return "商务类";
		case "COMMON":
			return "普通类";
		case "VIP":
			return "VIP类";
		default:
			return str;
	}
}

//获取标签
function getEvtype(str) {
	switch (str) {
		case "0":
			return "环境优美"
		case "1":
			return "设施完善"
		case "2":
			return "场地正规"
		case "3":
			return "服务规范"
		case "4":
			return "文明教学"
		case "5":
			return "教学严谨"
		case "6":
			return "经验丰富"
		case "7":
			return "一对一服务"
		case "8":
			return "耐心教学"
		default:
			break;
	}
}
//转换车颜色
function getCarColor(str) {
	switch (str) {
		case "blue":
			return "蓝色";
		case "yellow":
			return "黄色";
		case "black":
			return "黑色";
		case "white":
			return "白色";
		case "green":
			return "绿色";
		default:
			return str;
	}
}
//转换维修类型
function getMtType(str) {
	switch (str) {
		case "Regular":
			return "定期保养";
		case "Malfunction":
			return "故障维修";
		case "Secondary":
			return "二级维护";
		default:
			return str;
	}
}
//获取短信发送状态
function getSMsgStatus(str) {
	switch (str) {
		case 1:
			return "成功";
		case 0:
			return "失败";
		default:
			return str;
	}
}

//测试写卡对象初始化状态
function testMsICOptor(o) {
	switch (o) {
		case -1:
			modal_pop("浏览器加载插件异常，刷新后可重新加载。", "fail");
			return false;
			break;
		case -2:
			modal_pop('读卡器连接异常，刷新可尝试重新连接。', "fail");
			return false;
			break;
		case -3:
			modal_pop("装载密码出错，刷新可尝试重新装载。", "fail");
			return false;
			break;
		case -4:
			modal_pop("浏览器不支持读写IC卡!", "fail");
			return false;
			break;
		default:
			return true;
			break;
	}
}
//是否通过
function getOk (str) {
	return str == 0 ? '否': '是';
}

//是否通过
function getOk_1 (str) {
	return str == 0 ? '<span style="color: #38AD08;font-weight: bold;">合格</span>': '<span style="color:#F00;font-weight: bold;">不合格</span>';
}

function TM(str) {
	//var time=;
	var H = parseInt(Number(str) / 60);
	var M = Number(str) % 60;
	var timestr = '';

	timestr = H + "小时" + parseInt(M) + "分钟";

	return timestr;
}