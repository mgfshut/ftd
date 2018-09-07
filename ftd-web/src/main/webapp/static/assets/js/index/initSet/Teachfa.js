function AddTeachfa() {
	bootbox.dialog({
		message: AddTeachfa_html(),
		title: "质量信誉考核数据录入（" + _cookie.schoolname + "）",
		className: "modal-darkorange schoolArea",
		buttons: {
			success: {
				label: "添加",
				className: "btn-primary",
				callback: function() {
					// if (!validateForm("registrationForm")) {
					// 	return false;
					// }
					for (var k in schcreditgrade) {
						if (schcreditgrade[k] instanceof Object) {
							for (var j in schcreditgrade[k]) {
								schcreditgrade[k][j] = $("#" + j).val();
							}
						} else {
							schcreditgrade[k] = $("#" + k).val();
						}
					}
					ajax_add(IP+"/rmwebapp/sch-" + SchId() + "/schcreditgrade", schcreditgrade)
				}
			},
			"取消": {
				className: "btn-warning",
				callback: function() {

				}
			}

		}
	});
	//validate("registrationForm", qualityhonorInput);
	$("#stayear").append(Add_year_option());
	$("#stayear").select2();
	$("#stayear").on("change", function() {
		Checkyear($("#stayear").val());
	});
}

function Add_year_option() {
	var str;
	var dates = new Date();
	var year = dates.getFullYear();
	for (var i = Number(year) - 2; i < year; i++) {
		str += "<option value=\"" + i + "\">" + i + "</option>";
	}
	for (var i = year; i <= Number(year) + 10; i++) {
		str += "<option value=\"" + i + "\">" + i + "</option>";
	}
	return str;

}

function AddTeachfa_html() {
	var body = "";
	body += '<div class="form-title"><h5 class="row-title">年份选择</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 no-padding-left ">';
	body += '<label class="col-md-4 col-xs-4 control-label">年份</label>';
	body += '<div class="col-md-6 col-xs-6"><select id="stayear" style="width:100%" name="year"><option value="0">请选择</option></select>';
	body += '<lable id="yearerror" style="color:#e46f61;font-size:8px;display:none">已存在,请重新选择</lable></div></div></div>';

	body += '<div class="form-title"><h5 class="row-title">岗位及人员</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练员总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="coachsum" type="text" class="form-control input-sm" name="coachsum" placeholder="" maxLength="15" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">理论教练员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="theosum" type="text" class="form-control input-sm" name="theosum" placeholder="" maxLength="15" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">按教练车总数的3%配备，不少于2人</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">驾驶操作教练员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="operasum" type="text" class="form-control input-sm" name="operasum" maxLength="15" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">不少于相应车型教练车总数的100%</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">结业考核员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="examine" type="text" class="form-control input-sm" maxLength="15" name="examine" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">按教练车总数的5%配备,不少于2人</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">安全管理人员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="safetyman" type="text" class="form-control input-sm" maxLength="15" name="safetyman" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">不少于1人</label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教练车</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="carsum" type="text" class="form-control input-sm" maxLength="15" name="carsum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-9 col-xs-9 control-label">培训机构：一级≥80俩、二级≥40俩、三级≥20俩</label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">大型客车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="largeBus" type="text" class="form-control input-sm"  maxLength="15"name="largeBus" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">牵引车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="tractor" type="text" class="form-control input-sm" maxLength="15" name="tractor" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>'
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">城市公交车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="cityBus" type="text" class="form-control input-sm" maxLength="15" name="cityBus" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >'
	body += '<label class="col-md-4 col-xs-4 control-label">中型客车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="mediumBus" type="text" class="form-control input-sm" maxLength="15" name="mediumBus" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">大型货车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="largeTruck" type="text" class="form-control input-sm" maxLength="15" name="largeTruck" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-7 col-xs-7 control-label">小型汽车（含小型自动挡汽车）总数</label>';
	body += '<div class="col-md-5 col-xs-5">';
	body += '<input  id="minicar" type="text" class="form-control input-sm" maxLength="15" name="minicar" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">低速汽车(含低速载货汽车、三轮汽车)总数</label>';
	body += '<div class="col-md-4 col-xs-4">';
	body += '<input  id="lowSpeedCar" type="text" class="form-control input-sm" maxLength="15" name="lowSpeedCar" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">残疾人教练车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="handicapped" type="text" class="form-control input-sm" maxLength="15" name="handicapped" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">摩托车(含三车、二轮、轻便摩托车)总数</label>';
	body += '<div class="col-md-4 col-xs-4">';
	body += '<input  id="ordinaryWheeled" type="text" class="form-control input-sm" maxLength="15" name="ordinaryWheeled" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >'
	body += '<label class="col-md-9 col-xs-9 control-label">其他车型(含轮式自行机械车,无轨、有轨电车)总数</label>';
	body += '<div class="col-md-3 col-xs-3">';
	body += '<input  id="otherModels" type="text" class="form-control input-sm" maxLength="15" name="otherModels" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" style="padding-left:2px;padding-right:15px;" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	/*body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-9 col-xs-9 control-label">其他车型(含轮式自行机械车、无轨电车、有轨电车)总数</label>';
	body += '<div class="col-md-3 col-xs-3">';
	body += '<input  id="otherModels" type="text" class="form-control input-sm" name="otherModels" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';*/


	body += '<div class="form-title"><h5 class="row-title">办公场所及教室</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教室总面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="clrmarea" type="text" class="form-control input-sm" maxLength="15" name="clrmarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">理论教室面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="theoclrmarea" type="text" class="form-control input-sm" maxLength="15" name="theoclrmarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教学设施设备</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">多媒体教学设备总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="multteacequipnum" type="text" class="form-control input-sm" maxLength="15" name="multteacequipnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">多媒体理论教学软件总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="multteacsoftnum" type="text" class="form-control input-sm" maxLength="15" name="multteacsoftnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教学磁板总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="teacmagnboardnum" type="text" class="form-control input-sm" maxLength="15" name="teacmagnboardnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">汽车驾驶模拟器总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="vehisimnum" type="text" class="form-control input-sm" maxLength="15" name="vehisimnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">其他教具和设备总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="othertotal" type="text" class="form-control input-sm" maxLength="15" name="othertotal" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教练场地</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练场地总面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="trainarea" type="text" class="form-control input-sm" maxLength="15" name="trainarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">场地驾驶教练场面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dritrainarea" type="text" class="form-control input-sm" maxLength="15" name="dritrainarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">实际道路驾驶教练路线</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="drivinstcour" type="text" class="form-control input-sm" maxLength="15" name="drivinstcour" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停车场面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="parkarea" type="text" class="form-control input-sm" maxLength="15" name="parkarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">倒车入库数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="backstornum" type="text" class="form-control input-sm" maxLength="15" name="backstornum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">倒车移位数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="reveshifnum" type="text" class="form-control input-sm" maxLength="15" name="reveshifnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">侧方停车数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="latsidparnum" type="text" class="form-control input-sm" maxLength="15" name="latsidparnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">坡道定点停车和起步数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="rampdesnum" type="text" class="form-control input-sm" maxLength="15" name="rampdesnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">直角转弯数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="quarturnnum" type="text" class="form-control input-sm" maxLength="15" name="quarturnnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">曲线行驶数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="curvedrivenum" type="text" class="form-control input-sm" maxLength="15" name="curvedrivenum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过连续障碍数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="contfencesnum" type="text" class="form-control input-sm" maxLength="15" name="contfencesnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过单边桥数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="unilbridgenum" type="text" class="form-control input-sm" maxLength="15" name="unilbridgenum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过限宽门数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="limiwidthnum" type="text" class="form-control input-sm" maxLength="15" name="limiwidthnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">起伏路行驶数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="roldrinum" type="text" class="form-control input-sm" maxLength="15" name="roldrinum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">窄路掉头数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="narturnnum" type="text" class="form-control input-sm" maxLength="15" name="narturnnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟高速公路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simhighwaynum" type="text" class="form-control input-sm" maxLength="15" name="simhighwaynum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟连续急弯山区路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simmournum" type="text" class="form-control input-sm" maxLength="15" name="simmournum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟隧道数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simtunnelnum" type="text" class="form-control input-sm" maxLength="15" name="simtunnelnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟雨（雾）天湿滑路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simralinum" type="text" class="form-control input-sm" maxLength="15" name="simralinum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停靠站台数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dockstanum" type="text" class="form-control input-sm" maxLength="15" name="dockstanum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停靠货台数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dockcargonum" type="text" class="form-control input-sm" maxLength="15" name="dockcargonum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	var str = '<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' +
		body +
		'</form>' +
		'</div>';
	return str;
}

function Checkyear(year) {
	$.ajax({
		type: "get",
		url: IP+"/rmwebapp/sch/schcreditgrade-" + SchId() + "/" + year,
		async: false,
		success: function(data) {
			if (data.errorcode === 0) {
				if (data.data === true) {
					$("#yearerror").hide();
				} else {
					$("#yearerror").show();
				}
			} else {
				return false;
			}
		},
		error: function(errObj, resu) {
			return false;
		}
	});
}

function selectTeachfa() {
	bootbox.dialog({
		message: selectTheachfa_html(),
		title: "质量信誉考核数据查询（" + _cookie.schoolname+ "）",
		className: "modal-darkorange schoolArea",
		buttons: {
			"修改": {
				className: "btn-primary",
				callback: function() {
					// if (!validateForm("registrationForm")) {
					// 	return false;
					// }
					for (var k in schcreditgrade) {
						if (schcreditgrade[k] instanceof Object) {
							for (var j in schcreditgrade[k]) {
								schcreditgrade[k][j] = $("#" + j).val();
							}
						} else {
							schcreditgrade[k] = $("#" + k).val();
						}
					}
					schcreditgrade["stayear"] = $("#stayear").val();
					ajax_Update(IP+"/rmwebapp/sch/schcreditgrade-" + $("#id").val(), schcreditgrade)
				}
			},
			"关闭": {
				className: "btn-warning",
				callback: function() {

				}
			}
		}
	});
	//validate("registrationForm", qualityhonorInput);
	
	
	$.ajax({
		url: IP+"/rmwebapp/sch/year/schcreditgrade-" + SchId(),
		type: "get",
		async: false,
		success: function(Data) {
			console.log(Data);
			
			if (Data.errorcode === 0) {
				if (Data.data.length > 0) {
					var year = Data.data[0]["stayear"];
					for (var i = 0; i < Data.data.length; i++) {
						$("#stayear").append("<option value=\"" + Data.data[i]["stayear"] + "\">" + Data.data[i]["stayear"] + "</option>");
					}
					//初始化
					$("#stayear").select2();
					//选中第一个
					$("#stayear").select2("val", year);
					//获取年份的对应数据
					GetData(year);
					//绑定事件
					$("#stayear").on("change", function() {
						GetData($("#stayear").val());
					});
				}
				else
				{
					$("#stayear").append("<option value=\"\">暂无数据</option>");
					$("#stayear").select2();
				}


			} else {
				modal_pop("获取失败！", "fail");
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});

	//	$.ajax({
	//		url: IP+"/rmwebapp/sch/year/schcreditgrade-" + SchId(),
	//		type: "get",
	//		async: false,
	//		success: function(Data) {
	//			console.log(Data);
	//			if (Data.errorcode === 0) {
	//				var dataObj = [];
	//				if (Data && Data.data && Data.data.list) {
	//					dataObj = Data.data.list;
	//				} else if (Data && Data.data) {
	//					dataObj = Data.data;
	//				}
	//				if (dataObj != null) {
	//					var Tree = [];
	//					for (var k = 0; k < dataObj.length; k++) {
	//						var schTemp = {
	//							text: dataObj[k]["stayear"],
	//							subNodes: [],
	//							state: {
	//								expanded: false
	//							}
	//						}
	//						Tree.push(schTemp);
	//					}
	//					//console.info(stuTree);
	//					TreeInit(Tree);
	//				}
	//			} else {
	//				modal_pop("获取失败！", "fail");
	//			}
	//		},
	//		cache: false,
	//		timeout: 50000,
	//		error: function(errObj, resu) {
	//			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
	//				modal_confirm_log("登录过期,请重新登陆！", relogin);
	//			} else {
	//				modal_pop("网络出错！", "fail"); //弹出对话框
	//				relogin();
	//			}
	//		}
	//	});
}

function GetData(year) {
	showloading();
	$.ajax({
		url: IP+"/rmwebapp/sch-" + SchId() + "/" + year + "/schcreditgrade",
		type: "get",
		async: false,
		success: function(Data) {
			console.log(Data);
			if (Data.errorcode === 0) {
				for (var k in Data.data) {
					$("#" + k).val(Data.data[k]);
				}
			} else {
				modal_pop("获取失败！", "fail");
			}
			hiddeloading();
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			hiddeloading();
			if (eval("(" + errObj.responseText + ")").errorcode == 200) {
				modal_confirm_log("登录过期,请重新登陆！", relogin);
			} else {
				modal_pop("网络出错！", "fail"); //弹出对话框
				relogin();
			}
		}
	});
	//alert($("#id").val());
}


function selectTheachfa_html() {
	var body = '';
	//body += '<div class="row">';

	//	body += '<div class="col-lg-1 col-md-1 col-xs-1">';
	//	body += '<div class="form-title"><h5 class="row-title">年份</h5></div>';
	//	body += '<div id="Tree"></div>';
	//	body += '</div>';
	/*body += '<div class="form-title"><h5 class="row-title">年份</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-4 col-md-4 col-xs-4 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">年份</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<select id="stayear" style="width:100%" name="year"></select>';
	body += '<input id="id" style="display:none"/>';
	body += '</div></div></div>';

	body += '<div class="form-title"><h5 class="row-title">岗位及人员</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练员总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="coachsum" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">理论教练员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="theosum" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">按教练车总数的3%配备，不少于2人</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">驾驶操作教练员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="operasum" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">不少于相应车型教练车总数的100%</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">结业考核员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="examine" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">按教练车总数的5%配备,不少于2人</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">安全管理人员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="safetyman" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">不少于1人</label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教练车</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="carsum" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-9 col-xs-9 control-label">培训机构：一级≥80俩、二级≥40俩、三级≥20俩</label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">大型客车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="largeBus" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">牵引车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="tractor" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>'
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">城市公交车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="cityBus" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >'
	body += '<label class="col-md-4 col-xs-4 control-label">中型客车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="mediumBus" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">大型货车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="largeTruck" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-7 col-xs-7 control-label">小型汽车（含小型自动挡汽车）总数</label>';
	body += '<div class="col-md-5 col-xs-5">';
	body += '<input  id="minicar" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">低速汽车(含低速载货汽车、三轮汽车)总数</label>';
	body += '<div class="col-md-4 col-xs-4">';
	body += '<input  id="lowSpeedCar" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">残疾人教练车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="handicapped" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-9 col-xs-9 control-label">摩托车(含三轮摩托车、二轮摩托车、轻便摩托车)总数</label>';
	body += '<div class="col-md-3 col-xs-3">';
	body += '<input  id="ordinaryWheeled" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >'
	body += '<label class="col-md-9 col-xs-9 control-label">其他车型(含轮式自行机械车、无轨电车、有轨电车)总数</label>';
	body += '<div class="col-md-3 col-xs-3">';
	body += '<input  id="otherModels" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-9 col-xs-9 control-label">其他车型(含轮式自行机械车、无轨电车、有轨电车)总数</label>';
	body += '<div class="col-md-3 col-xs-3">';
	body += '<input  id="otherModels" type="text" class="form-control input-sm" name="name" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">办公场所及教室</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教室总面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="clrmarea" type="text" class="form-control input-sm" name="clrmarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">理论教室面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="theoclrmarea" type="text" class="form-control input-sm" name="theoclrmarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教学设施设备</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">多媒体教学设备总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="multteacequipnum" type="text" class="form-control input-sm" name="multteacequipnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">多媒体理论教学软件总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="multteacsoftnum" type="text" class="form-control input-sm" name="multteacsoftnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教学磁板总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="teacmagnboardnum" type="text" class="form-control input-sm" name="teacmagnboardnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">汽车驾驶模拟器总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="vehisimnum" type="text" class="form-control input-sm" name="vehisimnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">其他教具和设备总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="othertotal" type="text" class="form-control input-sm" name="othertotal" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教练场地</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练场地总面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="trainarea" type="text" class="form-control input-sm" name="trainarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">场地驾驶教练场面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dritrainarea" type="text" class="form-control input-sm" name="dritrainarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">实际道路驾驶教练路线</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="drivinstcour" type="text" class="form-control input-sm" name="drivinstcour" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停车场面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="parkarea" type="text" class="form-control input-sm" name="parkarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">倒车入库数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="backstornum" type="text" class="form-control input-sm" name="backstornum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">倒车移位数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="reveshifnum" type="text" class="form-control input-sm" name="reveshifnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">侧方停车数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="latsidparnum" type="text" class="form-control input-sm" name="latsidparnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">坡道定点停车和起步数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="rampdesnum" type="text" class="form-control input-sm" name="rampdesnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">直角转弯数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="quarturnnum" type="text" class="form-control input-sm" name="quarturnnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">曲线行驶数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="curvedrivenum" type="text" class="form-control input-sm" name="curvedrivenum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过连续障碍数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="contfencesnum" type="text" class="form-control input-sm" name="contfencesnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过单边桥数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="unilbridgenum" type="text" class="form-control input-sm" name="unilbridgenum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过限宽门数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="limiwidthnum" type="text" class="form-control input-sm" name="limiwidthnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">起伏路行驶数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="roldrinum" type="text" class="form-control input-sm" name="roldrinum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">窄路掉头数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="narturnnum" type="text" class="form-control input-sm" name="narturnnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟高速公路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simhighwaynum" type="text" class="form-control input-sm" name="simhighwaynum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟连续急弯山区路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simmournum" type="text" class="form-control input-sm" name="simmournum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟隧道数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simtunnelnum" type="text" class="form-control input-sm" name="simtunnelnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟雨（雾）天湿滑路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simralinum" type="text" class="form-control input-sm" name="simralinum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停靠站台数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dockstanum" type="text" class="form-control input-sm" name="dockstanum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停靠货台数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dockcargonum" type="text" class="form-control input-sm" name="dockcargonum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';*/
	//body += '</div>';

	//body += '</div>';
	var body = "";
	body += '<div class="form-title"><h5 class="row-title">年份选择</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 no-padding-left ">';
	body += '<input id="id" style="display:none"/>';
	body += '<label class="col-md-4 col-xs-4 control-label">年份</label>';
	body += '<div class="col-md-6 col-xs-6"><select id="stayear" style="width:100%" name="year"><option value="0">请选择</option></select>';
	body += '<lable id="yearerror" style="color:#e46f61;font-size:8px;display:none">已存在,请重新选择</lable></div></div></div>';

	body += '<div class="form-title"><h5 class="row-title">岗位及人员</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练员总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="coachsum" type="text" class="form-control input-sm" name="coachsum" placeholder="" maxLength="15" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">理论教练员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="theosum" type="text" class="form-control input-sm" name="theosum" placeholder="" maxLength="15" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">按教练车总数的3%配备，不少于2人</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">驾驶操作教练员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="operasum" type="text" class="form-control input-sm" name="operasum" maxLength="15" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">不少于相应车型教练车总数的100%</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">结业考核员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="examine" type="text" class="form-control input-sm" maxLength="15" name="examine" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">按教练车总数的5%配备,不少于2人</label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">安全管理人员数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="safetyman" type="text" class="form-control input-sm" maxLength="15" name="safetyman" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">不少于1人</label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教练车</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="carsum" type="text" class="form-control input-sm" maxLength="15" name="carsum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-9 col-xs-9 control-label">培训机构：一级≥80俩、二级≥40俩、三级≥20俩</label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">大型客车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="largeBus" type="text" class="form-control input-sm"  maxLength="15"name="largeBus" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">牵引车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="tractor" type="text" class="form-control input-sm" maxLength="15" name="tractor" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>'
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">城市公交车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="cityBus" type="text" class="form-control input-sm" maxLength="15" name="cityBus" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >'
	body += '<label class="col-md-4 col-xs-4 control-label">中型客车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="mediumBus" type="text" class="form-control input-sm" maxLength="15" name="mediumBus" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">大型货车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="largeTruck" type="text" class="form-control input-sm" maxLength="15" name="largeTruck" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-7 col-xs-7 control-label">小型汽车（含小型自动挡汽车）总数</label>';
	body += '<div class="col-md-5 col-xs-5">';
	body += '<input  id="minicar" type="text" class="form-control input-sm" maxLength="15" name="minicar" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">低速汽车(含低速载货汽车、三轮汽车)总数</label>';
	body += '<div class="col-md-4 col-xs-4">';
	body += '<input  id="lowSpeedCar" type="text" class="form-control input-sm" maxLength="15" name="lowSpeedCar" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">残疾人教练车总数</label>';
	body += '<div class="col-md-8 col-xs-8">';
	body += '<input  id="handicapped" type="text" class="form-control input-sm" maxLength="15" name="handicapped" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label">摩托车(含三车、二轮、轻便摩托车)总数</label>';
	body += '<div class="col-md-4 col-xs-4">';
	body += '<input  id="ordinaryWheeled" type="text" class="form-control input-sm" maxLength="15" name="ordinaryWheeled" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >'
	body += '<label class="col-md-9 col-xs-9 control-label">其他车型(含轮式自行机械车,无轨、有轨电车)总数</label>';
	body += '<div class="col-md-3 col-xs-3">';
	body += '<input  id="otherModels" type="text" class="form-control input-sm" maxLength="15" name="otherModels" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" style="padding-left:2px;padding-right:15px;" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	/*body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-9 col-xs-9 control-label">其他车型(含轮式自行机械车、无轨电车、有轨电车)总数</label>';
	body += '<div class="col-md-3 col-xs-3">';
	body += '<input  id="otherModels" type="text" class="form-control input-sm" name="otherModels" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';*/


	body += '<div class="form-title"><h5 class="row-title">办公场所及教室</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教室总面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="clrmarea" type="text" class="form-control input-sm" maxLength="15" name="clrmarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">理论教室面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="theoclrmarea" type="text" class="form-control input-sm" maxLength="15" name="theoclrmarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教学设施设备</h5></div>';
	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">多媒体教学设备总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="multteacequipnum" type="text" class="form-control input-sm" maxLength="15" name="multteacequipnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">多媒体理论教学软件总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="multteacsoftnum" type="text" class="form-control input-sm" maxLength="15" name="multteacsoftnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教学磁板总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="teacmagnboardnum" type="text" class="form-control input-sm" maxLength="15" name="teacmagnboardnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">汽车驾驶模拟器总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="vehisimnum" type="text" class="form-control input-sm" maxLength="15" name="vehisimnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">其他教具和设备总数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="othertotal" type="text" class="form-control input-sm" maxLength="15" name="othertotal" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-title"><h5 class="row-title">教练场地</h5></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">教练场地总面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="trainarea" type="text" class="form-control input-sm" maxLength="15" name="trainarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">场地驾驶教练场面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dritrainarea" type="text" class="form-control input-sm" maxLength="15" name="dritrainarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">实际道路驾驶教练路线</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="drivinstcour" type="text" class="form-control input-sm" maxLength="15" name="drivinstcour" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停车场面积</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="parkarea" type="text" class="form-control input-sm" maxLength="15" name="parkarea" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">倒车入库数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="backstornum" type="text" class="form-control input-sm" maxLength="15" name="backstornum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">倒车移位数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="reveshifnum" type="text" class="form-control input-sm" maxLength="15" name="reveshifnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">侧方停车数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="latsidparnum" type="text" class="form-control input-sm" maxLength="15" name="latsidparnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">坡道定点停车和起步数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="rampdesnum" type="text" class="form-control input-sm" maxLength="15" name="rampdesnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">直角转弯数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="quarturnnum" type="text" class="form-control input-sm" maxLength="15" name="quarturnnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">曲线行驶数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="curvedrivenum" type="text" class="form-control input-sm" maxLength="15" name="curvedrivenum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过连续障碍数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="contfencesnum" type="text" class="form-control input-sm" maxLength="15" name="contfencesnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过单边桥数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="unilbridgenum" type="text" class="form-control input-sm" maxLength="15" name="unilbridgenum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">通过限宽门数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="limiwidthnum" type="text" class="form-control input-sm" maxLength="15" name="limiwidthnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">起伏路行驶数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="roldrinum" type="text" class="form-control input-sm" maxLength="15" name="roldrinum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">窄路掉头数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="narturnnum" type="text" class="form-control input-sm" maxLength="15" name="narturnnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟高速公路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simhighwaynum" type="text" class="form-control input-sm" maxLength="15" name="simhighwaynum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟连续急弯山区路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simmournum" type="text" class="form-control input-sm" maxLength="15" name="simmournum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';



	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟隧道数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simtunnelnum" type="text" class="form-control input-sm" maxLength="15" name="simtunnelnum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">模拟雨（雾）天湿滑路数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="simralinum" type="text" class="form-control input-sm" maxLength="15" name="simralinum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';


	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停靠站台数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dockstanum" type="text" class="form-control input-sm" maxLength="15" name="dockstanum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';

	body += '<div class="form-group has-feedback">';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-4 col-xs-4 control-label">停靠货台数</label>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<input  id="dockcargonum" type="text" class="form-control input-sm" maxLength="15" name="dockcargonum" placeholder="" data-bv-notempty="true" data-bv-notempty-message="" />';
	body += '</div></div>';
	body += '<div class="col-lg-6 col-md-6 col-xs-6 " >';
	body += '<label class="col-md-8 col-xs-8 control-label"></label>';
	body += '</div></div>';
	
	var str = '<div style="height:100%;overflow: auto;overflow-x: hidden;">' +
		'<form id="registrationForm" method="post" class="form-horizontal">' +
		body +
		'</form>' +
		'</div>';
	return str;
}
//树数据初始化
function TreeInit(data) {
	$("#Tree").treeview({
		color: "#428bca",
		showCheckbox: false,
		onhoverColor: "#CECED0",
		searchResultColor: "green",
		showBorder: false,
		searchResultBackColor: "#CECED0",
		highlightSelected: false,
		showTags: true,
		backColor: "rgba(66, 139, 202, 0)",
		data: data
	});


	$('#Tree').on('nodeSelected', function(event, node) {
		//var id = node.Extendible.stuId;
		//alert(carid);
		//Click(id);

	});
}