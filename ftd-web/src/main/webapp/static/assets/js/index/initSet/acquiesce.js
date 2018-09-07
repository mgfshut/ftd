function acquiesce(usual, id, groupname) {
	var type = UrlValue("v");
	var modal;
	type == "SchScheduleModel" ? modal = 0 : modal = 1;
	var _acquiesce_call = function() {
		var obj = {
			ajaxurl: IP + "/rmwebapp/templet/defualt?type=" + modal + "&id=" + id,
			type: "GET",
			sucessmsg: "设置成功",
			errormsg: "设置失败"
		}
		ajax_any(obj);
	};
	usual == "0" ? modal_confirm("是否设置\"" + groupname + "\"为默认模板?", _acquiesce_call) : "";
}