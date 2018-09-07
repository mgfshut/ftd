/**
 * @分时订单
 * @author chendb
 * @date 2017.7.5
 * 
 */
   $(function(){
		var isToday=false;
		$("#todayOrder").bind("click",function() {
			orderCount(true);
			$("#monthOrder").removeClass('btn-mini_hovercolor');// 近30天
			$("#todayOrder").addClass('btn-mini_hovercolor');
				});
		$("#monthOrder").click(function(){
			orderCount(false);
			$("#todayOrder").removeClass('btn-mini_hovercolor');// 近一日
			$("#monthOrder").addClass('btn-mini_hovercolor');
		});
		
		//初始化加载分时订单量柱状图
		orderCount(isToday);
   });

 function orderCount(isToday){
		//获取分时订单每个时间段的数据总量
     $.ajax({
         type: "post",
         dataType: "json",
         data:{isToday:isToday},
         url: path+"/sta/operate/orderCountAjax",
         success: function (json) {
             var datas = json.data;
             eChartsment(datas)
         }
     });
 }
 
 function eChartsment(data) {
			// 基于准备好的dom，初始化echarts实例
			var mvChart = echarts.init(document.getElementById('main'));
	// 指定图表的配置项和数据
	option = {
		color : [ '#4994f7' ],
		tooltip : {
			trigger : 'axis',
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid : {
			top : '3%',
			left : '1%',
			right : '7%',
			bottom : '4%',
			containLabel : true
		},
		xAxis : [ {
			type : 'category',
			name : '(时)',
			data : [ '00 时', '01 时', '02 时', '03 时', '04 时', '05 时', '06 时', '07 时', '08 时',
					'09 时', '10 时', '11 时', '12 时', '13 时', '14 时', '15 时', '16 时', '17 时', '18 时',
					'19 时', '20 时', '21 时', '22 时', '23 时' ],

			axisTick : {
				alignWithLabel : true
			}
		} ],
		yAxis : [ {
			type : 'value',
			name : '(单)'
		} ],
		series : [ {
			name : '订单量',
			type : 'bar',
			barWidth : '50%',
			data : data
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	mvChart.setOption(option);
	window.addEventListener("resize", function() {
		mvChart.resize();
	});
}