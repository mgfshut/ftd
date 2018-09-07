function getModalconObj(btntype) {
	var type = UrlValue("v");
	return _modalCon[type][btntype]();
}

var _modalCon = {
	TrainingOrder: {
		"add": function() {
			return GetModalCon([
				["约考信息", "sort", [
					["input", "学员姓名" + color, "text", "Sm_name", [],"personinfo.name"],
					["input", "证件号码" + color, "text", "Sm_cardnum", [],"personinfo.cardnum"],
					["input", "电话号码" + color, "text", "Sm_mobile", [],"personinfo.mobile"],
					["select_no", "培训部分" + color, "select", "Sm_subject", [
						["第一部分", "COURSE1"],
						["第二部分", "COURSE2"],
						["第三部分", "COURSE3"],
						["第四部分", "COURSE4"]
					],"undefined"],
					["dayinputhms", "约考时间" + color, "dayinputhms", "Sm_examtime", []],
					["input", "考场", "text", "Sm_examplace", []],
					["select", "接送点", "select", "Sm_pup", []],
					["dayinputhms", "接收时间", "dayinputhms", "Sm_puptime", []],
					["select", "接送教练", "select", "Sm_id", [],"undefined"],
				]]
			]);
		}
	},
	ModifyTraSchedual: function() {//批量修改排班数据用
		return GetModalCon([
				["修改排班数据", "sort", [
					["select_no", "车型" + color, "select", "Sm_carType", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					]],
					["number", "标准价格" + color, "number", "Sm_price", []],
					["input", "预约名额" + color, "input", "Sm_number", []],
					["select_no", "预约范围" + color, "select", "Sm_scopetype", [
						["总校任意学员", "0"],
						["分校任意学员", "1"],
						["分校指定班型学员", "2"],
						["指定带教学员", "3"]
					]],
					["selects", "班型", "select", "Sm_classtype", []],
					["select_no", "发布状态" + color, "select", "Sm_status", [
						["发布", "1"],
						["未发布", "0"]
					]]
				]]
			]);
	},
	TraSchedual: function() {//教练场地预约用
		return GetModalCon([
				["场地排班模板" + _tiphtml, "sort", [
					["select", "所属驾校" + color, "select", "Sm_braid", []],
					["select", "训练场地" + color, "select", "Sm_trainareaid", []],
					["select", "教练分组" + color, "select", "Sm_groupid", []],
					["select", "选择模板", "input", "Sm_name", []],
					["select_no", "车型" + color, "select", "Sm_carType", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					]],
					["select_no", "培训部分" + color, "select", "Sm_subject", [
						["第一部分", "1"],
						["第二部分", "2"],
						["第三部分", "3"],
						["第四部分", "4"]
					]],
					["select_no", "小科目" + color, "select", "Sm_subcourse", [
						["所有", "All"],
						["倒车入库", "BackOff"],
						["侧方停车", "Parking"],
						["坡道定点停车和起步", "Uphill"],
						["直角转弯", "StraightTurn"],
						["曲线行驶", "CurveTurn"]
					]],
					["input", "预约名额" + color, "input", "Sm_number", []],
					["select_no", "是否发布" + color, "select", "Sm_invalid", [
						["是", "1"],
						["否", "0"]
					]],
					["number", "标准价格" + color, "number", "Sm_price", []],
					["select_no", "支付方式" + color, "select", "Sm_paytype", [
						["无需支付", "WithoutPay"],
						["余额支付", "BalancePay"],
						// ["现金支付", "CashPay"],
						// ["余额优先支付", "BalancePriorPay"],
						["先学后付", "LearnFirst"],
					]],
					["select_no", "间隔时间" + color, "select", "Sm_spacePreciseTime", [
						["30分钟", "30"],
						["60分钟", "60"],
						["90分钟", "90"],
						["120分钟", "120"],
						["150分钟", "150"],
						["180分钟", "180"],
						["210分钟", "210"],
						["240分钟", "240"]
					]],
					["timeinput", "开始时间" + color, "timeinput", "Sm_startPreciseTime", []],
					["timeinput", "结束时间" + color, "timeinput", "Sm_endPreciseTime", []],
					["select_no", "预约范围" + color, "select", "Sm_scopetype", [
						["总校任意学员", "0"],
						["分校任意学员", "1"],
						["分校指定班型学员", "2"]
					]],
					["selects", "班型" + color, "select", "Sm_classtype", []],
					["select_no", "精细排班" + color, "select", "Sm_detailstatus", [
						["否", "0"],
						["是", "1"]
					]]
				]]
			]);
	},
	CoaSchedual: function() {//教练员预约用
		return GetModalCon([
				["教练排班模板" + _tiphtml, "sort", [
					["select", "所属驾校" + color, "select", "Sm_braid", []],
					["select", "选择分组", "select", "Sm_groupid", []],
					["select", "选择教练" + color, "select", "Sm_coaid", []],
					["select", "选择模板", "input", "Sm_name", []],
					["select", "训练场地", "select", "Sm_trainareaid", []],
					["select_no", "车型" + color, "select", "Sm_carType", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					]],
					["select_no", "培训部分" + color, "select", "Sm_subject", [
						["第一部分", "1"],
						["第二部分", "2"],
						["第三部分", "3"],
						["第四部分", "4"]
					]],
					["select_no", "小科目" + color, "select", "Sm_subcourse", [
						["所有", "All"],
						["倒车入库", "BackOff"],
						["侧方停车", "Parking"],
						["坡道定点停车和起步", "Uphill"],
						["直角转弯", "StraightTurn"],
						["曲线行驶", "CurveTurn"]
					]],
					["input", "预约名额" + color, "input", "Sm_number", []],
					["select_no", "是否发布" + color, "select", "Sm_invalid", [
						["是", "1"],
						["否", "0"]
					]],
					["number", "标准价格" + color, "number", "Sm_price", []],
					["select_no", "支付方式" + color, "select", "Sm_paytype", [
						["无需支付", "WithoutPay"],
						["余额支付", "BalancePay"],
						// ["现金支付", "CashPay"],
						// ["余额优先支付", "BalancePriorPay"],
						["先学后付", "LearnFirst"],
					]],
					["select_no", "间隔时间" + color, "select", "Sm_spacePreciseTime", [
						["30分钟", "30"],
						["60分钟", "60"],
						["90分钟", "90"],
						["120分钟", "120"],
						["150分钟", "150"],
						["180分钟", "180"],
						["210分钟", "210"],
						["240分钟", "240"]
					]],
					["timeinput", "开始时间" + color, "timeinput", "Sm_startPreciseTime", []],
					["timeinput", "结束时间" + color, "timeinput", "Sm_endPreciseTime", []],
					["select_no", "预约范围" + color, "select", "Sm_scopetype", [
						["总校任意学员", "0"],
						["分校任意学员", "1"],
						["分校指定班型学员", "2"],
						["指定带教学员", "3"]
					]],
					["selects", "班型" + color, "select", "Sm_classtype", []],
					["select_no", "精细排班" + color, "select", "Sm_detailstatus", [
						["否", "0"],
						["是", "1"]
					]]
				]]
			]);
	},
	CarArchival: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["number", "交强险金额", "number", "Md_stroinsprice", []],
					["number", "商业险金额", "number", "Md_cominsprice", []]
				]],
				["到期日期", "sort", [
					["dayinput", "年审", "dayinput", "Md_yearexp", []],
					["dayinput", "二级维护", "dayinput", "Md_secmtexp", []],
					["dayinput", "技术等级评定", "dayinput", "Md_techexp", []],
					["dayinput", "交强险", "dayinput", "Md_stroinsexp", []],
					["dayinput", "商业险", "dayinput", "Md_cominsexp", []],
					["dayinput", "车船税", "dayinput", "Md_vehvesexp", []]
				]]
			]);
		}
	},
	PollingRecord: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["select", "所属分校" + color, "select", "Md_brid", []],
					["select", "车牌号" + color, "select", "Md_carid", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "巡检日期", "dayinput", "Md_polldate", []],
					["input", "巡检地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["input", "巡检结果", "text", "Md_result", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["input", "车牌号" + color, "text", "Md_licnum", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "巡检日期", "dayinput", "Md_polldate", []],
					["input", "巡检地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["input", "巡检结果", "text", "Md_result", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		}
	},
	RefuelRecord: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["select", "所属分校" + color, "select", "Md_brid", []],
					["select", "车牌号" + color, "select", "Md_carid", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "加油日期", "dayinput", "Md_fueldate", []],
					["number", "加油公里数(km)", "number", "Md_km", []],
					["number", "加油升数(L)", "number", "Md_lpm", []],
					["number", "加油金额(元)", "number", "Md_price", []],
					["input", "加油地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["input", "车牌号" + color, "text", "Md_licnum", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "加油日期", "dayinput", "Md_fueldate", []],
					["number", "加油公里数(km)", "number", "Md_km", []],
					["number", "加油升数(L)", "number", "Md_lpm", []],
					["number", "加油金额(元)", "number", "Md_price", []],
					["input", "加油地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		}
	},
	AccidentRecord: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["select", "所属分校" + color, "select", "Md_brid", []],
					["select", "车牌号" + color, "select", "Md_carid", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["input", "事故地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["dayinput", "事故日期", "dayinput", "Md_acddate", []],
					["input", "责任划分", "text", "Md_dutydiv", []],
					["input", "处理结果", "text", "Md_result", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["input", "车牌号" + color, "text", "Md_licnum", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["input", "事故地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["dayinput", "事故日期", "dayinput", "Md_acddate", []],
					["input", "责任划分", "text", "Md_dutydiv", []],
					["input", "处理结果", "text", "Md_result", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		}
	},
	TrafficUnlaw: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["select", "所属分校" + color, "select", "Md_brid", []],
					["select", "车牌号" + color, "select", "Md_carid", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "违法日期", "dayinput", "Md_violdate", []],
					["number", "违法记分", "number", "Md_point", []],
					["number", "罚款金额(元)", "number", "Md_price", []],
					["input", "违法地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["input", "违法行为", "text", "Md_violaction", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["input", "车牌号" + color, "text", "Md_licnum", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "违法日期", "dayinput", "Md_violdate", []],
					["number", "违法记分", "number", "Md_point", []],
					["number", "罚款金额(元)", "number", "Md_price", []],
					["input", "违法地点", "text", "Md_place", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
					["input", "违法行为", "text", "Md_violaction", []],
					["input", "备注", "text", "Md_remark", []],
				]]
			]);
		}
	},
	SafeCheck: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["select", "所属分校" + color, "select", "Md_brid", []],
					["select", "车牌号" + color, "select", "Md_carid", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "维修日期", "dayinput", "Md_dtdate", []],
					["select_no", "转向", "select", "Md_pro1", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "制动1", "select", "Md_pro2", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "制动2", "select", "Md_pro3", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "照明", "select", "Md_pro4", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "轮胎", "select", "Md_pro5", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "悬挂", "select", "Md_pro6", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "车身", "select", "Md_pro7", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "随车安全设施", "select", "Md_pro8", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "GPS", "select", "Md_pro9", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["input", "处理意见", "text", "Md_suggestion", []],
					["input", "不合格原因", "text", "Md_failcause", []],
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["input", "车牌号" + color, "text", "Md_licnum", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["dayinput", "维修日期", "dayinput", "Md_dtdate", []],
					["select_no", "转向", "select", "Md_pro1", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "制动1", "select", "Md_pro2", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "制动2", "select", "Md_pro3", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "照明", "select", "Md_pro4", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "轮胎", "select", "Md_pro5", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "悬挂", "select", "Md_pro6", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "车身", "select", "Md_pro7", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "随车安全设施", "select", "Md_pro8", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["select_no", "GPS", "select", "Md_pro9", [
						["合格", "true"],
						["不合格", "false"]
					]],
					["input", "处理意见", "text", "Md_suggestion", []],
					["input", "不合格原因", "text", "Md_failcause", []],
				]]
			]);
		}
	},
	MaintainUpkeep: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["select", "所属分校" + color, "select", "Md_brid", []],
					["select", "车牌号" + color, "select", "Md_carid", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["select_no", "维保类型" + color, "select", "Md_mttype", [
						["定期保养", "Regular"],
						["故障维修", "Malfunction"],
						["二级维护", "Secondary"]
					]],
					["number", "费用(元)", "number", "Md_price", []],
					["number", "里程(km)", "number", "Md_mileage", []],
					["dayinput", "维修日期", "dayinput", "Md_mtdate", []],
					["dayinput", "下次维保日", "dayinput", "Md_nextmtdate", []],
					["input", "维修明细", "text", "Md_mtdetail", []],
					["input", "维修地点", "text", "Md_mtaddress", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["input", "车牌号" + color, "text", "Md_licnum", []],
					["input", "司机姓名" + color, "text", "Md_driver", []],
					["select_no", "维保类型" + color, "select", "Md_mttype", [
						["定期保养", "Regular"],
						["故障维修", "Malfunction"],
						["二级维护", "Secondary"]
					]],
					["number", "费用(元)", "number", "Md_price", []],
					["number", "里程(km)", "number", "Md_mileage", []],
					["dayinput", "维修日期", "dayinput", "Md_mtdate", []],
					["dayinput", "下次维保日", "dayinput", "Md_nextmtdate", []],
					["input", "维修明细", "text", "Md_mtdetail", []],
					["input", "维修地点", "text", "Md_mtaddress", []],
					["input", "经度", "text", "Md_lng", []],
					["input", "纬度", "text", "Md_lat", []],
				]]
			]);
		}
	},
	StipulateProject: {
		"add": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["select", "所属分校" + color, "select", "Md_brid", []],
					["select", "车牌号" + color, "select", "Md_carid", []],
					["number", "交强险金额", "number", "Md_stroinsprice", []],
					["number", "商业险金额", "number", "Md_cominsprice", []]
				]],
				["到期日期", "sort", [
					["dayinput", "年审", "dayinput", "Md_yearexp", []],
					["dayinput", "二级维护", "dayinput", "Md_secmtexp", []],
					["dayinput", "技术等级评定", "dayinput", "Md_techexp", []],
					["dayinput", "交强险", "dayinput", "Md_stroinsexp", []],
					["dayinput", "商业险", "dayinput", "Md_cominsexp", []],
					["dayinput", "车船税", "dayinput", "Md_vehvesexp", []]
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["基本信息", "sort", [
					["input", "车牌号" + color, "text", "Md_licnum", []],
					["number", "交强险金额", "number", "Md_stroinsprice", []],
					["number", "商业险金额", "number", "Md_cominsprice", []]
				]],
				["到期日期", "sort", [
					["dayinput", "年审", "dayinput", "Md_yearexp", []],
					["dayinput", "二级维护", "dayinput", "Md_secmtexp", []],
					["dayinput", "技术等级评定", "dayinput", "Md_techexp", []],
					["dayinput", "交强险", "dayinput", "Md_stroinsexp", []],
					["dayinput", "商业险", "dayinput", "Md_cominsexp", []],
					["dayinput", "车船税", "dayinput", "Md_vehvesexp", []]
				]]
			]);
		}
	},
	School: {
		"update": function() {
			return GetModalCon([
				["驾校信息", "sort", [
					["input", "驾校名称" + color, "input", "Md_name", []],
					["input", "培训机构简称" + color, "input", "Md_intro", []],
					["input", "法人代表" + color, "input", "Md_legal", []],
					["input", "驾校地址" + color, "input", "Md_address", []],
					["input", "经度" + color, "input", "Md_lng", []],
					["input", "纬度" + color, "input", "Md_lat", []],
					["input", "联系人" + color, "input", "Md_contact", []],
					["input", "联系电话" + color, "input", "Md_phone", []],
					["input", "联系人移动电话", "input", "Md_mobilephone", []],
					["input", "邮政编码" + color, "input", "Md_postcode", []],
					["dayinput", "开业时间" + color, "dayinput", "Md_founddate", []],
					["selects", "经营范围" + color, "selects", "Md_busiscope", cartypearray],
					["select", "质量信誉等级", "select", "Md_creditgrade", [
						["AAA", "AAA"],
						["AA", "AA"],
						["A", "A"],
						["B", "B"]
					]],
					["select", "分类等级" + color, "select", "Md_level", [
						["一级", "FirstLevel"],
						["二级", "SecondLevel"],
						["三级", "ThirdLevel"]
					]],
					["select", "经营状态" + color, "select", "Md_busistatus", [
						["营运", "Operation"],
						["停业", "Closure"],
						["整改", "Rectification"],
						["停业整顿", "SuspendForRectification"],
						["歇业", "CloseBussiness"],
						["注销", "Cancellation"]
					]],
					["input", "统一社会信用代码", "input", "Md_creditcode", []],
					["input", "经营许可证编号" + color, "input", "Md_busipermit", []],
					["dayinput", "经营许可时间" + color, "dayinput", "Md_busipermittime", []],
					["input", "税务登记证编号", "input", "Md_taxregiscer", []],
					["input", "经营及服务价格监审证编号", "input", "Md_examcer",[]],
					["input", "工商营业执照编号" + color, "input", "Md_busilicense", []],
					["input", "核定每期培训能力", "input", "Md_ability", []],
					["input", "教练员总数", "input", "Md_coachnum", []],
					["input", "理论教练员数", "input", "Md_thcoachnum", []],
					["input", "驾驶操作教练员数", "input", "Md_pracoachnum", []],
					["input", "结业考核员数", "input", "Md_grasupvnum", []],
					["input", "安全管理人员数", "input", "Md_safmngnum", []],
					["input", "教练车总数", "input", "Md_tracarnum", []],
					["input", "教室总面积", "input", "Md_classroom", []],
					["input", "理论教室面积", "input", "Md_thclassroom", []],
					["input", "教练场总面积", "input", "Md_praticefield", []]
				]],
				["经营许可证扫描照片", "img", "", ["bimg", "busipermitimg", [{}], "busipermitimg", "one"]],
				["税务登记证扫描照片", "img", "", ["taximg", "taxregiscerimg", [{}], "taxregiscerimg", "one"]],
				["经营及服务价格监审证扫描照片", "img", "", ["exaimg", "examcerimg", [{}], "examcerimg", "one"]],
				["工商营业执照扫描照片", "img", "", ["busimg", "busilicenseimg", [{}], "busilicenseimg", "one"]],
				["驾校简介", "abstract", "", ["schoolabstract", [{}], "briefintroduct"]]
			]);
		}
	},
	SubSchool: {
		"add": function() {
			return GetModalCon([
				["分校信息", "sort", [
					["select", "省名称" + color, "select", "Sm_0", [], "undefined"],
					["select", "市名称" + color, "select", "Md_1", [], "undefined"],
					["select", "区名称" + color, "select", "Md_2", [], "undefined"],
					["select", "所属区域" + color, "select", "Md_district", [], "brsch.district.id"],
					["input", "分校名称" + color, "input", "Md_name", [], "brsch.name"],
					["input", "简称" + color, "input", "Md_shortname", [], "brsch.shortname"],
					["select", "分校类型" + color, "select", "Md_type", [
						["独立分校", "Independent"],
						["普通分校", "Ordinary"]
					], "brsch.type"],
					["input", "联系人" + color, "input", "Md_manager", [], "brsch.manager"],
					["input", "联系人移动电话" + color, "input", "Md_mobile", [], "brsch.mobile"],
					["input", "地址" + color, "input", "Md_address", [], "brsch.address"],
					["input", "经度" + color, "input", "Md_lng", [], "brsch.lng"],
					["input", "纬度" + color, "input", "Md_lat", [], "brsch.lat"],
					["input", "联系电话" + color, "input", "Md_telephone", [], "brsch.telephone"],
					["dayinput", "开业时间" + color, "dayinput", "Md_founddate", [], "brsch.founddate"],
					["input", "教练场数量", "input", "Md_trainareanum", [], "brsch.trainareanum"],
					["input", "招生点数量", "input", "Md_recruitplacenum", [], "brsch.recruitplacenum"]
					//					["select_no", "画区域权限", "select", "Md_railprv", [
					//						["有", "1"],
					//						["无", "0"]
					//					]],
				]],
				["管理员账号设置", "sort", [
					["input", "用户名" + color, "input", "Md_username", [], "admin.username"],
					["input", "密码" + color, "password", "Md_passwd", [], "admin.passwd"],
					["input", "确认密码" + color, "password", "Md_passwd1", [], "undefined"],
					["input", "邮箱" + color, "input", "Md_email", [], "admin.email"],
					["input", "手机" + color, "input", "Md_mobile", [], "admin.mobile"]
				]],
				["默认照片", "img", "", ["defimg", "defaultimg", [{}], "brsch.defaultimg", "one"]],
				["分校照片", "img", "", ["subimg", "subtimgid", [{}], "brsch.album", "more"]],
				["特色服务", "featureser", "", ["featureser", [{}], "brsch.services"]],
				["分校简介", "abstract", "", ["schoolabstract", [{}], "brsch.briefintroduce"]],
				["收费标准", "freestandal", "", ["freestandal", [{}], "brsch.charges"]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["分校信息", "sort", [
					["input", "分校名称" + color, "input", "Md_name", []],
					["input", "简称" + color, "input", "Md_shortname", []],
					["select", "分校类型" + color, "select", "Md_type", [
						["独立分校", "Independent"],
						["普通分校", "Ordinary"],
						["主分校", "Main"]
					]],
					["input", "地址" + color, "input", "Md_address", []],
					["input", "经度" + color, "input", "Md_lng", []],
					["input", "纬度" + color, "input", "Md_lat", []],
					["input", "联系人" + color, "input", "Md_manager", []],
					["input", "联系电话" + color, "input", "Md_telephone", []],
					["input", "联系人移动电话" + color, "input", "Md_mobile", []],
					["dayinput", "开业时间" + color, "dayinput", "Md_founddate", []],
					["input", "教练场数量", "input", "Md_trainareanum", []],
					["input", "招生点数量", "input", "Md_recruitplacenum", []]
					//					["select_no", "画区域权限", "select", "Md_railprv", [
					//						["有", "1"],
					//						["无", "0"]
					//					]]
				]],
				["默认照片", "img", "", ["defimg", "defaultimg", [{}], "defaultimg", "one"]],
				["分校照片", "img", "", ["subimg", "subtimgid", [{}], "album", "more"]],
				["特色服务", "featureser", "", ["featureser", [{}], "services"]],
				["分校简介", "abstract", "", ["schoolabstract", [{}], "briefintroduce"]],
				["收费标准", "freestandal", "", ["freestandal", [{}], "charges"]]
			]);
		},
		"detailde": function() {
			return GetModalCon([
				["分校信息", "sort", [
					["input", "分校名称", "input", "Md_name", []],
					["input", "简称", "input", "Md_shortname", []],
					["input", "分校类型", "input", "Md_type", []],
					["input", "地址", "input", "Md_address", []],
					["input", "经度", "input", "Md_lng", []],
					["input", "纬度", "input", "Md_lat", []],
					["input", "联系人", "input", "Md_manager", []],
					["input", "联系电话", "input", "Md_telephone", []],
					["input", "联系人移动电话", "input", "Md_mobile", []],
					["dayinput", "开业时间", "dayinput", "Md_founddate", []],
					["input", "教练场数量", "input", "Md_trainareanum", []],
					["input", "招生点数量", "input", "Md_recruitplacenum", []]
				]],
				["默认照片", "img", "", ["defimgDetail", "defaultimgDetail", [{}]]],
				["分校照片", "img", "", ["dsubimg", "dsubtimgid", [{}]]],
				["特色服务", "featureser", "", ["featureser", [{}]]],
				["分校简介", "abstract", "", ["schoolabstract", [{}]]],
				["收费标准", "freestandal", "", ["freestandal", [{}]]]

			]);
		}
	},
	TeachSiteSel: {
		"add": function() {
			return GetModalCon([
				["教学区域信息", "sort", [
					["input", "教学区域名" + color, "input", "Md_name", []],
					["Timeinput", "有效开始时间" + color, "input", "Md_avltimestart", []],
					["Timeinput", "有效结束时间" + color, "input", "Md_avltimeend", []],
					["input", "地址" + color, "input", "Md_address", []],
					["input", "面积" + color, "input", "Md_area", []],
					["selects", "培训车型" + color, "selects", "Md_vehicletype", cartypearray],
					["input", "可容纳车辆数", "input", "Md_totalvehnum", []],
					["input", "已投放车辆数", "input", "Md_curvehnum", []],
					["select_no", "区域类型" + color, "select", "Md_type", [
						["多边形", "Polygon"]
					]],
					["input", "坐标序列", "input", "Md_polygon", []]
				]]
			])
		},
		"update": function() {
			return GetModalCon([
				["教学区域信息", "sort", [
					["input", "教学区域名" + color, "input", "Md_name", []],
					["Timeinput", "有效开始时间" + color, "input", "Md_avltimestart", []],
					["Timeinput", "有效结束时间" + color, "input", "Md_avltimeend", []],
					["input", "地址" + color, "input", "Md_address", []],
					["input", "面积" + color, "input", "Md_area", []],
					["selects", "培训车型" + color, "selects", "Md_vehicletype", cartypearray],
					["input", "可容纳车辆数", "input", "Md_totalvehnum", []],
					["input", "已投放车辆数", "input", "Md_curvehnum", []],
					["select_no", "区域类型" + color, "select", "Md_type", [
						["多边形", "Polygon"]
					]],
					["input", "坐标序列", "input", "Md_polygon", []]
				]]
			])
		}
	},
	Dr: {
		"add": function() {
			return GetModalCon([
				["教练员教学信息", "sort", [
					["select", "所属分校" + color, "select", "Sm_id", [], "brsch.id"],
					["select", "执教类别", "select", "Md_teachtype", [
						["理论教练员", "THEORY"],
						["实操教练员", "PRACTICE"],
						["理论、实操教练员", "THEORYADNPRACTICE"]
					], "teachtype"],
					["input", "驾驶证号" + color, "input", "Md_drilicence", [], "drilicence"],
					["dayinput", "驾驶证有效期", "dayinput", "Md_drilicvaliddate", [], "drilicvaliddate"],
					["dayinput", "驾驶证初领日期" + color, "dayinput", "Md_fstdrilicdate", [], "fstdrilicdate"],
					["input", "教练证号", "input", "Md_qualnum", [], "qualnum"],
					["dayinput", "教练证有效期至", "dayinput", "Md_expirydate", [], "expirydate"],
					["select", "准驾车型" + color, "select", "Md_dripermitted", cartypearray, "dripermitted"],
					["select", "准教车型" + color, "select", "Md_teachpermitted", [], "teachpermitted"],
					["select", "等级", "select", "Md_level", levelarray, "level"],
					["input", "教龄", "input", "Md_teachage", [], "teachage"],
					["input", "职业资格证号", "input", "Md_occupationno", [], "occupationno"],
					["select", "职业资格等级", "select", "Md_occupationlevel", [
						["一级", "ONE"],
						["二级", "TWO"],
						["三级", "THREE"],
						["四级", "FOUR"]
					], "occupationlevel"],
					["select_no", "供职状态", "select", "Md_employstatus", [
						["在职", "INJOB"],
						["离职", "OUTJOB"]
					], "employstatus"],
					["select", "教练车", "select", "Md_car", [], "car.id"],
					["select", "教练场", "select", "Md_tra", [], "tra.id"],
					["dayinput", "入职时间" + color, "dayinput", "Md_hiredate", [], "hiredate"],
					["dayinput", "离职时间", "dayinput", "Md_leavedate", [], "leavedate"]
				]],
				["教练员教学信息", "sort", [
					["input", "姓名" + color, "input", "Md_name", [], "personinfo.name"],
					["select", "性别" + color, "select", "Md_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "personinfo.sex"],
					["select_no", "证件类型" + color, "select", "Md_cardtype", [
						["身份证", "IDCARD"],
						["军官证", "OFFICERCERTIFICATE"],
						["护照", "PASSPORT"],
						["其他", "OTHER"]
					], "personinfo.cardtype"],
					["input", "证件号" + color, "input", "Md_cardnum", [], "personinfo.cardnum"],
					["dayinput", "身份证有效期", "dayinput", "Md_cardvaliddate", [], "personinfo.cardvaliddate"],
					["input", "手机号码" + color, "input", "Md_mobile", [], "personinfo.mobile"],
					["input", "微信号", "input", "Md_weixin", [], "personinfo.weixin"],
					["input", "联系地址" + color, "input", "Md_address", [], "personinfo.address"],
					["dayinput", "出生日期", "dayinput", "Md_birthday", [], "personinfo.birthday"],
					["input", "照片", "file", "Md_photo", [], "personinfo.file.id"]
				]],
				["网站默认照片", "img", "", ["defaultimgid", "defmg", [{}], "defaultimg", "one"]],
				["驾驶证扫描件", "img", "", ["licensefid", "limg", [{}], "licensefile", "one"]],
				["个人生活照", "img", "", ["cpersonalimg", "cimg", [{}], "album", "more"]],
				["个人宣传语", "fieldType", "", ["padvertise", [{}], "advertisement"]],
				["特色服务", "featureser", "", ["featureser", [{}], "services"]],
				["教练简介", "coachabstract", "", ["coachabstract", [{}], "introduction"]],
				["收费标准", "freestandal", "", ["freestandal", [{}], "charges"]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["教练员教学信息", "sort", [
					["select", "所属分校" + color, "select", "Sm_id", [], "brsch.id"],
					["select", "执教类别", "select", "Md_teachtype", [
						["理论教练员", "THEORY"],
						["实操教练员", "PRACTICE"],
						["理论、实操教练员", "THEORYADNPRACTICE"]
					], "teachtype"],
					["input", "IC卡物理卡号", "input", "Md_physicalnum", [], "physicalnum"],
					["input", "驾驶证号" + color, "input", "Md_drilicence", [], "drilicence"],
					["dayinput", "驾驶证有效期", "dayinput", "Md_drilicvaliddate", [], "drilicvaliddate"],
					["dayinput", "驾驶证初领日期" + color, "dayinput", "Md_fstdrilicdate", [], "fstdrilicdate"],
					["input", "教练证号", "input", "Md_qualnum", [], "qualnum"],
					["dayinput", "教练证有效期至", "dayinput", "Md_expirydate", [], "expirydate"],
					["select", "准驾车型" + color, "select", "Md_dripermitted", cartypearray, "dripermitted"],
					["select", "准教车型" + color, "select", "Md_teachpermitted", [], "teachpermitted"],
					["select", "等级", "select", "Md_level", levelarray, "level"],
					["input", "教龄", "input", "Md_teachage", [], "teachage"],
					["input", "职业资格证号", "input", "Md_occupationno", [], "occupationno"],
					["select", "职业资格等级", "select", "Md_occupationlevel", [
						["一级", "ONE"],
						["二级", "TWO"],
						["三级", "THREE"],
						["四级", "FOUR"]
					], "occupationlevel"],
					["select", "供职状态", "select", "Md_employstatus", [
						["在职", "INJOB"],
						["离职", "OUTJOB"]
					], "employstatus"],
					["select", "教练车", "select", "Md_car", [], "car.id"],
					["select", "教练场", "select", "Md_tra", [], "tra.id"],
					["dayinput", "入职时间" + color, "dayinput", "Md_hiredate", [], "hiredate"],
					["dayinput", "离职时间", "dayinput", "Md_leavedate", [], "leavedate"]
				]],
				["教练员教学信息", "sort", [
					["input", "姓名" + color, "input", "Md_name", [], "personinfo.name"],
					["select", "性别" + color, "select", "Md_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "personinfo.sex"],
					["select_no", "证件类型" + color, "select", "Md_cardtype", [
						["身份证", "IDCARD"],
						["军官证", "OFFICERCERTIFICATE"],
						["护照", "PASSPORT"],
						["其他", "OTHER"]
					], "personinfo.cardtype"],
					["input", "证件号" + color, "input", "Md_cardnum", [], "personinfo.cardnum"],
					["dayinput", "身份证有效期", "dayinput", "Md_cardvaliddate", [], "personinfo.cardvaliddate"],
					["input", "手机号码" + color, "input", "Md_mobile", [], "personinfo.mobile"],
					["input", "微信号", "input", "Md_weixin", [], "personinfo.weixin"],
					["input", "联系地址" + color, "input", "Md_address", [], "personinfo.address"],
					["dayinput", "出生日期", "dayinput", "Md_birthday", [], "personinfo.birthday"],
					["input", "照片", "file", "Md_photo", [], "personinfo.file.id"]
				]],
				["网站默认照片", "img", "", ["defaultimgid", "defmg", [{}], "defaultimg", "one"]],
				["驾驶证扫描件", "img", "", ["licensefid", "limg", [{}], "licensefile", "one"]],
				["个人生活照", "img", "", ["cpersonalimg", "cimg", [{}], "album", "more"]],
				["个人宣传语", "fieldType", "", ["padvertise", [{}], "advertisement"]],
				["特色服务", "featureser", "", ["featureser", [{}], "services"]],
				["教练简介", "coachabstract", "", ["coachabstract", [{}], "introduction"]],
				["收费标准", "freestandal", "", ["freestandal", [{}], "charges"]]
			]);
		},
		"detailde": function() {
			return GetModalCon([
				["教练员教学信息", "sort", [
					["input", "所属分校", "input", "Sm_id", []],
					["input", "执教类别", "input", "Md_teachtype", []],
					["input", "驾驶证号", "input", "Md_drilicence", []],
					["input", "IC卡物理卡号", "input", "Md_physicalnum", []],
					["dayinput", "驾驶证有效期", "dayinput", "Md_drilicvaliddate", []],
					["dayinput", "驾驶证初领日期", "dayinput", "Md_fstdrilicdate", []],
					["input", "教练证号", "input", "Md_qualnum", []],
					["dayinput", "教练证有效期至", "dayinput", "Md_expirydate", []],
					["input", "准驾车型", "input", "Md_dripermitted", []],
					["input", "准教车型", "input", "Md_teachpermitted", []],
					["input", "等级", "input", "Md_level", []],
					["input", "教龄", "input", "Md_teachage", []],
					["input", "职业资格证号", "input", "Md_occupationno", []],
					["input", "职业资格等级", "input", "Md_occupationlevel", []],
					["input", "供职状态", "input", "Md_employstatus", []],
					["input", "教练车", "input", "Md_car", []],
					["input", "教练场", "input", "Md_tra", []],
					["dayinput", "入职时间", "dayinput", "Md_hiredate", []],
					["dayinput", "离职时间", "dayinput", "Md_leavedate", []]
				]],
				["教练员教学信息", "sort", [
					["input", "姓名", "input", "Md_name", []],
					["input", "性别", "input", "Md_sex", []],
					["input", "证件类型", "input", "Md_cardtype", []],
					["input", "证件号", "input", "Md_cardnum", []],
					["dayinput", "身份证有效期", "dayinput", "Md_cardvaliddate", []],
					["input", "手机号码", "input", "Md_mobile", []],
					["input", "微信号", "input", "Md_weixin", []],
					["input", "联系地址", "input", "Md_address", []],
					["dayinput", "出生日期", "dayinput", "Md_birthday", []],
					["input", "照片", "file", "Md_photo", []]
				]],
				["网站默认照片", "img", "", ["defaultimgid", "defmg", [{}]]],
				["驾驶证扫描件", "img", "", ["licensefid", "limg", [{}]]],
				["个人生活照", "img", "", ["cpersonalimg", "cimg", [{}]]],
				["个人宣传语", "fieldType", "", ["padvertise", [{}]]],
				["特色服务", "featureser", "", ["featureser", [{}]]],
				["教练简介", "coachabstract", "", ["coachabstract", [{}]]],
				["收费标准", "freestandal", "", ["freestandal", [{}]]]
			]);
		}
	},
	CoachesManagement: {
		"add": function() {
			return GetModalCon([
				["教练车信息", "sort", [
					["select", "所属分校" + color, "select", "Sm_id", [], "brsch.id"],
					["input", "车架号", "input", "Md_franum", [], "franum"],
					["input", "发动机号", "input", "Md_engnum", [], "engnum"],
					["input", "车辆号牌" + color, "input", "Md_licnum", [], "licnum"],
					["input", "生产厂牌" + color, "input", "Md_brand", [], "brand"],
					["input", "生产厂家" + color, "input", "Md_manufacture", [], "manufacture"],
					["input", "型号" + color, "input", "Md_model", [], "model"],
					["select", "车牌颜色" + color, "select", "Md_platecolor", [
						["蓝色", "blue"],
						["黄色", "yellow"],
						["黑色", "black"],
						["白色", "white"],
						["绿色", "green"]
					], "platecolor"],
					["select", "车型代码" + color, "select", "Md_perdritype", cartypearray, "perdritype"],
					["input", "业户名称", "input", "Md_businessname", [], "businessname"],
					["input", "道路运输证号", "input", "Md_transportno", [], "transportno"],
					["input", "机动车登记证号", "input", "Md_certificateno", [], "certificateno"],
					["dayinput", "购买日期" + color, "dayinput", "Md_buydate", [], "buydate"],
					["dayinput", "运输证有效期开始", "dayinput", "Md_transportfrom", [], "transportfrom"],
					["dayinput", "运输证有效期结束", "dayinput", "Md_transportto", [], "transportto"],
					["dayinput", "行驶证初登日期", "dayinput", "Md_fstdrilicdate", [], "fstdrilicdate"],
					["dayinput", "强制报废日期", "dayinput", "Md_scrapedate", [], "scrapedate"],
					["dayinput", "保险日期", "dayinput", "Md_insurancedate", [], "insurancedate"],
					["dayinput", "车辆有效期", "dayinput", "Md_validdate", [], "validdate"],
					["input", "核定乘员数", "input", "Md_crewnum", [], "crewnum"],
					["select_no","模拟车辆" + color, "select", "Md_issimulate", [
						["否", "0"],
						["是", "1"]
					], "issimulate"]
				]],
				["教练车正面照", "img", "", ["carimgc", "carimg", [{}], "file", "one"]],
				["教练车照片", "img", "", ["cmpersonalimg", "cmimg", [{}], "album", "more"]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["教练车信息", "sort", [
					["select", "所属分校" + color, "select", "Sm_id", [], "brsch.id"],
					["input", "车架号", "input", "Md_franum", [], "franum"],
					["input", "发动机号", "input", "Md_engnum", [], "engnum"],
					["input", "车辆号牌" + color, "input", "Md_licnum", [], "licnum"],
					["input", "生产厂牌" + color, "input", "Md_brand", [], "brand"],
					["input", "生产厂家" + color, "input", "Md_manufacture", [], "manufacture"],
					["input", "型号" + color, "input", "Md_model", [], "model"],
					["select", "车牌颜色" + color, "select", "Md_platecolor", [
						["蓝色", "blue"],
						["黄色", "yellow"],
						["黑色", "black"],
						["白色", "white"],
						["绿色", "green"]
					], "platecolor"],
					["select", "车型代码" + color, "select", "Md_perdritype", cartypearray, "perdritype"],
					["input", "业户名称", "input", "Md_businessname", [], "businessname"],
					["input", "道路运输证号", "input", "Md_transportno", [], "transportno"],
					["input", "机动车登记证号", "input", "Md_certificateno", [], "certificateno"],
					["dayinput", "购买日期" + color, "dayinput", "Md_buydate", [], "buydate"],
					["dayinput", "运输证有效期开始", "dayinput", "Md_transportfrom", [], "transportfrom"],
					["dayinput", "运输证有效期结束", "dayinput", "Md_transportto", [], "transportto"],
					["dayinput", "行驶证初登日期", "dayinput", "Md_fstdrilicdate", [], "fstdrilicdate"],
					["dayinput", "强制报废日期", "dayinput", "Md_scrapedate", [], "scrapedate"],
					["dayinput", "保险日期", "dayinput", "Md_insurancedate", [], "insurancedate"],
					["dayinput", "车辆有效期", "dayinput", "Md_validdate", [], "validdate"],
					["input", "核定乘员数", "input", "Md_crewnum", [], "crewnum"],
					["select_no","模拟车辆" + color, "select", "Md_issimulate", [
						["否", "0"],
						["是", "1"]
					], "issimulate"]
				]],
				["教练车正面照", "img", "", ["carimgc", "carimg", [{}], "file", "one"]],
				["教练车照片", "img", "", ["cmpersonalimg", "cmimg", [{}], "album", "more"]]
			]);
		},
		"detailde": function() {
			return GetModalCon([
				["教练车信息", "sort", [
					["input", "所属分校", "input", "Md_id", []],
					["input", "车架号", "input", "Md_franum", []],
					["input", "发动机号", "input", "Md_engnum", []],
					["input", "车辆号牌", "input", "Md_licnum", []],
					["input", "生产厂牌", "input", "Md_brand", []],
					["input", "生产厂家", "input", "Md_manufacture", []],
					["input", "型号", "input", "Md_model", []],
					["select", "车牌颜色", "select", "Md_platecolor", [
						["蓝色", "blue"],
						["黄色", "yellow"],
						["黑色", "black"],
						["白色", "white"],
						["绿色", "green"]
					]],
					["input", "车型代码", "input", "Md_perdritype", cartypearray],
					["input", "业户名称", "input", "Md_businessname", []],
					["input", "道路运输证号", "input", "Md_transportno", []],
					["input", "机动车登记证号", "input", "Md_certificateno", []],
					["dayinput", "购买日期", "dayinput", "Md_buydate", []],
					["dayinput", "运输证有效期开始", "dayinput", "Md_transportfrom", []],
					["dayinput", "运输证有效期结束", "dayinput", "Md_transportto", []],
					["dayinput", "行驶证初登日期", "dayinput", "Md_fstdrilicdate", [], "fstdrilicdate"],
					["dayinput", "强制报废日期", "dayinput", "Md_scrapedate", [], "scrapedate"],
					["dayinput", "保险日期", "dayinput", "Md_insurancedate", [], "insurancedate"],
					["dayinput", "车辆有效期", "dayinput", "Md_validdate", [], "validdate"],
					["input", "核定乘员数", "input", "Md_crewnum", []],
					["select_no","模拟车辆" + color, "select", "Md_issimulate", [
						["否", "0"],
						["是", "1"]
					], "issimulate"]
				]],
				["教练车正面照", "img", "", ["carimgcdetail", "carimgdetail", [{}]]],
				["教练车照片", "img", "", ["cmpersonalimgDetail", "cmimgDetail", [{}]]]
			]);
		}
	},
	StudentManagement: {
		"add": function() {
			return GetModalCon([
				["学员备案信息", "sort", [
					["input", "学员姓名" + color, "input", "Sm_name", [], "personinfo.name"],
					["select_no", "性别" + color, "select", "Sm_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "personinfo.sex"],
					["select_no", "国籍" + color, "select", "Sm_nationality", [
						["中国", "中国"],
						["中国香港", "中国香港"],
						["中国澳门", "中国澳门"],
						["中国台湾", "中国台湾"],
						["其他","其他"]
					], "personinfo.nationality"],
					["select_no", "证件类型" + color, "select", "Sm_cardtype", [
						["身份证", "IDCARD"],
						["港澳身份证", "HKMIDCARD"],
						["护照","PASSPORT"]
					], "personinfo.cardtype"],
					["input", "证件号" + color, "input", "Sm_cardnum", [], "personinfo.cardnum"],
					["input", "手机号码" + color, "input", "Sm_mobile", [], "personinfo.mobile"],
					["input", "联系地址" + color, "input", "Sm_address", [], "personinfo.address"],
					["select", "培训车型" + color, "select", "Sm_traintype", cartypearray, "traintype"],
					["dayinputhms", "报名时间" + color, "dayinputhms", "Sm_signuptime", [], "signuptime"],
					["select_no", "业务类型" + color, "select", "Sm_busitype", [
						["初领", "FIRSTLIC"],
						["增领", "INCREASELIC"]
					], "busitype"],
					["dayinput", "身份证有效期", "dayinput", "Sm_cardvaliddate", [], "personinfo.cardvaliddate"],
					["input", "微信号", "input", "Sm_weixin", [], "personinfo.weixin"],
					["input", "备用号码", "input", "Sm_sparemobile", [], "personinfo.sparemobile"],
					["dayinput", "出生日期", "dayinput", "Sm_birthday", [], "personinfo.birthday"],
					["input", "暂住证号", "input", "Sm_tempcardno", [], "personinfo.tempcardno"],
					["input", "户籍所在地", "input", "Sm_censusregister", [], "personinfo.censusregister"],
					["select", "原准驾车型", "select", "Sm_perdritype", cartypearray, "perdritype"],
					["input", "驾驶证号", "input", "Sm_drilicnum", [], "drilicnum"],
					["dayinput", "驾驶证初领日期", "dayinput", "Sm_fstdrilicdate", [], "fstdrilicdate"],
					["input", "照片上传", "file", "Sm_photo", [], "personinfo.file.id"]
				]],
				["招生收费信息", "sort", [
					["select", "招生点" + _modalTool.setColor(), "select", "Sm_brcrecruit", [], "brcrecruit.id"],
					["select", "学员类型" + _modalTool.setColor(), "select", "Sm_stutype", [
						["VIP类", "VIP"],
						["商务类", "BUSINESS"],
						["普通类", "COMMON"]
					], "stutype"],
					["select", "报名教练", "select", "Sm_id", [], "coach.id"],
					// ["select_no", "缴费标记", "select", "Sm_ispayed", [
					// 	["未缴费", "FALSE"],
					// 	["已缴费", "TRUE"],
					// 	["分期付款", "BYTIME"],
					// 	["计时收费", "BYHOUR"]
					// ], "ispayed"],
					["select", "招生渠道" + _modalTool.setColor(), "select", "Sm_rc", [], "rc.id"]
				]],
				["班型参数设置", "sort", [
					["select", "班型", "select", "Sm_brccharge", []],
					["input", "金额", "input", "Sm_money", []],
					["input", "实收金额", "input", "Sm_realprice", []],
					["select_no", "培训模式", "select", "Sm_tratype", [
						["定时", "TIME"],
						["预约", "APPOINT"],
						["其他", "OTHER"]
					]],
					["select_no", "收费模式", "select", "Sm_chargetype", [
						["一次性", "ONETIME"],
						["计时", "TIMING"],
						["分时段", "GRADING"],
						["其他", "OHTER"]
					]],
					["select_no", "付费模式", "select", "Sm_paytype", [
						["先学后付", "STUDYFIRST"],
						["先付后学", "PAYFIRST"],
						["其他", "OTHER"]
					]]
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["学员备案信息", "sort", [
					["input", "学员姓名" + color, "input", "Sm_name", [], "personinfo.name"],
					["select_no", "性别" + color, "select", "Sm_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "personinfo.sex"],
					["select_no", "国籍" + color, "select", "Sm_nationality", [
						["中国", "中国"],
						["中国香港", "中国香港"],
						["中国澳门", "中国澳门"],
						["中国台湾", "中国台湾"],
						["其他","其他"]
					], "personinfo.nationality"],
					["select_no", "证件类型" + color, "select", "Sm_cardtype", [
						["身份证", "IDCARD"],
						["港澳身份证", "HKMIDCARD"],
						["护照","PASSPORT"]
					], "personinfo.cardtype"],
					["input", "证件号" + color, "input", "Sm_cardnum", [], "personinfo.cardnum"],
					["input", "手机号码" + color, "input", "Sm_mobile", [], "personinfo.mobile"],
					["input", "联系地址" + color, "input", "Sm_address", [], "personinfo.address"],
					["select", "培训车型" + color, "select", "Sm_traintype", cartypearray, "traintype"],
					["dayinputhms", "报名时间" + color, "dayinputhms", "Sm_signuptime", [], "signuptime"],
					["select_no", "业务类型" + color, "select", "Sm_busitype", [
						["初领", "FIRSTLIC"],
						["增领", "INCREASELIC"]
					], "busitype"],
					["dayinput", "身份证有效期", "dayinput", "Sm_cardvaliddate", [], "personinfo.cardvaliddate"],
					["input", "微信号", "input", "Sm_weixin", [], "personinfo.weixin"],
					["input", "备用号码", "input", "Sm_sparemobile", [], "personinfo.sparemobile"],
					["dayinput", "出生日期", "dayinput", "Sm_birthday", [], "personinfo.birthday"],
					["input", "暂住证号", "input", "Sm_tempcardno", [], "personinfo.tempcardno"],
					["input", "户籍所在地", "input", "Sm_censusregister", [], "personinfo.censusregister"],
					["select", "原准驾车型", "select", "Sm_perdritype", cartypearray, "perdritype"],
					["input", "驾驶证号", "input", "Sm_drilicnum", [], "drilicnum"],
					["dayinput", "驾驶证初领日期", "dayinput", "Sm_fstdrilicdate", [], "fstdrilicdate"],
					["input", "照片上传", "file", "Sm_photo", [], "personinfo.file.id"]
				]],
				["招生收费信息", "sort", [
					["input", "IC卡物理卡号", "input", "Sm_physicalnum", [], "physicalnum"],
					//["input", "电子卡号", "input", "Sm_ecnumber", [], "Sm_ecnumber"],
					["select", "招生点" + _modalTool.setColor(), "select", "Sm_brcrecruit", [], "brcrecruit.id"],
					["select", "学员类型" + _modalTool.setColor(), "select", "Sm_stutype", [
						["VIP类", "VIP"],
						["商务类", "BUSINESS"],
						["普通类", "COMMON"]
					], "stutype"],
					["select", "报名教练", "select", "Sm_id", [], "coach.id"],
					// ["select_no", "缴费标记", "select", "Sm_ispayed", [
					// 	["未缴费", "FALSE"],
					// 	["已缴费", "TRUE"],
					// 	["分期付款", "BYTIME"],
					// 	["计时收费", "BYHOUR"]
					// ], "ispayed"],
					["select", "招生渠道" + _modalTool.setColor(), "select", "Sm_rc", [], "rc.id"]
				]],
				["班型参数设置", "sort", [
					["select", "班型", "select", "Sm_brccharge", []],
					["input", "金额", "input", "Sm_money", []],
					["input", "实收金额", "input", "Sm_realprice", []],
					["select_no", "培训模式", "select", "Sm_tratype", [
						["定时", "TIME"],
						["预约", "APPOINT"],
						["其他", "OTHER"]
					]],
					["select_no", "收费模式", "select", "Sm_chargetype", [
						["一次性", "ONETIME"],
						["计时", "TIMING"],
						["分时段", "GRADING"],
						["其他", "OHTER"]
					]],
					["select_no", "付费模式", "select", "Sm_paytype", [
						["先学后付", "STUDYFIRST"],
						["先付后学", "PAYFIRST"],
						["其他", "OTHER"]
					]]
				]]
			]);
		},
		"graduation": function() {
			return GetModalCon([
				["毕业信息", "sort", [
					["input", "结业证书编号" + color, "input", "Sm_gracertnum", []],
					["input", "结业证书发放日期" + color, "input", "Sm_grantdate", []]
				]]
			]);
		}
	},
	role: {
		"add": function() {
			return GetModalCon([
				["角色信息", "sort", [
					["input", "角色名称" + color, "input", "Sm_name", [], "name"]
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["角色信息", "sort", [
					["input", "角色名称" + color, "input", "Sm_name", [], "name"]
				]]
			]);
		}
	},
	user: {
		"add": function() {
			return GetModalCon([
				["账号信息", "sort", [
					["select", "角色名称" + color, "select", "Sm_roleid", [], "roleid"],
					["input", "用户名" + color, "input", "Sm_username", [], "username"],
					["input", "邮箱" + color, "input", "Sm_email", [], "email"],
					["input", "手机" + color, "input", "Sm_mobile", [], "mobile"],
					["input", "密码" + color, "password", "Sm_passwd", [], "passwd"],
					["input", "确认密码", "password", "Sm_passwd1", []]
				]]
			]);
		},
		"update": function() {
			return ModalconObj = GetModalCon([
				["账号信息", "sort", [
					["select", "角色名称" + color, "select", "Sm_roleid", [], "role.id"],
					["input", "用户名" + color, "input", "Sm_username", [], "username"],
					["input", "邮箱" + color, "input", "Sm_email", [], "email"],
					["input", "手机" + color, "input", "Sm_mobile", [], "mobile"]
				]]
			]);
		},
		"updatepassword": function() {
			return GetModalCon([
				["基础信息", "sort", [
					["input", "用户名", "input", "Sm_name", []],
					["input", "旧密码" + color, "password", "Sm_oldpasswd", [], "oldpasswd"],
					["input", "新密码" + color, "password", "Sm_newpasswd", [], "newpasswd"]
				]]
			]);
		}
	},
	Assessment: {
		"add": function() {
			return GetModalCon([
				["个人信息", "sort", [
					["input", "姓名" + color, "input", "Sm_name", [], "acc.personinfo.name"],
					["select", "性别" + color, "select", "Sm_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "acc.personinfo.sex"],
					["select", "证件类型" + color, "select", "Sm_cardtype", [
						["身份证", "IDCARD"],
						["军官证", "OFFICERCERTIFICATE"],
						["护照", "PASSPORT"],
						["户口本", "OTHER"]
					], "acc.personinfo.cardtype"],
					["input", "证件号" + color, "input", "Sm_cardnum", [], "acc.personinfo.cardnum"],
					["dayinput", "出生日期", "dayinput", "Sm_birthday", [], "acc.personinfo.birthday"],
					["input", "手机号码" + color, "input", "Sm_mobile", [], "acc.personinfo.mobile"],
					["input", "联系地址" + color, "input", "Sm_address", [], "acc.personinfo.address"],
					["input", "照片", "file", "Md_photo", [], "acc.personinfo.file.id"]
				]],
				["从业信息", "sort", [
					["select", "车型" + color, "select", "Sm_perdritype", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "acc.perdritype"],
					["input", "教练证号", "input", "Sm_qualnum", [], "acc.qualnum"],
					["dayinput", "教练证有效期至", "dayinput", "Sm_expirydate", [], "acc.expirydate"],
					["input", "驾驶证号" + color, "input", "Sm_drilicence", [], "acc.drilicence"],
					["dayinput", "驾驶证初领日期" + color, "dayinput", "Sm_fstdrilicdate", [], "acc.fstdrilicdate"],
					["input", "职业资格证号", "input", "Sm_occupationno", [], "acc.occupationno"],
					["select", "职业资格等级", "select", "Sm_occupationlevel", [
						["一级", "ONE"],
						["二级", "TWO"],
						["三级", "THREE"],
						["四级", "FOUR"]
					], "acc.occupationlevel"],
					["select", "准驾车型" + color, "select", "Sm_dripermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "acc.dripermitted"],
					["select", "准教车型" + color, "select", "Sm_teachpermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "acc.teachpermitted"],
					["select", "考核阶段" + color, "select", "Sm_assessStage", [
						["阶段一", "STAGEONE"],
						["阶段二", "STAGETWO"],
						["阶段三", "STAGETHREE"],
						["阶段四", "STAGEFORE"],
						["全阶段", "ALL"]
					], "acc.assessStage"],
					["select", "供职状态" + color, "select", "Sm_employstatus", [
						["在职", "INJOB"],
						["离职", "OUTJOB"]
					], "acc.employstatus"],
					["dayinput", "入职时间" + color, "dayinput", "Sm_hiredate", [], "acc.hiredate"],
					["dayinput", "离职时间", "dayinput", "Sm_leavedate", [], "acc.leavedate"]
				]],
				["账号设置", "sort", [
					["input", "用户名" + color, "input", "Md_username", [], "user.username"],
					["input", "密码" + color, "password", "Md_passwd", [], "user.passwd"],
					["input", "确认密码" + color, "password", "Md_passwd1", []],
					["input", "邮箱" + color, "input", "Md_email", [], "user.email"],
					["input", "手机" + color, "input", "Md_mobile", [], "user.mobile"]
				]],
				["印章上传", "img", "", ["stampimg", "stampimginput", [{}], "acc.imgFile", "one"]],
				["职业资格证扫描件", "img", "", ["occupnofileid", "occupnofileidinput", [{}], "acc.occupnofile", "one"]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["个人信息", "sort", [
					["input", "姓名" + color, "input", "Sm_name", [], "personinfo.name"],
					["select", "性别" + color, "select", "Sm_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "personinfo.sex"],
					["select", "证件类型" + color, "select", "Sm_cardtype", [
						["身份证", "IDCARD"],
						["军官证", "OFFICERCERTIFICATE"],
						["护照", "PASSPORT"],
						["户口本", "OTHER"]
					], "personinfo.cardtype"],
					["inputr", "证件号" + color, "input", "Sm_cardnum", [], "personinfo.cardnum"],
					["dayinput", "出生日期", "dayinput", "Sm_birthday", [], "personinfo.birthday"],
					["input", "手机号码" + color, "input", "Sm_mobile", [], "personinfo.mobile"],
					["input", "联系地址" + color, "input", "Sm_address", [], "personinfo.address"],
					["input", "照片", "file", "Md_photo", [], "personinfo.file.id"]
				]],
				["从业信息", "sort", [
					["select", "车型" + color, "select", "Sm_perdritype", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "perdritype"],
					["input", "教练证号", "input", "Sm_qualnum", [], "qualnum"],
					["dayinput", "教练证有效期至", "dayinput", "Sm_expirydate", [], "expirydate"],
					["input", "驾驶证号" + color, "input", "Sm_drilicence", [], "drilicence"],
					["dayinput", "驾驶证初领日期" + color, "dayinput", "Sm_fstdrilicdate", [], "fstdrilicdate"],
					["input", "职业资格证号", "input", "Sm_occupationno", [], "occupationno"],
					["select", "职业资格等级", "select", "Sm_occupationlevel", [
						["一级", "ONE"],
						["二级", "TWO"],
						["三级", "THREE"],
						["四级", "FOUR"]
					], "occupationlevel"],
					["select", "准驾车型" + color, "select", "Sm_dripermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "dripermitted"],
					["select", "准教车型" + color, "select", "Sm_teachpermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "teachpermitted"],
					["select", "考核阶段" + color, "select", "Sm_assessStage", [
						["阶段一", "STAGEONE"],
						["阶段二", "STAGETWO"],
						["阶段三", "STAGETHREE"],
						["阶段四", "STAGEFORE"],
						["全阶段", "ALL"]
					], "assessStage"],
					["select", "供职状态" + color, "select", "Sm_employstatus", [
						["在职", "INJOB"],
						["离职", "OUTJOB"]
					], "employstatus"],
					["dayinput", "入职时间" + color, "dayinput", "Sm_hiredate", [], "hiredate"],
					["dayinput", "离职时间", "dayinput", "Sm_leavedate", [], "leavedate"]
				]],
				["印章上传", "img", "", ["stampimg", "stampimginput", [{}], "imgFile", "one"]],
				["职业资格证扫描件", "img", "", ["occupnofileid", "occupnofileidinput", [{}], "occupnofile", "one"]]
			]);
		}
	},
	Safement: {
		"add": function() {
			return GetModalCon([
				["个人信息", "sort", [
					["input", "姓名" + color, "input", "Sm_name", [], "personinfo.name"],
					["select", "性别" + color, "select", "Sm_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "personinfo.sex"],
					["select", "证件类型" + color, "select", "Sm_cardtype", [
						["身份证", "IDCARD"],
						["军官证", "OFFICERCERTIFICATE"],
						["护照", "PASSPORT"],
						["户口本", "OTHER"]
					], "personinfo.cardtype"],
					["input", "证件号" + color, "input", "Sm_cardnum", [], "personinfo.cardnum"],
					["input", "手机号码" + color, "input", "Sm_mobile", [], "personinfo.mobile"],
					["input", "联系地址" + color, "input", "Sm_address", [], "personinfo.address"],
					["dayinput", "出生日期", "dayinput", "Sm_birthday", [], "personinfo.birthday"],
					["input", "照片", "file", "Md_photo", [], "personinfo.file.id"]
				]],
				["从业信息", "sort", [
					["input", "驾驶证号" + color, "input", "Sm_drilicence", [], "drilicence"],
					["dayinput", "驾驶证初领日期", "dayinput", "Sm_fstdrilicdate", [], "fstdrilicdate"],
					["select", "准驾车型" + color, "select", "Sm_dripermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "dripermitted"],
					["select", "准教车型" + color, "select", "Sm_teachpermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "teachpermitted"],
					["select", "供职状态" + color, "select", "Sm_employstatus", [
						["在职", "INJOB"],
						["离职", "OUTJOB"]
					], "employstatus"],
					["dayinput", "入职时间" + color, "dayinput", "Sm_hiredate", [], "hiredate"],
					["dayinput", "离职时间", "dayinput", "Sm_leavedate", [], "leavedate"]
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["个人信息", "sort", [
					["input", "姓名" + color, "input", "Sm_name", [], "personinfo.name"],
					["select", "性别" + color, "select", "Sm_sex", [
						["男", "MALE"],
						["女", "FEMALE"]
					], "personinfo.sex"],
					["select", "证件类型" + color, "select", "Sm_cardtype", [
						["身份证", "IDCARD"],
						["军官证", "OFFICERCERTIFICATE"],
						["护照", "PASSPORT"],
						["户口本", "OTHER"]
					], "personinfo.cardtype"],
					["inputr", "证件号" + color, "input", "Sm_cardnum", [], "personinfo.cardnum"],
					["input", "手机号码" + color, "input", "Sm_mobile", [], "personinfo.mobile"],
					["input", "联系地址" + color, "input", "Sm_address", [], "personinfo.address"],
					["dayinput", "出生日期", "dayinput", "Sm_birthday", [], "personinfo.birthday"],
					["input", "照片", "file", "Md_photo", [], "personinfo.file.id"]
				]],
				["从业信息", "sort", [
					["input", "驾驶证号" + color, "input", "Sm_drilicence", [], "drilicence"],
					["dayinput", "驾驶证初领日期", "dayinput", "Sm_fstdrilicdate", [], "fstdrilicdate"],
					["select", "准驾车型" + color, "select", "Sm_dripermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "dripermitted"],
					["select", "准教车型" + color, "select", "Sm_teachpermitted", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					], "teachpermitted"],
					["select", "供职状态" + color, "select", "Sm_employstatus", [
						["在职", "INJOB"],
						["离职", "OUTJOB"]
					], "employstatus"],
					["dayinput", "入职时间" + color, "dayinput", "Sm_hiredate", [], "hiredate"],
					["dayinput", "离职时间", "dayinput", "Sm_leavedate", [], "leavedate"]
				]]
			]);
		}
	},
	TrainingEnd: {
		"graduation": function() {
			return GetModalCon([
				["结业信息", "sort", [
					["input", "证书编号" + color, "input", "Sm_gracertnum", [], "gracertnum"],
					["input", "发放日期" + color, "input", "Sm_grantdate", [], "grantdate"]
				]]
			]);
		}
	},
	ScheduleArray: {
		"add": function() {
			return GetModalCon([
				["排班分组", "sort", [
					["select", "分校" + color, "select", "Sm_brid", []],
					["input", "组名" + color, "dayinput", "Sm_name", []],
					["select", "教练场" + color, "select", "Sm_trainareaid", []],
					["select_no", "顺序预约", "select", "Sm_isOrdinalAppoint", [
						["否", "0"],
						["是", "1"]
					]],
					["number", "单车上限", "number", "Sm_maxStuNum", []],
					["number", "单车下限", "number", "Sm_minStuNum", []]
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["排班分组", "sort", [
					["select", "分校" + color, "select", "Sm_brid", []],
					["input", "组名" + color, "dayinput", "Sm_name", []],
					["select", "教练场" + color, "select", "Sm_trainareaid", []],
					["select_no", "顺序预约", "select", "Sm_isOrdinalAppoint", [
						["否", "0"],
						["是", "1"]
					]],
					["number", "单车上限", "number", "Sm_maxStuNum", []],
					["number", "单车下限", "number", "Sm_minStuNum", []]
				]]
			]);
		}
	},
	SchScheduleModel: {
		"add": function() {
			return GetModalCon([
				["场地排版模板" + _tiphtml, "sort", [
					["select", "所属驾校" + color, "dayinput", "Sm_braid", []],
					["select", "教练场" + color, "dayinput", "Sm_trainareaid", []],
					["select", "分组" + color, "select", "Sm_groupid", []],
					["input", "模板名称" + color, "input", "Sm_name", []],
					["select_no", "是否发布" + color, "select", "Sm_invalid", [
						["是", "1"],
						["否", "0"]
					]],
					["select_no", "是否默认" + color, "select", "Sm_usual", [
						["非默认", "0"],
						["默认", "1"]
					]],
					["select_no", "预约范围" + color, "select", "Sm_scopetype", [
						["总校任意学员", "0"],
						["分校任意学员", "1"],
						["分校指定班型学员", "2"],
					]],
					["select_no", "车型" + color, "select", "Sm_carType", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					]],
					["select_no", "培训部分" + color, "select", "Sm_subject", [
						["第一部分", "1"],
						["第二部分", "2"],
						["第三部分", "3"],
						["第四部分", "4"]
					]],
					["select_no", "小科目" + color, "select", "Sm_subcourse", [
						["所有", "All"],
						["倒车入库", "BackOff"],
						["侧方停车", "Parking"],
						["坡道定点停车和起步", "Uphill"],
						["直角转弯", "StraightTurn"],
						["曲线行驶", "CurveTurn"]
					]],
					["number", "预约名额" + color, "number", "Sm_number", []],
					["number", "标准价格" + color, "number", "Sm_price", []],
					["select_no", "间隔时间" + color, "select", "Sm_spacePreciseTime", [
						["30分钟", "30"],
						["60分钟", "60"],
						["90分钟", "90"],
						["120分钟", "120"],
						["150分钟", "150"],
						["180分钟", "180"],
						["210分钟", "210"],
						["240分钟", "240"]
					]],
					["timeinput", "开始时间" + color, "timeinput", "Sm_startPreciseTime", []],
					["timeinput", "结束时间" + color, "timeinput", "Sm_endPreciseTime", []],
					["select_no", "支付方式" + color, "select", "Sm_paytype", [
						["无需支付", "WithoutPay"],
						["余额支付", "BalancePay"],
						// ["现金支付", "CashPay"],
						// ["余额优先支付", "BalancePriorPay"],
						["先学后付", "LearnFirst"],
					]],
					["selects", "班型", "select", "Sm_classtype", []],
					["select_no", "精细排班" + color, "select", "Sm_detailstatus", [
						["否", "0"],
						["是", "1"]
					]]

				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["场地排版模板", "sort", [
					["select", "所属驾校" + color, "dayinput", "Sm_braid", []],
					["select", "教练场" + color, "dayinput", "Sm_trainareaid", []],
					["select", "分组" + color, "select", "Sm_groupid", []],
					["input", "模板名称" + color, "input", "Sm_name", []],
					["select_no", "是否发布" + color, "select", "Sm_invalid", [
						["是", "1"],
						["否", "0"]
					]],
					["select_no", "是否默认" + color, "select", "Sm_usual", [
						["非默认", "0"],
						["默认", "1"]
					]],
					["select_no", "预约范围" + color, "select", "Sm_scopetype", [
						["总校任意学员", "0"],
						["分校任意学员", "1"],
						["分校指定班型学员", "2"],
					]],
					["select_no", "车型" + color, "dayinput", "Sm_carType", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					]],
					["select_no", "培训部分" + color, "select", "Sm_subject", [
						["第一部分", "1"],
						["第二部分", "2"],
						["第三部分", "3"],
						["第四部分", "4"]
					]],
					["select_no", "小科目" + color, "select", "Sm_subcourse", [
						["所有", "All"],
						["倒车入库", "BackOff"],
						["侧方停车", "Parking"],
						["坡道定点停车和起步", "Uphill"],
						["直角转弯", "StraightTurn"],
						["曲线行驶", "CurveTurn"]
					]],
					["number", "预约名额" + color, "number", "Sm_number", []],
					["number", "标准价格" + color, "number", "Sm_price", []],
					["select_no", "间隔时间" + color, "select", "Sm_spacePreciseTime", [
						["30分钟", "30"],
						["60分钟", "60"],
						["90分钟", "90"],
						["120分钟", "120"],
						["150分钟", "150"],
						["180分钟", "180"],
						["210分钟", "210"],
						["240分钟", "240"]
					]],
					["timeinput", "开始时间" + color, "timeinput", "Sm_startPreciseTime", []],
					["timeinput", "结束时间" + color, "timeinput", "Sm_endPreciseTime", []],
					["select_no", "支付方式" + color, "select", "Sm_paytype", [
						["无需支付", "WithoutPay"],
						["余额支付", "BalancePay"],
						// ["现金支付", "CashPay"],
						// ["余额优先支付", "BalancePriorPay"],
						["先学后付", "LearnFirst"],
					]],
					["selects", "班型", "select", "Sm_classtype", []],
					["select_no", "精细排班" + color, "select", "Sm_detailstatus", [
						["否", "0"],
						["是", "1"]
					]]

				]]
			]);
		}
	},
	CoaScheduleModel: {
		"add": function() {
			return GetModalCon([
				["教练排班模板" + _tiphtml, "sort", [
					["select_no", "添加模式" + color, "select", "model", [
						["教练", "1"],
						["教练组", "0"]
					]],
					["select", "所属驾校" + color, "dayinput", "Sm_braid", []],
					["select", "<span id='coaTitle'>教练</span>" + color, "dayinput", "Sm_coaid", []],
					["input", "模板名称" + color, "input", "Sm_name", []],
					["select_no", "是否发布" + color, "select", "Sm_invalid", [
						["是", "1"],
						["否", "0"]
					]],
					["select_no", "是否默认" + color, "select", "Sm_usual", [
						["非默认", "0"],
						["默认", "1"]
					]],
					["select_no", "预约范围" + color, "select", "Sm_scopetype", [
						["总校任意学员", "0"],
						["分校任意学员", "1"],
						["分校指定班型学员", "2"],
						["指定带教学员", "3"]
					]],
					["select_no", "支付方式" + color, "select", "Sm_paytype", [
						["无需支付", "WithoutPay"],
						["余额支付", "BalancePay"],
						// ["现金支付", "CashPay"],
						// ["余额优先支付", "BalancePriorPay"],
						["先学后付", "LearnFirst"],
					]],
					["select", "教练场", "dayinput", "Sm_trainareaid", []],
					["select_no", "车型" + color, "dayinput", "Sm_carType", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					]],
					["select_no", "培训部分" + color, "select", "Sm_subject", [
						["第一部分", "1"],
						["第二部分", "2"],
						["第三部分", "3"],
						["第四部分", "4"]
					]],
					["select_no", "小科目" + color, "select", "Sm_subcourse", [
						["所有", "All"],
						["倒车入库", "BackOff"],
						["侧方停车", "Parking"],
						["坡道定点停车和起步", "Uphill"],
						["直角转弯", "StraightTurn"],
						["曲线行驶", "CurveTurn"]
					]],
					["select_no", "间隔时间" + color, "select", "Sm_spacePreciseTime", [
						["30分钟", "30"],
						["60分钟", "60"],
						["90分钟", "90"],
						["120分钟", "120"],
						["150分钟", "150"],
						["180分钟", "180"],
						["210分钟", "210"],
						["240分钟", "240"]
					]],
					["timeinput", "开始时间" + color, "timeinput", "Sm_startPreciseTime", []],
					["timeinput", "结束时间" + color, "timeinput", "Sm_endPreciseTime", []],
					["input", "预约名额" + color, "input", "Sm_number", []],
					["number", "标准价格" + color, "number", "Sm_price", []],
					["selects", "班型", "select", "Sm_classtype", []],
					["select_no", "精细排班" + color, "select", "Sm_detailstatus", [
						["否", "0"],
						["是", "1"]
					]]
				]]
			]);
		},
		"update": function() {
			return GetModalCon([
				["教练排班模板" + _tiphtml, "sort", [
					["select", "所属驾校" + color, "dayinput", "Sm_braid", []],
					["select", "教练" + color, "dayinput", "Sm_coaid", []],
					["input", "模板名称" + color, "input", "Sm_name", []],
					["select_no", "是否发布" + color, "select", "Sm_invalid", [
						["是", "1"],
						["否", "0"]
					]],
					["select_no", "是否默认" + color, "select", "Sm_usual", [
						["非默认", "0"],
						["默认", "1"]
					]],
					["select_no", "预约范围" + color, "select", "Sm_scopetype", [
						["总校任意学员", "0"],
						["分校任意学员", "1"],
						["分校指定班型学员", "2"],
						["指定带教学员", "3"]
					]],
					["select_no", "支付方式" + color, "select", "Sm_paytype", [
						["无需支付", "WithoutPay"],
						["余额支付", "BalancePay"],
						// ["现金支付", "CashPay"],
						// ["余额优先支付", "BalancePriorPay"],
						["先学后付", "LearnFirst"],
					]],
					["select", "教练场", "dayinput", "Sm_trainareaid", []],
					["select_no", "车型" + color, "dayinput", "Sm_carType", [
						["C1", "C1"],
						["C2", "C2"],
						["C3", "C3"],
						["A1", "A1"],
						["A2", "A2"],
						["B1", "B1"],
						["B2", "B2"]
					]],
				["select_no", "培训部分" + color, "select", "Sm_subject", [
						["第一部分", "1"],
						["第二部分", "2"],
						["第三部分", "3"],
						["第四部分", "4"]
					]],
					["select_no", "小科目" + color, "select", "Sm_subcourse", [
						["所有", "All"],
						["倒车入库", "BackOff"],
						["侧方停车", "Parking"],
						["坡道定点停车和起步", "Uphill"],
						["直角转弯", "StraightTurn"],
						["曲线行驶", "CurveTurn"]
					]],
					["select_no", "间隔时间" + color, "select", "Sm_spacePreciseTime", [
						["30分钟", "30"],
						["60分钟", "60"],
						["90分钟", "90"],
						["120分钟", "120"],
						["150分钟", "150"],
						["180分钟", "180"],
						["210分钟", "210"],
						["240分钟", "240"]
					]],
					["timeinput", "开始时间" + color, "timeinput", "Sm_startPreciseTime", []],
					["timeinput", "结束时间" + color, "timeinput", "Sm_endPreciseTime", []],
					["input", "预约名额" + color, "input", "Sm_number", []],
					["number", "标准价格" + color, "number", "Sm_price", []],
					["selects", "班型", "select", "Sm_classtype", []],
					["select_no", "精细排班" + color, "select", "Sm_detailstatus", [
						["否", "0"],
						["是", "1"]
					]]
				]]
			]);
		}
	},
	StudentChargeConfirm: {
		"update": function() {
			return GetModalCon([
				["收费信息", "sort", [
					["input", "学员" + color, "input", "Sm_name", []],
					["select", "收费项目" + color, "select", "Sm_chargetype", [
						["学费", "TUITION"],
						["补考", "MAKEUP"]
					]],
					["input", "已收（元）" + color, "input", "Sm_money", []],
					["select", "收费状态" + color, "select", "Sm_paystatus", [
						["未收费", "NotPay"],
						["已收费", "Paid"]
					]],
				]]
			]);
		}
	}
};

//获取modalCon
function GetModalCon(GropData) {
	var ModalConData = {}; //定义对象
	ModalConData = {
		"data": []
	}
	for(var i = 0; i < GropData.length; i++) {
		ModalConData.data.push(GetModalCon_one(GropData[i][0], GropData[i][1], GropData[i][2], GropData[i][3]));
	}
	return ModalConData;
}

//获取modalCon的一个title
function GetModalCon_one(Title, type, FormGropData, strData) {
	var Data = {}; //定义对象
	switch(type) {
		case "sort":
			Data.Title = Title;
			Data.FormGroup = ReFormGropData(FormGropData);
			break;
		case "img":
			Data.Title = Title;
			Data.image = strData[0];
			Data.inputid = strData[1];
			Data.FormGroup = strData[2];
			Data.rules = strData[3];
			Data.type = strData[4];
			break;
		case "fieldType":
			Data.Title = Title;
			Data.fieldType = strData[0];
			Data.FormGroup = strData[1];
			Data.rules = strData[2];
			break;
		case "featureser":
			Data.Title = Title;
			Data.featureser = strData[0];
			Data.FormGroup = strData[1];
			Data.rules = strData[2];
			break;
		case "freestandal":
			Data.Title = Title;
			Data.freestandal = strData[0];
			Data.FormGroup = strData[1];
			Data.rules = strData[2];
			break;
		case "coachabstract":
			Data.Title = Title;
			Data.coachabstract = strData[0];
			Data.FormGroup = strData[1];
			Data.rules = strData[2];
			break;
		case "abstract":
			Data.Title = Title;
			Data.abstract = strData[0];
			Data.FormGroup = strData[1];
			Data.rules = strData[2];
			break;
	}
	return Data; //返回对象
}

//返回FormGropData
function ReFormGropData(FormGropData) {
	var Data = []; //定义数组
	for(var i = 0; i < FormGropData.length; i++) {
		Data.push({
			"control": FormGropData[i][0],
			"label": FormGropData[i][1],
			"type": (FormGropData[i][2] == "input" ? "text" : FormGropData[i][2]),
			"id": FormGropData[i][3],
			"selectdata": ReSelectData(FormGropData[i][4]),
			"rules": FormGropData[i][5]
		});
	}
	return Data; //返回数组
}

//返回selectdata
function ReSelectData(SelectData) {
	var Data = []; //定义数组

	for(var i = 0; i < SelectData.length; i++) {
		Data.push({
			"Text": SelectData[i][0],
			"value": SelectData[i][1]
		});
	}
	return Data; //返回数组
}

//是否为必填
var _modalTool = {
	arrays: ["12"],
	setColor: function() {
		var color = "<SUP style=\"color:red\">*</SUP>";
		$.inArray(_cookie.schoolid, this.arrays) != -1 ? "" : color = "";
		return color;
	},
	setStudentRule: function() {
		var inputs = ["Sm_brcrecruit", "Sm_stutype", "Sm_rc"];
		var rules = ["mchose", "mchose", "mchose"];
		if($.inArray(_cookie.schoolid, this.arrays) != -1) {
			for(var i in inputs) {
				$("#" + inputs[i]).rules("add", rules[i]);
			}
		}
	}
}

//增领事件
var _modalEven = {
	addColor: function(This) {
		var label = $("#" + This).parent().parent().find('label');
		label.length > 0 ? "" : label = $("#" + This).parent().parent().parent().find('label');
		label.length > 0 ? "" : label = $("#" + This).parent().parent().parent().parent().find('label');
		var Text;
		label.data("oldText") != undefined ? Text = label.data("oldText") : (Text = label.text(), label.data("oldText", label.text()));
		label.html(Text + '<SUP style=\"color:red\">*</SUP>');
	},
	removeColor: function(This) {
		var label = $("#" + This).parent().parent().find('label');
		label.length > 0 ? "" : label = $("#" + This).parent().parent().parent().find('label');
		label.length > 0 ? "" : label = $("#" + This).parent().parent().parent().parent().find('label');
		if(label.data("oldText") == undefined) {
			return true;
		}
		label.html(label.data("oldText"));
	},
	busitype: function(This) {
		var val = $(This).val();
		var arrays = ["Sm_perdritype", "Sm_drilicnum", "Sm_fstdrilicdate"];
		var rules = ["mchose", "required", "required"];
		switch(val) {
			case "INCREASELIC":
				for(var i in arrays) {
					this.addColor(arrays[i]);
					$("#" + arrays[i]).rules("add", rules[i]);
					$("#" + arrays[i]).on("change", function() {
						$(this).valid();
					});
				}
				break;
			default:
				validater.resetValidater();
				for(var i in arrays) {
					this.removeColor(arrays[i]);
					$("#" + arrays[i]).rules("remove", rules[i]);
				}
				break;
		}
	}
}