var _From2Json = {
	getData: function(custom) {
		var obj = {
			Vessel: "#registrationForm .form-group",
			Element: "select[name],input[name]"
		};
		custom != undefined ? $.extend(true, obj, {}, custom) : "";
		var $fgls = $(obj.Vessel); //组对象
		var $iptls = $fgls.find(obj.Element); //获取select 和 input 对象
		var _formdata = {};
		$.each($iptls, function(index) {
			var rules = $(this).data("rules") || this.name;
			var type = $(this).data("type");
			var val = $(this).val();
			var inputType = this.tagName;
			/*如果规则没有则无需处理*/
			if (rules == undefined || rules == "undefined") {
				return true;
			}
			var rulesArr = rules.split("."); //规则数组
			var keyModel = "{{1}:{0}}"; //模板
			var ketStr = ""; //key字符串
			//根据类型进行操作
			switch (type) {
				case "upload":
					if (val == "" || val.replace('""', "") == "" || val.replace('{}', "") == "") {
						return true;
					}
					val = JSON.stringify(eval("(" + val + ")"));
					keyStr = keyModel.split("{0}").join(val);
					break;
				case "edit":
					var fileid = $(this).data("fileid");
					if ($("#" + fileid).code() == "") {
						return true;
					}
					val = $("#" + fileid).code();
					keyStr = keyModel.split("{0}").join(JSON.stringify(val));
					break;
				case "specSer":
					var len = $("#featuretb");

					var tr = len.find("tbody tr");
					if (tr.length <= 0) {
						return true;
					}
					var ser = [];
					for (var i = 0; i < tr.length; i++) {
						var ob = {
							name: $(tr[i]).find("td input[name='sname']").val(),
							introduce: $(tr[i]).find("td input[name='introduce']").val()
						}
						ser.push(ob);
					}
					val = ser;
					keyStr = keyModel.split("{0}").join(JSON.stringify(val));
					break;
				case "feeStandal":
					var ftb = $("#feetable");
					var ftr = ftb.find("tbody tr");
					if (ftr.length <= 0) {
						return true;
					}
					var ftab = [];
					for (var i = 0; i < ftr.length; i++) {
						var fnewtr = {
							course: $(ftr[i]).find("td input[name='course']").val(),
							chargetype: $(ftr[i]).find("td select[name='chargetype']").val(),
							tratype: $(ftr[i]).find("td select[name='tratype']").val(),
							price: $(ftr[i]).find("td input[name='price']").val(),
							paytype: $(ftr[i]).find("td select[name='paytype']").val(),
							cartype: $(ftr[i]).find("td select[name='cartype']").val(),
							description: $(ftr[i]).find("td input[name='description']").val()
						}
						ftab.push(fnewtr);
					}
					val = ftab;
					keyStr = keyModel.split("{0}").join(JSON.stringify(val));
					break;
				default:
					switch (inputType) {
						case "SELECT":
							if (val == "0") {
								return true;
							}
							break;
						case "INPUT":
							if (val == "") {
								return true;
							}
							break;
						default:
							break;
					}
					keyStr = keyModel.split("{0}").join("'" + val + "'");
					break;
			}
			keyStr = keyStr.split("{1}").join(rulesArr[rulesArr.length - 1]);
			for (var i = rulesArr.length - 2; i >= 0; i--) {
				keyStr = keyModel.split("{0}").join(keyStr);
				keyStr = keyStr.split("{1}").join(rulesArr[i]);
			}
			$.extend(true, _formdata, eval("(" + keyStr + ")"));
		});
		console.info(_formdata);
		return _formdata;
	},
	setData: function(Data, custom) {
		var obj = {
			Vessel: "#registrationForm .form-group",
			Element: "select[name],input[name]"
		};
		custom != undefined ? $.extend(true, obj, {}, custom) : "";
		var $fgls = $(obj.Vessel); //组对象
		var $iptls = $fgls.find(obj.Element); //获取select 和 input 对象
		$.each($iptls, function(index) {
			var rules = $(this).data("rules") || this.name;
			var img = $(this).data("img");
			var type = $(this).data("type");
			/*如果规则没有则无需处理*/
			if (rules == undefined || rules == "undefined") {
				return true;
			}
			var rulesArr = rules.split("."); //规则数组
			var inputType = this.tagName;
			var FistData = Data[rulesArr[0]];
			var Temporary = FistData;
			//根据不同类型执行不同方法
			switch (type) {
				case "edit":
					for (var i = 1; i < rulesArr.length; i++) {
						if (Temporary != null) {
							Temporary = Temporary[rulesArr[i]];
						} else {
							Temporary = '';
							break;
						}
					}
					$("#" + this.name).code(Temporary);
					break;
				case "img":
					var files;
					Temporary = FistData;
					for (var i = 1; i < rulesArr.length - 1; i++) {
						if (Temporary != null) {
							Temporary = Temporary[rulesArr[i]];
						} else {
							files == null;
							break;
						}
					}
					files = Temporary;
					if (files != null && (files.fileurl != "" || files.fileurl != null)) {
						$("#imagefile").attr("src", files.fileurl + "@.jpg");
						$("#upload-btn").html("已上传"); //从服务器获取的图片已是已上传状态
					} else {
						$("#img_show").attr("alt", "暂无照片");
					}
					$(this).val(files.id);
					break;
				case "upload":
					var types = $(this).data("types");
					var fileid = $(this).data("fileid");
					var paramObj = {}; //参数对象
					var album = {}; //
					var initialPreviewData = []; //图片url数组
					var initialPreviewConfigData = []; //图片配置
					var albumid = "";
					var inputId = $(this).attr("id");
					switch (types) {
						case "one":
							if (FistData) {
								var fileUrl = FistData["fileurl"] + "@.jpg";
								var title = FistData["title"];
								var id = FistData["id"];
								initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
								initialPreviewConfigData.push({
									caption: title,
									url: '/rmwebapp/album/' + id,
									key: inputId + "|" + id,
									extra: {
										id: id
									}
								});
								$("#" + inputId).val(JSON.stringify({
									id: id
								}));
							} else {
								console.info("From2Json.js SetData-FistData is not Data!")
							}
							break;
						case "more":
							if (FistData && FistData["photos"]) {
								var aid = FistData.id;
								album = {
									"id": aid,
									"photos": []
								};
								albumid = aid;
								for (var y = 0; y < FistData["photos"].length; y++) {
									var fileUrl = FistData["photos"][y]["file"]["fileurl"] + "@.jpg";
									var id = FistData["photos"][y]["file"]["id"];
									var title = FistData["photos"][y]["file"]["title"];
									initialPreviewData.push("<img src='" + fileUrl + "' class='' alt='暂无图片' title='" + title + "'>");
									initialPreviewConfigData.push({
										caption: title,
										url: '/rmwebapp/album/' + FistData["photos"][y]["id"],
										key: "album|" + FistData["photos"][y]["id"] + "|" + inputId,
										extra: {
											id: id
										}
									});
								}
								album.photos = FistData["photos"];
								$("#" + inputId).val(JSON.stringify(album));
							} else {
								console.info("From2Json.js SetData-FistData is not Data!")
							}
							break;
					}

					paramObj["async"] = false; //同步操作
					paramObj["inputid"] = inputId;
					paramObj["initialPreview"] = initialPreviewData;
					paramObj["initialPreviewConfig"] = initialPreviewConfigData;

					var name = Utils.getModelObj();
					if (types == "one") {
						uploadInit(fileid, IP + "/rmwebapp/file/" + (name != undefined ? name.name : "") + "-filesupload-with-thumbnail-50", uploadSuccCB_oneflie, deleteCB, paramObj);
					} else {
						paramObj["overwriteInitial"] = false;
						paramObj["album"] = albumid;
						if (albumid != "") {
							uploadInit(fileid, IP + "/rmwebapp/file/" + (name != undefined ? name.name : "") + "-filesupload-with-thumbnail-50", uploadSuccCB_updates, deleteCB, paramObj);
						} else {
							uploadInit(fileid, IP + "/rmwebapp/file/" + (name != undefined ? name.name : "") + "-filesupload-with-thumbnail-50", uploadSuccCBs, deleteCB, paramObj);
						}
					}
					break;
				default:
					for (var i = 1; i < rulesArr.length; i++) {
						if (Temporary != null) {
							Temporary = Temporary[rulesArr[i]];
						} else {
							inputType == "SELECT" ? Temporary = "0" : Temporary = "";
							break;
						}
					}
					Temporary = (Temporary == null ? (inputType == "SELECT" ? "0" : Temporary) : Temporary);
					inputType == "SELECT" ? $(this).select2("val", Temporary) : $(this).val(Temporary);
					break;
			}
		});
	}
};