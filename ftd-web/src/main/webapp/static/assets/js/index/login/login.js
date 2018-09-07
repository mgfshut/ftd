var flag = false;

$(function(){
	initLgBody();
});

//自适应body高度
function initLgBody(){
	$("body").height($(window).height());
}

//优化onresize操作 by mark
function throttle(method, context) {
	clearTimeout(method.tId);
	method.tId = setTimeout(function () {
		method.call(context);
	}, 100);
}

//Enter键触发登录
$("body").keydown(function(event) {
	if (event.keyCode == 13 || event.which == 13) { //keyCode=13 回车键
		if (flag == false){
			login();
		}else{
			flag = false;
		}
	}
});

//用户登录
function login() {
	flag = true;
	if ($("#name").val().replace(/\ +/g, "") == "") { //判断不为空
		$("#name").focus();
		$("#name").val("");
		$("#name").attr('placeholder', '请输入用户名');
		flag = false;
		return false;
	}
	if ($("#passwd").val().replace(/\ +/g, "") == "") {
		$("#passwd").focus();
		$("#passwd").attr('placeholder', '请输入密码');
		flag = false;
		return false;
	}

	//登录post
	var timestamp = new Date().getTime();//获取时间戳
	var passwords = hex_sha1(timestamp + "RunningMan" + hex_sha1($("#passwd").val()));//密码加密

	var url = IP + "/rmwebapp/school/login";
	console.info(JSON.stringify({
		"name": $("#name").val(),
		"timestamp": timestamp,
		"passwd": passwords
	}));
	$.ajax({
		url: url,
		type: "post",
		async: true,
		contentType: "application/json",
		data: JSON.stringify({
			"name": $("#name").val(),
			"timestamp": timestamp,
			"passwd": passwords
		}),
		success: function(Data) {
			if (Data.errorcode === 0) {
				flag = false;
				//SetCookice(Data);
				var tk=(Data.data.brsch.id).toString();
				$.cookie(hex_sha1(tk), JSON.stringify(Data));
				location.href = "index.html?tk="+hex_sha1(tk);
			} else if (Data.errorcode === 201) {
				modal_pop("账户或密码错误！", "fail");
				flag = false;
			} else if (Data.errorcode === 302) {
				modal_pop("重复登录！", "fail");
				flag = false;
			} else if (Data.errorcode === 301) {
				modal_pop("用户不存在！", "fail");
				flag = false;
			} else {
				$("#errorPlace").html("用户不存在！");
				$("#name").focus();
				$("#name").attr('placeholder', '请输入用户名');
				$("#passwd").attr('placeholder', '请输入密码');
				flag = false;
			}
		},
		cache: false,
		timeout: 50000,
		error: function(errObj, resu) {
			flag = false;
			console.log(errObj);
			modal_pop("连接超时,请重新登录！", "fail");
		}
	});
}


//SQL判定
function filterSqlStr(value) {
	var str = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<"
	var sqlStr = str.split(',');
	for (var i = 0; i < sqlStr.length; i++) {
		if (value.toLowerCase().indexOf(sqlStr[i]) != -1) {

			return false
		}
	}
	return true;
}