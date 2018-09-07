function getSelectObj() {
	var type = UrlValue("v");
	if (_Select[type] != undefined) {
		return _Select[type];
	} else {
		return {
			"data": []
		};
	}
}

var _Select = {
	SysLogs: {
		"data": [{
			"title": "用户",
			"id": "user",
			"type": "select",
			"sqlname": "user",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "时间",
			"id": "time",
			"type": "dayinput",
			"format": "YYYY-MM-DD",
			"istime": false,
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "操作",
			"id": "oper",
			"type": "input",
			"sqlname": "oper",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"AreaManager": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员证件",
			"id": "stucardnum",
			"type": "input",
			"sqlname": "stucardnum",
			"inputtext": "学员证件号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练姓名",
			"id": "coaname",
			"type": "input",
			"sqlname": "coaname",
			"inputtext": "教练姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练证件",
			"id": "coacardnum",
			"type": "input",
			"sqlname": "coacardnum",
			"inputtext": "教练证件号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "车牌号码",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号码",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始时间",
			"id": "timestart",
			"type": "dayinput",
			"sqlname": "timestart",
			"format": "YYYY-MM-DD hh:mm:ss",
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#timeend").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束时间",
			"id": "timeend",
			"type": "dayinput",
			"sqlname": "timeend",
			"format": "YYYY-MM-DD hh:mm:ss",
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#timestart").data("options");
				options.start = options.max = dates;
			}
		}]
	},
	"ShortMsg": {
		"data": [{
			"title": "手机号码",
			"id": "phone",
			"type": "input",
			"sqlname": "phone",
			"format": "",
			"inputtext": "手机号码",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始时间",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD hh:mm:ss",
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束时间",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD hh:mm:ss",
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "发送状态",
			"id": "status",
			"type": "select-no",
			"sqlname": "status",
			"inputtext": "",
			"selectData": [{
				"value": "1",
				"Text": "成功"
			}, {
				"value": "0",
				"Text": "失败"
			}],
			"onchange": ""
		}]
	},
	"MaintainUpkeep": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "司机姓名",
			"id": "driver",
			"type": "input",
			"sqlname": "driver",
			"inputtext": "司机姓名",
			"selectData": [],
			"onchange": ""
		}]
	},
	"CarArchival": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}]
	},
	"StipulateProject": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}]
	},
	"SafeCheck": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "司机姓名",
			"id": "driver",
			"type": "input",
			"sqlname": "driver",
			"inputtext": "司机姓名",
			"selectData": [],
			"onchange": ""
		}]
	},
	"TrafficUnlaw": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "司机姓名",
			"id": "driver",
			"type": "input",
			"sqlname": "driver",
			"inputtext": "司机姓名",
			"selectData": [],
			"onchange": ""
		}]
	},
	"AccidentRecord": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "司机姓名",
			"id": "driver",
			"type": "input",
			"sqlname": "driver",
			"inputtext": "司机姓名",
			"selectData": [],
			"onchange": ""
		}]
	},
	"RefuelRecord": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "司机姓名",
			"id": "driver",
			"type": "input",
			"sqlname": "driver",
			"inputtext": "司机姓名",
			"selectData": [],
			"onchange": ""
		}]
	},
	"PollingRecord": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "司机姓名",
			"id": "driver",
			"type": "input",
			"sqlname": "driver",
			"inputtext": "司机姓名",
			"selectData": [],
			"onchange": ""
		}]
	},
	"School": {
		"data": []
	},
	"SubSchool": {
		"data": []
	},
	"TeachSiteSel": {
		"data": []
	},
	"Dr": {
		"data": [{
				"title": "教练名称",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "教练名称",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "IC卡号",
				"id": "physicalnum",
				"type": "input",
				"sqlname": "physicalnum",
				"inputtext": "IC卡号",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "证件号码",
				"id": "cardnum",
				"type": "input",
				"sqlname": "cardnum",
				"inputtext": "证件号码",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "手机号码",
				"id": "mobile",
				"type": "input",
				"sqlname": "mobile",
				"format": "",
				"inputtext": "手机号码",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "执教类型",
				"id": "teachtype",
				"type": "select",
				"sqlname": "teachtype",
				"inputtext": "",
				"selectData": [{
					"value": "THEORY",
					"Text": "理论教练员"
				}, {
					"value": "PRACTICE",
					"Text": "实操教练员"
				}, {
					"value": "THEORYADNPRACTICE",
					"Text": "理论、实操教练员"
				}],
				"onchange": ""
			}, {
				"title": "在职状态",
				"id": "employstatus",
				"type": "select-no",
				"sqlname": "employstatus",
				"inputtext": "",
				"selectData": [{
					"value": "INJOB",
					"Text": "在职"
				}, {
					"value": "OUTJOB",
					"Text": "离职"
				}],
				"onchange": ""
			}, {
				"title": "培训场地",
				"id": "traid",
				"type": "select",
				"sqlname": "traid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			/*, {
					"title": "黑名单状态",
					"id": "isblacklist",
					"type": "select",
					"sqlname": "isblacklist",
					"inputtext": "",
					"selectData": [{
						"value": "TRUE",
						"Text": "在列"
					}, {
						"value": "FALSE",
						"Text": "不在列"
					}],
					"onchange": ""
				}*/
		]
	},
	"CoachesManagement": {
		"data": [{
			"title": "车牌号",
			"id": "licnum",
			"type": "input",
			"sqlname": "licnum",
			"inputtext": "车牌号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "车辆品牌",
			"id": "brand",
			"type": "input",
			"sqlname": "brand",
			"inputtext": "车辆品牌",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "培训车型",
			"id": "perdritype",
			"type": "select",
			"sqlname": "perdritype",
			"inputtext": "培训车型",
			"selectData": cartype,
			"onchange": ""
		}]
	},
	"StudentManagement": {
		"data": [{
			"title": "学员姓名",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "报名开始",
			"id": "timestart",
			"type": "dayinput",
			"sqlname": "timestart",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#timeend").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "报名结束",
			"id": "timeend",
			"type": "dayinput",
			"sqlname": "timeend",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#timestart").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "IC卡号",
			"id": "physicalnum",
			"type": "input",
			"sqlname": "physicalnum",
			"inputtext": "IC卡号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "证件号码",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "证件号码",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "报名点",
			"id": "brcrecruit",
			"type": "select",
			"sqlname": "brcrecruit",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "培训车型",
			"id": "traintype",
			"type": "select",
			"sqlname": "traintype",
			"inputtext": "",
			"selectData": cartype,
			"onchange": ""
		}, {
			"title": "教练名称",
			"id": "coaname",
			"type": "input",
			"sqlname": "coaname",
			"inputtext": "教练名称",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员年龄",
			"id": "age",
			"type": "input",
			"sqlname": "age",
			"inputtext": "学员年龄",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员性别",
			"id": "sex",
			"type": "select",
			"sqlname": "sex",
			"inputtext": "",
			"selectData": [{
				"value": "MALE",
				"Text": "男"
			}, {
				"value": "FEMALE",
				"Text": "女"
			}, {
				"value": 'UNKNOWED',
				"Text": "未知的性别 "
			}, {
				"value": "UNEXPLLAIN",
				"Text": "未说明的性别"
			}],
			"onchange": ""
		}, {
			"title": "收费类型",
			"id": "chargetype",
			"type": "select",
			"sqlname": "chargetype",
			"inputtext": "",
			"selectData": [{
				"Text": "一次性",
				"value": "ONETIME"
			}, {
				"Text": "计时",
				"value": "TIMING"
			}, {
				"Text": "其他",
				"value": "OHTER"
			}],
			"onchange": ""
		}, {
			"title": "支付类型",
			"id": "paytype",
			"type": "select",
			"sqlname": "paytype",
			"inputtext": "",
			"selectData": [{
				"value": "STUDYFIRST",
				"Text": "先学后付"
			}, {
				"value": "PAYFIRST",
				"Text": "先付后学"
			}, {
				"value": "OHTER",
				"Text": "其他"
			}],
			"onchange": ""
		}]
	},
	"studentArchival": {
		"data": [{
			"title": "学员编号",
			"id": "stucode",
			"type": "input",
			"sqlname": "stucode",
			"inputtext": "请输入全国统一编码",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "证件号码",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "证件号码",
			"selectData": [],
			"onchange": ""
		}]
	},
	"stuContract": {
		"data": [{
			"title": "学员编号",
			"id": "stucode",
			"type": "input",
			"sqlname": "stucode",
			"inputtext": "请输入全国统一编码",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "证件号码",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "证件号码",
			"selectData": [],
			"onchange": ""
		}]
	},
	"TrainingRecords": {
		"data": [{
			"title": "学员姓名",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始时间",
			"id": "datefrom",
			"type": "dayinput",
			"sqlname": "datefrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#dateto").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束时间",
			"id": "dateto",
			"type": "dayinput",
			"sqlname": "dateto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#datefrom").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "教练姓名",
			"id": "coachname",
			"type": "input",
			"sqlname": "coachname",
			"inputtext": "教练姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "车型",
			"id": "traintype",
			"type": "select",
			"sqlname": "traintype",
			"inputtext": "请输入大写字母的车型",
			"selectData": cartype,
			"onchange": ""
		}]
	},
	"coachArchival": {
		"data": [{
			"title": "姓名",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "教练员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "执教类型",
			"id": "teachtype",
			"type": "select",
			"sqlname": "teachtype",
			"inputtext": "执教类型",
			"selectData": [{
				"value": "THEORY",
				"Text": "理论教练员"
			}, {
				"value": "PRACTICE",
				"Text": "实操教练员"
			}, {
				"value": "THEORYADNPRACTICE",
				"Text": "理论、实操教练员"
			}],
			"onchange": ""
		}]
	},
	"role": {
		"data": []
	},
	"user": {
		"data": []
	},
	"DrStatistica": {
		"data": [{
				"title": "分校名称",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			/*, {
								"title": "起始时间",
								"id": "timestart",
								"type": "dayinput",
								"sqlname": "timestart",
								"inputtext": "",
								"selectData": [],
								"onchange": ""
							}, {
								"title": "结束时间",
								"id": "timeend",
								"type": "dayinput",
								"sqlname": "timeend",
								"inputtext": "",
								"selectData": [],
								"onchange": ""
							}*/
		]
	},
	"CoachesStatistical": {
		"data": [{
				"title": "分校名称",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			/*, {
									"title": "起始时间",
									"id": "timestart",
									"type": "dayinput",
									"sqlname": "timestart",
									"inputtext": "",
									"selectData": "",
									"onchange": ""
								}, {
									"title": "结束时间",
									"id": "timeend",
									"type": "dayinput",
									"sqlname": "timeend",
									"inputtext": "",
									"selectData": "",
									"onchange": ""
								}*/
		]
	},
	"StudentStatistical": {
		"data": [{
				"title": "分校名称",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			/*, {
									"title": "起始时间",
									"id": "timestart",
									"type": "dayinput",
									"sqlname": "timestart",
									"inputtext": "",
									"selectData": "",
									"onchange": ""
								}, {
									"title": "结束时间",
									"id": "timeend",
									"type": "dayinput",
									"sqlname": "timeend",
									"inputtext": "",
									"selectData": "",
									"onchange": ""
								}*/
		]
	},
	"ComplaintStatistical": {
		"data": [{
				"title": "分校名称",
				"id": "id",
				"type": "select",
				"sqlname": "id",
				"inputtext": "",
				"selectData": [{
					"value": "1",
					"Text": "恒大驾校"
				}],
				"onchange": ""
			}
			/*, {
								"title": "起始时间",
								"id": "timestart",
								"type": "dayinput",
								"sqlname": "timestart",
								"inputtext": "",
								"selectData": [],
								"onchange": ""
							}, {
								"title": "结束时间",
								"id": "timeend",
								"type": "dayinput",
								"sqlname": "timeend",
								"inputtext": "",
								"selectData": [],
								"onchange": ""
							}*/
			, {
				"title": "证件号码",
				"id": "name",
				"type": "input",
				"sqlname": "name1",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "教练姓名",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
		]
	},
	"paymentStatistical": {
		"data": [{
				"title": "分校名称",
				"id": "id",
				"type": "select",
				"sqlname": "id",
				"inputtext": "",
				"selectData": [{
					"value": "1",
					"Text": "恒大驾校"
				}],
				"onchange": ""
			}
			/*, {
								"title": "起始时间",
								"id": "timestart",
								"type": "dayinput",
								"sqlname": "timestart",
								"inputtext": "",
								"selectData": [],
								"onchange": ""
							}, {
								"title": "结束时间",
								"id": "timeend",
								"type": "dayinput",
								"sqlname": "timeend",
								"inputtext": "",
								"selectData": [],
								"onchange": ""
							}*/
			, {
				"title": "证件号码",
				"id": "cardnum",
				"type": "input",
				"sqlname": "cardnum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "学员姓名",
				"id": "stu",
				"type": "input",
				"sqlname": "stu",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
		]
	},
	"Assessment": {
		"data": [{
				"title": "分校名称",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "姓名",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "证件号码",
				"id": "idnum",
				"type": "input",
				"sqlname": "idnum",
				"inputtext": "证件号码",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "车型",
				"id": "perdritype",
				"type": "select",
				"sqlname": "perdritype",
				"inputtext": "",
				"selectData": [{
					"value": "C1",
					"Text": "C1"
				}, {
					"value": "C2",
					"Text": "C2"
				}, {
					"value": "C3",
					"Text": "C3"
				}, {
					"value": "A1",
					"Text": "A1"
				}, {
					"value": "A2",
					"Text": "A2"
				}, {
					"value": "B1",
					"Text": "B1"
				}, {
					"value": "B2",
					"Text": "B2"
				}],
				"onchange": ""
			}, {
				"title": "考核阶段",
				"id": "assessStage",
				"type": "select",
				"sqlname": "assessStage",
				"inputtext": "",
				"selectData": [{
					"value": "STAGEONE",
					"Text": "阶段一"
				}, {
					"value": "STAGETWO",
					"Text": "阶段二"
				}, {
					"value": "STAGETHREE",
					"Text": "阶段三"
				}, {
					"value": "STAGEFORE",
					"Text": "阶段四"
				}, {
					"value": "ALL",
					"Text": "全阶段"
				}],
				"onchange": ""
			}, {
				"title": "手机号码",
				"id": "mobile",
				"type": "input",
				"sqlname": "mobile",
				"format": "",
				"inputtext": "手机号码",
				"selectData": [],
				"onchange": ""
			}
			/*,{
						"title": "起始时间",
						"id": "timestart",
						"type": "dayinput",
						"sqlname": "timestart",
						"inputtext": "",
						"selectData": [],
						"onchange": ""
					}, {
						"title": "结束时间",
						"id": "timeend",
						"type": "dayinput",
						"sqlname": "timeend",
						"inputtext": "",
						"selectData": [],
						"onchange": ""
					}*/
		]
	},
	"Safement": {
		"data": [{
				"title": "分校名称",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "姓名",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "证件号码",
				"id": "idnum",
				"type": "input",
				"sqlname": "idnum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "手机号码",
				"id": "mobile",
				"type": "input",
				"sqlname": "mobile",
				"format": "",
				"inputtext": "手机号码",
				"selectData": [],
				"onchange": ""
			}
			//					 {
			//						"title": "车型",
			//						"id": "perdritype",
			//						"type": "select",
			//						"sqlname": "perdritype",
			//						"inputtext": "",
			//						"selectData": [{
			//							"value": "C1",
			//							"Text": "C1"
			//						}, {
			//							"value": "C2",
			//							"Text": "C2"
			//						}, {
			//							"value": "C3",
			//							"Text": "C3"
			//						}, {
			//							"value": "A1",
			//							"Text": "A1"
			//						}, {
			//							"value": "A2",
			//							"Text": "A2"
			//						}, {
			//							"value": "B1",
			//							"Text": "B1"
			//						}, {
			//							"value": "B2",
			//							"Text": "B2"
			//						}],
			//						"onchange": ""
			//					}
			/*,{
						"title": "起始时间",
						"id": "timestart",
						"type": "dayinput",
						"sqlname": "timestart",
						"inputtext": "",
						"selectData": [],
						"onchange": ""
					}, {
						"title": "结束时间",
						"id": "timeend",
						"type": "dayinput",
						"sqlname": "timeend",
						"inputtext": "",
						"selectData": [],
						"onchange": ""
					}*/
		]
	},
	"TrainingAudit": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学生姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "审核状态",
			"id": "accStatus",
			"type": "select",
			"sqlname": "accStatus",
			"inputtext": "",
			"selectData": [{
				"value": "UNACC",
				"Text": "未审核"
			}, {
				"value": "SCHACC",
				"Text": "驾校审核通过"
			}, {
				"value": "ACC",
				"Text": "监管平台审核通过"
			}],
			"onchange": ""
		}, {
			"title": "审核时间",
			"id": "updatetime",
			"type": "dayinput",
			"sqlname": "updatetime",
			"format": "YYYY-MM-DD",
			"istime": false,
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "培训部分",
			"id": "phase",
			"type": "select",
			"sqlname": "phase",
			"inputtext": "",
			"selectData": [{
				"value": "COURSE1",
				"Text": "第一部分"
			}, {
				"value": "COURSE2",
				"Text": "第二部分"
			}, {
				"value": "COURSE3",
				"Text": "第三部分"
			}, {
				"value": "COURSE4",
				"Text": "第四部分"
			}],
			"onchange": ""
		}, {
			"title": "审核时间(开始)",
			"id": "schAccTimeFrom",
			"type": "dayinput",
			"sqlname": "schAccTimeFrom",
			"format": "YYYY-MM-DD",
			"istime": false,
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "审核时间(结束)",
			"id": "schAccTimeto",
			"type": "dayinput",
			"sqlname": "schAccTimeto",
			"format": "YYYY-MM-DD",
			"istime": false,
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "是否达标",
			"id": "reachStandard",
			"type": "select",
			"sqlname": "reachStandard",
			"inputtext": "",
			"selectData": [{
				"value": "true",
				"Text": "已达标"
			}, {
				"value": "false",
				"Text": "未达标"
			}],
			"onchange": ""
		}]
	},
	"TrainingSign": {
		"data": [{
				"title": "分校名称",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "编号",
				"id": "stucode",
				"type": "input",
				"sqlname": "stucode",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "身份证",
				"id": "cardnum",
				"type": "input",
				"sqlname": "cardnum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "学生姓名",
				"id": "stuname",
				"type": "input",
				"sqlname": "stuname",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			// , {
			// 	"title": "审核状态",
			// 	"id": "accStatus",
			// 	"type": "select",
			// 	"sqlname": "accStatus",
			// 	"inputtext": "",
			// 	"selectData": [{
			// 		"value": "UNACC",
			// 		"Text": "驾校未审核"
			// 	}, {
			// 		"value": "SCHACC",
			// 		"Text": "监管未备案"
			// 	}],
			// 	"onchange": ""
			// }, {
			// 	"title": "是否达标",
			// 	"id": "reachStandard",
			// 	"type": "select",
			// 	"sqlname": "reachStandard",
			// 	"inputtext": "",
			// 	"selectData": [{
			// 		"value": "true",
			// 		"Text": "已达标"
			// 	}, {
			// 		"value": "false",
			// 		"Text": "未达标"
			// 	}],
			// 	"onchange": ""
			// }
		]
	},
	"TrainingConfirm": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员名称",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "录入状态",
			"id": "status",
			"type": "select",
			"sqlname": "status",
			"inputtext": "",
			"selectData": [{
				"Text": "未录入",
				"value": "NOENTRY"
			}, {
				"Text": "已录入",
				"value": "ENTRYED"
			}],
			"onchange": ""
		}, {
			"title": "培训部分",
			"id": "phase",
			"type": "select",
			"sqlname": "phase",
			"inputtext": "",
			"selectData": [{
				"value": "COURSE1",
				"Text": "第一部分"
			}, {
				"value": "COURSE2",
				"Text": "第二部分"
			}, {
				"value": "COURSE3",
				"Text": "第三部分"
			}, {
				"value": "COURSE4",
				"Text": "第四部分"
			}],
			"onchange": ""
		}, {
			"title": "成绩标志",
			"id": "ispassed",
			"type": "select",
			"sqlname": "ispassed",
			"inputtext": "",
			"selectData": [{
				"Text": "合格",
				"value": "Passed"
			}, {
				"Text": "补考合格",
				"value": "Repassed"
			}, {
				"Text": "未确认",
				"value": "NOCONFIRM"
			}, {
				"Text": "不及格",
				"value": "FAIL"
			}],
			"onchange": ""
		}]
	},
	"TrainingStatistical": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练员",
			"id": "coaname",
			"type": "input",
			"sqlname": "coaname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员身份证",
			"id": "stucardnum",
			"type": "input",
			"sqlname": "stucardnum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"StudentChargeConfirm": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员",
			"id": "stuName",
			"type": "input",
			"sqlname": "stuName",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证",
			"id": "cardNum",
			"type": "input",
			"sqlname": "cardNum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "收费类型",
			"id": "chargetype",
			"type": "select",
			"sqlname": "chargetype",
			"inputtext": "",
			"selectData": [{
				"Text": "学费",
				"value": "TUITION"
			}, {
				"Text": "补考费",
				"value": "MAKEUP"
			}],
			"onchange": ""
		}]
	},
	"StudentChargeConfirms": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员",
			"id": "stuName",
			"type": "input",
			"sqlname": "stuName",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证",
			"id": "cardNum",
			"type": "input",
			"sqlname": "cardNum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "收费类型",
			"id": "chargetype",
			"type": "select",
			"sqlname": "chargetype",
			"inputtext": "",
			"selectData": [{
				"Text": "学费",
				"value": "TUITION"
			}, {
				"Text": "补考费",
				"value": "MAKEUP"
			}],
			"onchange": ""
		}]
	},
	"StudentSigninWill": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "报名人",
			"id": "username",
			"type": "input",
			"sqlname": "username",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "联系电话",
			"id": "userphone",
			"type": "input",
			"sqlname": "userphone",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "班型",
			"id": "course",
			"type": "select",
			"sqlname": "course",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "车型",
			"id": "cartype",
			"type": "select",
			"sqlname": "cartype",
			"inputtext": "",
			"selectData": [{
				"value": "C1",
				"Text": "C1"
			}, {
				"value": "C2",
				"Text": "C2"
			}, {
				"value": "C3",
				"Text": "C3"
			}, {
				"value": "A1",
				"Text": "A1"
			}, {
				"value": "A2",
				"Text": "A2"
			}, {
				"value": "B1",
				"Text": "B1"
			}, {
				"value": "B2",
				"Text": "B2"
			}],
			"onchange": ""
		}]
	},
	"StudentExpireIdcard": {
		"data": [{
				"title": "所属分校",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "学员名称",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "身份证号",
				"id": "certificateNum",
				"type": "input",
				"sqlname": "certificateNum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			//	,{
			//		"title": "身份证有效期",
			//		"id": "timestart-timeend",
			//		"type": "expire",
			//		"sqlname": "timestart-timeend",
			//		"inputtext": "",
			//		"selectData": [],
			//		"onchange": ""
			//	}
		]
	},
	"coachExpireIdcard": {
		"data": [{
				"title": "所属分校",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "教练名称",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "身份证号",
				"id": "certificateNum",
				"type": "input",
				"sqlname": "certificateNum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			//	,{
			//		"title": "身份证有效期",
			//		"id": "timestart-timeend",
			//		"type": "expire",
			//		"sqlname": "timestart-timeend",
			//		"inputtext": "",
			//		"selectData": [],
			//		"onchange": ""
			//	}
		]
	},
	"coachExpireDrilicence": {
		"data": [{
				"title": "所属分校",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "教练名称",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "驾驶证号",
				"id": "certificateNum",
				"type": "input",
				"sqlname": "certificateNum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			//	,{
			//		"title": "驾驶证有效期",
			//		"id": "timestart-timeend",
			//		"type": "expire",
			//		"sqlname": "timestart-timeend",
			//		"inputtext": "",
			//		"selectData": [],
			//		"onchange": ""
			//	}
		]
	},
	"coachExpireQualnum": {
		"data": [{
				"title": "所属分校",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "教练名称",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "教练证号",
				"id": "certificateNum",
				"type": "input",
				"sqlname": "certificateNum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			//	,{
			//		"title": "教练证有效期",
			//		"id": "timestart-timeend",
			//		"type": "expire",
			//		"sqlname": "timestart-timeend",
			//		"inputtext": "",
			//		"selectData": [],
			//		"onchange": ""
			//	}
		]
	},
	"coachExpireTransportno": {
		"data": [{
				"title": "所属分校",
				"id": "brid",
				"type": "select",
				"sqlname": "brid",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "车牌号",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "运输证号",
				"id": "certificateNum",
				"type": "input",
				"sqlname": "certificateNum",
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}
			//	,{
			//		"title": "道路运输证有效期",
			//		"id": "timestart-timeend",
			//		"type": "expire",
			//		"sqlname": "timestart-timeend",
			//		"inputtext": "",
			//		"selectData": [],
			//		"onchange": ""
			//	}
		]
	},
	"StudentExamStatistical": {
		"data": [{
			"title": "年份",
			"id": "year",
			"type": "select",
			"sqlname": "year",
			"inputtext": "",
			"selectData": GetYearGoUpTow(),
			"onchange": ""
		}, {
			"title": "月份",
			"id": "month",
			"type": "select",
			"sqlname": "month",
			"inputtext": "",
			"selectData": monthes,
			"onchange": ""
		}, {
			"title": "招生点",
			"id": "recruitid",
			"type": "select",
			"sqlname": "recruitid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"StudentSendStatistical": {
		"data": [{
			"title": "年份",
			"id": "year",
			"type": "select",
			"sqlname": "year",
			"inputtext": "",
			"selectData": GetYearGoUpTow(),
			"onchange": ""
		}, {
			"title": "月份",
			"id": "month",
			"type": "select",
			"sqlname": "month",
			"inputtext": "",
			"selectData": monthes,
			"onchange": ""
		}, {
			"title": "招生点",
			"id": "recruitid",
			"type": "select",
			"sqlname": "recruitid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"EnrolStudentStatistical": {
		"data": [{
			"title": "年份",
			"id": "year",
			"type": "select",
			"sqlname": "year",
			"inputtext": "",
			"selectData": GetYearGoUpTow(),
			"onchange": ""
		}, {
			"title": "月份",
			"id": "month",
			"type": "select",
			"sqlname": "month",
			"inputtext": "",
			"selectData": monthes,
			"onchange": ""
		}, {
			"title": "招生点",
			"id": "reOrco",
			"type": "select",
			"sqlname": "reOrco",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "招生来源",
			"id": "zstype",
			"type": "select",
			"sqlname": "zstype",
			"inputtext": "",
			"selectData": [{
				"value": "dot",
				"Text": "招生点"
			}, {
				"value": "coa",
				"Text": "教练员"
			}],
			"onchange": ""
		}]
	},
	"StudentOrderList": {
		"data": [{
			"title": "分校",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练姓名",
			"id": "coaname",
			"type": "input",
			"sqlname": "coaname",
			"inputtext": "教练姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练场",
			"id": "trainareid",
			"type": "select",
			"sqlname": "trainareid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员电话",
			"id": "stumobile",
			"type": "input",
			"sqlname": "stumobile",
			"inputtext": "学员电话",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "预约日期",
			"id": "sdldaytime",
			"type": "dayinput",
			"sqlname": "sdldaytime",
			"format": "YYYY-MM-DD",
			"istime": false,
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"StudentPay": {
		"data": [{
				"title": "学员姓名",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "学员姓名",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "证件号码",
				"id": "cardnum",
				"type": "input",
				"sqlname": "cardnum",
				"inputtext": "证件号码",
				"selectData": [],
				"onchange": ""
			}]
			//				},{
			//					"title": "",
			//					"id": "",
			//					"type": "",
			//					"sqlname": "",
			//					"inputtext": "",
			//					"selectData": [],
			//					"onchange": ""
			//				},
			//				{
			//					"title": "报名开始时间",
			//					"id": "timestart",
			//					"type": "dayinput",
			//					"sqlname": "timestart",
			//					"inputtext": "报名开始时间",
			//					"selectData": [],
			//					"onchange": ""
			//				},
			//				{
			//					"title": "报名结束时间",
			//					"id": "timeend",
			//					"type": "dayinput",
			//					"sqlname": "timeend",
			//					"inputtext": "报名结束时间",
			//					"selectData": [],
			//					"onchange": ""
			//				}]
	},
	"StudentPayStatistical": {
		"data": [{
			"title": "身份证",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "身份证",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "studentname",
			"type": "input",
			"sqlname": "studentname",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "培训车型",
			"id": "traintype",
			"type": "select",
			"sqlname": "traintype",
			"inputtext": "培训车型",
			"selectData": cartype,
			"onchange": ""
		}]

	},
	"TrainingOrder": {
		"data": [{
				"title": "学员姓名",
				"id": "name",
				"type": "input",
				"sqlname": "name",
				"inputtext": "学员姓名",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "证件号码",
				"id": "cardnum",
				"type": "input",
				"sqlname": "cardnum",
				"inputtext": "证件号码",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "培训部分",
				"id": "subject",
				"type": "select",
				"sqlname": "subject",
				"inputtext": "",
				"selectData": [{
					"value": "COURSE1",
					"Text": "第一部分"
				}, {
					"value": "COURSE2",
					"Text": "第二部分"
				}, {
					"value": "COURSE3",
					"Text": "第三部分"
				}, {
					"value": "COURSE4",
					"Text": "第四部分"
				}],
				"onchange": ""
			}, {
				"title": "约考状态",
				"id": "apomExamType",
				"type": "select",
				"sqlname": "apomExamType",
				"inputtext": "",
				"selectData": [{
					"value": "Apomed",
					"Text": "已约考"
				}, {
					"value": "CanApom",
					"Text": "可约考"
				}],
				"onchange": ""
			}, {
				"title": "教练员",
				"id": "coaname",
				"type": "input",
				"sqlname": "coaname",
				"inputtext": "教练员姓名",
				"selectData": [],
				"onchange": ""
			}, {
				"title": "约考时间",
				"id": "apomdaytime",
				"type": "dayinput",
				"sqlname": "apomdaytime",
				"format": "YYYY-MM-DD",
				"istime": false,
				"inputtext": "",
				"selectData": [],
				"onchange": ""
			}]
			//				},{
			//					"title": "",
			//					"id": "",
			//					"type": "",
			//					"sqlname": "",
			//					"inputtext": "",
			//					"selectData": [],
			//					"onchange": ""
			//				},
			//				{
			//					"title": "报名开始时间",
			//					"id": "timestart",
			//					"type": "dayinput",
			//					"sqlname": "timestart",
			//					"inputtext": "报名开始时间",
			//					"selectData": [],
			//					"onchange": ""
			//				},
			//				{
			//					"title": "报名结束时间",
			//					"id": "timeend",
			//					"type": "dayinput",
			//					"sqlname": "timeend",
			//					"inputtext": "报名结束时间",
			//					"selectData": [],
			//					"onchange": ""
			//				}]
	},
	"TrainingOrderselect": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证号",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "studentname",
			"type": "input",
			"sqlname": "studentname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "约考状态",
			"id": "apomExamType",
			"type": "select",
			"sqlname": "apomExamType",
			"inputtext": "",
			"selectData": [{
				"value": "ApomExam",
				"Text": "已约考"
			}, {
				"value": "NotApomExam",
				"Text": "未约考"
			}],
			"onchange": ""
		}, {
			"title": "培训部分",
			"id": "subject",
			"type": "select",
			"sqlname": "subject",
			"inputtext": "",
			"selectData": [{
				"value": "COURSE1",
				"Text": "第一部分"
			}, {
				"value": "COURSE2",
				"Text": "第二部分"
			}, {
				"value": "COURSE3",
				"Text": "第三部分"
			}, {
				"value": "COURSE4",
				"Text": "第四部分"
			}],
			"onchange": ""
		}]
	},
	"CoachMoney": {
		"data": [{
			"title": "年份",
			"id": "year",
			"type": "select-no",
			"sqlname": "year",
			"inputtext": "",
			"selectData": GetYearGoUpTow(),
			"onchange": ""
		}, {
			"title": "月份",
			"id": "month",
			"type": "select",
			"sqlname": "month",
			"inputtext": "",
			"selectData": monthes,
			"onchange": ""
		}, {
			"title": "教练员",
			"id": "coachname",
			"type": "input",
			"sqlname": "coachname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"coachPhoto": {
		"data": [{
			"title": "教练姓名",
			"id": "coachname",
			"type": "input",
			"sqlname": "coachname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"TrainingEnd": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学生姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "打印状态",
			"id": "printstatus",
			"type": "select",
			"sqlname": "printstatus",
			"inputtext": "",
			"selectData": [{
				"value": "TRUE",
				"Text": "已打印"
			}, {
				"value": "FALSE",
				"Text": "未打印"
			}, ],
			"onchange": ""
		}]
	},
	"OrderAccept": {
		"data": []
	},
	"product": {
		"data": [{
			"title": "班型编号",
			"id": "number",
			"type": "input",
			"sqlname": "number",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "班型名称",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "所有者",
			"id": "owner",
			"type": "select",
			"sqlname": "owner",
			"inputtext": "",
			"selectData": [{
				"value": "SCHOOL",
				"Text": "驾校"
			}, {
				"value": "COACH",
				"Text": "教练"
			}],
			"onchange": ""
		}, {
			"title": "培训车型",
			"id": "cartype",
			"type": "checkbox",
			"sqlname": "cartype",
			"inputtext": "",
			"selectData": [{
				"value": "A1",
				"Text": "A1"
			}, {
				"value": "A2",
				"Text": "A2"
			}, {
				"value": "A3",
				"Text": "A3"
			}, {
				"value": "B1",
				"Text": "B1"
			}, {
				"value": "B2",
				"Text": "B2"
			}, {
				"value": "C1",
				"Text": "C1"
			}, {
				"value": "C2",
				"Text": "C2"
			}, {
				"value": "C3",
				"Text": "C3"
			}, {
				"value": "C4",
				"Text": "C4"
			}, {
				"value": "C5",
				"Text": "C5"
			}, {
				"value": "D",
				"Text": "D"
			}, {
				"value": "E",
				"Text": "E"
			}, {
				"value": "F",
				"Text": "F"
			}, {
				"value": "M",
				"Text": "M"
			}, {
				"value": "N",
				"Text": "N"
			}, {
				"value": "P",
				"Text": "P"
			}],
			"onchange": ""
		}, {
			"title": "班型状态",
			"id": "status",
			"type": "radio",
			"sqlname": "status",
			"inputtext": "",
			"selectData": [{
				"value": "UNISSUED",
				"Text": "待发布"
			}, {
				"value": "ISSUED",
				"Text": "已发布"
			}, {
				"value": "OFFLINE",
				"Text": "已下线"
			}],
			"onchange": ""
		}, {
			"title": "创建时间",
			"id": "createtime",
			"type": "dayinput",
			"sqlname": "createtime",
			"format": "YYYY-MM-DD",
			"istime": false,
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "发布时间",
			"id": "deploytime",
			"type": "dayinput",
			"sqlname": "deploytime",
			"format": "YYYY-MM-DD",
			"istime": false,
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"listOfOrders": {
		"data": [{
			"title": "支付状态",
			"id": "paystatus",
			"type": "select-no",
			"sqlname": "paystatus",
			"inputtext": "",
			"selectData": [{
				"value": 0,
				"Text": "全部状态"
			}, {
				"value": 1,
				"Text": "生成订单"
			}, {
				"value": 2,
				"Text": "开始支付"
			}, {
				"value": 3,
				"Text": "支付完成 "
			}, {
				"value": 4,
				"Text": "支付成功"
			}, {
				"value": 8,
				"Text": "支付失败"
			}, {
				"value": 5,
				"Text": "开始退款"
			}, {
				"value": 6,
				"Text": "退款完成"
			}, {
				"value": 7,
				"Text": "退款成功"
			}, {
				"value": -1,
				"Text": "退款失败 "
			}, {
				"value": -2,
				"Text": "预约回退"
			}],
			"onchange": ""
		}, {
			"title": "支付渠道",
			"id": "paycanal",
			"type": "select",
			"sqlname": "paycanal",
			"inputtext": "",
			"selectData": [{
				"value": "微信扫码",
				"Text": "微信扫码"
			}, {
				"value": "线下支付",
				"Text": "线下支付"
			}],
			"onchange": ""
		}, {
			"title": "订单编号",
			"id": "ordercode",
			"type": "input",
			"sqlname": "ordercode",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "分校名称",
			"id": "brschid",
			"type": "select-no",
			"sqlname": "",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "starttime",
			"type": "dayinput",
			"sqlname": "starttime",
			"format": "YYYY-MM-DD hh:mm:ss",
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#endtime").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "endtime",
			"type": "dayinput",
			"sqlname": "endtime",
			"format": "YYYY-MM-DD hh:mm:ss",
			"istoday": false,
			"inputtext": "",
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#starttime").data("options");
				options.start = options.max = dates;
			}
		}, {
			"title": "学员姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "预约类型",
			"id": "type",
			"type": "select-no",
			"sqlname": "",
			"inputtext": "",
			"selectData": [{
				"value": "2",
				"Text": "全部类型"
			}, {
				"value": "0",
				"Text": "预约教练 "
			}, {
				"value": "1",
				"Text": "预约训练场"
			}],
			"onchange": ""
		}]
	},
	"coaAppointrecords": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "预约部分",
			"id": "subject",
			"type": "select",
			"sqlname": "subject",
			"inputtext": "",
			"selectData": [{
				"value": "COURSE1",
				"Text": "第一部分"
			}, {
				"value": "COURSE2",
				"Text": "第二部分"
			}, {
				"value": "COURSE3",
				"Text": "第三部分"
			}, {
				"value": "COURSE4",
				"Text": "第四部分"
			}],
			"onchange": ""
		}, {
			"title": "预约状态",
			"id": "status",
			"type": "select",
			"sqlname": "status",
			"inputtext": "",
			"selectData": [{
				"value": "BraRollBack",
				"Text": "分校回退"
			}, {
				"value": "RollBack",
				"Text": "回退预约"
			}, {
				"value": "Cancel",
				"Text": "教练取消"
			}, {
				"value": "NoPay",
				"Text": "预约成功"
			}, {
				"value": "Paying",
				"Text": "正在学车"
			}, {
				"value": "WaitingEva",
				"Text": "学车完成"
			}],
			"onchange": ""
		}, {
			"title": "支付类型",
			"id": "paytype",
			"type": "select",
			"sqlname": "paytype",
			"inputtext": "",
			"selectData": [{
				"value": "WithoutPay",
				"Text": "无需支付"
			}, {
				"value": "BalancePay",
				"Text": "余额支付"
			}, {
				"value": "CashPay",
				"Text": "现金支付"
			}, {
				"value": "BalancePriorPay",
				"Text": "余额优先支付"
			}, {
				"value": "LearnFirst",
				"Text": "先学后付"
			}],
			"onchange": ""
		}, {
			"title": "教练姓名",
			"id": "coaid",
			"type": "select",
			"sqlname": "coaid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员证件",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "学员身份证号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "starttime",
			"type": "dayinput",
			"sqlname": "starttime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#endtime").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "endtime",
			"type": "dayinput",
			"sqlname": "endtime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#starttime").data("options");
				options.start = options.max = dates;
			}
		}]
	},
	"traAppointrecords": {
		"data": [{
			"title": "预约部分",
			"id": "subject",
			"type": "select",
			"sqlname": "subject",
			"inputtext": "",
			"selectData": [{
				"value": "COURSE1",
				"Text": "第一部分"
			}, {
				"value": "COURSE2",
				"Text": "第二部分"
			}, {
				"value": "COURSE3",
				"Text": "第三部分"
			}, {
				"value": "COURSE4",
				"Text": "第四部分"
			}],
			"onchange": ""
		}, {
			"title": "预约状态",
			"id": "status",
			"type": "select",
			"sqlname": "status",
			"inputtext": "",
			"selectData": [{
				"value": "BraRollBack",
				"Text": "分校回退"
			}, {
				"value": "RollBack",
				"Text": "回退预约"
			}, {
				"value": "Cancel",
				"Text": "教练取消"
			}, {
				"value": "NoPay",
				"Text": "预约成功"
			}, {
				"value": "Paying",
				"Text": "正在学车"
			}, {
				"value": "WaitingEva",
				"Text": "学车完成"
			}],
			"onchange": ""
		}, {
			"title": "支付类型",
			"id": "paytype",
			"type": "select",
			"sqlname": "paytype",
			"inputtext": "",
			"selectData": [{
				"value": "WithoutPay",
				"Text": "无需支付"
			}, {
				"value": "BalancePay",
				"Text": "余额支付"
			}, {
				"value": "CashPay",
				"Text": "现金支付"
			}, {
				"value": "BalancePriorPay",
				"Text": "余额优先支付"
			}, {
				"value": "LearnFirst",
				"Text": "先学后付"
			}],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "starttime",
			"type": "dayinput",
			"sqlname": "starttime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#endtime").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "endtime",
			"type": "dayinput",
			"sqlname": "endtime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#starttime").data("options");
				options.start = options.max = dates;
			}
		}]
	},
	"stuTraAndAppo": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select-no",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证号",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "starttime",
			"type": "dayinput",
			"sqlname": "starttime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#endtime").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "endtime",
			"type": "dayinput",
			"sqlname": "endtime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#starttime").data("options");
				options.start = options.max = dates;
			}
		}]
	},
	"coaTraAndAppo": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select-no",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练姓名",
			"id": "coaname",
			"type": "input",
			"sqlname": "coaname",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证号",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "starttime",
			"type": "dayinput",
			"sqlname": "starttime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#endtime").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "endtime",
			"type": "dayinput",
			"sqlname": "endtime",
			"format": "YYYY-MM-DD",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#starttime").data("options");
				options.start = options.max = dates;
			}
		}]
	},
	"ScheduleArray": {
		"data": []
	},
	"SchScheduleModel": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select-no",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"CoaScheduleModel": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select-no",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}]
	},
	"RemoteEduGrade": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "证件号码",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "证件号码",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "学员编码",
			"id": "code",
			"type": "input",
			"sqlname": "code",
			"inputtext": "学员编码",
			"selectData": [],
			"onchange": ""
		}]
	},
	"comment": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练名称",
			"id": "coaname",
			"type": "input",
			"sqlname": "coaname",
			"inputtext": "教练名称",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "评价对象",
			"id": "type",
			"type": "select",
			"sqlname": "type",
			"inputtext": "",
			"selectData": [{
				"value": "1",
				"Text": "教练"
			}, {
				"value": "2",
				"Text": "驾校"
			}],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "starttime",
			"type": "dayinput",
			"sqlname": "starttime",
			"format": "YYYY-MM-DD hh:mm:ss",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#endtime").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "endtime",
			"type": "dayinput",
			"sqlname": "endtime",
			"format": "YYYY-MM-DD hh:mm:ss",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#starttime").data("options");
				options.start = options.max = dates;
			}
		}]
	},
	"report": {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练名称",
			"id": "coaname",
			"type": "input",
			"sqlname": "coaname",
			"inputtext": "教练名称",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "评价对象",
			"id": "type",
			"type": "select",
			"sqlname": "type",
			"inputtext": "",
			"selectData": [{
				"value": "1",
				"Text": "教练"
			}, {
				"value": "2",
				"Text": "驾校"
			}],
			"onchange": ""
		}, {
			"title": "学员姓名",
			"id": "stuname",
			"type": "input",
			"sqlname": "stuname",
			"inputtext": "学员姓名",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "开始日期",
			"id": "starttime",
			"type": "dayinput",
			"sqlname": "starttime",
			"format": "YYYY-MM-DD hh:mm:ss",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#endtime").data("options");
				options.start = options.min = dates;
			}
		}, {
			"title": "结束日期",
			"id": "endtime",
			"type": "dayinput",
			"sqlname": "endtime",
			"format": "YYYY-MM-DD hh:mm:ss",
			"inputtext": "",
			"istime": false,
			"istoday": false,
			"selectData": [],
			"onchange": function(dates) {
				var options = $("#starttime").data("options");
				options.start = options.max = dates;
			}
		}]
	},
	CoachDaillyrec: {
		"data": [{
			"title": "分校名称",
			"id": "brid",
			"type": "select-no",
			"sqlname": "brid",
			"inputtext": "",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "教练名称",
			"id": "name",
			"type": "input",
			"sqlname": "name",
			"inputtext": "教练名称",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "身份证号",
			"id": "cardnum",
			"type": "input",
			"sqlname": "cardnum",
			"inputtext": "身份证号",
			"selectData": [],
			"onchange": ""
		}, {
			"title": "年份",
			"id": "year",
			"type": "select-no",
			"sqlname": "year",
			"inputtext": "",
			"selectData": GetYearGoUpTow(),
			"onchange": ""
		}, {
			"title": "月份",
			"id": "month",
			"type": "select-no",
			"sqlname": "month",
			"inputtext": "",
			"selectData": monthes_Z,
			"onchange": ""
		}]
	}
}

//获取年份
function GetYearGoUpTow() {
	var year = [];
	var date = new Date();
	var yeares = date.getFullYear();
	year.push({
		"value": yeares,
		"Text": yeares + "年"
	});
	year.push({
		"value": yeares - 1,
		"Text": (yeares - 1) + "年"
	});
	year.push({
		"value": yeares - 2,
		"Text": (yeares - 2) + "年"
	});
	return year;
}

// select syllsubject by phase
function SelectBySelect(Selectid, BeSelectid, selecturl, sqlname, tp, vauleid) {
	if ($("#" + Selectid).val() != "0") {
		$("#" + BeSelectid).attr("disabled", false);
		$("#" + BeSelectid).val("0");
		$("#" + BeSelectid).select2();
		if (selecturl != "") {
			$("#" + BeSelectid).find("option").remove();
			$("#" + BeSelectid).append("<option value=\"0\">请选择</option>");
			$("#" + BeSelectid).select2();
			ajax_select_admin(selecturl + $("#" + Selectid).val().split("_")[0], vauleid, sqlname, BeSelectid, tp);
			console.log(selecturl + $("#" + Selectid).val().split("_")[0]);
		}
	} else {
		$("#" + BeSelectid).attr("disabled", true);
		$("#" + BeSelectid).val("0");
		$("#" + BeSelectid).select2();
		if (selecturl != "") {
			$("#" + BeSelectid).find("option").remove();
			$("#" + BeSelectid).append("<option value=\"0\">请选择</option>");
			$("#" + BeSelectid).select2();
		}
	}
}

function S_C_S(Selectid, BeSelectid, selecturl, sqlname, tp, vauleid) {
	if ($("#" + Selectid).val() != "0") {
		$("#" + BeSelectid).attr("disabled", false);
		$("#" + BeSelectid).val("0");
		$("#" + BeSelectid).select2();
		if (selecturl != "") {
			$("#" + BeSelectid).find("option").remove();
			$("#" + BeSelectid).append("<option value=\"0\">请选择</option>");
			$("#" + BeSelectid).select2();
			ajax_select_admin(selecturl, vauleid, sqlname, BeSelectid, tp);
		}
	} else {
		$("#" + BeSelectid).attr("disabled", true);
		$("#" + BeSelectid).val("0");
		$("#" + BeSelectid).select2();
		if (selecturl != "") {
			$("#" + BeSelectid).find("option").remove();
			$("#" + BeSelectid).append("<option value=\"0\">请选择</option>");
			$("#" + BeSelectid).select2();
		}
	}
}

function S_C_S_CB(Selectid, BeSelectid, selecturl, sqlname, tp, vauleid, callback) {
	if ($("#" + Selectid).val() != "0") {
		$("#" + BeSelectid).attr("disabled", false);
		$("#" + BeSelectid).val("0");
		$("#" + BeSelectid).select2();
		if (selecturl != "") {
			$("#" + BeSelectid).find("option").remove();
			$("#" + BeSelectid).append("<option value=\"0\">请选择</option>");
			$("#" + BeSelectid).select2();
			ajax_select_puble(selecturl, vauleid, sqlname, BeSelectid, tp, callback);
		}
	} else {
		$("#" + BeSelectid).attr("disabled", true).val("0").select2();
		if (selecturl != "") {
			$("#" + BeSelectid).find("option").remove();
			$("#" + BeSelectid).append("<option value=\"0\">请选择</option>");
			$("#" + BeSelectid).select2();
		}
	}
}

//准教车型绑定准驾车型
function dripermittedChangeteachpermitted(did, tid) {
	var dValue = $("#" + did).val(); //准驾车型的值
	$("#" + tid).find("option").remove(); //清除option
	$("#" + tid).append("<option value=\"0\">请选择</option>"); //添加optin
	$("#" + tid).append(getOptions(dValue));
	$("#" + tid).select2();
}

function SelectChangeSelect(Selectid, BeSelectid) {
	if ($("#" + Selectid).val() != "0") {
		$("#" + BeSelectid).val($("#" + Selectid).val());
		$("#" + BeSelectid).select2();
	} else {
		$("#" + BeSelectid).attr("disabled", true);
		$("#" + BeSelectid).val("0");
		$("#" + BeSelectid).select2();
	}
}

//