function fingerInit() {
	var str = '<div class="text-align-center"><div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 no-padding-right" style="height: 100%;">' + '<OBJECT CLASSID="CLSID:6de0faae-d4ca-4329-b67e-b5e7d63f595b" codebase="SynoActiveX.ocx" id="ObjFinger" width=230 height=216 border=1></OBJECT>' + '<textArea id="fingerValue" name="fingerprint" style="display:none"></textArea>' + '</div>' + '<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="height: 100%;">' + '<div class="form-group">' + '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 no-padding-right">' + '<INPUT class="form-control" TYPE="button" class="btn btn-default" value="注册指纹" onclick="fPrinterReg();" style="width: 80px">' + '</div>' + '<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">' + '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">' + '<input class="form-control" name="AutoSrch" type="checkbox" value="自动搜索" style="opacity: 1;position: relative;left:0px;width:2em;height:2em" checked />' + '</div>' + '<label class="col-xs-9 col-sm-9 col-md-9 col-lg-9 control-label text-align-left  no-padding-left">自动搜索</label>' + '</div>' + '</div>' + '<div class="form-group">' + '<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">' + '<label class="col-xs-5 col-sm-5 col-md-5 col-lg-5 control-label text-align-left  no-padding-left no-padding-right">注册指纹图像序号：</label>' + '<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">' + '<SELECT class="form-control" NAME="ImgNo" Width=60>' + '<OPTION VALUE="1" SELECTED>1</OPTION>' + '<OPTION VALUE="2">2</OPTION>' + '<OPTION VALUE="3">3</OPTION>' + '</SELECT>' + '</div>' + '</div>' + '</div>' + '<div class="form-group">' + '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' + '<INPUT TYPE="button" class="btn btn-default form-control" value="获取注册指纹图像" onclick="fPrinterShow()">' + '</div>' + '</div>' + '<div class="form-group">' + '<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">' + '<label class="col-xs-2 col-sm-2 col-md-2 col-lg-2 control-label text-align-left no-padding-right no-padding-left">端口：</label>' + '<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">' + '<SELECT class="form-control" NAME="Comm" Width=60>' + '<OPTION VALUE="0" SELECTED>USB</OPTION>' + '<OPTION VALUE="1">Com1</OPTION>' + '<OPTION VALUE="2">Com2</OPTION>' + '<OPTION VALUE="3">Com3</OPTION>' + '<OPTION VALUE="4">Com4</OPTION>' + '<OPTION VALUE="5">Com5</OPTION>' + '<OPTION VALUE="6">Com6</OPTION>' + '<OPTION VALUE="7">Com7</OPTION>' + '<OPTION VALUE="8">Com8</OPTION>' + '<OPTION VALUE="9">Com9</OPTION>' + '<OPTION VALUE="10">Com10</OPTION>' + '<OPTION VALUE="11">Com11</OPTION>' + '<OPTION VALUE="12">Com12</OPTION>' + '<OPTION VALUE="13">Com13</OPTION>' + '<OPTION VALUE="14">Com14</OPTION>' + '<OPTION VALUE="15">Com15</OPTION>' + '<OPTION VALUE="16">Com16</OPTION>' + '</SELECT>' + '</div>' + '</div>' + '</div>' + '<div class="form-group">' + '<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">' + '<label class="col-xs-2 col-sm-2 col-md- col-lg- control-label text-align-left no-padding-right no-padding-left">级别：</label>' + '<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">' + '<SELECT class="form-control" NAME="Level" Width=160>' + '<OPTION VALUE="1">1－低</OPTION>' + '<OPTION VALUE="2">2－稍低</OPTION>' + '<OPTION VALUE="3" SELECTED>3－中</OPTION>' + '<OPTION VALUE="4">4－稍高</OPTION>' + '<OPTION VALUE="5">5－高</OPTION>' + '</SELECT>' + '</div>' + '</div>' + '</div>' + '<div class="form-group">' + '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-">' + '<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 no-padding-left">' + '<INPUT class="form-control" TYPE="text" NAME="TimeOut" Value="2000 " COLS=2>' + '</div>' + '<label class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-align-left no-padding-left control-label ">毫秒</label>' + '</div>' + '</div>' + '</div>' + '</div>';

	console.info(str)
	return str;
}

function ShowErr(nErr, sCmd) {
	switch (nErr) {
		case 0:
			//alert();
			modal_pop_even(sCmd + "成功!", "success", fPrinterShow);
			break;
		case -1:
			modal_pop("参数错误", "fail");
			break;
		case -2:
			modal_pop("内存分配失败", "fail");
			break;
		case -3:
			modal_pop("功能未实现", "fail");
			break;
		case -4:
			modal_pop("设备不存在", "fail");
			break;
		case -5:
			modal_pop("设备未连接", "fail");
			break;
		case -7:
			modal_pop("逻辑错误", "fail");
			break;
		case -8:
			modal_pop("等待超时", "fail");
			break;
		case -10:
			modal_pop("指纹比对失败", "fail");
			break;
		case -11:
			modal_pop("合并特征失败", "fail");
			break;
		default:
			modal_pop(sCmd + "失败：" + nErr, "fail");

	}
}
/* 命令执行 */
function DoTesoCmd(nCmd, fomid) {
	//			var value = utf8to16(base64decode(src))
	//			console.log(value);
	//var obj = document.getElementById("ObjFinger");
	var obj = $("#ObjFinger")[0];
	var form = $("#registrationForm")[0];

	if (typeof(form) == "undefined") {
		modal_pop("表单域未定义！", "fail");
		return;
	}
	/*获取界面上的设置属性*/
	var nPortNo = form.Comm.value; // 端口SLCT
	var dwWaitTime = form.TimeOut.value; // 超时EDIT
	var nLevel = form.Level.value; // 安全级SLCT
	var nImgNo = form.ImgNo.value; // 图像序号SLCT
	//var nImgNo=1;
	var isAutoSrch = form.AutoSrch.checked;
	var nRet = -1;
	var sDvSn = "";
	var i = 0;
	var objReg = form.Reg; // 模板EDIT
	var objVer = form.Ver; // 特征EDIT
	if (typeof(obj) == "undefined") {
		//alert("控件未找到，请检查HTMl代码里的OBJECT");
		modal_pop("未找到设备！", "fail");
		return -1;
	}
	/*------调用具体的各种方法------*/
	// 通用方法
	switch (nCmd) {
		case 0: // 验证控件是否符合规范
			var v1 = typeof(ObjFinger.FPIGetFingerInfo);
			var v2 = typeof(ObjFinger.FPIGetTemplate);
			var v3 = typeof(ObjFinger.FPIGetFeature);
			var v4 = typeof(ObjFinger.FPIFpMatch);
			var v5 = typeof(ObjFinger.FPIGetImageData);
			var eMsg = "";
			if (v1 == "undefined") eMsg += "没有 FPIGetFingerInfo 方法\n";
			if (v2 == "undefined") eMsg += "没有 FPIGetTemplate 方法\n";
			if (v3 == "undefined") eMsg += "没有 FPIGetFeature 方法\n";
			if (v4 == "undefined") eMsg += "没有 FPIFpMatch 方法\n";
			if (v5 == "undefined") eMsg += "没有 FPIGetImageData 方法\n";
			if (eMsg != "") {
				//alert(eMsg);
				modal_pop("未找到设备！", "fail");
			} else {
				//alert("标准调用方法都存在！");
				//modal_pop("未找到设备！","fail");
			}
			break;
		case 2: // 注册模板，Base64
			nRet = obj.FPIGetTemplate(nPortNo, dwWaitTime);
			console.log(nRet);
			if (isAutoSrch) {
				if (nRet == -4) {
					for (i = 0; i <= 16; i++) {
						nRet = ObjFinger.FPIGetTemplate(i, dwWaitTime);
						console.log(nRet);
						if (nRet != -4) {
							FpDemo.Comm.value = i;
							break;
						}
					}
				}
			}
			if (nRet != 0) {
				ShowErr(nRet, "");
				//objReg.value = "";
			} else {
				ShowErr(nRet, "注册指纹");
				$("#fingerValue").text(obj.FPIGetFingerInfo());
			}
			break;
		case 3: // 获得验证指纹特征，Base64		
			nRet = ObjFinger.FPIGetFeature(nPortNo, dwWaitTime);
			//console.log(obj.AboutBox());
			if (isAutoSrch) {
				if (nRet == -4) {
					for (i = 0; i <= 16; i++) {
						nRet = ObjFinger.FPIGetFeature(i, dwWaitTime);
						if (nRet != -4) {
							FpDemo.Comm.value = i;
							break;
						}
					}
				}
			}
			if (nRet != 0) {
				ShowErr(nRet, "");
				objVer.value = "";
			} else {
				ShowErr(nRet, "获得验证指纹");
				objVer.value = ObjFinger.FPIGetFingerInfo();
				console.log(objVer.value);
			}
			break;
		case 4: // 比对，Base64
			nRet = ObjFinger.FPIFpMatch(objReg.value, objVer.value, nLevel);
			ShowErr(nRet, "比对");
			break;
		case 5:
			if (obj.FPIGetImageData(nImgNo) != null) {
				obj.FPIGetImageData(nImgNo)
				$("#fingerValue").text(obj.FPIGetFingerInfo());
			} else
				modal_pop("获取注册指纹图像失败", "fail");
			break;
		case 6:
			ObjFinger.FPICloseDev();
			alert("关闭设备成功");
			break;
		default:
			alert("错误的命令");
			break;
	}
}

function checkLeave() {
	var obj = $("#ObjFinger")[0];
	if(obj && obj.FPICloseDev)
	{
		obj.FPICloseDev();
	}
	
}

//function checkLeave() {
//	ObjFinger.FPICloseDev();
//}

function checkDev() {

	DoTesoCmd(0, "registrationForm");

}

function fPrinterReg() {

	DoTesoCmd(2, "registrationForm");
	//DoTesoCmd(5,"registrationForm")

}

function fPrinterShow() {

	DoTesoCmd(5, "registrationForm");
	//DoTesoCmd(5,"registrationForm")

}