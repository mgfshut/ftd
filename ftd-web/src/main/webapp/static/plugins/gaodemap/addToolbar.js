/**
 * Created with WebStorm && Sublime Text 3
 * Date: 2015/10/29 14:04
 */
window.onload = function() {
	mapObj.plugin(["AMap.ToolBar"], function() {
		mapObj.addControl(new AMap.ToolBar());
	});
	if(location.href.indexOf('&guide=1')!==-1){
		mapObj.setStatus({scrollWheel:false})
	}
}