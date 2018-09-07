var initendmenu = function() {
	var roleid =_cookie.roleid;
	$.ajax({
		url: IP + "/rmwebapp/sch/privs-" + roleid,
		type: "get",
		async: false,
		contentType: "application/json",
		success: function(privs) {
			formenu(privs);
		},
		cache: false,
		timeout: 500000,
		error: function(errObj, resu) {
			console.log(errObj);
		}
	});
}();

function formenu(privs) {
	var privsarray = []; //权限数组
	$("#73").css('display', 'none');
	for(var k = 0; k <= 140; k++) {
		privsarray[k] = new Array();
	}
	if(privs.errorcode === 0) {
		for(var i = 0; i < privs.data.length; i++) {
			privsarray[privs.data[i].menu.id] = privs.data[i].visitType;
		}
		//console.log(privsarray.length);
		for(var j = 0; j <= 140; j++) {
			if($("#" + j).length > 0) {
				if(privsarray[j] != "True") {
					$("#" + j).css('display', 'none');
					//console.log(j);
				} else {
					//console.log(j);
				}
			}
		}
	}
}