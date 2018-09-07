;(function ($) {
	$.fn.extend({
		PageBar: function (table, paramData, url, addhtml) {
			var tableId = $("#" + table + "");
			var url = url;
			var addHtmlMthod = addhtml;
			/**
			 * 分页查询
			 */
			queryPage = function () {
				var p = $.post(url, paramData, function (json) {
					if (json.errorcode == 0) {
						var html = addHtmlMthod(json);
						tableId.html(html);
					}else if(json.errorcode == "P_OVERTIME"){
					    window.location.href = 'studentCoaInfo';	
					}
				}, "json");
				p.success(function () {
				});
				p.error(function () {
					layer.alert('加载数据失败请重试!!');
				})
			}
		}
	});
}(jQuery));
