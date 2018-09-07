function earamap() {
	var str = '<div class="text-align-center" style="height:100%">';
	    str+='<div class="well bg-magenta bordered-left" style="position:absolute;z-index:1;left:20%; margin-top:0.1em;background: #F9F6F6 !important; padding:5px 5px 5px 0px;">';
		str+='<input id="searchInput" style="height: 28px; line-height: 28px; width: 100px; color: black; vertical-align: middle; padding:2px 2px 2px 2px; margin-left: 5px; margin-right: 5px;" placeholder="请输入查询地点" />';
		str+='<a id="searchBtn" href="javascript:void(0);" class="btn" style="display: inline-block; width: 28px; height: 28px; vertical-align: middle; background-color: #18a689; padding-left:5px; padding-top: 5px; border-color: #18a689; border-radius: 3px;"><i class="fa fa-search " style="color: white; opacity: 1; "></i></a>'
		str+='</div>'; 
	    str +='<div  style="position:absolute;left:45%;z-index:1;color:white;margin-top:0.1em;">';
//	    str +='<a id="circleIda" class="btn btn-primary" href="javascript:void(0);"><i class="fa fa-circle-o"></i> 圆形</a>';
	    str +='<a id="ploygenIda" class="btn btn-primary" href="javascript:void(0);" style="margin-left: 0.1em;"><i class="fa fa-pencil"></i> 多边形</a>';
	    str +='<a id="mapClear" class="btn btn-primary" href="javascript:void(0);" style="margin-left: 0.1em;"><i class="fa fa-eraser"></i> 清除</a>';
	    str +='</div>';
	    str +='<div style="position:absolute;left:90%;z-index:1;color:white">';
	    str +='<a id="schAreaInputColl" class="btn hide" href="javascript:void(0);" style="margin-left: 0.1em; background-color: #2F4050 !important;"><i class="collapse-icon fa fa-bars" style="color: white;font-size:1.2em;margin-right: 0px;top: 0.35em;opacity: 1;cursor:pointer"></i></a>';
	    str +='</div>';
	    str +='<div id="container" style="height:500px"></div></div>';
	       
	console.info(str)
	return str;
}