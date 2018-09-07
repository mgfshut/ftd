;(function($){
	$.fn.extend({
		/**
		 * @author chendb
		 * @param divId 分页器ID
		 * @param table <table>标签ID
		 * @param selectFrom 查询条件的formID
		 * @param rows  每页显示条数
		 * @param pageIndex 默认页面1
		 * @param pageTotal 页面总数
		 * @param url 访问后台地址
		 * @param totalUrl 查询总数Url
		 * @param addhtml 返回json自定义html组合方法,传入你自定义的方式
		 * 具体例子在dictionary.jsp
		 * 例：var addhtml = function(json){
		 *       return html;
		 *     }
		 */
		"PaginBar":function(divId,table,selectFrom,rows,pageIndex,url,totalUrl,addhtml){
			var divId = $("#"+divId+"");
			var tableId = $("#"+table+"");
			var fromId = $("#"+selectFrom+"");
			var url = url;
			var totalUrl = totalUrl;
			var pageIndex = pageIndex;
			var rows = rows;
			var count = 0;
			var paramData = {};
			var addHtmlMthod = addhtml;
			var pageTotal =  0;
			var layerIndex;
			var layer;
			/**
			 * 分页查询入口
			 * 查询总页数
			 */
			queryPageCount = function(){
				 openLoad();
				 var p = $.post(totalUrl,paramData,function(json){
			    	  if (json.errorcode == 0) {
			    		  count =  json.data;
			    		  pageTotal = Math.ceil(count / rows);
			    		  innerPageHtml();
			    		  queryPage();
			    	  }else{
			    		  layer.alert('未查询到相关数据!!');
			    	  }
			      },"json");
                 p.error(function(){
                	 closeLoad();
                	 layer.alert('加载数据失败请重试!!');  
                 }) 	
			},
			/**
			 * 打开加载
			 */
			openLoad = function(){
				  layui.use('layer', function(){ //独立版的layer无需执行这一句
				  var $ = layui.jquery;
				  layer = layui.layer; //独立版的layer无需执行这一句
				  layerIndex = layer.open({
					  type: 3
				     ,shade: 0.2
				     ,icon:2
				     ,time:10000
				  });
				 });
			},
			/**
			 * 默认取消选中ID请设置为all
			 */
			unselectCheack = function(){
			if($("#all").length > 0){
		        $("#all").prop("checked", false);
	            }	
			},
			/**
			 * 关闭加载
			 */
			closeLoad = function(){
				 if( layerIndex != undefined){
					 layer.close(layerIndex); 
				 }	
			},
			/**
			 * 滚动条置顶
			 */
			scrollTop = function(){
				$('html, body').animate({scrollTop:130}, 'fast');
			},
			/**
			 * 按页数查询
			 */
			queryPage = function(){
				 layui.use(['laypage', 'layer'],
						    function() {
						        var laypage = layui.laypage,
						        layer = layui.layer;
						        laypage.render({
                                    elem: divId,
                                    count: pageTotal,//得到总页数
						            //skip: true,
						            curr:this.pageIndex,
						            jump: function(obj) {
						            	openLoad();
						                var curr = obj.curr;
						                paramData.rows = rows;
						                paramData.pageIndex = curr;
						                var p = $.post(url,paramData,
						                function(json) {
						                    if (json.errorcode == 0) {
						                    	setCurrPageHtml(curr);
//						                        var html = "";
//						                        var datas = json.data;
//						                        for (var i in datas) {
//						                            var d = datas[i];
//						                            var index = parseInt(i) + 1;
//						                            html += "<tr> <td><input type='checkbox'>" + index + "</td>";
//						                            for(h in pageDataRows){
//														var c = pageDataRows[h];
//														var v = d[""+c+""];
//														if(v != undefined && v!= null){
//															html += "<td>"+v+"</td>";
//														}else{
//															html += "<td></td>";
//														}
//													}
//						                            html+="<td><a href=''>参数列表</a></td>";
//						                        }
//						                        html+="</tr>";
						                	    var html = addHtmlMthod(json);
						                        tableId.append(html);
						                        if(curr > 1){
						                          scrollTop();
						                        }
						                        unselectCheack();
						                    } else {
						                    	layer.alert('未查询到相关数据!!');
						                    }
						                    closeLoad();
						                },
						                "json");
						                p.error(function(){
						                	 closeLoad();
						                	 layer.alert('加载数据失败请重试!!');  
						                }) 
						            }
						        });
						    });
			},
			/**
			 * 重置表单
			 */
			resetFrom = function(){
				$("#"+selectFrom+"")[0].reset(); 
			},
			/**
			 * 初始化设置pageInfo html
			 */
			innerPageHtml = function(){
				$("#currPage").append(pageIndex);
				$("#totalPage").append(pageTotal);
				$("#totalRows").append(count);
				$("#rows").append(rows);
			},
			setCurrPageHtml = function(curr){
				$("#currPage").append(curr);
			},
			/**
			 * 按from表单填入的数据查询
			 */
			termQueryPage = function(){
				paramData = {};
				var fromData = fromId.serializeArray();
				//判断该查询条件是否存在
				$.each(fromData, function() {
					var d = paramData[this.name];
					if( d !=undefined && d !=""){
						if(this.value !=undefined && this.value !="" && this.value != 0){
							paramData[this.name] = this.value;
						}else{
							delete paramData[this.name]; 
						}
					}else{
						if(this.value !=undefined && this.value !="" && this.value != 0)
							paramData[this.name] = this.value;	
					}
				});
				queryPageCount();
			}
		} //主函数
	});//fn
}(jQuery));
