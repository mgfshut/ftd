function loginout() {
	$.ajax({
		url: IP + "/rmwebapp/school/logout",
		type: "get",
		async: true,
		success: function(data) {
			if (data.errorcode == 0) {
				cleanCookie();
			} else {
				cleanCookie();
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			cleanCookie();
		}
	});
}

//清理coookice并重新登陆
function cleanCookie() {
	$.cookie(UrlValue("tk"),null);
	location.href = "login.html";
}