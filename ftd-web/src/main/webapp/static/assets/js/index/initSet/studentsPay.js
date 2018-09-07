function studentpay(id) {
	bootbox.dialog({
		message: stuPay_html(),
		title: "收款确认",
		className: "modal-darkorange center-fist-modal",
		buttons: {
			success: {
				label: "确认",
				className: "btn-primary",
				callback: function() {
					if (!(validater.form())) {
						return false;
					}
					var data = {
						"student": {
							"id": id
						},
						"money": $("#money").val(),
						"remark": $("#remark").val(),
						"paydate": $("#paydate").val(),
						"chargetype": $("#chargetype").val(),
						"paystatus": $("#paystatus").val()
					};
					okpay(data);
				}
			},
			"取消": {
				className: "btn-warning",
				callback: function() {

				}
			}
		}
	});

	$("#paydate").click(function() {
		laydate({
			elem: "#paydate",
			format: "YYYY-MM-DD hh:mm:ss",
			istime: true,
			istoday: true
		});
	});
	$("#paydate").val(getnowtime());
	$("#chargetype").select2();
	$("#paystatus").select2();
	validater = $("#registrationForm").validate(VOPTION.StudentPay);
	getData_Pay(id);
	//$("#money").attr("onblur", 'isPay("price","money","payMoney","registrationForm")');
}

function getnowtime() {
	var nowtime = new Date();
	var year = nowtime.getFullYear();
	var month = padleft0(nowtime.getMonth() + 1);
	var day = padleft0(nowtime.getDate());
	var hour = padleft0(nowtime.getHours());
	var minute = padleft0(nowtime.getMinutes());
	var second = padleft0(nowtime.getSeconds());
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

//补齐两位数
function padleft0(obj) {
	return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}

function stuPay_html() {
	var body = "";
	body += '<div class="form-title"><h5 class="row-title">收费信息</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >' +
		'<label class="col-md-4 col-xs-4 control-label">学员编号</label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="code" type="text" class="form-control input-sm" name="code" readOnly="readOnly" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />' +
		'</div>' +
		'</div>';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >' +
		'<label class="col-md-4 col-xs-4 control-label">学员姓名</label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="Sm_name" type="text" class="form-control input-sm" name="name" readOnly="readOnly" placeholder="" data-bv-notempty="true" data-bv-notempty-message=""  />' +
		'</div>' +
		'</div>';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >' +
		'<label class="col-md-4 col-xs-4 control-label">身份证</label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="Sm_cardnum" type="text" class="form-control input-sm" name="cardnum" readOnly="readOnly" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />' +
		'</div>' +
		'</div>';
	body += '</div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >' +
		'<label class="col-md-4 col-xs-4 control-label">培训车型</label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="traintype" type="text" class="form-control input-sm" name="traintype" readOnly="readOnly" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />' +
		'</div>' +
		'</div>';
	body += '<div class="col-lg-4 col-md-4 col-xs-4" >' +
		'<label class="col-md-4 col-xs-4 control-label">收费类型<sup style="color:red">*</sup></label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<select id="chargetype" style="width:100%" name="chargetype"><option value="0">请选择</option><option value="TUITION">学费</option><option value="MAKEUP">补考费</option></select>' +
		'</div>' +
		'</div>';

	body += '<div class="col-lg-4 col-md-4 col-xs-4" >' +
		'<label class="col-md-4 col-xs-4 control-label">收费状态<sup style="color:red">*</sup></label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<select id="paystatus" style="width:100%" name="chargetype"><option value="0">请选择</option><option value="NotPay">未收费</option><option value="Paid">已收费</option></select>' +
		'</div>' +
		'</div>';
	body += '</div>';
	
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >' +
		'<label class="col-md-4 col-xs-4 control-label">收费<sup style="color:red">*</sup></label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="money" type="text" class="form-control input-sm" name="money"  placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />' +
		'</div>' +
		'</div>';
	body += '</div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >' +
		'<label class="col-md-4 col-xs-4 control-label">备注</label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<input  id="remark" type="text" class="form-control input-sm" name="remark"  placeholder=""   />' +
		'</div>' +
		'</div>';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >' +
		'<label class="col-md-4 col-xs-4 control-label">付款时间<sup style="color:red">*</sup></label>' +
		'<div class="col-md-8 col-xs-8">' +
		'<div class="input-group"><span class="input-group-addon" ><i class="fa fa-calendar"></i></span><input readOnly="readOnly"  id="paydate" class="form-control" name="paydate" type="text" data-date-format="yyyy-mm-dd" style="padding-right: 0px;padding-left: 0px;"></div>' +
		'</div>' +
		'</div>';
	body += '</div>';

	body += '<div class="form-title"><h5 class="row-title">收费流水账单</h5></div>';

	body += '<table id="studypayTb" class="table table-bordered table-hover dataTable no-footer">';

	body += '<tr>';
	body += '<th>序号</th>';
	body += '<th>收费流水号</th>';
	body += '<th>收费类型</th>';
	body += '<th>应收</th>';
	body += '<th>已收</th>';
	body += '<th>审核状态</th>';
	body += '<th>支付时间</th>';
	body += '<th>备注</th>';
	body += '<th>录入者</th>';
	body += '<tr/>';

	body += '<tr>';
	body += '<td colspan="9" style="text-aligen:centen">暂无收费记录</td>';
	body += '<tr/>';

	body += '</table>';

	var str = '<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' +
		body +
		'</form>' +
		'</div>';
	return str;
}

function getData_Pay(id) {
	$.ajax({
		url: IP + "/rmwebapp/sch/brsch/student-" + id + "/pay",
		type: "get",
		async: true,
		success: function(Data) {
			console.log(Data);
			if (Data.errorcode === 0) {
				for (var k in Data.data) {
					if (k == "student") {
						for (var i in Data.data[k]) {
							if (i == "personinfo") {
								for (var j in Data.data[k][i]) {
									if (j == "file") {

									} else {
										$("#Sm_" + j).val(Data.data[k][i][j]);
									}

								}
							} else if (i == "stucharge") {
								for (var a in Data.data[k][i]) {

									$("#" + a).val(Data.data[k][i][a]);
								}
							} else if (i == "pays") {
								if (Data.data[k][i] && Data.data[k][i].length > 0) {
									var body = '';
									body += '<tr>';
									body += '<th>序号</th>';
									body += '<th>收费流水号</th>';
									body += '<th>收费类型</th>';
									body += '<th>应收</th>';
									body += '<th>已收</th>';
									body += '<th>审核状态</th>';
									body += '<th>支付时间</th>';
									body += '<th>备注</th>';
									body += '<th>录入者</th>';
									body += '<tr/>';

									var chargetype = {
										"TUITION": "学费",
										"MAKEUP": "补考费"
									};
									var price;
									Data.data.student.brccharge != null ? price = Data.data.student.brccharge.price : price = "";
									for (var m = 0; m < Data.data[k][i].length; m++) {
										body += '<tr>';
										body += '<td>' + (m + 1) + '</td>';
										body += '<td>' + Data.data[k][i][m]["serialnum"] + '</td>';
										body += '<td>' + chargetype[Data.data[k][i][m]["chargetype"]] + '</td>';
										body += '<td>' + price + '</td>';
										body += '<td>' + Data.data[k][i][m]["money"] + '</td>';
										body += '<td>' + (Data.data[k][i][m]["assessstatus"] == "ASSESS" ? "已审核" : "未审核") + '</td>';
										body += '<td>' + Data.data[k][i][m]["paydate"] + '</td>';
										body += '<td>' + Data.data[k][i][m]["remark"] + '</td>';
										body += '<td>' + Data.data[k][i][m]["cashier"] + '</td>';
										body += '<tr/>';
									}

									$("#studypayTb").html(body);
								} else {
									var body = '';
									body += '<tr>';
									body += '<th>序号</th>';
									body += '<th>收费流水号</th>';
									body += '<th>收费类型</th>';
									body += '<th>应收</th>';
									body += '<th>已收</th>';
									body += '<th>审核状态</th>';
									body += '<th>支付时间</th>';
									body += '<th>备注</th>';
									body += '<th>录入者</th>';
									body += '<tr/>';

									body += '<tr>';
									body += '<td colspan="9" style="text-aligen:centen">暂无收费记录</td>';
									body += '<tr/>';

									$("#studypayTb").html(body);
								}
							} else {
								$("#" + i).val(Data.data[k][i]);
							}
						}
					} else {
						$("#" + k).val(Data.data[k]);
					}
				}

			} else {
				modal_pop("获取失败！", "fail");
			}
		},
		cache: false,
		timeout: 500000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}

function okpay(data) {
	$.ajax({
		url: IP + "/rmwebapp/sch/brsch/student/pay",
		type: "post",
		async: true,
		contentType: "application/json", //内容的类型
		data: JSON.stringify(
			data
		),
		success: function(Data) {
			console.log(Data);
			if (Data.errorcode === 0) {
				modal_pop("收款确认成功！", "success");
			} else {
				modal_pop("收款确认失败！", "fail");
			}
		},
		cache: false,
		timeout: 500000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
}