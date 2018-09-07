/**
 * 实时车辆运行情况
 */
	var pageIndex;
	var isEmpty;
	var companyIdStr;
	var datas0;
	var datas1;
	var datas2;

	function selectoption(){//重新加载饼图数据
		var datas00;
		var datas11;
		var datas22;
		var companyId = $("#carselectHome").val();
		 companyIdStr=companyId;
			 if(companyId!=null||companyId!=undefined||companyId!=""||companyId!="all"){
				  $.ajax({
			            type: "post",
			            dataType: "json",
			            async :false,
			            data:{pageIndex:1,isEmpty:"0",companyId:companyId},
			            url: path+"/ops/positionDriver/listAjax",
			            success: function (json) {
			            	datas00 = json.data.total;
			            	
			            }
			        });
			        $.ajax({
			            type: "post",
			            dataType: "json",
			            async :false,
			            data:{pageIndex:1,isEmpty:"1",companyId:companyId},
			            url: path+"/ops/positionDriver/listAjax",
			            success: function (json) {
			            	datas11 = json.data.total;
			            	
			            }
			        });
			        $.ajax({
			            type: "post",
			            dataType: "json",
			            async :false,
			            data:{pageIndex:1,isEmpty:"2",companyId:companyId},
			            url: path+"/ops/positionDriver/listAjax",
			            success: function (json) {
			            	datas22 = json.data.total;
			            	
			            }
			        });
			 }if(companyId==null||companyId==undefined||companyId=="all"){
				  $.ajax({
			            type: "post",
			            dataType: "json",
			            async :false,
			            data:{pageIndex:1,isEmpty:"0"},
			            url: path+"/ops/positionDriver/listAjax",
			            success: function (json) {
			            	datas00 = json.data.total;
			            	
			            }
			        });
			        $.ajax({
			            type: "post",
			            dataType: "json",
			            async :false,
			            data:{pageIndex:1,isEmpty:"1"},
			            url: path+"/ops/positionDriver/listAjax",
			            success: function (json) {
			            	datas11 = json.data.total;
			            	
			            }
			        });
			        $.ajax({
			            type: "post",
			            dataType: "json",
			            async :false,
			            data:{pageIndex:1,isEmpty:"2"},
			            url: path+"/ops/positionDriver/listAjax",
			            success: function (json) {
			            	datas22 = json.data.total;
			            	
			            }
			        });
			 }
		     // 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main_pie_a'));
				// 指定图表的配置项和数据
				option = {
					title: {

					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						y: 'bottom',
						data: ['停驶车辆', '营运重车', '营运空车']
					},
					//color: ['green', '#6fb3e0', '#ffb752', ],
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '40%'],
						data: [{
								value: datas22,
								name: '停驶车辆'
							},
							{
								value: datas11,
								name: '营运重车'
							},
							{
								value: datas00,
								name: '营运空车'
							},

						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.onresize = myChart.resize;
		}
	$(function(){
		if(companyIdStr==""||companyIdStr==null||companyIdStr=="all"){
			   $.ajax({
		            type: "post",
		            dataType: "json",
		            async :false,
		            data:{pageIndex:1,isEmpty:"0"},
		            url: path+"/ops/positionDriver/listAjax",
		            success: function (json) {
		            	datas0 = json.data.total;
		            	
		            }
		        });
		        $.ajax({
		            type: "post",
		            dataType: "json",
		            async :false,
		            data:{pageIndex:1,isEmpty:"1"},
		            url: path+"/ops/positionDriver/listAjax",
		            success: function (json) {
		            	datas1 = json.data.total;
		            	
		            }
		        });
		        $.ajax({
		            type: "post",
		            dataType: "json",
		            async :false,
		            data:{pageIndex:1,isEmpty:"2"},
		            url: path+"/ops/positionDriver/listAjax",
		            success: function (json) {
		            	datas2 = json.data.total;
		            	
		            }
		        });
		        
				
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main_pie_a'));
				// 指定图表的配置项和数据
				option = {
					title: {

					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						y: 'bottom',
						data: ['停驶车辆', '营运重车', '营运空车']
					},
					//color: ['green', '#6fb3e0', '#ffb752', ],
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '40%'],
						data: [{
								value: datas2,
								name: '停驶车辆'
							},
							{
								value: datas1,
								name: '营运重车'
							},
							{
								value: datas0,
								name: '营运空车'
							},

						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.onresize = myChart.resize;        
		}
	});