$(function(){
	$(".BTabLeft").on("click", backward);
	$(".BTabRight").on("click", forward);
	$(".activeTabLocated").on("click", function(){
		showTabActived();
	});
	$(".closeAllTab").on("click", function() {
		$("#tabs-nav").children("li").not(":first").each(function() {
			$("#" + $(this).attr("id").substr(4)).remove();
			$(this).remove();
		});
		var $index = $("#tabs-nav li:first"),
		    frameid = $index.attr("id").substr(4);
		$index.addClass("active");
		$("#refresh_ifame").attr("onclick", "refershIframe('" + "Frame_" + frameid + "')");
		$("#" + frameid).addClass('active');
		$("#tabs-nav").css("margin-left", "0px");
	});
	$(".closeOtherTab").on("click", function() {
		$("#tabs-nav").children("li").not(":first").not(".active").each(function() {
			$("#" + $(this).attr("id").substr(4)).remove();
			$(this).remove();
		});
		$("#tabs-nav").css("margin-left", "0px");
	});
	$("#tabs-nav").on("shown.bs.tab", "a[data-toggle=tab]", function(){
		var iframe = $($(this).attr("href")).find("> iframe")[0];
		typeof(iframe.contentWindow.resetView) == "function" && 
			iframe.contentWindow.resetView();
	});
});

function getOuterWidth($el){
	var outerWidth = 0;
	$el.each(function() {
		outerWidth += $(this).outerWidth(true);
	});
	return outerWidth;
}

function backward(){
	var formerMarginLeft = Math.abs(parseInt($("ul#tabs-nav").css("margin-left")));
	
	var widgetOuterWidth = getOuterWidth($(".tab-panel").children().not("nav")),
		tabsVisibleWidth = $(".tab-panel").outerWidth(true) - widgetOuterWidth;
		
	var latestMarginLeft = 0;
	
	if($("ul#tabs-nav").outerWidth() > tabsVisibleWidth) {
		var $tab = $("ul#tabs-nav > li:first");
		var shift = 0;
		while ((shift + $tab.outerWidth(true)) <= formerMarginLeft) {
			shift += $tab.outerWidth(true);
			$tab = $tab.next();
		}
		if (shift > tabsVisibleWidth) {
			shift = 0;
			while (shift + $tab.outerWidth(true) < tabsVisibleWidth) {
				shift += $tab.outerWidth(true);
				$tab = $tab.prev();
			}
			latestMarginLeft = getOuterWidth($tab.prevAll());
		}
	}
	$("ul#tabs-nav").animate({
		marginLeft: 0 - latestMarginLeft + "px"
	}, "fast");
}

function forward() {
	var formerMarginLeft = Math.abs(parseInt($("ul#tabs-nav").css("margin-left")));
	
	var widgetOuterWidth = getOuterWidth($(".tab-panel").children().not("nav")),
		tabsVisibleWidth = $(".tab-panel").outerWidth(true) - widgetOuterWidth;
		
	var latestMarginLeft = 0;
	
	if($("ul#tabs-nav").outerWidth() > tabsVisibleWidth) {
		var $tab = $("ul#tabs-nav > li:first");
		var shift = 0;
		while ((shift + $tab.outerWidth(true)) <= formerMarginLeft) {
			shift += $tab.outerWidth(true);
			$tab = $tab.next();
		}
		shift = 0;
		while ($tab.length && shift + $tab.outerWidth(true) < tabsVisibleWidth) {
			shift += $tab.outerWidth(true);
			$tab = $tab.next();
		}
		latestMarginLeft = getOuterWidth($tab.prevAll());
	}
	if (latestMarginLeft > 0) {
		$("ul#tabs-nav").animate({
			marginLeft: 0 - latestMarginLeft + "px"
		}, "fast");
	}
}

function showTabActived(activeTab){
	var $activeTab = activeTab? $(activeTab) : $("ul#tabs-nav li.active"),
		activeTabOuterWidth = $activeTab.outerWidth(true),
	    prevOuterWidth = getOuterWidth($activeTab.prevAll()),
	    nextOuterWidth = getOuterWidth($activeTab.nextAll());
	
	var widgetOuterWidth = getOuterWidth($(".tab-panel").children().not("nav")),
		tabsVisibleWidth = $(".tab-panel").outerWidth(true) - widgetOuterWidth;
	
	var tabsOuterWidth = $("ul#tabs-nav").outerWidth();
	
	var marginLeft = 0;
	
	if(tabsOuterWidth > tabsVisibleWidth) {
		if(nextOuterWidth <= (tabsVisibleWidth - activeTabOuterWidth - $activeTab.next().outerWidth(true))){
			marginLeft = prevOuterWidth;
			var $tab = $activeTab,
				invisibleWidth = tabsOuterWidth - tabsVisibleWidth;
			while((marginLeft - $tab.outerWidth(true)) > invisibleWidth){
				marginLeft -= $tab.prev().outerWidth(true);
				$tab = $tab.prev();
			}
		} else if (prevOuterWidth > tabsVisibleWidth - activeTabOuterWidth - $activeTab.prev().outerWidth(true)){
			marginLeft = prevOuterWidth - $activeTab.prev().outerWidth(true);
		}
	}
	
	$("ul#tabs-nav").animate({
		marginLeft: 0 - marginLeft + "px"
	}, "fast");
}