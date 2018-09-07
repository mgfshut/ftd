/*--------------------------------------------表格的内容--开始--------------------------------------------------------*/
$(function() {
	//违规记录
	window.top.AreaManager_Table_Con = GetThobj([
		["分校名称", "", 1, "brshname"],
		["学员姓名", "", 1, "stuname"],
		["学员证件号", "", 1, "stucardnum"],
		["车牌号码", "", 1, "licnum"],
		["教练姓名", "", 1, "coaname"],
		["教练证件号", "", 1, "coacardnum"],
		["开始时间", "", 1, "timestart"],
		["结束时间", "", 1, "timeend"],
		["持续时常(分钟)", "", 1, "count"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["detaildeArea", "id"]
		]
	], "Dr");

	//日志管理
	window.top.SysLogs_Table_Con = GetThobj([
		["用户", "", 1, "name"],
		["时间", "", 1, "time"],
		["操作", "", 1, "oper"]
	]);

	//教练员教时统计
	window.top.CoachDaillyrec_Table_Con = GetThobj([
		["姓名", "", 1, "name"],
		["证件号码", "", 1, "cardnum"],
		["月份", "", 1, "month"],
		["培训人数", "", 1, "count"],
		["科二培训学时", "", 1, "sum2"],
		["科二有效学时", "", 1, "valid2"],
		["科三培训学时", "", 1, "sum3"],
		["科三有效学时", "", 1, "valid3"]
	]);

	//短信管理
	window.top.ShortMsg_Table_Con = GetThobj([
		["分校名称", "", 1, "bridname"],
		["手机号码", "", 1, "phone"],
		["发送时间", "", 1, "senddaytime"],
		["模板编码", "", 1, "templatecode"],
		["短信发送状态", "", 1, "status"]
	]);

	//交通违法
	window.top.TrafficUnlaw_Table_Con = GetThobj([
		["车牌号", "", 2, "carinfo", "licnum"],
		["违法日期", "", 1, "violdate"],
		["司机", "", 1, "driver"],
		["违法记分", "", 1, "point"],
		["罚款金额", "", 1, "price"],
		["违法地点", "", 1, "place"],
		["违法行为", "", 1, "violaction"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"]
		]
	]);

	//事故记录
	window.top.AccidentRecord_Table_Con = GetThobj([
		["车牌号", "", 2, "carinfo", "licnum"],
		["事故日期", "", 1, "acddate"],
		["司机", "", 1, "driver"],
		["事故地点", "", 1, "place"],
		["责任划分", "", 1, "dutydiv"],
		["处理结果", "", 1, "result"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"]
		]
	]);

	//加油记录
	window.top.RefuelRecord_Table_Con = GetThobj([
		["车牌号", "", 2, "carinfo", "licnum"],
		["加油日期", "", 1, "fueldate"],
		["司机", "", 1, "driver"],
		["加油公里数(km)", "", 1, "km"],
		["加油升数(L)", "", 1, "lpm"],
		["加油金额(元)", "", 1, "price"],
		["加油地点", "", 1, "place"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"]
		]
	]);

	//巡检记录
	window.top.PollingRecord_Table_Con = GetThobj([
		["车牌号", "", 2, "carinfo", "licnum"],
		["巡检日期", "", 1, "polldate"],
		["司机", "", 1, "driver"],
		["巡检地点", "", 1, "place"],
		["巡检结果", "", 1, "result"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"]
		]
	]);

	//安全检测
	window.top.SafeCheck_Table_Con = GetThobj([
		["车牌号", "", 2, "carinfo", "licnum"],
		["维修日期", "", 1, "dtdate"],
		["司机", "", 1, "driver"],
		["处理意见", "", 1, "suggestion"],
		["不合格原因", "", 1, "failcause"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"]
		]
	]);

	//维修保养
	window.top.MaintainUpkeep_Table_Con = GetThobj([
		["车牌号", "", 2, "carinfo", "licnum"],
		["维保日期", "", 1, "mtdate"],
		["司机", "", 1, "driver"],
		["维修类型", "", 1, "mttype"],
		["费用（元）", "", 1, "price"],
		["里程（km）", "", 1, "mileage"],
		["维保明细", "", 1, "mtdetail"],
		["下次维保日", "", 1, "nextmtdate"],
		["维保地点", "", 1, "mtaddress"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"]
		]
	]);

	//教练车档案
	window.top.CarArchival_Table_Con = GetThobj([
		["全国统一编号", "", 2, "carinfo", "code"],
		["备案状态", "", 2, "carinfo", "record"],
		["所属分校", "", 3, "carinfo", "brsch", "name"],
		["车牌号码", "", 2, "carinfo", "licnum"],
		["车牌颜色", "", 2, "carinfo", "platecolor"],
		["生产厂家", "", 2, "carinfo", "manufacture"],
		["车辆品牌", "", 2, "carinfo", "model"],
		["培训车型", "", 2, "carinfo", "perdritype"],
		["购买日期", "", 2, "carinfo", "buydate"]
	], [
		["操作"],
		["id"],
		["custom"],
		[
			["archives", {
				"id": "car",
				"title": "教练车档案",
				"url": "archivalCar.html",
			}],
			["update_spt", "id"]
		]
	], "carArchival");
	//规定项目
	window.top.StipulateProject_Table_Con = GetThobj([
		["车牌号", "", 2, "carinfo", "licnum"],
		["年审到期日", "", 1, "yearexp"],
		["二级维护到期日", "", 1, "secmtexp"],
		["技术等级评定到期日", "", 1, "techexp"],
		["交强险到期日", "", 1, "stroinsexp"],
		["交强险金额（元）", "", 1, "stroinsprice"],
		["商业险到期日", "", 1, "cominsexp"],
		["商业险金额（元）", "", 1, "cominsprice"],
		["车船税到期日", "", 1, "vehvesexp"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"]
		]
	]);
	//评论
	window.top.comment_Table_Con = GetThobj([
		["分校名称", "", 2, "branch", "name"],
		["评论时间", "", 1, "createtime"],
		["培训部分", "", 1, "classlesson"],
		["教练姓名", "", 3, "coach", "personinfo", "name"],
		["评论内容", "", 1, "content"],
		["评价标签", "", 1, "evtype"],
		["学员姓名", "", 3, "student", "personinfo", "name"]
	]);

	//评论
	window.top.report_Table_Con = GetThobj([
		["分校名称", "", 2, "branch", "name"],
		["教练姓名", "", 3, "coach", "personinfo", "name"],
		["举报内容", "", 1, "content"],
		["教练号码", "", 3, "coach", "personinfo", "mobile"],
		["学员姓名", "", 3, "student", "personinfo", "name"],
		["举报时间", "", 1, "createtime"],
		["反馈内容", "", 1, "feedback"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["Report", "id"]
		]
	]);

	//远程教育成绩
	window.top.RemoteEduGrade_Table_Con = GetThobj([
		["姓名", "", 3, "student", "personinfo", "name"],
		["性别", "", 3, "student", "personinfo", "sex"],
		["证件号", "", 3, "student", "personinfo", "cardnum"],
		["分校名", "", 3, "student", "brsch", "name"],
		["学员编码", "", 2, "student", "code"],
		["培训部分", "", 1, "phase"],
		["成绩", "", 1, "score"],
		["合格", "", 1, "ispass"],
		["考试开始时间", "", 1, "timefrom"],
		["考试结束时间", "", 1, "timeto"]
	]);

	//排班分组
	window.top.ScheduleArray_Table_Con = GetThobj([
		["所属分校", "", 1, "branchname"],
		["组名", "", 1, "name"],
		["教练场", "", 1, "trainareaName"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			//["delete", "id"],
			["update_custom", "id"],
			["coa_group", "id"]
		]
	]);

	//驾校排班模板
	window.top.SchScheduleModel_Table_Con = GetThobj([
		["所属驾校", "", 1, "brachname"],
		["教练场", "", 1, "trainAreaName"],
		["组名称", "", 1, "groupname"],
		["模板名称", "", 1, "name"],
		["车型", "", 1, "carType"],
		["开始时间", "", 1, "startPreciseTime"],
		["结束时间", "", 1, "endPreciseTime"],
		["间隔时间(分钟)", "", 1, "spacePreciseTime"],
		["时段预约名额", "", 1, "number"],
		["培训部分", "", 1, "subject"],
		["标准价格", "", 1, "price"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "id"],
			["update", "id"],
			["acquiesce", "id"]
		]
	]);

	//教练排班模板
	window.top.CoaScheduleModel_Table_Con = GetThobj([
		["教练", "", 1, "coaname"],
		["模板名称", "", 1, "name"],
		//		["教练场", "", 1, "trainAreaName"],
		["车型", "", 1, "carType"],
		["开始时间", "", 1, "startPreciseTime"],
		["结束时间", "", 1, "endPreciseTime"],
		["间隔时间(分钟)", "", 1, "spacePreciseTime"],
		["时段预约名额", "", 1, "number"],
		["培训部分", "", 1, "subject"],
		["标准价格", "", 1, "price"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "id"],
			["update", "id"],
			["acquiesce", "id"]
		]
	]);

	//预约受理
	window.OrderAccept_Table_Con = GetThobj([
		["分校", "", 2, "brsch", "name"],
		["姓名", "", 2, "stu", "personinfo"],
		["培训车型", "", 1, "cartype"],
		["累计学时", "", 1, "clahourtotal"],
		["科一学时", "", 1, "p1learnedh"],
		["已约/可约", "可约学时/可约学时", 1, "p1time"],
		["科二学时", "", 1, "p2learnedh"],
		["已约/可约", "可约学时/可约学时", 1, "p2time"],
		["科三学时", "", 1, "p3learnedh"],
		["已约/可约", "可约学时/可约学时", 1, "p3time"],
		["科四学时", "", 1, "p4learnedh"],
		["已约/可约", "可约学时/可约学时", 1, "p4time"],
		["预约/爽约", "", 1, "appotimes"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["setting", "this"]
		]
	]);

	//主校模块
	window.School_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["行政区域名称", "", 2, "district", "areaname"],
		["培训机构名称", "", 1, "name"],
		["法人代表", "", 1, "legal"],
		["开业时间", "", 1, "founddate"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"],
			["isRecord", "id"]
		]
	], "School");

	//分校模块
	window.SubSchool_Table_Con = GetThobj([
		["所属区域", "", 2, "district", "areaname"],
		["分校名称", "", 1, "name"],
		["分校类型", "", 1, "type"],
		["所属驾校", "", 2, "school", "name"],
		["负责人", "", 1, "manager"],
		["手机", "", 1, "mobile"],
		["地址", "", 1, "address"],
		["开业时间", "", 1, "founddate"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "id"],
			["update", "id"],
			["detailde", "id"]
		]
	], "SubSchool");

	//教学区域模块
	window.TeachSiteSel_Table_Con = GetThobj([
		["培训场地名称", "", 1, "name"],
		["所属分校", "", 2, "brsch", "name"],
		["启用状态", "", 1, "status"],
		["有效开始时间", "", 1, "avltimestart"],
		["有效结束时间", "", 1, "avltimeend"],
		["审核状态", "", 1, "accstatus"],
		["审核通过时间", "", 1, "passtime"],
		["审核失败原因", "", 1, "failreason"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "id"],
			["update", "id"],
			["isRecord", "id"]
		]
	]);

	//教练员模块
	window.Dr_Table_Con = GetThobj([
		["头像", "", 3, "personinfo", "file", "thumbnailurl"],
		["全国统一编码", "", 1, "code"],
		["备案状态", "", 1, "record"],
		["姓名", "", 2, "personinfo", "name"],
		["性别", "", 2, "personinfo", "sex"],
		["证件号码", "", 2, "personinfo", "cardnum"],
		["手机号码", "", 2, "personinfo", "mobile"],
		["IC卡号", "", 2, "iccard", "physicalnum"],
		["从业资格证号", "", 1, "qualnum"],
		["执教类型", "", 1, "teachtype"],
		["准教车型", "", 1, "teachpermitted"],
		["执教状态", "", 1, "employstatus"],
		["审核失败原因","",2,"mcv","reason"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "id"],
			["update", "id"],
			["detailde", "id"],
			["isRecord", "id"]
		]
	], "Dr");

	//教练车模块
	window.CoachesManagement_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["备案状态", "", 1, "record"],
		["所属分校", "", 2, "brsch", "name"],
		["车牌号", "", 1, "licnum"],
		["培训车型", "", 1, "perdritype"],
		["车辆品牌", "", 1, "brand"],
		["型号", "", 1, "model"],
		["车架号", "", 1, "franum"],
		["发动机号", "", 1, "engnum"],
		["道路运输证号", "", 1, "transportno"],
		["审核失败原因","",2,"mcv","reason"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "id"],
			["update", "id"],
			["detailde", "id"],
			["isRecord", "id"]
		]
	], "CoachesManagement");

	//学员模块
	window.StudentManagement_Table_Con = GetThobj([
		["头像", "", 3, "personinfo", "file", "thumbnailurl"],
		["全国统一编码", "", 1, "code"],
		["备案状态", "", 1, "record"],
		["学员姓名", "", 2, "personinfo", "name"],
		["性别", "", 2, "personinfo", "sex"],
		["年龄", "", 1, "age"],
		["收费模式", "", 3, "sah", "charge", "chargetype"],
		["付费模式", "", 3, "sah", "charge", "paytype"],
		["证件号码", "", 2, "personinfo", "cardnum"],
		["IC卡号", "", 2, "iccard", "physicalnum"],
		["带教教练", "", 3, "coach", "personinfo", "name"],
		["所属分校", "", 2, "brsch", "name"],
		["招生点", "", 2, "brcrecruit", "name"],
		["报名时间", "", 1, "signuptime"],
		["培训类型", "", 1, "traintype"],
		["创建者", "", 1, "creator"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "id"],
			["update", "id"],
			["isRecord", "id"]
			// ,
			// ["sInstitution","id"]
		]
	]);

	//学员档案管理
	window.studentArchival_Table_Con = GetThobj([
		["头像", "", 3, "personinfo", "file", "thumbnailurl"],
		["全国统一编码", "", 1, "code"],
		["所属分校", "", 2, "brsch", "name"],
		["学员姓名", "", 2, "personinfo", "name"],
		["性别", "", 2, "personinfo", "sex"],
		["证件号码", "", 2, "personinfo", "cardnum"],
		["培训车型", "", 1, "traintype"],
		["报名时间", "", 1, "signuptime"],
		["培训部分", "", 1, "status"]
	], [
		["操作"],
		["id"],
		["custom"],
		[
			["archives", {
				"id": "st",
				"title": "学员档案",
				"url": "archivalStudent.html",
			}]
		]
	], "studentArchival");
	
	//学员合同管理
	window.stuContract_Table_Con = GetThobj([
		["头像", "", 3, "personinfo", "file", "thumbnailurl"],
		["全国统一编码", "", 1, "code"],
		["学员姓名", "", 2, "personinfo", "name"],
		["性别", "", 2, "personinfo", "sex"],
		["证件号码", "", 2, "personinfo", "cardnum"],
		["带教教练", "", 1, "coaname"],
		["所属分校", "", 2, "brsch", "name"],
		["报名时间", "", 1, "signuptime"],
		["培训类型", "", 1, "traintype"]
	], [
		["操作"],
		["id"],
		["custom"],
		[
			["archives", "id"]
		]
	]);

	//学员培训记录
	window.TrainingRecords_Table_Con = GetThobj_Fist_Operate([
		["所属分校", "", 1, "branchname"],
		["学员", "", 1, "stuname"],
		["教练", "", 1, "coachname"],
		["车型", "", 1, "traintype"],
		["已学学时", "", 1, "totalcount"],
		["有效学时", "", 1, "score"],
		//["已学学时", "", 1, "score"],
		["培训部分", "", 1, "phase"],
		["学时来源", "", 1, "classes"],
		["日期", "", 1, "time"]
	], [
		["详细"],
		["id"],
		["custom_notype"],
		[
			[{
				"type": "Records",
				"keys": []
			}]
		]
	],
	[
		["操作"],
		["id"],
		["Nocustom"],
		[
			["gpsList", "id"]
			// ,
			// ["sInstitution","id"]
		]
	]
	, "studentArchival");

	//教练员档案管理
	window.coachArchival_Table_Con = GetThobj([
		["头像", "", 3, "personinfo", "file", "thumbnailurl"],
		["姓名", "", 2, "personinfo", "name"],
		["证件号码", "", 2, "personinfo", "cardnum"],
		["执教类型", "", 1, "teachtype"],
		["准教车型", "", 1, "teachpermitted"],
	], [
		["操作"],
		["id"],
		["custom"],
		[
			["archives", {
				"id": "dr",
				"title": "教练员档案",
				"url": "archivalDr.html",
			}]
		]
	], "coachArchival");

	//角色管理
	window.role_Table_Con = GetThobj([
		["角色名称", "", 1, "name"],
		["创建时间", "", 1, "createtime"],
		["更新时间", "", 1, "updatetime"],
		["创建者", "", 1, "creator"],
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["tree", "name"],
			["delete", "name"],
			["update", "id"]
		]
	]);

	//用户管理
	window.user_Table_Con = GetThobj([
		["用户名", "", 1, "username"],
		["角色名", "", 2, "role", "name"],
		["邮箱", "", 1, "email"],
		["手机", "", 1, "mobile"],
		["创建时间", "", 1, "createtime"],
		["更新时间", "", 1, "updatetime"],
		["创建者", "", 1, "creator"],
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["delete", "username"],
			["update", "id"],
			["updatepassword", "username"]
		]
	]);

	//教练员数量统计
	window.DrStatistica_Table_Con = GetThobj([
		["所属分校", "", 2, "brid", "name"],
		["教练员总数", "", 1, "coachTotal"],
		["在职数", "", 1, "injob"],
		["黑名单数", "", 1, "blackList"],
		["A1", "大型客车", 1, "largeBus"],
		["A2", "牵引车", 1, "tractor"],
		["A3", "城市公交车", 1, "cityBus"],
		["B1", "中型客车", 1, "mediumBus"],
		["B2", "大型货车", 1, "largeTruck"],
		["C1", "小型汽车", 1, "minicar"],
		["C2", "小型自动档汽车", 1, "smallAutoCar"],
		["C3", "低速载货汽车", 1, "lowSpeedTruck"],
		["C4", "三轮汽车", 1, "threeWheeler"],
		["C5", "残疾人专用", 1, "handicapped"],
		["D", "普通三轮摩托车", 1, "ordinaryThreeWheeled"],
		["E", "普通二轮摩托车", 1, "ordinaryMotorcycle"],
		["F", "轻便摩托车", 1, "moped"],
		["T", "理论教练员", 1, "theoryCoach"],
		["M", "轮式自行机械车", 1, "wheeledAutoCar"],
		["N", "无轨电车", 1, "trolleybus"]
	]);

	//教练车数量统计
	window.CoachesStatistical_Table_Con = GetThobj([
		["所属分校", "", 2, "brid", "name"],
		["教练车总数", "", 1, "carTotal"],
		["在用数", "", 1, "inuse"],
		["停用数", "", 1, "nonuse"],
		["A1", "大型客车", 1, "largeBus"],
		["A2", "牵引车", 1, "tractor"],
		["A3", "城市公交车", 1, "cityBus"],
		["B1", "中型客车", 1, "mediumBus"],
		["B2", "大型货车", 1, "largeTruck"],
		["C1", "小型汽车", 1, "minicar"],
		["C2", "小型自动档汽车", 1, "smallAutoCar"],
		["C3", "低速载货汽车", 1, "lowSpeedTruck"],
		["C4", "三轮汽车", 1, "threeWheeler"],
		["D", "普通三轮摩托车", 1, "ordinaryThreeWheeled"],
		["E", "普通二轮摩托车", 1, "ordinaryMotorcycle"],
		["F", "轻便摩托车", 1, "moped"],
		["M", "轮式自行机械车", 1, "wheeledAutoCar"],
		["N", "无轨电车", 1, "trolleybus"]
	]);

	//学员数量统计
	window.StudentStatistical_Table_Con = GetThobj([
		["所属分校", "", 2, "brid", "name"],
		["报名学员", "", 1, "signup"],
		["第一部分学员", "", 1, "courseOne"],
		["第二部分学员", "", 1, "courseTwo"],
		["第三部分学员", "", 1, "courseThree"],
		["结业", "", 1, "graduate"]
	]);

	//考核员模块
	window.Assessment_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["备案状态", "", 1, "record"],
		["所属分校", "", 2, "brsch", "name"],
		["姓名", "", 2, "personinfo", "name"],
		["性别", "", 2, "personinfo", "sex"],
		["身份号码", "", 2, "personinfo", "cardnum"],
		["手机号码", "", 2, "personinfo", "mobile"],
		["车型", "", 1, "perdritype"],
		["考核阶段", "", 1, "assessStage"],
		["供职状态", "", 1, "employstatus"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["outjob", "id"],
			["update", "id"],
			["isRecord", "id"]
		]
	]);

	//安全员
	window.Safement_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["备案状态", "", 1, "record"],
		["所属分校", "", 2, "brsch", "name"],
		["姓名", "", 2, "personinfo", "name"],
		["性别", "", 2, "personinfo", "sex"],
		["证件号", "", 2, "personinfo", "cardnum"],
		["手机号码", "", 2, "personinfo", "mobile"],
		["供职状态", "", 1, "employstatus"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["outjob", "id"],
			["update", "id"],
			["isRecord", "id"]
		]
	]);

	//科目审核
	window.TrainingAudit_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["学员姓名", "", 1, "stuname"],
		["性别", "", 1, "sex"],
		["证件号", "", 1, "cardnum"],
		["车型", "", 1, "traintype"],
		["带教教练", "", 1, "coaname"],
		["培训部分", "", 1, "phase"],
		["大纲学时", "", 1, "yaoqiu"],
		["已学学时", "", 1, "yixue"],
		//		["理论所需学时", "", 1, "lilun"],
		//		["理论已培训学时", "", 1, "ylilun"],
		//		["实操所需学时", "", 1, "shicao"],
		//		["实操已培训学时", "", 1, "yshicao"],
		["审核状态", "", 1, "status"],
		["审核时间", "", 1, "updatetime"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["AuditRecord", "id"],
			["sign", "id"]
		]
	]);

	//科目电子审核
	window.TrainingSign_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["学员姓名", "", 1, "stuname"],
		["性别", "", 1, "sex"],
		["证件号", "", 1, "cardnum"],
		["车型", "", 1, "traintype"],
		["带教教练", "", 1, "coaname"],
		["报名时间", "", 1, "signuptime"],
		["第一部分", "", 1, "c1status"],
		["第二部分", "", 1, "c2status"],
		["第三部分", "", 1, "c3status"],
		["第四部分", "", 1, "c4status"],
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["sign1", "id"]
		]
	]);

	//培训成绩确认
	window.TrainingConfirm_Table_Con = GetThobj([
		["学员姓名", "", 1, "name"],
		["性别", "", 1, "sex"],
		["身份证号", "", 1, "cardnum"],
		["电话号码", "", 1, "mobile"],
		["报名时间", "", 1, "signuptime"],
		["约考时间", "", 1, "apomexamTime"],
		["考试部分", "", 1, "phase"],
		["考试时间", "", 1, "examTime"],
		["成绩标志", "", 1, "ispassed"]
	]);

	//培训统计
	window.TrainingStatistical_Table_Con = GetThobj([
		["全国统一编码", "", 3, "dr", "student", "code"],
		["学员", "", 4, "dr", "student", "personinfo", "name"],
		["学员身份证号码", "", 4, "dr", "student", "personinfo", "cardnum"],
		["报名时间", "", 3, "dr", "student", "signuptime"],
		["培训部分", "", 3, "dr", "spc", "phase"],
		["培训开始时间", "", 1, "timefrom"],
		["培训结束时间", "", 1, "timeto"],
		["驾校", "", 4, "dr", "coach", "brsch", "name"],
		["教练", "", 4, "dr", "coach", "personinfo", "name"]
	]);

	//确认收费
	//	window.StudentChargeConfirm_Table_con = GetThobj([
	//		["收费流水号", "", 1, "serialnum"],
	//		["全国统一编码", "", 2, "student", "code"],
	//		["学员", "", 3, "student", "personinfo", "name"],
	//		["身份证号码", "", 3, "student", "personinfo", "cardnum"],
	//		["培训车型", "", 2, "student", "traintype"],
	//		//		["应收金额", "", 3, "student", "stucharge", "price"],
	//		["收费类型", "", 1, "chargetype"],
	//		["收费金额", "", 1, "money"],
	//		["收费备注", "", 1, "remark"],
	//		["收款人", "", 1, "cashier"],
	//		["收费时间", "", 1, "paydate"]
	//	]);

	window.StudentChargeConfirm_Table_Con = GetThobj([
		["所属分校", "", 3, "student", "brsch", "name"],
		["学员姓名", "", 3, "student", "personinfo", "name"],
		["收费项目", "", 1, "chargetype"],
		["应收（元）", "", 3, "student", "stucharge", "price"],
		["已收（元）", "", 1, "money"],
		//		["应收金额", "", 3, "student", "stucharge", "price"],
		["收费方式", "", 1, "paymode"],
		["收费状态", "", 1, "paystatus"],
		["录入人", "", 1, "creator"],
		["录入时间", "", 1, "createtime"],
		["收款人", "", 1, "cashier"],
		["收款时间", "", 1, "paydate"],
		["审核状态", "", 1, "assessstatus"],
		["审核人", "", 1, "assessor"],
		["审核时间", "", 1, "assessdate"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["update", "id"],
			["delete_Stu", "id"]
			//["print", "id"]
		]
	]);

	window.StudentChargeConfirms_Table_Con = GetThobj([
		["所属分校", "", 3, "student", "brsch", "name"],
		["学员姓名", "", 3, "student", "personinfo", "name"],
		["收费项目", "", 1, "chargetype"],
		["应收（元）", "", 3, "student", "stucharge", "price"],
		["已收（元）", "", 1, "money"],
		//		["应收金额", "", 3, "student", "stucharge", "price"],
		["收费方式", "", 1, "paymode"],
		["收费状态", "", 1, "paystatus"],
		["录入人", "", 1, "creator"],
		["录入时间", "", 1, "createtime"],
		["收款人", "", 1, "cashier"],
		["收款时间", "", 1, "paydate"],
		["审核状态", "", 1, "assessstatus"],
		["审核人", "", 1, "assessor"],
		["审核时间", "", 1, "assessdate"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["audit", "id"]
		]
	]);

	//学员报名意向
	window.StudentSigninWill_Table_Con = GetThobj([
		["报名人", "", 1, "username"],
		["联系电话", "", 1, "userphone"],
		["班型", "", 1, "course"],
		["班型描述", "", 1, "cousedesc"],
		["价格(元)", "", 1, "price"],
		["车型", "", 1, "cartype"],
		["教练", "", 1, "coachname"],
		["报名意向提交时间", "", 1, "createtime"]
	]);

	//学员身份证有效期
	window.StudentExpireIdcard_Table_Con = GetThobj([
		["全国统一编码", "", 2, "student", "code"],
		["学员姓名", "", 3, "student", "personinfo", "name"],
		["证件号", "", 3, "student", "personinfo", "cardnum"],
		["手机号", "", 3, "student", "personinfo", "mobile"],
		["证件有效期至", "", 3, "student", "personinfo", "cardvaliddate"],
		["分校名称", "", 3, "student", "brsch", "name"],
		["是否过期", "", 1, "isExpire"]
	]);

	//教练员身份证有效期
	window.coachExpireIdcard_Table_Con = GetThobj([
		["全国统一编码", "", 2, "coach", "code"],
		["教练员姓名", "", 3, "coach", "personinfo", "name"],
		["证件号", "", 3, "coach", "personinfo", "cardnum"],
		["手机号", "", 3, "coach", "personinfo", "mobile"],
		["证件有效期至", "", 3, "coach", "personinfo", "cardvaliddate"],
		["分校名称", "", 3, "coach", "brsch", "name"],
		["是否过期", "", 1, "isExpire"]
	]);

	//驾驶证有效期
	window.coachExpireDrilicence_Table_Con = GetThobj([
		["全国统一编码", "", 2, "coach", "code"],
		["教练员姓名", "", 3, "coach", "personinfo", "name"],
		["分校名称", "", 3, "coach", "brsch", "name"],
		["驾驶证号", "", 2, "coach", "drilicence"],
		["手机号", "", 3, "coach", "personinfo", "mobile"],
		["驾驶证有效期至", "", 2, "coach", "drilicvaliddate"],
		["是否过期", "", 1, "isExpire"]
	]);

	//教练证有效期
	window.coachExpireQualnum_Table_Con = GetThobj([
		["全国统一编码", "", 2, "coach", "code"],
		["教练员姓名", "", 3, "coach", "personinfo", "name"],
		["分校名称", "", 3, "coach", "brsch", "name"],
		["教练证号", "", 2, "coach", "qualnum"],
		["手机号", "", 3, "coach", "personinfo", "mobile"],
		["教练证有效期至", "", 2, "coach", "expirydate"],
		["是否过期", "", 1, "isExpire"]
	]);

	//道路运输证有效期
	window.coachExpireTransportno_Table_Con = GetThobj([
		["全国统一编码", "", 2, "car", "code"],
		["车牌号", "", 2, "car", "licnum"],
		["分校名称", "", 3, "car", "brsch", "name"],
		["道路运输证号", "", 2, "car", "transportno"],
		["道路运输证有效期至", "", 2, "car", "transportto"],
		["是否过期", "", 1, "isExpire"]
	]);

	//学员考试统计
	window.StudentExamStatistical_Table_Con = GetThobj([
		["日期", "", 1, "date"],
		["招生点", "", 2, "recruit", "name"],
		["培训部分", "", 1, "subject"],
		["合格(1)", "", 1, "firstPassNum"],
		["合格(2)", "", 1, "secondPassNum"],
		["合格(3)", "", 1, "thirdPassNum"],
		["未合格", "", 1, "noPassNum"]
	]);

	//学员送考统计
	window.StudentSendStatistical_Table_Con = GetThobj([
		["日期", "", 1, "date"],
		["招生点", "", 2, "recruit", "name"],
		["送考", "", 1, "stutotal"],
		["接送1次", "", 1, "firstExamNum"],
		["接送2次以上", "", 1, "secondExamNum"]
	]);

	//招生统计
	window.EnrolStudentStatistical_Table_Con = function(zstype) {
		var Table_Con = {
			"data": []
		};
		if (zstype == "dot" || zstype == "0") {
			Table_Con.data.push(ReturnThObj("月份", "", 1, "date"));
			Table_Con.data.push(ReturnThObj("招生点", "", 2, "recruit", "name"));
		} else {
			Table_Con.data.push(ReturnThObj("月份", "", 1, "date"));
			Table_Con.data.push(ReturnThObj("教练员", "", 2, "recruit", "name"));
		}
		for (var i = 0; i < window.top.PupData.length; i++) {
			Table_Con.data.push(window.top.PupData[i]);
		}
		Table_Con.data.push(ReturnThObj("合计金额(元)", "", 1, "totalprice"));
		Table_Con.data.push(ReturnThObj("招生数量", "", 1, "totalstu"));
		return Table_Con;
	};

	//学员预约列表
	window.StudentOrderList_Table_Con = GetThobj([
		["分校", "1", 1, "brschname"],
		["教练", "", 1, "coachname"],
		["教练场", "", 1, "trainareaname"],
		["学员", "", 1, "studentname"],
		["学员电话", "", 1, "studentmobile"],
		["车型", "", 1, "applytype"],
		["预约日期", "", 1, "sdldaytime"],
		["班次", "", 1, "sdlclasses"],
		["金额", "", 1, "sdlprice"],
		["订单时间", "", 1, "ordercreate"]
	]);

	//学员收费管理
	window.StudentPay_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["学员姓名", "", 1, "name"],
		["性别", "", 1, "sex"],
		["证件号码", "", 1, "cardnum"],
		["所属分校", "", 1, "branchname"],
		["报名时间", "", 1, "signuptime"],
		["培训类型", "", 1, "traintype"],
		["已收金额", "", 1, "alreadyPay"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["pay", "id"]
		]
	]);

	//学员约考管理
	window.TrainingOrder_Table_Con = GetThobj([
		["全国统一编码", "", 3, "ca", "student", "code"],
		["学员姓名", "", 4, "ca", "student", "personinfo", "name"],
		["性别", "", 4, "ca", "student", "personinfo", "sex"],
		["证件号码", "", 4, "ca", "student", "personinfo", "cardnum"],
		["所属分校", "", 4, "ca", "student", "brsch", "name"],
		["教练员", "", 1, "coaname"],
		["培训部分", "", 2, "ca", "phase"],
		["培训类型", "", 3, "ca", "student", "traintype"],
		/*["报名时间", "", 3, "ca", "student", "signuptime"],*/
		["考场", "", 1, "examplace"],
		["手机号码", "", 4,"ca", "student", "personinfo", "mobile"],
		["约考时间", "", 1, "examtime"],
		["约考状态", "", 1, "apomExamType"],
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["order", "id"],
			["OrderUpdate", "id"]
		]
	]);

	//收费统计
	window.StudentPayStatistical_Table_Con = GetThobj([
		["全国统一编码", "", 2, "student", "code"],
		["学员姓名", "", 3, "student", "personinfo", "name"],
		["性别", "", 3, "student", "personinfo", "sex"],
		["身份证号码", "", 3, "student", "personinfo", "cardnum"],
		["电话号码", "", 3, "student", "personinfo", "mobile"],
		["培训车型", "", 2, "student", "traintype"],
		//		["收费标准", "", 3, "student", "stucharge", "course"],
		//		["应收金额", "", 1, "needPay"],
		["已收金额", "", 1, "alreadyPay"],
		//	["未收金额", "", 1, "haveNotPay"]
	]);

	//学员约考查询
	window.TrainingOrderselect_Table_Con = GetThobj([
		["编号", "", 2, "student", "code"],
		["学员姓名", "", 3, "student", "personinfo", "name"],
		["性别", "", 3, "student", "personinfo", "sex"],
		["身份证号码", "", 3, "student", "personinfo", "cardnum"],
		["电话号码", "", 3, "student", "personinfo", "mobile"],
		["培训部分", "", 2, "apomExam", "subject"],
		["约考时间", "", 2, "apomExam", "examtime"],
		["接送地点", "", 3, "apomExam", "pup", "name"],
		["接送时间", "", 2, "apomExam", "puptime"],
		["接送教练", "", 4, "apomExam", "coach", "personinfo", "name"]
	]);

	//教练员工资管理
	window.CoachMoney_Table_Con = GetThobj([
		["月份", "", 1, "date"],
		["教练员", "", 3, "coach", "personinfo", "name"],
		["固定工资", "", 1, "baseprice"],
		["招生提成", "", 1, "recprice"],
		["绩效工资", "", 1, "perprice"],
		["合计", "", 1, "sumprice"]
	]);
	
	//教练员照片信息
	window.coachPhoto_Table_Con = GetThobj([
		["教练姓名", "", 1, "name"],
		["教练照片", "", 1, "path"],
		["图片类型", "", 1, "reason"],
		["创建时间", "", 1, "createtime"]
	]);

	//结业证管理
	window.TrainingEnd_Table_Con = GetThobj([
		["全国统一编码", "", 1, "code"],
		["学员姓名", "", 1, "stuname"],
		["性别", "", 1, "sex"],
		["证件号", "", 1, "cardnum"],
		["培训车型", "", 1, "traintype"],
		["报名时间", "", 1, "signtime"],
		["证件编码", "", 1, "gracertnum"],
		["发放时间", "", 1, "grantdate"],
		["打印状态", "", 1, "printstatus"]
	], [
		["操作"],
		["stuid"],
		["Nocustom"],
		[
			["Graduate", "stuid"]
		]
	]);

	//班型管理
	window.product_Table_Con = GetThobj([
		["班型名称", "", 1, "course"],
		["班型编号", "", 1, "number"],
		["培训车型", "", 1, "cartype"],
		["标准价格", "", 1, "price"],
		["班型状态", "", 1, "status"],
		["所有者", "", 1, "owner"],
		["创建人", "", 1, "creator"],
		["创建时间", "", 1, "createtime"],
		["发布人", "", 1, "deployer"],
		["发布时间", "", 1, "deploytime"],
		["下线操作人", "", 1, "closer"],
		["下线时间", "", 1, "closetime"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["product", "id"]
		]
	]);

	//订单列表
	window.listOfOrders_Table_Con = GetThobj([
		["订单编号", "", 1, "ordercode"],
		["学员姓名", "", 1, "stuname"],
		["预约类型", "", 1, "appointtype"],
		["预约价格", "", 1, "scheduleprice"],
		//		["支付价格", "", 1, "payprice"],
		["支付渠道", "", 1, "paycanal"],
		["支付状态", "", 1, "paystatus"],
		["支付时间", "", 1, "paytime"],
		["创建时间", "", 1, "createtime"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["listOfOrders", "id"]
		]
	]);

	//教练预约记录
	window.coaAppointrecords_Table_Con = GetThobj([
		["驾校名称", "", 1, "schname"],
		["教练信息", "", 1, "coanp"],
		["学员信息", "", 1, "stunp"],
		["学员身份证号", "", 1, "cardnum"],
		["班型", "", 1, "chargename"],
		["有效学时", "", 1, "usedhour"],
		["标准价格", "", 1, "price"],
		["预约人数", "", 1, "apponum"],
		["实约人数", "", 1, "realapponum"],
		["预约状态", "", 1, "status"],
		["预约部分", "", 1, "course"],
		["预约子科目", "", 1, "subcourse"],
		["培训车型", "", 1, "traintype"],
		["车牌", "", 1, "licence"],
		["付款方式", "", 1, "paytype"],
		["学习时间", "", 1, "learntime"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["appointrecords", "id"]
		]
	]);

	//场地预约记录
	window.traAppointrecords_Table_Con = GetThobj([
		["预约部分", "", 1, "course"],
		["预约子科目", "", 1, "subcourse"],
		["预约状态", "", 1, "status"],
		["学员信息", "", 1, "stunp"],
		["培训车型", "", 1, "traintype"],
		["付款方式", "", 1, "paytype"],
		["成交价格", "", 1, "price"],
		["学习时间", "", 1, "learntime"],
		["培训场地", "", 1, "trainareaname"]
	], [
		["操作"],
		["id"],
		["Nocustom"],
		[
			["appointrecords", "id"]
		]
	]);

	//学员预约培训情况统计
	window.stuTraAndAppo_Table_Con = GetThobj([
		["学员姓名", "", 1, "name"],
		["身份证号", "", 1, "cardnum"],
		["已约课时（时）", "", 1, "appoedhour"],
		["已训课时（时）", "", 1, "trainedhour"],
		["未训课时（时）", "", 1, "notrainhour"]
	], []);

	//教练预约培训情况统计
	window.coaTraAndAppo_Table_Con = GetThobj([
		["教练姓名", "", 1, "name"],
		["身份证号", "", 1, "cardnum"],
		["培训人数", "", 1, "trainnum"],
		["已约课时（时）", "", 1, "appoedhour"],
		["已训课时（时）", "", 1, "trainedhour"],
		["未训课时（时）", "", 1, "notrainhour"]
	], []);
});
/*--------------------------------------------表格的内容--结束--------------------------------------------------------*/

/*--------------------------------------------table表头--开始--------------------------------------------------------*/
$(function() {

	//日志管理
	window.top.SysLogs_Table = GetTableTop("日志管理", []);

	//违规记录
	window.top.AreaManager_Table = GetTableTop("违规记录", []);

	//教练员教时统计
	window.top.CoachDaillyrec_Table = GetTableTop("教练员教时统计", []);

	//短信管理
	window.top.ShortMsg_Table = GetTableTop("短信管理", []);
	//教练车档案
	window.top.CarArchival_Table = GetTableTop("教练车档案", []);

	//规定项目
	window.top.StipulateProject_Table = GetTableTop("规定项目列表", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//维修保养
	window.top.MaintainUpkeep_Table = GetTableTop("维修保养列表", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//安全检测
	window.top.SafeCheck_Table = GetTableTop("安全检测列表", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//交通违法
	window.top.TrafficUnlaw_Table = GetTableTop("交通违法列表", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//事故记录
	window.top.AccidentRecord_Table = GetTableTop("事故记录列表", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//加油记录
	window.top.RefuelRecord_Table = GetTableTop("加油记录列表", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//巡检记录
	window.top.PollingRecord_Table = GetTableTop("巡检记录列表", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//评论
	window.comment_Table = GetTableTop("评论列表", []);

	//举报
	window.report_Table = GetTableTop("举报列表", []);

	//远程教育成绩
	window.RemoteEduGrade_Table = GetTableTop("自主评测成绩", []);

	//排班分组
	window.top.ScheduleArray_Table = GetTableTop("教练分组", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//场地模板
	window.top.SchScheduleModel_Table = GetTableTop("场地模板", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//教练模板
	window.top.CoaScheduleModel_Table = GetTableTop("教练模板", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//预约受理
	window.OrderAccept_Table = GetTableTop("信控管理信息", []);

	//主校模块
	window.School_Table = GetTableTop("驾校基础信息", [
		["AddTeachfa();", "fa fa-plus green", "质量信誉考核数据录入"],
		["selectTeachfa();", "fa fa-search blue", "质量信誉考核数据查询"]
	]);

	//分校模块
	window.SubSchool_Table = GetTableTop("分校基础信息", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//教学区域模块
	window.TeachSiteSel_Table = GetTableTop("教学场地信息", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//教练员模块
	window.Dr_Table = GetTableTop("教练员信息", [
		["searchByCard();", "fa fa-plus green", "读卡查询"],
		["getModalObj('add');", "fa fa-plus green", "增加"],
		["ShowExcelImport();", "fa fa-plus green", "导入"]
	]);

	//教练车模块
	window.CoachesManagement_Table = GetTableTop("教练车信息", [
		["getModalObj('add');", "fa fa-plus green", "增加"],
		["ShowExcelImport();", "fa fa-plus green", "导入"]
	]);

	//学员模块
	window.StudentManagement_Table = GetTableTop("学员基础信息", [
		["searchByCard();", "fa fa-plus green", "读卡查询"],
		["getModalObj('add');", "fa fa-plus green", "增加"],
		["ShowExcelImport();", "fa fa-plus green", "导入"]
	]);

	//学员档案管理
	window.studentArchival_Table = GetTableTop("学员档案信息", []);
	
	//学员档案管理
	window.stuContract_Table = GetTableTop("学员合同信息", [
		["alert('正在开发中');", "", "培训合同打印"],
		["alert('正在开发中');", "", "扫描件导入"]
	]);

	//学员培训记录
	window.TrainingRecords_Table = GetTableTop("学员培训记录", [
			["fss();", "fa fa-plus green", "审核模式设置"]
	]);

	//教练员档案管理
	window.coachArchival_Table = GetTableTop("教练员档案信息", []);

	//角色管理
	window.role_Table = GetTableTop("角色信息", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//用户管理
	window.user_Table = GetTableTop("用户信息", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//教练员数量统计
	window.DrStatistica_Table = GetTableTop("教练员数量统计", []);

	//教练车数量统计
	window.CoachesStatistical_Table = GetTableTop("教练车数量统计", []);

	//学员数量统计
	window.StudentStatistical_Table = GetTableTop("学员数量统计", []);

	//考核员模块
	window.Assessment_Table = GetTableTop("考核员管理", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//安全员
	window.Safement_Table = GetTableTop("安全员管理", [
		["getModalObj('add');", "fa fa-plus green", "增加"]
	]);

	//科目审核
	window.TrainingAudit_Table = GetTableTop("培训阶段审核", [
		["printHtml('personinfo')", "fa fa-print green", "第一部分打印"],
		["printHtml('course2')", "fa fa-print green", "第二部分打印"],
		["printHtml('course3')", "fa fa-print green", "第三部分打印"],
		["printHtml('newPrint')", "fa fa-print green", "打印(新大纲)"],
		//	["printHtml('courseAll')", "fa fa-print green", "打印所有"],
		//["singObjs.showModal()", "fa fa-plus green", "电子审核"],
		["Allaudit()", "fa fa-plus green", "审核"],
		["EXAllaudit()", "fa fa-plus green", "撤销审核"]
	]);

	//科目电子审核
	window.TrainingSign_Table = GetTableTop("培训阶段审核", [
		["printHtml('personinfo')", "fa fa-print green", "第一部分打印"],
		["printHtml('course2')", "fa fa-print green", "第二部分打印"],
		["printHtml('course3')", "fa fa-print green", "第三部分打印"],
		["printObj.newPrint()", "fa fa-print green", "打印(新大纲)"]
	]);

	//培训成绩确认
	window.TrainingConfirm_Table = GetTableTop("考试成绩确认", [
		["", "", "<input name='traiConFail' type='checkbox' class='checkClass traiConCheck' style='z-index:200;vertical-align:middle;top: -1px;' value='FAIL' />不合格"],
		["", "", "<input name='traiCon' type='checkbox' class='checkClass traiConCheck' style='z-index:200;vertical-align:middle;top: -1px;' value='Passed' />合格"],
		["", "", "<input name='traiConNone' type='checkbox' class='checkClass traiConCheck' style='z-index:200;vertical-align:middle;top: -1px;' value='Repassed'/>补考合格"],
		["isConfirm(this);", "fa fa-align-justify green", "确认"],
		["isCancle(this);", "fa fa-reply green", "撤消"]
	]);

	//培训统计
	window.TrainingStatistical_Table = GetTableTop("培训记录统计", []);

	//收费管理
	window.StudentChargeConfirm_Table = GetTableTop("收费管理", [
		//["Studentpay();", "fa fa-plus green", "增加"]
	]);
	//收费审核
	window.StudentChargeConfirms_Table = GetTableTop("收费管理", [
		//["Studentpay();", "fa fa-plus green", "增加"]
	]);


	//学员报名意向
	window.StudentSigninWill_Table = GetTableTop("学员报名意向", []);

	//学员证件有效期
	window.StudentExpireIdcard_Table = GetTableTop("学员证件有效期", []);

	//教练员身份证有效期
	window.coachExpireIdcard_Table = GetTableTop("教练员身份证有效期", []);

	//驾驶证有效期
	window.coachExpireDrilicence_Table = GetTableTop("驾驶证有效期", []);

	//教练证有效期
	window.coachExpireQualnum_Table = GetTableTop("教练证有效期", []);

	//道路运输证有效期
	window.coachExpireTransportno_Table = GetTableTop("道路运输证有效期", []);

	//学员考试统计
	window.StudentExamStatistical_Table = GetTableTop("学员考试统计", []);

	//学员送考统计
	window.StudentSendStatistical_Table = GetTableTop("学员送考统计", []);

	//招生统计
	window.EnrolStudentStatistical_Table = GetTableTop("招生统计", []);

	//学员预约列表
	window.StudentOrderList_Table = GetTableTop("学员预约列表", [
		["printStuOrderList()", "fa fa-reply green", "打印"]
	]);

	//学员收费管理
	window.StudentPay_Table = GetTableTop("学员收费管理", []);

	//收费统计
	window.StudentPayStatistical_Table = GetTableTop("收费统计", []);

	//学员约考管理
	window.TrainingOrder_Table = GetTableTop("学员约考管理", [
		["printTrainingOrderList()", "fa fa-reply green", "打印"],
		["ShowExcelImport();", "fa fa-plus green", "导入"]
	]);

	//学员约考信息
	window.TrainingOrderselect_Table = GetTableTop("学员约考信息", []);

	//教练员工资管理
	window.CoachMoney_Table = GetTableTop("教练员工资管理", []);
	
	//教练员照片信息
	window.coachPhoto_Table = GetTableTop("教练员照片信息", []);

	//结业管理
	window.TrainingEnd_Table = GetTableTop("结业证管理", [
		["printHtml('Register')", "fa fa-print green", "学员登记表打印"],
		["printHtml('EndPositive')", "fa fa-print green", "结业证正面打印"],
		["printHtml('EndBack')", "fa fa-print green", "结业证背面打印"]
	]);

	//班型管理
	window.product_Table = GetTableTop("班型管理", [
		["openTabPanels()", "fa fa-plus green", "增加"]
	]);

	//订单列表
	window.listOfOrders_Table = GetTableTop("订单列表", []);

	//教练预约记录
	window.coaAppointrecords_Table = GetTableTop("教练预约记录", []);

	//场地预约记录
	window.traAppointrecords_Table = GetTableTop("场地预约记录", []);

	//学员预约培训情况统计
	window.stuTraAndAppo_Table = GetTableTop("学员预约培训情况统计", []);

	//教练预约培训情况统计
	window.coaTraAndAppo_Table = GetTableTop("教练预约培训情况统计", []);
});
/*--------------------------------------------table表头--结束--------------------------------------------------------*/

/*--------------------------------------------表格的函数--开始--------------------------------------------------------*/
//获取th对象 ThDatath的对象   OperateData操作的对象 model对象
function GetThobj(ThData, OperateData, ModelData) {
	var ReThData = {}; //返回对象
	//判断是否需要添加model
	if (ModelData != "" && ModelData != undefined) {
		ReThData = {
			"data": []
		};
		ReThData["model"] = ModelData;
	} else {
		ReThData = {
			"data": []
		};
	}
	//定义data数组
	var data = [];

	for (var i = 0; i < ThData.length; i++) {
		switch (ThData[i][2]) {
			case 1:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3]));
				break;
			case 2:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4]));
				break;
			case 3:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5]));
				break;
			case 4:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5], ThData[i][6], ThData[i][7]));
				break;
			case 5:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5], ThData[i][6], ThData[i][7], ThData[i][8]));
				break;
			case 6:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5], ThData[i][6], ThData[i][7], ThData[i][8], ThData[i][9]));
				break;
		}
	}
	//判断是否有操作
	if (OperateData != "" && OperateData != undefined) {
		data.push(ReturnOperateObj(OperateData[0][0], OperateData[1][0], OperateData[2][0], OperateData[3]));
	}

	ReThData.data = data;
	return ReThData;
}

//获取th对象 操作在第一位
function GetThobj_Fist_Operate(ThData, OperateData,OperateData1, ModelData) {
	var ReThData = {};

	if (ModelData != "" && ModelData != undefined) {
		ReThData = {
			"data": []
		};
		ReThData["model"] = ModelData;
	} else {
		ReThData = {
			"data": []
		};
	}

	var data = [];

	if (OperateData != "" && OperateData != undefined) {
		data.push(ReturnOperateObj(OperateData[0][0], OperateData[1][0], OperateData[2][0], OperateData[3]));
	}

	for (var i = 0; i < ThData.length; i++) {
		switch (ThData[i][2]) {
			case 1:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3]));
				break;
			case 2:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4]));
				break;
			case 3:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5]));
				break;
			case 4:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5], ThData[i][6], ThData[i][7]));
				break;
			case 5:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5], ThData[i][6], ThData[i][7], ThData[i][8]));
				break;
			case 6:
				data.push(ReturnThObj(ThData[i][0], ThData[i][1], ThData[i][2], ThData[i][3], ThData[i][4], ThData[i][5], ThData[i][6], ThData[i][7], ThData[i][8], ThData[i][9]));
				break;
		}
	}

	if (OperateData1 != "" && OperateData1 != undefined) {
		data.push(ReturnOperateObj(OperateData1[0][0], OperateData1[1][0], OperateData1[2][0], OperateData1[3]));
	}
	ReThData.data = data;
	return ReThData;
}

//返回th对象
function ReturnThObj(Th, Title, KeysNum, KeysFist, KetysSecond, KeysThird, KeysFourth, KeysFifth, KeysSixth) {
	var ThData = {};
	switch (KeysNum) {
		case 1:
			ThData = {
				"th": Th,
				"title": Title,
				"jsonKey": {
					"keys": KeysFist,
					"subkey": "",
					"data": []
				}
			};
			break;
		case 2:
			ThData = {
				"th": Th,
				"title": Title,
				"jsonKey": {
					"keys": KeysFist,
					"subkey": {
						"keys": KetysSecond,
						"subkey": "",
						"data": []
					},
					"data": []
				}
			};
			break;
		case 3:
			ThData = {
				"th": Th,
				"title": Title,
				"jsonKey": {
					"keys": KeysFist,
					"subkey": {
						"keys": KetysSecond,
						"subkey": {
							"keys": KeysThird,
							"subkey": "",
							"data": []
						},
						"data": []
					},
					"data": []
				}
			};
			break;
		case 4:
			ThData = {
				"th": Th,
				"title": Title,
				"jsonKey": {
					"keys": KeysFist,
					"subkey": {
						"keys": KetysSecond,
						"subkey": {
							"keys": KeysThird,
							"subkey": {
								"keys": KeysFourth,
								"subkey": "",
								"data": []
							},
							"data": []
						},
						"data": []
					},
					"data": []
				}
			};
			break;
		case 5:
			ThData = {
				"th": Th,
				"title": Title,
				"jsonKey": {
					"keys": KeysFist,
					"subkey": {
						"keys": KetysSecond,
						"subkey": {
							"keys": KeysThird,
							"subkey": {
								"keys": KeysFourth,
								"subkey": {
									"keys": KeysFifth,
									"subkey": "",
									"data": []
								},
								"data": []
							},
							"data": []
						},
						"data": []
					},
					"data": []
				}
			};
			break;
		case 6:
			ThData = {
				"th": Th,
				"title": Title,
				"jsonKey": {
					"keys": KeysFist,
					"subkey": {
						"keys": KetysSecond,
						"subkey": {
							"keys": KeysThird,
							"subkey": {
								"keys": KeysFourth,
								"subkey": {
									"keys": KeysFifth,
									"subkey": {
										"keys": KeysSixth,
										"subkey": "",
										"data": []
									},
									"data": []
								},
								"data": []
							},
							"data": []
						},
						"data": []
					},
					"data": []
				}
			};
			break;
	}
	return ThData;
}

//返回操作Thobj
function ReturnOperateObj(Th, Keys, Type, Date) {
	var OperateData = {};
	switch (Type) {
		case "custom":
			OperateData = {
				"th": Th,
				"jsonKey": {
					"keys": Keys,
					"subkey": "",
					"data": forOperateData_custom(Date)
				}
			};
			break;
		case "Nocustom":
			OperateData = {
				"th": Th,
				"jsonKey": {
					"keys": Keys,
					"subkey": "",
					"data": forOperateData(Date)
				}
			};
			break;
		case "custom_notype":
			OperateData = {
				"th": Th,
				"jsonKey": {
					"keys": Keys,
					"subkey": "",
					"data": forOperateData_custom_notype(Date)
				}
			};
			break;
	}
	return OperateData;
}

//循环获取操作的Nocustom Data数据
function forOperateData(Operatedata) {
	var Data = [];
	for(var i = 0; i < Operatedata.length; i++) {
		Data.push({
			"type": Operatedata[i][0],
			"keys": [{
				"name": Operatedata[i][1]
			}]
		});
	}
	return Data;
}

//循环获取操作的custom Data数据
function forOperateData_custom(Operatedata) {
	var Data = [];
	for (var i = 0; i < Operatedata.length; i++) {
		Data.push({
			"type": Operatedata[i][0],
			"keys": [Operatedata[i][1]]
		});
	}
	return Data;
}

//循环获取操作的custom_notype Data数据
function forOperateData_custom_notype(Operatedata) {
	var Data = [];
	for (var i = 0; i < Operatedata.length; i++) {
		Data.push(
			Operatedata[i][0]
		);
	}
	return Data;
}

/*--------------------------------------------表格的函数--结束--------------------------------------------------------*/

/*--------------------------------------------表头的函数--开始--------------------------------------------------------*/

//获取table上方按钮和title
function GetTableTop(Title, ButtonData) {
	var TableTop = {}; //定义对象
	TableTop = {
		"title": Title,
		"data": ReTableButton(ButtonData)
	};
	return TableTop; //返回对象
}

//获取button
function ReTableButton(ButtonData) {
	var Data = []; //定义数组
	//遍历
	for (var i = 0; i < ButtonData.length; i++) {
		Data.push({
			"onclik": ButtonData[i][0],
			"icon": ButtonData[i][1],
			"title": ButtonData[i][2]
		});
	}
	return Data; //返回数组
}

/*--------------------------------------------表头的函数--结束--------------------------------------------------------*/