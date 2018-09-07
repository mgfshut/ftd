/*
 自定义封装控件库
 table格式化 
 增加widget样式及tooltip
 */
$(function() {
	$(".table-widget").wrap('<div class="widget"><div class="widget-body"></div></div>');
	var header = '<div class="widget-header bg-blue">' +
		'<span class="widget-caption">代办事项</span>' +
		'<div class="widget-buttons">' +
		//'<a href="#" data-toggle="config"><i class="fa fa-cog"></i></a>'+
		'<a href="#" data-toggle="maximize"><i class="fa fa-expand hidden-xs"></i></a>' +
		'<a href="#" data-toggle="collapse"><i class="fa fa-minus"></i></a>' +

		'</div>' +
		'</div>';
	$(header).insertBefore($(".table-widget").parent(".widget-body"));
	//$(".table-widget").find('table').addClass("table table-striped table-bordered table-hover");
	//$(".table-widget").find('table').dataTable({});
	//$('[data_rel="tooltip"]').tooltip({ placement: tooltip_placement });

	//function tooltip_placement(context, source) {
	//    var $source = $(source);
	//    var $parent = $source.closest('table');
	//    var off1 = $parent.offset();
	//    var w1 = $parent.width();

	//    var off2 = $source.offset();
	//    var w2 = $source.width();

	//    if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
	//    return 'left';
	//}
});
////data-toggle="collapse" data-target="#collapseExample" 
$(function() {
	$(".edit-widget").wrap('<div class="widget"><div class="widget-body"></div></div>');
	//
	var header = '<div class="widget-header bg-blue">' +
		'<span class="widget-caption">Colored Header and Body</span>' +
		'<div class="widget-buttons">' +
		//'<a href="#" data-toggle="config"><i class="fa fa-cog"></i></a>' +
		'<a href="#" data-toggle="maximize"><i class="fa fa-expand"></i></a>' +
		'<a href="#" data-toggle="collapse"><i class="fa fa-minus"></i></a>' +
		'<a href="#" data-toggle="dispose"><i class="fa fa-times"></i></a>' +
		'</div>' +
		'</div>';
	$(header).insertBefore($(".edit-widget").parent(".widget-body"));
	var toolbox = '<div class="widget-header">' +
		' <div class="widget-buttons pull-left">' +
		'<label><input class="checkbox-slider toggle colored-blue" type="checkbox"><span class="text"></span></label>' +
		'</div> ' +
		'</div>';

	$(toolbox).insertAfter($(".edit-widget").parent(".widget-body"));

});
/*widget按钮操作*/
$(function() {
	$('.widget-buttons *[data-toggle="maximize"]').on("click", function(n) {
		n.preventDefault();
		var t = $(this).parents(".widget").eq(0),
			i = $(this).find("i").eq(0),
			r = "fa-compress",
			u = "fa-expand";
		t.hasClass("maximized") ? (i && i.addClass(u).removeClass(r), t.removeClass("maximized"), t.find(".widget-body").css("height", "auto")) : (i && i.addClass(r).removeClass(u), t.addClass("maximized"), maximize(t))
	});
	$('.widget-buttons *[data-toggle="collapse"]').on("click", function(n) {
		n.preventDefault();
		var t = $(this).parents(".widget").eq(0),
			r = t.find(".widget-body"),
			i = $(this).find("i"),
			u = "fa-plus",
			f = "fa-minus",
			e = 300;
		t.hasClass("collapsed") ? (i && i.addClass(f).removeClass(u), t.removeClass("collapsed"), r.slideUp(0, function() {
			r.slideDown(e);
		})) : (i && i.addClass(u).removeClass(f), r.slideUp(200, function() {
			t.addClass("collapsed");
		}));
	});
	$('.widget-buttons *[data-toggle="dispose"]').on("click", function(n) {
		n.preventDefault();
		var i = $(this),
			t = i.parents(".widget").eq(0);
		t.hide(300, function() {
			t.remove();
		});
	});
});

function RefreshIfame(id) {
	$("#refresh_ifame").attr("onclick", "refershIframe('" + "Frame_" + id + "')");
}

function addTabs(obj) {
	var id = "tab_" + obj.id;
	$(".active").removeClass("active");
	var title = "";
	var content = "";
	//如果TAB不存在，则新增
	if (!$("#" + id)[0]) {

		title = '<li id="tab_' + id + '" onclick="RefreshIfame(\'' + id + '\');showTabActived(this);"><a href="#' + id + '" data-toggle="tab"  style="cursor: pointer;">' + obj.title;
		if (obj.close) {
			title += '<i class="fa fa-times-circle" style="margin-left:2px;" tabclose="' + id + '" title="关闭"></i>';
		}
		title += '</a></li>';
		var url = obj.content.replace("/pages/", "");
		//iframe添加内容
		content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' +
			'<iframe src="' + url + '" id="Frame_' + id + '"  onload = "iFrameHeight(this.id)"  frameborder="no"  width="100%" allowtransparency="yes">' +
			'</iframe></div>';

		$(".nav-tabs").append(title);
		$(".tab-content").append(content);
	}

	//激活当前选项
	$("#tab_" + id).addClass('active');
	$("#refresh_ifame").attr("onclick", "refershIframe('" + "Frame_" + id + "')");
	$("#" + id).addClass('active');
	showTabActived();
};

//外部tab（管理类的）
function addWTabs(id, title, url) {

	//	if(document.getElementById('Frame_tab_DrSch'))
	//	{
	//		var colInput =	document.getElementById('Frame_tab_DrSch').contentWindow.document.getElementsByTagName("input");
	//		
	//	}

	var Uid = "isXg_" + id;
	var isSave = $("#" + Uid).text();
	if (isSave == "" || isSave == "false") {
		var id = id;
		$(".active").removeClass("active");
		var title = title;
		var content = "";
		//如果TAB不存在，则新增
		if (!$("#" + id)[0]) {

			title = '<li id="tab_' + id + '" onclick="RefreshIfame(\'' + id + '\')"><a href="#' + id + '" data-toggle="tab"  style="cursor: pointer;">' + title;

			title += '<i class="fa fa-times-circle" style="margin-left:2px;" tabclose="' + id + '" title="关闭"></i>';

			title += '</a><div id="isXg_' + id + '" style="display:none;">false</div></li>';

			//iframe添加内容
			content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' +
				'<iframe src="' + url + '" id="Frame_' + id + '"  onload = "iFrameHeight(this.id)"  frameborder="no"  width="100%"   allowtransparency="yes">' +
				'</iframe></div>';

			$(".nav-tabs").append(title);
			$(".tab-content").append(content);

		} else {
			closeTab(id);

			title = '<li id="tab_' + id + '" onclick="RefreshIfame(\'' + id + '\')"><a href="#' + id + '" data-toggle="tab"  style="cursor: pointer;">' + title;

			title += '<i class="fa fa-times-circle" style="padding-left:10px;" tabclose="' + id + '" title="关闭"></i>';

			title += '</a><div id="isXg_' + id + '" style="display:none;">false</div></li>';

			//iframe添加内容
			content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' +
				'<iframe src="' + url + '" id="Frame_' + id + '" onchange="iFrameHeight(this.id)"  onload = "iFrameHeight(this.id)"  frameborder="no"  width="100%"   scrolling="yes" allowtransparency="yes">' +
				'</iframe></div>';

			$(".nav-tabs").append(title);
			$(".tab-content").append(content);
		}
	} else {
		if (window.confirm(title + "界面已经修改还未保存,是否取消？")) {
			//alert("确定");
			return true;
		} else {
			//alert("取消");
			return false;
		}

	}


	//激活当前选项
	$("#tab_" + id).addClass('active');
	$("#refresh_ifame").attr("onclick", "refershIframe('" + "Frame_" + id + "')");
	$("#" + id).addClass('active');
	showTabActived();
};

//关闭选项卡
function closeTab(id) {
	if ($("li.active").attr('id') === "tab_" + id) {
		$("#tab_" + id).prev().addClass("active");
		$("#" + id).prev().addClass("active");
		$("#tab_" + id).prev().click();
	}
	$("#tab_" + id).remove();
	$("#" + id).remove();

	//$("#tabs").tabs("refresh");
};

function refershIframe(id) {
	document.getElementById(id).contentWindow.location.reload(true);
}

$(function() {
	$("[addtabs]").click(function() {
		if ($(this).attr("url")) {       
			addTabs({
				id: $(this).attr("id"),
				title: $(this).text(),
				content: $(this).attr("url"),
				icon: $(this).attr("icon"),
				close: true
			});
		} 
	});

	$(".nav-tabs").on("click", "[tabclose]", function(e) {
		id = $(this).attr("tabclose");
		closeTab(id);
	});
});

function closeSubTab(subPageContentid) {
	var $subTab = $("#tab_" + subPageContentid),
	  	$subPageContent = $("#" + subPageContentid);
	
	var mainPageContentid = subPageContentid.substring(0, subPageContentid.length-4);
	$("#tab_" + mainPageContentid).remove();
	$("#" + mainPageContentid).remove();
	
	if($subTab.hasClass("active")) {
		$subTab.prev().addClass("active");
		$subPageContent.prev().addClass("active");
		$subTab.prev().click();
	}
	
	$subTab.remove();
	$subPageContent.remove();
}

function resizeTab() {
	var count = $("#tabs-nav li").size();
	if (count > tabmax) {
		var ts = count - tabmax;
		for (var v = 1; v < ts; v++) {
			$(".nav-tabs li").eq(v + 1).remove();
			$(".tab-content div").eq(v).remove();
		}
	}

}

//iframe高度自适应
function iFrameHeight(obj) {

	var winheight = $(window).height() - 145;
	//  alert($(window).height());
	var ifm = document.getElementById(obj);
	try {
		var subWeb = document.frames ? document.frames[obj].document : ifm.contentDocument;
		//alert(subWeb.body.scrollHeight);
		if (subWeb != null) {
			ifm.height = (subWeb.body.scrollHeight > winheight) ? subWeb.body.scrollHeight : winheight;
			//  alert(ifm.height);
		} else {

		}
	} catch (e) {}
}

function returnWinHeiht() {
	return $(window).height() - 210;
}

//iframe高度自适应
function iFrameHeightbynum(obj, pageheight) {

	var winheight = $(window).height() - 145;
	//  alert($(window).height());
	var ifm = document.getElementById(obj);
	try {
		var subWeb = document.frames ? document.frames[obj].document : ifm.contentDocument;

		//alert(subWeb.body.scrollHeight);
		if (subWeb != null) {
			//alert(subWeb.body.scrollHeight+","+pageheight);
			ifm.height = (pageheight > winheight) ? pageheight : winheight;
			// ifm.height = (subWeb.body.scrollHeight > winheight) ? subWeb.body.scrollHeight : winheight;
			//  alert(ifm.height);
		} else {

		}
	} catch (e) {}
}