var SelectFromCtr = {
	"getSelect": function() {
		var db = ["coaid=0", "recruitid=0", "sex=0", "paycanal=0", "course=0", "paystatus=0", "owner=0","printstatus=0", "cartype=0", "owner=0","year=0","month=0","reachStandard=0","paytype=0","assessStage=0","perdritype=0","traintype=0", "brcrecruit=0", "brid=0","accStatus=0","phase=0","teachtype=0","traid=0","chargetype=0","status=0","ispassed=0","subject=0","apomExamType=0"]; //下拉框，请选择需要替
		var sarrystr = $("#select-form").serialize(); //序列化后的字符串
		if (!sarrystr.trim()) {
			return ""
		};
		var slzarry = sarrystr.split("&"); //["name=", "cardnum=", "brcrecruit=0", "traintype=0", "timestart=", "timeend="]

		for (var index in db) {
			var pst = $.inArray(db[index], slzarry);
			if (pst != -1) {
				slzarry[pst] = db[index].substr(0, db[index].length - 1);
			}
		}
		return slzarry.join("&");
	},
	"getFormData": function() {
		var $fgls = $("#registrationForm>.form-group");
		var $iptls = $fgls.find("select[name],input[name]");
		var _formdata = {};
		$.each($iptls, function(index) {
			_formdata[this.name] = $(this).val();
		});
		return _formdata;
	}
}