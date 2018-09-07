function update(Data) {
	var type = UrlValue("v");
	switch (type) {
		case "RefuelRecord": //加油记录
		case "PollingRecord": //巡检记录
		case "AccidentRecord": //事故记录
		case "TrafficUnlaw": //交通违法
		case "SafeCheck": //安全检测
		case "MaintainUpkeep": //维修保养
			_update["MaintainUpkeep"](Data);
			break;
		case "CarArchival": //教练车档案
		case "StipulateProject": //规定项目
			_update["StipulateProject"](Data);
			break;
		default:
			_update[type] != undefined ? _update[type](Data) : console.info("update.js _update is not find-->" + type);
			break;
	}
}

var _update = {
	TrainingOrder: function(Data) {
		_From2Json.setData(Data.data);
		var ApomExams = Data.data.ApomExams;
		if (ApomExams && ApomExams.length > 0) {
			var htmlstr = "",
				coaname;
			var _short = 1;
			/*var name = $("#Sm_name").val();
			var cardnum = $("#Sm_cardnum").val();
			var mobile = $("#Sm_mobile").val();*/
			ApomExams.forEach(function(t) {
				htmlstr += "<tr>";
				htmlstr += "<td>" + _short + "</td>";
				htmlstr += "<td>" + getCourse((t["subject"] || "")) + "</td>";
				htmlstr += "<td>" + t["examtime"] + "</td>";
				/*htmlstr += "<td>"+name+"</td>";
				htmlstr += "<td>"+cardnum+"</td>";
				htmlstr += "<td>"+mobile+"</td>";*/
				htmlstr += "<td>" + (t["pup"] || "") + "</td>";
				htmlstr += "<td>" + (t["puptime"] || "") + "</td>";
				coaname = "";
				if (t["coach"]) {
					coaname = t["coach"]["personinfo"]["name"]
				}
				htmlstr += "<td>" + coaname + "</td>";
				htmlstr += "<td>" + (t["examplace"] || "") + "</td>";
				//htmlstr += "<td>" + (t["exaroom"] ? t["exaroom"]["name"] : "") + "</td>";
				htmlstr += "</tr>";
				_short++
			})
			$("#studyorderTb>tbody").empty().append(htmlstr);
		}
	},
	MaintainUpkeep: function(Data) {
		var $fgls = $("#registrationForm>.form-group");
		var albumid = "",
			subimg_album = "";
		PageUtils.data2Page($fgls, Data.data);
		$("#Md_licnum").val(Data.data.carinfo.licnum).attr("disabled", true);
		var k = "album",
			subimg_initialPreviewData = [],
			subimg_initialPreviewConfigData = [];
		//相册
		var subimg_paramObj = {}; //相册上传参数
		subimg_paramObj["async"] = false; //同步操作
		subimg_paramObj["dropZoneTitle"] = "相册图片上传";
		subimg_paramObj["inputid"] = "albumInput";
		if (Data.data[k] && Data.data[k]["photos"]) {
			var aid = Data.data[k].id;
			subimg_album = {
				"id": aid,
				"photos": []
			};
			albumid = aid;
			for (var y = 0; y < Data.data[k]["photos"].length; y++) {
				var fileUrl = Data.data[k]["photos"][y]["file"]["fileurl"];
				var id = Data.data[k]["photos"][y]["file"]["id"];
				var title = Data.data[k]["photos"][y]["file"]["title"];
				subimg_initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
				subimg_initialPreviewConfigData.push({
					caption: title,
					url: '/rmwebapp/album/' + Data.data[k]["photos"][y]["id"],
					key: "album|" + Data.data[k]["photos"][y]["id"],
					extra: {
						id: id
					}
				});
			}
			subimg_paramObj["initialPreview"] = subimg_initialPreviewData;
			subimg_paramObj["initialPreviewConfig"] = subimg_initialPreviewConfigData;
			subimg_paramObj["album"] = albumid;
		}
		//初始化图片
		if (albumid != "") {
			uploadInit("albumUpload", IP + "/rmwebapp/file/branch-filesupload-with-thumbnail-50", uploadSuccCB_updates, deleteCB, subimg_paramObj);
		} else {
			uploadInit("albumUpload", IP + "/rmwebapp/file/branch-filesupload-with-thumbnail-50", uploadSuccCBs, deleteCB, subimg_paramObj);
		}
		$("#" + subimg_paramObj["inputid"]).val((subimg_album == "" ? "" : JSON.stringify(subimg_album)));
	},
	StipulateProject: function(Data) {
		var $fgls = $("#registrationForm>.form-group");
		PageUtils.data2Page($fgls, Data.data);
		$("#Md_licnum").val(Data.data.carinfo.licnum).attr("disabled", true);
	},
	School: function(Data) {
		var scopeList = [];
		$.cookie("district", Data.data["district"]["id"]);
		SetCodeColor(Data.data["code"], Data.data["record"]);
		for (var s = 0; s < Data.data["scopeList"].length; s++) {
			scopeList.push(Data.data["scopeList"][s]["scopeType"]);
		}
		_From2Json.setData(Data.data);

		$(".kv-file-remove.btn.btn-xs.btn-default").click(function(e) {
			var phoid = ($(this).attr("data-key")).split("|");
			phoid[0] == "album" ? "" : $("#" + phoid[0]).val("null");
		});

		$("#Md_busiscope").select2({
			placeholder: "请点击添加",
			allowClear: true
		});

		$("#Md_busiscope").select2("val", scopeList);
	},
	SubSchool: function(Data) {
		_From2Json.setData(Data.data);
		SetCodeColor(true, Data.data["record"]);
		$.cookie("subSchoolup", Data.data["school"]["id"]);
		$.cookie("district", Data.data["district"]["id"]);

		ServiceTpl.data2Tb(Data.data["services"], '#featuretb');
		ChargesTpl.data2Tb(Data.data["charges"], '#feetable');
		
		//默认图片返回值
		phoDelarray = []; //清空
		$(".kv-file-remove.btn.btn-xs.btn-default").click(function(e) {
			var phoid = ($(this).attr("data-key")).split("|");
			phoid[0] == "album" ? phoDel(phoid[1]) : $("#" + phoid[0]).val("null");
		});
	},
	TeachSiteSel: function(Data) {
		var cartype = [];
		_From2Json.setData(Data.data);
		SetCodeColor(true, Data.data["record"]);
		if (Data.data["polygon"] && Data.data["polygon"] != "") {
			ordernation = Data.data["polygon"];
			$("#Md_polygon").val(ordernation);
			var pathArr = ordernation.replace(/\(|\)/ig, "").split(",");
			var path = []
			for (var i = 0; i < pathArr.length; i = i + 2) {
				path.push([pathArr[i], pathArr[i + 1]])
			}
			var polygon = new AMap.Polygon({
				map: editorTool,
				path: path,
				strokeColor: "#52ACFA",
				strokeOpacity: 1,
				strokeWeight: 3,
				fillColor: "#52ACFA",
				fillOpacity: 0.35
			});
			editorTool.panTo([pathArr[0], pathArr[1]]);
		}
		var arrays = Data.data["vehicletype"];
		var arrays1 = [];
		if (arrays != null) {
			arrays1 = arrays.split(",");
		}
		$("#Md_vehicletype").val(arrays1);

		$("#Md_vehicletype").select2({
			placeholder: "请点击添加",
			allowClear: true
		});
	},
	Dr: function(Data) {
		try {
			var ajaxurl = IP + '/rmwebapp/sch/brsch-' + Data.data.brsch.id + '/branchCharge/trcarea';
			PageUtils.getJson(ajaxurl, PageUtils.makeSelectStr, {
				selectors: ['#Md_tra']
			}).done(function() {
				if (Data.data.tra === null) {
					$('#Md_tra').select2('val', '0');
				} else {
					$('#Md_tra').select2('val', Data.data.tra.id);
				}
			})
		} catch (e) {
			$('#Md_tra').select2('val', '0');
			console.log(e);
		}

		SetCodeColor(Data.data["code"], Data.data["record"]);

		_From2Json.setData(Data.data);
		dripermittedChangeteachpermitted("Md_dripermitted", "Md_teachpermitted");
		$("#Md_teachpermitted").select2("val", Data.data["teachpermitted"]);

		ServiceTpl.data2Tb(Data.data["services"], '#featuretb');
		ChargesTpl.data2Tb(Data.data["charges"], '#feetable');

		phoDelarray = []; //清空
		$(".kv-file-remove.btn.btn-xs.btn-default").click(function(e) {
			var phoid = ($(this).attr("data-key")).split("|");
			phoid[0] == "album" ? phoDel(phoid[1]) : $("#" + phoid[0]).val("null");
		});

		_repetitions.SetVal({
			id: "Md_mobile",
			OldVal: Data.data["personinfo"]["mobile"]
		});
		_repetitions.SetVal({
			id: "Md_cardnum",
			OldVal: Data.data["personinfo"]["cardnum"]
		});
		_CardValid($("#Md_cardtype").val());
	},
	CoachesManagement: function(Data) {
		_From2Json.setData(Data.data["carinfo"]);
		if(Data.data.carinfo.issimulate==0){
			SetCodeColor(Data.data.carinfo["code"], Data.data.carinfo["record"]);
		}else{
			$(".modal-footer").find('.btn-success').addClass('hidden')
		}

		phoDelarray = []; //清空
		$(".kv-file-remove.btn.btn-xs.btn-default").click(function(e) {
			var phoid = ($(this).attr("data-key")).split("|");
			//phoid[0] == "album" ? phoDel(phoid[1]) : $("#" + phoid[0]).val("null");
			if (phoid[0] == "album") {
				phoDel(phoid[1]);
				var obj,
					delIndex, val = $("#cmimg").val();
				if (val != '') {
					obj = eval("(" + val + ")");
				};
				if (obj) {
					for (var i = 0; i < obj.photos.length; i++) {
						if (parseInt(phoid[1]) == obj.photos[i].file.id) {
							delIndex = i;
							break;
						}
					}
					delIndex != undefined ? obj.photos.splice(delIndex, 1) : "";
				}
				$("#cmimg").val(JSON.stringify(obj));

			} else {
				$("#" + phoid[0]).val("null");
				$("#carimg").val('');
			}

		});

		_repetitions.SetVal({
			id: "Md_licnum",
			OldVal: Data.data["carinfo"]["licnum"]
		});
	},
	StudentManagement: function(Data) {
		SetTableInput(true); //班型
		_From2Json.setData(Data.data);

		//获取对应车型的班型，并回显数据
		var turl = IP + "/rmwebapp/sch/brsch/charge/" + _cookie.brschid + "/" + Data.data["traintype"];
		var sah = Data.data["sah"],
			$htb = $('#hour_table');
		ajax_select_traintype(turl, "brccharge").done(function() {
			if (sah && sah["charge"]) {
				for (var index in sah) {
					if ($.type(sah[index]) !== 'object') {
						sah["charge"][index] = sah[index];
					}
				}
				SetHourVal(sah["charge"]);

				$("#Sm_brccharge").select2('val', sah["charge"]["id"]);
				if (sah["charge"]["id"] !== '0') {
					$htb.css('display', 'block').prev('div.form-group.has-feedback').removeClass('hidden');
				}else{
					$htb.prev('div.form-group.has-feedback').addClass('hidden');
				}
				$("#Sm_money").val(sah["charge"]["price"]);
				// if($("#Sm_brccharge").val()==null){
				// 	var changeObj=$.extend({},sah,sah["charge"]);
				// 	delete changeObj.charge;
				// 	var $option ='<option value="'+changeObj.id+'">'+changeObj.course+'</option>';
				// 	$option.data("listitem",changeObj);
				// 	$("#Sm_brccharge").append($option).select2('val', changeObj.id);
				// }
			}

		})

		SetCodeColor(Data.data["code"], Data.data["record"]);

		_repetitions.SetVal({
			id: "Sm_mobile",
			OldVal: Data.data["personinfo"]["mobile"]
		});
		_repetitions.SetVal({
			id: "Sm_cardnum",
			OldVal: Data.data["personinfo"]["cardnum"]
		});
		_CardValid($("#Sm_cardtype").val());

		//根据是否备案决定证件号是否可编辑
		Data.data.code != "0" ? '' : $("#Sm_cardnum").removeAttr('readonly');
	},
	role: function(Data) {
		_From2Json.setData(Data.data);
	},
	user: function(Data) {
		_From2Json.setData(Data.data);
		_repetitions.SetVal({
			id: "Sm_username",
			OldVal: Data.data["username"]
		});
		modal_ToSelect2(getModalconObj("update"));
	},
	Assessment: function(Data) {
		SetCodeColor(Data.data["code"], Data.data["record"]);
		_From2Json.setData(Data.data);
		_repetitions.SetVal({
			id: "Sm_cardnum",
			OldVal: Data.data["personinfo"]["cardnum"]
		});

		$(".kv-file-remove.btn.btn-xs.btn-default").click(function(e) {
			var phoid = ($(this).attr("data-key")).split("|");
			phoid[0] == "album" ? "" : $("#" + phoid[0]).val("null");
		});
		modal_ToSelect2(getModalconObj("update"));
	},
	Safement: function(Data) {
		SetCodeColor(Data.data["code"], Data.data["record"]);
		_From2Json.setData(Data.data);
		_repetitions.SetVal({
			id: "Sm_cardnum",
			OldVal: Data.data["personinfo"]["cardnum"]
		});
		modal_ToSelect2(getModalconObj("update"));
	},
	SchScheduleModel: function(Data) {
		var tratem = Data.data.tratem;
		var detailstatus = tratem["detailstatus"];
		//生成基础信息
		$("#Sm_braid").val(tratem["braid"]).trigger("change");
		delete tratem["braid"];
		delete tratem["detailstatus"];
		PageUtils.data2Form($("#registrationForm"), tratem);

		//生成精细排班
		PageUtils.makeJxRows(detailstatus, Data.data.dettems);
		//精细排班教练场不可编辑
		$('#hour_table select[name="trainareaid"]').attr("disabled", true)
	},
	CoaScheduleModel: function(Data) {
		var coatem = Data.data.coatem;
		var detailstatus = coatem["detailstatus"];
		//生成基础信息
		$("#Sm_braid").val(coatem["braid"]).trigger("change");
		delete coatem["braid"];
		delete coatem["detailstatus"];
		PageUtils.data2Form($("#registrationForm"), coatem);

		//生成精细排班
		PageUtils.makeJxRows(detailstatus, Data.data.dettems);
	},
	StudentChargeConfirm: function(Data) {
		_Student = Data.data;
		$("#Sm_name").val(Data.data["student"]["personinfo"]["name"]);
		$("#Sm_name").attr("disabled", true);
		$("#Sm_chargetype").val(Data.data["chargetype"]);
		$("#Sm_chargetype").select2();
		$("#Sm_money").val(Data.data["money"]);
		$("#Sm_paystatus").val(Data.data["paystatus"]);
		$("#Sm_paystatus").select2();
	}
}


var phoDelarray = [];

function phoDel(id) {
	phoDelarray.push(Number(id));
}


function SetCodeColor(code, record) {
	var h5 = $(".form-title h5")[0];
	$(h5).parent().find('span').remove();
	var codeStr = "";
	var recordStr = "";
	code == "0" ? codeStr = "<span style='color:#024BB5;font-weight:bold;margin-left: 8px;'>全国统一编码：</span><span name='_code' data-code='"+code+"' style='color:#F00;font-weight:bold'  >暂无</span>" : codeStr = "<span style='color:#024BB5;font-weight:bold;margin-left: 8px;'>全国统一编码：</span><span name='_code' data-code='"+code+"' style='color:#024BB5;font-weight:bold' >" + code + "</span>";
	record == "SUCCESS" ? recordStr = "<span style='color:#024BB5;font-weight:bold;margin-left: 15px;'>备案状态：</span><span  name='_record' data-record='"+record+"' style='color:#024BB5;font-weight:bold' >已备案</span>" : recordStr = "<span style='color:#024BB5;font-weight:bold;margin-left: 15px;'>备案状态：</span><span name='_record' data-record='"+record+"' style='color:#F00;font-weight:bold' >未备案</span>";
	code===true?codeStr="<span style='color:#024BB5;font-weight:bold;margin-left: 8px;display:none'>全国统一编码：</span><span name='_code' data-code='"+code+"' style='color:#024BB5;font-weight:bold;display:none' ></span>":"";
	$(h5).parent().append(codeStr + recordStr);
}