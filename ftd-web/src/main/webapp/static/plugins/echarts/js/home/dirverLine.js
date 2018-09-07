
		var dirverLineChart = echarts.init(document.getElementById('dirverLine'));
		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			backgroundColor:'#fff',	
			legend: {
				align: 'left',
				left: 90,
				top: 15,
				data: [{
					name: '网约车',
					textStyle: {
						color: '#999999',
					}
				},
				{
					name: '出租车',
					textStyle: {
						color: '#999999',
					}
				},{
					name: '总行驶率',
					textStyle: {
						color: '#999999',
					}
				}]
			},
			toolbox: { //可视化的工具箱
                show: true,
                right:80,
                top: 12,
                feature: {
                    dataView: { //数据视图
                        show: true
                    },
                    restore: { //重置
                        show: true
                    },
                    dataZoom: { //数据缩放视图
                        show: true
                    },
                    saveAsImage: {//保存图片
                        show: true
                    },
                    magicType: {//动态类型切换
                        type: ['bar', 'line']
                    }
                }
            },
			grid: {
				top:'18%',
				left: '1%',
				right: '1%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: [	'00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时',
						'08时', '09时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时',
						'18时', '19时', '20时', '21时', '22时', '23时',
					],
				axisLabel: {
					interval: 0,
					　textStyle: {　　
						color: '#449488'　　
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#449488',
					}
				},
				axisTick: {
					show: false
				},
			}],
			yAxis: [{
				type: 'value',
				name: '车辆行驶数',
				splitLine: {
					show: true
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#999999',
					}
				},
				axisLabel: {
					formatter: '{value} ',
					textStyle: {　　
						color: '#999999'　　
					}
				},
				splitArea: {
				show: true, // 控制网格线是否显示	
	
				areaStyle: {
					color: 'rgba(250, 250, 250, 0.5)'
				}
			},
			}, {
				type: 'value',
				name: '行驶率',
				
				splitLine: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#999999',
					}
				},
				axisLabel: {
					formatter: '{value} ',
					textStyle: {　　
						color: '#999999'　　
					}
				}
			}],
			series: [{
				name: '网约车',
				type: 'bar',
				barWidth:15,
				data: netCarAccList,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
							offset: 0,
							color: 'rgba(114, 167,111, 1)' //顶部颜色
						}, {
							offset: 1,
							color: 'rgba(114, 167,111, 1)' //底部颜色
						}]),
					}
				}
			},
			{
				name: '出租车',
				type: 'bar',
				barWidth: 15,
				data: taxiAccList,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
							offset: 0,
							color: 'rgba(231, 176,61, 1)' //顶部颜色
						}, {
							offset: 1,
							color: 'rgba(231, 176,61, 1)' //底部颜色
						}]),
					}
				}
			},
			{
				name: '总行驶率',
				type: 'line',
				yAxisIndex: 1,
				data: accRateList,
				itemStyle: {
					normal: {
						color: '#4ea3f3'
					}
				},
				lineStyle: {
					normal: {
						width: 2
					}
				}
			}],
			//顶部数值显示
			
		};
		dirverLineChart.setOption(option);
		window.addEventListener("resize", function() {
			dirverLineChart.resize();
		});

