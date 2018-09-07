//$(window).resize(function(){ 
//  $(".login_dialog").css({ 
//      position: "absolute", 
//      left: ($(window).width() - $(".login_dialog").outerWidth())/2, 
//      top: ($(window).height() - $(".login_dialog").outerHeight())/2 
//  });        
//}); 

//文本框默认提示文字
function textFocus(el) {
	if(el.defaultValue == el.value) {
		el.value = '';
		el.style.color = '#333';
	}
}

function textBlur(el) {
	if(el.value == '') {
		el.value = el.defaultValue;
		el.style.color = '#999';
	}
}

$(function() {
	/*生成验证码*/
	(function create_code() {
		function shuffle() {
			var arr = ['r', 'Q', '4', 'S', '6', 'w', 'u', 'D', 'I', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p',
				'q', '2', 's', 't', '8', 'v', '7', 'x', 'y', 'z', 'A', 'B', 'C', '9', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', '3', 'R',
				'5', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];
			return arr.sort(function() {
				return(Math.random() - .5);
			});
		};
		shuffle();

		function show_code() {
			var ar1 = '';
			var code = shuffle();
			for(var i = 0; i < 4; i++) {
				ar1 += code[i];
			};
			//var ar=ar1.join('');  
			$(".reg-box .phoKey").text(ar1);
		};
		show_code();
		$(".reg-box .phoKey, .reg-box .freshen-img").click(function() {
			show_code();
		});
		
	})();

	//账户输入框失去焦点  
	(function login_validate() {
		//手机号失去焦点  
//		$(".reg-box .account").blur(function() {
//			reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
//			if($(this).val() == "" || $(this).val() == "请输入您的手机号") {
//				$(this).addClass("errorC");
//				$(this).next().html("手机号不能为空！");
//				$(this).next().css("display", "block");
//			} else if($(".reg-box .account").val().length < 7) {
//				$(this).addClass("errorC");
//				$(this).next().html("手机号长度有误！");
//				$(this).next().css("display", "block");
//			} else if(!reg.test($(".reg-box .account").val())) {
//				$(this).addClass("errorC");
//				$(this).next().html("手机号不存在!");
//				$(this).next().css("display", "block");
//			} else {
//				$(this).addClass("checkedN");
//				$(this).removeClass("errorC");
//				$(this).next().empty();
//			}
//		});
		//用户名失去焦点  
		$(".reg-box .account").blur(function() {
			reg = /^[a-zA-Z0-9_-]{4,32}$/;
			if($(this).val() == "" || $(this).val() == "请输入您的用户名") {
				$(this).addClass("errorC");
				$(this).next().html("用户名不能为空！");
				$(this).next().css("display", "block");
			} else if($(".reg-box .account").val().length < 4) {
				$(this).addClass("errorC");
				$(this).next().html("用户名长度有误！");
				$(this).next().css("display", "block");
			} else if(!reg.test($(".reg-box .account").val())) {
				$(this).addClass("errorC");
				$(this).next().html("用户名不存在!");
				$(this).next().css("display", "block");
			} else {
				$(this).addClass("checkedN");
				$(this).removeClass("errorC");
				$(this).next().empty();
			}
		});
		/*密码输入框失去焦点*/
		$(".reg-box .admin_pwd").blur(function() {
			reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

			if($(this).val() == "请输入密码") {
				$(this).addClass("errorC");
				$(this).next().html("密码不能为空！");
				$(this).next().css("display", "block");

			} else if(!reg.test($(".admin_pwd").val())) {
				$(this).addClass("errorC");
				$(this).next().html("密码为6~12位的数字、字母或特殊字符！");
				$(this).next().css("display", "block");
			} else {
				$(this).addClass("checkedN");
				$(this).removeClass("errorC");
				$(this).next().empty();
			}
		});

		/*验证码输入框失去焦点*/
		$(".reg-box .photokey").blur(function() {
			var code1 = $('.reg-box input.photokey').val().toLowerCase();
			var code2 = $(".reg-box .phoKey").text().toLowerCase();
			if(code1 != code2) {
				$(this).addClass("errorC");
				$(this).next().next().html("验证码输入错误！");
				$(this).next().next().css("display", "block");
			} else {
				$(this).removeClass("errorC");
				$(this).next().next().empty();
				$(this).addClass("checkedN");
			}
		})
	})();
});

/*清除提示信息*/
function emptyRegister() {
	$(".reg-box .phone,.reg-box .phonekey,.reg-box .password,.reg-box .email").removeClass("errorC");
	$(".reg-box .error1,.reg-box .error2,.reg-box .error3,.reg-box .error4").empty();
}

function emptyLogin() {
	$(".reg-box .account,.reg-box .admin_pwd,.reg-box .photokey").removeClass("errorC");;
	$(".reg-box .error5,.reg-box .error6,.reg-box .error7").empty();
}