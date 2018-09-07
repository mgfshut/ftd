//获取分校id
function SubSchId() {
	if (_cookie.brschid != null && _cookie.brschid != "") {
		return _cookie.brschid;
	} else {
		parent.location.href = "login.html";
	}
}

//获取主校id
function SchId() {
	if (_cookie.schoolid != null && _cookie.schoolid != "") {
		return _cookie.schoolid;
	} else {
		parent.location.href = "login.html";
	}
}

//根据不同类型获取驾校下拉列表
function SchDataByTtpe(id) {
	if (_cookie.type == "Main") {
		ajax_select(IP + "/rmwebapp/sch-" + _cookie.schoolid + "/brsch-names", "id", "name", "id");
	} else {
		$("#Sm_id").append('<option value="' + _cookie.brschid + '">' + _cookie.brschname + '</option>');
	}
}

//获取分校列表
function getSubList(id) {

	if (_cookie.type == "Main") {
		ajax_selectN(IP + "/rmwebapp/sch-" + _cookie.schoolid + "/brsch-names", "id", "name", id);
	} else {
		$("#" + id).append('<option value="' + _cookie.brschid + '">' + _cookie.brschname + '</option>');
	}
}

//判断类型获取id
function IdByType() {
	if (_cookie.type != null && _cookie.type != "") {
		return _cookie.brschid;
	} else {
		location.href = "relogin.html";
	}
}