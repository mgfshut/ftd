var headerChart1 = echarts.init(document.getElementById('headerChart'));
option = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	/*legend: {
	    orient: 'vertical',
	    left: 'left',
	    data: ['占有率']
	},*/
	color: ['#4d897e'],
	series: [{
		name: '',
		type: 'pie',
		center: ['50%', '50%'],
		radius: ['68%', '80%'],
		label: {
			normal: {
				position: 'center'
			}
		},
		data: [{
			value: onlineRate,
			name: '占有率',
			label: {
				normal: {
					formatter: '{d} %',
					textStyle: {
						color:'#333333',
						fontWeight: 'bolder',
						fontSize: 35
					}
				}
			}
		}, {
			value: 100-onlineRate,
			name: '占位',
			label: {
				normal: {
					formatter: '\n在线率',
					textStyle: {
						color: '#333333',
						fontWeight: 'bolder',
						fontSize: 19
					}
				}
			},
			tooltip: {
				show: false
			},
			itemStyle: {
				normal: {
					color: '#aaa'
				},
				emphasis: {
					color: '#aaa'
				}
			},
			hoverAnimation: false
		}]
	}]
};
headerChart1.setOption(option);
window.addEventListener("resize", function() {
				headerChart1.resize();
			});
