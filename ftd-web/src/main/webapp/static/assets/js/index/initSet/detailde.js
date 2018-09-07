function detailde(Data) {
	var type = UrlValue("v");
	switch (type) {
		case "SubSchool": //分校模块
			SubSchool_Detailde(Data);
			break;
		case "TeachSiteSel": //教学区域
			TeachSiteSel_Detailde(Data);
			break;
		case "Dr": //教练员模块
			Dr_Detailde(Data);
			break;
		case "CoachesManagement": //教练车模块
			CoachesManagement_Detailde(Data);
			break;
		case "role": //角色模块
			Role_Detailde(Data);
			break;
		case "user": //用户模块
			User_Detailde(Data);
			break;
	}
	HideDiv("Obstruct"); //隐藏div
}

//分校模块
var SubSchool_Detailde = function(Data) {
	var initialPreviewData = []; //图片url数组
	var initialPreviewConfigData = []; //图片配置
	var defimg_initialPreviewData = []; //图片url数组
	var defimgid = ""; //id
	var defimg_initialPreviewConfigData = []; //图片配置
	var albumid = "";
	for (var k in Data.data) {
		if (k === "") {

		} else if (k === "album") {
			if (Data.data[k] && Data.data[k]["photos"]) {
				var imgs = Data.data[k]["photos"]
				for (var i = 0; i < imgs.length; i++) {
					var fileUrl = imgs[i]["file"]["fileurl"];
					var title = Data.data[k]["photos"][i]["file"]["title"];
					initialPreviewData.push("<img src='" + fileUrl + "' class='file-preview-image' alt='暂无图片' title='" + title + "'>");
					initialPreviewConfigData.push({
						caption: title
					});
				}
			}
		} else if (k == "defaultimg") {
			if (Data.data[k]) {
				var fileUrl = Data.data[k]["fileurl"];
				var title = Data.data[k]["title"];
				var id = Data.data[k]["id"];
				defimgid = {
					"id": id
				};
				defimg_initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
				defimg_initialPreviewConfigData.push({
					caption: title,
					url: '/rmwebapp/album/' + id,
					key: id,
					extra: {
						id: id
					}
				});
			}
		} else if (k == "charges") {
			ChargesTpl.data2Tb(Data.data["charges"], '#feetable');

		} else if (k === "services") {
			ServiceTpl.data2Tb(Data.data["services"], '#featuretb');
			
		} else if (k == "briefintroduce") {
			$("#schoolabstract").code(Data.data[k]);
		} else {
			$("#Md_" + k).val(Change(Data.data[k]));
			$("#Md_" + k).attr("readonly", true);
		}
	}

	var paramObj = {}; //相册上传参数
	paramObj["initialPreview"] = initialPreviewData;
	paramObj["initialPreviewConfig"] = initialPreviewConfigData;
	paramObj["showRemove"] = false;
	paramObj["showUpload"] = false;
	paramObj["showClose"] = false;
	paramObj["initialPreviewShowDelete"] = false;
	paramObj["isDetail"] = true;
	paramObj["dropZoneTitle"] = "分校相册";

	//默认照片
	var defimg_paramObj = {}; //默认照片上传参数
	defimg_paramObj["async"] = false; //同步操作
	defimg_paramObj["inputid"] = "defaultimgDetail";
	defimg_paramObj["initialPreview"] = defimg_initialPreviewData;
	defimg_paramObj["initialPreviewConfig"] = defimg_initialPreviewConfigData;
	defimg_paramObj["dropZoneTitle"] = "网站默认图片";
	defimg_paramObj["showRemove"] = false;
	defimg_paramObj["showUpload"] = false;
	defimg_paramObj["showClose"] = false;
	defimg_paramObj["initialPreviewShowDelete"] = false;
	defimg_paramObj["isDetail"] = true;
	defimg_paramObj["dropZoneTitle"] = "网点默认照片";

	//初始化图片
	uploadInit("dsubimg", IP + "/rmwebapp/file/branch-filesupload-with-thumbnail-50", function() {}, function() {}, paramObj);
	//默认图片
	uploadInit("defimgDetail", IP + "/rmwebapp/file/branch-filesupload-with-thumbnail-50", function() {}, function() {}, defimg_paramObj);

};

//教学区域模块
var TeachSiteSel_Detailde = function(Data) {
	for (var k in Data.data) {
		if (k === "brsch") {
			for (var i in Data.data[k]) {
				$("#Md_" + i).val(Change(Data.data[k][i]));
			}
		} else {
			$("#Md_" + k).val(Change(Data.data[k]));
		}
	}
	console.info(JSON.stringify(Data.data));
	modal_ToSelect2(getModalconObj("update"));
	modal_ToData(getModalconObj("update"));
};

//教练员模块
var Dr_Detailde = function(Data) {
	var Drdripermitted = "";
	var initialPreviewData = []; //图片url数组
	var oldealbum = {}; //id
	var initialPreviewConfigData = []; //图片配置
	var album = "";

	var defaultimgid = {}; //网站默认图片上传参数
	var def_oldid = ""; //照片id
	var defaultimgid_paramObj = {}; //相册上传参数
	defaultimgid_paramObj["async"] = false; //同步操作
	defaultimgid_paramObj["inputid"] = "defmg";
	var defaultimgid_initialPreviewData = []; //图片url数组
	var defaultimgid_initialPreviewConfigData = []; //图片配置

	var licensefid = {}; //网站默认图片上传参数
	var lic_oldid = ""; //照片id
	var licensefid_paramObj = {}; //相册上传参数
	licensefid_paramObj["async"] = false; //同步操作
	licensefid_paramObj["inputid"] = "limg";
	var licensefid_initialPreviewData = []; //图片url数组
	var licensefid_initialPreviewConfigData = []; //图片配置

	teachpermitted = Data.data.dripermitted;
	for (var k in Data.data) {
		if (k === "personinfo") {
			for (var i in Data.data[k]) {
				if (i == "file") {
					if (Data.data[k][i] != null && (Data.data[k][i].fileurl != "" || Data.data[k][i].fileurl != null)) {
						//$("#imagefile").attr("src", "/rmwebapp" + Data.data[k][i].fileurl);
						$("#imagefile").attr("src", Data.data[k][i].fileurl);
					} else {
						$("#photo-desc").html("暂无照片！");
					}
				} else {
					$("#Md_" + i).val(Change(Data.data[k][i]));
					$("#Md_" + i).attr("readonly", true);
				}
			}
		} else if (k == "charges") {
			
			var $tb = $("#feetable");
			$tb.prevAll('a').remove();
			ChargesTpl.data2Tb(Data.data["charges"]);
			$tb.find('select[name],input[name]').prop('disabled', true);
			$tb.find('.delete').removeAttr('onclick');

		} else if (k === "services") {
			ServiceTpl.data2Tb(Data.data["services"], '#featuretb');
		} else if (k === "brsch") {
			//alert(Data.data[k]["id"]);
			$("#Sm_id").val(Data.data[k]["name"]);
			$("#Sm_id").attr("readonly", true);
		} else if (k === "advertisement") {
			$("#padvertise").val(Data.data[k])
			$("#padvertise").attr("readonly", "readonly")
		} else if (k == "introduction") {
			$("#cabstracteditor").code(Data.data[k]);
			$("#cabstracteditor").parent().find("div.note-editable").attr("contenteditable", false)

		} else if (k == "album") {
			if (Data.data[k] && Data.data[k]["photos"]) {
				oldealbum = Data.data[k];
				album = Data.data[k].id
				for (var y = 0; y < Data.data[k]["photos"].length; y++) {
					var fileUrl = Data.data[k]["photos"][y]["file"]["fileurl"];
					var title = Data.data[k]["photos"][y]["file"]["title"];
					var id = Data.data[k]["photos"][y]["file"]["id"];
					initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
					initialPreviewConfigData.push({
						caption: title,
						url: '/rmwebapp/album/' + Data.data[k]["photos"][y]["id"],
						key: id,
						extra: {
							id: id
						}
					});
				}
			}
		} else if (k == "defaultimg") {
			if (Data.data[k]) {
				var fileUrl = Data.data[k]["fileurl"];
				var title = Data.data[k]["title"];
				var id = Data.data[k]["id"];
				def_oldid = {
					"id": id
				};
				defaultimgid_initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
				defaultimgid_initialPreviewConfigData.push({
					caption: title,
					url: '/rmwebapp/album/' + id,
					key: id,
					extra: {
						id: id
					}
				});
			}
		} else if (k == "licensefile") {
			if (Data.data[k]) {
				var fileUrl = Data.data[k]["fileurl"];
				var title = Data.data[k]["title"];
				var id = Data.data[k]["id"];
				lic_oldid = {
					"id": id
				};
				licensefid_initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片'  title='" + title + "'>");
				licensefid_initialPreviewConfigData.push({
					caption: title,
					url: '/rmwebapp/album/' + id,
					key: id,
					extra: {
						id: id
					}
				});
			}
		} else if (k === "car") {
			//教练车
			if (Data.data[k] != null) {
				$("#Md_car").val(Data.data[k]["licnum"]);
			}
		} else if (k === "tra") {
			//教练场
			if (Data.data[k] != null) {
				$("#Md_tra").val(Data.data[k]["name"]);
			}
		} else {
			$("#Md_" + k).val(Change(Data.data[k]));
			$("#Md_" + k).attr("readonly", true);
			if (k == "code") {
				SetCodeColor(Data.data[k],Data.data["record"]);
			}
		}
	}
	var paramObj = {}; //相册上传参数
	paramObj["async"] = false; //同步操作
	paramObj["inputid"] = "cimg";
	paramObj["initialPreview"] = initialPreviewData;
	paramObj["initialPreviewConfig"] = initialPreviewConfigData;
	paramObj["album"] = album;
	paramObj["isDetail"] = true;
	paramObj["dropZoneTitle"] = "教练员相册";
	paramObj["initialPreviewShowDelete"] = false;

	//驾驶证数据
	licensefid_paramObj["initialPreview"] = licensefid_initialPreviewData;
	licensefid_paramObj["initialPreviewConfig"] = licensefid_initialPreviewConfigData;
	licensefid_paramObj["isDetail"] = true;
	licensefid_paramObj["dropZoneTitle"] = "驾驶证照";
	licensefid_paramObj["initialPreviewShowDelete"] = false;
	//首页图片
	defaultimgid_paramObj["initialPreview"] = defaultimgid_initialPreviewData;
	defaultimgid_paramObj["initialPreviewConfig"] = defaultimgid_initialPreviewConfigData;
	defaultimgid_paramObj["isDetail"] = true;
	defaultimgid_paramObj["dropZoneTitle"] = "首页图片";
	defaultimgid_paramObj["initialPreviewShowDelete"] = false;

	//相册初始化图片
	uploadInit("cpersonalimg", IP + "/rmwebapp/file/coach-filesupload-with-thumbnail-50", function() {}, function() {}, paramObj);
	//证件照图片上传
	uploadInit("licensefid", IP + "/rmwebapp/file/coach-filesupload-with-thumbnail-50", function() {}, function() {}, licensefid_paramObj);
	//初始化网站默认图片上传
	uploadInit("defaultimgid", IP + "/rmwebapp/file/coach-filesupload-with-thumbnail-50", function() {}, function() {}, defaultimgid_paramObj);
};

//教练车模块
var CoachesManagement_Detailde = function(Data) { //SchDataByTtpe("id");
	var initialPreviewData = []; //图片url数组
	var initialPreviewConfigData = []; //图片配置
	var oldalbum = {};

	var initialPreviewDataZh = [];
	var initialPreviewConfigDataZh = [];

	var Zhid;
	var album = "";
	for (var k in Data.data.carinfo) {
		if (k === "brsch") {
			//					for (var i in Data.data.carinfo[k]) {
			//						$("#Md_" + i).val(Change(Data.data.carinfo[k][i]));
			//						$("#Md_" + i).attr("readonly", true)
			//					}
			$("#Md_id").val(Data.data.carinfo[k]["name"]);
			$("#Md_id").attr("readonly", true)
		} else if (k === "file") {
			if (Data.data.carinfo[k] != null) {
				//$("#imagefile").attr("src", "/rmwebapp" + Data.data[k].fileurl);
				$("#imagefile").attr("src", Data.data.carinfo[k].fileurl);
				if (Data.data.carinfo[k] && Data.data.carinfo[k]["id"]) {
					var fileUrl = Data.data.carinfo[k]["fileurl"];
					var title = Data.data.carinfo[k]["title"];
					var id = Data.data.carinfo[k]["id"];
					Zhid = {
						"id": id
					};
					initialPreviewDataZh.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
					initialPreviewConfigDataZh.push({
						caption: title,
						url: '/rmwebapp/album/' + id,
						key: id,
						extra: {
							id: id
						}
					});
				}
			} else {
				$("#photo-desc").html("暂无照片！");
			}
		} else if (k == "album") {
			if (Data.data.carinfo[k] && Data.data.carinfo[k]["photos"]) {
				oldalbum = Data.data.carinfo[k];
				album = Data.data.carinfo[k].id;
				for (var y = 0; y < Data.data.carinfo[k]["photos"].length; y++) {
					var fileUrl = Data.data.carinfo[k]["photos"][y]["file"]["fileurl"];
					var title = Data.data.carinfo[k]["photos"][y]["file"]["title"];
					var id = Data.data.carinfo[k]["photos"][y]["file"]["id"];
					initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
					initialPreviewConfigData.push({
						caption: title,
						url: '/rmwebapp/album/' + id,
						key: id,
						extra: {
							id: id
						}
					});
				}
			}
		} else {
			$("#Md_" + k).val(Change(Data.data.carinfo[k]));
			$("#Md_" + k).attr("readonly", true);
			if (k == "code") {
				SetCodeColor(Data.data.carinfo[k],Data.data.carinfo["record"]);
			}
		}
	}

	var paramObj = {}; //相册上传参数
	paramObj["async"] = false; //同步操作
	paramObj["inputid"] = "cmimgDetail";
	paramObj["initialPreview"] = initialPreviewData;
	paramObj["initialPreviewConfig"] = initialPreviewConfigData;
	paramObj["initialPreviewShowDelete"] = false;
	paramObj["isDetail"] = true;
	paramObj["dropZoneTitle"] = "教练车相册";
	paramObj["album"] = album;

	var paramObjcar = {}; //相册上传参数
	paramObjcar["async"] = false; //同步操作
	paramObjcar["inputid"] = "carimgcdetail";
	paramObjcar["initialPreview"] = initialPreviewDataZh;
	paramObjcar["initialPreviewConfig"] = initialPreviewConfigDataZh;
	paramObjcar["initialPreviewShowDelete"] = false;
	paramObjcar["isDetail"] = true;
	paramObjcar["dropZoneTitle"] = "教练车正面照";
	paramObjcar["album"] = album;

	uploadInit("carimgcdetail", IP + "/rmwebapp/file/carinfo-filesupload-with-thumbnail-50", function() {}, function() {}, paramObjcar);
	uploadInit("cmpersonalimgDetail", IP + "/rmwebapp/file/carinfo-filesupload-with-thumbnail-50", function() {}, function() {}, paramObj);
	modal_ToSelect2(getModalconObj(_CoachesManagement.obj.btntype));
};

//学员模块
var StudentManagement_Detailde = function(Data) {
	var brccharges; //收费标准
	for (var k in Data.data) {
		if (k === "personinfo" || k === "statusstamp" || k === "brid") {
			for (var i in Data.data[k]) {
				if (i == "file") {

				} else if (i == "fingerprint") {
					$("#fingerValue").val(Data.data[k][i]);
				} else {
					if (Data.data[k]) {
						$("#Sm_" + i).val(Data.data[k][i]);
					}
				}

			}
		} else if (k === "coach") {
			//alert(Data.data[k]["id"]);
			//alert(Data.data[k]);
			if (Data.data[k] && Data.data[k] != "null" && Data.data[k] != null && Data.data[k] != "NULL") {
				$("#Sm_id").val(Data.data[k]["id"]);
			}

		} else if (k === "brcrecruit") {
			//alert(Data.data[k]["id"]);
			if (Data.data[k]) {
				$("#Sm_" + k).val(Data.data[k]["id"]);
			}

		} else if (k === "brccharge") {
			//alert(Data.data[k]["price"]);
			if (Data.data[k]) {
				brccharges = Data.data[k]["id"] + "_" + Data.data[k]["price"];
				$("#Sm_money").val(Data.data[k]["price"]);
			}

		} else {
			if (k === "traintype") {
				ajax_select_traintype(IP + "/rmwebapp/sch/brsch/charge/" + _cookie.brschid + "/" + Data.data[k], "brccharge");
				$("#Sm_" + k).val(Data.data[k]);
			} else {
				if (Data.data[k]) {
					if (k != "id") {
						$("#Sm_" + k).val(Data.data[k]);
					}

				}

			}

		}
	}

	if (Data.data.personinfo.file.id != null && Data.data.personinfo.file.fileurl != null) {
		$("#imagefileid").val(Data.data.personinfo.file.id);
		$("#imagefile").attr("src", Data.data.personinfo.file.fileurl);
		$("#upload-btn").html("已上传"); //从服务器获取的图片已是已上传状态
	} else {
		$("#imagefile").attr("alt", "暂无照片!")
	}
	if (brccharges != "" && brccharges != undefined) {
		$("#Sm_brccharge").val(brccharges);
	}

	modal_ToSelect2(getModalconObj("update"));
	modal_ToData(getModalconObj("update"));
};

//角色管理
var Role_Detailde = function(Data) {
	for (var k in Data.data) {
		if (k === "name") {
			$("#Sm_" + k).val(Data.data[k]);
		}
	}
};

//用户管理
var User_Detailde = function(Data) {
	for (var k in Data.data) {
		if (k === "role") {
			$("#Sm_roleid").val(Data.data[k].id);
		}
		$("#Sm_" + k).val(Data.data[k]);
	}
	modal_ToSelect2(getModalconObj("update"));
};